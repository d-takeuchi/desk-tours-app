import { useEffect, useState, VFC } from "react";
import { Link } from "react-router-dom";
import { useDecodedToken } from "../../hooks/useDecodedToken";

import { Profile } from "../../types/profile";
import PostCard from "../organisms/PostCard";
import axios from "../../http";
import { PencilAltIcon } from "@heroicons/react/outline";

type Props = {
  display: "myFavorites" | "myPosts";
};

const MyPage: VFC<Props> = ({ display }) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  const { email } = useDecodedToken()!;

  useEffect(() => {
    axios
      .get<Profile>(`http://localhost:3000/users/${email}`)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [email]);

  return (
    <div className="flex-grow bg-primary">
      <div className="flex flex-wrap items-center justify-center">
        <div className="w-full bg-primary shadow-lg transform duration-200 easy-in-out ">
          <div className="h-32 overflow-hidden"></div>
          <div className="h-32 flex justify-center px-5  -mt-12">
            <img
              className="h-32 w-32 bg-white p-2 rounded-full   "
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              alt=""
            />
          </div>
          <div>
            <div className="text-center px-14 ">
              <h2 className="text-white text-3xl font-bold mb-2">
                {profile?.name}
              </h2>
              <Link
                to={`/users/profile/edit/${profile?.id}`}
                className="text-white"
              >
                <div className="flex justify-center">
                  <PencilAltIcon className="h-6 mr-2" />
                  <p>プロフィール編集</p>
                </div>
              </Link>
            </div>
            <div className="mx-auto w-full sm:w-2/3 flex bg-gray-100 mt-6">
              <Link
                to={`/users/profile/${profile?.id}/myPosts`}
                className={`text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer ${
                  display === "myPosts"
                    ? "border-b-4 border-blue-400 font-bold"
                    : ""
                }`}
              >
                <p>投稿</p>
              </Link>

              <div className="border"></div>
              <Link
                to={`/users/profile/${profile?.id}/myFavorites`}
                className={`text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer ${
                  display === "myFavorites"
                    ? "border-b-4 border-blue-400 font-bold"
                    : ""
                }`}
              >
                <p>いいね</p>
              </Link>
            </div>
          </div>
          <div>
            <div className="p-6 px-20 ">
              {display === "myPosts"
                ? profile?.posts.map((post) => (
                    <PostCard
                      key={post.id}
                      id={post.id}
                      title={post.title}
                      imageFile={post.imageFile}
                      commentsCount={post.commentsCount}
                      likesCount={post.likesCount}
                    />
                  ))
                : profile?.likes.map((like) => (
                    <PostCard
                      key={like.post.id}
                      id={like.post.id}
                      title={like.post.title}
                      imageFile={like.post.imageFile}
                      commentsCount={like.post.commentsCount}
                      likesCount={like.post.likesCount}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
