"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getBlogs, getUser } from "../lib/api";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import "../globals.css";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCallback, useState } from "react";

type userBlog = {
  id: number;
  title: string;
  body: string;
};
export default function Profile() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
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

  const toggleProfileMenu = useCallback(() => {
    setShowProfileMenu((prev) => !prev);
  }, []);

  if (getuserBlog.isLoading) return <p>Loading...</p>;
  if (getuserBlog.isError) return <p>Error...</p>;
  return (
    <div className=" p-6  gap-8">
      <div className="">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{getuser?.data?.name} Blogs</h1>
          <Button
            onClick={handleClick}
            className="text-white bg-blue-700 rounded-md px-5 py-2 text-2xl hover:cursor-pointer"
          >
            Write
          </Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-10"
            onClick={toggleProfileMenu}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>

        {/* Blogs List */}
        {getuserBlog?.data?.map((blog, index) => {
          return (
            <Link
              key={blog.id}
              href={`/blogs/${blog.id}`}
              className="space-y-6 "
            >
              <div className="flex justify-center">
                <Card className="w-full m-10 max-w-200 p-20">
                  <CardHeader>
                    <CardTitle className="text-4xl">{blog.title}</CardTitle>
                    <CardDescription className="pt-5 text-2xl">
                      {blog.body.slice(0, 300)}...........
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </Link>
          );
        })}
      </div>
      {/* RIGHT SIDE */}
      {/* <div className="border p-5 rounded-xl ">
        <h2 className="text-lg font-bold mb-4">Profile Info</h2>
        <p>{getuser.data?.name}</p>
        <p>Blogs: 10</p>
      </div> */}
    </div>
  );
}
