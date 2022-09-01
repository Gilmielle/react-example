import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducer";
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

export function usePostCommentsData( id: string) {
  const [postCommentsData, setPostCommentsData] = useState<IPostComments[]>([]);
  const token = useSelector<RootState, string>(state => state.userToken);
  
  useEffect(() => {
    axios.get(`https://oauth.reddit.com/comments/${id}.json?sr_detail=true`, {
      headers: { Authorization: `bearer ${token}` }
    })
      .then((response) => {
        const commentsArray = response.data[1].data.children;
        const comments = createCommentsData(commentsArray);
        setPostCommentsData(comments);
      })
      .catch(console.log);
  }, [id]);

  return [postCommentsData];
}