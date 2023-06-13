import React from "react";
import personsService from "../services/persons";

const Person = (props) => {
  const deletePerson = (id) => {
    const person = props.persons.find((person) => person.id === id);
    console.log(person);
    const removePerson = window.confirm(
      `Are you sure you want to delete ${person.name} from your phonebook `
    );
    if (removePerson)
      //logic for removing a person
      personsService.remove(id).then((res) => {
        console.log(props.persons);
        const updatedPerson = props.persons.filter(
          (person) => person.id !== id
        );

        // using props to pass data to the parent
        props.onDelete(updatedPerson);
      });
  };

  return (
    <div>
      {props.persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Person;
