import { ContactsList } from './ContactList/ContactList';
import { Title, Wrapper } from './Contacts.styled';
import { Filter } from './Filter/Filter';
import { ContactForm } from './Form/Form';

const { Component } = require('react');

class Contacts extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    name: '',
    filter: [],
  };

  addContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  filterContacts = filterQuery => {
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterQuery.toLowerCase())
    );
    this.setState({ filter: filteredContacts });
  };

  checkExistingContact = name => {
    return this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  RemoveContactById = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };
  render() {
    return (
      <Wrapper>
        <Title>Phonebook</Title>
        <ContactForm
          onAdd={this.addContact}
          checkExistingContact={this.checkExistingContact}
        />
        <Title>Contacts</Title>
        <Filter filterByName={this.filterContacts} />
        <ContactsList
          contacts={this.state.contacts}
          filter={this.state.filter}
          RemoveContactById={this.RemoveContactById}
        />
      </Wrapper>
    );
  }
}

export default Contacts;
