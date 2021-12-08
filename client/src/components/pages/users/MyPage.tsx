import { memo, VFC } from 'react'
import { Link } from 'react-router-dom'
import { PencilAltIcon } from '@heroicons/react/outline'

import { useQueryUser } from '../../../hooks/useQueryUser'
import { PostCard } from '../../organisms/posts/PostCard'
import { Spinner } from '../../atoms/Spinner'

interface Props {
  display: 'myFavorites' | 'myPosts'
}

export const MyPage: VFC<Props> = memo(({ display }) => {
  const { data: user, isLoading } = useQueryUser()

  if (isLoading) return <Spinner />
  return (
    <div className="flex-grow bg-primary min-h-screen">
      <div className="flex flex-wrap items-center justify-center">
        <div className="w-full bg-primary shadow-lg transform duration-200 easy-in-out ">
          <div className="h-32 overflow-hidden"></div>
          <div className="h-32 flex justify-center px-5  -mt-12">
            {user?.icon ? (
              <img
                className="h-32 w-32 bg-white p-2 rounded-full"
                src={user?.icon}
                alt="アイコン"
              />
            ) : (
              <svg
                className="h-32 w-32 bg-white p-2 rounded-full"
                fill="gray"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </div>
          <div>
            <div className="text-center px-14 ">
              <h2 className="text-white text-3xl font-bold mb-2">
                {user?.name}
              </h2>
              <Link to={`/users/edit/${user?.id}`} className="text-white">
                <div className="flex justify-center">
                  <PencilAltIcon className="h-6 mr-2" />
                  <p>プロフィール編集</p>
                </div>
              </Link>
            </div>
            <div className="mx-auto w-full sm:w-2/3 flex bg-gray-100 mt-6">
              <Link
                to={`/users/${user?.id}/myPosts`}
                className={`text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer ${
                  display === 'myPosts'
                    ? 'border-b-4 border-blue-400 font-bold'
                    : ''
                }`}
              >
                <p>投稿</p>
              </Link>

              <div className="border"></div>
              <Link
                to={`/users/${user?.id}/myFavorites`}
                className={`text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer ${
                  display === 'myFavorites'
                    ? 'border-b-4 border-blue-400 font-bold'
                    : ''
                }`}
              >
                <p>いいね</p>
              </Link>
            </div>
          </div>
          <div>
            {display === 'myPosts'
              ? user?.posts.map((post) => (
                  <div className="p-6 px-20 ">
                    <PostCard key={post.id} id={String(post.id)} />
                  </div>
                ))
              : user?.likes.map((like) => (
                  <div className="p-6 px-20 ">
                    <PostCard key={like.post.id} id={String(like.post.id)} />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  )
})
