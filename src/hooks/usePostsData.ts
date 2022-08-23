import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { tokenContext } from "../shared/context/tokenContext";
import { MONTHS } from "../utils/consts";

export interface IPostData {
  author: string;
  title: string;
  rating: number;
  id: string;
  commentsNum: number;
  createdAt: string;
  avatarImg: string;
  previewImg: string;
}

function createPostsData(data: any[]) {
  return data.map((item) => {
    const postData: IPostData = {
      author: item.data.author,
      title: item.data.title,
      rating: item.data.ups,
      id: item.data.id,
      commentsNum: item.data.num_comments,
      createdAt: createDateString(new Date(item.data.created * 1000)),
      avatarImg: item.data.sr_detail.icon_img,
      previewImg: item.data.preview 
        ? item.data.preview.images[0].source.url.replace('preview', 'i') 
        : '',
    };

    return postData;
  })
}

function createDateString(date: Date) {
  return `${date.getDate()} ${MONTHS[(date.getMonth())]} ${date.getFullYear()}`;
}

export function usePostsData() {
  const [postsData, setPostsData] = useState<IPostData[]>([]);
  const token = useContext(tokenContext);
  
  useEffect(() => {
    axios.get('https://oauth.reddit.com/best.json?sr_detail=true', {
      headers: { Authorization: `bearer ${token}` }
    })
      .then((response) => {
        const postsArray = response.data.data.children;
        console.log(postsArray)
        const posts = createPostsData(postsArray);
        setPostsData(posts);
      })
      .catch(console.log);
  }, [token]);

  return [postsData];
}
