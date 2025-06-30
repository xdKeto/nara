import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { CONTACT_CONTENT } from "../constants";
// import icons from "react-icons/fa"

const iconMap = {
  "fa-instagram": FaInstagram,
  "fa-x-twitter": FaTwitter,
  "fa-linkedin": FaLinkedin,
};

const Contact = () => {
  return (
    <section className="px-6">
      <div className="relative z-10 flex flex-col-reverse md:flex-row text-white md:mt-6 space-y-4 md:space-y-0">
        <div className="w-full md:w-1/2 py-4">
          <img src={CONTACT_CONTENT.image} alt="Contact Image" className="rounded-xl w-full h-auto md:w-[350px]" />
        </div>
        <div className="w-full md:w-1/2 py-4 px-8 ">
          <h1 className="text-black font-semibold text-xl md:text-2xl my-4 md:my-8 ">{CONTACT_CONTENT.headline}</h1>
          <a href={`mailto:${CONTACT_CONTENT.email}`} className="text-black font-semibold text-md md:text-lg my-4 md:my-8">
            {CONTACT_CONTENT.email}
          </a>

          <div className="flex space-x-6 mt-8">
            {CONTACT_CONTENT.social_links.map((link) => {
              const Icon = iconMap[link.icon] || FaLinkedin;
              return (
                <a href={link.link} key={link.platform} target="_blank" rel="noopener noreferrer" aria-label={link.aria_label} className="text-black">
                  <Icon size={36} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
