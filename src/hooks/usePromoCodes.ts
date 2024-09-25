import { collection, getDocs } from '@firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { toast } from 'react-toastify';

export interface PromoCode {
  id: string;
  name: string;
  percentage: number;
}

export const usePromoCodes = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const promoCodesCollectionRef = collection(db, 'promoCodes');

  const getPromoCodes = async () => {
    setIsLoading(true);

    try {
      const data = await getDocs(promoCodesCollectionRef);
      const promoCodes = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      })) as PromoCode[];

      return promoCodes;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast.error(`💥 ${e.message}`);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const checkPromoCode = async (promoCode: string) => {
    setIsLoading(true);

    try {
      const data = await getDocs(promoCodesCollectionRef);
      const promoCodes = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      })) as PromoCode[];

      const promoCodeExists = promoCodes.some(
        (code) => code.name === promoCode
      );

      if (promoCodeExists) {
        return promoCodes.find((code) => code.name === promoCode);
      }

      return null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast.error(`💥 ${e.message}`);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { getPromoCodes, checkPromoCode, isLoading };
};
