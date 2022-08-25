import React, { MouseEventHandler, useState } from "react";
import { UserLink } from "../../CardsList/Card/CardContent/TextContent/UserLink";
import { KarmaCounter } from "../../CardsList/Card/Controls/KarmaCounter";
import { CommentForm } from "../../CommentForm";
import { CommentIcon, ShareIcon, WarningIcon } from "../../Icons";
import { ReplyFormContainer } from "../../ReplyFormContainer";
import { Text } from "../../Text";
import styles from './comment.css';
import { ReplyForm } from "./ReplyForm";

interface ICommentProps {
  author: string;
  body: string;
  createdAt: string;
  id: string;
  rating: number;
  replies?: ICommentProps[];
  children?: React.ReactNode;
}

export function Comment(postData: ICommentProps) {
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);
  function handleCommentReply(event: React.MouseEvent<HTMLButtonElement>) {
    if (isReplyFormOpen) {
      setIsReplyFormOpen(false);
    } else {
      setIsReplyFormOpen(true);
    }
  }

  return(
    <li className={styles.container}>
      <div className={styles.commentContent}>
        <KarmaCounter rating={postData.rating} />
        <div className={styles.body}>
          <div className={styles.header}>
            <UserLink author={postData.author} />
            <span className={styles.createdAt}>{postData.createdAt}</span>
            <span className={styles.league}>Лига юристов</span>
          </div>

          <Text As="p" size={14}>{postData.body}</Text>

          <div className={styles.controls}>
            <button className={styles.control} onClick={handleCommentReply}>
              <CommentIcon />
              Ответить
            </button>
            <button className={styles.control}>
              <ShareIcon />
              Поделиться
            </button>
            <button className={styles.control}>
              <WarningIcon />
              Пожаловаться
            </button>
          </div>
        </div>
      </div>
      {isReplyFormOpen && (
        <ReplyFormContainer author={postData.author} />
      )}
      {postData.children}
    </li>
  )
}