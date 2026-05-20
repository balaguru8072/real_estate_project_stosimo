"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactSection() {
  const [activeField, setActiveField] = useState("");
  const [loading, setLoading] = useState(false);

  const focusStyle = {
    boxShadow: "0 4px 10px rgb(21, 93, 252)",
    borderBottom: "1px solid rgb(21, 93, 252)",
    outline: "none",
  };

  const getFieldStyle = (fieldName) =>
    activeField === fieldName ? focusStyle : {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      username: formData.get("username"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("http://localhost:5000/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong");
        return;
      }

      toast.success("Message sent successfully ✅");
      form.reset();

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-[#f5f7f6] py-[70px] md:py-[120px]">
      <ToastContainer position="top-right" autoClose={1500} />

      <div className="auto-container">
        <div className="grid grid-cols-1 items-center gap-[30px] lg:grid-cols-2">
          <div className="lg:pr-[40px]">
            <div className="mb-[33px]">
              <h5 className="mb-2 text-[16px] font-semibold uppercase text-[#155dfc]">
                Contact
              </h5>
              <h2 className="text-[32px] font-bold leading-[42px] text-[#1d2534] md:text-[40px] md:leading-[50px]">
                Contact Us
              </h2>
            </div>

            <form onSubmit={handleSubmit} id="contact-form">
              <div className="grid grid-cols-1 gap-x-5 gap-y-[15px] md:grid-cols-2">
                <div className="relative block">
                  <input
                    type="text"
                    name="username"
                    placeholder="Your Name"
                    required
                    onFocus={() => setActiveField("username")}
                    onBlur={() => setActiveField("")}
                    style={getFieldStyle("username")}
                    className="h-[42px] w-full border-b border-[#574f93] bg-transparent px-0 text-[16px] text-[#878a8f] outline-none transition-all duration-500 placeholder:text-[#878a8f]"
                  />
                </div>

                <div className="relative block">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    required
                    onFocus={() => setActiveField("email")}
                    onBlur={() => setActiveField("")}
                    style={getFieldStyle("email")}
                    className="h-[42px] w-full border-b border-[#574f93] bg-transparent px-0 text-[16px] text-[#878a8f] outline-none transition-all duration-500 placeholder:text-[#878a8f]"
                  />
                </div>

                <div className="relative block">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    required
                    onFocus={() => setActiveField("phone")}
                    onBlur={() => setActiveField("")}
                    style={getFieldStyle("phone")}
                    className="h-[42px] w-full border-b border-[#574f93] bg-transparent px-0 text-[16px] text-[#878a8f] outline-none transition-all duration-500 placeholder:text-[#878a8f]"
                  />
                </div>

                <div className="relative block">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    required
                    onFocus={() => setActiveField("subject")}
                    onBlur={() => setActiveField("")}
                    style={getFieldStyle("subject")}
                    className="h-[42px] w-full border-b border-[#574f93] bg-transparent px-0 text-[16px] text-[#878a8f] outline-none transition-all duration-500 placeholder:text-[#878a8f]"
                  />
                </div>

                <div className="relative block md:col-span-2">
                  <textarea
                    name="message"
                    placeholder="Message"
                    required
                    onFocus={() => setActiveField("message")}
                    onBlur={() => setActiveField("")}
                    style={getFieldStyle("message")}
                    className="h-[120px] w-full resize-none border-b border-[#574f93] bg-transparent px-0 pt-2 text-[16px] text-[#878a8f] outline-none transition-all duration-500 placeholder:text-[#878a8f]"
                  ></textarea>
                </div>

                <div className="relative block md:col-span-2">
                  <button
                    disabled={loading}
                    className="inline-flex items-center justify-center rounded-md bg-[#3628a0] px-[30px] py-[14px] text-[16px] font-semibold text-white transition hover:bg-[#1d2534] disabled:cursor-not-allowed disabled:opacity-60"
                    type="submit"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div>
            <div className="overflow-hidden rounded-[10px]">
              <iframe
                title="Mayiladuthurai Map"
                src="https://www.google.com/maps?q=11.1035,79.6550&z=12&output=embed"
                width="100%"
                height="500"
                className="h-[350px] w-full border-0 md:h-[500px]"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}