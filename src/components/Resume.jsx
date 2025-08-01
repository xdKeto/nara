import { RESUME_CONTENT } from "../constants";
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

const containerVariants2 = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.3 } },
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
  return (
    <section className="px-6 select-none">
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="will-change-transform relative z-10 flex flex-col-reverse md:flex-row md:mt-6 space-y-4 md:space-y-0 mb-4">
        <motion.div initial="hidden" animate="visible" variants={imageVariants} className="w-full md:w-1/2 py-4 px-8 justify-items-center md:justify-items-end">
          <img src={RESUME_CONTENT.image} loading="lazy" alt="Contact Image" className="rounded-xl w-[250px] h-[250px] object-cover max-w-full aspect-square" />
        </motion.div>
        <div className="w-full md:w-1/2 py-4 ">
          <motion.h1 initial="hidden" animate="visible" variants={textVariants} className="text-black font-semibold text-xl md:text-2xl my-4 md:my-8 ">
            {RESUME_CONTENT.name}
          </motion.h1>
          <motion.h3 initial="hidden" animate="visible" variants={textVariants} className="text-black font-semibold text-md md:text-lg my-2 md:my-4">
            {RESUME_CONTENT.role}
          </motion.h3>
          <motion.h3 initial="hidden" animate="visible" variants={textVariants} className="text-black font-semibold text-md md:text-lg my-2 md:my-4">
            {RESUME_CONTENT.city}
          </motion.h3>
        </div>
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={textVariants} className="will-change-transform mb-6 md:mb-8">
        <h1 className="text-black text-2xl md:text-4xl font-medium tracking-tight mb-4">SKILLS</h1>
        <div className="h-1 w-32 mb-4 bg-black"></div>
        <div className="flex flex-wrap gap-3 pb-2">
          {RESUME_CONTENT.skills.map((skill, idx) => (
            <motion.span
              initial="hidden"
              animate="visible"
              variants={iconVariants}
              custom={1.0 + idx * 0.2}
              key={idx}
              className="will-change-transform whitespace-nowrap bg-gray-300 shadow-md
             text-black font-semibold px-4 py-2 rounded-full text-sm "
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={textVariants} className="will-change-transform mb-6 md:mb-8">
        <h1 className="text-black text-2xl md:text-4xl font-medium tracking-tight mb-4">SOFTWARE</h1>
        <div className="h-1 w-32 mb-4 bg-black"></div>
        <div className="flex flex-wrap gap-3 pb-2">
          {/* blender */}
          <div className="px-2 flex-w-1/5 max-w-[120px]">
            <svg
              width="64px"
              height="64px"
              viewBox="0 0 256.00 256.00"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              preserveAspectRatio="xMidYMid"
              fill="#000000"
              stroke="#000000"
              strokeWidth="0.00256"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />

              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <path
                    d="M100.43032,115.194555 C101.361124,98.5893536 109.492492,83.9599162 121.759794,73.5893487 C133.790003,63.4031858 149.98249,57.1773328 167.650214,57.1773328 C185.300375,57.1773328 201.492862,63.4031858 213.531852,73.5893487 C225.790373,83.9599162 233.921741,98.5893536 234.861326,115.176993 C235.792131,132.238816 228.934033,148.088836 216.903824,159.838048 C204.636522,171.789227 187.188328,179.288351 167.650214,179.288351 C148.1121,179.288351 130.62878,171.789227 118.37026,159.838048 C106.331269,148.088836 99.4907342,132.238816 100.43032,115.194555 Z"
                    fill="#FFFFFF"
                  >
                    {" "}
                  </path>{" "}
                  <path
                    d="M133.167672,116.676183 C133.645276,108.155909 137.817552,100.649417 144.112012,95.3281876 C150.284817,90.1015783 158.593324,86.9070386 167.658788,86.9070386 C176.71524,86.9070386 185.023747,90.1015783 191.201058,95.3281876 C197.491012,100.649417 201.663288,108.155909 202.145398,116.667172 C202.623002,125.421743 199.104052,133.554527 192.931246,139.58315 C186.636786,145.715405 177.683965,149.563271 167.658788,149.563271 C157.63361,149.563271 148.662766,145.715405 142.372812,139.58315 C136.195501,133.554527 132.685562,125.421743 133.167672,116.676183 Z"
                    fill="#265787"
                  >
                    {" "}
                  </path>{" "}
                  <path
                    d="M78.4107749,134.179185 C78.4694744,137.520542 79.5350962,144.01361 81.133529,149.084344 C84.4929469,159.817323 90.1913143,169.746571 98.1202631,178.497312 C106.256918,187.491883 116.276472,194.716438 127.849305,199.845871 C140.013649,205.23268 153.193946,207.978011 166.884477,207.955572 C180.552431,207.937373 193.732728,205.137858 205.897072,199.710411 C217.469906,194.531308 227.480429,187.275146 235.603538,178.27606 C243.527971,169.489196 249.217308,159.541887 252.585757,148.808908 C254.279012,143.385977 255.349149,137.881769 255.778107,132.3595 C256.198034,126.918508 256.021935,121.468484 255.249811,116.022976 C253.741685,105.411912 250.070708,95.4555722 244.417494,86.3797254 C239.247423,78.0398801 232.582771,70.7385646 224.658338,64.5931778 L224.676399,64.5796318 L144.705094,3.1754327 C144.632849,3.12124854 144.574149,3.06254903 144.497388,3.01288022 C139.250556,-1.01480899 130.427568,-1.00126295 124.656955,3.03545695 C118.823127,7.11733032 118.154856,13.8677736 123.347505,18.1257455 L123.324928,18.1483222 L156.679794,45.2720095 L55.0167639,45.3803778 L54.8813035,45.3803778 C46.4782434,45.3894085 38.4002883,50.9026468 36.8018556,57.8698267 C35.1582694,64.9679516 40.8656676,70.8559636 49.6028633,70.887571 L49.5893173,70.9191785 L101.118453,70.8198408 L9.16793408,141.399224 C9.05053507,141.485016 8.92410536,141.575323 8.81573704,141.661114 C0.14175613,148.303189 -2.66227414,159.347727 2.80129531,166.337484 C8.34614099,173.444639 20.1357111,173.458186 28.8999989,166.378122 L79.0835616,125.306529 C79.0835616,125.306529 78.3520754,130.851375 78.4107749,134.179185 Z M207.36456,152.74629 C197.024416,163.280594 182.548215,169.254398 166.884477,169.286098 C151.198163,169.313097 136.721962,163.393478 126.381818,152.877235 C121.329145,147.752317 117.61753,141.855274 115.328249,135.574427 C113.084122,129.401948 112.21266,122.85018 112.790624,116.239713 C113.336981,109.778252 115.260519,103.614804 118.330955,98.0383504 C121.347206,92.5567196 125.501325,87.6033843 130.630759,83.4131426 C140.681921,75.2223038 153.478413,70.7882334 166.8619,70.7701166 C180.258934,70.7521106 193.046396,75.1455429 203.106588,83.3092897 C208.226991,87.48147 212.376595,92.4167439 215.392846,97.889344 C218.476828,103.461282 220.38682,109.602153 220.955753,116.081676 C221.524687,122.683112 220.653225,129.22585 218.409098,135.402844 C216.115302,141.701753 212.417233,147.598795 207.36456,152.74629 Z"
                    fill="#EA7600"
                  >
                    {" "}
                  </path>{" "}
                </g>{" "}
              </g>
            </svg>
          </div>
          {/* zbrush */}
          <div className="px-2 flex-w-1/5 max-w-[120px]:">
            <svg fill="#000000" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="0 0 512 512" enableBackground="new 0 0 512 512" xmlSpace="preserve">
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />

              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

              <g id="SVGRepo_iconCarrier">
                {" "}
                <g id="2069a460dcf28295e231f3111e0439b1">
                  {" "}
                  <path
                    display="inline"
                    d="M262.97,83.259c-1.951-9.768,0.54-19.893,7.295-30.377c7.989-12.616,17.402-19.539,28.24-20.964 c14.036-1.597,27.002,5.861,39.082,22.03c11.192,15.098,16.169,29.311,14.926,42.28c-0.182,7.816-11.723,12.611-34.642,14.208 c-17.946,1.425-30.912-0.354-39.269-5.507C269.901,99.781,264.748,92.5,262.97,83.259z M510.616,478.534 c-1.242,2.658-5.675,2.305-13.323-1.07c-12.966-6.216-27.355-15.634-43.52-28.427c-17.946-14.208-28.431-25.4-31.271-33.575 c-0.531-1.955-0.35-4.437,0.712-7.635l3.38-9.064c2.305-8.347-0.717-16.694-9.064-25.051c-4.082-4.083-9.59-7.988-16.345-11.723 c-15.806-8.347-38.548-15.451-68.57-21.14c-31.094-5.861-60.754-9.236-89.003-9.944l-34.287,1.778 c-9.06,10.479-17.761,20.247-26.117,29.306c-7.104,7.463-14.027,14.391-20.782,20.787c-27.179,24.339-53.645,42.816-79.585,55.604 c-35.354,17.234-61.824,22.207-79.767,14.567c-2.309-1.597-3.021-4.26-2.309-7.994l3.198-9.948 c12.258-26.647,32.332-50.986,59.869-73.017c2.309-1.95,4.795-3.729,7.104-5.502c21.852-16.169,51.34-33.222,88.472-50.81 c24.334-10.479,44.413-17.407,60.046-20.782l14.744-20.433c5.861-7.281,12.076-14.209,18.296-20.787 c13.323-14.39,26.997-27.709,41.396-39.613c1.239-0.535,1.42-1.243,0.703-2.132c-7.28-4.083-19.181-11.728-35.344-22.919 c-13.864-9.413-24.697-15.987-32.519-19.544c-24.511-11.01-49.562-7.812-75.316,9.596c-15.46,10.302-23.808,21.675-24.696,34.11 l-0.89,15.279c0.89,4.26-12.788,11.368-40.856,21.316c-5.153,1.598-9.417,3.018-12.97,3.906c-6.22,1.243-10.484,1.425-12.612,0.354 l-0.712-0.354l-1.951-1.243c-2.49-4.972,9.237-22.029,34.996-51.34c1.778-1.991,3.574-3.924,5.38-5.83l0.06-0.077l0.059-0.04 c46.636-49.055,101.638-68.04,164.863-56.762c17.407,3.021,46.196,13.678,86.521,31.801c4.433-4.445,12.081-9.771,22.561-15.814 c13.324-7.635,24.334-11.727,32.686-11.899c18.301-0.181,29.842,6.746,34.642,21.137c2.84,8.71-3.557,20.968-19.362,36.777 c-16.341,16.699-31.801,27.179-46.368,31.438c-18.301,5.512-38.198,2.313-59.338-9.231c-9.409,7.281-20.07,17.765-31.62,31.084 c-0.531,0.535-1.066,1.243-1.597,1.778l-27.355,32.69l-0.358,2.305l18.831-0.707c13.501,0.358,27.179,2.662,41.215,7.104 c38.198,12.258,70.172,27.355,95.926,45.303c12.258,8.701,24.171,18.654,35.357,29.841c11.546,11.723,22.737,24.87,33.217,39.26 c9.246,12.798,17.058,25.759,23.627,38.729C509.909,458.102,513.279,470.89,510.616,478.534z M370.632,167.289 c3.375,2.663,11.368,3.733,24.339,3.198c14.385-0.535,24.161-3.375,29.664-8.883c2.668-2.667,2.668-5.33-0.354-7.816 c-3.375-3.021-9.591-3.729-18.473-2.49c-7.64,1.243-15.814,3.906-24.693,7.998C372.41,163.379,368.854,166.046,370.632,167.289z M176.815,337.474l-4.087-0.53c-12.258,2.49-23.627,5.33-34.106,8.533c-14.743,4.791-28.426,10.298-41.037,16.513 c-10.126,4.8-19.544,10.131-28.245,15.811c-27.718,17.942-40.507,35.358-38.198,52.229l2.667,3.021 c7.281,4.8,21.671,1.065,42.988-11.192c28.962-16.871,54.893-36.769,77.812-59.869 C162.249,354.173,169.707,346.003,176.815,337.474z"
                  >
                    {" "}
                  </path>{" "}
                </g>{" "}
              </g>
            </svg>
          </div>
          {/* Photoshop */}
          <div className="px-2 flex-w-1/5 max-w-[120px]:">
            <svg width="64px" height="64px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />

              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M2 12.1333C2 8.58633 2 6.81283 2.69029 5.45806C3.29749 4.26637 4.26637 3.29749 5.45806 2.69029C6.81283 2 8.58633 2 12.1333 2H19.8667C23.4137 2 25.1872 2 26.5419 2.69029C27.7336 3.29749 28.7025 4.26637 29.3097 5.45806C30 6.81283 30 8.58633 30 12.1333V19.8667C30 23.4137 30 25.1872 29.3097 26.5419C28.7025 27.7336 27.7336 28.7025 26.5419 29.3097C25.1872 30 23.4137 30 19.8667 30H12.1333C8.58633 30 6.81283 30 5.45806 29.3097C4.26637 28.7025 3.29749 27.7336 2.69029 26.5419C2 25.1872 2 23.4137 2 19.8667V12.1333Z"
                  fill="#001E36"
                />{" "}
                <path
                  d="M8 22.5162V10.2034C8 10.1197 8.035 10.0718 8.11667 10.0718C9.3223 10.0718 10.5274 10 11.7333 10C13.6902 10 15.809 10.6691 16.5517 12.7162C16.7267 13.2188 16.82 13.7333 16.82 14.2718C16.82 15.3009 16.5867 16.1504 16.12 16.8205C14.8164 18.6923 12.557 18.6632 10.5317 18.6632V22.5043C10.5475 22.618 10.4506 22.6718 10.3567 22.6718H8.14C8.04667 22.6718 8 22.6239 8 22.5162ZM10.5433 12.3812V16.4017C11.3464 16.4605 12.1867 16.4669 12.9583 16.2103C13.8102 15.9645 14.2767 15.2272 14.2767 14.3436C14.3003 13.5907 13.8901 12.8683 13.1917 12.5966C12.4294 12.2796 11.3662 12.2606 10.5433 12.3812Z"
                  fill="#31A8FF"
                />{" "}
                <path
                  d="M24.0967 15.6074C23.7437 15.4213 23.3677 15.2852 22.979 15.2028C22.4796 15.0853 20.5098 14.6737 20.509 15.7037C20.5265 16.2787 21.4393 16.5604 21.8426 16.7247C23.2585 17.2108 24.8607 18.0797 24.8292 19.8264C24.8725 22.0008 22.7657 22.8701 20.9598 22.8703C20.0197 22.88 19.0403 22.7344 18.1799 22.3308C18.0977 22.2873 18.0449 22.1944 18.0484 22.0996V20.019C18.0391 19.9356 18.1287 19.8627 18.1987 19.9227C19.0417 20.4325 20.0409 20.6801 21.0162 20.6933C21.4467 20.6933 22.2999 20.6516 22.2935 20.019C22.2935 19.412 21.2728 19.1329 20.8659 18.9787C20.2761 18.7682 19.7169 18.4765 19.2036 18.1118C18.4862 17.6001 18.0362 16.7797 18.0484 15.8771C18.0442 13.8297 19.9835 12.9107 21.73 12.9103C22.5464 12.9035 23.4232 12.964 24.1832 13.2956C24.2925 13.3277 24.3151 13.4429 24.3147 13.546V15.4918C24.3216 15.6126 24.1875 15.6537 24.0967 15.6074Z"
                  fill="#31A8FF"
                />{" "}
              </g>
            </svg>
          </div>
          <div className=" px-2 flex-w-1/5 max-w-[120px]">
            <svg width="64" height="64px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2 12.1333C2 8.58633 2 6.81283 2.69029 5.45806C3.29749 4.26637 4.26637 3.29749 5.45806 2.69029C6.81283 2 8.58633 2 12.1333 2H19.8667C23.4137 2 25.1872 2 26.5419 2.69029C27.7336 3.29749 28.7025 4.26637 29.3097 5.45806C30 6.81283 30 8.58633 30 12.1333V19.8667C30 23.4137 30 25.1872 29.3097 26.5419C28.7025 27.7336 27.7336 28.7025 26.5419 29.3097C25.1872 30 23.4137 30 19.8667 30H12.1333C8.58633 30 6.81283 30 5.45806 29.3097C4.26637 28.7025 3.29749 27.7336 2.69029 26.5419C2 25.1872 2 23.4137 2 19.8667V12.1333Z"
                fill="#330000"
              />
              <path
                d="M15.5686 19.5963H11.2297L10.3469 22.409C10.3224 22.5135 10.2262 22.5875 10.1215 22.5823H7.92384C7.79851 22.5823 7.75469 22.5117 7.79236 22.3704L11.549 11.2738C11.5866 11.1582 11.6242 11.0266 11.6617 10.8789C11.7109 10.6218 11.736 10.3606 11.7369 10.0987C11.7261 10.0213 11.7941 9.95294 11.8683 9.96378H14.8549C14.9424 9.96378 14.9924 9.9959 15.0051 10.0601L19.269 22.3897C19.3065 22.5182 19.269 22.5824 19.1563 22.5823H16.7144C16.6288 22.5921 16.547 22.5334 16.5266 22.4475L15.5686 19.5963ZM11.9059 17.1689H14.8737C14.3861 15.5027 13.8358 13.8584 13.3898 12.1793C12.9086 13.8613 12.3836 15.5365 11.9059 17.1689Z"
                fill="#FF9A00"
              />
              <path
                d="M21.8045 12.0058C21.6129 12.0137 21.4219 11.98 21.2438 11.907C21.0658 11.834 20.9048 11.7232 20.7714 11.582C20.6384 11.4346 20.535 11.2618 20.4673 11.0733C20.3996 10.8849 20.3689 10.6846 20.3769 10.4839C20.3701 10.2852 20.4042 10.0873 20.477 9.90305C20.5499 9.71881 20.6598 9.5524 20.7996 9.41468C20.938 9.27839 21.1014 9.17161 21.2804 9.10052C21.4593 9.02942 21.6502 8.99543 21.842 9.00049C22.2929 9.00049 22.6466 9.13856 22.9033 9.41468C23.0329 9.55818 23.1336 9.72648 23.1997 9.90995C23.2657 10.0934 23.2959 10.2885 23.2883 10.4839C23.2962 10.6853 23.2645 10.8864 23.1951 11.075C23.1258 11.2636 23.0201 11.436 22.8845 11.582C22.7428 11.7253 22.5736 11.8369 22.3878 11.9099C22.2019 11.9828 22.0033 12.0155 21.8045 12.0058ZM20.5084 22.3896V13.181C20.5084 13.0654 20.5583 13.0076 20.6587 13.0076H22.9691C23.0691 13.0076 23.1192 13.0654 23.1193 13.181V22.3896C23.1193 22.5182 23.0692 22.5824 22.9691 22.5823H20.6775C20.5648 22.5823 20.5084 22.5181 20.5084 22.3896Z"
                fill="#FF9A00"
              />
            </svg>
          </div>
          <div className=" px-2 flex-w-1/5 max-w-[120px]">
            <svg width="64px" height="64px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />

              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M2 12.1333C2 8.58633 2 6.81283 2.69029 5.45806C3.29749 4.26637 4.26637 3.29749 5.45806 2.69029C6.81283 2 8.58633 2 12.1333 2H19.8667C23.4137 2 25.1872 2 26.5419 2.69029C27.7336 3.29749 28.7025 4.26637 29.3097 5.45806C30 6.81283 30 8.58633 30 12.1333V19.8667C30 23.4137 30 25.1872 29.3097 26.5419C28.7025 27.7336 27.7336 28.7025 26.5419 29.3097C25.1872 30 23.4137 30 19.8667 30H12.1333C8.58633 30 6.81283 30 5.45806 29.3097C4.26637 28.7025 3.29749 27.7336 2.69029 26.5419C2 25.1872 2 23.4137 2 19.8667V12.1333Z"
                  fill="#00005B"
                />{" "}
                <path
                  d="M8 21.7957V9.20796C8 9.12233 8.0351 9.0734 8.11701 9.0734C9.32624 9.0734 10.5349 9 11.7445 9C13.7071 9 15.8323 9.68403 16.5772 11.7769C16.7527 12.2907 16.8463 12.8167 16.8463 13.3672C16.8463 14.4192 16.6123 15.2877 16.1442 15.9728C14.8368 17.8864 12.5706 17.8567 10.5392 17.8567V21.7834C10.5551 21.8997 10.4579 21.9547 10.3637 21.9547H8.14042C8.04681 21.9547 8 21.9058 8 21.7957ZM10.5509 11.4344V15.5446C11.3564 15.6048 12.1992 15.6113 12.9731 15.3489C13.8275 15.0977 14.2954 14.3439 14.2954 13.4406C14.3192 12.6709 13.9077 11.9323 13.2072 11.6546C12.4426 11.3305 11.3763 11.3111 10.5509 11.4344Z"
                  fill="#9999FF"
                />{" "}
                <path
                  d="M18.4325 12.2119H20.4861C20.5993 12.213 20.701 12.2947 20.7309 12.4089C20.8814 12.7582 20.9 13.1795 20.9005 13.5566C21.2527 13.1279 21.6773 12.7708 22.1533 12.5029C22.6638 12.201 23.2425 12.0479 23.8289 12.0598C23.9263 12.0452 24.0124 12.1353 23.9985 12.237V14.6201C23.9985 14.7122 23.9355 14.758 23.8101 14.758C22.9409 14.6953 21.5877 14.91 20.9561 15.6246V21.821C20.9561 21.9392 20.9059 21.9983 20.8054 21.9983H18.6021C18.4939 22.0145 18.3984 21.9127 18.4137 21.8013V15.0731C18.4137 14.1716 18.4324 13.2429 18.3007 12.3498C18.2804 12.2676 18.3556 12.1912 18.4325 12.2119Z"
                  fill="#9999FF"
                />{" "}
              </g>
            </svg>
          </div>
        </div>
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={textVariants} className="will-change-transform mb-6 md:mb-8">
        <h1 className="text-black text-2xl md:text-4xl font-medium tracking-tight mb-4">EXPERIENCE</h1>
        <div className="h-1 w-32 mb-4 bg-black"></div>

        <motion.div className="will-change-transform space-y-10" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={containerVariants2}>
          {RESUME_CONTENT.experience.map((exp, index) => (
            // framer motion layer
            <motion.div key={index} variants={childVariants} className="will-change-transform">
              <div className="flex flex-col md:flex-row md:justify-between">
                <div className="text-sm font-semibold md:w-1/4 mb-2 md:mb-0 p-4">{exp.year_range}</div>
                <div className="md:w-5/6 mb-10">
                  <div className="max-w-3xl backdrop-blur-3xl p-4 bg-gray-100 rounded-lg">
                    <h2 className="text-xl mb-2 font-bold ">
                      {exp.title} - <span className="mb-4 text-sm italic font-normal"> {exp.location} </span>
                    </h2>
                    <p className="text-sm italic font-semibold">{exp.role}</p>
                    <p className="mb-4 text-sm italic">{exp.subtitle}</p>
                    <ul className="list-disc list-inside space-y-2">
                      {" "}
                      {exp.description.map((desc, index) => (
                        <li key={index}>{desc}</li>
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
