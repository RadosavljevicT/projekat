import React, { useState } from 'react'
import useGet from '../../hooks/useGet'
import { Page, User } from '../../types'
import Table, { Column } from '../../common/Table'
import { Button, ButtonGroup, Pagination } from 'rsuite'
import axios from 'axios'

const basicColumns: Column[] = [
  {
    header: 'ID',
    render: e => e.id
  },
  {
    header: 'Email',
    render: e => e.email
  },
  {
    header: 'First name',
    render: e => e.firstName
  },
  {
    header: 'Last name',
    render: e => e.lastName
  },
  {
    header: 'Admin',
    render: e => e.admin ? 'YES' : 'NO'
  },
  {
    header: 'Blocked',
    render: e => e.blocked ? 'YES' : 'NO'
  }
]
const pageSizeOptions = [10, 20, 30, 50, 100];

export default function AdminUsersPage() {

  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1);
  const [users, setUsers] = useGet<Page<User>>(`/user?search=${search}&page=${page - 1}&size=${pageSize}`);
  if (!users) {
    return null;
  }
  const changeProp = (user: User, propName: 'admin' | 'blocked') => async () => {
    await axios.patch('/admin/user/' + user.id, { [propName]: !user[propName] });
    setUsers(prev => {
      if (!prev) {
        return prev;
      }
      return {
        ...prev,
        content: prev.content.map(element => {
          if (element === user) {
            return {
              ...element,
              [propName]: !element[propName]
            }
          }
          return element;
        })
      }
    })
  }
  const columns: Column[] = [
    ...basicColumns,
    {
      header: 'Actions',
      render: (e: User) => {
        return (
          <div>
            <button className='action-button' onClick={changeProp(e, 'admin')}>
              Change to {e.admin ? ' regular user' : ' admin'}
            </button>
            <button className='action-button' onClick={changeProp(e, 'blocked')}>
              {e.blocked ? ' Unblock' : ' Block'}
            </button>
          </div>
        )
      }
    }
  ]
  return (
    <div>
      <div>
        <input
          value={search}
          onChange={e => setSearch(e.currentTarget.value)}
          placeholder='Search...'
          className='post-modal-trigger fluid' />
      </div>
      <Table
        columns={columns}
        data={users.content}
      />
      <Pagination
        prev
        next
        first
        last
        activePage={page}
        onChangePage={setPage}
        total={users?.totalElements || 0}
        limit={pageSize}
        onChangeLimit={setPageSize}
        maxButtons={3}
        size="sm"
        layout={["-", "pager", "limit"]}
        limitOptions={pageSizeOptions}
      />
    </div>
  )
}
