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
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Функція для перевірки окремого поля при blur
  const handleBlur = ({ target: { name, value } }) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  // Валідація окремого поля
  const validateField = (name, value) => {
    let errorMsg = "";
    if (!value.trim()) {
      errorMsg = "Required field";
    }
    if (name === "contact_me" && value.trim()) {
      // Проста перевірка email за допомогою regex
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(value)) {
        errorMsg = "Please enter a valid email address";
      }
    }
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  // Загальна валідація форми
  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = "Required field";
    }
    if (!form.from.trim()) {
      newErrors.from = "Required field";
    }
    if (!form.message.trim()) {
      newErrors.message = "Required field";
    }
    if (!form.contact_me.trim()) {
      newErrors.contact_me = "Required field";
    } else {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(form.contact_me)) {
        newErrors.contact_me = "Please enter a valid email address";
      }
    }
    return newErrors;
  };

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

    // Виконуємо валідацію перед відправкою
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Відзначаємо всі обов’язкові поля як touched
      setTouched({
        name: true,
        from: true,
        message: true,
        contact_me: true,
      });
      setLoading(false);
      return;
    }

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
      setErrors({});
      setTouched({});
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Щось пішло не так, спробуйте пізніше.");
    }
  };

  // Функція для рендеру повідомлення про помилку, якщо поле було торкнуте
  const renderError = (field) => {
    return touched[field] && errors[field] ? (
      <span className="mt-1 text-xs text-[#C61717]">{errors[field]}</span>
    ) : null;
  };

  return (
    <aside
      className={`fixed z-40 h-full w-full bg-dark transition-all duration-300 ease-in-out ${isTalkOpen ? "top-0 opacity-100" : "-top-full opacity-0"}`}
      // className={`fixed top-0 z-30 h-full w-full bg-dark opacity-100 transition-all duration-300 ease-in-out`}
    >
      <div className="overflow-y-auto">
        <div
          className={`absolute left-0 top-0 z-50 size-full bg-dark transition-all ${
            isTalkOpen ? "rotate-180 scale-y-0 delay-[1800ms] duration-700" : "rotate-0 scale-y-100"
          }`}
        />
        <p
          className={`absolute left-[var(--16-40)] top-6 z-50 hidden text-logo text-white md:block ${
            isTalkOpen ? "opacity-100 transition-opacity delay-300 duration-700 ease-in-out" : "opacity-0"
          }`}
        >
          Roman Demydiuk
        </p>
        <div
          className={`right-[var(--16-40)] top-6 z-50 flex items-center gap-2 transition-colors duration-300 md:gap-4 ${
            isTalkOpen ? "fixed" : "static"
          }`}
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
                className={`relative z-40 max-w-[400px] space-y-6 text-background ${
                  isTalkOpen ? "opacity-100 delay-700 duration-700" : "opacity-0"
                }`}
              >
                <label htmlFor="name" className={`flex flex-col`}>
                  <span className="mb-1 text-xl font-bold text-white md:text-2xl">My name is</span>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={`border-b border-tetriary bg-inherit py-3 text-base text-background outline-none ${touched["name"] && errors["name"] ? "border-[#C61717]" : ""}`}
                    placeholder="Your name"
                  />
                  <div className="h-2">{renderError("name")}</div>
                </label>
                <label htmlFor="from" className="flex flex-col">
                  <span className="mb-1 text-xl font-bold text-white md:text-2xl">from</span>
                  <input
                    id="from"
                    type="text"
                    name="from"
                    value={form.from}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={`border-b border-tetriary bg-inherit py-3 text-base text-background outline-none ${touched["from"] && errors["from"] ? "border-[#C61717]" : ""}`}
                    placeholder="Website or company name"
                  />
                  <div className="h-2">{renderError("from")}</div>
                </label>
                <label htmlFor="text" className="flex flex-col">
                  <span className="mb-1 text-xl font-bold text-white md:text-2xl">
                    I’d like to talk about the project idea and design brief
                  </span>
                  <textarea
                    className={`border-b border-tetriary bg-inherit py-3 text-base text-background outline-none ${touched["message"] && errors["message"] ? "border-[#C61717]" : ""}`}
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Share your project idea (optional)"
                    required
                    name="message"
                    id="text"
                    rows={1}
                  />
                  <div className="h-2">{renderError("message")}</div>
                </label>
                <label htmlFor="budget" className="flex flex-col">
                  <span className="mb-4 text-xl font-bold text-white md:text-2xl">A budget for this project is</span>
                  <div className="flex gap-2">
                    {["$5k+", "$2k-$5k", "$1k-$2k", "up to $1k"].map((range) => (
                      <label
                        key={range}
                        className={`border-placeholder rounded-full border px-[10px] py-2 transition-all hover:border-white hover:text-white ${
                          form.budget === range ? "bg-white text-black hover:text-black" : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="budget"
                          value={range}
                          checked={form.budget === range}
                          onChange={handleChange}
                          className="peer hidden"
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
                    onBlur={handleBlur}
                    required
                    className={`border-b border-tetriary bg-inherit py-3 text-base text-background outline-none ${touched["contact_me"] && errors["contact_me"] ? "border-[#C61717]" : ""}`}
                    placeholder="Your email or phone number"
                  />
                  <div className="h-2">{renderError("contact_me")}</div>
                </label>
                <BtnOrLink
                  type="submit"
                  className="h-16 w-full font-bold capitalize"
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
