import React, { useEffect, useState, VFC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Resizer from "react-image-file-resizer";

import { schema } from "../../validations/posts/create";
import PostCategoryTag from "../organisms/PostCategoryTag";
import { useDecodedToken } from "../../hooks/useDecodedToken";
import axios from "axios";

const PostCreate: VFC = () => {
  const [deskImageUrl, setDeskImageUrl] = useState("");

  type FormInputData = {
    title: string;
    imageFile: string;
    description: string;
    tagIds: number[];
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      tagIds: [],
      imageFile: "",
      description: "",
    },
  });

  const currentUser = useDecodedToken();
  const onSubmit = (data: FormInputData) => {
    axios
      .post("http://localhost:3000/posts", {
        ...data,
        imageFile: deskImageUrl,
        email: currentUser!.email,
      })
      .then(() => {})
      .catch((err) => {
        console.error(err);
      });
  };

  const resizeFile = (file: Blob) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        200,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const processImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];

    if (imageFile !== undefined) {
      if (/image.*/.exec(imageFile.type)) {
        const resizeImage = (await resizeFile(imageFile)) as string;
        setDeskImageUrl(resizeImage);
      }
    }
  };

  type Tag = {
    id: number;
    name: string;
  };

  const [tags, setTags] = useState<Array<Tag>>([]);

  useEffect(() => {
    axios
      .get<Array<Tag>>("http://localhost:3000/tags")
      .then((res) => setTags(res.data));
  }, []);

  return (
    <div className="flex-grow bg-primary">
      <div className="container items-center px-5 pb-8 mx-auto lg:px-24 mt-10">
        <h1 className="text-2xl text-white mb-5">新規投稿</h1>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6 ">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        タイトル
                      </label>
                      <div className="mt-1">
                        <input
                          {...register("title")}
                          className="shadow-sm appearance-none border border-gray-300 rounded-md  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="title"
                          type="text"
                        />
                        <span className="text-xs text-red-700">
                          {errors.title?.message}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        デスク写真
                      </label>
                      <div className="flex flex-col lg:flex-row justify-between">
                        <input
                          type="file"
                          {...register("imageFile")}
                          id="imageFile"
                          accept="image/*"
                          onChange={processImage}
                          className="h-10"
                        />
                        {deskImageUrl ? (
                          <img src={deskImageUrl} alt="deskImage" />
                        ) : (
                          <img
                            src="http://placehold.jp/300x200.png"
                            alt="deskImage"
                          />
                        )}
                      </div>
                      <span className="text-xs text-red-700">
                        {errors.imageFile?.message}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        紹介文
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="description"
                          rows={3}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          {...register("description")}
                        />
                        <span className="text-xs text-red-700">
                          {errors.description?.message}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="tags"
                      className="block text-sm font-medium text-gray-700 mb-5"
                    >
                      タグ
                    </label>

                    <div className="flex flex-col sm:flex-row">
                      {tags.map((tag) => (
                        <PostCategoryTag
                          key={tag.id}
                          tagId={tag.id}
                          tagName={tag.name}
                          register={register}
                        />
                      ))}
                    </div>
                    <div className="mt-5">
                      <span className="text-xs text-red-700 ">
                        {(errors.tagIds as any)?.message}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primaryButton hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    投稿
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCreate;
