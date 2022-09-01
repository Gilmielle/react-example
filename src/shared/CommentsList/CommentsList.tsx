import React, { useEffect } from "react";
import { usePostCommentsData } from "../../hooks/usePostCommentsData";
import styles from './commentsList.css';
import { Comment } from './Comment';

interface ICommentsListProps {
  id: string;
}

export function CommentsList({ id }: ICommentsListProps) {
  const [comments] = usePostCommentsData(id);
  
  function createCommentsList<T extends Array<any>>(array: T) {
    return (
    <ul className={styles.commentsList}>
      {
        array.map((item) => {
          return <Comment 
            key={item.id} 
            author={item.author}
            body={item.body}
            createdAt={item.createdAt}
            id={item.id}
            rating={item.rating}
            replies={item.replies}
            children={item.replies ? createCommentsList(item.replies) : null}
          />
        })
      }
    </ul>)
  }

  return(
    createCommentsList(comments)
  );
}