import React from 'react';
import styles from './cardContent.css';
import { Preview } from './Preview';
import { TextContent } from './TextContent';

interface ICardContentProps {
  author: string;
  title: string;
  createdAt: string;
  avatarImg: string;
  previewImg: string;
}

export function CardContent(props: ICardContentProps) {
  return (
    <div className={styles.cardContent}>
      <TextContent 
        author={props.author} 
        title={props.title} 
        createdAt={props.createdAt} 
        avatarImg={props.avatarImg} 
      />
      <Preview previewImg={props.previewImg} />
    </div>
  );
}