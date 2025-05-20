"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import {  redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import CustomInput from "./CustomInput";
import { login, signup } from "@/utils/actions/user.actions";

const AuthForm = ({ type }: { type: string }) => {
  const [domLoaded, setDomLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  useEffect(() => {
    setDomLoaded(true);
    toast("Log in with test@gmail.com/12345678 to explore or create your own account !",{
          duration:15000,
          closeButton:true,
          style:{
            fontSize:'15px'
          },
          position:"top-center"
        })
  }, []);
  useEffect(() => {
    const handleComplete = () => setIsLoading(false);

    if (isLoading) {
      const interval = setInterval(() => {
        if (window.location.pathname === "/") {
          handleComplete();
          clearInterval(interval);
        }
      }, 300); // Check every 300ms

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      if (type === "sign-up") {
        const response = await signup(data)
        if(response.success){
          toast.success(response.message)
          router.push('/')
        }else{
          toast.error(response.message)
        }
      }
      if (type === "sign-in") {
        const response = await login(data)
        if(response.success){
          router.push('/')
        }else{
          toast.error(response.message)

        }
      }
      setIsLoading(false)

    } catch (error) {
      console.log(error);
    }
  };

  return (
    domLoaded && (
      <section className="auth-form">
        <header className="flex flex-col gap-5 md:gap-8">
          <Link href="/" className="cursor-pointer flex items-center gap-1">
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
              Chat App
            </h1>
          </Link>

          <div className="flex flex-col gap-1 md:gap-3">
            <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
              {user
                ? "Link Account"
                : type === "sign-in"
                ? "Sign In"
                : "Sign Up"}
              <p className="text-16 font-normal text-gray-600">
                {user
                  ? "Link your account to get started"
                  : "Please enter your details"}
              </p>
            </h1>
          </div>
        </header>
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeholder="Enter your first name"
                    />
                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter your first name"
                    />
                  </div>
                  
                 
                  
                  
                </>
              )}

              <CustomInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your email"
              />

              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
              />

              <div className="flex flex-col gap-4">
                <Button type="submit" disabled={isLoading} className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </footer>
        </>
      </section>
    )
  );
};

export default AuthForm;
