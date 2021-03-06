import { memo, VFC } from 'react'
import { useParams } from 'react-router'

import { useResizeFile } from '../../../hooks/useResizeFile'
import { useProcessUser } from '../../../hooks/useProcessUser'
import { useQueryClient } from 'react-query'
import { LoginUserInfo } from '../../../types/types'

export const ProfileEdit: VFC = memo(() => {
  const { id } = useParams<{ id: string }>()
  const {
    icon,
    setIcon,
    handleSubmit,
    errors,
    register,
    setValue,
    updateUser,
  } = useProcessUser()
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData<LoginUserInfo>('user')
  const { processImage, imageSize } = useResizeFile()

  const onChangeFileResize = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const imageFile = event.target.files?.[0]
    const { width, height } = await imageSize(imageFile)
    const resizedFile = await processImage(imageFile, width, height)
    setIcon(resizedFile)
    setValue('icon', resizedFile)
  }

  return (
    <section className="flex-grow flex text-blueGray-700 justify-center bg-primary min-h-screen">
      <div className="container items-center px-5 py-12 lg:px-20">
        <div className="flex flex-col w-full p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white border rounded-lg lg:w-1/2  md:mt-0">
          <form onSubmit={handleSubmit(updateUser)}>
            <div className="mt-4">
              <label className="text-base leading-7 text-blueGray-500">
                プロフィール画像
              </label>
              <div className="mt-5 flex items-center flex-col sm:flex-row">
                {icon && (
                  <>
                    <img
                      src={icon}
                      className="h-32 w-32 rounded-full"
                      alt="ユーザーアイコン"
                    />
                    <input type="hidden" {...register('icon')} value={icon} />
                  </>
                )}
                {!icon && user?.icon && (
                  <>
                    <img
                      src={user.icon}
                      className="h-32 w-32 rounded-full"
                      alt="ユーザーアイコン"
                    />
                    <input
                      type="hidden"
                      {...register('icon')}
                      defaultValue={user.icon}
                    />
                  </>
                )}
                {!icon && !user?.icon && (
                  <>
                    <span className="inline-block h-32 w-32 rounded-full overflow-hidden bg-gray-100">
                      <svg
                        className="h-full w-full text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <input type="hidden" {...register('icon')} />
                    </span>
                  </>
                )}
                <div className="mb-4 my-5">
                  <div className="relative">
                    <input
                      className="ml-5 border-gray-300 focus:ring-indigo-700 block w-full overflow-hidden cursor-pointer border text-gray-800 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline"
                      id="icon"
                      type="file"
                      accept="image/*"
                      onChange={onChangeFileResize}
                    />
                  </div>
                </div>
              </div>
              <div className="my-2">
                <span className="text-xs text-red-700">
                  {errors.icon?.message}
                </span>
              </div>
            </div>

            <div className="relative mt-10">
              <label
                htmlFor="email"
                className="text-base leading-7 text-blueGray-500"
              >
                ユーザー名
              </label>
              <input
                type="text"
                id="name"
                {...register('name')}
                className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                defaultValue={user?.name}
              />
              <div className="my-2">
                <span className="text-xs text-red-700">
                  {errors.name?.message}
                </span>
              </div>
            </div>
            <input type="hidden" {...register('id')} defaultValue={id} />
            <div className="mt-10">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primaryButton hover:bg-pink-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                更新
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
})
