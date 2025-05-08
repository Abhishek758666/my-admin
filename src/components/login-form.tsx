"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema, TLoginSchema } from "@/schemas/auth.schema";
import { useAppDispatch } from "@/redux/store";
import { Login } from "@/redux/thunks/auth.thunk";
import { successToast } from "@/lib/toastify";
import { useRouter } from "next/navigation";
import { PasswordInput } from "./ui/password-input";

export function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const form = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: TLoginSchema) {
    console.log("i am called");
    dispatch(
      Login({
        data,
        callback: () => {
          successToast("LoggedIn");
          router.push("/dashboard");
        },
      })
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 shadow-xl p-10 rounded-xl border"
      >
        <h1 className="text-2xl text-center font-bold">Login</h1>
        <p>Enter your email below to login as admin</p>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="eg. demo@gmail.com" {...field} />
              </FormControl>
              <FormDescription>Email should be Admin email.</FormDescription>
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
                <PasswordInput placeholder="eg. ******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
