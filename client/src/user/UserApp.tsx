import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserSearchPage from '../common/pages/UserSearchPage'
import UserShowPage from '../common/pages/UserShowPage'
import { User } from '../types'
import ChatPage from './pages/ChatPage'
import HomePage from './pages/HomePage'
import UserNavbar from './UserNavbar'

interface Props {
  user: User,
  onLogout: () => void
}

export default function UserApp(props: Props) {
  return (
    <div >
      <BrowserRouter>
        <UserNavbar onLogout={props.onLogout} user={props.user} />
        <div className='container'>
          <div className='content'>
            <Routes>
              <Route path='/user/:id' element={<UserShowPage />} />
              <Route path='/chat/:id' element={<ChatPage />} />
              <Route path='/user/' element={<UserSearchPage />} />
              <Route path='*' element={<HomePage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>

    </div>
  )
}
