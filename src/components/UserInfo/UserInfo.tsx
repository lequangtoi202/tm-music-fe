import classNames from 'classnames/bind';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from '../Image/Image';
import styles from './UserInfo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '../../model/User';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

const cx = classNames.bind(styles);
interface UserInfoProps {
  userId: number;
  timestamp: string;
}
function UserInfo({ userId, timestamp }: UserInfoProps) {
  const [user, setUser] = useState<User | null>(null);

  if (user) {
    return (
      <>
        <Image src={user?.avatar} className={cx('user-avatar')} alt="aa" />
        <div className={cx('user-display')}>
          <div className={cx('displayName')}>{user?.fullName}</div>
          <span>
            <FontAwesomeIcon icon={['fas', 'globe-asia']} />
            {formatDistanceToNow(new Date(timestamp), {
              addSuffix: true,
              locale: vi,
            })}
          </span>
        </div>
      </>
    );
  }
  return null;
}

export default UserInfo;
