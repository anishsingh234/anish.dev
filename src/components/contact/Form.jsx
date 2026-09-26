"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { Toaster, toast } from "sonner";
import { Send } from "lucide-react";

const field =
  "w-full bg-transparent border-0 border-b-2 border-ink/30 px-0 py-1.5 font-serif text-[1.1rem] text-ink placeholder:text-graphite/90 focus:border-pen focus:outline-none focus-visible:outline-none transition-colors";
const label = "block font-caveat text-[1.45rem] leading-none text-cobalt";
const error = "mt-1.5 block font-mono text-[0.72rem] text-pen-deep";

export default function Form() {
  const [sending, setSending] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setSending(true);
    const toastId = toast.loading("Folding the letter…");
    emailjs
      .send(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        { to_name: "Anish", from_name: data.name, reply_to: data.email, message: data.message },
        { publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY, limitRate: { throttle: 5000 } }
      )
      .then(
        () => {
          reset();
          toast.success("Sent. I’ll reply to the email you gave.", { id: toastId });
        },
        (err) => {
          console.error("EmailJS error:", err);
          toast.error("That didn’t send. Try again, or email me directly — the address is on the slip.", { id: toastId });
        }
      )
      .finally(() => setSending(false));
  };

  return (
    <>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#f1ede3",
            color: "#111",
            border: "none",
            borderRadius: 0,
            boxShadow: "var(--lift-2)",
            fontFamily: "var(--font-spectral), Georgia, serif",
          },
        }}
      />
      <form className="space-y-7" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid gap-7 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className={label}>
              your name
            </label>
            <input
              id="contact-name"
              type="text"
              autoComplete="name"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              className={field}
              {...register("name", {
                required: "Please add your name.",
                minLength: { value: 3, message: "Your name needs at least 3 letters." },
              })}
            />
            {errors.name && (
              <span id="contact-name-error" role="alert" className={error}>
                {errors.name.message}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="contact-email" className={label}>
              where I can reply
            </label>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              className={field}
              placeholder="you@company.com"
              {...register("email", {
                required: "Please add an email so I can reply.",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "That email looks incomplete — check the @ and domain." },
              })}
            />
            {errors.email && (
              <span id="contact-email-error" role="alert" className={error}>
                {errors.email.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className={label}>
            the idea, role or problem
          </label>
          <textarea
            id="contact-message"
            rows={5}
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={`${field} resize-none leading-[2rem] border-b-0`}
            {...register("message", {
              required: "Please write a message.",
              minLength: { value: 20, message: "A little more detail helps — at least 20 characters." },
            })}
          />
          {errors.message && (
            <span id="contact-message-error" role="alert" className={error}>
              {errors.message.message}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-5 pt-1">
          <button
            type="submit"
            disabled={sending}
            className="paper paper-ink lift inline-flex min-h-12 items-center gap-2.5 px-6 type-label text-[0.78rem] [--r:-1.2deg] disabled:opacity-60 disabled:cursor-wait"
          >
            {sending ? "Sending…" : "Send the letter"}
            <Send className="size-4" aria-hidden="true" />
          </button>
          <p className="font-caveat text-xl text-graphite">— signed, sealed, sent to my inbox</p>
        </div>
      </form>
    </>
  );
}
