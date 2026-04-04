/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/input";
import { useCallback, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import profile from "../profile/page";

const Auth = () => {
  const [username, setUserName] = useState("");
  const [id, setid] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const pathName = usePathname();

  const [variant, setVariant] = useState(
    pathName === "/signup" ? "register" : "login",
  );
  const toggleVariant = useCallback(() => {
    setVariant((currVariant) => {
      const newVariant = currVariant === "login" ? "register" : "login";

      router.push(newVariant === "login" ? "/signin" : "/signup");

      return newVariant;
    });
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue/40">
      {/* Card */}
      <div className=" px-16 py-16 rounded-xl lg:w-2/5 lg:max-w-md">
        <h2 className=" text-4xl mb-8 font-semibold">
          {variant === "login" ? "Login" : "Sign Up "}
        </h2>

        <div className="space-y-4">
          {variant === "register" && (
            <Input
              value={username}
              placeholder="username"
              onChange={setUserName}
            />
          )}

          <Input
            value={id}
            placeholder="id"
            onChange={(e: any) => setid(e.target.value)}
          />
          <Input
            value={password}
            placeholder="password"
            onChange={(e: any) => setPassword(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          onClick={() => router.push(`/profile?userid=${id}`)}
          className="w-full bg-blue-600 py-2 rounded-md mt-6 text-white hover:bg-blue-700"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-gray-400 mt-4 text-sm">
          {variant === "login"
            ? "First TIme using Blob |"
            : "Already have an account |"}
          <span
            onClick={toggleVariant}
            className=" hover:underline cursor-pointer"
          >
            {variant === "login"
              ? " Create an account"
              : " Sign in to your account"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
