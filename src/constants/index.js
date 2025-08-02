// HOME IMAGES
// blueprint vehicle render
import blue1 from "../assets/blueprint_vehicles/1.png";
import blue2 from "../assets/blueprint_vehicles/2.png";
import blue3 from "../assets/blueprint_vehicles/3.png";
import blue4 from "../assets/blueprint_vehicles/4.png";

// glock
import glock1 from "../assets/glock/1.png";
import glock2 from "../assets/glock/2.png";
import glock3 from "../assets/glock/3.png";
import glock4 from "../assets/glock/4.png";
import glock5 from "../assets/glock/5.png";

// low poly
import lowpoly1 from "../assets/low_poly/1.png";
import lowpoly2 from "../assets/low_poly/2.png";
import lowpoly3 from "../assets/low_poly/3.png";
import lowpoly4 from "../assets/low_poly/4.png";
import lowpoly5 from "../assets/low_poly/5.png";
import lowpoly6 from "../assets/low_poly/6.png";

// modeler images
import modeler1 from "../assets/modeler_images/1.png";
import modeler2 from "../assets/modeler_images/2.png";
import modeler3 from "../assets/modeler_images/3.png";
import modeler4 from "../assets/modeler_images/4.png";
import modeler5 from "../assets/modeler_images/5.png";
import modeler6 from "../assets/modeler_images/6.png";
import modeler7 from "../assets/modeler_images/7.png";
import modeler8 from "../assets/modeler_images/8.png";
import modeler9 from "../assets/modeler_images/9.png";

// NISSAN R34
import nissan1 from "../assets/nissan_r34/1.png";
import nissan2 from "../assets/nissan_r34/2.png";
import nissan3 from "../assets/nissan_r34/3.png";
import nissan4 from "../assets/nissan_r34/4.png";
import nissan5 from "../assets/nissan_r34/5.png";
import nissan6 from "../assets/nissan_r34/6.png";
import nissan7 from "../assets/nissan_r34/7.png";

// OG CHAR
import og1 from "../assets/og_char/1.png";
import og2 from "../assets/og_char/2.png";
import og3 from "../assets/og_char/3.png";
import og4 from "../assets/og_char/4.png";
import og5 from "../assets/og_char/5.png";
import og6 from "../assets/og_char/6.png";
import og7 from "../assets/og_char/7.png";

// RESUME IMAGES
import resume_image from "../assets/resume_image.png";

// CONTACT IMAGES
import contact_image from "../assets/contact_image.png";

// WIP IMAGES
import wip1 from "../assets/wips/1.png";
import wip2 from "../assets/wips/2.png";

export const HOME_CONTENT = {
  name: "NARASATYA",
  role: "Junior 3d artist",
  description: "@narasatyaaa",
  link: "https://www.instagram.com/narasatyaaa",
  images: [
    {
      mainImage: modeler1,
      title: "3D vehicles, using Image modeling method",
      description: "Vehicles here was created using the image modeling method, used subdiv to smooth out the model ",
      madeIn: "Made in Blender",
      carousel: [modeler2, modeler3, modeler4, modeler5, modeler6, modeler7, modeler8, modeler9],
    },

    {
      mainImage: og1,
      title: "Original character",
      description: "a low poly 3d model of a original character that I made ",
      madeIn: "Made in Blender",
      carousel: [og2, og3, og4, og5, og6, og7],
    },
    {
      mainImage: blue1,
      title: "3D vehicles, using Blueprint method",
      description: "Vehicles here was created using the blueprint method, used subdiv to smooth out the model  ",
      madeIn: "Made in Blender",
      carousel: [blue2, blue3, blue4],
    },

    {
      mainImage: nissan1,
      title: "1999 Nissan Skyline GT-R (R34)",
      description: "a close up of the 3D model , first was image calibrating using image modeller then continued the rest in blender ",
      madeIn: "Made in Blender",
      carousel: [nissan2, nissan3, nissan4, nissan5, nissan6, nissan7],
    },

    {
      mainImage: lowpoly1,
      title: "3d Lowpoly vehicles",
      description: "Simplistic version of the vehicles still maintaining the blocky forms, low poly versions of the real life cars",
      madeIn: "Made in Blender",
      carousel: [lowpoly2, lowpoly3, lowpoly4, lowpoly5, lowpoly6],
    },

    {
      mainImage: glock1,
      title: "Glock 17",
      description: "a 3d model of the gun and a small diorama",
      madeIn: "Made in Blender",
      carousel: [glock2, glock3, glock4, glock5],
    },
  ],
};

export const RESUME_CONTENT = {
  name: "NARASATYA JOY W.",
  role: "Junior 3d artist",
  city: "Surabaya, Indonesia",
  image: resume_image,
  skills: ["3D Modeling", "3D Rendering", "3D Animation", "3D Hardsurface modeller", "2D Illustratior"],
  experience: [
    {
      year_range: "Aug 2024 - Feb 2025",
      title: "Sireishi Production",
      role: "Junior Artist Internship",
      subtitle: "A indie company that makes 3d and 2d games",
      location: "Malang, Indonesia",
      description: ["3d artist for some of the games, creating 3D game assets for the background and also some low poly characters", "VFX artist for creating the skill effects for the games"],
    },
    {
      year_range: "Feb 2024 - July 2024",
      title: "Tiny Ripple",
      role: "Head of R&D, 3D environment, and 3D modeler",
      subtitle: "This is an Animation Project from the University and this animation short is for children aged 6-8 years, discussing one of the issues regarding Global Warming.",
      location: "Surabaya, Indonesia",
      description: [
        "R&D, shader style and the over all look : Researching different types of shaders and ways to make the style look like the look dev artwork",
        "3D camera artist : Placing cameras in the 3D space to make sure it fits the story board and the overall shot of the scenes",
        "3D lighting artist : Placing lighting for the 3D environment that includes setting lights for the morning, evening and also night.",
        "2D prop artist : creating small 3D objects like trash bin, toy airplane.",
        "3D modeller for, 3D floor plan, background houses and also vehicles such as a bicycle and a truck.",
        "Renderer: In charged of rendering all the 3d scenes for the short movie",
      ],
    },
    {
      year_range: "Dec 2023 - Aug 2024",
      title: "InnerVoice",
      role: "Graphic Designer",
      subtitle: "We provide a service of documentation, photography and social media content creator. Documenting events and also for small business.",
      location: "Surabaya, Indonesia",
      description: [
        "Social media content manager : Creates social media post for the social media account. Also manages the overall look of the Instagram page",
        "Photographer : Back up photographer for the team, and handles photos and also videos when other team members are unavailable.",
      ],
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
  ],
};

export const WIP_CONTENT = [
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
