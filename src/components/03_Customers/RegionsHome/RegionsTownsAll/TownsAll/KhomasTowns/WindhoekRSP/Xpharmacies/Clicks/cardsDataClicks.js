import { useMemo } from 'react';

const navcategories = [
  {
    name: "Prescription Medications",
    imgSrc: "/images/pharmacies/pm.png",
    href: "/pharmacy/prescription-medications",
  },
  {
    name: "Over-the-Counter Medications",
    imgSrc: "/images/pharmacies/ocm.png",
    href: "/pharmacy/over-the-counter-medications",
  },
  {
    name: "Vitamins & Supplements",
    imgSrc: "/images/pharmacies/vs.png",
    href: "/pharmacy/vitamins-supplements",
  },
  {
    name: "Personal Care",
    imgSrc: "/images/pharmacies/pc.png",
    href: "/pharmacy/personal-care",
  },
  {
    name: "Health & Wellness",
    imgSrc: "/images/pharmacies/hw.png",
    href: "/pharmacy/health-wellness",
  },
  {
    name: "Baby & Child Care",
    imgSrc: "/images/pharmacies/bcc.png",
    href: "/pharmacy/baby-child-care",
  },
  {
    name: "Medical Equipment",
    imgSrc: "/images/pharmacies/me.png",
    href: "/pharmacy/medical-equipment",
  },
  {
    name: "First Aid",
    imgSrc: "/images/pharmacies/fa.png",
    href: "/pharmacy/first-aid",
  },
  {
    name: "Skincare",
    imgSrc: "/images/pharmacies/sc.png",
    href: "/pharmacy/skincare",
  },
  {
    name: "Oral Care",
    imgSrc: "/images/pharmacies/oc.png",
    href: "/pharmacy/oral-care",
  },
  {
    name: "Hair Care",
    imgSrc: "/images/pharmacies/hc.png",
    href: "/pharmacy/hair-care",
  },
  {
    name: "Foot Care",
    imgSrc: "/images/pharmacies/fc.png",
    href: "/pharmacy/foot-care",
  },
  {
    name: "Allergy Relief",
    imgSrc: "/images/pharmacies/as.png",
    href: "/pharmacy/allergy-relief",
  },
  {
    name: "Pain Relief",
    imgSrc: "/images/pharmacies/pr.png",
    href: "/pharmacy/pain-relief",
  },
  {
    name: "Digestive Health",
    imgSrc: "/images/pharmacies/dh.png",
    href: "/pharmacy/digestive-health",
  },
  {
    name: "Cold & Flu",
    imgSrc: "/images/pharmacies/cf.png",
    href: "/pharmacy/cold-flu",
  },
  {
    name: "Diabetes Care",
    imgSrc: "/images/pharmacies/dc.png",
    href: "/pharmacy/diabetes-care",
  },
  {
    name: "Women's Health",
    imgSrc: "/images/pharmacies/wh.png",
    href: "/pharmacy/womens-health",
  },
  {
    name: "Men's Health",
    imgSrc: "/images/pharmacies/mh.png",
    href: "/pharmacy/mens-health",
  },
  {
    name: "Anti-inflammatory",
    imgSrc: "/images/pharmacies/anti-inflammatory.png",
    href: "/pharmacy/anti-inflammatory",
  },
  {
    name: "Cough Relief",
    imgSrc: "/images/pharmacies/cough-relief.png",
    href: "/pharmacy/cough-relief",
  },
  {
    name: "Eye Care",
    imgSrc: "/images/pharmacies/placeholder.png", // Placeholder image
    href: "/pharmacy/eye-care",
  },
  {
    name: "Sleep Aids",
    imgSrc: "/images/pharmacies/placeholder.png", // Placeholder image
    href: "/pharmacy/sleep-aids",
  },
  {
    name: "Weight Management",
    imgSrc: "/images/pharmacies/placeholder.png", // Placeholder image
    href: "/pharmacy/weight-management",
  },
  {
    name: "Smoking Cessation",
    imgSrc: "/images/pharmacies/placeholder.png", // Placeholder image
    href: "/pharmacy/smoking-cessation",
  },
  // Add more categories as needed
];

const cards = [
  {
    title: "Aspirin",
    description:
      "Effective pain reliever for headaches, muscle pain, and minor arthritis. Trusted relief you can count on.",
    image: "/images/pharmacies/alphapharm.png",
  },
  {
    title: "Ibuprofen",
    description:
      "Powerful anti-inflammatory medication for reducing pain and swelling. Ideal for back pain, toothaches, and menstrual cramps.",
    image: "/images/pharmacies/Ibuprofen.png",
  },
  {
    title: "Acetaminophen",
    description:
      "Safe and effective pain reliever and fever reducer. Perfect for all ages and common ailments.",
    image: "/images/pharmacies/Acetaminophen.png",
  },
  {
    title: "Antihistamines",
    description:
      "Relieve allergy symptoms such as runny nose, sneezing, and itchy eyes. Fast-acting and long-lasting.",
    image: "/images/pharmacies/Antihistamines.png",
  },
  {
    title: "Cough Syrup",
    description:
      "Soothe your throat and ease your cough with our effective cough syrups. Available for both adults and children.",
    image: "/images/pharmacies/CoughSyrup.png",
  },
  // Add more cards as needed
];

export const pharmacycards = [
  {
    name: "Aspirin",
    imgSrc: "/images/pharmacies/a.png",
    href: "/en/stores/aspirin/",
    discount: null,
    isEtomartStore: false,
    priceRange: "€",
    type: "Pain Relief",
    description:
      "Effective pain reliever for headaches, muscle pain, and minor arthritis. Trusted relief you can count on.",
    pickupTime: "10–30 min",
    deliveryTime: true,
  },
  {
    name: "Ibuprofen",
    imgSrc: "/images/pharmacies/Ibuprofen.png",
    href: "/en/stores/ibuprofen/",
    discount: null,
    isEtomartStore: false,
    priceRange: "€",
    type: "Anti-inflammatory",
    description:
      "Powerful anti-inflammatory medication for reducing pain and swelling. Ideal for back pain, toothaches, and menstrual cramps.",
    pickupTime: "20–40 min",
    deliveryTime: true,
  },
  {
    name: "Acetaminophen",
    imgSrc: "/images/pharmacies/Acetaminophen.png",
    href: "/en/stores/acetaminophen/",
    discount: null,
    isEtomartStore: false,
    priceRange: "€",
    type: "Pain Relief",
    description:
      "Safe and effective pain reliever and fever reducer. Perfect for all ages and common ailments.",
    pickupTime: "15–35 min",
    deliveryTime: false,
  },
  {
    name: "Antihistamines",
    imgSrc: "/images/pharmacies/Antihistamines.png",
    href: "/en/stores/antihistamines/",
    discount: 20,
    isEtomartStore: false,
    priceRange: "€",
    type: "Allergy Relief",
    description:
      "Relieve allergy symptoms such as runny nose, sneezing, and itchy eyes. Fast-acting and long-lasting.",
    pickupTime: "20–40 min",
    deliveryTime: true,
  },
  {
    name: "Cough Syrup",
    imgSrc: "/images/pharmacies/CoughSyrup.png",
    href: "/en/stores/cough-syrup/",
    discount: null,
    isEtomartStore: false,
    priceRange: "€",
    type: "Cough Relief",
    description:
      "Soothe your throat and ease your cough with our effective cough syrups. Available for both adults and children.",
    pickupTime: "10–30 min",
    deliveryTime: true,
  },
  // Add more cards as needed
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

export function useNavcategories() {
  return useMemo(() => navcategories, []);
}

export function useCards() {
  return useMemo(() => cards, []);
}
export function usePharmacycards() {
  return useMemo(() => pharmacycards, []);
}

export function usePharmacies() {
  return useMemo(() => pharmacies, []);
}

