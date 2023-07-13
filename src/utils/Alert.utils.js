export const showAlert = (message, type) => {
  setAlert({ msg: message, type: type });
  setTimeout(() => {
    setAlert(null);
  }, 1500);
};
