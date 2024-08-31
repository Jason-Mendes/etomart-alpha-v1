import { useMemo } from 'react';

export const restaurantsstorescards1 = [
  {
name: "The Stellenbosch Wine Bar",
imgSrc: "/images/restaurants/stellenbosch.png",
href: "/en/discovery/category/stellenbosch",
discount: 15,
isEtomartStore: true,
priceRange: "N$$",
cuisine: "Wine Bar",
pickupTime: "25–45 min",
},
{
name: "O Portuga",
imgSrc: "/images/restaurants/oportuga.png",
href: "/en/discovery/category/oportuga",
storetype: "Restaurant",
isEtomartStore: false,
priceRange: "N$$$",
cuisine: "Portuguese",
pickupTime: "20–40 min",
},
{
name: "The Social",
imgSrc: "/images/restaurants/thesocial.png",
href: "/en/discovery/category/thesocial",
storetype: "Restaurant",
isEtomartStore: true,
priceRange: "N$$$",
cuisine: "Bar & Grill",
pickupTime: "20–40 min",
},
{
  name: "Joe's Beerhouse",
  imgSrc: "/images/restaurants/joesbeerhouse.png",
  href: "/LP/Khomas/Towns/Restaurant/JoesBeerhouse",
  discount: 15,
  isEtomartStore: true,
  priceRange: "N$$",
  cuisine: "Bar & Grill",
  pickupTime: "25–45 min",
},
{
name: "Sardinia Blue Olive",
imgSrc: "/images/restaurants/sardiniablueolive.png",
href: "/en/discovery/category/sardiniablueolive",
storetype: "Restaurant",
isEtomartStore: false,
priceRange: "N$$$",
cuisine: "Mediterranean",
pickupTime: "20–40 min",
},
{
name: "Slowtown Coffee Roasters",
imgSrc: "/images/restaurants/slowtown.png",
href: "/en/discovery/category/slowtown",
storetype: "Café",
isEtomartStore: false,
priceRange: "N$$",
cuisine: "Coffee",
pickupTime: "10–20 min",
},
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

export function useRestaurantsStoresCards1() {
  return useMemo(() => restaurantsstorescards1, []);
}

export function useRestaurants() {
  return useMemo(() => restaurants, []);
}

