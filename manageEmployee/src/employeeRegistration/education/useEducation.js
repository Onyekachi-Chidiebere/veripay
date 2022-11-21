import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { API_URL } from '../../helper/appConstants';
import { useNavigate } from "react-router-dom";

const useEducation = ({state}) => {
  const code = localStorage.getItem('@veripay_employee_code');
  const navigate = useNavigate();
  const jwt = localStorage.getItem('@veripay_token');
  const company = JSON.parse(localStorage.getItem('@veripay_user'));
  const [loading, setLoading] = useState(false);
  const [qualificationType, setQualificationType] = useState([])
  const qualifications = [
    { id: 'Masters', code:'d8f7f1241a' },
    { id: 'OND',code:'asadsklj' },
    { id: 'Degree', code:'kjkjasdfd' },
    { id: 'HND' ,code:'jjgdssss'},
  ];

  const [data, setData] = useState({
    qualficationType: {},
    schoolAttended: '',
    qualificationGrade: '',
    admissionYear: '',
    graduationYear: '',
  });

  useEffect(()=>{

    (async()=>{
    if(state){
      const stateData = {};
      const {education_education_data} = state;

      //get all required fields;

      let qualificationTypeData = await getQualificationType();
      if (qualificationTypeData) setQualificationType(qualificationTypeData);
      for (let i = 0; i < qualificationTypeData.length; i++) {
        if (qualificationTypeData[i].qualification_code === education_education_data.qualification_type_code) {
          stateData.qualficationType = qualifications[i];
        }
      }
     

      stateData.schoolAttended = education_education_data.school_attended;
      stateData.qualificationGrade = education_education_data.qualification_grade;
      stateData.admissionYear = education_education_data.admission_year;
      stateData.graduationYear = education_education_data.graduation_year;

      setData({
        ...data,
        ...stateData
      })
      
    }


    })()
  },[])
  const handleChange = (value, name) => setData({ ...data, [name]: value });
  const goBack =()=>navigate(-1);
  const getQualificationType = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/qualification?institution_code=${company.institution_code}`,

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

  const submitEducationData = async () => {
    try {
      //ensure required fields ara provided
      if (!data.qualficationType.qualification_code) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please select qualification type',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (!data.schoolAttended.trim()) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please provide school attended',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (!data.qualificationGrade.trim()) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please provide qualification grade',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (!data.admissionYear) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please provide admission year',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (data.admissionYear > 9999 || data.admissionYear < 1900) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please provide a valid admission year',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (!data.graduationYear) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please provide graduation year',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (data.graduationYear > 9999 || data.graduationYear < 1900) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please provide a valid graduation year',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (data.graduationYear < data.admissionYear) {
        return Swal.fire({
          title: 'Error!',
          text: 'Graduation year cannot be before admission yeaar',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      
      setLoading(true)
      console.log({code:data.qualficationType})
      const response = await axios.post(
        `${API_URL}/employee_education_info`,
        {
          institution_code: company.institution_code,
          employee_code: code,
          qualification_type_code: data.qualficationType.qualification_code,
          school_attended: data.schoolAttended.trim(),
          qualification_grade: data.qualificationGrade,
          admission_year: data.admissionYear,
          graduation_year: data.graduationYear,
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
            text: 'Education information saved!',
            icon: 'success',
            confirmButtonText: 'Ok',
          }).then(()=>{
            navigate('/dashboard/operations/hr/employee-registration/employment')
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
      return Swal.fire({
        title: 'Error!',
        text: 'Server error',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };
  return {
    submitEducationData,
    handleChange,
    goBack,
    qualifications,
    qualificationType,
    getQualificationType,
    loading,
    data,
  };
};
export default useEducation;
