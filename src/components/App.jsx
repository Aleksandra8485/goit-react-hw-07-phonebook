import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchContacts,
  saveContact,
  deleteContact,
} from '../redux/contacts/contactsSlice';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ConctactList/ContactList';
import styles from './App.module.css';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);

  useEffect(() => {
    dispatch(fetchContacts()); // Pobierz kontakty z backendu przy montowaniu komponentu
  }, [dispatch]);

  const addContact = (name, number) => {
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (existingContact) {
      alert(`${name} is already in your contacts!`);
    } else {
      dispatch(saveContact({ name, number })); // Zapisz kontakt do backendu przy użyciu akcji saveContact
    }
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId)); // Usuń kontakt z backendu przy użyciu akcji deleteContact
  };

  const handleFilterChange = event => {
    // Obsłuż zmianę filtra
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

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