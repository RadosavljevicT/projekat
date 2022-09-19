import React from 'react'
import { useParams } from 'react-router'
import { IconButton } from 'rsuite';
import useGet from '../../hooks/useGet';
import { User } from '../../types';
import UserAvatar from '../UserAvatar';
import MessageIcon from '@rsuite/icons/Message';
import PostCard from '../PostCard';
import axios from 'axios';
import { useAppContext } from '../../hooks/useAppContext';
import { Link } from 'react-router-dom';
export default function UserShowPage() {
  const id = Number(useParams().id);
  const [user, setUser] = useGet<User>('/user/' + id);
  const loginUser = useAppContext().user;
  if (!user) {
    return null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-end' }}>
        <div>
          <UserAvatar user={user} />
        </div>
        {
          !loginUser?.admin && loginUser?.id !== user?.id && (
            <div>
              <Link to={`/chat/${user.id}`} target='_blank' >
                <IconButton appearance='primary' icon={<MessageIcon />} />
              </Link>
            </div>
          )
        }
      </div>
      <div style={{ textAlign: 'center', fontSize: '24px', paddingTop: '50px' }}>
        User posts
      </div>
      {
        (user.posts || []).length === 0 ? (
          <div>User has no posts</div>
        ) : user.posts?.slice().sort((a, b) => (b.id || 0) - (a.id || 0)).map(post => {
          return (
            <PostCard
              fluid
              onDelete={async () => {
                await axios.delete('/post/' + post.id);
                setUser(prev => {
                  if (!prev) {
                    return prev;
                  }
                  return {
                    ...prev,
                    posts: prev.posts?.filter(e => e !== post)
                  }
                })
              }}
              onRemoveComment={async id => {
                await axios.delete(`/post/${post.id}/comment/` + id);
                setUser(prev => {
                  if (!prev) {
                    return prev;;
                  }
                  return {
                    ...prev,
                    posts: (prev.posts || []).map(element => {
                      if (element === post) {
                        return {
                          ...post,
                          comments: (element.comments || []).filter(c => c.id !== id)
                        }
                      }
                      return element;
                    })
                  }
                })
              }}
              post={{ ...post, user }}
              onComment={async text => {
                const res = await axios.post(`/post/${post.id}/comment`, { content: text });
                setUser(prev => {
                  if (!prev) {
                    return prev;;
                  }
                  return {
                    ...prev,
                    posts: (prev.posts || []).map(element => {
                      if (element === post) {
                        return {
                          ...post,
                          comments: !element.comments ? [res.data] : [...element.comments, res.data]
                        }
                      }
                      return element;
                    })
                  }
                })
              }}
            />
          )
        })
      }
    </div>
  )
}
