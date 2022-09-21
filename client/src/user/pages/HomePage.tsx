import axios from 'axios';
import React, { useState } from 'react'
import PostCard from '../../common/PostCard';
import Spinner from '../../common/Spinner';
import useGet from '../../hooks/useGet'
import { Post, AnimalType } from '../../types';
import CreatePost from '../components/CreatePost';

export default function HomePage() {
  const [posts, setPosts] = useGet<Post[]>('/post', []);
  const [animalsTypes] = useGet<AnimalType[]>('/animal-type');
  const [openModal, setOpenModal] = useState(false)
  if (!posts) {
    return (
      <Spinner />
    )
  }
  return (
    <div className='margin-bottom'>
      <CreatePost
        animalTypes={animalsTypes || []}
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={async (post) => {
          const res = await axios.post('/post', post);
          const newPost = {
            ...res.data,
            animalsType: animalsTypes?.find(e => e.id === res.data.animalTypeId)
          }
          setPosts(prev => !prev ? [newPost] : [newPost, ...prev]);
        }}
      />
      <div>
        <div
          onClick={() => setOpenModal(true)}
          className='post-modal-trigger pointer'>
          Whats on your mind...
        </div>
      </div>
      <div >
        {
          posts.map(post => {
            return (
              <PostCard
                onDelete={async () => {
                  await axios.delete('/post/' + post.id);
                  setPosts(prev => (prev || []).filter(p => p !== post));
                }
                }
                onRemoveComment={async id => {
                  await axios.delete(`/post/${post.id}/comment/` + id);
                  setPosts(prev => {
                    if (!prev) {
                      return [];
                    }
                    return prev.map(element => {
                      if (element === post) {
                        return {
                          ...post,
                          comments: (element.comments || []).filter(c => c.id !== id)
                        }
                      }
                      return element;
                    })
                  })
                }}
                onComment={async text => {
                  const res = await axios.post(`/post/${post.id}/comment`, { content: text });
                  setPosts(prev => {
                    if (!prev) {
                      return [];
                    }
                    return prev.map(element => {
                      if (element === post) {
                        return {
                          ...post,
                          comments: !element.comments ? [res.data] : [...element.comments, res.data]
                        }
                      }
                      return element;
                    })
                  })
                }}
                key={post.id} post={post} />
            )
          })
        }
      </div>
    </div>
  )
}
