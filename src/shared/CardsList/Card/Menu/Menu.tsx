import React from 'react';
import { Dropdown } from '../../../Dropdown';
import { MenuIcon } from '../../../Icons';
import { Text, EColors } from '../../../Text';
import styles from './menu.css';
import { MenuItemsList } from './MenuItemsList';

export function Menu() {
  return(
    <div className={styles.menu}>
      <button className={styles.menuButton}>
        <MenuIcon />
      </button>
      {/* <Dropdown
        button={
          <button className={styles.menuButton}>
            <MenuIcon />
          </button>
        }
      >
        <div className={styles.dropdown}>
          <MenuItemsList postId='1234' />
          <button className={styles.closeButton}>
            <Text mobileSize={12} size={14} color={EColors.grey66}>
              Закрыть
            </Text>
          </button>
        </div>
      </Dropdown> */}
    </div>
  );
}