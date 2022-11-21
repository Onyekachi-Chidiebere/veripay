import axios from 'axios';
import { useState } from 'react';
import { API_URL } from '../helper/appConstants';

const useSalary = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const jwt = localStorage.getItem('@veripay_token');
  const [salaryRegimeList, setSalaryRegimeList] = useState([]);
  const [salaryStructureNameList, setSalaryStructureNameList] = useState([]);
  const [gradeLevelList, setGradeLevelList] = useState([]);
  const [regimeStructure, setRegimeStructure] = useState([]);
  const [confirmDel, setConfirmDel] = useState(false)
  const [categoryList, setCategoryList] = useState([]);
  const company = JSON.parse(localStorage.getItem('@veripay_user'));
  const service_code = localStorage.getItem('@veripay_service_code');

  const getRegimeList = async () => {
    //this gets all regimes for the current company
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/salary_regime?institution_code=${company.institution_code}&service_code=${service_code}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const { code, message } = response.data.response;
      if (code === '00') {
        setLoading(false);
        setSalaryRegimeList(message.regimes);
        localStorage.setItem('@setup_stage',message.setup_stage)
        return true;
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log({ error });
      return false;
    }
  };

  const activateRegime = async (regime_code) => {
     try {
      setLoading(true);
     
      const response = await axios.patch(
        `${API_URL}/salary_regime`,
        {
          institution_code: company.institution_code,
          regime_code,
          service_code,
          active:true,
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const { code, message } = response.data.response;
      if (code === '00') {
        setSuccess(message);
        localStorage.setItem('@veripay_active_regime_code',regime_code)
        //update selected regime in the list;
        setSalaryRegimeList(data => data.map((regime) => {
          console.log({regime})
          if (regime.regime_code === regime_code)
            return { ...regime, active: true };
          return { ...regime, active: false }
        }))
        return setLoading(false);
      }
      console.log({ message });
      setLoading(false);
      setError(message);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log({ error });
    }
    
  }

const getCategory = async (page) => {
    // this gets the list of categories 
    try {
    const active_regime_code = localStorage.getItem('@veripay_active_regime_code');
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/salary_category?institution_code=${company.institution_code}&service_code=${service_code}&page=${page}&regime_code=${active_regime_code}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const { code, message } = response.data.response;
      if (code === '00') {
        console.log({ message });
        setCategoryList(message.categories);
         setLoading(false);
         return message.categories
      }
      console.log({ message });
      setLoading(false);
      setError(message);
      return false
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log({ error });
      return false
    }
  }
  const deleteRegime=async(regime_code)=>{
    try {
      setLoading(true);
      const response = await axios.delete(
        `${API_URL}/salary_regime?institution_code=${company.institution_code}&regime_code=${regime_code}&service_code=${service_code}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      const { code, message } = response.data.response;
      if (code === '00') {
        let newRegimes = [];
        //this removes the already deleted regime from the current regime list;
        for(let i=0; i<salaryRegimeList.length;i++){
          if(salaryRegimeList[i].regime_code!==regime_code){
            newRegimes.push(salaryRegimeList[i])
          }
        }
        setLoading(false);
        setSalaryRegimeList(newRegimes);
        setConfirmDel(false)
        setSuccess(message)
        return true;
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log({ error });
      return false;
    }
  }
  const deleteCategory=async(category_code)=>{
    try {
      console.log('start1')
      setLoading(true);
      const response = await axios.delete(
        `${API_URL}/salary_category?institution_code=${company.institution_code}&category_code=${category_code}&service_code=${service_code}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      console.log('start2')
      const { code, message } = response.data.response;
      if (code === '00') {
      console.log('start3')
        let newData = [];
        //this removes the already deleted category from the current category list;
        for (let i = 0; i < categoryList.length; i++){

      console.log('start4',i)
          console.log({category_code, code:categoryList[i].category_code})
          if (categoryList[i].category_code !== category_code) {
      console.log('start5')
            newData.push(categoryList[i])
          }
        }
      console.log('start6')
        console.log({message})
        setLoading(false);
        setCategoryList(newData);
        setConfirmDel(false)
        setSuccess(message)
      console.log('start7')
        return true;
      }
      setLoading(false);
      console.log('start8')
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log('start9')
      console.log({ error });
      return false;
    }
  }
  const deleteGradeLevel=async(grade_level_code)=>{
    try {
      setLoading(true);
      const response = await axios.delete(
        `${API_URL}/grade_level?institution_code=${company.institution_code}&grade_level_code=${grade_level_code}&service_code=${service_code}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      const { code, message } = response.data.response;
      if (code === '00') {
        let newGrades = [];
        //this removes the already deleted grade from the list;
        for(let i=0; i<gradeLevelList.length;i++){
          if(gradeLevelList[i].grade_level_code!==grade_level_code){
            newGrades.push(gradeLevelList[i])
          }
        }
        setLoading(false);
        setGradeLevelList(newGrades);
        setConfirmDel(false)
        setSuccess(message)
        return true;
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log({ error });
      return false;
    }
  }
  const deleteStructureName=async(structure_code)=>{
    try {
      setLoading(true);
      const response = await axios.delete(
        `${API_URL}/salary_structure?institution_code=${company.institution_code}&structure_code=${structure_code}&service_code=${service_code}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      const { code, message } = response.data.response;
      if (code === '00') {
        let newStructures = [];
        //this removes the already deleted structure from the list of structures
        for(let i=0; i<salaryStructureNameList.length;i++){
          if(salaryStructureNameList[i].structure_code!==structure_code){
            newStructures.push(salaryStructureNameList[i])
          }
        }
        setLoading(false);
        setSalaryStructureNameList(newStructures);
        setConfirmDel(false)
        setSuccess(message)
        return true;
      }
      setLoading(false);
      setError(message)
      console.log({message})
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log({ error });
      return false;
    }
  }
  const getSalaryStructureNameList = async (page) => {
    //this gets the salary structures for the required page
    try {
      const active_regime_code = localStorage.getItem('@veripay_active_regime_code');
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/salary_structure?institution_code=${company.institution_code}&page=${page}&service_code=${service_code}&regime_code=${active_regime_code}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const { code, message } = response.data.response;
      console.log({ response: response.data.response.message,active_regime_code ,service_code});
      if (code === '00') {
        setLoading(false);
        setSalaryStructureNameList(message.structures);
        localStorage.setItem('@setup_stage',message.setup_stage)
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log({ error });
    }
  };
  const getGradeLevelList = async (page) => {
    
    try {
      const active_regime_code = localStorage.getItem('@veripay_active_regime_code');
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/grade_level?institution_code=${company.institution_code}&page=${page}&service_code=${service_code}&regime_code=${active_regime_code}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const { code, message } = response.data.response;
      console.log({ response: message });
      if (code === '00') {
        setLoading(false);
        setGradeLevelList(message.grade_levels);
        localStorage.setItem('@setup_stage',message.setup_stage)
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log({ error });
    }
  };

  return {
    error,
    loading,
    success,
    salaryRegimeList,
    gradeLevelList,
    salaryStructureNameList,
    confirmDel,
    categoryList,
    setConfirmDel,
    activateRegime,
    setError,
    setSuccess,
    deleteRegime,
    getRegimeList,
    setSalaryStructureNameList,
    deleteGradeLevel,
    setSalaryRegimeList,
    getSalaryStructureNameList,
    setGradeLevelList,
    deleteStructureName,
    getGradeLevelList,
    getCategory,
    deleteCategory,
    setCategoryList
  };
};

export default useSalary;
