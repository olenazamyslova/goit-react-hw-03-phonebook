import React, { Component } from 'react';

import { v4 as uuidv4 } from 'uuid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = data => {
    this.repeatControl(data);
  };

  repeatControl = (data) => {
  const { contacts } = this.state;
  const nameArray = contacts.map((contact) => contact.name);

  if (!nameArray.includes(data.name)) {
    const newContact = {
      id: uuidv4(),
      name: data.name,
      number: data.number,
    };

    this.setState((prevState) => ({
      ...prevState,
      contacts: [...prevState.contacts, newContact],
    }));
  } else {
    alert("Контакт вже є у телефонній книзі!!!");
  }
};

  elementDelete = (arr, idContact) => {
    let newArr = arr.filter(elem => elem.id !== idContact);
    return newArr;
  };

  deleteContactFromContactList = (idContact) => {
  this.setState((prevState) => {
    const updatedContacts = this.elementDelete(prevState.contacts, idContact);
    return { contacts: updatedContacts };
  });
};

  setFilterToState = filterData => {
    this.setState({ filter: `${filterData}` });
  };

  filterArr = () => {
  return this.state.contacts.filter((cur) =>
    cur.name.toUpperCase().includes(this.state.filter)
  );
};

render() {
  const filteredContacts = this.filterArr();

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <ContactForm onSubmitData={this.formSubmitHandler} />
      <h1>Contacts</h1>
      <Filter setFilterToState={this.setFilterToState} />
      <ContactList contacts={filteredContacts} del={this.deleteContactFromContactList} />
    </div>
  );
}
}
export default App;
