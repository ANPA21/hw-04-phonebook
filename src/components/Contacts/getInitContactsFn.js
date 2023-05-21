const LS_KEY = 'contacts';

export const getInitContacts = () => {
  const existingContacts = localStorage.getItem(LS_KEY);
  if (existingContacts !== null) {
    return JSON.parse(existingContacts);
  } else {
    return [];
  }
};
