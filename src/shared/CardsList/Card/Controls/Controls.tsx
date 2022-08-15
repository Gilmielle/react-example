import React from 'react';
import styles from './controls.css';
import { CommentsButton } from './CommentsButton';
import { KarmaCounter } from './KarmaCounter';
import { ShareButton } from './ShareButton';
import { SaveButton } from './SaveButton';

export function Controls() {
  return(
    <div className={styles.controls}>
      <KarmaCounter />
      <CommentsButton />
      <div className={styles.actions}>
        <ShareButton />
        <SaveButton />
      </div>
    </div>
  );
}