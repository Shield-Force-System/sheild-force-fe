
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { guardOnboardingSchema, OnboardingFormData } from "@/lib/form-validation/onboarding-schema";


export default function GuardOnboardingForm() {
  const {
  register,
  handleSubmit,
  watch,
   reset,  
  setValue,
  formState: { errors },
} = useForm<OnboardingFormData>({
    resolver: zodResolver(guardOnboardingSchema),
  });

  const hasTrainingCert = watch("hasTrainingCert");

  const onSubmit = (data: OnboardingFormData) => {
    console.log(data);
    reset()
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4" action="#">

     
      <label className="space-y-2 text-sm text-[#fff1d8]/82">
        <span>Full name <span className="text-red-500">*</span></span>
        <input
          className="form-input"
          type="text"
          placeholder="Enter full name"
          {...register("name")}
        />
        {errors.name && <p className="text-amber-500 text-[1.05rem]">{errors.name.message}</p>}
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-[#fff1d8]/82">
          <span>Age <span className="text-red-500">*</span></span>
          <input
            className="form-input"
            type="number"
            placeholder="e.g. 28"
            min={18}
            max={65}
            {...register("age")}
          />
          {errors.age && <p className="text-amber-500 text-[1.05rem]">{errors.age.message}</p>}
        </label>

        <label className="space-y-2 text-sm text-[#fff1d8]/82">
          <span>Gender <span className="text-red-500">*</span></span>
          <select className="form-select" defaultValue="" {...register("gender")}>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="text-amber-500 text-[1.05rem]">{errors.gender.message}</p>}
        </label>
      </div>

      
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-[#fff1d8]/82">
          <span>Mobile number <span className="text-red-500">*</span></span>
          <input
            className="form-input"
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            {...register("phone")}
          />
          {errors.phone && <p className="text-amber-500 text-[1.05rem]">{errors.phone.message}</p>}
        </label>

        <label className="space-y-2 text-sm text-[#fff1d8]/82">
          <span>Email <span className="text-red-500">*</span></span>
          <input
            className="form-input"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
          />
          {errors.email && <p className="text-amber-500 text-[1.05rem]">{errors.email.message}</p>}
        </label>
      </div>

     
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-[#fff1d8]/82">
          <span>Years of experience <span className="text-red-500">*</span></span>
          <input
            className="form-input"
            type="number"
            placeholder="e.g. 3"
            min={0}
            {...register("experience")}
          />
          {errors.experience && <p className="text-amber-500 text-[1.05rem]">{errors.experience.message}</p>}
        </label>

        <label className="space-y-2 text-sm text-[#fff1d8]/82">
          <span>Operating location <span className="text-red-500">*</span></span>
          <input
            className="form-input"
            type="text"
            placeholder="e.g. Lucknow, NCR, Noida"
            {...register("base")}
          />
          {errors.base && <p className="text-amber-500 text-[1.05rem]">{errors.base.message}</p>}
        </label>
      </div>

     
      <label className="space-y-2 text-sm text-[#fff1d8]/82">
        <span>Role category <span className="text-red-500">*</span></span>
        <select className="form-select" defaultValue="" {...register("role")}>
          <option value="">Select Role</option>
          <option value="Normal bodyguard">Normal bodyguard</option>
          <option value="Pistol trained">Pistol trained</option>
          <option value="Rifle trained">Rifle trained</option>
        </select>
        {errors.role && <p className="text-amber-500 text-[1.05rem]">{errors.role.message}</p>}
      </label>

      
      <label className="space-y-2 text-sm text-[#fff1d8]/82">
        <span>Aadhaar card number <span className="text-red-500">*</span></span>
        <input
          className="form-input"
          type="text"
          placeholder="XXXX XXXX XXXX"
          maxLength={14}
          {...register("aadhaar")}
        />
        {errors.aadhaar && <p className="text-amber-500 text-[1.05rem]">{errors.aadhaar.message}</p>}
      </label>

      
      <label className="space-y-2 text-sm text-[#fff1d8]/82">
        <span>
          Armed license number{" "}
          <span className="text-[#fff1d8]/40 font-normal">(optional)</span>
        </span>
        <input
          className="form-input"
          type="text"
          placeholder="Enter license number if applicable"
          {...register("armedLicense")}
        />
        {errors.armedLicense && <p className="text-amber-500 text-[1.05rem]">{errors.armedLicense.message}</p>}
      </label>

      
      <label className="space-y-2 text-sm text-[#fff1d8]/82">
        <span>
          Driving license{" "}
          <span className="text-[#fff1d8]/40 font-normal">(optional · PDF/image)</span>
        </span>
        <input
          className="form-input py-2 file:mr-3 file:rounded-full file:border-0 file:bg-white/10 file:px-3 file:py-1 file:text-xs file:text-white/80 hover:file:bg-white/20 cursor-pointer"
          type="file"
          accept=".pdf,image/*"
         onChange={(e) =>
  setValue("drivingLicense", e.target.files?.[0])
}
        />
        
      </label>

      
      <label className="space-y-2 text-sm text-[#fff1d8]/82">
        <span>
          Education certificate <span className="text-red-500">*</span>{" "}
          <span className="text-[#fff1d8]/40 font-normal">(PDF only)</span>
        </span>
        <input
          className="form-input py-2 file:mr-3 file:rounded-full file:border-0 file:bg-white/10 file:px-3 file:py-1 file:text-xs file:text-white/80 hover:file:bg-white/20 cursor-pointer"
          type="file"
          accept=".pdf"
          onChange={(e) => {
  const file = e.target.files?.[0];
  if (file) {
    setValue("educationCertificate", file, {
      shouldValidate: true,
    });
  }
}}
        />
        {errors.educationCertificate && (
  <p className="text-amber-500 text-[1.05rem]">
    {errors.educationCertificate.message}
  </p>
)}
              </label>

      
      <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer text-sm text-[#fff1d8]/82">
          <input
            type="checkbox"
            className="w-4 h-4 rounded accent-amber-400"
            {...register("hasTrainingCert")}
          />
          <span>I have additional training or skill certificates</span>
        </label>

        {hasTrainingCert && (
          <label className="space-y-2 text-sm text-[#fff1d8]/82 block">
            <span>
              Training / skill certificate{" "}
              <span className="text-[#fff1d8]/40 font-normal">(PDF/image)</span>
            </span>
            <input
              className="form-input py-2 file:mr-3 file:rounded-full file:border-0 file:bg-white/10 file:px-3 file:py-1 file:text-xs file:text-white/80 hover:file:bg-white/20 cursor-pointer"
              type="file"
              accept=".pdf,image/*"
             onChange={(e) =>
  setValue("trainingCertificate", e.target.files?.[0])
}
            />
            
          </label>
        )}
      </div>

     
      <label className="space-y-2 text-sm text-[#fff1d8]/82">
        <span>Verification note <span className="text-red-500">*</span></span>
        <textarea
          className="form-textarea"
          placeholder="Add experience, licence details, and previous deployment type."
          {...register("note")}
        />
        {errors.note && <p className="text-amber-500 text-[1.05rem]">{errors.note.message}</p>}
      </label>

      
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-[#fff1d8]/74">
          Registration charge: <span className="text-white">₹1,500</span>
        </div>
        <button
          type="submit"
          className="rounded-full border border-white/12 bg-black/16 px-4 py-3 text-sm font-medium text-white transition hover:bg-black/24"
        >
          Request listing
        </button>
      </div>
    </form>
  );
}