import { ContactsList } from './ContactList/ContactList';
import { Title, Wrapper } from './Contacts.styled';
import { Filter } from './Filter/Filter';
import { ContactForm } from './Form/Form';
import { Notification } from './Notification/Notification';
import { getInitContacts } from './getInitContactsFn';

const { useState, useEffect } = require('react');
const LS_KEY = 'contacts';

export const Contacts = () => {
  const [contacts, setContacts] = useState(getInitContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const existingContacts = localStorage.getItem(LS_KEY);
    if (existingContacts !== null) {
      setContacts(JSON.parse(existingContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const addFilterQuery = filterQuery => {
    setFilter(filterQuery);
  };
  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const checkExistingContact = name => {
    return contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };
  const removeContactById = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };
  const contactsToRender = filter === '' ? contacts : getFilteredContacts();
  let noResultsNotification = null;
  if (filter !== '' && getFilteredContacts().length === 0) {
    noResultsNotification = <Notification />;
  }
  return (
    <Wrapper>
      <Title>Phonebook</Title>
      <ContactForm
        onAdd={addContact}
        checkExistingContact={checkExistingContact}
      />
      <Title>Contacts</Title>
      <Filter addFilterQuery={addFilterQuery} filter={filter} />
      <ContactsList
        contacts={contactsToRender}
        removeContactById={removeContactById}
      />
      {noResultsNotification}
    </Wrapper>
  );
};

export default Contacts;
