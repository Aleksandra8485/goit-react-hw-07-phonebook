import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchContacts,
  deleteContact,
} from '../../redux/contacts/contactsSlice';
import styles from './ContactList.module.css';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);

  useEffect(() => {
    dispatch(fetchContacts()); // pobieranie kontaktów z backendu przy montowaniu komponentu
  }, [dispatch]);

  const handleDelete = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <ul className={styles.contactList}>
      {contacts.map(contact => (
        <li key={contact.id} className={styles.contactItem}>
          <span className={styles.contactName}>{contact.name}</span>
          <span className={styles.contactNumber}>{contact.number}</span>
          <button
            className={styles.deleteBtn}
            onClick={() => handleDelete(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;

// KOD ZD 6 PRZED REFAKTURYZACJA

// import React from 'react';
// import styles from './ContactList.module.css';

// const ContactList = ({ contacts, deleteContact }) => {
//   return (
//     <ul>
//       {contacts.map(contact => (
//         <li key={contact.id}>
//           {contact.name} - {contact.number}
//           <button
//             className={styles.deleteBtn}
//             onClick={() => deleteContact(contact.id)}
//           >
//             Delete
//           </button>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default ContactList;
