import React from 'react';
import styles from './userLink.css';

export function UserLink() {
  return (
    <div className={styles.userLink}>
      <img
        className={styles.avatar}
        src='https://cdn.dribbble.com/users/113499/avatars/original/yo.png?1331316089'
        alt='avatar'
      />
      <a className={styles.username} href='#user-url'>Дмитрий Гришин</a>
    </div>
  );
}