import PropTypes from 'prop-types';
import { Wrapper } from './Filter.styled';

export const Filter = ({ filterByName }) => {
  const onInputChange = event => {
    filterByName(event.target.value);
  };
  return (
    <Wrapper>
      Filter contacts by name
      <input type="text" onChange={onInputChange}></input>
    </Wrapper>
  );
};

Filter.propTypes = {
  filterByName: PropTypes.func.isRequired,
};
