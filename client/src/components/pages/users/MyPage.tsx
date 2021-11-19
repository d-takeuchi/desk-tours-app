import { memo, useContext, useEffect, VFC } from "react";
import { Link } from "react-router-dom";
import { PencilAltIcon } from "@heroicons/react/outline";

import { Profile } from "../../../types/users/profile";
import PostCard from "../../organisms/posts/PostCard";
import axios from "../../../http";
import { LoginUserContext } from "../../../providers/LoginUserProvider";

type Props = {
  display: "myFavorites" | "myPosts";
};

const MyPage: VFC<Props> = memo(({ display }) => {
  const { profile, setProfile } = useContext(LoginUserContext);

  useEffect(() => {
    axios
      .get<Profile>(`http://localhost:3000/users/${profile?.email}`)
      .then((res) => setProfile(res.data));
  }, [profile?.email, setProfile]);

  return (
    <div className="flex-grow bg-primary">
      <div className="flex flex-wrap items-center justify-center">
        <div className="w-full bg-primary shadow-lg transform duration-200 easy-in-out ">
          <div className="h-32 overflow-hidden"></div>
          <div className="h-32 flex justify-center px-5  -mt-12">
            {profile?.icon ? (
              <img
                className="h-32 w-32 bg-white p-2 rounded-full"
                src={profile?.icon}
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
            {display === "myPosts"
              ? profile?.posts.map((post) => (
                  <div className="p-6 px-20 ">
                    <PostCard key={post.id} id={post.id} />
                  </div>
                ))
              : profile?.likes.map((like) => (
                  <div className="p-6 px-20 ">
                    <PostCard key={like.post.id} id={like.post.id} />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default MyPage;
