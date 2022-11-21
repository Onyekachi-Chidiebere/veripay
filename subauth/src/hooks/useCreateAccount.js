import { useState, useReducer } from 'react';
import axios from 'axios';
import { API_URL } from '../helper/appConstants';
import { useNavigate } from 'react-router-dom';
import publicIp from 'public-ip';
import zipCode from '../helper/zipCode';

const useCreateAccount = () => {
  //this serves all the services required for the create account page
  const [error, setError] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [companyData, setCompanyData] = useReducer(
    (state, nextState) => ({ ...state, ...nextState }),
    {
      country_id:'',
      country: '',
      state: '',
      city: '',
      email: '',
      country_code: '+234',
      phone: '',
      business_name: '',
      company_url: '',
      zip_code: '',
      address: '',
      institution_code: false,
      otp_code: '',
    }
  );

  let navigate = useNavigate();

  const handleChange = (value, name, number) => {
    //this handles all the inout update for all feilds
    if (number) {
      value = `${Number(value)}`;
      if (value === 'NaN') value = '';
    }
    setError(false);
    setCompanyData({ [name]: value });
  };

  let checkUrl = /^[A-Za-z]+$/;

  const sendCompanyDetails = async (data) => {
        // this sends the company details to the api

    try {
      setError(false);
      setLoading(true);
      //ensure that all required fields are supplied
      if (data.email === '') {
        setLoading(false);
        return setError('Please add email');
      }
      if (data.country_code === '') {
        setLoading(false);
        return setError('Please add country code');
      }
      if (data.phone === '') {
        setLoading(false);
        return setError('Please add company number');
      }

      //append 0 to the phonenumber to enable otp messaging
      let phone = data.phone;
      if (phone[0] !== '0') phone = '0' + data.phone;
      if (data.business_name === '') {
        setLoading(false);
        return setError('Please add company name');
      }
      if (data.company_url === '') {
        setLoading(false);
        return setError('Please add company url');
      }
      if (!data.company_url.match(  )) {
        setLoading(false);
        return setError('invalid company url');
      }

      //send request to server
      const response = await axios.post(`${API_URL}/create_account`, {...data,phone, email:data.email.trim()}, {
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
      console.log({response})
      const { code, message } = response.data.response;
      if (code === '00') {
        //update the institution code with the one received from the server
        handleChange(
          response.data.response.message.institution_code,
          'institution_code'
        );
        setLoading(false);
       
        return { institution_code: response.data.response.message.institution_code };
      }
      const { institution_code, signup_stage } = message;
      if (signup_stage == 1) {
            handleChange(
          institution_code,
          'institution_code'
        );
        setLoading(false);       
        return {institution_code};      
      }
       if (signup_stage == 2) {
            handleChange(
          institution_code,
          'institution_code'
        );
        setLoading(false);  
         setShowOtp(true);
       
         return { institution_code, otp:institution_code };      
       }
      if (signup_stage == 3) {
        setLoading(false)
         localStorage.setItem('@institution_code',institution_code)
        return navigate('/home');
      }
      if (signup_stage == 4) {
        setLoading(false)
        return setError('Account Exists Already!');
      }
      setLoading(false);
      setError(response.data.response.message);
      return false;
    } catch (error) {
      //handle error if any occurs
      console.log({ error });
      setLoading(false);
      setError(error.message);
      return false;
    }
  };

  const sendLocationDetails = async (data) => {
    //sends location details to the server
    try {
      setLoading(true);
      setError(false);

      //ensure that all required fields are provided
      if (data.country === '') {
        setLoading(false);
        return setError('Please select country');
      }
      if (data.state === '') {
        setLoading(false);
        return setError('Please select state');
      }
      if (data.city === '') {
        setLoading(false);
        return setError('Please select city');
      }
      if (data.zip_code === '') {
        setLoading(false);
        return setError('Please add zip code');
      }
      //use this to debug the zipcode part


      // console.log({Id:data.country_id, zipId:zipCode[data.country_id],zip:data.zip_code, data})
      // parseInt(data.zip_code)
      // let checkZipCode = new RegExp(zipCode[data.country_id])
      // if (!data.zip_code.match(checkZipCode)) {
      //   setLoading(false)
      //   return setError('zip code not match')
      // }
      // setLoading(false)
      // return setError('passed');
      if (data.address === '') {
        setLoading(false);
        return setError('Please add address');
      }

      //send request to server
      const response = await axios.post(
        `${API_URL}/create_company_location_info`,
        data,
        {
          headers: { 'Access-Control-Allow-Origin': '*' },
        }
      );

      const { code } = response.data.response;
      if (code === '00') {
        //handle response and show otp
        setLoading(false);
        setShowOtp(true);
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

  const verifyOtp = async (data) => {
    //sends verify otp request to server
    try {
      setOtpLoading(true);
      setError(false);
      //endsures otp is provided
      if (data.otp === '') {
        setOtpLoading(false);
        return setError('Please otp');
      }
      //sends request to server
      const response = await axios.post(`${API_URL}/account_validation`, data, {
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
      const { code } = response.data.response;
      if (code === '00') {
        //saves business name and institution code to local storage to be used for create password page
        localStorage.setItem('@institution_code', companyData.institution_code);
        localStorage.setItem(
          '@institution_business_name',
          companyData.business_name
        );
        localStorage.removeItem('@recovered_otp_code')
        setOtpLoading(false);
        setShowOtp(false);
        navigate('/home');
        return true;
      }

      setOtpLoading(false);
      setError(response.data.response.message);
    } catch (error) {
      //handle error if any occurs
      console.log({ error });
      setLoading(false);
      setOtpLoading(false);
      setError(error.message);
    }
  };

  const getCountry = async () => {
    //get user current country to update the default country
    try {
      let ip = await publicIp.v4();
      const response = await axios.post(
        `${API_URL}/get_country`,
        { ip },
        {
          headers: { 'Access-Control-Allow-Origin': '*' },
        }
      );
      const { code } = response.data.response;
      if (code === '00') {
        return response.data.response.message;
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const resendOtp = async (institution_code) => {
    //handles the resend otp
    setOtpLoading(true);
    console.log({ institution_code })
    try {
      //sends request to server and handles the response
      const response = await axios.post(
        `${API_URL}/resend_account_validation_code`,
        { institution_code } ,
        {
          headers: { 'Access-Control-Allow-Origin': '*' },
        }
      );
      const { code } = response.data.response;
      if (code === '00') {
        setOtpLoading(false);
        setLoading(false);
        return true;
      }
      setOtpLoading(false);
      // setShowOtp(false);
      setLoading(false);
      console.log({response})
      setError(response.data.response.message);
    } catch (error) {
      //handle the error if any occurs
      // setShowOtp(false);
      console.log({ error });
      setLoading(false);
      setError(error.message);
    }
  };
  return {
    loading,
    showOtp,
    companyData,
    error,
    otpLoading,
    setShowOtp,
    verifyOtp,
    resendOtp,
    setError,
    getCountry,
    handleChange,
    sendCompanyDetails,
    sendLocationDetails,
  };
};
export default useCreateAccount;
