import axios from 'axios';
import { useReducer, useState } from 'react';
import Swal from 'sweetalert2';
import { API_URL } from '../helper/appConstants';

const useRetirementPolicy = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [staffTypes, setStaffTypes] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [policies, setPolicies] = useState([]);
  const jwt = localStorage.getItem('@veripay_token');
  const [showAddPolicy, setShowAddPolicy] = useState(false);
  const company = JSON.parse(localStorage.getItem('@veripay_user'));

  const [staffData, setStaffData] = useReducer(
    (state, nextState) => ({ ...state, ...nextState }),
    {
      institution: { business_name: null },
      staffType: { staff_type_name: '' },
      max_age: '',
      service_years: '',
      retirement_policy_code: null,
    }
  );

  const handleChange = (value, name) => {
    //this hadndles all update in input fields
    setError(false);
    setStaffData({ [name]: value });
  };
  const selectInstitution = (institution) => {
    handleChange(institution, 'institution');
  };
  const selectStaffType = (type) => {
    console.log({ type });
    handleChange(type, 'staffType');
  };

  const createRetirementPolicy = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/retirement_policy`,
        {
          institution_code: company.institution_code,
          max_retirement_age: staffData.max_age,
          active_service_years: staffData.service_years,
          staff_type_code: staffData.staffType.staff_type_code,
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
      console.log({ responseq: response.data });
      if (response.data.response.code == '00') {
        setPolicies((old) => [...old, response.data.response.message.data]);
        setLoading(false);
        return Swal.fire({
          title: 'Success!',
          text: response.data.response.message.message,
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(() => setShowAddPolicy(false));
      }
      setLoading(false);
      return Swal.fire({
        title: 'Error!',
        text: response.data.response.message.message,
        icon: 'error',
        confirmButtonText: 'Ok',
      }).then(() => setShowAddPolicy(false));
    } catch (error) {
      setLoading(false);
      console.log({ error });
    }
  };

  const updateRetirementPolicy = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${API_URL}/retirement_policy`,
        {
          institution_code: company.institution_code,
          max_retirement_age: staffData.max_age,
          active_service_years: staffData.service_years,
          staff_type_code: staffData.staffType.staff_type_code,
          retirement_policy_code: staffData.retirement_policy_code,
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
      console.log({ responseq: response.data });

      if (response.data.response.code == '00') {
        setPolicies((old) =>
          old.map((data) =>
            //check and effect the update
            data.retirement_policy_code ==
            response.data.response.message.data.retirement_policy_code
              ? response.data.response.message.data
              : data
          )
        );
        setLoading(false);
        return Swal.fire({
          title: 'Success!',
          text: response.data.response.message.message,
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(() => setShowAddPolicy(false));
      }
      setLoading(false);
      return Swal.fire({
        title: 'Error!',
        text: response.data.response.message.message,
        icon: 'error',
        confirmButtonText: 'Ok',
      }).then(() => setShowAddPolicy(false));
    } catch (error) {
      setLoading(false);
      console.log({ error });
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

  const getStaffType = async () => {
    try {
      console.log('getting staff type');
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

      console.log({ response });
      setLoading(false);
      if (response.data.response.code == '00') {
        return setStaffTypes(response.data.response.message.data);
      }
      Swal.fire({
        title: 'Error!',
        text: response.data.response.message,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
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

  const deletePolicy = async (retirement_policy_code) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${API_URL}/retirement_policy?institution_code=${company.institution_code}&retirement_policy_code=${retirement_policy_code}&entered_by=9b2b233117}`,
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
        setPolicies((old) =>
          old.filter(
            (data) => data.retirement_policy_code !== retirement_policy_code
          )
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

  const getPolicies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/retirement_policy?institution_code=${company.institution_code}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log({ response });
      setLoading(false);
      if (response.data.response.code == '00') {
        return setPolicies(response.data.response.message.data);
      }
      Swal.fire({
        title: 'Error!',
        text: response.data.response.message,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
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
  return {
    //export required services
    loading,
    institutions,
    error,
    success,
    staffTypes,
    policies,
    handleChange,
    getInstitutions,
    setError,
    selectInstitution,
    getStaffType,
    setSuccess,
    staffData,
    showAddPolicy,
    setShowAddPolicy,
    deletePolicy,
    getPolicies,
    createRetirementPolicy,
    updateRetirementPolicy,
    selectStaffType,
  };
};
export default useRetirementPolicy;
