import React, { useEffect, useState } from 'react';
import { Input } from '../../common/Input';
import { icons } from '../../../assets/icons';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { searchActions } from '../../../store/searchSlice';

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { searchTerm } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setSearchQuery(searchTerm);
  }, []);

  const setSearchTerm = (searchTerm: string) => {
    dispatch(searchActions.setSearch(searchTerm));
  };

  const onClear = () => {
    setSearchQuery('');
    setSearchTerm('');
  };

  return (
    <Input
      icon={icons.FaSearch}
      onEnterKey={() => setSearchTerm(searchQuery)}
      clearIcon={searchQuery.length > 0}
      onClear={onClear}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};
