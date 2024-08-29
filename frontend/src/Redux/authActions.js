import axios from 'axios';
// actions/authActions.js
export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user,
  });
  
  export const clearUser = () => ({
    type: 'CLEAR_USER',
  });
  

  // actions/authActions.js
export const validateToken = () => async (dispatch) => {
    try {
      const response = await axios.get('http:localhost:4000/api/validate-token', { withCredentials: true });
      if (response.status === 200) {
        dispatch(setUser(response.data));
      } else {
        dispatch(clearUser());
      }
    } catch (error) {
      dispatch(clearUser());
    }
  };