// HOME IMAGES
import wide_image1 from "../assets/wide_image1.png";
import wide_image2 from "../assets/wide_image2.png";
import wide_image3 from "../assets/wide_image3.png";
import small_image2 from "../assets/small_image2.png";

// RESUME IMAGES
import resume_image from "../assets/resume_image.png";

// CONTACT IMAGES
import contact_image from "../assets/contact_image.png";

// WIP IMAGES
import wip1 from "../assets/wip1.png";
import wip2 from "../assets/wip2.png";

export const HOME_CONTENT = {
  name: "NARASATYA",
  role: "Junior 3d artist",
  description: "@narasatyaaa",
  link: "https://www.instagram.com/narasatyaaa",
  wideImage: [wide_image1, wide_image2, wide_image3],
  squareImage: [small_image2],
};

export const RESUME_CONTENT = {
  name: "NARASATYA JOY W.",
  role: "Junior 3d artist",
  city: "Surabaya, Indonesia",
  image: resume_image,
  skills: ["3D Modeling", "3D Rendering", "3D Animation", "3D Animation", "Yapping", "Turu", "BedMaxxing", "IGReelsMaxxing", "JobMaxxing"],
  experience: [
    {
      year_range: "Aug 2024 - Feb 2025",
      title: "Junior Artist at Sireishi Production",
      location: "Malang, Indonesia",
      description: ["turu", "turu", "turu", "turu"],
    },
  ],
};

export const CONTACT_CONTENT = {
  headline: "CONTACT ME",
  email: "narasatyajoy2004@gmail.com",
  image: contact_image,
  social_links: [
    {
      platform: "Instagram",
      link: "https://www.instagram.com/narasatyaaa",
      icon: "fa-instagram",
      aria_label: "Contact me on Insta!",
    },
    {
      platform: "Twitter",
      link: "https://x.com/Aranjnara04",
      icon: "fa-x-twitter",
      aria_label: "Contact me on Twitter!",
    },
    {
      platform: "LinkedIn",
      link: "https://www.linkedin.com/in/narasatya-joy-236185218/",
      icon: "fa-linkedin",
      aria_label: "Contact me on LinkedIn!",
    },
  ],
};

export const WIP_CONTENT = [
  {
    title: "WIP 1",
    description: "Mercedes AMG black series",
    image: wip1,
  },
  {
    title: "WIP 2",
    description: "Ferrari F80",
    image: wip2,
  },
];

export const FOOTER_CONTENT = `© ${new Date().getFullYear()} Narasatya Joy W. All rights reserved.`;
