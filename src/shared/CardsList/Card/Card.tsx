import React from 'react';
import { IPostContextData } from '../../context/postsContext';
import styles from './card.css';
import { CardContent } from './CardContent';
import { Controls } from './Controls';
import { Menu } from './Menu';

interface ICardProps {
  postData: IPostContextData;
}

export function Card({ postData }: ICardProps) {
  return (
    <li className={styles.card}>
      <CardContent 
        author={postData.author} 
        title={postData.title} 
        createdAt={postData.createdAt} 
        avatarImg={postData.avatarImg} 
        previewImg={postData.previewImg} 
        subreddit={postData.subreddit} 
        id={postData.id}
      />
      <Menu postId={postData.id} />
      <Controls commentsNum={postData.commentsNum} rating={postData.rating} />
    </li>
  );
}