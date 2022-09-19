import React, { useState } from 'react';
import { Form, IconButton, Schema } from 'rsuite';
import { useAppContext } from '../hooks/useAppContext';
import { Post } from '../types';
import UserAvatar from './UserAvatar';
import TrashIcon from '@rsuite/icons/Trash';
import moment from 'moment';
import MessageIcon from '@rsuite/icons/Message';
import { Link } from 'react-router-dom';
interface Props {
  post: Post,
  fluid?: boolean,
  onComment: (text: string) => Promise<void>,
  onDelete: () => void,
  onRemoveComment: (id?: number) => Promise<void>
}
const model = Schema.Model({
  content: Schema.Types.StringType().isRequired('Please enter a comment')
})

export default function PostCard(props: Props) {
  const [openComments, setOpenComments] = useState(false);
  const [formValue, setFormValue] = useState({ content: '' });
  const loginUser = useAppContext().user;
  return (
    <div className={'post-card' + (props.fluid ? ' fluid' : '')}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-end' }}>
        <div>
          <UserAvatar user={props.post.user} />
        </div>
        {
          loginUser?.id !== props.post.user?.id ? (
            <div>
              <Link to={`/chat/${props.post?.user?.id}`} target='_blank' >
                <IconButton appearance='primary' icon={<MessageIcon />} />
              </Link>
            </div>
          ) : (
            <IconButton
              onClick={() => {
                props.onDelete();
              }}
              style={{ color: 'white', backgroundColor: 'red' }} icon={<TrashIcon />} />
          )
        }
      </div>
      <div>
        Animal type: {props.post.animalType?.value}
      </div>
      <div>
        Created: {moment(props.post.createdAt).format('HH:mm DD.MM.YYYY')}
      </div>
      <div>
      </div>
      <div style={{ paddingTop: '20px', paddingBottom: '5px', borderBottom: '1px solid rgba(20, 32, 65, 0.15)' }}>
        <div dangerouslySetInnerHTML={{ __html: props.post.content }} />
      </div>
      <div>
        <div onClick={() => setOpenComments(prev => !prev)} className='hover-text'>Comments</div>
      </div>
      {
        openComments && (
          <div>
            {
              props.post.comments?.map(c => {
                return (
                  <div >
                    <UserAvatar size='sm' user={c.user} />
                    <div className='bb' style={{ paddingLeft: '40px', paddingBottom: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          {c.content}
                        </div>
                        {
                          (c.userId === loginUser?.id || props.post.userId === loginUser?.id) && (
                            <div>
                              <IconButton
                                onClick={() => {
                                  props.onRemoveComment(c.id);
                                }}
                                style={{ color: 'white', backgroundColor: 'red' }} icon={<TrashIcon />} />
                            </div>
                          )
                        }
                      </div>
                    </div>
                  </div>
                )
              })
            }
            <Form
              model={model}
              checkTrigger='none'
              formValue={formValue} onChange={val => setFormValue(val as any)}
              onSubmit={async ch => {
                if (!ch) {
                  return;
                }
                await props.onComment(formValue.content);
                setFormValue({ content: '' })
              }}
              fluid>
              <Form.Control name='content' placeholder='Write a comment' className='comment-input' />
            </Form>
          </div>
        )
      }
    </div>
  )
}
