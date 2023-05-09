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
    filter: '',
  };

  addContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  addFilterQuery = filterQuery => {
    this.setState({ filter: filterQuery });
  };

  getFilteredContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  checkExistingContact = name => {
    return this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  removeContactById = id => {
    this.setState(
      prevState => {
        return {
          contacts: prevState.contacts.filter(contact => contact.id !== id),
        };
      },
      () => {
        if (
          this.getFilteredContacts().length === 0 &&
          this.state.filter !== ''
        ) {
          this.setState({ filter: '' });
        }
      }
    );
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
        <Filter
          addFilterQuery={this.addFilterQuery}
          filter={this.state.filter}
        />
        <ContactsList
          contacts={this.state.contacts}
          filteredContacts={this.getFilteredContacts()}
          RemoveContactById={this.removeContactById}
          filter={this.state.filter}
        />
      </Wrapper>
    );
  }
}

export default Contacts;
