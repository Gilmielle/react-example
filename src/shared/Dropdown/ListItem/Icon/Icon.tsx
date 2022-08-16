import React from 'react';

interface IIconProps {
  width: string;
  height: string;
  viewBox: string;
  path: string;
  fill: string;
}

export function Icon(props: IIconProps) {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={props.path} fill={props.fill} />
    </svg>
  )
}