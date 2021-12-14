import { memo, VFC } from 'react'
import { Link } from 'react-router-dom'
import { HeartIcon } from '@heroicons/react/outline'
import { ChatAltIcon } from '@heroicons/react/outline'

import { useQuerySinglePost } from '../../../hooks/useQuerySinglePost'
import { useMutatePost } from '../../../hooks/useMutatePost'
import { useQueryClient } from 'react-query'
import { LoginUserInfo } from '../../../types/types'

interface Props {
  id: string
}

export const PostCard: VFC<Props> = memo(({ id }) => {
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData<LoginUserInfo>('user')
  const { data: post } = useQuerySinglePost(id)
  const { toggleFavoriteMutation } = useMutatePost()

  return (
    <div className="w-full p-6 mx-auto lg:w-1/3 sm:w-2/3">
      <div className="shadow-xl  rounded-xl bg-blueGray-50">
        <Link to={`/posts/view/${id}`}>
          <img
            className="object-cover object-center w-full md:h-60 rounded-t-xl"
            src={post?.imageFileUrl}
            alt="deskImg"
          />
        </Link>
        <div className="flex justify-between p-4 lg:p-8 bg-white rounded-b-xl">
          <h3>{post?.title}</h3>

          <div className="flex">
            <HeartIcon
              className={`h-5 w-5  cursor-pointer ${
                post?.likes.find((like) => like.userId === user?.id)
                  ? 'text-red-600'
                  : 'text-gray-400'
              }`}
              onClick={() =>
                toggleFavoriteMutation.mutate({
                  userId: user?.id,
                  postId: post?.id,
                })
              }
            />
            <p>{post?.likesCount}</p>
            <ChatAltIcon className="h-5 w-5 text-gray-400 ml-2 " />
            <p>{post?.commentsCount}</p>
          </div>
        </div>
      </div>
    </div>
  )
})
