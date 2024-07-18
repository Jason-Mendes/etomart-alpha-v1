import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase";

export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
