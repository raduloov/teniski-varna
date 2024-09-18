import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { EdittableAndSelectableItems } from '../../components/common/EdittableAndSelectableItems';
import { Color } from '../../assets/constants';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import {
  addDoc,
  setDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  arrayRemove
} from '@firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { Label, useLabels } from '../../hooks/useLabels';
import { useDiscounts } from '../../hooks/useDiscounts';

export const LabelsContainer = () => {
  const [labels, setLabels] = useState<Label[]>([]);
  const [newLabelName, setNewLabelName] = useState<string>('');
  const [newLabelIndex, setNewLabelIndex] = useState<number>(0);
  const [labelIdToEdit, setLabelIdToEdit] = useState<string | null>(null);
  const [isDeletingLabel, setIsDeletingLabel] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { getLabels, isFetchingLabels } = useLabels();
  const { getDiscounts } = useDiscounts();

  const setLabelsFromFirebase = async () => {
    const fetchedLabels = await getLabels();
    setLabels(fetchedLabels);
  };

  useEffect(() => {
    setLabelsFromFirebase();
  }, []);

  const replaceLabelsInFirebase = async (
    currentLabels: Label[],
    newLabels: Label[]
  ) => {
    setIsLoading(true);

    // Delete all current labels and add the rearranged ones
    // Not the most efficient way to do this, but it's the simplest
    try {
      for await (const label of currentLabels) {
        await deleteDoc(doc(db, 'labels', label.id));
      }
      for await (const label of newLabels) {
        // Keep the same ID if label already exists
        if (label.id) {
          await setDoc(doc(db, 'labels', label.id), label);
        } else {
          await addDoc(collection(db, 'labels'), label);
        }
      }

      toast.success('🎉 Labels updated successfully!');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setIsLoading(false);
      return toast.error(`💥 ${e.message}`);
    } finally {
      setLabelsFromFirebase();
      setIsLoading(false);
    }
  };

  const handleAddNewLabel = async () => {
    if (newLabelName === '') {
      return;
    }

    if (labels.some((label) => label.name === newLabelName)) {
      toast.error('Label with that name already exists');
      return;
    }

    const newLabel = {
      name: newLabelName,
      index: newLabelIndex
    };

    const newLabels: Label[] = [];
    // if label with the same index exists, increment all labels with index >= newLabelIndex
    if (labels.some((label) => label.index === newLabelIndex)) {
      labels.forEach((label) => {
        if (label.index >= newLabelIndex) {
          newLabels.push({ ...label, index: label.index + 1 });
        } else {
          newLabels.push(label);
        }
      });
      newLabels.push(newLabel as Label);
    } else {
      newLabels.push(...labels, newLabel as Label);
    }

    await replaceLabelsInFirebase(labels, newLabels);

    resetForm();
  };

  const handleEditExistingLabel = async () => {
    const labelToEdit = labels.find((label) => label.id === labelIdToEdit);

    if (!labelToEdit) {
      resetForm();
      return toast.error(
        `Cannot find existing label with ID: ${labelIdToEdit}`
      );
    }

    if (
      newLabelName === labelToEdit.name &&
      newLabelIndex === labelToEdit.index
    ) {
      resetForm();
      return toast.info(
        `No changes made to exising label: ${labelToEdit.name}`
      );
    }

    labelToEdit.name = newLabelName;
    labelToEdit.index =
      newLabelIndex > labels.length - 1 ? labels.length - 1 : newLabelIndex;

    const newLabels: Label[] = [];
    labels.forEach((label) => {
      if (label.id !== labelIdToEdit) {
        if (label.index >= newLabelIndex) {
          newLabels.push({ ...label, index: label.index + 1 });
        } else if (label.index < newLabelIndex && label.index !== 0) {
          newLabels.push({ ...label, index: label.index - 1 });
        } else {
          newLabels.push(label);
        }
      }
    });
    newLabels.push(labelToEdit);

    await replaceLabelsInFirebase(labels, newLabels);

    resetForm();
  };

  const handleDeleteLabel = async (labelId: string) => {
    setIsDeletingLabel(true);

    try {
      const discounts = await getDiscounts();
      const discountsWithLabel = discounts.filter((discount) =>
        discount.labelIds.includes(labelId)
      );
      await deleteDoc(doc(db, 'labels', labelId));

      // Remove label from discounts that have it assigned
      for (const discount of discountsWithLabel) {
        if (discount.labelIds.includes(labelId)) {
          await updateDoc(doc(db, 'discounts', discount.id), {
            labelIds: arrayRemove(labelId)
          });
        }
      }
      toast.success('🎉 Label deleted successfully!');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setIsDeletingLabel(false);
      return toast.error(`💥 ${e.message}`);
    } finally {
      setLabelsFromFirebase();
      setIsDeletingLabel(false);
      resetForm();
    }
  };

  const handleStartEditingLabel = (label: Label) => {
    setLabelIdToEdit(label.id);
    setNewLabelName(label.name);
    setNewLabelIndex(label.index);
  };

  const resetForm = () => {
    setLabelIdToEdit(null);
    setNewLabelName('');
    setNewLabelIndex(0);
    setIsLoading(false);
  };

  const handleActionButtonFunction = !labelIdToEdit
    ? handleAddNewLabel
    : handleEditExistingLabel;

  const actionButtonLabel = labelIdToEdit ? 'Edit label' : 'Add label';

  return (
    <Wrapper>
      <Text>Labels</Text>
      <EdittableAndSelectableItems
        items={labels}
        isFetchingItems={isFetchingLabels}
        handleStartEditingItem={handleStartEditingLabel}
      />
      <Text>{actionButtonLabel}</Text>
      <InputContainer>
        <NewLabelNameInput>
          <Input
            value={newLabelName}
            placeholder={'Label name...'}
            type={'text'}
            onChange={(e) => setNewLabelName(e.target.value)}
          />
        </NewLabelNameInput>
        <NewLabelIndexInput>
          <Input
            value={newLabelIndex}
            placeholder={'Index...'}
            type={'number'}
            min={0}
            onChange={(e) => {
              // TODO: Currently working but should be able to delete the initial 0, making it possible to write 1 instead of 01
              setNewLabelIndex(Number(e.target.value));
            }}
          />
        </NewLabelIndexInput>
      </InputContainer>
      <ButtonContainer>
        <Button
          label={actionButtonLabel}
          disabled={newLabelName === ''}
          loading={isLoading}
          onClick={handleActionButtonFunction}
        />
        {labelIdToEdit && (
          <Button
            label={'Delete label'}
            backgroundColor={Color.RED}
            loading={isDeletingLabel}
            onClick={() => handleDeleteLabel(labelIdToEdit)}
          />
        )}
        {labelIdToEdit && <Button label={'Stop editing'} onClick={resetForm} />}
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
  gap: 5px;
  margin: 10px 0 10px 0;
`;

const NewLabelNameInput = styled.div`
  flex: 3;
`;

const NewLabelIndexInput = styled.div`
  flex: 1;
`;

const Wrapper = styled.div`
  padding-top: 20px;
`;
