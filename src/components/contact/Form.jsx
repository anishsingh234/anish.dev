"use client";
import React from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { Toaster, toast } from "sonner";
import { ArrowRight } from "lucide-react";

export default function Form() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const sendEmail = (params) => {
    const toastId = toast.loading("Sending dispatch, please wait...");
    emailjs
      .send(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        params,
        {
          publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
          limitRate: { throttle: 5000 },
        }
      )
      .then(
        () => {
          reset();
          toast.success("Dispatch received! I will get back to you soon.", { id: toastId });
        },
        (error) => {
          console.error("EmailJS Error:", error);
          toast.error(`Error sending dispatch: ${error?.text || error?.message || "Unknown error"}`, { id: toastId });
        }
      );
  };

  const onSubmit = (data) => {
    const templateParams = {
      to_name: "Anish",
      from_name: data.name,
      reply_to: data.email,
      message: data.message,
    };
    sendEmail(templateParams);
  };

  return (
    <div className="w-full relative">
      <Toaster richColors={true} />
      <form 
        className="space-y-6 w-full relative z-10" 
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="w-full flex-col flex gap-2 form-element">
            <input 
              type="text" 
              placeholder="YOUR NAME" 
              suppressHydrationWarning
              className="w-full bg-[#111018]/5 border-2 border-black/20 px-4 py-4 text-sm text-[#111018] placeholder:text-[#111018]/40 focus:outline-none focus:border-purple-600 transition-colors font-mono font-bold uppercase tracking-wider"
              style={{ clipPath: "polygon(1% 0, 99% 2%, 100% 98%, 0 100%)", boxShadow: "inset 2px 3px 5px rgba(0,0,0,0.1)" }}
              {...register("name", {
                required: "Name is required!",
                minLength: { value: 3, message: "At least 3 characters." },
              })}
            />
            {errors.name && (
              <span className="inline-block text-red-600 font-mono text-xs font-bold pl-1 uppercase">
                * {errors.name.message}
              </span>
            )}
          </div>
          
          <div className="w-full flex-col flex gap-2 form-element">
            <input 
              type="email" 
              placeholder="RETURN ADDRESS (EMAIL)" 
              suppressHydrationWarning
              className="w-full bg-[#111018]/5 border-2 border-black/20 px-4 py-4 text-sm text-[#111018] placeholder:text-[#111018]/40 focus:outline-none focus:border-purple-600 transition-colors font-mono font-bold uppercase tracking-wider"
              style={{ clipPath: "polygon(0 2%, 99% 0, 98% 100%, 2% 98%)", boxShadow: "inset 2px 3px 5px rgba(0,0,0,0.1)" }}
              {...register("email", { required: "Email is required!" })}
            />
            {errors.email && (
              <span className="inline-block text-red-600 font-mono text-xs font-bold pl-1 uppercase">
                * {errors.email.message}
              </span>
            )}
          </div>
        </div>
        
        <div className="w-full flex-col flex gap-2 form-element">
          <textarea 
            rows={5} 
            placeholder="WRITE YOUR MESSAGE HERE..." 
            suppressHydrationWarning
            className="w-full bg-[#111018]/5 border-2 border-black/20 px-4 py-4 text-sm text-[#111018] placeholder:text-[#111018]/40 focus:outline-none focus:border-purple-600 transition-colors resize-none font-mono font-bold uppercase tracking-wider"
            style={{ clipPath: "polygon(0 0, 100% 1%, 99% 100%, 1% 99%)", boxShadow: "inset 2px 4px 6px rgba(0,0,0,0.1)" }}
            {...register("message", {
              required: "Message is required!",
              minLength: { value: 20, message: "Please write a bit more." },
            })}
          />
          {errors.message && (
            <span className="inline-block text-red-600 font-mono text-xs font-bold pl-1 uppercase">
              * {errors.message.message}
            </span>
          )}
        </div>
        
        <button 
          type="submit"
          suppressHydrationWarning
          className="form-element group relative w-full py-5 bg-[#111018] text-white font-mono font-black tracking-[0.2em] uppercase transition-transform hover:-translate-y-1 hover:shadow-[8px_12px_20px_rgba(0,0,0,0.4)] flex items-center justify-center gap-3"
          style={{ clipPath: "polygon(1% 1%, 99% 0, 98% 99%, 0 100%)", boxShadow: "4px 6px 12px rgba(0,0,0,0.3)" }}
        >
          Send Dispatch
          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          
          {/* Subtle tape overlay */}
          <div className="absolute top-0 right-4 w-12 h-3 bg-white/20 rotate-[-5deg]" />
        </button>
      </form>
    </div>
  );
}