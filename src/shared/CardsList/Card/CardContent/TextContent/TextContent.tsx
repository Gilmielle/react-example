import React from 'react';
import styles from './textContent.css';
import { Title } from './Title';
import { UserLink } from './UserLink';

interface ITextContentProps {
  author: string;
  title: string;
  createdAt: string;
  avatarImg: string;
}

export function TextContent(props: ITextContentProps) {
  return (
    <div className={styles.textContent}>
      <div className={styles.metaData}>
        <UserLink author={props.author} avatarImg={props.avatarImg} />
        <span className={styles.createdAt}>
          <span className={styles.publishedLabel}>опубликовано </span>
          {props.createdAt}
        </span>
      </div>
      <Title title={props.title}/>
    </div>
  );
}