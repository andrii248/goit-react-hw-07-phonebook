import React, { useState } from 'react';
import css from './ContactForm.module.css';
import {
  useGetContactsQuery,
  useAddContactMutation,
} from 'redux/contactsSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactForm() {
  const { data } = useGetContactsQuery();
  const [addContact] = useAddContactMutation();

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    if (name === 'name') {
      setName(value);
    }
    if (name === 'phone') {
      setPhone(value);
    }
  };

  const onSubmitForm = e => {
    e.preventDefault();

    const addExistingName = data.some(
      contact => contact.name.toLocaleLowerCase() === name.toLowerCase()
    );

    if (addExistingName) {
      toast.error(`Contact ${name} already exists in your ContactList`);
      return;
    }

    addContact({ name: name, phone: phone });

    resetForm();
  };

  const resetForm = () => {
    setName('');
    setPhone('');
  };

  return (
    <form className={css.form} onSubmit={onSubmitForm}>
      <label className={css.label}>
        Name
        <input
          onChange={handleChange}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={css.label}>
        Phone
        <input
          onChange={handleChange}
          type="tel"
          name="phone"
          value={phone}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit">Add new contact</button>
    </form>
  );
}
