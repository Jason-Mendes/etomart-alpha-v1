import { useMemo } from 'react';

export const supermarketsstorescards1 = [
{
   name: "Checkers",
   imgSrc: "/images/supermarkets/checkers.png",
   href: "/LP/Khomas/Towns/Store/Checkers",
   discount: 10,
   isEtomartStore: false,
   priceRange: "N$$",
   storetype: "Supermarket",
   pickupTime: "15–30 min",
 },
 {
   name: "Shoprite",
   imgSrc: "/images/supermarkets/shoprite.png",
   href: "/en/discovery/category/shoprite",
   discount: 5,
   isEtomartStore: false,
   priceRange: "N$",
   storetype: "Supermarket",
   pickupTime: "10–25 min",
 },
 {
   name: "Pick n Pay",
   imgSrc: "/images/supermarkets/picknpay.png",
   href: "/en/discovery/category/picknpay",
   discount: 15,
   isEtomartStore: true,
   priceRange: "N$$",
   storetype: "Supermarket",
   pickupTime: "20–35 min",
 },
 {
   name: "Spar",
   imgSrc: "/images/supermarkets/spar.png",
   href: "/en/discovery/category/spar",
   discount: 10,
   isEtomartStore: false,
   priceRange: "N$$",
   storetype: "Supermarket",
   pickupTime: "15–30 min",
 },
 {
   name: "Woermann Brock",
   imgSrc: "/images/supermarkets/woermannbrock.png",
   href: "/en/discovery/category/woermannbrock",
   discount: 5,
   isEtomartStore: false,
   priceRange: "N$",
   storetype: "Supermarket",
   pickupTime: "10–25 min",
 },
 {
   name: "OK Foods",
   imgSrc: "/images/supermarkets/okfoods.png",
   href: "/en/discovery/category/okfoods",
   discount: 10,
   isEtomartStore: false,
   priceRange: "N$$",
   storetype: "Supermarket",
   pickupTime: "15–30 min",
 },
 {
   name: "Choppies",
   imgSrc: "/images/supermarkets/choppies.png",
   href: "/en/discovery/category/choppies",
   discount: 5,
   isEtomartStore: false,
   priceRange: "N$",
   storetype: "Supermarket",
   pickupTime: "10–25 min",
 },
 {
   name: "Food Lover's Market",
   imgSrc: "/images/supermarkets/foodlovers.png",
   href: "/en/discovery/category/foodloversmarket",
   discount: 15,
   isEtomartStore: true,
   priceRange: "N$$",
   storetype: "Supermarket",
   pickupTime: "20–35 min",
 },
 {
   name: "Metro",
   imgSrc: "/images/supermarkets/metro.png",
   href: "/en/discovery/category/metro",
   discount: 10,
   isEtomartStore: false,
   priceRange: "N$$",
   storetype: "Supermarket",
   pickupTime: "15–30 min",
 },
];

const supermarkets = [
 {
   name: "Checkers",
   imgSrc: "/images/supermarkets/checkers.png",
   href: "/LP/Khomas/Towns/Store/Checkers",
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

export function useSupermarketsStoresCards1() {
  return useMemo(() => supermarketsstorescards1, []);
}

export function useSupermarkets() {
  return useMemo(() => supermarkets, []);
}

