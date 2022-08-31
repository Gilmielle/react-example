import React, { useRef } from 'react';
import { Card } from './Card';
import styles from './cardslist.css';
import { usePostsData } from '../../hooks/usePostsData';
import { LoadingIcon } from '../Icons';
import { EColors, Text } from '../Text';

export function CardsList() {
  const bottomOfList = useRef<HTMLDivElement>(null);
  const [{ posts, loading, errorLoading, isMultipleOfThree, setIsMultipleOfThree }] = usePostsData(bottomOfList);

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
        <button className={styles.moreBtn} onClick={() => { setIsMultipleOfThree(false) }}>
          <Text size={20} color={EColors.orange} bold>
            Загрузить ещё
          </Text>
        </button>
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