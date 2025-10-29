import { getStrapiURL } from "../utils/api";
import { useEffect } from "react";
import { useFetchData } from "../hooks/FetchData";
import { motion } from "framer-motion";

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

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const Resume = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const { data } = useFetchData();
  const resumeData = data?.resumePage || null;

  // Early return if data is not available
  if (!resumeData) {
    return (
      <section className="px-6 select-none">
        <div className="text-center py-8">
          <p className="text-gray-500">Loading resume data...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-24 px-6 select-none">
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="will-change-transform relative z-10 flex flex-col-reverse md:flex-row md:mt-6 space-y-4 md:space-y-0 mb-4">
        <motion.div initial="hidden" animate="visible" variants={imageVariants} className="w-full md:w-1/2 py-4 px-8 justify-items-center md:justify-items-end">
          <img src={getStrapiURL(resumeData.image?.url)} loading="lazy" alt="Resume Image" className="rounded-xl w-[250px] h-[250px] object-cover object-[center_20%] max-w-full aspect-square" />
        </motion.div>
        <div className="w-full md:w-1/2 py-4 ">
          <motion.h1 initial="hidden" animate="visible" variants={textVariants} className="text-black font-semibold text-xl md:text-2xl my-4 md:my-8 ">
            {resumeData.name}
          </motion.h1>
          <motion.h3 initial="hidden" animate="visible" variants={textVariants} className="text-black font-semibold text-md md:text-lg my-2 md:my-4">
            {resumeData.role}
          </motion.h3>
          <motion.h3 initial="hidden" animate="visible" variants={textVariants} className="text-black font-semibold text-md md:text-lg my-2 md:my-4">
            {resumeData.city}
          </motion.h3>
        </div>
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={textVariants} className="will-change-transform mb-6 md:mb-8">
        <h1 className="text-black text-2xl md:text-4xl font-medium tracking-tight mb-4">SKILLS</h1>
        <div className="h-1 w-32 mb-4 bg-black"></div>
        <div className="flex flex-wrap gap-3 pb-2">
          {resumeData.skills?.map((skill, idx) => (
            <motion.span
              initial="hidden"
              animate="visible"
              variants={iconVariants}
              custom={1.0 + idx * 0.2}
              key={skill.id}
              className="will-change-transform whitespace-nowrap bg-gray-300 shadow-md
             text-black font-semibold px-4 py-2 rounded-full text-sm "
            >
              {skill.skill}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <motion.div viewport={{ once: true, amount: 0.3 }} variants={textVariants} className="will-change-transform mb-6 md:mb-8">
        <h1 className="text-black text-2xl md:text-4xl font-medium tracking-tight mb-4">SOFTWARE</h1>
        <div className="h-1 w-32 mb-4 bg-black"></div>
        <div className="flex flex-wrap gap-3 pb-2">
          {resumeData.softwareIcons?.map((icon, idx) => (
            <motion.div initial="hidden" animate="visible" variants={iconVariants} custom={idx * 0.1} key={icon.id} className="px-2 flex-w-1/5 max-w-[120px]">
              <img src={getStrapiURL(icon.url)} alt={icon.name || `Software icon ${idx + 1}`} className="w-12 h-12 object-contain" loading="lazy" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.01 }} variants={textVariants} className="will-change-transform mb-6 md:mb-8">
        <h1 className="text-black text-2xl md:text-4xl font-medium tracking-tight mb-4">EXPERIENCE</h1>
        <div className="h-1 w-32 mb-4 bg-black"></div>

        <motion.div className="will-change-transform space-y-6" initial="hidden" animate="visible" variants={containerVariants}>
          {resumeData.experience?.map((exp) => (
            // framer motion layer
            <motion.div key={exp.id} variants={childVariants} className="will-change-transform">
              <div className="flex flex-col md:flex-row md:justify-between">
                <div className="text-sm font-semibold md:w-1/4 mb-2 md:mb-0 p-4">{exp.yearRange}</div>
                <div className="md:w-5/6 mb-10">
                  <div className="max-w-3xl backdrop-blur-3xl p-4 bg-gray-100 rounded-lg">
                    <h2 className="text-xl mb-2 font-bold ">
                      {exp.title} - <span className="mb-4 text-sm italic font-normal"> {exp.location} </span>
                    </h2>
                    <p className="text-sm italic font-semibold">{exp.role}</p>
                    <p className="mb-4 text-sm italic">{exp.subtitle}</p>
                    <ul className="list-disc list-inside space-y-2">
                      {exp.description?.map((desc) => (
                        <li key={desc.id}>{desc.jobDesc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Resume;
