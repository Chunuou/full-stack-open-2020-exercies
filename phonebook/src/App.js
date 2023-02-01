import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './service/person';

const App = () => {
  const [filter, setFilter] = useState('');
  const [persons, setPersons] = useState([]);
  const personToShow = filter === ''
    ? persons
    : persons.filter((person) => person.name.toLowerCase().includes(filter));
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState({ type: '', message: '' });

  useEffect(() => {
    personService
      .getAlL()
      .then((response) => {
        setPersons(response);
      });
  }, []);

  const handleNotification = (type, message, time) => {
    const newMessage = { type, message };
    setMessage(newMessage);
    setTimeout(() => {
      setMessage({ type: '', message: '' });
    }, time);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value.toLowerCase());
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleNumber = (event) => {
    setNumber(event.target.value);
  };

  const isPersonExist = () => {
    if (persons.find((person) => person.name === name)) {
      return true;
    }

    return false;
  };

  const addPerson = () => {
    const person = { name, number };
    personService
      .addPerson(person)
      .then((response) => {
        handleNotification('success', `Added ${name}`, 3000);
        setPersons(persons.concat(response));
        setName('');
        setNumber('');
      }).catch((error) => {
        handleNotification('error', `${error}`, 3000);
      });
  };

  const updatePerson = () => {
    const person = persons.find((person) => person.name === name);
    const flag = window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`);
    if (flag) {
      const newPerson = { ...person, number };
      personService
        .updatePerson(newPerson)
        .then(() => {
          handleNotification('success', `Updated ${name}`, 3000);
          setName('');
          setNumber('');
          setPersons(persons.map((person) => (person.id === newPerson.id ? newPerson : person)));
        }).catch(() => {
          handleNotification('error', `Information of ${name} has already been removed from server`, 3000);
        });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isPersonExist()) {
      updatePerson();
    } else {
      addPerson();
    }
  };

  const handleDelete = (id) => {
    const person = personToShow.find((person) => person.id === id);
    const flag = window.confirm(`Delete ${person.name} ?`);
    if (flag) {
      personService
        .deletePerson(id)
        .then(() => {
          handleNotification('success', `Deleted ${person.name}`, 3000);
          setPersons(persons.filter((person) => person.id !== id));
        }).catch(() => {
          handleNotification('error', `Information of ${name} has already been removed from server`, 3000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        name={name}
        handleName={handleName}
        number={number}
        handleNumber={handleNumber}
      />
      <h3>Numbers</h3>
      <Persons personToShow={personToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
