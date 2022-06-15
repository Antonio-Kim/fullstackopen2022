import React, { useState } from "react";

const DisplayPerson = ({ person }) => <div>{person.name}</div>;

const DisplayPhonebook = ({ persons }) => {
  return persons.map( (person, index) => <DisplayPerson key={index} person={person} />);
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
    };
    const existingPerson = persons.find( person => person.name === nameObject.name);
    if (existingPerson) {
      window.alert(`${newName} is already added to phonebook.`);
      return;
    }
    setPersons(persons.concat({ name: newName}))
    setNewName('');
  };

  const handleAddPerson = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleAddPerson} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>

        <h2>Numbers</h2>
        <DisplayPhonebook persons={persons} />
      </form>
    </div>
  );
};

export default App;
