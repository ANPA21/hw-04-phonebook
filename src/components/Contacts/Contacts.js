import { ContactsList } from './ContactList/ContactList';
import { Title, Wrapper } from './Contacts.styled';
import { Filter } from './Filter/Filter';
import { ContactForm } from './Form/Form';
import { Notification } from './Notification/Notification';

const { Component } = require('react');
class Contacts extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const existingContacts = localStorage.getItem('contacts');
    if (existingContacts !== null) {
      this.setState({ contacts: JSON.parse(existingContacts) });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

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
      // Очищает фильтр, чтобы зарендерить список оставшихся контактов, если все отфильтрованные контакты были удалены
      // Можно убрать, тогда при удалении всех отфильтрованныx контактов будет показан <Notification/>
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
    const contacts =
      this.state.filter === ''
        ? this.state.contacts
        : this.getFilteredContacts();

    let noResultsNotification = null;
    if (this.state.filter !== '' && this.getFilteredContacts().length === 0) {
      noResultsNotification = <Notification />;
    }
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
          contacts={contacts}
          removeContactById={this.removeContactById}
        />
        {noResultsNotification}
      </Wrapper>
    );
  }
}

export default Contacts;
