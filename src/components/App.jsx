import React, { useState, useEffect, useMemo } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ConctactList/ContactList';
import styles from './App.module.css';

const App = () => {
  const initialContacts = useMemo(
    () => [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    []
  );

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const storedContacts = localStorage.getItem('phonebookContacts');

    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    } else {
      setContacts(initialContacts);
    }
  }, [initialContacts]);

  useEffect(() => {
    localStorage.setItem('phonebookContacts', JSON.stringify(contacts));
  }, [contacts]); // Dodaj contacts do tablicy zależności

  const addContact = (name, number) => {
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (existingContact) {
      alert(`${name} is already in your contacts!`);
    } else {
      const newContact = {
        id: nanoid(),
        name: name,
        number: number,
      };
      setContacts([...contacts, newContact]);
    }
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const [filter, setFilter] = useState('');

  const handleFilterChange = event => {
    setFilter(event.target.value);
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
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </div>
  );
};

export default App;

// działający kod zadania 2 po refakturyzacji
// import React, { useState } from 'react';
// import { nanoid } from 'nanoid';
// import ContactForm from './ContactForm/ContactForm';
// import Filter from './Filter/Filter';
// import ContactList from './ConctactList/ContactList';
// import styles from './App.module.css';

// const App = () => {
//   const initialContacts = [
//     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//   ];

//   const [contacts, setContacts] = useState(initialContacts);
//   const [filter, setFilter] = useState('');

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

//działajacy kod przed refakturyzacja

// const App = () => {
//   const initialContacts = [
//     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//   ];

//   const [contacts, setContacts] = useState(initialContacts);
//   const [filter, setFilter] = useState('');
//   const [name, setName] = useState('');
//   const [number, setNumber] = useState('');

//   const addContact = () => {
//     const newContact = {
//       id: nanoid(),
//       name: name,
//       number: number,
//     };
//     setContacts([...contacts, newContact]);
//     setName('');
//     setNumber('');
//   };

//   const handleFilterChange = event => {
//     setFilter(event.target.value);
//   };

//   const filteredContacts = contacts.filter(contact =>
//     contact.name.toLowerCase().includes(filter.toLowerCase())
//   );

//   return (
//     <div>
//       <h1>Phonebook</h1>
//       <ContactForm
//         name={name}
//         setName={setName}
//         number={number}
//         setNumber={setNumber}
//         addContact={addContact}
//       />
//       <h2>Contacts</h2>
//       <input
//         type="text"
//         placeholder="Search contacts..."
//         value={filter}
//         onChange={handleFilterChange}
//       />
//       <ul>
//         {filteredContacts.map(contact => (
//           <li key={contact.id}>
//             {contact.name} - {contact.number}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default App;

// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
//     >
//       React homework template
//     </div>
//   );
// };
