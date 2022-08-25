import css from './ContactList.module.css';
import { useGetContactsQuery } from 'redux/contactsSlice';
import ContactItem from 'components/ContactItem';
import { useSelector } from 'react-redux';
import { getFilter } from 'redux/filterSlice';
import { RotatingLines } from 'react-loader-spinner';

const ContactList = () => {
  const { data: contacts, isLoading } = useGetContactsQuery();
  const filter = useSelector(getFilter);

  function getAvailableContacts() {
    if (filter === '') {
      return contacts;
    }
    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  }
  const filteredContacts = getAvailableContacts();

  if (isLoading) {
    return (
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    );
  }

  if (contacts) {
    return (
      <ul className={css.list}>
        {contacts &&
          filteredContacts.map(contact => (
            <li key={contact.id}>
              <ContactItem item={contact} />
            </li>
          ))}
      </ul>
    );
  }
};

export default ContactList;
