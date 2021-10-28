import { memo, VFC } from "react";
import { Link } from "react-router-dom";

type Props = {
  image: string;
};

const PostCard: VFC<Props> = memo(({ image }) => {
  return (
    <div className="w-full p-6 mx-auto lg:w-1/3">
      <div className="shadow-xl  rounded-xl bg-blueGray-50">
        <Link to="/posts/view/1">
          <img
            className="object-cover object-center w-full lg:h-48 md:h-36 rounded-t-xl"
            src={image}
            alt="deskImg"
          />
        </Link>
        <div className="flex justify-between p-4 lg:p-8 bg-white rounded-b-xl">
          <h3>hogehoge</h3>

          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            100
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                clipRule="evenodd"
              />
            </svg>
            100
          </div>
        </div>
      </div>
    </div>
  );
});

export default PostCard;
