import React, { useState } from 'react';
import { Post } from '../../../../../Post';
import styles from './title.css';

interface ITitleProps {
  title: string;
  subreddit: string;
  id: string;
}

export function Title({ title, subreddit, id }: ITitleProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <h2 className={styles.title} onClick={ () => { setIsModalOpen(true) } }>
      <a className={styles.postLink} href='#post-url'>
        {title}
      </a>

      {isModalOpen && (
        <Post 
          onClose={() => { setIsModalOpen(false) }}
          title={title}
          subreddit={subreddit}
          id={id}
        />
      )}
    </h2>
  );
}