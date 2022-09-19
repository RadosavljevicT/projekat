import React, { useState } from 'react'
import { IconButton, Pagination } from 'rsuite';
import useGet from '../../hooks/useGet';
import { Page, User } from '../../types';
import UserAvatar from '../UserAvatar';
import MessageIcon from '@rsuite/icons/Message';
import { useAppContext } from '../../hooks/useAppContext';
import { Link } from 'react-router-dom';

const pageSizeOptions = [10, 20, 30, 50, 100];

export default function UserSearchPage() {
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1);
  const loginUser = useAppContext().user;
  const [userData] = useGet<Page<User>>(`/user?search=${search}&page=${page - 1}&size=${pageSize}`);
  return (
    <div>
      <div>
        <input
          value={search}
          onChange={e => setSearch(e.currentTarget.value)}
          placeholder='Search...'
          className='post-modal-trigger fluid' />
      </div>
      {
        userData?.content.map(user => {
          return (
            <div key={user.id} style={{ paddingTop: '15px', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <UserAvatar user={user} />
              </div>
              {
                loginUser?.id !== user?.id && (
                  <div>
                    <Link to={`/chat/${user.id}`} target='_blank' >
                      <IconButton appearance='primary' icon={<MessageIcon />} />
                    </Link>
                  </div>
                )
              }
            </div>
          )
        })
      }

      <Pagination
        prev
        next
        first
        last
        activePage={page}
        onChangePage={setPage}
        total={userData?.totalElements || 0}
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
