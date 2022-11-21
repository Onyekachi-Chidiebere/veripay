import axios from 'axios';
import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../helper/appConstants';

const useSalaryStructure = () => {
  let navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [getting, setGetting] = useState(false);
  const active_regime_code = localStorage.getItem('@veripay_active_regime_code');
  const jwt = localStorage.getItem('@veripay_token');
  const company = JSON.parse(localStorage.getItem('@veripay_user'));
  const [success, setSuccess] = useState(false);
  const [regimes, setRegimes] = useState([]);
  const service_code = localStorage.getItem('@veripay_service_code');

  const [categoryData, setCategoryData] = useReducer(
    (state, nextState) => ({ ...state, ...nextState }),
    {
      regime: { categories: [] },
      name: '',
      category: {},
      structure_name: '',
      structure_abbreviation: '',
      structure_code:'',
      category_code:'',
    }
  );

  const handleChange = (value, name) => {
    //this handles all update in input fields
    setError(false);
    setCategoryData({ [name]: value });
  };

  const selectRegime = (regime) => {
    handleChange(regime, 'regime');
    handleChange({}, 'category');
    
  };
  const selectEditRegime=async(regime_code,category_code)=>{
    let data=await getRegmes()
    console.log({data,regime_code,category_code})
    for(let i=0; i<data.length;i++){
      if(data[i].regime_code===regime_code)
        handleChange(data[i], 'regime')
      if(category_code)
      for(let j=0; j<data[i].categories.length;j++){
        if(data[i].categories[j].category_code===category_code){
          handleChange(data[i].categories[j],'category')
        }
      }
    }
  }
  const selectCategory = (category) => {
    handleChange(category, 'category');
  };


  const getRegmes = async () => {
    try {
      setGetting(true);
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
        console.log({ message });
        // handleChange('', 'name');
        setRegimes(message.regimes);
         setGetting(false);
         return message.regimes
      }
      console.log({ message });
      setGetting(false);
      setError(message);
      return false
    } catch (error) {
      setGetting(false);
      setError(error.message);
      console.log({ error });
      return false
    }
  };
  const updateRegime = async () => {
    //get the active regime and set it to the current regime;
    let regimeData = await getRegmes();
    for (let i = 0; i < regimeData.length; i++){
      if (active_regime_code) {
        if (regimeData[i].regime_code===active_regime_code) {
          handleChange(regimeData[i], 'regime')
        }
      }else{
        if (regimeData[i].active) {
          handleChange(regimeData[i], 'regime')
        }
      }
    }
  }
  const handleSubmitStructureName = async () => {
    try {
      setLoading(true);

      if (!categoryData.regime.regime_code) {
        setLoading(false);
        return setError('Please Select Regime');
      }
      if (!categoryData.category.category_code) {
        setLoading(false);
        return setError('Please Select Category');
      }
      if (categoryData.structure_name.trim() === '') {
        setLoading(false);
        return setError('Please Add Structure Name');
      }
      if (categoryData.structure_abbreviation.trim() === '') {
        setLoading(false);
        return setError('Please Add Structure Abbreviation');
      }

      const response = await axios.post(
        `${API_URL}/salary_structure`,
        {
          institution_code: company.institution_code,
          regime_code: categoryData.regime.regime_code,
          category_code: categoryData.category.category_code,
          structure_name: categoryData.structure_name.trim(),
          structure_abbreviation: categoryData.structure_abbreviation.trim(),
          entered_by:company.admin_code,
          service_code,

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
        console.log({ message });
        handleChange('', 'structure_name');
        handleChange('', 'structure_abbreviation');
        setSuccess(message.message);
        localStorage.setItem('@veripay_active_regime_code',categoryData.regime.regime_code,)
        localStorage.setItem('@setup_stage', message.setup_stage)
        setLoading(false);
        return true;
      }
      console.log({ message });
      setLoading(false);
      setError(message);
      return false;
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log({ error });
      return false;
    }
  };
  const editStructureName = async () => {
    try {
      setLoading(true);

      if (!categoryData.regime.regime_code) {
        setLoading(false);
        return setError('Please Select Regime');
      }
      if (!categoryData.category.category_code) {
        setLoading(false);
        return setError('Please Select Category');
      }
      if (categoryData.structure_name.trim() === '') {
        setLoading(false);
        return setError('Please Add Structure Name');
      }
      if (categoryData.structure_abbreviation.trim() === '') {
        setLoading(false);
        return setError('Please Add Structure Abbreviation');
      }

      const response = await axios.put(
        `${API_URL}/salary_structure`,
        {
          institution_code: company.institution_code,
          regime_code: categoryData.regime.regime_code,
          category_code: categoryData.category.category_code,
          structure_name: categoryData.structure_name.trim(),
          structure_abbreviation: categoryData.structure_abbreviation.trim(),
          entered_by:company.admin_code,
          structure_code: categoryData.structure_code,
          service_code,

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
        console.log({ message });
        setSuccess(message);
         setLoading(false);
         return true
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
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!categoryData.regime.regime_code) {
        setLoading(false);
        setError('Please Select Regime');
        return false
      }
      if (categoryData.name.trim() === '') {
        setLoading(false);
        setError('Please Add Category Name');
        return false
      }
      const response = await axios.post(
        `${API_URL}/salary_category`,
        {
          institution_code: company.institution_code,
          regime_code: categoryData.regime.regime_code,
          category_name: categoryData.name.trim(),
          entered_by: company.admin_code,
          service_code,
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
        console.log({ message });
        handleChange('', 'name');
        localStorage.setItem('@setup_stage', message.setup_stage)
        setSuccess(message.message);
        setLoading(false);
        return true
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
  };

  const handleEditCategorySubmit = async () => {
    try {
      setLoading(true);
      if (!categoryData.regime.regime_code) {
        setLoading(false);
        setError('Please Select Regime');
        return false
      }
      if (categoryData.name.trim() === '') {
        setLoading(false);
        setError('Please Add Category Name');
        return false
      }
      const response = await axios.put(
        `${API_URL}/salary_category`,
        {
          institution_code: company.institution_code,
          regime_code: categoryData.regime.regime_code,
          category_name: categoryData.name.trim(),
          entered_by: company.admin_code,
          category_code:categoryData.category_code,
          service_code,
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
        setSuccess(message.message);
        setLoading(false);
        return true
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
  };

  
  return {
    loading,
    error,
    categoryData,
    regimes,
    success,
    editStructureName,
    selectRegime,
    handleSubmit,
    handleChange,
    getRegmes,
    updateRegime,
    selectEditRegime,
    selectCategory,
    handleSubmitStructureName,
    handleEditCategorySubmit,
    setError,
    setSuccess,
 
  };
};
export default useSalaryStructure;
