// HOME IMAGES

// RESUME IMAGES
import resume_image from "../assets/resume_image.png";

// CONTACT IMAGES
import contact_image from "../assets/contact_image.png";

// WIP IMAGES

export const HOME_CONTENT = {
  name: "NARASTYA",
  role: "Junior 3d artist",
  description: "@narasatyaaa",
  wideImage: [],
  squareImage: [],
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
    description: "Ferrari",
    photo: "",
  },
];

export const FOOTER_CONTENT = `© ${new Date().getFullYear()} Narasatya Joy W. All rights reserved.`;
