import React, { useState, useEffect } from "react";

import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Success from "./components/Success";
import UpdateError from "./components/UpdateError";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      const confirm = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirm) {
        const id = persons.findIndex((person) => person.name === newName);
        personService
          .update(persons[id].id, { name: newName, number: newNumber })
          .then(response => {
            const updatedList = [...persons];
            updatedList[id] = response;
            setPersons(updatedList);
          })
          .catch(error => {
            setErrorMessage(`Information of ${newName} has already been removed from server`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000)
          });
        setPersons(persons.filter(person => person.id !== id+1))
        setNewName("");
        setNewNumber("");
      }
      return;
    }

    personService
      .create({
        name: newName,
        number: newNumber,
      })
      .then((newPerson) => {
        setPersons(persons.concat(newPerson));
        setSuccessMessage(`Added ${newPerson.name}`)
        setTimeout(()=> {
          setSuccessMessage(null)
        }, 3000)
      });

    setNewName("");
    setNewNumber("");
  };

  const handleAddPerson = (event) => {
    setNewName(event.target.value);
  };
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilter = (event) => {
    setNewFilter(event.target.value);
  };

  const namesToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Success message={successMessage} />
      <UpdateError message={errorMessage} />
      <Filter newFilter={newFilter} handleFilter={handleFilter} />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleAddPerson={handleAddPerson}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />

      <h2>Numbers</h2>
      <Persons persons={namesToShow} setPersons={setPersons} />
    </div>
  );
};

export default App;
