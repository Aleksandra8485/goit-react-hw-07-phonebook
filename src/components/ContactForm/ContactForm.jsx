import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveContact } from '../redux/contacts/contactsSlice';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(saveContact({ name, number }));

    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className={styles.input} // Użyj klasy CSS z modułu 'styles'
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={number}
        onChange={e => setNumber(e.target.value)}
        className={styles.input} // Użyj klasy CSS z modułu 'styles'
      />
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default ContactForm;

//KOD Z ZADANIA 6 PRZED REFAKTURYZACJA
// const ContactForm = ({ addContact }) => {
//   const [name, setName] = useState('');
//   const [number, setNumber] = useState('');

//   const handleSubmit = event => {
//     event.preventDefault();
//     addContact(name, number);
//     setName('');
//     setNumber('');
//   };

//   return (
//     <form className={styles.form} onSubmit={handleSubmit}>
//       <label>
//         Name
//         <input
//           className={styles.input}
//           type="text"
//           name="name"
//           pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//           title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//           required
//           value={name}
//           onChange={event => setName(event.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Number
//         <input
//           className={styles.input}
//           type="tel"
//           name="number"
//           pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//           title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//           required
//           value={number}
//           onChange={event => setNumber(event.target.value)}
//         />
//       </label>
//       <br />
//       <button className={styles.addContactBtn} type="submit">
//         Add Contact
//       </button>
//     </form>
//   );
// };

// export default ContactForm;
