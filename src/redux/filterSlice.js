import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterContacts: (state, action) => {
      state.contacts.filter = action.payload;
    },
  },
});

export const { filterContacts } = filterSlice.actions;
export const getFilter = state => state.filter.contacts.filter;
