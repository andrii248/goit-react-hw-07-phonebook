import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

export default function App() {
  return (
    <div className="main">
      <h1>Phonebook</h1>
      <ContactForm />
      <Filter />
      <ContactList />
    </div>
  );
}
