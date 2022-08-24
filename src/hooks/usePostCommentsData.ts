import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { tokenContext } from "../shared/context/tokenContext";
import { createDateString } from "../utils/js/createDateString";

interface IPostComments {
  author: string;
  body: string;
  createdAt: string;
  id: string;
  rating: number;
  replies?: IPostComments[];
}

function createCommentsData(data: any[]): IPostComments[] {
  const result = data
    .filter((item) => {
      if(item.kind !== 'more') {
        return true;
      } 
    })
    .map((item) => {
       {
        const commentsData: IPostComments = {
          author: item.data.author,
          body: item.data.body,
          createdAt: createDateString(new Date(item.data.created * 1000)),
          rating: item.data.ups,
          id: item.data.id,
          replies: item.data.replies ? createCommentsData(item.data.replies.data.children) : undefined,
        };
    
        return commentsData;
      }
    })

  return result;
}

export function usePostCommentsData(subreddit: string, id: string) {
  const [postCommentsData, setPostCommentsData] = useState<IPostComments[]>([]);
  const token = useContext(tokenContext);
  
  useEffect(() => {
    axios.get(`https://oauth.reddit.com/r/${subreddit}/comments/${id}.json?sr_detail=true`, {
      headers: { Authorization: `bearer ${token}` }
    })
      .then((response) => {
        const commentsArray = response.data[1].data.children;
        const comments = createCommentsData(commentsArray);
        setPostCommentsData(comments);
      })
      .catch(console.log);
  }, [subreddit, id]);

  return [postCommentsData];
}