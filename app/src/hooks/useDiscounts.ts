import { collection, getDocs } from '@firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { toast } from 'react-toastify';

export enum DiscountType {
  GLOBAL = 'global',
  STANDARD = 'standard'
}

export interface Discount {
  id: string;
  name: string;
  type: DiscountType;
  percentage: number;
  labelIds: string[];
  active: boolean;
}

export const useDiscounts = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const discountsCollectionRef = collection(db, 'discounts');

  const getDiscounts = async () => {
    setIsLoading(true);

    try {
      const data = await getDocs(discountsCollectionRef);
      const discounts = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      })) as Discount[];

      return discounts;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast.error(`💥 ${e.message}`);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getActiveDiscounts = async () => {
    setIsLoading(true);

    try {
      const data = await getDocs(discountsCollectionRef);
      const activeDiscounts: Discount[] = [];
      data.docs.forEach((doc) => {
        if (doc.data().active) {
          activeDiscounts.push({ ...doc.data(), id: doc.id } as Discount);
        }
      });

      return activeDiscounts;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast.error(`💥 ${e.message}`);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return { getDiscounts, getActiveDiscounts, isLoading };
};
