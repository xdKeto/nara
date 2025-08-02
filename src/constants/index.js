// HOME IMAGES
import showroom_image from "../assets/showroom.png";
import all_cars from "../assets/all_cars.png";
import white_char from "../assets/white_char.png";
import blue_car from "../assets/blue_car.png";
import glock from "../assets/glock.png";

// RESUME IMAGES
import resume_image from "../assets/resume_image.png";

// CONTACT IMAGES
import contact_image from "../assets/contact_image.png";

// WIP IMAGES
import wip1 from "../assets/wip1.png";
import wip2 from "../assets/wip2.png";
import wip3 from "../assets/wip3.png";

export const HOME_CONTENT = {
  name: "NARASATYA",
  role: "Junior 3d artist",
  description: "@narasatyaaa",
  link: "https://www.instagram.com/narasatyaaa",
  images: [
    {
      mainImage: showroom_image,
      title: "ALL OF THE CARS",
      description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum  ",
      madeIn: "Made in Blender",
      carousel: [wip1, wip2, wip3, wip1, wip2, wip3, wip1, wip2, wip3, wip1],
    },
    {
      mainImage: white_char,
      title: "WHITE CAR AND A BITCH",
      description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
      madeIn: "Made in Blender",
      carousel: [wip3, wip2],
    },
    {
      mainImage: all_cars,
      title: "CAR GARAGE",
      description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
      madeIn: "Made in Blender",
      carousel: [wip2, wip2],
    },
    {
      mainImage: blue_car,
      title: "NICE NISSAN",
      description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
      madeIn: "Made in Blender",
      carousel: [wip3, wip2],
    },
    {
      mainImage: glock,
      title: "Armed n Dangerous",
      description: "Police steady watchin me, every day they clockin' me Red alert, armed and dangerous, I keep that Glock on me (Boom, boom) And I ain't lookin' for no trouble, I'm just lookin' out for me (Nah)",
      madeIn: "Made in Blender",
      carousel: [wip1, wip2],
    },
  ],
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
  email: "narasatya2004@gmail.com",
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
    {
      platform: "Discord",
      link: "https://www.linkedin.com/in/narasatya-joy-236185218/",
      icon: "fa-discord",
      aria_label: "Contact me on Discord!",
    },
  ],
};

export const WIP_CONTENT = [
  {
    description: "MERAH",
    image: wip3,
  },
  {
    description: "Ferrari F80",
    image: wip2,
  },
  {
    description: "Mercedes AMG black series",
    image: wip1,
  },
];

export const FOOTER_CONTENT = `© ${new Date().getFullYear()} Narasatya Joy W. All rights reserved.`;
