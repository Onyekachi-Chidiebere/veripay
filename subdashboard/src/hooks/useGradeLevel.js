import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../helper/appConstants';

const useGradeLevel = () => {
  const jwt = localStorage.getItem('@veripay_token');
  const company = JSON.parse(localStorage.getItem('@veripay_user'));
  const service_code = localStorage.getItem('@veripay_service_code');
  const active_regime_code = localStorage.getItem(
    '@veripay_active_regime_code'
  );
  const [regimes, setRegimes] = useState([]);
  const [error, setError] = useState(false);
  const [getting, setGetting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  //list of grade levels to be assigned
  const gradeLevelLists = [
    { id: 'No Grade Level' },
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
    { id: '17' },
    { id: '18' },
  ];
  const [gradeData, setGradeData] = useReducer(
    (state, nextState) => ({ ...state, ...nextState }),
    {
      regime: { categories: [] },
      category: { salary_structures: [] },
      structure: {},
      name: '',
      pensionable: false,
      maximum_step: 0,
      step_status: false,
      grade_level_digit: { id: '' },
      grade_level_code: '',
    }
  );
  useEffect(() => {
    handleChange(
      `${gradeData.grade_level_digit.id}-${gradeData.structure.structure_abbreviation}`,
      'name'
    );
  }, [gradeData.grade_level_digit, gradeData.structure]);

  const selectRegime = (regime) => {
    handleChange(regime, 'regime');
    handleChange({ salary_structures: [] }, 'category');
    handleChange({}, 'structure');
  };
  const selectCategory = (category) => {
    handleChange(category, 'category');
    handleChange({}, 'structure');
  };

  const selectStructure = (structure) => {
    console.log({ structure });
    handleChange(structure, 'structure');
  };
  const selectGradeLevel = (digit) => {
    handleChange(digit, 'grade_level_digit');
  };
  const handleChange = (value, name) => {
    //this handles all update in input fields
    setError(false);
    setGradeData({ [name]: value });
  };

  const getRegmes = async () => {
    // this pulls the regimes from the database;
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
        setRegimes(message.regimes);
        setGetting(false);
        return message.regimes;
      }
      setGetting(false);
      setError(message);
      return false;
    } catch (error) {
      setGetting(false);
      setError(error.message);
      console.log({ error });
      return false;
    }
  };
  const updateRegime = async () => {
    //get the active regime and set it to the current regime;
    let regimeData = await getRegmes();
    for (let i = 0; i < regimeData.length; i++) {
      if (active_regime_code) {
        if (regimeData[i].regime_code === active_regime_code) {
          handleChange(regimeData[i], 'regime');
        }
      } else {
        if (regimeData[i].active) {
          handleChange(regimeData[i], 'regime');
        }
      }
    }
  };
  const selectEditRegime = async (
    regime_code,
    category_code,
    structure_code
  ) => {
    //this updates the already selected fields in a regime to be edited;
    let data = await getRegmes();
    console.log({ data, regime_code, category_code });
    for (let i = 0; i < data.length; i++) {
      if (data[i].regime_code === regime_code) handleChange(data[i], 'regime');
      for (let j = 0; j < data[i].categories.length; j++) {
        if (data[i].categories[j].category_code === category_code) {
          handleChange(data[i].categories[j], 'category');
          console.log({ nnn: data[i].categories[j] });
          for (
            let k = 0;
            k < data[i].categories[j].salary_structures.length;
            k++
          ) {
            if (
              data[i].categories[j].salary_structures[k].structure_code ===
              structure_code
            ) {
              handleChange(
                data[i].categories[j].salary_structures[k],
                'structure'
              );
            }
          }
        }
      }
    }
  };
  const addGradeLevel = async () => {
    try {
      setLoading(true);
      //ensure all required fields are provided

      if (!gradeData.regime.regime_code) {
        setLoading(false);
        return setError('Please Select Regime!');
      }

      if (!gradeData.category.category_code) {
        setLoading(false);
        return setError('Please Select Category!');
      }
      if (!gradeData.structure.structure_code) {
        setLoading(false);
        return setError('Please Select Structure!');
      }
      if (gradeData.name.trim() === '') {
        setLoading(false);
        return setError('Please Add Grade Name!');
      }
      if (!gradeData.grade_level_digit.id) {
        setLoading(false);
        return setError('Please Select Grade Level Digit!');
      }

      if (
        (gradeData.step_status && gradeData.maximum_step === '') ||
        (gradeData.step_status && gradeData.maximum_step === 0)
      ) {
        setLoading(false);
        return setError('Please Add Maximum step');
      }
      if (gradeData.maximum_step > 15) {
        setLoading(false);
        return setError(' Maximum step should not exceed 15');
      }
      const response = await axios.post(
        `${API_URL}/grade_level`,
        {
          institution_code: company.institution_code,
          regime_code: gradeData.regime.regime_code,
          category_code: gradeData.category.category_code,
          step_status: gradeData.step_status,
          pensionable: gradeData.pensionable,
          grade_level_digit: gradeData.grade_level_digit.id,
          maximum_step: gradeData.maximum_step,
          grade_name: gradeData.name.trim(),
          structure_code: gradeData.structure.structure_code,
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
        setSuccess(message.message);
        localStorage.setItem('@setup_stage', message.setup_stage);
        setLoading(false);
        return true;
      }
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
  const editGradeLevel = async () => {
    try {
      setLoading(true);
      //ensure all required fields are provided

      if (!gradeData.regime.regime_code) {
        setLoading(false);
        return setError('Please Select Regime!');
      }

      if (!gradeData.category.category_code) {
        setLoading(false);
        return setError('Please Select Category!');
      }
      if (!gradeData.structure.structure_code) {
        setLoading(false);
        return setError('Please Select Structure!');
      }
      if (gradeData.name.trim() === '') {
        setLoading(false);
        return setError('Please Add Grade Name!');
      }
      if (!gradeData.grade_level_digit.id) {
        setLoading(false);
        return setError('Please Select Grade Level Digit!');
      }

      if (
        (gradeData.step_status && gradeData.maximum_step === '') ||
        (gradeData.step_status && gradeData.maximum_step === 0)
      ) {
        setLoading(false);
        return setError('Please Add Maximum step');
      }
      if (gradeData.maximum_step > 15) {
        setLoading(false);
        return setError(' Maximum step should not exceed 15');
      }
      const response = await axios.put(
        `${API_URL}/grade_level`,
        {
          institution_code: company.institution_code,
          regime_code: gradeData.regime.regime_code,
          category_code: gradeData.category.category_code,
          step_status: gradeData.step_status,
          pensionable: gradeData.pensionable,
          grade_level_digit: gradeData.grade_level_digit.id,
          maximum_step: gradeData.maximum_step,
          grade_name: gradeData.name.trim(),
          structure_code: gradeData.structure.structure_code,
          entered_by: company.admin_code,
          grade_level_code: gradeData.grade_level_code,
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
        setSuccess(message);
        setLoading(false);
        return true;
      }
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

  return {
    gradeLevelLists,
    gradeData,
    regimes,
    loading,
    success,
    error,
    selectEditRegime,
    editGradeLevel,
    getRegmes,
    handleChange,
    setError,
    setSuccess,
    selectRegime,
    selectCategory,
    selectStructure,
    selectGradeLevel,
    addGradeLevel,
    updateRegime,
  };
};
export default useGradeLevel;
