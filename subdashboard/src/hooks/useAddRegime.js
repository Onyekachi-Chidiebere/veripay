import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../helper/appConstants';

const useAddSalary = () => {
  let navigate = useNavigate();
  const [years, setYears] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const jwt = localStorage.getItem('@veripay_token');
  const company = JSON.parse(localStorage.getItem('@veripay_user'));
  const service_code = localStorage.getItem('@veripay_service_code');
  console.log({ company });
  const months = [
    { month: 'January', index: 1 },
    { month: 'February', index: 2 },
    { month: 'March', index: 3 },
    { month: 'April', index: 4 },
    { month: 'May', index: 5 },
    { month: 'June', index: 6 },
    { month: 'July', index: 7 },
    { month: 'August', index: 8 },
    { month: 'September', index: 9 },
    { month: 'October', index: 10 },
    { month: 'November', index: 11 },
    { month: 'December', index: 12 },
  ];
  const [regimeData, setRegimeData] = useReducer(
    (state, nextState) => ({ ...state, ...nextState }),
    {
      year: { year: new Date().getFullYear() },
      month: months[new Date().getMonth()],
      monthIndex: new Date().getMonth(),
      name: '',
      regime_code: '',
    }
  );

  const handleChange = (value, name) => {
    //this hadndles all update in input fields
    setError(false);
    setRegimeData({ [name]: value });
  };
  const selectMonth = (month) => {
    handleChange(month, 'month');
  };
  const selectYear = (year) => {
    console.log({ year });
    handleChange(year, 'year');
  };
  useEffect(() => {
    //update 10 years to select from
    const yrs = [];
    for (
      let i = new Date().getFullYear() - 5;
      i < new Date().getFullYear() + 5;
      i++
    ) {
      yrs.push({ year: i });
      // console.log({years});
    }
    setYears(yrs);
  }, []);

  const submitRegime = async () => {
    //handles sending regimes to the database;
    try {
      setLoading(true);
      if (regimeData.name.trim() === '') {
        setLoading(false);
        setError('Please Provide Regime Name');
        return false;
      }
      const response = await axios.post(
        `${API_URL}/salary_regime`,
        {
          institution_code: company.institution_code,
          regime_year: regimeData.year.year,
          regime_month: regimeData.month.index,
          regime_name: regimeData.name.trim(),
          entered_by: company.admin_code,
          regime_code: regimeData.regime_code,
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
        setSuccess(message.message);
        localStorage.setItem('@setup_stage', message.setup_stage);
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
  const editRegime = async () => {
    //this handles updating the regime data in database;
    try {
      setLoading(true);
      if (regimeData.name.trim() === '') {
        setLoading(false);
        return setError('Please Provide Regime Name');
      }

      const response = await axios.put(
        `${API_URL}/salary_regime`,
        {
          institution_code: company.institution_code,
          regime_year: regimeData.year.year,
          regime_month: regimeData.month.index,
          regime_name: regimeData.name.trim(),
          entered_by: company.admin_code,
          regime_code: regimeData.regime_code,
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
    loading,
    error,
    years,
    regimeData,
    months,
    editRegime,
    submitRegime,
    selectMonth,
    selectYear,
    handleChange,
    setError,
    setSuccess,
    success,
  };
};
export default useAddSalary;
