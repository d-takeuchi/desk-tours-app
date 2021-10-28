const PostView = () => {
  return (
    <div className="flex-grow bg-primary">
      <div className="container items-center px-5 pb-8 mx-auto lg:px-24 mt-10">
        <h1 className="text-2xl text-white mb-5">投稿詳細</h1>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-3">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6 ">
                <div className="items-center flex flex-wrap">
                  <div className="w-full md:w-1/2 ml-auto mr-auto px-4">
                    <img
                      className="rounded-t-xl"
                      src="https://dummyimage.com/720x400/F3F4F7/8693ac"
                      alt="blog"
                    />
                  </div>
                  <div className=" md:w-1/2 ml-auto mr-auto px-4">
                    <div className="md:pr-12">
                      <h3 className="text-2xl font-semibold">タイトル</h3>
                      <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                        hogehogehogehoge
                      </p>
                      <h3 className="text-2xl font-semibold mt-4">紹介文</h3>
                      <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                        The extension comes with three pre-built pages to help
                        you get started faster. You can change the text and
                        images and you're good to go.
                      </p>
                      <h3 className="text-2xl font-semibold mt-4">
                        使用しているアイテム
                      </h3>
                      <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                        aaa
                      </p>
                      <h3 className="text-2xl font-semibold mt-4">タグ</h3>
                      <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                        aaa
                      </p>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2  px-4 my-10">
                    <div className="flex space-x-2">
                      <img
                        src="https://images.unsplash.com/photo-1609349744982-0de6526d978b?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDU5fHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                        alt="avatar"
                        className="h-8 w-8 object-cover rounded-full"
                      />
                      <div>
                        <div className="bg-gray-100 w-auto rounded-xl px-2 pb-2">
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
                    </div>

                    <div className="mt-5 mx-7">
                      <form>
                        <label className="text-gray-700" htmlFor="name">
                          <textarea
                            className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            id="comment"
                            name="comment"
                            rows={1}
                            cols={40}
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
