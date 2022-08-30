import React from 'react';
import { usePostsData } from '../../hooks/usePostsData';

export interface IPostContextData {
  author: string;
  title: string;
  rating: number;
  id: string;
  commentsNum: number;
  createdAt: string;
  avatarImg: string;
  previewImg: string;
  subreddit: string;
}

export const postsContext = React.createContext<IPostContextData[]>([]);

export function PostsContextProvider({ children }: { children: React.ReactNode }) {
  const posts = [{
    author: '',
    title: '',
    rating: 0,
    id: '',
    commentsNum: 0,
    createdAt: '',
    avatarImg: '',
    previewImg: '',
    subreddit: '',
  }];

  return (
    <postsContext.Provider value={posts}>
      {children}
    </postsContext.Provider>
  )
}