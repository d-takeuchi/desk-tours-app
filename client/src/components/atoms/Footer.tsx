import { memo, VFC } from "react";

export const Footer: VFC = memo(() => {
  return (
    <footer className="text-gray-600 body-font border-t-2 border-gray-400">
      <div className="bg-secondary">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col ">
          <p className="text-gray-500 text-sm text-center">© 2021 Takeuchi</p>
        </div>
      </div>
    </footer>
  );
});
