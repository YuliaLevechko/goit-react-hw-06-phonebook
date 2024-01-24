import { useDispatch, useSelector } from 'react-redux';
import { setFilter, getFilterValue } from '../../redux/FilterSlice';
import PropTypes from 'prop-types';

import css from  '../../components/Filter/Filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(getFilterValue);
  return (
    <>
      <p className={css.filter_text}>Find contacts by name</p>
      <label className={css.Filter_Todo}>
        <input
          type="text"
          className={css.filter_inp}
          value={filterValue}
          onChange={e => dispatch(setFilter(e.currentTarget.value))}
        />
      </label>
    </>
  );
};
export default Filter;

Filter.propTypes = {
  value: PropTypes.string,
  // onChange: PropTypes.func.isRequired,
};