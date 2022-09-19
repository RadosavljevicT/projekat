import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router'
import UserAvatar from '../../common/UserAvatar';
import { useAppContext } from '../../hooks/useAppContext';
import useGet from '../../hooks/useGet';
import { Message, User } from '../../types';

export default function ChatPage() {
  const otherId = Number(useParams().id);
  const [content, setContent] = useState('');
  const [user] = useGet<User>('/user/' + otherId);
  const loginUser = useAppContext().user;
  const [messages, setMessages] = useGet<Message[]>('/message/' + otherId);
  if (!user) {
    return null;
  }
  return (
    <div>
      <div style={{ fontSize: '24px', fontWeight: '700', textAlign: 'center', padding: '20px 0' }}>
        Chat with {user.firstName + ' ' + user.lastName}
      </div>
      {
        (messages || []).map(message => {
          return (
            <div style={{ display: 'flex' }}>
              <div style={{ paddingBottom: '20px', display: 'flex', marginLeft: (message.senderId === loginUser?.id) ? 'auto' : '' }} key={message.id}>
                {
                  message.senderId === user.id && (
                    <div style={{ paddingRight: '10px' }}>
                      <UserAvatar size='md' basic user={message.senderId === user.id ? user : loginUser} />
                    </div>
                  )
                }
                <div className='post-modal-trigger'>
                  {message.content}
                </div>
              </div>
            </div>
          )
        })
      }
      <div>
        <form onSubmit={async e => {
          e.preventDefault();
          const res = await axios.post('/message/' + otherId, { content });
          setContent('');
          setMessages(prev => {
            if (!prev) {
              return [res.data];
            }
            return [...prev, res.data];
          })
        }}>
          <input
            required
            value={content}
            onChange={e => setContent(e.currentTarget.value)}
            className='post-modal-trigger fluid' />
        </form>
      </div>
    </div>
  )
}
