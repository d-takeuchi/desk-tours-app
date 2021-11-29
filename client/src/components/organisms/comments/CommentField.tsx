import { memo, VFC } from 'react'

interface Props {
  userName: string
  userIcon: string
  comment: string
}

export const CommentField: VFC<Props> = memo((props) => {
  const { userName, userIcon, comment } = props

  return (
    <div className="flex max-w-lg mb-5">
      {userIcon ? (
        <img
          className="rounded-full h-8 w-8 mr-2 mt-1 "
          src={userIcon}
          alt="ユーザーアイコン"
        />
      ) : (
        <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100 mr-2 mt-1">
          <svg
            className="h-full w-full text-gray-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
      )}

      <div>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-3xl px-4 pt-2 pb-2.5 ">
          <div className="font-semibold text-sm leading-relaxed">
            {`${userName}さん`}
          </div>
          <div className="text-normal leading-snug md:leading-normal">
            {comment}
          </div>
        </div>
      </div>
    </div>
  )
})
