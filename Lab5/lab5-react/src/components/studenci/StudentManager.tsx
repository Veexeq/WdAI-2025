// eslint-disable-next-line
import styles from './table.module.css';
import { useState } from 'react';

interface Student {
  name: string,
  lastName: string,
  year: number
};

const initialStudents: Student[] = [
    { name: 'Jan', lastName: 'Nowak', year: 24 },
    { name: 'Adam', lastName: 'Kowal', year: 23 },
    { name: 'Bartek', lastName: 'Kowalski', year: 25 }
  ];

function Students() {

  const [studentArr, setStudentArr] = useState(initialStudents);

  const [firstName, setFirstName] = useState('');
  const firstNameInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const [lastName, setLastName] = useState('');
  const lastNameInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const [year, setYear] = useState('');
  const yearInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value);
  };

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setYear('');
  };

  const addStudentHandler = (e: React.FormEvent) => {
    e.preventDefault();

    // First of all, check whether all fields have been filled
    if (firstName === '' || lastName === '' || year === '') {
      alert('All fields must be filled in');
      clearForm();
      return;
    }

    // Check whether the year is number
    const yearNumber = Number(year);

    if (Number.isNaN(yearNumber)) {
      alert('The year must be a number');
      clearForm();
      return;
    }

    // All conditions are fulfilled, update the state
    const newStudent: Student = {name: firstName, lastName: lastName, year: yearNumber};
    setStudentArr(prevState => ([...prevState, newStudent]));
    clearForm();
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Rocznik</th>
          </tr>
        </thead>
        <tbody>
          {
            studentArr.map(student => ( 
              <tr key={student.name + student.lastName}>
                <td>{student.name}</td>
                <td>{student.lastName}</td>
                <td>{student.year}</td>
              </tr>
            ))
          }
        </tbody>
      </table><br />
      <form onSubmit={addStudentHandler}>
        <label htmlFor='firstName'>Enter student's first name:</label><br />
        <input type='text' id='firstName' onChange={firstNameInputHandler} value={firstName}/><br />
        <label htmlFor='lastName'>Enter student's last name:</label><br />
        <input type='text' id='lastName' onChange={lastNameInputHandler} value={lastName}/><br />
        <label htmlFor='year'>Enter student's year:</label><br />
        <input type='text' id='year' onChange={yearInputHandler} value={year}/><br />
        <button type='submit'>Add this student</button>
      </form>
    </>
  );
}

export default Students;
