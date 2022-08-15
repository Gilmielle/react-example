import React from 'react';
import styles from './title.css';

export function Title() {
  return (
    <h2 className={styles.title}>
      <a className={styles.postLink} href='#post-url'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, quas perspiciatis fuga nobis fugit eos omnis inventore laboriosam veniam culpa itaque possimus nesciunt dolor autem quod quaerat in a consequuntur.
      </a>
    </h2>
  );
}