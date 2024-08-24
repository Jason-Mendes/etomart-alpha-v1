import { useMemo } from 'react';
import { pharmaciesstorescards1 } from '../../RegionsTownsAll/TownsAll/KhomasTowns/WindhoekRSP/CardsDataWindhoekRSP/cardsDataPharmacies';
import { restaurantsstorescards1 } from '../../RegionsTownsAll/TownsAll/KhomasTowns/WindhoekRSP/CardsDataWindhoekRSP/cardsDataRestaurants';
import { supermarketsstorescards1 } from '../../RegionsTownsAll/TownsAll/KhomasTowns/WindhoekRSP/CardsDataWindhoekRSP/cardsDataStores';
import { pharmacycards } from '../../RegionsTownsAll/TownsAll/KhomasTowns/WindhoekRSP/Xpharmacies/Clicks/cardsDataClicks';
import { restaurantCards } from '../../RegionsTownsAll/TownsAll/KhomasTowns/WindhoekRSP/Xrestaurants/JoesBeerHouse/cardsDataJoesBeerhouse';
import { storecards } from '../../RegionsTownsAll/TownsAll/KhomasTowns/WindhoekRSP/Xstores/Checkers/cardsDataCheckers';

const storesCards = [...supermarketsstorescards1, ...restaurantsstorescards1, ...pharmaciesstorescards1].map(card => ({
    ...card,
    storetype: card.storetype || card.cuisine || 'General'
  }));
  
const restaurantsCards = [...restaurantCards];

const productsCards = [...pharmacycards, ...storecards];
  
  export function useStoresCards() {
    return useMemo(() => storesCards, []);
  }
  
  export function useRestaurantsCards() {
    return useMemo(() => restaurantsCards, []);
  }
  
  export function useProductsCards() {
    return useMemo(() => productsCards, []);
  }
