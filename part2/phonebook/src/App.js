import React, { useState } from "react";

const DisplayPerson = ({ person }) => (
  <div>
    {person.name} {person.number}
  </div>
);

const DisplayPhonebook = ({ persons }) => {
  return persons.map((person) => (
    <DisplayPerson key={person.id} person={person} />
  ));
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      window.alert(`${newName} is already added to phonebook.`);
      return;
    }
    setPersons(
      persons.concat({
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      })
    );
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
  // console.log(namesToShow);

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with <input value={newFilter} onChange={handleFilter} />
        </div>
      </form>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleAddPerson} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <DisplayPhonebook persons={namesToShow} />
    </div>
  );
};

export default App;
