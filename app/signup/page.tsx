/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <>
      <div className="min-h-screen flex items-center justify-center bg-blue/40">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>
              {" "}
              <h2 className=" text-4xl mb-8 font-semibold">
                {variant === "login" ? "Login" : "Sign Up "}
              </h2>
            </CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Button variant="link">Sign Up</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                {variant === "register" && (
                  <>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        value={username}
                        placeholder="username"
                        onChange={setUserName}
                      />
                    </div>
                  </>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="email">User Id</Label>
                  <Input
                    value={id}
                    placeholder="id"
                    onChange={(e: any) => setid(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              className="w-full"
              onClick={() => router.push(`/profile?userid=${id}`)}
            >
              Login
            </Button>
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
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Auth;
