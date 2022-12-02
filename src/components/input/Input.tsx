import React from 'react';
import { icons } from '../../assets/icons';
import classes from './Input.module.scss';
export const Input = () => {
  return (
    <div className={classes.inputContainer}>
      <div className={classes.searchContainer}>
        <icons.FaSearch />
      </div>
      <input placeholder="Looking for fashion" />
    </div>
  );
};
