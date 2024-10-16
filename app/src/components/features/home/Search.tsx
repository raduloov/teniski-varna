import React, { useEffect, useState } from 'react';
import { Input } from '../../common/Input';
import { icons } from '../../../assets/icons';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { searchActions } from '../../../store/searchSlice';
import { useCustomNavigate } from '../../../hooks/useCustomNavigate';

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { searchTerm } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();
  const navigate = useCustomNavigate();

  useEffect(() => {
    setSearchQuery(searchTerm);
  }, []);

  const setSearchTerm = (searchTerm: string) => {
    dispatch(searchActions.setSearch(searchTerm));
  };

  const onSearch = () => {
    setSearchTerm(searchQuery);
    navigate('/');
  };

  const onClear = () => {
    setSearchQuery('');
    setSearchTerm('');
  };

  return (
    <Input
      icon={icons.FaSearch}
      onEnterKey={onSearch}
      onBlur={() => setSearchTerm(searchQuery)}
      clearIcon={searchQuery.length > 0}
      onClear={onClear}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      additionalStyles={`
        flex-grow: 1;
        transition: ease-out 0.3s;
      `}
    />
  );
};
