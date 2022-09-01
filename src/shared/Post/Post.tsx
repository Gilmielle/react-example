import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useCloseModal } from '../../hooks/useCloseModal';
import { Break } from '../Break';
import { CommentFormContainer } from '../CommentFormContainer';
import { CommentsList } from '../CommentsList';
import styles from './post.css'

interface IPostProps {
  title?: string;
}

export function Post() {
  const ref = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const id = history.location.pathname.replace('/posts/', '');
  const location = useLocation<{title: string;}>();
  const title = location.state.title;

  useCloseModal(ref, history);

  const node = document.querySelector('#modal_root');
  if (!node) return null;

  return ReactDOM.createPortal((
    <div className={styles.modal} ref={ref}>
      <h2>{title}</h2>

      <div className={styles.content}>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis asperiores quis aut corrupti maxime. Quidem, nisi porro, at eaque neque nihil architecto voluptatem, sapiente enim reprehenderit non corrupti laboriosam autem.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis asperiores quis aut corrupti maxime. Quidem, nisi porro, at eaque neque nihil architecto voluptatem, sapiente enim reprehenderit non corrupti laboriosam autem.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis asperiores quis aut corrupti maxime. Quidem, nisi porro, at eaque neque nihil architecto voluptatem, sapiente enim reprehenderit non corrupti laboriosam autem.</p>
      </div>

      <CommentFormContainer />
      <Break size={20} top />
      <div className={styles.divider}></div>
      <Break size={20} top />
      <CommentsList id={id} />
    </div>
    ), node);
}