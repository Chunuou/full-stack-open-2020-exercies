const PersonForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <div>
      name:
      {' '}
      <input value={props.name} onChange={props.handleName} />
      <br />
      number:
      {' '}
      <input value={props.number} onChange={props.handleNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
