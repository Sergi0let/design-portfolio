import { mainData } from "@/app/constants";

import { BtnOrLink, Telegram, WhatsApp } from ".";

export const MenuBlock = ({ isOpen = false, toggleMenu, toggleTalk }) => {
  return (
    <aside
      className={`fixed z-40 h-full w-full bg-dark transition-all duration-300 ease-in-out ${isOpen ? "top-0 opacity-100" : "-top-full opacity-0"}`}
      // className={`bg-dark fixed top-0 z-40 h-full w-full opacity-100 transition-all duration-300 ease-in-out`}
    >
      <div
        className={`absolute left-0 top-0 z-50 size-full bg-dark transition-all ${isOpen ? "rotate-180 scale-y-0 delay-1000 duration-700" : "rotate-0 scale-y-100"}`}
      />
      <p
        className={`absolute left-[var(--16-40)] top-6 z-50 text-logo text-white ${isOpen ? "opacity-100 transition-opacity delay-300 duration-700 ease-in-out" : "opacity-0"}`}
      >
        Roman Demydiuk
      </p>
      {isOpen && (
        <div
          className={`right-[var(--16-40)] top-6 z-40 flex items-center gap-2 transition-colors duration-300 md:gap-4 ${isOpen ? "fixed" : "static"}`}
        >
          <BtnOrLink
            title="Let’s Talk"
            onClick={() => {
              toggleTalk();
              toggleMenu();
            }}
            isDark={true}
          />
          <button
            data-hover="dark"
            aria-label="Close menu"
            onClick={toggleMenu}
            className="btn-menu btn-menu_open btn-menu_white !static !bg-white/5"
          ></button>
        </div>
      )}
      <div className={`mx-auto ${isOpen ? "h-screen" : ""}`}>
        <div className="flex-center relative h-full">
          <div>
            <a
              href={`mailto:${mainData.email}`}
              className={`relative z-50 text-title-lg font-bold text-white ${isOpen ? "opacity-100 transition-opacity delay-300 duration-700 ease-in-out" : "opacity-0"}`}
            >
              {mainData.email}
            </a>
            <div className="wrap-decor-menu z-10" />
          </div>

          <a
            href="#"
            className={`footer-img-one absolute bottom-[var(--16-40)] left-[var(--16-40)] z-50 ${isOpen ? "opacity-100 transition-opacity delay-300 duration-700 ease-in-out" : "opacity-0"}`}
          >
            <div className="w-5 md:w-10">
              <WhatsApp />
            </div>
            <span className="font-bold text-white">Whatsapp</span>
          </a>
          <a
            href="#"
            className={`footer-img-two absolute bottom-[var(--16-40)] right-[var(--16-40)] z-50 ${isOpen ? "opacity-100 transition-opacity delay-300 duration-700 ease-in-out" : "opacity-0"}`}
          >
            <div className="w-5 md:w-10">
              <Telegram />
            </div>
            <span className="font-bold text-white">Telegram</span>
          </a>
        </div>
      </div>
    </aside>
  );
};
