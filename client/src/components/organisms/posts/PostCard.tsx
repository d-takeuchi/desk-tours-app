import { memo, VFC } from "react";
import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/outline";
import { ChatAltIcon } from "@heroicons/react/outline";

type Props = {
  id: number;
  title: string;
  imageFile: string;
  likesCount: number;
  commentsCount: number;
};

const PostCard: VFC<Props> = memo((props) => {
  const { id, title, imageFile, commentsCount, likesCount } = props;

  return (
    <div className="w-full p-6 mx-auto lg:w-1/3 sm:w-2/3">
      <div className="shadow-xl  rounded-xl bg-blueGray-50">
        <Link to={`/posts/view/${id}`}>
          <img
            className="object-cover object-center w-full lg:h-60 md:h-36 rounded-t-xl"
            src={imageFile}
            alt="deskImg"
          />
        </Link>
        <div className="flex justify-between p-4 lg:p-8 bg-white rounded-b-xl">
          <h3>{title}</h3>

          <div className="flex">
            <HeartIcon className="h-5 w-5 text-gray-400 cursor-pointer" />
            <p>{likesCount}</p>
            <ChatAltIcon className="h-5 w-5 text-gray-400 ml-2 cursor-pointer" />
            <p>{commentsCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PostCard;
