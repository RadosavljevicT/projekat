import React from 'react'
import { Avatar } from 'rsuite'
import { User } from '../types'
import { Link } from 'react-router-dom'
import { useAppContext } from '../hooks/useAppContext'
interface Props {
  user?: User,
  basic?: boolean,
  size?: 'lg' | 'md' | 'sm' | 'xs'
}

export default function UserAvatar(props: Props) {
  const loginUser = useAppContext().user;
  if (!props.user) {
    return null;
  }
  const username = (loginUser?.id === props.user.id) ? 'You' : props.user.firstName + props.user.lastName
  return (
    <Link to={'/user/' + props.user.id}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar size={props.size || 'lg'} circle src={props.user.imageUrl} />
        {
          !props.basic && <div style={{ fontSize: '18px', paddingLeft: '10px' }}>{username}</div>
        }
      </div>
    </Link>
  )
}
