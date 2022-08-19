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
}

export const postsContext = React.createContext<IPostContextData[]>([]);

export function PostsContextProvider({ children }: { children: React.ReactNode }) {
  const [data] = usePostsData();

  return (
    <postsContext.Provider value={data}>
      {children}
    </postsContext.Provider>
  )
}