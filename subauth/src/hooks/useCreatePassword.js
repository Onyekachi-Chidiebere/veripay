import { useState, useReducer } from 'react';
import axios from 'axios';
import { API_URL } from '../helper/appConstants';
import { useNavigate } from 'react-router-dom';
const useCreatePassword = () => {
  //this hook handles all the services required in the mandatory create password page
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [passwordData, setPasswordData] = useReducer(
    (state, nextState) => ({ ...state, ...nextState }),
    {
      npassword: '',
      confirm_password: '',
      //get institution code as saved during account creation
      institution_code: localStorage.getItem('@institution_code'),
    }
  );

  const handleChange = (value, name) => {
    //this handles the the update for input fields
    setError(false);
    setPasswordData({ [name]: value });
  };

  const sendPassword = async (data) => {
    //this sends the user passward to the server
    const { npassword, institution_code } = data;
    try {
      setLoading(true);
      //ensure all required fields are provided
      if (data.password === '') {
        setLoading(false);
        return setError('Please add password');
      }
      if (data.confirm_password === '') {
        setLoading(false);
        return setError('Please add confirm password');
      }
      if (data.npassword !== data.confirm_password) {
        setLoading(false);
        return setError('passwords do not match');
      }
      if (data.business_name === '') {
        setLoading(false);
        return setError('Please add company name');
      }

      //send request to server
      const response = await axios.post(
        `${API_URL}/institution_admin_password`,
        { password: npassword, institution_code },
        {
          headers: { 'Access-Control-Allow-Origin': '*' },
        }
      );
      const { code } = response.data.response;
      console.log({ response });
      if (code === '00') {
        setLoading(false);
        setSuccessful(true);
        //remove data store in localstorage used to render page
        localStorage.removeItem('@institution_code');
        localStorage.removeItem('@institution_business_name');

        return true;
      }
      setLoading(false);
      setError(response.data.response.message);
    } catch (error) {
      //handle error if any
      console.log({ error });
      setLoading(false);
      setError(error.message);
    }
  };

  return {
    loading,
    showOtp,
    successful,
    passwordData,
    error,
    setShowOtp,
    setError,
    setSuccessful,
    handleChange,
    sendPassword,
  };
};
export default useCreatePassword;
