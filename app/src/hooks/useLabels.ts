import { collection, getDocs } from '@firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { toast } from 'react-toastify';

export interface Label {
  id: string;
  name: string;
  index: number;
}

export const useLabels = () => {
  const [isFetchingLabels, setIsFetchingLabels] = useState<boolean>(false);

  const getLabels = async () => {
    setIsFetchingLabels(true);

    const labelsCollectionRef = collection(db, 'labels');

    try {
      const data = await getDocs(labelsCollectionRef);
      const labels = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      })) as Label[];

      labels.sort((a, b) => a.index - b.index); // sort by index
      return labels;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast.error(`💥 ${e.message}`);
      return [];
    } finally {
      setIsFetchingLabels(false);
    }
  };

  return { getLabels, isFetchingLabels };
};
