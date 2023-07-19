import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchContacts,
  saveContact,
  deleteContact,
  setFilter,
} from '../redux/contacts/contactsSlice';
import axios from 'axios';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ConctactList/ContactList';
import styles from './App.module.css';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);

  useEffect(() => {
    dispatch(fetchContacts()); // pobieranie kontaktu z backendu przy montowaniu komponentu
  }, [dispatch]);

  const addContact = async (name, number) => {
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (existingContact) {
      alert(`${name} is already in your contacts!`);
    } else {
      try {
        const response = await axios.post(
          'https://64b581fcf3dbab5a95c766eb.mockapi.io/contacts',
          { name, number }
        );
        dispatch(saveContact(response.data)); // zapisywanie kontaktu do backendu przy użyciu akcji saveContact
      } catch (error) {
        alert('Failed to save contact.');
      }
    }
  };

  const handleDeleteContact = async contactId => {
    try {
      await axios.delete(
        `https://64b581fcf3dbab5a95c766eb.mockapi.io/contacts/${contactId}`
      );
      dispatch(deleteContact(contactId)); // usuwanie kontaktu z backendu przy użyciu akcji deleteContact
    } catch (error) {
      alert('Failed to delete contact.');
    }
  };

  const handleFilterChange = event => {
    const { value } = event.target;
    dispatch(setFilter(value)); // aktualizowanie stanu filtra w Redux Store
  };

  // Ssprawdzenie czy contacts zostało załadowane
  if (!contacts) {
    return <div>Loading...</div>;
  }

  // const filteredContacts = contacts.filter(contact =>
  //   contact.name.toLowerCase().includes(filter.toLowerCase())
  // );

  // filtrowanie kontaktów i zabezpieczenie przed użyciem toLowerCase, gdy filter jest undefined
  const filteredContacts = contacts.filter(contact => {
    return filter
      ? contact.name.toLowerCase().includes(filter.toLowerCase())
      : true;
  });

  return (
    <div className={styles.appContainer}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        deleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;

// KOD ZADANIA 6 PRZED REFAKTURYZACJĄ
// import React, { useState, useEffect, useMemo } from 'react';
// import { nanoid } from 'nanoid';
// import ContactForm from './ContactForm/ContactForm';
// import Filter from './Filter/Filter';
// import ContactList from './ConctactList/ContactList';
// import styles from './App.module.css';

// const App = () => {
//   const initialContacts = useMemo(
//     () => [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     []
//   );

//   const [contacts, setContacts] = useState([]);

//   useEffect(() => {
//     const storedContacts = localStorage.getItem('phonebookContacts');

//     if (storedContacts) {
//       setContacts(JSON.parse(storedContacts));
//     } else {
//       setContacts(initialContacts);
//     }
//   }, [initialContacts]);

//   useEffect(() => {
//     localStorage.setItem('phonebookContacts', JSON.stringify(contacts));
//   }, [contacts]); // Dodaj contacts do tablicy zależności

//   const addContact = (name, number) => {
//     const existingContact = contacts.find(
//       contact => contact.name.toLowerCase() === name.toLowerCase()
//     );
//     if (existingContact) {
//       alert(`${name} is already in your contacts!`);
//     } else {
//       const newContact = {
//         id: nanoid(),
//         name: name,
//         number: number,
//       };
//       setContacts([...contacts, newContact]);
//     }
//   };

//   const deleteContact = contactId => {
//     setContacts(contacts.filter(contact => contact.id !== contactId));
//   };

//   const [filter, setFilter] = useState('');

//   const handleFilterChange = event => {
//     setFilter(event.target.value);
//   };

//   const filteredContacts = contacts.filter(contact =>
//     contact.name.toLowerCase().includes(filter.toLowerCase())
//   );

//   return (
//     <div className={styles.appContainer}>
//       <h1>Phonebook</h1>
//       <ContactForm addContact={addContact} />
//       <h2>Contacts</h2>
//       <Filter filter={filter} handleFilterChange={handleFilterChange} />
//       <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
//     </div>
//   );
// };

// export default App;
