import React from 'react';
import styles from './controls.css';
import { CommentsButton } from './CommentsButton';
import { KarmaCounter } from './KarmaCounter';
import { ShareButton } from './ShareButton';
import { SaveButton } from './SaveButton';

interface IControlsProps {
  commentsNum: number;
  rating: number;
}

export function Controls({ commentsNum, rating }: IControlsProps) {
  return(
    <div className={styles.controls}>
      <KarmaCounter rating={rating} />
      <CommentsButton commentsNum={commentsNum} />
      <div className={styles.actions}>
        <ShareButton />
        <SaveButton />
      </div>
    </div>
  );
}