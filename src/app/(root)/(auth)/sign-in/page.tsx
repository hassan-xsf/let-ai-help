"use client";

import { signInSchema } from "@/schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AxiosError } from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import Link from "next/link";
import GithubSignIn from "@/components/buttons/GithubButton";
import Logo from "@/components/Logo";
import { Loader2 } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";

const SignInPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });
  async function onSubmit(values: z.infer<typeof signInSchema>) {
    try {
      setLoading(true);
      const data = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      if (data?.error) {
        if (data.error === "CredentialsSignin") {
          return toast.error("Invalid credentials!");
        }
        return toast.error("There was a problem signing you up!");
      }
      toast.success("You have been logged in!");
      router.push("/tools");
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message || "There was an error logging you in!",
        );
      }
    }
  }
  return (
    <div className="mx-auto max-w-screen-sm p-1 pt-20 md:pt-40">
      <Logo type={2} />
      <div className="mb-10 text-center text-sm font-bold">Sign In</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password..."
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link className="block" href="/sign-up">
            Don&apos;t have an account?
          </Link>

          <Button type="submit" disabled={loading} className="bg-green-600">
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Signing In
              </>
            ) : (
              "Sign In"
            )}
          </Button>
          <GithubSignIn />
        </form>
      </Form>
    </div>
  );
};

export default SignInPage;
