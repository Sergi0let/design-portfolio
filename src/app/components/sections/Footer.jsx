import { Telegram, WhatsApp } from "../elements";

export const Footer = () => {
  return (
    <footer className="relative h-[60vh]" style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}>
      <div className="fixed bottom-0 h-[60vh] w-full overflow-hidden">
        <img src="/img.webp" alt="footer-img" className="absolute h-[60vh] w-full object-cover" />
        <div className="wrap-primary flex h-full flex-col items-center justify-between">
          <div data-fade="true" data-delay-five className="flex h-full items-center justify-center">
            <a href="#" className="footer-link text-title-lg font-bold text-white">
              roman@mail.com
            </a>
          </div>
          <div className="flex w-full flex-col-reverse items-center justify-between md:flex-row">
            <p data-fade="true" data-delay-one className="footer-copy">
              &copy; Roman Demydiuk
            </p>
            <div className="flex w-full items-center justify-between gap-10 py-2 md:w-fit md:justify-start md:py-10">
              <a data-fade="true" data-delay-two href="#" className="footer-img-one">
                <div className="w-5 md:w-10">
                  <WhatsApp />
                </div>
                <span className="font-bold text-white">Whatsapp</span>
              </a>
              <a data-fade="true" data-delay-three href="#" className="footer-img-two">
                <div className="w-5 md:w-10">
                  <Telegram />
                </div>
                <span className="font-bold text-white">Telegram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
