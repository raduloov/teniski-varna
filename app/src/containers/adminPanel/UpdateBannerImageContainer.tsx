import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Color } from '../../assets/constants';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import {
  addDoc,
  setDoc,
  collection,
  deleteDoc,
  doc
} from '@firebase/firestore';
import { db, storage } from '../../firebase/firebaseConfig';
import { ImageInput } from '../../components/common/ImageInput';
import { supportedImageTypes, supportedVideoTypes } from './utils';
import { Banner, FileType, useBanners } from '../../hooks/useBanners';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuid4 } from 'uuid';
import { EdittableAndSelectableItems } from '../../components/common/EdittableAndSelectableItems';

export const UpdateBannerImageContainer = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [file, setFile] = useState<File>();
  const [bannerLink, setBannerLink] = useState<string>('');
  const [newBannerIndex, setNewBannerIndex] = useState<number>(0);
  const [bannerIdToEdit, setBannerIdToEdit] = useState<string | null>(null);
  const [isDeletingBanner, setIsDeletingBanner] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getBanners, isFetchingBanners } = useBanners();

  const setLabelsFromFirebase = async () => {
    const fetchedBanners = await getBanners();
    setBanners(fetchedBanners);
  };

  useEffect(() => {
    setLabelsFromFirebase();
  }, []);

  const replaceBannersInFirebase = async (
    currentBanners: Banner[],
    newBanners: Banner[]
  ) => {
    setIsLoading(true);

    // Delete all current banners and add the rearranged ones
    // Not the most efficient way to do this, but it's the simplest
    try {
      for await (const banner of currentBanners) {
        await deleteDoc(doc(db, 'banners', banner.id));
      }
      for await (const banner of newBanners) {
        // Keep the same ID if label already exists
        if (banner.id) {
          await setDoc(doc(db, 'banners', banner.id), banner);
        } else {
          await addDoc(collection(db, 'banners'), banner);
        }
      }

      toast.success('Banners updated successfully!');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setIsLoading(false);
      return toast.error(`💥 ${e.message}`);
    } finally {
      setLabelsFromFirebase();
      setIsLoading(false);
    }
  };

  const uploadFile = async (file: File) => {
    const fileType = file.type.split('/')[0];
    const isVideo = fileType === FileType.VIDEO;

    const bannerId = uuid4();
    const storageRef = ref(
      storage,
      `${isVideo ? 'bannerVideos' : 'bannerImages'}/${bannerId}`
    );
    const snapshot = await uploadBytes(storageRef, file as File);
    const fileUrl = await getDownloadURL(snapshot.ref);

    return { bannerId, fileUrl, fileType };
  };

  const handleAddNewBanner = async () => {
    if (!file) {
      return;
    }

    setIsLoading(true);

    const { bannerId, fileUrl, fileType } = await uploadFile(file);

    const newBanner = {
      id: bannerId,
      name: file.name,
      fileType,
      fileUrl: '',
      redirectUrl: bannerLink,
      index: newBannerIndex
    };

    const newBanners: Banner[] = [];

    newBanner.fileUrl = fileUrl;

    // if banner with the same index exists, increment all labels with index >= newLabelIndex
    if (banners.some((banner) => banner.index === newBannerIndex)) {
      banners.forEach((banner) => {
        if (banner.index >= newBannerIndex) {
          newBanners.push({ ...banner, index: banner.index + 1 });
        } else {
          newBanners.push(banner);
        }
      });
      newBanners.push(newBanner as Banner);
    } else {
      newBanners.push(...banners, newBanner as Banner);
    }

    await replaceBannersInFirebase(banners, newBanners);
    resetForm();
  };

  const handleEditExistingLabel = async () => {
    const bannerToEdit = banners.find((label) => label.id === bannerIdToEdit);
    if (!bannerToEdit) {
      resetForm();
      return toast.error(
        `Cannot find existing banner with ID: ${bannerIdToEdit}`
      );
    }
    if (
      newBannerIndex === bannerToEdit.index &&
      bannerLink === bannerToEdit.redirectUrl
    ) {
      resetForm();
      return toast.info(
        `No changes made to exising banner: ${bannerToEdit.name}`
      );
    }

    bannerToEdit.name = file ? file.name : bannerToEdit.name;
    bannerToEdit.index =
      newBannerIndex > banners.length - 1 ? banners.length - 1 : newBannerIndex;
    bannerToEdit.redirectUrl = bannerLink;

    if (file) {
      const { fileUrl } = await uploadFile(file);
      bannerToEdit.fileUrl = fileUrl;
    }

    const newBanners: Banner[] = [];
    banners.forEach((banner) => {
      if (banner.id !== bannerIdToEdit) {
        if (banner.index >= newBannerIndex) {
          newBanners.push({ ...banner, index: banner.index + 1 });
        } else if (banner.index < newBannerIndex && banner.index !== 0) {
          newBanners.push({ ...banner, index: banner.index - 1 });
        } else {
          newBanners.push(banner);
        }
      }
    });
    newBanners.push(bannerToEdit);

    await replaceBannersInFirebase(banners, newBanners);
    resetForm();
  };

  const handleDeleteBanner = async (bannerId: string) => {
    setIsDeletingBanner(true);

    try {
      await deleteDoc(doc(db, 'banners', bannerId));
      // TODO: Remove image from storage

      toast.success('Banner deleted successfully!');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setIsDeletingBanner(false);
      return toast.error(`💥 ${e.message}`);
    } finally {
      setLabelsFromFirebase();
      setIsDeletingBanner(false);
      resetForm();
    }
  };

  const handleStartEditingBanner = (banner: Banner) => {
    setBannerIdToEdit(banner.id);
    setBannerLink(banner.redirectUrl);
    setNewBannerIndex(banner.index);
  };

  const resetForm = () => {
    setFile(undefined);
    setBannerIdToEdit(null);
    setNewBannerIndex(0);
    setBannerLink('');
    setIsLoading(false);
  };

  const handleActionButtonFunction = !bannerIdToEdit
    ? handleAddNewBanner
    : handleEditExistingLabel;

  const actionButtonLabel = bannerIdToEdit ? 'Edit banner' : 'Add banner';

  return (
    <Wrapper>
      <Text>Banner images</Text>
      <EdittableAndSelectableItems
        items={banners}
        isFetchingItems={isFetchingBanners}
        // @ts-ignore
        handleStartEditingItem={handleStartEditingBanner}
      />
      <Text>{actionButtonLabel}</Text>
      <InputContainer>
        <ImageInput
          fileName={file?.name}
          supportedTypes={[...supportedImageTypes, ...supportedVideoTypes]}
          onChange={(e) => {
            e.target.files && setFile(e.target.files[0]);
          }}
        />
        <LinkAndIndexContainer>
          <LinkInputWrapper>
            <Input
              value={bannerLink}
              placeholder={'Banner link...'}
              onChange={(e) => setBannerLink(e.target.value)}
            />
          </LinkInputWrapper>
          <IndexInputWrapper>
            <Input
              value={newBannerIndex}
              placeholder={'Index...'}
              type={'number'}
              min={0}
              onChange={(e) => {
                // TODO: Currently working but should be able to delete the initial 0, making it possible to write 1 instead of 01
                setNewBannerIndex(Number(e.target.value));
              }}
            />
          </IndexInputWrapper>
        </LinkAndIndexContainer>
      </InputContainer>
      <ButtonContainer>
        <Button
          label={actionButtonLabel}
          disabled={!bannerIdToEdit && file === undefined}
          loading={isLoading}
          onClick={handleActionButtonFunction}
        />
        {bannerIdToEdit && (
          <Button
            label={'Delete banner'}
            backgroundColor={Color.RED}
            loading={isDeletingBanner}
            onClick={() => handleDeleteBanner(bannerIdToEdit)}
          />
        )}
        {bannerIdToEdit && (
          <Button label={'Stop editing'} onClick={resetForm} />
        )}
      </ButtonContainer>
    </Wrapper>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 20px;
`;

const Text = styled.p`
  font-size: 24px;
  color: ${Color.WHITE};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 10px 0 10px 0;
`;

const LinkInputWrapper = styled.div`
  flex: 3;
`;

const IndexInputWrapper = styled.div`
  flex: 1;
`;

const LinkAndIndexContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const Wrapper = styled.div`
  padding-top: 20px;
`;
