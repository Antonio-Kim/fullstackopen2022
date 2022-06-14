import React, { useState } from "react";

const DisplayPhonebook = ({ persons }) => (
  persons.map((person, i) => <div key={i}>{person.name}</div>)
);

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
    };
    setPersons(persons.concat(nameObject));
    setNewName("");
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
