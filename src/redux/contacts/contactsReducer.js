import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    addContact: (state, action) => {
      state.push(action.payload);
      saveContactsToLocalStorage(state);
    },
    deleteContact: (state, action) => {
      state = state.filter(contact => contact.id !== action.payload);
      saveContactsToLocalStorage(state);
      return state;
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;

function saveContactsToLocalStorage(contacts) {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

// const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: {
//     contacts: [],
//     filter: '',
//   },
//   reducers: {
//     addContact: (state, action) => {
//       state.contacts.push(action.payload);
//       saveContactsToLocalStorage(state.contacts);
//     },
//     deleteContact: (state, action) => {
//       state.contacts = state.contacts.filter(
//         contact => contact.id !== action.payload
//       );
//       saveContactsToLocalStorage(state.contacts);
//     },
//     setFilter: (state, action) => {
//       state.filter = action.payload;
//     },
//   },
// });

// export const { addContact, deleteContact, setFilter } = contactsSlice.actions;
// export default contactsSlice.reducer;

// const saveContactsToLocalStorage = contacts => {
//   localStorage.setItem('contacts', JSON.stringify(contacts));
// };
