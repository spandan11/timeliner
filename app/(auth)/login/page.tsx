"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";

import { LoginFormSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormError } from "@/app/(auth)/_components/form-error";
import { FormSuccess } from "@/app/(auth)/_components/form-success";
import FormWrapper from "@/app/(auth)/_components/form-wrapper";

const Login = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [toggler, setToggler] = useState<boolean>(false);
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleToggle = () => {
    setToggler((prev) => !prev);
  };
  const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
    setSuccess("");
    setError("");
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/dashboard",
    });
  };
  return (
    <FormWrapper
      headerLabel="Login to your account"
      backbuttonLabel="Don't have an account?"
      backbuttonHrefLabel="Register"
      backbuttonHref="/register"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <div className="space-y-1">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={form.formState.isSubmitting}
                      placeholder="jondoe@example.com"
                      {...field}
                    />
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
                    <div className="relative">
                      <Input
                        disabled={form.formState.isSubmitting}
                        type={toggler ? "text" : "password"}
                        placeholder="********"
                        {...field}
                      />
                      {toggler ? (
                        <Eye
                          className="h-8 w-8 absolute top-0 right-0 p-1 m-1 text-zinc-600 dark:text-white/90 cursor-pointer transition"
                          onClick={handleToggle}
                        />
                      ) : (
                        <EyeOff
                          className="h-8 w-8 absolute top-0 right-0 p-1 m-1 text-zinc-600 dark:text-white/90 cursor-pointer transition"
                          onClick={handleToggle}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button
            disabled={form.formState.isSubmitting}
            className="w-full"
            type="submit"
          >
            Login
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default Login;
