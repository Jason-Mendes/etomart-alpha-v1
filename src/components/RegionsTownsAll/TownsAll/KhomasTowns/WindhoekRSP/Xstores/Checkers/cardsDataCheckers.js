import { useMemo } from 'react';

const navcategories = [
  {
    name: "Fruits & Vegetables",
    imgSrc: "/images/1.webp",
    href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-0",
  },
  {
    name: "Dairy & Eggs",
    imgSrc: "/images/2.webp",
    href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-1",
  },
  {
    name: "Meat & Seafood",
    imgSrc: "/images/meat.png",
    href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-0",
  },
  {
    name: "Bakery",
    imgSrc: "/images/bread.png",
    href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-1",
  },
  {
    name: "Frozen Foods",
    imgSrc: "/images/frozen.png",
    href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-0",
  },
  {
    name: "Snacks & Sweets",
    imgSrc: "/images/sweets.png",
    href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-1",
  },
  {
    name: "Beverages",
    imgSrc: "/images/beverages.png",
    href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-0",
  },
  {
    name: "Pantry Staples",
    imgSrc: "/images/pantry.png",
    href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-1",
  },
  {
    name: "Household Supplies",
    imgSrc: "/images/hh.png",
    href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-0",
  },
  {
    name: "Personal Care",
    imgSrc: "/images/pc.png",
    href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-1",
  },
  {
    name: "Health & Wellness",
    imgSrc: "/images/hw.png",
    href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-0",
  },
  {
    name: "Pet Supplies",
    imgSrc: "/images/ps.png",
    href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-1",
  },
  {
    name: "Baby Products",
    imgSrc: "/images/bp.png",
    href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-0",
  },
  {
    name: "Cleaning Supplies",
    imgSrc: "/images/CS.PNG",
    href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-1",
  },
  {
    name: "Paper Goods",
    imgSrc: "/images/pg.png",
    href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-0",
  },
  {
    name: "International Foods",
    imgSrc: "/images/if.png",
    href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-1",
  },
  {
    name: "Organic & Natural",
    imgSrc: "/images/on.png",
    href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-0",
  },
  {
    name: "Alcohol & Wine",
    imgSrc: "/images/aw.png",
    href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-1",
  },
  {
    name: "Baking Supplies",
    imgSrc: "/images/bs.png",
    href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-0",
  },
  {
    name: "Canned & Jarred Goods",
    imgSrc: "/images/cjg.png",
    href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-1",
  },
];
  
const cards = [
  {
    title: "Fresh Produce",
    description:
      "Get farm-fresh fruits and vegetables delivered to your doorstep. Quality you can trust, convenience you will love.",
    image: "/images/1.webp",
  },
  {
    title: "Dairy Products",
    description:
      "Order fresh milk, cheese, yogurt, and more. Fast delivery and reliable service at your fingertips.",
    image: "/images/2.webp",
  },
  {
    title: "Bakery Goods",
    description:
      "Craving fresh bread and pastries? Get delicious bakery items delivered from local bakers. Quick and easy.",
    image: "/images/3.webp",
  },
  {
    title: "Pantry Staples",
    description:
      "Stock up on pantry essentials with our fast and convenient delivery service. Everything you need in one place.",
    image:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
  },
  {
    title: "Beverages",
    description:
      "Shop a wide range of beverages, from juices to sodas. Refresh your day with our top selections.",
    image: "/images/4.webp",
  },
  // Add more cards as needed
];

export const storecards = [
  {
    name: "Bread",
    imgSrc: "/images/supermarkets/bread.png",
    href: "/en/stores/bread/",
    discount: null,
    isEtomartStore: false,
    priceRange: "€",
    cuisine: "Bakery",
    description: "Freshly baked bread loaf",
    pickupTime: "10–30 min",
    deliveryTime: true,
  },
  {
    name: "Milk",
    imgSrc: "/images/supermarkets/milk.png",
    href: "/en/stores/milk/",
    discount: null,
    isEtomartStore: false,
    priceRange: "€",
    cuisine: "Dairy",
    description: "1 liter of whole milk",
    pickupTime: "20–40 min",
    deliveryTime: true,
  },
  {
    name: "Eggs",
    imgSrc: "/images/supermarkets/eggs.png",
    href: "/en/stores/eggs/",
    discount: null,
    isEtomartStore: false,
    priceRange: "€",
    cuisine: "Dairy",
    description: "A dozen large eggs",
    pickupTime: "15–35 min",
    deliveryTime: false,
  },
  {
    name: "Chicken Breast",
    imgSrc: "/images/supermarkets/chicken-breast.png",
    href: "/en/stores/chicken-breast/",
    discount: 20,
    isEtomartStore: false,
    priceRange: "€€",
    cuisine: "Meat",
    description: "1 kg of fresh chicken breast",
    pickupTime: "20–40 min",
    deliveryTime: true,
  },
  {
    name: "Apples",
    imgSrc: "/images/supermarkets/apples.png",
    href: "/en/stores/apples/",
    discount: 10,
    isEtomartStore: false,
    priceRange: "€",
    cuisine: "Produce",
    description: "A bag of fresh apples",
    pickupTime: "10–30 min",
    deliveryTime: true,
  },
  {
    name: "Butter",
    imgSrc: "/images/supermarkets/butter.png",
    href: "/en/stores/butter/",
    discount: null,
    isEtomartStore: false,
    priceRange: "€",
    cuisine: "Dairy",
    description: "250g of unsalted butter",
    pickupTime: "15–35 min",
    deliveryTime: true,
  },
  {
    name: "Orange Juice",
    imgSrc: "/images/supermarkets/orange-juice.png",
    href: "/en/stores/orange-juice/",
    discount: null,
    isEtomartStore: false,
    priceRange: "€",
    cuisine: "Beverages",
    description: "1 liter of fresh orange juice",
    pickupTime: "10–30 min",
    deliveryTime: true,
  },
  {
    name: "Cereal",
    imgSrc: "/images/supermarkets/cereal.png",
    href: "/en/stores/cereal/",
    discount: null,
    isEtomartStore: false,
    priceRange: "€",
    cuisine: "Grocery",
    description: "500g box of breakfast cereal",
    pickupTime: "10–30 min",
    deliveryTime: true,
  },
  {
    name: "Rice",
    imgSrc: "/images/supermarkets/rice.png",
    href: "/en/stores/rice/",
    discount: null,
    isEtomartStore: false,
    priceRange: "€",
    cuisine: "Grocery",
    description: "1 kg of long grain rice",
    pickupTime: "15–35 min",
    deliveryTime: true,
  },
  {
    name: "Tomatoes",
    imgSrc: "/images/supermarkets/tomatoes.png",
    href: "/en/stores/tomatoes/",
    discount: null,
    isEtomartStore: false,
    priceRange: "€",
    cuisine: "Produce",
    description: "A bag of fresh tomatoes",
    pickupTime: "10–30 min",
    deliveryTime: true,
  },
  {
    name: "Pasta",
    imgSrc: "/images/supermarkets/pasta.png",
    href: "/en/stores/pasta/",
    discount: null,
    isEtomartStore: false,
    priceRange: "€",
    cuisine: "Grocery",
    description: "500g pack of spaghetti",
    pickupTime: "15–35 min",
    deliveryTime: true,
  },
  {
    name: "Cheese",
    imgSrc: "/images/supermarkets/cheese.png",
    href: "/en/stores/cheese/",
    discount: null,
    isEtomartStore: false,
    priceRange: "€€",
    cuisine: "Dairy",
    description: "200g of cheddar cheese",
    pickupTime: "10–30 min",
    deliveryTime: true,
  },
  {
    name: "Bananas",
    imgSrc: "/images/supermarkets/bananas.png",
    href: "/en/stores/bananas/",
    discount: null,
    isEtomartStore: false,
    priceRange: "€",
    cuisine: "Produce",
    description: "A bunch of ripe bananas",
    pickupTime: "10–30 min",
    deliveryTime: true,
  },
  {
    name: "Yogurt",
    imgSrc: "/images/supermarkets/yogurt.png",
    href: "/en/stores/yogurt/",
    discount: null,
    isEtomartStore: false,
    priceRange: "€",
    cuisine: "Dairy",
    description: "500g tub of plain yogurt",
    pickupTime: "10–30 min",
    deliveryTime: true,
  },
  {
    name: "Potatoes",
    imgSrc: "/images/supermarkets/potatoes.png",
    href: "/en/stores/potatoes/",
    discount: null,
    isEtomartStore: false,
    priceRange: "€",
    cuisine: "Produce",
    description: "A bag of fresh potatoes",
    pickupTime: "10–30 min",
    deliveryTime: true,
  },
];
  
const supermarkets = [
  {
    name: "Checkers",
    imgSrc: "/images/supermarkets/checkers.png",
    href: "/en/discovery/category/checkers",
  },
  {
    name: "Shoprite",
    imgSrc: "/images/supermarkets/shoprite.png",
    href: "/en/discovery/category/shoprite",
  },
  {
    name: "Pick n Pay",
    imgSrc: "/images/supermarkets/picknpay.png",
    href: "/en/discovery/category/picknpay",
  },
  {
    name: "Spar",
    imgSrc: "/images/supermarkets/spar.png",
    href: "/en/discovery/category/spar",
  },
  {
    name: "Woermann Brock",
    imgSrc: "/images/supermarkets/woermannbrock.png",
    href: "/en/discovery/category/woermannbrock",
  },
  {
    name: "OK Foods",
    imgSrc: "/images/supermarkets/okfoods.png",
    href: "/en/discovery/category/okfoods",
  },
  {
    name: "Choppies",
    imgSrc: "/images/supermarkets/choppies.png",
    href: "/en/discovery/category/choppies",
  },
  {
    name: "Food Lover's Market",
    imgSrc: "/images/supermarkets/foodlovers.png",
    href: "/en/discovery/category/foodloversmarket",
  },
  {
    name: "Metro",
    imgSrc: "/images/supermarkets/metro.png",
    href: "/en/discovery/category/metro",
  },
];

export function useNavcategories() {
  return useMemo(() => navcategories, []);
}

export function useCards() {
  return useMemo(() => cards, []);
}
export function useStoresCards() {
  return useMemo(() => storecards, []);
}

export function useSupermarkets() {
  return useMemo(() => supermarkets, []);
}

