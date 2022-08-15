import React from 'react';
import styles from './preview.css';

export function Preview() {
  return (
    <div className={styles.preview}>
      <img
          className={styles.previewImg}
          src='https://cdn.dribbble.com/userupload/3265626/file/original-fc25c90958e92c494cfcf41d4aab3d17.png?compress=1&resize=1024x819'
        />
    </div>
  );
}