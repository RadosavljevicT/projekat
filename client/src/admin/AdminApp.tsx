import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserShowPage from '../common/pages/UserShowPage'
import { User } from '../types'
import AdminNavbar from './AdminNavbar'
import AdminUsersPage from './pages/AdminUsersPage'
import StatisticsPage from './pages/StatisticsPage'

interface Props {
  user: User,
  onLogout: () => void
}

export default function AdminApp(props: Props) {

  return (
    <div className='all'>
      <BrowserRouter>
        <AdminNavbar onLogout={props.onLogout} user={props.user} />
        <div className='container'>
          <div className='content'>
            <Routes>
              <Route path='/statistics' element={<StatisticsPage />} />
              <Route path='*' element={<AdminUsersPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>

    </div>
  )
}
