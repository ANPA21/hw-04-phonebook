import PropTypes from 'prop-types';

import { Contact } from '../Contact/Contact';
import { List } from './ContactList.styled';

export const ContactsList = ({
  contacts,
  filteredContacts,
  RemoveContactById,
  filter,
}) => {
  return (
    <List>
      {filteredContacts.length === 0 && filter === ''
        ? contacts.map(contact => (
            <Contact
              key={contact.id}
              contact={contact}
              RemoveContactById={RemoveContactById}
            />
          ))
        : filteredContacts.map(contact => (
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
  filteredContacts: PropTypes.arrayOf(PropTypes.shape({}).isRequired)
    .isRequired,
  RemoveContactById: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
