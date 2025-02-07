"use client";

import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { BtnOrLink } from ".";

export const FormBlock = ({ isTalkOpen = false, toggleMenu, toggleTalk }) => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    from: "",
    phone: "",
    message: "",
    budget: "",
    contact_me: "",
  });

  const handleChange = ({ target: { name, value, type, checked } }) => {
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked ? value : "" }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send(
        "service_wximhd3",
        "template_i069moa",
        {
          from_name: form.name,
          to_name: "Roman",
          from_email: form.phone,
          to_email: "romandemudyuk@gmail.com",
          message: form.message,
          from_from: form.from,
          budget: form.budget,
          contact_me: form.contact_me,
        },
        "eLkC4hxXIsrFacSyR",
      );
      setLoading(false);
      setForm({ name: "", phone: "", message: "", from: "", budget: "", contact_me: "" });
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Something went wrong, please try again later.");
    }
  };
  return (
    <aside
      className={`min-h-min-[600px] fixed z-40 h-full w-full bg-dark transition-all duration-300 ease-in-out ${isTalkOpen ? "top-0 opacity-100" : "-top-full opacity-0"}`}
      // className={`fixed top-0 z-30 h-full w-full bg-dark opacity-100 transition-all duration-300 ease-in-out`}
    >
      <div className="overflow-y-auto">
        <div
          className={`absolute left-0 top-0 z-50 size-full bg-dark transition-all ${isTalkOpen ? "rotate-180 scale-y-0 delay-[1800ms] duration-700" : "rotate-0 scale-y-100"}`}
        />
        <p
          className={`absolute left-[var(--16-40)] top-6 z-50 hidden text-logo text-white md:block ${isTalkOpen ? "opacity-100 transition-opacity delay-300 duration-700 ease-in-out" : "opacity-0"}`}
        >
          Roman Demydiuk
        </p>
        <div
          className={`right-[var(--16-40)] top-6 z-50 flex items-center gap-2 transition-colors duration-300 md:gap-4 ${isTalkOpen ? "fixed" : "static"}`}
        >
          {isTalkOpen && (
            <button
              data-hover="dark"
              aria-label="Close menu"
              onClick={() => {
                toggleMenu();
                toggleTalk();
              }}
              className="btn-menu btn-menu_open btn-menu_white !bg-white/5"
            ></button>
          )}
        </div>
        <div className={`${isTalkOpen ? "mx-auto h-screen" : ""}`}>
          <div className="flex-center relative h-full">
            <div className="oveflow-y-auto p-4 lg:pt-0">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className={`relative z-40 max-w-[400px] space-y-6 text-white ${isTalkOpen ? "opacity-100 delay-700 duration-700" : "opacity-0"}`}
              >
                <label htmlFor="name" className="flex flex-col">
                  <span className="mb-1 text-xl font-bold md:text-2xl">My name is</span>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="border-b border-tetriary bg-inherit py-3 text-base text-tetriary"
                    placeholder="Your name"
                  />
                </label>
                <label htmlFor="from" className="flex flex-col">
                  <span className="mb-1 text-xl font-bold md:text-2xl">from</span>
                  <input
                    id="from"
                    type="text"
                    name="from"
                    value={form.from}
                    onChange={handleChange}
                    required
                    className="border-b border-tetriary bg-inherit py-3 text-base text-tetriary"
                    placeholder="Website or company name"
                  />
                </label>
                <label htmlFor="text" className="flex flex-col">
                  <span className="mb-1 text-xl font-bold md:text-2xl">
                    I’d like to talk about the project idea and design brief
                  </span>
                  <textarea
                    className="border-b border-tetriary bg-inherit py-3 text-base text-tetriary"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Share your project idea (optional)"
                    required
                    name="message"
                    id="text"
                    rows={1}
                  />
                </label>
                <label htmlFor="budget" className="flex flex-col">
                  <span className="mb-1 text-xl font-bold md:text-2xl">A budget for this project is</span>
                  <div className="flex">
                    {["$5k+", "$2k-$5k", "$1k-$2k", "up to $1k"].map((range) => (
                      <label key={range} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="budget"
                          value={range}
                          checked={form.budget === range}
                          onChange={handleChange}
                          className="form-checkbox text-primary h-5 w-5"
                        />
                        <span>{range}</span>
                      </label>
                    ))}
                  </div>
                </label>
                <label htmlFor="contact_me" className="flex flex-col">
                  <span className="mb-1 text-xl font-bold md:text-2xl">Contact Me Back</span>
                  <input
                    id="contact_me"
                    type="text"
                    name="contact_me"
                    value={form.contact_me}
                    onChange={handleChange}
                    required
                    className="border-b border-tetriary bg-inherit py-3 text-base text-tetriary"
                    placeholder="Your email or phone number"
                  />
                </label>
                <BtnOrLink
                  type="submit"
                  className="h-12 w-full font-bold capitalize"
                  disabled={loading}
                  title={"Submit"}
                  isDark={true}
                />
              </form>
              <div className="wrap-decor z-10" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
