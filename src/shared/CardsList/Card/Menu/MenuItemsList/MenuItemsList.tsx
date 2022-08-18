import React from "react";
import classNames from 'classnames';
import { BlockIcon, CommentIcon, SaveIcon, ShareIcon, WarningIcon } from "../../../../Icons";
import styles from './menuitemslist.css'
import { EColors, Text } from '../../../../Text';
import { EIcons, Icon } from "../../../../Icon";

interface IMenuItemsListProps {
  postId: string;
}

export function MenuItemsList({ postId }: IMenuItemsListProps) {
  const hiddenClass = styles.mobileHidden;
  const mobileHiddenItemClass = classNames(styles.menuItem, hiddenClass);
  const mobileHiddenDividerClass = classNames(styles.divider, hiddenClass);

  return (
    <ul className={styles.menuItemsList}>
      <li className={mobileHiddenItemClass}>
        <Icon name={EIcons.comment} />
        <Text size={12} color={EColors.grey99}>Комментарии</Text>
      </li>

      <div className={mobileHiddenDividerClass}></div>

      <li className={mobileHiddenItemClass}>
        <Icon name={EIcons.share} />
        <Text size={12} color={EColors.grey99}>Поделиться</Text>
      </li>

      <div className={mobileHiddenDividerClass}></div>

      <li className={styles.menuItem} onClick={() => console.log(postId)}>
        <Icon name={EIcons.block} />
        <Text size={12} color={EColors.grey99}>Скрыть</Text>
      </li>

      <div className={mobileHiddenDividerClass}></div>

      <li className={mobileHiddenItemClass}>
        <Icon name={EIcons.save} />
        <Text size={12} color={EColors.grey99}>Сохранить</Text>
      </li>

      <div className={styles.divider}></div>

      <li className={styles.menuItem}>
        <Icon name={EIcons.warning} />
        <Text size={12} color={EColors.grey99}>Пожаловаться</Text>
      </li>
    </ul>
  )
} 