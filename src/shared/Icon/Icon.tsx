import React from "react";
import styles from './icon.css'
import { BlockIcon, CommentIcon, SaveIcon, ShareIcon, WarningIcon } from "../Icons";

export const EIcons = {
  block: <BlockIcon />,
  comment: <CommentIcon />,
  save: <SaveIcon />,
  share: <ShareIcon />,
  warning: <WarningIcon />,
}

type TIconSize = 8 | 10 | 12 | 14 | 16 | 18 | 20;

interface IIconProps {
  name: React.ReactNode;
  size?: TIconSize;
}

export function Icon(props: IIconProps) {
  const { name, size } = props;

  return (
    <span className={styles.icon} style={{width: size, height: size}}>
      {name}
    </span>
  )
}