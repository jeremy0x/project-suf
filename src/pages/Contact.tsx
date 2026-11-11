import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { gooeyToast } from "goey-toast";
import Layout from "../components/Layout";
import { Reveal } from "@/components/motion";
import { PageHero } from "@/components/site/PageHero";
import { Btn } from "@/components/site/Btn";
import { sessions } from "@/lib/sessions";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="eyebrow text-ink/50">
        {label}
        {required && <span className="text-brand-blue"> *</span>}
      </span>
      {children}
    </label>
  );
}

const Contact = () => {
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const source = searchParams.get("source");
    const plan = searchParams.get("plan");

    if (source) {
      let subject = "";
      let message = "";

      switch (source) {
        case "pricing":
          subject = plan ? `Inquiry about ${plan} plan` : "Membership Inquiry";
          message = plan
            ? `I'm interested in learning more about the ${plan} plan.`
            : "I'm interested in learning more about your membership options.";
          break;
        case "home":
          subject = "General Inquiry";
          message = "I'm interested in learning more about Shape Up Fitness.";
          break;
        case "services":
          subject = "Service Inquiry";
          message = "I'm interested in learning more about your services.";
          break;
        case "gallery":
          subject = "Facility Tour Request";
          message = "I'd like to schedule a tour of your facility.";
          break;
        case "navbar":
          subject = "Membership Inquiry";
          message =
            "I'm interested in joining Shape Up Fitness. Please provide more information about membership options.";
          break;
        case "about":
          subject = "Membership Inquiry";
          message =
            "I'm interested in joining Shape Up Fitness. Please provide more information about membership options.";
          break;
        case "pricing_join":
          subject = "Membership Inquiry";
          message =
            "I'm interested in joining Shape Up Fitness. Please provide more information about membership options.";
          break;
        case "pricing_tour":
          subject = "Facility Tour Request";
          message = "I'd like to schedule a tour of your facility.";
          break;
        case "about_cta":
          subject = "Membership Inquiry";
          message =
            "I'm interested in joining Shape Up Fitness. Please provide more information about membership options.";
          break;
        case "services_cta":
          subject = "Service Inquiry";
          message = "I'm interested in learning more about your services.";
          break;
        case "sessions_cta":
          subject = "Session Inquiry";
          message = "I'm interested in learning more about your sessions.";
          break;
        default:
          subject = "General Inquiry";
          message = "I'm interested in learning more about Shape Up Fitness.";
          break;
      }

      setFormData((prev) => ({
        ...prev,
        subject,
        message,
      }));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/dad85d4bbe7c6a7258fa71605ba1c640",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (data.success === "true") {
        gooeyToast.success("Message sent successfully!", {
          description: "We'll get back to you soon.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch {
      gooeyToast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <PageHero
        index="C"
        label="Contact"
        title={["Say", <span className="text-white/30">hello.</span>]}
        intro="Questions, a tour, or ready to sign up. Send a message or just walk in during a session."
      />

      <section className="section bg-background text-ink">
        <div className="shell grid grid-cols-12 gap-x-6 gap-y-20">
          <div className="col-span-12 lg:col-span-7">
            <Reveal from="left">
              <p className="eyebrow mb-12 flex items-center gap-3 text-ink/55">
                <span>(01)</span>
                <span className="h-px w-8 bg-current" />
                <span>Send a message</span>
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                  <Field label="Name" required>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="field" placeholder="Your name" autoComplete="name" />
                  </Field>
                  <Field label="Email" required>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="field" placeholder="you@example.com" autoComplete="email" />
                  </Field>
                </div>
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                  <Field label="Phone">
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="field" placeholder="080..." autoComplete="tel" />
                  </Field>
                  <Field label="Subject" required>
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="field" placeholder="What's it about?" />
                  </Field>
                </div>
                <Field label="Message" required>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} className="field resize-none" placeholder="Tell us a little about your goals" />
                </Field>
                <Btn type="submit" variant="ink" disabled={isSubmitting} className="w-full justify-between md:w-auto md:min-w-[16rem]">
                  {isSubmitting ? "Sending…" : "Send message"}
                </Btn>
              </form>
            </Reveal>
          </div>

          <aside className="col-span-12 lg:col-span-4 lg:col-start-9">
            <Reveal from="left">
              <p className="eyebrow mb-12 flex items-center gap-3 text-ink/55">
                <span>(02)</span>
                <span className="h-px w-8 bg-current" />
                <span>Find us</span>
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <dl className="border-t border-ink/15 text-[15px]">
                <div className="border-b border-ink/15 py-5">
                  <dt className="eyebrow text-ink/45">Address</dt>
                  <dd className="mt-2">Embassy Lodge, FUTA South Gate, Akure, Ondo State</dd>
                </div>
                <div className="border-b border-ink/15 py-5">
                  <dt className="eyebrow text-ink/45">Phone</dt>
                  <dd className="mt-2">
                    <a href="tel:08134460609" className="link-line">0813 446 0609</a>
                  </dd>
                </div>
                <div className="border-b border-ink/15 py-5">
                  <dt className="eyebrow text-ink/45">Email</dt>
                  <dd className="mt-2 break-all">
                    <a href="mailto:shapeupfitnessclub326@gmail.com" className="link-line">shapeupfitnessclub326@gmail.com</a>
                  </dd>
                </div>
                <div className="border-b border-ink/15 py-5">
                  <dt className="eyebrow text-ink/45">Hours · Mon – Sat</dt>
                  <dd className="mt-2 space-y-1 font-mono text-sm tabular-nums">
                    {sessions.map((s) => (
                      <p key={s.name} className="flex justify-between">
                        <span className="text-ink/55">{s.name}</span>
                        <span>{s.label}</span>
                      </p>
                    ))}
                    <p className="flex justify-between">
                      <span className="text-ink/55">Sunday</span>
                      <span>Closed</span>
                    </p>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </aside>
        </div>

        <div className="shell mt-20 md:mt-28">
          <Reveal from="top">
            <div className="frame aspect-[4/3] w-full md:aspect-[21/9]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.5347444318777!2d5.153839200000001!3d7.293654100000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10478fa799372cab%3A0xedbb4164cbf23193!2sShape%20Up%20Fitness%20Gym!5e0!3m2!1sen!2sng!4v1768784956454!5m2!1sen!2sng"
                className="h-full w-full grayscale"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Shape Up Fitness location"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
