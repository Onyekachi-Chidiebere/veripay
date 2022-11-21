import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import Swal from 'sweetalert2';
import { API_URL } from '../helper/appConstants';

const useStaffType = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [staffTypes, setStaffTypes] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const jwt = localStorage.getItem('@veripay_token');
  const company = JSON.parse(localStorage.getItem('@veripay_user'));

  const [staffData, setStaffData] = useReducer(
    (state, nextState) => ({ ...state, ...nextState }),
    {
      institution: { business_name: null },
      staff_type_name: 'Awusa',
      staff_type_code: null,
    }
  );
  const handleChange = (value, name) => {
    //this hadndles all update in input fields
    setError(false);
    setStaffData({ [name]: value });
  };
  const selectInstitution = (institution) => {
    console.log({ institution });
    handleChange(institution, 'institution');
  };

  const createStaffType = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/staff_type`,
        {
          institution_code: company.institution_code,
          staff_type_name: staffData.staff_type_name.trim(),
          //find out where this data comes from
          entered_by: company.admin_code,
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setLoading(false);
      if (response.data.response.code === '00') {
        return Swal.fire({
          title: 'Success!',
          text: response.data.response.message.message,
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(() => {
          if (response.data.response.message.data)
            setStaffTypes((old) => [
              ...old,
              response.data.response.message.data,
            ]);
          setShowAdd(false);
        });
      }
      Swal.fire({
        title: 'Error!',
        text: response.data.response.message.message,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const updateStaffType = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${API_URL}/staff_type`,
        {
          institution_code: company.institution_code,
          staff_type_name: staffData.staff_type_name.trim(),
          staff_type_code: staffData.staff_type_code,
          //find out where this data comes from
          entered_by: company.admin_code,
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setLoading(false);
      console.log({ hhh: response.data.response.message.data });
      if (response.data.response.code === '00') {
        return Swal.fire({
          title: 'Success!',
          text: response.data.response.message.message,
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(() => {
          if (response.data.response.message.data)
            setStaffTypes((old) =>
              //loop through and update the array
              old.map((data) =>
                data.staff_type_code ===
                response.data.response.message.data.staff_type_code
                  ? response.data.response.message.data
                  : data
              )
            );
          setShowAdd(false);
        });
      }
      Swal.fire({
        title: 'Error!',
        text: response.data.response.message.message,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const deleteStaffType = async (staff_type_code) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${API_URL}/staff_type?institution_code=${company.institution_code}&staff_type_code=${staff_type_code}&entered_by=${company.admin_code}}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setLoading(false);

      console.log({ response: response.data.response });
      if (response.data.response.code === '00') {
        setStaffTypes((old) =>
          old.filter((data) => data.staff_type_code !== staff_type_code)
        );
        return Swal.fire({
          title: 'Success!',
          text: response.data.response.message.message,
          icon: 'success',
          confirmButtonText: 'Ok',
        });
      }
      return Swal.fire({
        title: 'Error!',
        text: response.data.response.message.message,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const getStaffType = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/staff_type?institution_code=${company.institution_code}`,

        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      setStaffTypes(response.data.response.message.data);
      setLoading(false);
    } catch (error) {
      console.log({ error });
      Swal.fire({
        title: 'Error!',
        text: 'Netowrk Error',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  const getInstitutions = async () => {
    try {
      //get staff types from server;
      const response = await axios.get(
        `${API_URL}/institution?institution_code=${company.institution_code}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const { code, message } = response.data.response;
      console.log({ response, message });

      //update if response is successful
      if (code === '00') {
        setInstitutions(message.all_institutions);
        setLoading(false);
        return true;
      }
      setLoading(false);
      setError(message);
      return false;
    } catch (error) {
      //handle error response
      setLoading(false);
      setError(error.message);
      console.log({ error });
      return false;
    }
  };
  return {
    //export required services
    loading,
    institutions,
    error,
    success,
    staffTypes,
    handleChange,
    getInstitutions,
    setError,
    updateStaffType,
    selectInstitution,
    deleteStaffType,
    setSuccess,
    staffData,
    createStaffType,
    setShowAdd,
    getStaffType,
    showAdd,
  };
};
export default useStaffType;
