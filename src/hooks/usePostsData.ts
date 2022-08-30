import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducer";
import { createDateString } from "../utils/js/createDateString";

export interface IPostData {
  author: string;
  title: string;
  rating: number;
  id: string;
  commentsNum: number;
  createdAt: string;
  avatarImg: string;
  previewImg: string;
  subreddit: string;
}

function createPostsData(data: any[]) {
  return data.map((item) => {
    let previewSrc;
    if (item.data.preview && !item.data.preview.images[0].source.url.startsWith('https://external-preview')) {
      previewSrc = item.data.preview.images[0].source.url.replace('/preview', '/i') ;
    } else {
      if (item.data.thumbnail.startsWith('https:')) {
        previewSrc = item.data.thumbnail;
      } else {
        previewSrc = '';
      }
    }
    
    const postData: IPostData = {
      author: item.data.author,
      title: item.data.title,
      rating: item.data.ups,
      id: item.data.id,
      commentsNum: item.data.num_comments,
      createdAt: createDateString(new Date(item.data.created * 1000)),
      avatarImg: item.data.sr_detail.icon_img,
      previewImg: previewSrc,
      subreddit: item.data.subreddit,
    };

    return postData;
  })
}

export function usePostsData(ref: React.RefObject<HTMLElement>) {
  const token = useSelector<RootState, string>(state => state.userToken);
  const [posts, setPosts] = useState<IPostData[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState('');
  const [nextAfter, setNextAfter] = useState('');
  const [isMultipleOfThree, setIsMultipleOfThree] = useState(false);
  const postsLimit = 10;

  useEffect(() => {
    if (!token) return;

    async function load() {
      setLoading(true);
      setErrorLoading('')

      try {
        const { data: { data: { after, children } } } = await axios.get('https://oauth.reddit.com/best.json?sr_detail=true', {
          headers: { Authorization: `bearer ${token}` },
          params: {
            limit: postsLimit,
            after: nextAfter,
          }
        });

        const postsArray = createPostsData(children);
        setNextAfter(after);
        setPosts(prevChildren => {
          const posts = prevChildren.concat(...postsArray);

          if (posts.length % (postsLimit * 3) === 0) {
            setIsMultipleOfThree(true);
          } else {
            setIsMultipleOfThree(false);
          }

          return posts;
        });

      } catch (error) {
        setErrorLoading(String(error));
      } finally {
        setLoading(false);
      }
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (isMultipleOfThree) return
        load();
      }
    }, {
      rootMargin: '50px',
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    }
  }, [nextAfter, token]);

  return [{ posts, loading, errorLoading, isMultipleOfThree }];
}