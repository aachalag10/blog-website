"use client";

import { useMutation } from "@tanstack/react-query";
import { postBlogs } from "../lib/api";
import { useForm, SubmitHandler } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Inputs = {
  title: string;
  body: string;
  user_id: number;
};
export default function WriteBlog() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<Inputs>();
  const searchParams = useSearchParams();
  const useridvalue = Number(searchParams.get("useridvalue"));
  const mutation = useMutation({
    mutationFn: postBlogs,
    onSuccess: () => {
      console.log("Blog added");
      alert("Blog added");
      router.push(`/profile?userid=${useridvalue}`);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => mutation.mutate(data);

  if (mutation.isPending) return <h2>Pending...</h2>;
  if (mutation.isError) return <h3>Error...</h3>;
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-xl bg-gray-600 shadow-xl rounded-2xl p-8 m-20 gap-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Write a Blog ✍️</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="m-5">
          <Input defaultValue="Title" {...register("title")} />

          <div className="m-5">
            <Textarea defaultValue="Description" {...register("body")} />
          </div>
          <div className="m-5">
            <Input
              defaultValue="Your user id "
              {...register("user_id", { valueAsNumber: true })}
            />
          </div>
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
