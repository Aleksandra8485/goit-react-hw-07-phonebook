import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const saveContact = createAsyncThunk(
  'contacts/saveContact',
  async contactData => {
    const response = await fetch(
      'https://64b581fcf3dbab5a95c766eb.mockapi.io/contacts/contacts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      }
    );
    if (!response.ok) {
      throw new Error('Failed to save contact.');
    }
    return response.json();
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async contactId => {
    const response = await fetch(
      `https://64b581fcf3dbab5a95c766eb.mockapi.io/contacts/contacts${contactId}`,
      {
        method: 'DELETE',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to delete contact.');
    }
    return contactId;
  }
);

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await fetch(
      'https://64b581fcf3dbab5a95c766eb.mockapi.io/contacts/contacts'
    );
    if (!response.ok) {
      throw new Error('Failed to fetch contacts.');
    }
    return response.json();
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // Inne reduktory, jeśli są wymagane
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
  },
});

export default contactsSlice.reducer;
