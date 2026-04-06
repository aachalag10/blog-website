"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllBlogs } from "./lib/api";

type userBlog = {
  id: number;
  title: string;
  body: string;
};

export default function Home() {
  const { data, isLoading, error } = useQuery<userBlog[]>({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
  });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error Loading data...</p>;

  const latestBlogs = data?.slice(0, 7) || [];
  return (
    <>
      <div className="w-full px-10 py-8 grid grid-cols-4 grid-rows-3 gap-8">
        {/* BIG Featured Blog */}
        <div className="col-start-1 col-span-2 row-span-3 p-6 border rounded-xl">
          <h2 className="text-2xl font-bold mb-2">{latestBlogs[0]?.title}</h2>
          <p className="text-gray-600">{latestBlogs[0]?.body}</p>
        </div>

        {/* Blog 2 */}
        <div className="col-start-3 row-start-1 row-span-2 p-6 border rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-2">{latestBlogs[1]?.title}</h2>
          <p className="text-gray-600">{latestBlogs[1]?.body}</p>
        </div>

        {/* Blog 3 */}
        <div className="col-start-3 row-start-3 p-6 border rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-2">{latestBlogs[2]?.title}</h2>
          <p className="text-gray-600">{latestBlogs[2]?.body}</p>
        </div>

        {/* Trending (Column 4) */}
        <div className="col-start-4 row-start-1 row-span-3 p-5 rounded-xl shadow-sm bg-gray-50">
          <h2 className="text-xl text-black font-bold mb-4">🔥 Trending</h2>

          {data?.map((blog) => {
            return (
              <div key={blog.id}>
                <ul className="space-y-3">
                  <li className="border-b pb-2 text-black">{blog.title}</li>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
