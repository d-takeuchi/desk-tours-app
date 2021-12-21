import React, { VFC } from 'react'
import { useParams } from 'react-router'
import { PhotographIcon } from '@heroicons/react/outline'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useResizeFile } from '../../../hooks/useResizeFile'
import { useProcessPost } from '../../../hooks/useProcessPost'
import { useQueryTags } from '../../../hooks/useQueryTags'
import { PostCategoryTag } from '../../organisms/posts/PostCategoryTag'
import { useQuerySinglePost } from '../../../hooks/useQuerySinglePost'
import { UpdatePostData } from '../../../types/types'
import { schema } from '../../../validations/posts/create'
import { Spinner } from '../../atoms/Spinner'

export const PostEdit: VFC = () => {
  const {
    updatePost,
    deskImageUrl,
    setDeskImageUrl,
    addItem,
    removeItem,
    selectedItems,
  } = useProcessPost()
  const { data: tags, isLoading: tagsIsLoading } = useQueryTags()
  const { id } = useParams<{ id: string }>()
  const { data: post, isLoading: postIsLoading } = useQuerySinglePost(id)
  const { processImage, imageSize } = useResizeFile()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdatePostData>({
    shouldUnregister: false,
    resolver: yupResolver(schema),
  })

  const onChangeFileResize = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const imageFile = event.target.files?.[0]
    const { width, height } = await imageSize(imageFile)
    const resizedFile = await processImage(imageFile, width, height)
    setDeskImageUrl(resizedFile)
    setValue('imageFile', resizedFile)
  }

  if (tagsIsLoading || postIsLoading) return <Spinner />

  return (
    <div className="flex-grow bg-primary min-h-screen">
      <div className="container items-center px-5 pb-8 mx-auto lg:px-24 pt-10">
        <h1 className="text-2xl text-white mb-5">投稿編集</h1>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-3">
            <form onSubmit={handleSubmit(updatePost)}>
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
                          {...register('title')}
                          className="shadow-sm appearance-none border border-gray-300 rounded-md  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="title"
                          type="text"
                          defaultValue={post?.title}
                        />
                        <span className="text-xs text-red-700">
                          {errors.title?.message}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        デスク写真
                      </label>
                      <div className="flex flex-col lg:flex-row justify-between">
                        <div className="mb-2 mr-2">
                          <input
                            type="file"
                            id="imageFile"
                            accept="image/*"
                            onChange={onChangeFileResize}
                            className=" border-gray-300 focus:ring-indigo-700 block w-full overflow-hidden cursor-pointer border text-gray-800 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline"
                          />
                        </div>
                        {deskImageUrl && (
                          <>
                            <img
                              src={deskImageUrl}
                              alt="deskImage"
                              className="sm:h-1/2 sm:w-1/2 bg-gray-500 text-gray-200 rounded-md mx-2 my-2"
                            />
                            <input
                              type="hidden"
                              {...register('imageFile')}
                              value={deskImageUrl}
                            />
                          </>
                        )}
                        {!deskImageUrl && post?.imageFileUrl && (
                          <>
                            <img
                              src={post.imageFileUrl}
                              alt="deskImage"
                              className="sm:h-1/2 sm:w-1/2 bg-gray-500 text-gray-200 rounded-md mx-2 my-2"
                            />
                            <input
                              type="hidden"
                              {...register('imageFile')}
                              value={post.imageFileUrl}
                            />
                          </>
                        )}
                        {!deskImageUrl && !post?.imageFileUrl && (
                          <PhotographIcon className="sm:h-1/2 sm:w-1/2 bg-gray-500 text-gray-200 rounded-md mx-2 my-2" />
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
                          {...register('description')}
                          defaultValue={post?.description}
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
                      {tags?.map((tag) => (
                        <PostCategoryTag
                          key={tag.id}
                          tagId={tag.id}
                          tagName={tag.name}
                          register={register}
                          postTags={post?.tags}
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
                <input type="hidden" {...register('id')} defaultValue={id} />
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
  )
}
