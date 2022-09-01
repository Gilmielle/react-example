import React from "react";
import { Break } from "../../../Break";
import { AnonIcon } from "../../../Icons";
import { EColors, Text } from "../../../Text";
import styles from './userblock.css'

interface IUserBlockProps {
  avatarSrc?: string;
  username?: string;
  loading?: boolean;
}


export function UserBlock({ avatarSrc, username, loading }: IUserBlockProps) {
  const DOMAIN = process.env.DOMAIN;
  
  return (
    <a 
      href={`https://www.reddit.com/api/v1/authorize?client_id=U_XNLBmO0ls1fJmnBHww_g&response_type=code&state=random_string&redirect_uri=${DOMAIN}/auth&duration=permanent&scope=read submit identity`}
      className={styles.userBox}
    >
      <div className={styles.avatarBox}>
        {avatarSrc
          ? <img src={avatarSrc} alt='user avatar' className={styles.avatarImage} />
          : <AnonIcon />  
        }
      </div>

      <div className={styles.username}>
        <Break size={12} />
        {loading ? (
          <Text size={20} color={EColors.grey99}>Загрузка...</Text>
        ) : (
          <Text size={20} color={username ? EColors.black : EColors.grey99}>{username || 'Аноним'}</Text>
        )}
      </div>
    </a>
  )
}