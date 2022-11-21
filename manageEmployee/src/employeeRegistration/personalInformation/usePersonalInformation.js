import axios from 'axios';
import { useEffect, useState } from 'react';
import states from '../../components/data/states';
import Swal from 'sweetalert2';
import { API_URL } from '../../helper/appConstants';
import moment from 'moment';
import { useNavigate } from "react-router-dom";
const usePersonalInformation = ({ state }) => {
  const navigate = useNavigate();
  const [staffType, setStaffType] = useState([]);
  const jwt = localStorage.getItem('@veripay_token');
  const company = JSON.parse(localStorage.getItem('@veripay_user'));
  const [loading, setLoading] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    verificationNo: '',
    employmentNo: state ? state.employee_code : '',
    surname: state ? state.surname : '',
    firstname: state ? state.firstname : '',
    middlename: state ? state.middlename : '',
    title: state ? { id: state.title } : {},
    staffType: {},
    dob: state ? moment(state.dob).format('yyyy-MM-DD') : '',
    maritalStatus: state ? { id: state.marital_status } : {},
    gender: state ? { id: state.gender } : {},
    nationality: state ? { id: state.nationality } : {},
    stateOfOrigin: { lgas: [] },
    lga: {},
    townOfOrigin: {},
    residentialState: { lgas: [] },
    residentialLga: {},
    residentialTown: {},
    number: state ? state.mobile_number : '',
    email: state ? state.email : '',
    rsaNumber: state ? state.rsa_number : '',
    licenseNumber: state ? state.driver_license_number : '',
    licenseExpiryDate: state
      ? moment(state.driver_license_expiry_date).format('yyyy-MM-DD')
      : '',
    nin: state ? state.nin : '',
    pensionFund: {},
    internationalPassportNumber: state
      ? state.international_passport_number
      : '',
    internationalPassportExpiryDate: state
      ? moment(state.international_passport_expiry_date).format('yyyy-MM-DD')
      : '',
  });

  const handleChange = (value, name) => {
    setPersonalInfo({
      ...personalInfo,
      [name]: value,
    });
  };

  useEffect(() => {
    (async () => {
      if (state) {
        try {
          const stateData = {};
          //get all select fields
          let staffTypeData = await getStaffType();
          if (staffTypeData) setStaffType(staffTypeData);
          for (let i = 0; i < staffTypeData.length; i++) {
            if (staffTypeData[i].staff_type_code === state.staff_type) {
              stateData.staffType = staffTypeData[i];
            }
          }

          for (let i = 0; i < states.length; i++) {
            if (
              states[i].state.toLowerCase() ==
              state.state_of_origin.toLowerCase()
            ) {
              for (let j = 0; j < states[i].lgas.length; j++) {
                if (
                  states[i].lgas[j].toLowerCase() == state.lga.toLowerCase()
                ) {
                  stateData.lga = { id: states[i].lgas[j] };
                  stateData.stateOfOrigin = states[i];
                }
              }
            }
          }

          for (let i = 0; i < states.length; i++) {
            if (
              states[i].state.toLowerCase() ==
              state.residential_state.toLowerCase()
            ) {
              for (let j = 0; j < states[i].lgas.length; j++) {
                if (
                  states[i].lgas[j].toLowerCase() ==
                  state.residential_lga.toLowerCase()
                ) {
                  stateData.residentialLga = { id: states[i].lgas[j] };
                  stateData.residentialState = states[i];
                }
              }
            }
          }
          setPersonalInfo({
            ...personalInfo,
            ...stateData,
          });
        } catch (error) {
          console.log({ error });
        }
      }
    })();
  }, []);
  const getStaffType = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/staff_type?institution_code=${company.institution_code}`,

        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (response.data.response.code === '00') {
        return response.data.response.message.data;
      }
      Swal.fire({
        title: 'Error!',
        text: 'Unable to get data',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return false;
    } catch (error) {
      console.log({ error });
      Swal.fire({
        title: 'Error!',
        text: 'Unable to get data',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return false;
    }
  };

  const generateEmployeeCode = async () => {
    try {
      //check if employee code has already been genrated;
      if(personalInfo.employmentNo.trim()) return;
      const response = await axios.get(
        `${API_URL}/generate_employee_code?institution_code=${company.institution_code}`,

        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (response.data.response.code === '00') {
        localStorage.setItem(
          '@veripay_employee_code',
          response.data.response.message.employee_code
        );
        return handleChange(response.data.response.message.employee_code,'employmentNo')
      }
      Swal.fire({
        title: 'Error!',
        text: 'Unable to generate code',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return false;
    } catch (error) {
      console.log({ error });
      Swal.fire({
        title: 'Error!',
        text: 'Unable to generate code',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return false;
    }
  };
  const submitPersonalinfo = async () => {
    try {
      //ensure required data is provided

      if (!personalInfo.surname) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please provide surname',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (!personalInfo.firstname) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please provide first name',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (!personalInfo.title.id) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please select title',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (!personalInfo.staffType.staff_type_name) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please select staff type',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (!personalInfo.dob) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please provide date of birth',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (!personalInfo.maritalStatus.id) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please select marital status',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (!personalInfo.gender.id) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please select gender',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (!personalInfo.nationality.id) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please select nationality',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (!personalInfo.stateOfOrigin.state) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please select state',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (!personalInfo.lga.id) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please select local governament of origin',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (!personalInfo.residentialState.state) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please select residential state',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (!personalInfo.residentialLga.id) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please select residential LGA',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (!personalInfo.number) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please provide mobile number',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (!personalInfo.email) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please provide email',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (!personalInfo.pensionFund.id) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please Select pension fund',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      setLoading(true)
      const response = await axios.post(
        `${API_URL}/employee_personal_info`,
        {
          institution_code: company.institution_code,
          employee_code: personalInfo.employmentNo,
          surname: personalInfo.surname.trim(),
          firstname: personalInfo.firstname.trim(),
          middlename: personalInfo.middlename.trim(),
          staff_type: personalInfo.staffType.staff_type_code,
          title: personalInfo.title.id,
          dob: personalInfo.dob,
          marital_status: personalInfo.maritalStatus.id,
          gender: personalInfo.gender.id,
          nationality: personalInfo.nationality.id,
          state_of_origin: personalInfo.stateOfOrigin.state,
          lga: personalInfo.lga.id,
          city: personalInfo.townOfOrigin.id,
          residential_state: personalInfo.residentialState.state,
          residential_lga: personalInfo.residentialLga.id,
          residential_city: personalInfo.residentialTown.id,
          mobile_number: personalInfo.number,
          email: personalInfo.email.trim(),
          pension_fund_administrator: personalInfo.pensionFund.id,
          rsa_number: personalInfo.rsaNumber,
          driver_license_number: personalInfo.licenseNumber,
          driver_license_expiry_date: personalInfo.licenseExpiryDate,
          nin: personalInfo.nin,
          international_passport_number:
            personalInfo.internationalPassportNumber,
          international_passport_expiry_date:
            personalInfo.internationalPassportExpiryDate,
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setLoading(false)
      console.log({response})
      if(response.data.response.code=='00'){
      return  Swal.fire({
          title: 'Success!',
          text: 'Employee information saved!',
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(()=>{
          navigate('/dashboard/operations/hr/employee-registration/next-of-kin')
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
      Swal.fire({
        title: 'Error!',
        text: 'Unable to register Employee',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  return {
    loading,
    states,
    personalInfo,
    staffType,
    handleChange,
    getStaffType,
    generateEmployeeCode,
    submitPersonalinfo,
  };
};

export default usePersonalInformation;
