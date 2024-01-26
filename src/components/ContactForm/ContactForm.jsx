import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { getContactsItems, addContact } from '../../redux/ContactListSlice';

import  css from '../../components/ContactForm/ContactForm.module.css';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContactsItems);

  const handleSubmit = e => {
    e.preventDefault();

    const newName = e.target.elements.name.value;
    const newNumber = e.target.elements.number.value;

    // Перевірка на унікальність імені
    if (contacts.some(contact => contact.name === newName)) {
      return alert(`${newName} is already in contacts`);
    }

    // Перевірка на унікальність номеру телефону
    if (contacts.some(contact => contact.number === newNumber)) {
      return alert(`${newNumber} is already in contacts`);
    }

    const newObj = {
      id: nanoid(),
      name: newName,
      number: newNumber,
    };

    dispatch(addContact(newObj));

    e.target.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className={css.lable}>
          Name
          <input
            className={css.contact_inp}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className="lable">
          Number
          <input
            className={css.contact_inp}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={css.sabmit_contact} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
};

export default ContactForm;