import { useState, useEffect } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: "Arto Hellas", number: "129 - 485 - 21479" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    personsService.getAll().then((existingPersons) => {
      setPersons(existingPersons);
    });
  }, []);

  //setting states

  const nameHandler = (e) => {
    setNewName(e.target.value);
  };
  const numberHandler = (e) => {
    setNewNumber(e.target.value);
  };

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  //adding person name and number

  const addPersonHandler = (e) => {
    e.preventDefault();

    // checking if duplicate name exist and the number is not a duplicate

    if (duplicateName && !duplicateNumber) {
      const updatingPerson = persons.filter(
        (person) => person.id === duplicatePerson[0].id
      );
      const changeNumber = window.confirm(
        `${updatingPerson[0].name} is already added to the phonebook,replace the old number with a new one ?`
      );
      // updating person details

      const updatedPerson = { ...updatingPerson[0], number: newNumber };

      if (changeNumber) {
        personsService
          .update(updatingPerson[0].id, updatedPerson)
          .then((updated) => {
            setNotification(`Updated ${updatedPerson.name}`);
            setTimeout(() => {
              setNotification("");
            }, 5000);
            setPersons(
              persons.map((person) =>
                person.id !== updatedPerson.id ? person : updated
              )
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setIsError(true);
            setNotification(
              `Information of ${updatedPerson.name} has already been removed from the server`
            );
            setPersons(
              persons.filter((person) => person.id !== updatedPerson.id)
            );
          });
      }
    } else if (duplicateName && duplicateNumber) {
      alert("Contact already exist ");
      setNewName("");
      setNewNumber("");
    } else {
      // adding a new person to the phonebook

      const personObj = {
        id: persons.length + 1,
        name: newName,
        number: newNumber,
      };
      personsService.create(personObj).then((existingPersons) => {
        //Notification for succesfully adding a person
        setNotification(`Added ${personObj.name}`);
        setTimeout(() => {
          setNotification("");
        }, 5000);
        setPersons(persons.concat(existingPersons));
        setNewName("");
        setNewNumber("");
      });
    }
  };
  console.log(notification);

  // filtering by name

  const filteredByName = persons.filter((person) =>
    person.name.toLowerCase().includes(search)
  );

  // searching for duplicate name
  const duplicateName = persons.map((person) => person.name).includes(newName);

  // searching for duplicate person
  const duplicatePerson = persons.filter((person) => person.name === newName);

  //searching for duplicate number
  const duplicateNumber = persons
    .map((person) => person.number)
    .includes(newNumber);

  // Recieving data from child component for deleting a person

  const deletePersonHandler = (persons) => {
    setPersons(persons);
  };

  return (
    <div>
      <Notification err={isError} message={notification} />
      <h2>Phonebook</h2>
      <Filter value={search} searchHandler={searchHandler} />
      <h2>Add a new</h2>
      <PersonForm
        addPersonHandler={addPersonHandler}
        nameValue={newName}
        numberValue={newNumber}
        nameHandler={nameHandler}
        numberHandler={numberHandler}
      />
      <h2>Numbers</h2>
      <Person persons={filteredByName} onDelete={deletePersonHandler} />
    </div>
  );
};

export default App;
