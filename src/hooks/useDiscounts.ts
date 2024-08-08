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
  const [isFetchingDiscounts, setIsFetchingDiscounts] =
    useState<boolean>(false);

  const getDiscounts = async () => {
    setIsFetchingDiscounts(true);

    const discountsCollectionRef = collection(db, 'discounts');

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
      setIsFetchingDiscounts(false);
    }
  };

  return { getDiscounts, isFetchingDiscounts };
};