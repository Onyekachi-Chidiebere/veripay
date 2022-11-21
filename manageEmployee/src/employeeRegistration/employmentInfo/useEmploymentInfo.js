import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { API_URL } from '../../helper/appConstants';

const useEmployment = ({state}) => {
  const navigate = useNavigate();
  const jwt = localStorage.getItem('@veripay_token');
  const code = localStorage.getItem('@veripay_employee_code');
  const company = JSON.parse(localStorage.getItem('@veripay_user'));
  const active_regime_code = localStorage.getItem(
    '@veripay_active_regime_code'
  );
  const service_code = localStorage.getItem('@veripay_service_code');

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    firstAppointmentDate: '',
    confirmationDate: '',
    lastPromommtmionDate: '',
    appointmentStatus: {},
    entryGradeLevel: {},
    entryStep: {},
    entryEstablishment: '',
    salaryStructure: {},
    currentGradeLevel: {},
    currentStep: {},
    currentDesignation: {},
    department: {},
    ministry: {},
    employeeCode:null
  });

const appointmentStatus=[
  { data: 'status 1', id:1 },
  { data: 'Status 2', id:2 },
  { data: 'Status 3', id:3 },
];

const structures = [
  { data: 'structure 1', id:1 },
  { data: 'structure 2', id:2 },
  { data: 'structure 3', id:3 },
]

const designation= [   
  { data: 'desigantion 1', id:1 },
  { data: 'desigantion 2', id:2 },
  { data: 'desigantion 3', id:3 },
];
const department = [
  { data: 'department 1', id:1},
  { data: 'department 2', id:2 },
  { data: 'department 3', id:3 },
]
const ministry = [
  { data: 'ministry 1', id:1 },
  { data: 'ministry 2', id:2 },
  { data: 'ministry 3', id:3 },
]
  const stepLists = [
    { id: 'No Step' },
    { id: '01' },
    { id: '02' },
    { id: '03' },
    { id: '04' },
    { id: '05' },
    { id: '06' },
    { id: '07' },
    { id: '08' },
    { id: '09' },
    { id: '10' },
    { id: '11' },
    { id: '12' },
    { id: '13' },
    { id: '14' },
    { id: '15' },
    { id: '16' },
  ];

  useEffect(()=>{

    (async()=>{
    if(state){
      const stateData = {};
      const {employment_status_data} = state;

      //get all required fields;

      for (let i = 0; i < appointmentStatus.length; i++) {
        if (appointmentStatus[i].id === employment_status_data.appointment_status) {
          stateData.appointmentStatus = appointmentStatus[i];
        }
      }
      for (let i = 0; i < structures.length; i++) {
        if (structures[i].id === employment_status_data.salary_structure) {
          stateData.salaryStructure = structures[i];
        }
      } 
      for (let i = 0; i < designation.length; i++) {
        if (designation[i].id === employment_status_data.current_designation) {
          stateData.currentDesignation = designation[i];
        }
      } 
      for (let i = 0; i < department.length; i++) {
        if (department[i].id === employment_status_data.department) {
          stateData.department = department[i];
        }
      } 
      for (let i = 0; i < ministry.length; i++) {
        if (ministry[i].id === employment_status_data.ministry) {
          stateData.ministry = ministry[i];
        }
      } 
      for (let i = 0; i < stepLists.length; i++) {
        if (stepLists[i].id === employment_status_data.entry_step) {
          stateData.entryStep = stepLists[i];
        }
      } 
      for (let i = 0; i < stepLists.length; i++) {
        if (stepLists[i].id === employment_status_data.current_step) {
          stateData.current_step = stepLists[i];
        }
      } 
      stateData.firstAppointmentDate = employment_status_data.first_appointment_date;
      stateData.employeeCode = employment_status_data.employee_code;
      stateData.confirmationDate = employment_status_data.confirmation_date;
      stateData.lastPromommtmionDate = employment_status_data.last_promotion_date;

      setData({
        ...data,
        ...stateData
      })
      
    }


    })()
  },[])
  const getStructures = async (regime) => {
    try {
      const response = await axios.get(
        `${API_URL}/salary_structure?institution_code=${
          company.institution_code
        }&regime_code=${
          active_regime_code
          //endeavour to handle this pagination
        }&page=${1}&service_code=${service_code}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const { code, message } = response.data.response;
      if (code === '00') {
        setStructures(message.structures);
        return setGetting(false);
      }
      setGetting(false);
      setError(message);
    } catch (error) {
      setGetting(false);
      setError(error.message);
      console.log({ error });
    }
  };

  const handleChange = (value, name) => {
    console.log({ value });
    setData({
      ...data,
      [name]: value,
    });
  };
  const goBack =()=>navigate(-1)

  const submitEmploymentData = async () => {
    try {
      //ensure required fields are provided

      if (!data.firstAppointmentDate.trim()) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please provide first appointment date',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (!data.confirmationDate.trim()) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please provide confnirmation date',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }

      if (!data.lastPromommtmionDate.trim()) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please provide last promotion date',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (!data.appointmentStatus.id) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please select appointment status',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (!data.entryGradeLevel.id) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please select grade level',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (!data.entryStep.id) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please select entry step',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (!data.entryEstablishment.trim()) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please provide entry establishment',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (!data.salaryStructure.id) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please select salary structure ',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (!data.currentGradeLevel.id) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please select current grade level',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (!data.currentStep.id) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please select current step',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (!data.currentDesignation.id) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please select current designation',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (!data.department.id) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please select department',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      if (!data.ministry.id) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please select ministry',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      setLoading(true)
      const response = await axios.post(
        `${API_URL}/employee_status_setup`,
        {
          institution_code: company.institution_code,
          employee_code: data.employeeCode||code,
          first_appointment_date: data.firstAppointmentDate.trim(),
          confirmation_date: data.confirmationDate.trim(),
          last_promotion_date: data.lastPromommtmionDate.trim(),
          appointment_status: data.appointmentStatus.id,
          entry_grade_level: data.entryGradeLevel.id,
          entry_step: data.entryStep.id,
          entry_establishment: data.entryEstablishment.trim(),
          salary_structure: data.salaryStructure.id,
          current_grade_level: data.currentGradeLevel.id,
          current_step: data.currentStep.id,
          current_designation: data.currentDesignation.id,
          department: data.department.id,
          ministry: data.ministry.id,
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
            text: 'Employment Status saved!',
            icon: 'success',
            confirmButtonText: 'Ok',
          }).then(()=>{
            navigate('/dashboard/operations/hr/employee-registration/account')
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
  };
}
  return { data, handleChange,submitEmploymentData, loading ,goBack,department,ministry, stepLists,appointmentStatus,structures,designation};
};

export default useEmployment;
