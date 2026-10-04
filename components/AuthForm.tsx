"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { auth } from "@/firebase/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { signIn, signUp } from "@/lib/actions/auth.action";
import FormField from "@/components/FormField";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (type: FormType) => {
  return z.object({
    name:
      type === "sign-up"
        ? z.string().min(3, "Name must be at least 3 characters")
        : z.string().optional(),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(3, "Password must be at least 3 characters"),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const isSignIn = type === "sign-in";

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (type === "sign-up") {
        const { name, email, password } = data;

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        // Reset cookie banner so every new registered user is prompted to accept cookies
        try {
          localStorage.removeItem("prepwise_cookie_consent_v2");
          window.dispatchEvent(new Event("reset-cookie-banner"));
        } catch (e) {}

        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
      } else {
        const { email, password } = data;

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredential.user.getIdToken();
        if (!idToken) {
          toast.error("Sign in Failed. Please try again.");
          return;
        }

        await signIn({
          email,
          idToken,
        });

        toast.success("Signed in successfully.");
        window.location.href = "/";
      }
    } catch (error: any) {
      console.error(error);
      const msg = error?.message || "An unexpected authentication error occurred.";
      toast.error(msg);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 py-10 px-4 overflow-hidden">
      {/* Left Column: Animated Entrance */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex-1 space-y-6 text-left max-w-lg"
      >
        {/* Brand Logo */}
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <Image
            src="/logo.svg"
            alt="PrepWise Logo"
            height={32}
            width={38}
            style={{ width: "auto", height: "auto" }}
            className="group-hover:scale-105 transition-transform"
          />
          <h2 className="text-2xl font-extrabold text-primary-100">PrepWise</h2>
        </Link>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {isSignIn ? "Welcome Back to PrepWise" : "Get Started Free"}
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-base leading-relaxed">
          {isSignIn
            ? "Sign in to access your saved mock interviews, practice history, and Gemini AI feedback."
            : "Create your account and start practicing today."}
        </p>

        {/* Feature List with Staggered Motion */}
        <div className="space-y-4 pt-2">
          {[
            "AI-powered mock interviews",
            "ATS-optimized resume builder",
            "Instant performance feedback",
          ].map((text, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-gray-200">{text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right Column: Form Card with Scale & Fade Entrance */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        className="w-full lg:max-w-[480px]"
      >
        <div className="card-border w-full">
          <div className="flex flex-col gap-6 card py-10 px-8 shadow-2xl">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-xl font-bold text-white">
                {isSignIn ? "Sign In to Your Account" : "Create Your Account"}
              </h3>
              <p className="text-xs text-gray-400">
                {isSignIn
                  ? "Enter your email and password below"
                  : "Fill in your details to start practicing for free"}
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-5 form"
              >
                {!isSignIn && (
                  <FormField
                    control={form.control}
                    name="name"
                    label="Name"
                    placeholder="Your Name"
                    type="text"
                  />
                )}

                <FormField
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="Enter your email address"
                  type="email"
                />

                <FormField
                  control={form.control}
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                />

                <Button
                  className="btn w-full !py-3 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  type="submit"
                >
                  {isSignIn ? "Sign In" : "Create an Account"}
                </Button>
              </form>
            </Form>

            <p className="text-center text-xs text-gray-300 pt-2 border-t border-white/10">
              {isSignIn ? "No account yet?" : "Have an account already?"}
              <Link
                href={!isSignIn ? "/sign-in" : "/sign-up"}
                className="font-bold text-purple-400 hover:text-purple-300 ml-1.5 underline"
              >
                {!isSignIn ? "Sign In" : "Sign Up"}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthForm;