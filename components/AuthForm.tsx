"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {toast} from "sonner";
import FormFeild from "@/components/FormFeild";
import {useRouter} from "next/navigation";

// 👉 Define type
type FormType = "sign-in" | "sign-up";

const authFormSchema = (type : FormType)=>{
    return z.object({
        name: type ==='sign-up' ? z.string().min(3):z.string().optional(),
        email : z.string().email(),
        password: z.string().min(3),
    })
}


const AuthForm = ({ type }: { type: FormType }) => {
    const router = useRouter();

    const FormSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof FormSchema>) {
     try{
         if(type === "sign-up"){
             toast.success("Account created successfully. Please sign in!");
             router.push("/sign-in");
         }
         else{
             toast.success("Sign in successfully!");
             router.push("/");
         }

     }
     catch(error){
         console.log(error);
         toast.error(`There was an error: ${error}`);
     }
    }

    const isSignIn = type === "sign-in";

    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10">

                {/* Logo */}
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="/images/logo.svg" alt="logo" height={32} width={38} />
                    <h2 className="text-primary-100">PrepWise</h2>
                </div>

                <h3>Practice job interview with AI</h3>


                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-6 mt-4 form"
                >
                    {!isSignIn && (
                        <FormFeild control = {form.control} name = "name"
                                   label="Name"
                                   placeholder="Your Name" />
                    )}
                         <FormFeild control = {form.control} name = "email"
                               label="Email"
                               placeholder="Your Email Address"
                                    type="email"/>

                         <FormFeild control = {form.control} name = "password"
                               label="Password"
                               placeholder=" Enter Your Password"
                                    type="password"/>

                    <Button className="btn" type="submit">
                        {isSignIn ? "Sign In" : "Create an Account"}
                    </Button>
                </form>


                <p className="text-center">
                    {isSignIn ? "No account yet?" : "Have an account?"}
                    <Link
                        href={isSignIn ? "/sign-up" : "/sign-in"}
                        className="font-bold text-primary-100 ml-1"
                    >
                        {isSignIn ? "Sign Up" : "Sign In"}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;