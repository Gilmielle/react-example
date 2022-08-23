import React, { useEffect, useRef } from 'react';
import { Dropdown } from '../../../Dropdown';
import { MenuIcon } from '../../../Icons';
import { Text, EColors } from '../../../Text';
import styles from './menu.css';
import { MenuItemsList } from './MenuItemsList';

interface IMenuProps {
  postId: string;
}

export function Menu({ postId }: IMenuProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Element && event.target != null && buttonRef.current?.contains(event.target)) {
        const clickPosition = event.target.getBoundingClientRect();
        if (dropdownRef.current) {
          const positionTop = event.pageY + clickPosition.height;
          let positionRight
          if(window.innerWidth >= 1024) {
            positionRight = window.innerWidth - clickPosition.right - clickPosition.width*1.5;
          } else {
            positionRight = window.innerWidth - clickPosition.right;
          }
          dropdownRef.current.style.top = `${positionTop}px`;
          dropdownRef.current.style.right = `${positionRight}px`;
        }
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, [])

  return(
    <div className={styles.menu}>
      <Dropdown
        button={
          <button className={styles.menuButton} ref={buttonRef}>
            <MenuIcon />
          </button>
        }
      >
        <div className={styles.dropdown} ref={dropdownRef}>
          <MenuItemsList postId={postId} />
          <button className={styles.closeButton}>
            <Text mobileSize={12} size={14} color={EColors.grey66}>
              Закрыть
            </Text>
          </button>
        </div>
      </Dropdown>
    </div>
  );
}