import React, { useState } from 'react';
import { Input } from '../../common/Input';
import { icons } from '../../../assets/icons';
import { useAppDispatch } from '../../../hooks/useRedux';
import { searchActions } from '../../../store/searchSlice';

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const dispatch = useAppDispatch();

  const setSearchTerm = (searchTerm: string) => {
    dispatch(searchActions.setSearch(searchTerm));
  };

  return (
    <Input
      icon={icons.FaSearch}
      onEnterKey={() => setSearchTerm(searchQuery)}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};
