import axios from "axios";
import { useEffect, useState, VFC } from "react";
import { Link } from "react-router-dom";
import { Post } from "../../types/post";
import PostCard from "../organisms/PostCard";
// import PostCard from "../organisms/PostCard";

const Home: VFC = () => {
  const [posts, setPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    axios
      .get<Array<Post>>("http://localhost:3000/posts/getNewArrivalPosts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {/* メインビジュアル */}
      <div className="bg-hero-img bg-cover bg-no-repeat bg-center relative overflow-hidden min-h-screen">
        <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
          <div className="lg:w-3/5 xl:w-2/5 flex flex-col items-start relative z-10">
            <h1 className="font-bold text-3xl sm:text-6xl text-white leading-tight mt-4">
              お気に入りのデスク環境を見つけてみませんか？
            </h1>
            <Link
              to="/posts/create"
              className="block bg-primaryButton hover:bg-gray-300 py-3 px-4 rounded-lg text-lg text-white font-bold uppercase mt-10"
            >
              あなたのデスク環境を投稿
            </Link>
          </div>
        </div>
      </div>

      {/* 投稿の新着 */}
      <section className="bg-primary">
        <div className="container items-center px-5 py-8 mx-auto lg:px-24">
          <div className="flex justify-between">
            <h2 className="font-medium text-white">新着</h2>
            <Link
              to="/posts"
              className="text-white bg-primaryButton rounded-xl py-2 px-8 hover:bg-gray-300"
            >
              すべて見る
            </Link>
          </div>

          <div className="flex flex-wrap mb-12 text-left">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                imageFile={post.imageFile}
                likesCount={post.likesCount}
                commentsCount={post.commentsCount}
                id={post.id}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
