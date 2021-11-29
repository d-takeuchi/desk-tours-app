import { memo, VFC } from 'react'
import { Link } from 'react-router-dom'
import { HeartIcon } from '@heroicons/react/outline'
import { ChatAltIcon } from '@heroicons/react/outline'

import { useQuerySinglePost } from '../../../hooks/useQuerySinglePost'
import { useQueryUser } from '../../../hooks/useQueryUser'

interface Props {
  id: string
}

export const PostCard: VFC<Props> = memo(({ id }) => {
  const { data: post, isLoading: postIsLoading } = useQuerySinglePost(id)
  const { data: user, isLoading: userIsLoading } = useQueryUser()

  // const toggleFavorite = () => {
  //   axios
  //     .post<Post>('http://localhost:3000/likes', {
  //       userId: profile?.id,
  //       postId: id,
  //     })
  //     .then((res) => setPost(res.data))
  // }

  if (postIsLoading || userIsLoading) return <p>Loading...</p>
  return (
    <div className="w-full p-6 mx-auto lg:w-1/3 sm:w-2/3">
      <div className="shadow-xl  rounded-xl bg-blueGray-50">
        <Link to={`/posts/view/${id}`}>
          <img
            className="object-cover object-center w-full md:h-60 rounded-t-xl"
            src={post?.imageFile}
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
              // onClick={toggleFavorite}
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
