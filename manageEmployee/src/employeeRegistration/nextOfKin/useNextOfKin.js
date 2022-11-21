import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { API_URL } from '../../helper/appConstants';
import { useNavigate } from "react-router-dom";

const useNextOfKin = ({state}) => {
  const navigate = useNavigate();
  const code = localStorage.getItem('@veripay_employee_code');
  const [loading, setLoading] = useState(false);
  const jwt = localStorage.getItem('@veripay_token');
  const company = JSON.parse(localStorage.getItem('@veripay_user'));
  const relationship = [
    { id: 'Father' },
    { id: 'Mother' },
    { id: 'Brother' },
    { id: 'Sister' },
    { id: 'Wife' },
    { id: 'Husband' },
  ];

  const gender = [{ id: 'Male' }, { id: 'Female' }];
  
  const [data, setData] = useState({
    surname: '',
    firstname: '',
    middlename: '',
    relationship: {},
    gender: {},
  });

  useEffect(()=>{(async()=>{
    if(state){
      const {next_of_kin_data} = state;

      const stateDate = {}
      //get all edit data;
      stateDate.surname = next_of_kin_data.next_of_kin_surname;
      stateDate.middlename = next_of_kin_data.next_of_kin_middlename;
      stateDate.firstname = next_of_kin_data.next_of_kin_firstname;
      for(let i= 0; i<relationship.length; i++){
        if(relationship[i].id.toLowerCase() == next_of_kin_data.relationship.toLowerCase()){
          stateDate.relationship = relationship[i]
        }
      }
      for(let i =0; i<gender.length; i++){
        if(gender[i].id.toLowerCase() === next_of_kin_data.gender.toLowerCase()){
          stateDate.gender = gender[i]
        }
      }
      setData({...data,...stateDate})
    }
  })()},[])

  const handleChange = (value, name) => setData({ ...data, [name]: value });
  const goBack =()=>navigate(-1)

  const submitNextOfKinData = async () => {
    try {
      //ensure required fileds are provided;
      if (!data.surname) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please provide next of kin surname',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (!data.firstname) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please provide next of kin firstname',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (!data.relationship.id) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please select next of kin relationship',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      setLoading(true)
      const response = await axios.post(
        `${API_URL}/employee_next_of_kin`,
        {
          institution_code: company.institution_code,
          employee_code: code,
          next_of_kin_surname: data.surname.trim(),
          next_of_kin_firstname: data.firstname.trim(),
          next_of_kin_middlename: data.middlename.trim(),
          relationship: data.relationship.id,
          gender: data.gender.id,
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setLoading(false)
      if(response.data.response.code=='00'){
      return  Swal.fire({
          title: 'Success!',
          text: 'Next of Kin information saved!',
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(()=>{
          navigate('/dashboard/operations/hr/employee-registration/education')
        }); 
      }
      return Swal.fire({
        title:'Error!',
        text:response.data.response.message,
        icon:'error',
        confirmButtonText:'Ok'
      })
    } catch (error) {
      setLoading(false)
      console.log({ error });
      return Swal.fire({
        title: 'Error!',
        text: 'Unable to save data',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };
  return {
    data,
    relationship,
    gender,
    loading,
    goBack,
    handleChange,
    submitNextOfKinData,
  };
};

export default useNextOfKin;
