import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../redux/contacts/contactsSlice';
import styles from './ContactList.module.css';

const ContactList = ({ contacts }) => {
  const dispatch = useDispatch();

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
