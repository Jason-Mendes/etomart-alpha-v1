import { useMemo } from 'react';

const cards = [
  {
    title: "Fine Dining",
    description:
      "Experience exquisite gourmet meals from top-rated fine dining restaurants. Indulge in luxury and sophistication.",
    image: "/images/restaurants/fine-dining.webp",
  },
  {
    title: "Fast Food",
    description:
      "Get your favorite fast food delivered hot and fresh. Burgers, fries, pizza, and more, just a click away.",
    image: "/images/restaurants/fast-food.webp",
  },
  {
    title: "Cafes & Coffee Shops",
    description:
      "Enjoy a cozy cafe atmosphere with freshly brewed coffee and delicious pastries. Perfect for a relaxing break.",
    image: "/images/restaurants/cafe-coffee.webp",
  },
  {
    title: "Seafood",
    description:
      "Savor the taste of the ocean with fresh seafood dishes from top seafood restaurants. Delivered right to your door.",
    image: "/images/restaurants/seafood.webp",
  },
  // {
  //     title: "Asian Cuisine",
  //     description: "Explore the flavors of Asia with a variety of dishes from Chinese, Japanese, Thai, and more. Authentic and delicious.",
  //     image: "/images/restaurants/asian-cuisine.webp"
  // },
  //   {
  //     title: "Italian Cuisine",
  //     description: "Delight in classic Italian dishes, from pasta to pizza. Enjoy the rich and hearty flavors of Italy.",
  //     image: "/images/restaurants/italian-cuisine.webp"
  // },
  // {
  //     title: "Mexican Cuisine",
  //     description: "Spice up your meal with vibrant and flavorful Mexican cuisine. Tacos, burritos, and more, delivered fast.",
  //     image: "/images/restaurants/mexican-cuisine.webp"
  // },
  // {
  //     title: "Vegetarian & Vegan",
  //     description: "Discover delicious vegetarian and vegan options that will satisfy your cravings. Healthy and tasty.",
  //     image: "/images/restaurants/vegetarian-vegan.webp"
  // },
  // {
  //     title: "Desserts",
  //     description: "Indulge in sweet treats and desserts from local bakeries and dessert shops. Perfect for any occasion.",
  //     image: "/images/restaurants/desserts.webp"
  // },
  // {
  //     title: "Healthy Options",
  //     description: "Choose from a variety of healthy meal options that cater to your dietary needs. Fresh, nutritious, and delicious.",
  //     image: "/images/restaurants/healthy-options.webp"
  // },

  // Add more cards as needed
];

export const restaurantCards = [
  {
    name: "Vennes",
    imgSrc: "/images/restaurants/v.png",
    href: "/en/stores/vennes-cafe/",
    discount: null,
    isEtomartStore: false,
    priceRange: "€€€",
    cuisine: "Cafe",
    description: "Tasty burger with tomato cheese and onions",
    pickupTime: "10–30 min",
    deliveryTime: true,
  },
  {
    name: "Istanbul Kebab House",
    imgSrc: "/images/restaurants/i.png",
    href: "/en/stores/istanbul-kebab-house/",
    discount: null,
    isEtomartStore: false,
    priceRange: "€€€",
    cuisine: "Kebab",
    description: "Tasty burger with tomato cheese and onions",
    pickupTime: "20–40 min",
    deliveryTime: true,
  },
  {
    name: "Istanbul Kebab House",
    imgSrc: "/images/restaurants/i.png",
    href: "/en/stores/istanbul-kebab-house/",
    discount: null,
    isEtomartStore: false,
    priceRange: "€€€",
    cuisine: "potjie",
    description: "Tasty burger with tomato cheese and onions",
    pickupTime: "20–40 min",
    deliveryTime: true,
  },
  {
    name: "Teater Kvarteret Barista",
    imgSrc: "/images/restaurants/t.png",
    href: "/en/stores/teater-kvarteret-barista/",
    discount: null,
    isEtomartStore: false,
    priceRange: "€€€",
    cuisine: "Coffee",
    description: "Tasty burger with tomato cheese and onions",
    pickupTime: "15–35 min",
    deliveryTime: false,
  },
  {
    name: "Nordic Food",
    imgSrc: "/images/restaurants/n.png",
    href: "/en/stores/nordic-food/?show_wolt_plus_offer=true",
    discount: 20,
    isEtomartStore: false,
    priceRange: "€€€",
    cuisine: "Nordic",
    description: "Tasty burger with tomato cheese and onions",
    pickupTime: "20–40 min",
    deliveryTime: true,
  },
  {
    name: "Italian Cuisine",
    imgSrc: "/images/restaurants/ic.png",
    href: "/en/stores/nordic-food/?show_wolt_plus_offer=true",
    discount: 20,
    isEtomartStore: false,
    priceRange: "€€€",
    cuisine: "Italian",
    description: "Delicious pasta with tomato sauce and fresh basil",
    pickupTime: "20–40 min",
    deliveryTime: true,
  },
  {
    name: "Sushi Delight",
    imgSrc: "/images/restaurants/i.png", // Reusing image
    href: "/en/stores/sushi-delight/",
    discount: null,
    isEtomartStore: false,
    priceRange: "€€€",
    cuisine: "Sushi",
    description: "Fresh sushi rolls with wasabi and soy sauce",
    pickupTime: "25–45 min",
    deliveryTime: true,
  },
  {
    name: "Taco Fiesta",
    imgSrc: "/images/restaurants/n.png", // Reusing image
    href: "/en/stores/taco-fiesta/",
    discount: null,
    isEtomartStore: false,
    priceRange: "€€",
    cuisine: "Mexican",
    description: "Spicy tacos with beef, cheese, and guacamole",
    pickupTime: "15–30 min",
    deliveryTime: true,
  },
  {
    name: "Curry Corner",
    imgSrc: "/images/restaurants/v.png", // Reusing image
    href: "/en/stores/curry-corner/",
    discount: null,
    isEtomartStore: false,
    priceRange: "€€€",
    cuisine: "Indian",
    description: "Flavorful chicken curry with basmati rice",
    pickupTime: "20–35 min",
    deliveryTime: true,
  },
  {
    name: "Peking Duck",
    imgSrc: "/images/restaurants/t.png", // Reusing image
    href: "/en/stores/peking-duck/",
    discount: null,
    isEtomartStore: false,
    priceRange: "€€€",
    cuisine: "Chinese",
    description: "Crispy Peking duck with hoisin sauce",
    pickupTime: "30–50 min",
    deliveryTime: true,
  },
  {
    name: "BBQ Nation",
    imgSrc: "/images/restaurants/n.png", // Reusing image
    href: "/en/stores/bbq-nation/",
    discount: null,
    isEtomartStore: false,
    priceRange: "€€€",
    cuisine: "Barbecue",
    description: "Smoked ribs with a tangy barbecue sauce",
    pickupTime: "20–40 min",
    deliveryTime: true,
  }
];
const restaurants = [
  {
    name: "Joe's Beerhouse",
    imgSrc: "/images/restaurants/joesbeerhouse.png",
    href: "/LP/Khomas/Towns/Restaurant/JoesBeerhouse",
  },
  {
    name: "The Stellenbosch Wine Bar",
    imgSrc: "/images/restaurants/stellenbosch.png",
    href: "/en/discovery/category/stellenbosch",
  },
  {
    name: "O Portuga",
    imgSrc: "/images/restaurants/oportuga.png",
    href: "/en/discovery/category/oportuga",
  },
  {
    name: "The Social",
    imgSrc: "/images/restaurants/thesocial.png",
    href: "/en/discovery/category/thesocial",
  },
  {
    name: "Sardinia Blue Olive",
    imgSrc: "/images/restaurants/sardiniablueolive.png",
    href: "/en/discovery/category/sardiniablueolive",
  },
  {
    name: "Slowtown Coffee Roasters",
    imgSrc: "/images/restaurants/slowtown.png",
    href: "/en/discovery/category/slowtown",
  },
];

export function useCards() {
  return useMemo(() => cards, []);
}

export function useRestaurantCards() {
  return useMemo(() => restaurantCards, []);
}
export function useRestaurants() {
  return useMemo(() => restaurants, []);
}

