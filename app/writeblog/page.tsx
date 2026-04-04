"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { postBlogs } from "../lib/api";

export default function WriteBlog() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [userId, setUserId] = useState("");

  const mutation = useMutation({
    mutationFn: postBlogs,
    onSuccess: () => {
      console.log("Blog added");
      alert("Blog added");
    },
  });

  if (mutation.isPending) return <h2>Pending...</h2>;
  if (mutation.isError) return <h3>Error...</h3>;
  return (
    <div className="flex flex-col">
      <div className="mt-1">
        <label>Title</label>
        <input
          type="text"
          placeholder="Enter the title of blog"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </div>
      <div className="mt-1">
        <label>Description</label>
        <input
          type="text"
          placeholder="Enter the description of blog"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></input>
      </div>
      <div className="mt-1">
        <label>UserId</label>
        <input
          type="text"
          placeholder="Enter ur UserId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        ></input>
      </div>
      <button
        onClick={() =>
          mutation.mutate({
            title: title,
            body: desc,
            user_id: userId,
          })
        }
        className="border-blue hover:cursor-pointer"
      >
        Add
      </button>
    </div>
  );
}
