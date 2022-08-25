import PropTypes from 'prop-types';
import css from './ContactItem.module.css';
import { useDeleteContactMutation } from 'redux/contactsSlice';

const ContactItem = ({ item }) => {
  const [deleteContact, { isLoading }] = useDeleteContactMutation();

  return (
    <div className={css.item}>
      {item.name}: {item.phone}
      <button
        className={css.btn}
        type="button"
        onClick={() => deleteContact(item.id)}
        disabled={isLoading}
      >
        Delete
      </button>
    </div>
  );
};

ContactItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};

export default ContactItem;
