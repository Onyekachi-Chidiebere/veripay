import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { API_URL } from '../../helper/appConstants';
import { useNavigate } from "react-router-dom";
const useBankInfo = ({state}) => {
  const navigate = useNavigate();
  const code = localStorage.getItem('@veripay_employee_code');
  const jwt = localStorage.getItem('@veripay_token');
  const company = JSON.parse(localStorage.getItem('@veripay_user'));
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    accountType: {},
    number: '',
    bankName: {},
    nubanName: 'System generated name',
    bvn: '',
  });
  const banks =[
    {name:'Access',id:1},
    {name:'United bank for Africa', id:2}
  ];

  const accountTypes = [
    {name:'current', id:1},
    {name:'savings',id:2}
  ]

  useEffect(()=>{

    (async()=>{
    if(state){
      const stateData = {};
      const {employment_bank_data} = state;

      //get all required fields;

      for (let i = 0; i < banks.length; i++) {
        if (banks[i].name === employment_bank_data.bank_name) {
          stateData.bankName = banks[i];
        }
      }
      for (let i = 0; i < accountTypes.length; i++) {
        if (accountTypes[i].name === employment_bank_data.account_type) {
          stateData.accountType = accountTypes[i];
        }
      }
      
      stateData.number = employment_bank_data.account_number;
      stateData.bvn = employment_bank_data.bvn;

      setData({
        ...data,
        ...stateData
      })
      
    }


    })()
  },[])
  const handleChange = (value, name) => setData({ ...data, [name]: value });
  const goBack =()=>navigate(-1)

  const submitBankInfo = async () => {
    try {
      //ensure required fields are provided;

      if (!data.accountType.name) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please select account type',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }

      if (!data.number) {
        return Swal.fire({
          title: 'Error!',
          text: 'Pleaswe provide account number',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if(!data.nubanName){
        return Swal.fire({
          title:'Error!',
          text:'name not verified',
          icon:'error',
          confirmButtonText:'Ok'
        })
      }

      setLoading(true)
      const response = await axios.post(
        `${API_URL}/employee_bank_info`,
        {
          institution_code: company.institution_code,
          employee_code: code,
          account_type: data.accountType.name,
          bank_name: data.bankName.name,
          account_number: data.number,
          account_name: data.nubanName,
          bvn: data.bvn,
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setLoading(false);
      if(response.data.response.code=='00'){
        return  Swal.fire({
            title: 'Success!',
            text: 'Employee Bank Information saved!',
            icon: 'success',
            confirmButtonText: 'Ok',
          }).then(()=>{
            navigate('/dashboard/operations/hr/employee-registration/complete')
          }); 
        }
        return Swal.fire({
          title:'Error!',
          text:response.data.response.message,
          icon:'error',
          confirmButtonText:'Ok'
        })

    } catch (error) {
      setLoading(false);
      console.log({ error });
      return Swal.fire({
        title: 'Error!',
        text: 'Server error',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };
  return { data, banks,accountTypes,handleChange, submitBankInfo, loading,goBack };
};

export default useBankInfo;
