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
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

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
    router.push(`/writeblog?useridvalue=${useridvalue}`);
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
    <div className=" p-6  gap-8">
      <div className="">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{getuser?.data?.name} Blogs</h1>
          <Button
            onClick={handleClick}
            className=" absolute right-30 rounded-md px-5 py-2 text-2xl hover:cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-10"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>Profile</PopoverTitle>
                <PopoverDescription>
                  Name:{getuser.data?.name}
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </div>

        {/* Blogs List */}
        {getuserBlog?.data?.map((blog) => {
          return (
            <Link
              key={blog.id}
              href={`/blogs/${blog.id}`}
              className="space-y-6  "
            >
              <div className="flex justify-center">
                <Card className="w-full m-10 max-w-200 p-20  bg-gray-600">
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
    </div>
  );
}
