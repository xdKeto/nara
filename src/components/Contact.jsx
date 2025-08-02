import { FaDiscord, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { CONTACT_CONTENT } from "../constants";
import { motion } from "framer-motion";
import TiltedCard from "./TiltedCard/TiltedCard";

// import icons from "react-icons/fa"

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const imageVariants = {
  hidden: { clipPath: "inset(0 50% 0 50%" },
  visible: {
    clipPath: "inset(0 0% 0 0%)",
    transition: { duration: 1.2, ease: "easeInOut" },
  },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay,
    },
  }),
};

const iconMap = {
  "fa-instagram": FaInstagram,
  "fa-x-twitter": FaTwitter,
  "fa-linkedin": FaLinkedin,
  "fa-discord" : FaDiscord
};

const Contact = () => {
  return (
    <section className="px-6 select-none">
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="will-change-transform relative z-10 flex flex-col-reverse md:flex-row text-white md:mt-6 space-y-4 md:space-y-0">
        <TiltedCard
          imageSrc={CONTACT_CONTENT.image}
          containerHeight="250px"
          containerWidth="350px"
          rotateAmplitude={12}
          scaleOnHover={1}
          showMobileWarning={false}
          showTooltip={false}
          displayOverlayContent={true}
          className="w-full md:w-1/2 py-4 "
        />

        <div className="w-full md:w-1/2 py-4 px-8 ">
          <motion.h1 initial="hidden" animate="visible" variants={textVariants} className="text-black font-semibold text-xl md:text-2xl my-4 md:my-8 ">
            {CONTACT_CONTENT.headline}
          </motion.h1>
          <motion.a initial="hidden" animate="visible" variants={textVariants} href={`mailto:${CONTACT_CONTENT.email}`} className="text-black font-semibold text-md md:text-lg my-4 md:my-8">
            {CONTACT_CONTENT.email}
          </motion.a>

          <div className="flex space-x-6 mt-8">
            {CONTACT_CONTENT.social_links.map((link, index) => {
              const Icon = iconMap[link.icon];
              return (
                <motion.a
                  initial="hidden"
                  animate="visible"
                  variants={iconVariants}
                  custom={1.0 + index * 0.2}
                  href={link.link}
                  key={link.platform}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.aria_label}
                  className="text-black will-change-transform"
                >
                  <Icon size={40} />
                </motion.a>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
