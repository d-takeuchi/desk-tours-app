import { memo } from 'react'
import { useQueryPosts } from '../../../hooks/useQueryPosts'
import { Spinner } from '../../atoms/Spinner'
import { PostCard } from '../../organisms/posts/PostCard'

const PostList = memo(() => {
  const { data: posts, isLoading } = useQueryPosts()

  if (isLoading) return <Spinner />

  return (
    <div className="flex-grow bg-primary">
      <div className="container items-center px-5 py-8 mx-auto lg:px-24 min-h-screen">
        <h1 className="text-2xl text-white mb-5">投稿一覧</h1>
        <div className="flex flex-wrap mb-12 text-left">
          {posts?.map((post) => (
            <PostCard key={post.id} id={String(post.id)} />
          ))}
        </div>
      </div>
    </div>
  )
})

export default PostList
