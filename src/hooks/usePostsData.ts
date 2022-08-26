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

export function usePostsData() {
  const [postsData, setPostsData] = useState<IPostData[]>([]);
  const token = useSelector<RootState, string>(state => state.userToken);
  
  useEffect(() => {
    axios.get('https://oauth.reddit.com/best.json?sr_detail=true', {
      headers: { Authorization: `bearer ${token}` }
    })
      .then((response) => {
        const postsArray = response.data.data.children;
        // console.log(postsArray)
        const posts = createPostsData(postsArray);
        setPostsData(posts);
      })
      .catch(console.log);
  }, [token]);

  return [postsData];
}
