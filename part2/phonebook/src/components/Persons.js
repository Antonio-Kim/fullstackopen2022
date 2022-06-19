import React from "react";

import Person from "./Person";
import personService from "../services/persons";

const Persons = ({ persons, setPersons }) => {
  return persons.map((person) => {
    const handleDelete = (id) => {
      const confirm = window.confirm(`Delete ${person.name}?`);
      if (confirm) {
        personService.remove(id);
        const newPersons = persons.filter((person) => person.id !== id);
        setPersons(newPersons);
      }
    };
    return (
      <div>
        <Person key={person.id} person={person} />{" "}
        <button onClick={() => handleDelete(person.id)}>delete</button>
      </div>
    );
  });
};

export default Persons;
