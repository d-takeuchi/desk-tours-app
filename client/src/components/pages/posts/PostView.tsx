import { useEffect, useState, VFC } from "react";
import { useParams } from "react-router";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";

import axios from "../../../http";
import { Link } from "react-router-dom";
type Post = {
  id: number;
  title: string;
  description: string;
  imageFile: string;
  tags: [
    {
      id: number;
      name: string;
    }
  ];
  comments: [
    {
      id: number;
      postId: number;
      comment: string;
    }
  ];
};

const PostView: VFC = () => {
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    axios
      .get<Post>(`http://localhost:3000/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="flex-grow bg-primary">
      <div className="container items-center px-5 pb-8 mx-auto lg:px-24 mt-10">
        <div className="flex items-center mb-5">
          <h1 className="text-2xl text-white ">投稿詳細</h1>
          <TrashIcon className="h-7 text-white cursor-pointer" />
          <Link to={`/posts/edit/${id}`}>
            <PencilAltIcon className="h-7 text-white cursor-pointer" />
          </Link>
        </div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-3">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className=" bg-white space-y-6 sm:p-6 ">
                <div className="mx-auto flex flex-wrap px-4 py-2">
                  <img
                    alt="デスクイメージ"
                    className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                    src={post?.imageFile}
                  />
                  <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                      {post?.title}
                    </h1>

                    <p className="leading-relaxed my-10">{post?.description}</p>

                    <div className="mt-5">
                      {post?.tags.map((tag) => (
                        <label className="bg-gray-200 px-4 py-2 rounded-lg border-solid border-4 border-light-blue-500 mr-10 p-10">
                          {tag.name}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="flex">
                      <img
                        src="https://images.unsplash.com/photo-1609349744982-0de6526d978b?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDU5fHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                        alt="avatar"
                        className="h-8 w-8 object-cover rounded-full"
                      />

                      <div className="bg-gray-100 w-auto rounded-xl px-2 pb-2 ml-5">
                        <div className="font-medium">
                          <a href="/" className="hover:underline text-sm">
                            <small>Arkadewi</small>
                          </a>
                        </div>
                        <div className="text-xs">
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Expedita, maiores!
                        </div>
                      </div>
                    </div>

                    <div className="ml-12 mt-5">
                      <form>
                        <label className="text-gray-700" htmlFor="name">
                          <textarea
                            className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            id="comment"
                            name="comment"
                            rows={1}
                            cols={30}
                          ></textarea>
                        </label>
                        <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primaryButton hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          コメントを投稿
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostView;
