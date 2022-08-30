import React, { useRef } from 'react';
import { Card } from './Card';
import styles from './cardslist.css';
import { usePostsData } from '../../hooks/usePostsData';
import { LoadingIcon } from '../Icons';

export function CardsList() {
  const bottomOfList = useRef<HTMLDivElement>(null);
  const [{ posts, loading, errorLoading, isMultipleOfThree }] = usePostsData(bottomOfList);

  return (
    <ul className={styles.cardsList}>
      {posts.length === 0 && !loading && !errorLoading && (
        <div role='alert' style={{ textAlign: 'center' }}>Нет ни одного поста</div>
      )}

      {
        posts.map(post => (
          <Card 
            key={post.id} 
            postData={post}
          />
      ))}

      {isMultipleOfThree && (
        <button>Загрузить ещё</button>
      )}

      <div ref={bottomOfList} />

      {loading && (
        <div className={styles.loadingBlock} role='alert' >
          <LoadingIcon className={styles.spinner} />
          Загрузка...
        </div>
      )}

      {errorLoading && (
        <div role='alert' style={{ textAlign: 'center' }}>
          {errorLoading}
        </div>
      )}
    </ul>
  );
}