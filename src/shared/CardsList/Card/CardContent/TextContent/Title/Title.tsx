import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './title.css';

interface ITitleProps {
  title: string;
  id: string;
}

export function Title({ title, id }: ITitleProps) {
  return (
    <h2 className={styles.title} >
      <Link className={styles.postLink} to={{pathname: `/posts/${id}`, state: {title: title} }}>
        {title}
      </Link>
    </h2>
  );
}