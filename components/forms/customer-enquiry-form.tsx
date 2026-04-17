"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  enquiryData,
  enquirySchema,
} from "@/lib/form-validation/onboarding-schema";

export default function CustomerEnquiryForm(){
    const {
      register,
      handleSubmit,
       reset,  
      formState: { errors },
    } = useForm<enquiryData>({
        resolver: zodResolver(enquirySchema),
      });
    
      const onSubmit = (data: enquiryData) => {
          console.log(data);
          reset()
        };
    return (
        
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4" action="#">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-white/78">
                  <span>Full name {" "}<span className="text-red-500">*</span></span>
                  <input className="form-input" type="text" placeholder="Enter  full name"
                  {...register("name")} />
                  {errors.name && <p className="text-amber-500 text-[1.05rem]">{errors.name.message}</p>}
                </label>
                <label className="space-y-2 text-sm text-white/78">
                  <span>Phone number{" "}<span className="text-red-500">*</span></span>
                  <input className="form-input" type="tel" placeholder="+91 XXXXX XXXXX"
                  {...register("phone")} />
                  {errors.phone && <p className="text-amber-500 text-[1.05rem]">{errors.phone.message}</p>}
                </label>
                
              </div>
              <label className="space-y-2 text-sm text-white/78">
                <span>Preferred guard</span>
                <input className="form-input" type="text" placeholder="Enter profile name or no preference" />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-white/78">
                  <span>Service type{" "}<span className="text-red-500">*</span></span>
                  <select className="form-select" defaultValue="" {...register("serviceType")}>
                    <option value="">Select Service Type</option>
                    <option value="personal">Personal bodyguard</option>
                    <option value="rifle">Armed security - rifle</option>
                    <option value="pistol">Armed security - pistol</option>
                    <option value="event">Event security</option>
                  </select>
                  {errors.serviceType && <p className="text-amber-500 text-[1.05rem]">{errors.serviceType.message}</p>}
                </label>
                <label className="space-y-2 text-sm text-white/78">
                  <span>City{" "}<span className="text-red-500">*</span></span>
                  <input className="form-input" type="text" placeholder="UP or NCR" {...register("city")}/>
                  {errors.city && <p className="text-amber-500 text-[1.05rem]">{errors.city.message}</p>}
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-white/78">
                  <span>Start date{" "}<span className="text-red-500">*</span></span>
                  <input className="form-input" type="date" {...register("startDate")} />
                  {errors.startDate && <p className="text-amber-500 text-[1.05rem]">{errors.startDate.message}</p>}
                </label>
                <label className="space-y-2 text-sm text-white/78">
                  <span>Duration{" "}<span className="text-red-500">*</span></span>
                  <input className="form-input" type="text" placeholder="Single day, monthly, custom" {...register("duration")} />
                  {errors.duration && <p className="text-amber-500 text-[1.05rem]">{errors.duration.message}</p>}
                </label>
              </div>
              <label className="space-y-2 text-sm text-white/78">
                <span>Movement brief{" "}<span className="text-red-500">*</span></span>
                <textarea
                  className="form-textarea"
                  placeholder="Mention airport transfer, rally coverage, family movement, or executive route."
                  {...register("brief")}
                />
                {errors.brief && <p className="text-amber-500 text-[1.05rem]">{errors.brief.message}</p>}
              </label>
              <button
                type="submit"
                className="w-fit rounded-full bg-[var(--brand)] px-4 py-3 text-sm font-medium text-[#11130f] transition hover:bg-[var(--brand-strong)]"
              >
                Send enquiry
              </button>
            </form>
       
    )
}