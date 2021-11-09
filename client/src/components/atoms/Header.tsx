import { Fragment, useContext, VFC } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

import { DropDownMenu } from "./DropDownMenu";
import { AuthContext } from "../../providers/AuthProvider";
import { LoginUserContext } from "../../providers/LoginUserProvider";

export const Header: VFC = () => {
  const { isAuth } = useContext(AuthContext);
  const { profile } = useContext(LoginUserContext);

  return (
    <Popover className="bg-secondary">
      <div className="mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-gray-100 py-6 md:justify-start md:space-x-10 ">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/">
              <h1 className="text-3xl text-white font-bold">DeskTourApp</h1>
            </Link>
          </div>

          {/* ハンバーガーボタン */}
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>

          {/* ヘッダーメニュー */}
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <Link
              to="/posts/create"
              className="ml-8 whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
            >
              新規投稿
            </Link>
            <Link
              to="/posts"
              className="ml-8 whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
            >
              投稿一覧
            </Link>

            {!isAuth ? (
              <>
                <Link
                  to="/login"
                  className="ml-8 whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  ログイン
                </Link>
                <Link
                  to="/sign-up"
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primaryButton hover:bg-gray-300"
                >
                  新規登録
                </Link>
              </>
            ) : (
              <DropDownMenu icon={profile?.icon} />
            )}
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-10"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2>DeskTourApp</h2>
                </div>

                {/* {閉じるボタン} */}
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <Link
                  to="/users/profile/1"
                  className="text-gray-700 block px-4 py-2 text-sm"
                >
                  プロフィール画面
                </Link>
                <button className="text-sm">ログアウト</button>
              </div>
              <div>
                <Link
                  to="/sign-up"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primaryButton hover:bg-gray-300"
                >
                  新規登録
                </Link>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  既にアカウントをお持ちの場合
                  <Link
                    to="/login"
                    className="text-indigo-600 hover:text-indigo-500"
                  >
                    ログイン
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
