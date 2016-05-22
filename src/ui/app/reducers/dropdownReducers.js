const dropdownReducer = (state = 'none', action) => {
  switch (action.type) {
    case 'OPEN_DROPDOWN':
      if (state === action.dropdown) {
        return 'none';
      }
      return action.dropdown;
    default:
      return state;
  }
};

export default { dropdownReducer };
