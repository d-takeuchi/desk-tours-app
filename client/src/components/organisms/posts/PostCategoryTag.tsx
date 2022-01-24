import { VFC, memo } from 'react'

import { Tag } from '../../../types/types'

interface Props {
  tagId: number
  tagName: string
  postTags?: Tag[]
  register: any
}

export const PostCategoryTag: VFC<Props> = memo(
  ({ tagId, tagName, register, postTags }) => {
    return (
      <div className="pb-10">
        <input
          type="checkbox"
          className="hidden"
          value={tagId}
          id={`tags_${tagId}`}
          {...register(`tagIds`)}
          defaultChecked={postTags?.find((postTag) => postTag.id === tagId)}
        />
        <label
          htmlFor={`tags_${tagId}`}
          className="label-checked:bg-gray-200 px-4 py-2 rounded-lg border-solid border-4 border-light-blue-500 mr-10 p-10"
        >
          {tagName}
        </label>
      </div>
    )
  }
)
