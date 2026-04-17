"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/form-validation/onboarding-schema";
import { z } from "zod";
import Image from "next/image";

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Form Data:", data);
  };

  
  return (
    <div className="max-w-xl mx-auto mt-16 p-10 warm-panel rounded-[2rem] border border-white/10 text-[#fff2d8] shadow-xl backdrop-blur-lg">
{/*       
       <div className="flex justify-center">
    <Image
      src=""
      alt="Shield_force_logo"
      width={80}
      height={80}
      className="object-contain"
    />
  </div> */}

      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-6">
        Welcome Back 👋
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        <div>
          <label className="block text-base mb-2 text-[#fff1d8]/80">
            Email / Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("identifier")}
            placeholder="Enter email or phone"
            className="w-full px-5 py-4 text-base rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-[#c8a46b]"
          />
          {errors.identifier && (
            <p className="text-red-400 text-sm mt-1">{errors.identifier.message}</p>
          )}
        </div>

        <div>
          <label className="block text-base mb-2 text-[#fff1d8]/80">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            {...register("password")}
            placeholder="Enter password"
            className="w-full px-5 py-4 text-base rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-[#c8a46b]"
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-4 text-xl rounded-lg bg-gradient-to-r from-[#c8a46b] to-[#a67c52] text-black font-medium"
        >
          Login
        </button>
      </form>
    </div>
  );
}