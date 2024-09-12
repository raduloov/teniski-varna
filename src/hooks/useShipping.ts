import { doc, getDoc } from '@firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { toast } from 'react-toastify';

export interface ShippingData {
  shippingCost: number;
  minimumAmount: number;
}

const defaultShippingData: ShippingData = {
  shippingCost: 0,
  minimumAmount: 0
};

export const useShipping = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getShipping = async () => {
    setIsLoading(true);

    try {
      const shippingRef = doc(db, 'shipping', '1');
      const shipping = await getDoc(shippingRef);

      if (shipping.exists()) {
        return {
          shippingCost: shipping.data().shippingCost,
          minimumAmount: shipping.data().minimumAmount
        } as ShippingData;
      }

      return defaultShippingData;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast.error(`💥 ${e.message}`);
      return defaultShippingData;
    } finally {
      setIsLoading(false);
    }
  };

  return { getShipping, isLoading };
};
