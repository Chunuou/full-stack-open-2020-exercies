import { connect } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = () => {
  const handleChange = (event) => {
    const filter = event.target.value;
    setFilter(filter);
  };

  return (
    <div>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  setFilter,
};

export default connect(null, mapDispatchToProps)(Filter);
