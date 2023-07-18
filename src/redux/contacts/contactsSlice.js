import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const saveContact = createAsyncThunk(
  'contacts/saveContact',
  async contactData => {
    const response = await fetch('https://mockapi.io/api/v1/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });
    if (!response.ok) {
      throw new Error('Failed to save contact.');
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
    // ... reszta reducers (jeśli jakieś są wymagane)
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
  },
});

export default contactsSlice.reducer;
