import { useMemo } from 'react';

export const pharmaciesstorescards1 = [
  {
   name: "Dis-Chem",
   imgSrc: "/images/pharmacies/dischem.png",
   href: "/en/discovery/category/dischem",
   discount: 5,
   isEtomartStore: false,
   priceRange: "N$$",
   storetype: "Pharmacy",
   pickupTime: "10–20 min",
 },
 {
   name: "Clicks Pharmacy",
   imgSrc: "/images/pharmacies/clicks.png",
   href: "/LP/Khomas/Towns/Pharmacy/Clicks",
   discount: 5,
   isEtomartStore: false,
   priceRange: "N$$",
   storetype: "Pharmacy",
   pickupTime: "10–20 min",
 },
 {
   name: "Nampharm Pharmacy",
   imgSrc: "/images/pharmacies/nampharm.png",
   href: "/en/discovery/category/nampharm",
   discount: 5,
   isEtomartStore: false,
   priceRange: "N$$",
   storetype: "Pharmacy",
   pickupTime: "10–20 min",
 },
 {
   name: "Alpha Pharm",
   imgSrc: "/images/pharmacies/alphapharm.png",
   href: "/en/discovery/category/alphapharm",
   discount: 5,
   isEtomartStore: false,
   priceRange: "N$$",
   storetype: "Pharmacy",
   pickupTime: "10–20 min",
 },
 {
   name: "Medicine World",
   imgSrc: "/images/pharmacies/medicineworld.png",
   href: "/en/discovery/category/medicineworld",
   discount: 5,
   isEtomartStore: false,
   priceRange: "N$$",
   storetype: "Pharmacy",
   pickupTime: "10–20 min",
 },
 {
   name: "City Pharmacy",
   imgSrc: "/images/pharmacies/citypharmacy.png",
   href: "/en/discovery/category/citypharmacy",
   discount: 5,
   isEtomartStore: false,
   priceRange: "N$$",
   storetype: "Pharmacy",
   pickupTime: "10–20 min",
 },
];

const pharmacies = [
  {
  name: "Dis-Chem",
  imgSrc: "/images/pharmacies/dischem.png",
  href: "/en/discovery/category/dischem",
},
{
  name: "Clicks Pharmacy",
  imgSrc: "/images/pharmacies/clicks.png",
  href: "/LP/Khomas/Towns/Pharmacy/Clicks",
},
{
  name: "Nampharm Pharmacy",
  imgSrc: "/images/pharmacies/nampharm.png",
  href: "/en/discovery/category/nampharm",
},
{
  name: "Alpha Pharm",
  imgSrc: "/images/pharmacies/alphapharm.png",
  href: "/en/discovery/category/alphapharm",
},
{
  name: "Medicine World",
  imgSrc: "/images/pharmacies/medicineworld.png",
  href: "/en/discovery/category/medicineworld",
},
{
  name: "City Pharmacy",
  imgSrc: "/images/pharmacies/citypharmacy.png",
  href: "/en/discovery/category/citypharmacy",
},
];

export function usePharmaciesStoresCards1() {
  return useMemo(() => pharmaciesstorescards1, []);
}

export function usePharmacies() {
  return useMemo(() => pharmacies, []);
}

