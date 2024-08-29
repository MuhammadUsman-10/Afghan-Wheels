import { useState } from 'react';
import axios from 'axios';

function useUserProfile() {
    const [error, setError] = useState(null);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo?.token;

    const updateUser = async (userData) => {
        try {
            const response = await axios.put('http://localhost:4000/api/user/profile', userData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const updatedUserInfo = {
                ...userInfo,
                ...response.data, // assuming the response contains the updated user data
            };

            // Update localStorage with the updated user information
            localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
            return response.data;
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    return { error, updateUser };
}

export default useUserProfile;
