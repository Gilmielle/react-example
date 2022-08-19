import React from 'react';
import styles from './header.css';
import { SearchBlock } from './SearchBlock';
import { SortBlock } from './SortBlock';
import { ThreadTitle } from './ThreadTitle';

export function Header() {
  // const { Consumer } = tokenContext;

  return (
    <header className={styles.header}>
      {/* <Consumer>
        {(token) => <SearchBlock token={token} />}
      </Consumer> */}
      <SearchBlock />
      <ThreadTitle />
      <SortBlock />
    </header>
  );
}
