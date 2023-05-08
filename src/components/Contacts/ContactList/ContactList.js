import PropTypes from 'prop-types';

import { Contact } from '../Contact/Contact';
import { List } from './ContactList.styled';

export const ContactsList = ({ contacts, filter, RemoveContactById }) => {
  return (
    <List>
      {filter.length === 0
        ? contacts.map(contact => (
            <Contact
              key={contact.id}
              contact={contact}
              RemoveContactById={RemoveContactById}
            />
          ))
        : filter.map(contact => (
            <Contact
              key={contact.id}
              contact={contact}
              RemoveContactById={RemoveContactById}
            />
          ))}
    </List>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  filter: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};
