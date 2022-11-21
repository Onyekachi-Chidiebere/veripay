import { useState, useReducer } from 'react';
import axios from 'axios';
import { API_URL } from '../helper/appConstants';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const useLogin = () => {
  //this handles all the services required in login page
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [moveTo, setMoveTo] = useState(false)
  const [successful, setSuccessful] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState(false);
  const [loginData, setLoginData] = useReducer(
    (state, nextState) => ({ ...state, ...nextState }),
    {
      password: '',
      email: '',
    }
  );

  let navigate = useNavigate();

  const handleChange = (value, name) => {
    //this hadndle all update in input fields
    setError(false);
    setLoginData({ [name]: value });
  };
  const handleSubmit = (data) => {
    //this handles the submit request sent
    if (verifiedEmail) return sendPassword(data);
    return sendEmail(data);
  };

  const sendEmail = async (data) => {
    //this handles sending the email to the server
    try {
      setLoading(true);
      //ensure email is provided
      if (data.email === '') {
        setLoading(false);
        return setError('Please add email');
      }
      //send response to server
      const response = await axios.post(`${API_URL}/login_email`, {password:data.password,
      email: data.email.trim(),}, {
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
      const { code } = response.data.response;
      console.log({response})
      if (code === '00') {
        //handle response if successful
        setVerifiedEmail(true);
        setLoading(false);
        return true;
      }
       if (code === 'E406') {
        //handle response if not complete
         setLoading(false);
         
          if (response.data.response.message.signup_stage == 1) {
           localStorage.setItem('@recovered_institution_code', response.data.response.message.institution_code)
           setMoveTo('/create');
           setError(response.data.response.message.message);
          }
         
          if (response.data.response.message.signup_stage == 2) {
           localStorage.setItem('@recovered_institution_code', response.data.response.message.institution_code)
           localStorage.setItem('@recovered_otp_code', response.data.response.message.institution_code)
           setMoveTo('/create');
           setError(response.data.response.message.message);
          }
         
         if (response.data.response.message.signup_stage == 3) {
           localStorage.setItem('@institution_code', response.data.response.message.institution_code)
           setMoveTo('/home');
           setError(response.data.response.message.message);
         }
         
        return true;
      }
      setLoading(false);
      setError(response.data.response.message);
    } catch (error) {
      //handle error if any occurs
      console.log({ error });
      setLoading(false);
      setError(error.message);
    }
  };

  function parseJwt(token) {
    //this decodes the jwt received from server
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  const sendPassword = async (data) => {
    //this sends the password to the server
    try {
      setLoading(true);
      //endure password is provided
      if (data.password === '') {
        setLoading(false);
        return setError('Please add password');
      }
      //send request to server
      const response = await axios.post(`${API_URL}/login_password`, {email:data.email.trim(), password:data.password}, {
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
      const { code } = response.data.response;
      console.log({code})
      if (code === '00') {
        //on successful save token and user data in local storage
        localStorage.setItem(
          '@veripay_token',
          response.data.response.message.access_token
        );

        let jwtData = await parseJwt(
          response.data.response.message.access_token
        );

        localStorage.setItem('@veripay_user', JSON.stringify(jwtData.sub));
       
        setLoading(false);
        if (jwtData.sub.setup== 0) {
          //send user to setup page if user is new
          navigate('/dashboard/setup');
        } else {
          navigate('/dashboard');
        }

        return true;
      }
      if (code === 'E300') {
        console.log({response})
        localStorage.setItem(
          '@veripay_institution_code',
          response.data.response.message.institution_code
        );
        setLoading(false);
          Swal.fire({
        title: 'Email Confirmation Required!',
        text:'Please click Ok and follow the instructions to activate your account',
        icon: 'question',
        confirmButtonText: 'Ok',
        customClass: {
          confirmButton:'swal-confirm'
        }
          }).then((sw) => {
            if(sw.isConfirmed)
            navigate('/verify-email')
          })
        return;
      }
      setLoading(false);
      setError(response.data.response.message);
    } catch (error) {
      //handkle error if any occurs
      console.log({ error });
      setLoading(false);
      setError(error.message);
    }
  };

  const verifyEmail = async () => {
    //this handles sending the email to the server
    try {
      let institution_code=localStorage.getItem('@veripay_institution_code')
      setLoading(true);
      
      //send response to server
      const response = await axios.put(`${API_URL}/account_validation`, {institution_code}, {
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
      const { code } = response.data.response;
      console.log({response})
      if (code === '00') {
        //handle response if successful
           Swal.fire({
        title: 'Success!',
        text:'Activation link sent',
        icon: 'success',
        confirmButtonText: 'Ok',
        customClass: {
          confirmButton:'swal-confirm'
        }
    })
     setLoading(false)
        return true;
      }
      
        Swal.fire({
        title: 'Error!',
        text:'Unable to send link',
        icon: 'error',
        confirmButtonText: 'Ok',
        customClass: {
          confirmButton:'swal-confirm'
        }
    })
      setLoading(false);
      setError(response.data.response.message);
    } catch (error) {
      //handle error if any occurs
        Swal.fire({
        title: 'Error!',
        text:'Unable to send link',
        icon: 'error',
        confirmButtonText: 'Ok',
        customClass: {
          confirmButton:'swal-confirm'
        }
    })
      console.log({ error });
      setLoading(false);
      setError(error.message);
    }
  };

  return {
    loading,
    successful,
    loginData,
    error,
    verifiedEmail,
    moveTo,
    verifyEmail,
    setMoveTo,
    handleChange,
    handleSubmit,
    setError,
  };
};
export default useLogin;
