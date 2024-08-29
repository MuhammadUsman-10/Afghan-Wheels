import axios from 'axios';
import { USER_LOGIN_SUCCESS } from '../../Redux/userConstants'; // Adjust the import path accordingly

const checkUserSession = async (dispatch) => {
    // const dispatch = useDispatch();
    try {
        const { data } = await axios.get('http://localhost:4000/api/users', { withCredentials: true });

        // Dispatch the user data to restore the session in Redux
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        // Optionally store user data in localStorage for additional session persistence
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        console.error('Error restoring user session:', error);
        // Optionally handle errors, such as redirecting to a login page if session is invalid
    }
};

export default checkUserSession;
