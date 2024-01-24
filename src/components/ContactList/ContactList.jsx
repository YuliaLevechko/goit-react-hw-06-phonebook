import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/ContactListSlice';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { getContactsItems } from '../../redux/ContactListSlice';
import { getFilterValue } from '../../redux/FilterSlice';


import  css from '../../components/ContactList/ContactList.module.css';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContactsItems);
  const filterValue = useSelector(getFilterValue);

  const getFilteredContacts = useMemo(() => () => {
    const normalizedFilter = filterValue.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }, [contacts, filterValue]);

  const filteredContacts = getFilteredContacts();
  return (
    <ul className={css.contact_list}>
      {  filteredContacts &&  filteredContacts.map(({ id, name, number }) => {
        return (
          <li className={css.contact_item} key={id}>
            <p className={css.contact__text}>{name}</p>
            <p className={css.contact__text}>{number}</p>
            <button className={css.btn}  onClick={() => dispatch(deleteContact({id: id}))}>
              Видалити
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  // OnDelite: PropTypes.func.isRequired,
};