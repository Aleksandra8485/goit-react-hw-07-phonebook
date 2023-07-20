import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const saveContact = createAsyncThunk(
  'contacts/saveContact',
  async contactData => {
    try {
      const response = await axios.post(
        'https://64b581fcf3dbab5a95c766eb.mockapi.io/contacts/contacts',
        contactData
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to save contact.');
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async contactId => {
    try {
      await axios.delete(
        `https://64b581fcf3dbab5a95c766eb.mockapi.io/contacts/contacts/${contactId}`
      );
      return contactId;
    } catch (error) {
      throw new Error('Failed to delete contact.');
    }
  }
);

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    try {
      const response = await axios.get(
        'https://64b581fcf3dbab5a95c766eb.mockapi.io/contacts/contacts'
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch contacts.');
    }
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    filter: '',
    status: 'idle',
    error: null,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(saveContact.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(saveContact.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.contacts.push(action.payload);
    });
    builder.addCase(saveContact.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(deleteContact.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    });
    builder.addCase(deleteContact.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.contacts = action.payload;
    });
  },
});

export const { setFilter } = contactsSlice.actions;
export default contactsSlice.reducer;
