import React from 'react';
import styles from './card.css';
import { CardContent } from './CardContent';
import { Controls } from './Controls';
import { Menu } from './Menu';

export function Card() {
  return (
    <li className={styles.card}>
      <CardContent />
      <Menu />
      <Controls />
    </li>
  );
}