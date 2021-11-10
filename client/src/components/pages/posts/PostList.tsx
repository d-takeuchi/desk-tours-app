import axios from "axios";
import { memo, useEffect, useState } from "react";

import PostCard from "../../organisms/posts/PostCard";
import { Post } from "../../../types/posts/post";

const PostList = memo(() => {
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get<Array<Post>>("http://localhost:3000/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex-grow bg-primary">
      <div className="container items-center px-5 py-8 mx-auto lg:px-24">
        <h1 className="text-2xl text-white mb-5">投稿一覧</h1>
        <div className="flex flex-wrap mb-12 text-left">
          {loading ? (
            <p>ローディング中</p>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                imageFile={post.imageFile}
                commentsCount={post.commentsCount}
                likesCount={post.likesCount}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
});

export default PostList;
