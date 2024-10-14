import { collection, getDocs } from '@firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { toast } from 'react-toastify';

export enum FileType {
  IMAGE = 'image',
  VIDEO = 'video'
}

export interface Banner {
  id: string;
  name: string;
  fileType: FileType;
  fileUrl: string;
  redirectUrl: string;
  index: number;
}

export const useBanners = () => {
  const [isFetchingBanners, setIsFetchingBanners] = useState<boolean>(false);

  const getBanners = async () => {
    setIsFetchingBanners(true);

    const bannersCollectionRef = collection(db, 'banners');

    try {
      const data = await getDocs(bannersCollectionRef);
      const banners = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      })) as Banner[];

      banners.sort((a, b) => a.index - b.index); // sort by index
      return banners;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast.error(`💥 ${e.message}`);
      return [];
    } finally {
      setIsFetchingBanners(false);
    }
  };

  return { getBanners, isFetchingBanners };
};
