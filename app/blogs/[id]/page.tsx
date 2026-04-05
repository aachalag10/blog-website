"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getoneBlog } from "../../lib/api";
export default function GetBlog() {
  const params = useParams();
  const id = Number(params.id);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["particular_blog"],
    queryFn: () => getoneBlog(id),
  });

  if (isLoading) return "Loading...";
  if (isError) return "Error...";
  return (
    <div>
      <div>
        <div className="text-4xl font-bold text-center p-5">{data?.title}</div>
        <div className="text-2xl pl-20 pr-20 border-white rounded-xl">
          {data?.body}
        </div>
      </div>
    </div>
  );
}
