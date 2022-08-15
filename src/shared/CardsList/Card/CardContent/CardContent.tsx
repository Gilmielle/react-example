import React from 'react';
import styles from './cardContent.css';
import { Preview } from './Preview';
import { TextContent } from './TextContent';

export function CardContent() {
  return (
    <div className={styles.cardContent}>
      <TextContent />
      <Preview />
    </div>
  );
}