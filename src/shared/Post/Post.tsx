import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { CommentForm } from '../CommentForm';
import styles from './post.css'

interface IPostProps {
  onClose?: () => void;
}

export function Post(props: IPostProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && !ref.current?.contains(event.target))
      props.onClose?.();
    }
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, [])

  const node = document.querySelector('#modal_root');
  if (!node) return null;

  return ReactDOM.createPortal((
    <div className={styles.modal} ref={ref}>
      <h2>Lorem ipsum dolor, sit amet consectetur adipisicing elit. A culpa quibusdam voluptatibus totam nulla perspiciatis, reprehenderit quisquam</h2>

      <div className={styles.content}>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis asperiores quis aut corrupti maxime. Quidem, nisi porro, at eaque neque nihil architecto voluptatem, sapiente enim reprehenderit non corrupti laboriosam autem.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis asperiores quis aut corrupti maxime. Quidem, nisi porro, at eaque neque nihil architecto voluptatem, sapiente enim reprehenderit non corrupti laboriosam autem.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis asperiores quis aut corrupti maxime. Quidem, nisi porro, at eaque neque nihil architecto voluptatem, sapiente enim reprehenderit non corrupti laboriosam autem.</p>
      </div>

      <CommentForm />
    </div>
    ), node);
}