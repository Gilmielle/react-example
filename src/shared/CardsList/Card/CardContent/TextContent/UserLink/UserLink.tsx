import React from 'react';
import styles from './userLink.css';

interface IUserLinkProps {
  author: string;
  avatarImg: string;
}

export function UserLink({ author, avatarImg }: IUserLinkProps) {
  return (
    <div className={styles.userLink}>
      <img
        className={styles.avatar}
        src={avatarImg}
        alt='avatar'
      />
      <a className={styles.username} href='#user-url'>{author}</a>
    </div>
  );
}