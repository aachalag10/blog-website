"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getBlogs, getUser } from "../lib/api";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import "../globals.css";
type userBlog = {
  id: number;
  title: string;
  body: string;
};
export default function Profile() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const useridvalue = Number(searchParams.get("userid"));

  const handleClick = () => {
    router.push("/writeblog");
  };

  const getuserBlog = useQuery<userBlog[]>({
    queryKey: ["userBlogs", useridvalue],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;
      // const id = queryKey[1];
      return getBlogs(id as number);
    },
  });

  const getuser = useQuery({
    queryKey: ["user", useridvalue],
    queryFn: () => getUser(useridvalue),
  });

  if (getuserBlog.isLoading) return <p>Loading...</p>;
  if (getuserBlog.isError) return <p>Error...</p>;
  return (
    <div className=" p-6 grid grid-cols-3 gap-8">
      <div className="col-span-2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{getuser?.data?.name} Blogs</h1>
          <Button
            onClick={handleClick}
            className="text-white bg-blue-700 rounded-md px-5 py-2 text-2xl hover:cursor-pointer"
          >
            Write
          </Button>
        </div>

        {/* Blogs List */}
        {getuserBlog?.data?.map((blog, index) => {
          return (
            <Link
              key={blog.id}
              href={`/blogs/${blog.id}`}
              className="space-y-6 "
            >
              <div className="p-5 border rounded-xl">
                <h2>{blog.id}</h2>
                <h2 className="text-xl font-bold">{blog.title}</h2>
                <p className="text-gray-600">
                  {blog.body.slice(0, 200)}...........
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      {/* RIGHT SIDE */}
      <div className="border p-5 rounded-xl ">
        <h2 className="text-lg font-bold mb-4">Profile Info</h2>
        <p>{getuser.data?.name}</p>
        <p>Blogs: 10</p>
      </div>
    </div>
  );
}
