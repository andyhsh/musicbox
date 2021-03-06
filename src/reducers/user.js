const userInitialState = {
  displayName: 'Anonymous',
  uid: '',
  isUserSignedIn: false,
  hasError: false,
  errorMessage: '',
};

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      return {
        displayName: action.payload.displayName,
        uid: action.payload.uid,
        isUserSignedIn: true,
        hasError: false,
        errorMessage: '',
      };
    case 'SIGN_IN_ERROR':
      return {
        ...state,
        hasError: true,
        errorMessage: action.payload,
      };
    case 'SIGN_OUT_SUCCESS':
      return {
        ...state,
        displayName: 'Anonymous',
        uid: '',
        isUserSignedIn: false,
      };
    case 'SIGN_OUT_ERROR':
      return {
        ...state,
        hasError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
