// landingPageData.js
import { useMemo } from 'react';

export const useRegionsData = () => useMemo(() => [
  {
    code: "ALB",
    name: "Khomas",
    flagPath: "/images/regions/khomas2.jpeg",
    path: "/LP/Region/Khomas",
    latitude: -22.57,
    longitude: 17.08,
  },
  {
    code: "HRV",
    name: "Erongo",
    flagPath: "/images/regions/erongo.jpeg",
    path: "/LP/Region/Erongo",
    latitude: -22.55,
    longitude: 14.28,
  },
  {
    code: "CYP",
    name: "Oshana",
    flagPath: "/images/regions/oshana.jpeg",
    path: "/LP/Region/Oshana",
    latitude: -18.46,
    longitude: 15.64,
  },
  {
    code: "ALB",
    name: "Omusati",
    flagPath: "/images/regions/omusati.jpeg",
    path: "/LP/Region/Omusati",
    latitude: -18.13,
    longitude: 15.37,
  },
  {
    code: "HRV",
    name: "Karas",
    flagPath: "/images/regions/kharas2.jpeg",
    path: "/LP/Region/Karas",
    latitude: -27.38,
    longitude: 17.92,
  },
  {
    code: "CYP",
    name: "Ohangwena",
    flagPath: "/images/regions/ohangwena.jpeg",
    path: "/LP/Region/Ohangwena",
    latitude: -17.6,
    longitude: 16.06,
  },
  {
    code: "ALB",
    name: "Zambezi",
    flagPath: "/images/regions/zambezi.jpeg",
    path: "/LP/Region/Zambezi",
    latitude: -17.5,
    longitude: 24.27,
  },
  {
    code: "HRV",
    name: "Oshikoto",
    flagPath: "/images/regions/oshikoto.jpeg",
    path: "/LP/Region/Oshikoto",
    latitude: -18.81,
    longitude: 16.92,
  },
  {
    code: "CYP",
    name: "Omaheke",
    flagPath: "/images/regions/omaheke.jpeg",
    path: "/LP/Region/Omaheke",
    latitude: -21.76,
    longitude: 19.59,
  },
  {
    code: "ALB",
    name: "Hardap",
    flagPath: "/images/regions/hardap.jpeg",
    path: "/LP/Region/Hardap",
    latitude: -24.43,
    longitude: 18.29,
  },
  {
    code: "HRV",
    name: "Otjozondjupa",
    flagPath: "/images/regions/otjozondjupa.jpeg",
    path: "/LP/Region/Otjozondjupa",
    latitude: -20.45,
    longitude: 17.23,
  },
  {
    code: "CYP",
    name: "Kunene",
    flagPath: "/images/regions/kunene2.jpeg",
    path: "/LP/Region/Kunene",
    latitude: -19.58,
    longitude: 13.41,
  },
  {
    code: "ALB",
    name: "Kavango East",
    flagPath: "/images/regions/kavango_east.jpeg",
    path: "/LP/Region/KavangoEast",
    latitude: -18.03,
    longitude: 20.78,
  },
  {
    code: "HRV",
    name: "Kavango West",
    flagPath: "/images/regions/kavango_west.jpeg",
    path: "/LP/Region/KavangoWest",
    latitude: -18.12,
    longitude: 19.79,
  },
], []);

export const useTestimonials = () => useMemo(() => [
  {
    imageSrc: "/images/img_ellipse1.png",
    textBelowImage: "Lorem ipsum dolor sit amet consectetur.",
    numStars: 1,
    testimonialAuthor: "John Doe",
  },
  {
    imageSrc: "/images/img_ellipse1.png",
    textBelowImage:
      "Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.",
    numStars: 5,
    testimonialAuthor: "John Doe",
  },
  {
    imageSrc: "/images/img_ellipse1.png",
    textBelowImage:
      "Dolor at fringilla quam. Dolor turpis molestie dui magnis facilisis at fringil at fringilla quam. Dolor turpis molestie dui magnis facilisis at fringil Dolor at fringilla quam. Dolor turpis molestie dui magnis facilisis at fringil at fringilla quam. Dolor turpis molestie dui magnis facilisis at fringil",
    numStars: 3,
    testimonialAuthor: "John Doe",
  },
  {
    imageSrc: "/images/img_ellipse1.png",
    textBelowImage:
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTtttttttteststssyvhgvehevfjhvf ejhfvehvdjhssb dfvhsvdhjvdws b j",
    numStars: 3,
    testimonialAuthor: "John Doe",
  },
], []);