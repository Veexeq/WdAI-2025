function Ternary() {
  const a: boolean = true;
  const b: boolean = false;

  return (
    <>
      <div>
        <p>Stwierdzenie <b>a</b> jest {a ? 'prawdziwe' : 'fałszywe'}.</p>
      </div>
      <div>
        <p>Stwierdzenie <b>b</b> jest {b ? 'prawdziwe' : 'fałszywe'}.</p>
      </div>
    </>
  );
}

export default Ternary;
