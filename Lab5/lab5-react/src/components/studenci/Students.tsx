// eslint-disable-next-line
import styles from './table.module.css';

interface Student {
  name: string,
  lastName: string,
  year: number
};

const studentArr: Student[] = [
    { name: 'Jan', lastName: 'Nowak', year: 24 },
    { name: 'Adam', lastName: 'Kowal', year: 23 },
    { name: 'Bartek', lastName: 'Kowalski', year: 25 }
  ];

function Students() {
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
      </table>
    </>
  );
}

export default Students;
