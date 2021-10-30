import { VFC } from "react";

type Props = {
  tagId: number;
  tagName: string;
  register: any;
};

const PostCategoryTag: VFC<Props> = ({ tagId, tagName, register }) => {
  return (
    <div className="pb-10">
      <input
        type="checkbox"
        className="hidden"
        value={tagId}
        id={`tags_${tagId}`}
        {...register("tagIds")}
      />
      <label
        htmlFor={`tags_${tagId}`}
        className="label-checked:bg-gray-200 px-4 py-2 rounded-lg border-solid border-4 border-light-blue-500 mr-10 p-10"
      >
        {tagName}
      </label>
    </div>
  );
};

export default PostCategoryTag;
