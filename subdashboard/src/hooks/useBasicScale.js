import axios from 'axios';
import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../helper/appConstants';
import Swal from 'sweetalert2';

const useBasicScale = () => {
  const jwt = localStorage.getItem('@veripay_token');
  const company = JSON.parse(localStorage.getItem('@veripay_user'));
  const [confirmDel, setConfirmDel] = useState(false);
  const [regimes, setRegimes] = useState([]);
  const [structures, setStructures] = useState([]);
  const [success, setSuccess] = useState(false);
  const active_regime_code = localStorage.getItem(
    '@veripay_active_regime_code'
  );
  const [error, setError] = useState(false);
  const [getting, setGetting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSelectNew, setShowSelectNew] = useState(false);
  const [gradeLevels, setGradeLevels] = useState([]);
  const [levels, setLevels] = useState([]);
  const service_code = localStorage.getItem('@veripay_service_code');

  const [basicData, setBasicData] = useReducer(
    (state, nextState) => ({ ...state, ...nextState }),
    {
      regime: { categories: [] },
      structure: {},
      name_from_structure: false,
    }
  );
  const selectRegime = async (regime) => {
    handleChange(regime, 'regime');
    handleChange({}, 'structure');
    await getStructures(regime);
  };

  const selectStructure = async (structure) => {
    handleChange(structure, 'structure');
    await getBasicScale(structure);
  };

  const handleChange = (value, name) => {
    //this handles all update in input fields
    setError(false);
    setBasicData({ [name]: value });
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
    if (regimeData)
      for (let i = 0; i < regimeData.length; i++) {
        if (active_regime_code) {
          if (regimeData[i].regime_code === active_regime_code) {
            handleChange(regimeData[i], 'regime');
            await getStructures(regimeData[i]);
          }
        } else {
          if (regimeData[i].active) {
            handleChange(regimeData[i], 'regime');
            await getStructures(regimeData[i]);
          }
        }
      }
  };
  const getStructures = async (regime) => {
    try {
      setGetting(true);
      setStructures([]);
      const response = await axios.get(
        `${API_URL}/salary_structure?institution_code=${
          company.institution_code
        }&regime_code=${
          regime.regime_code
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

  const getBasicScale = async (structure) => {
    //this pulls the existing basic scales from database;
    try {
      setGetting(true);
      const response = await axios.get(
        `${API_URL}/basic_scale?institution_code=${
          company.institution_code
        }&structure_code=${
          structure.structure_code
        }&page=${1}&service_code=${service_code}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const { code, message } = response.data.response;
      console.log({ message });
      if (code === '00') {
        //generate the data structure required by table to show basic scales
        let newLevels = [];
        let unUsedLevels = [];
        for (let i = 0; i < message.grade_levels.length; i++) {
          for (
            let j = 0;
            j < message.grade_levels[i].basic_scales.length;
            j++
          ) {
            let val = {
              maximum_step: message.grade_levels[i].maximum_step,
              grade_level: message.grade_levels[i].grade_name,
              id: message.grade_levels[i].grade_level_code,
              structure_code: structure.structure_code,
              basic_scale_code:
                message.grade_levels[i].basic_scales[j].basic_scale_code,
              ...message.grade_levels[i].basic_scales[j].steps,
            };
            newLevels.push(val);
          }
          //count as used if basic scale list is not empty
          if (message.grade_levels[i].basic_scales.length === 0)
            unUsedLevels.push(message.grade_levels[i]);
        }
        setLevels(unUsedLevels);

        setGradeLevels(newLevels);
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
  const updateMyData = async (rowIndex, columnID, value) => {
    gradeLevels.map((row, index) => {
      if (index === rowIndex) {
        gradeLevels[index] = {
          ...row,
          [columnID]: value,
        };
      }
      return row;
    });
    await updateValue(true);
  };

  const getBasicLevels = async () => {
    //this gets the grade levels;
    try {
      setGetting(true);
      const response = await axios.get(
        `${API_URL}/grade_level?institution_code=${company.institution_code}&service_code=${service_code}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const { code, message } = response.data.response;
      if (code === '00') {
        let unUsedLevels = [];
        //this checks to filter already created basic scales and lets them open for only edit;
        for (let i = 0; i < message.grade_levels.length; i++) {
          if (message.grade_levels[i].basic_scales.length === 0)
            unUsedLevels.push(message.grade_levels[i]);
        }
        setLevels(unUsedLevels);
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

  const selectLevel = async (level) => {
    console.log({ selectedLevel: level });
    //this selects a particular grade level to create it's basic scale;
    try {
      gradeLevels.push({
        maximum_step: level.maximum_step,
        grade_level: level.grade_name,
        id: level.grade_level_code,
        structure_code: basicData.structure.structure_code,
        basic_scale_code: null,
      });
      //remove selected level from list of levels to be selected
      let newLevels = [];
      for (let i = 0; i < levels.length; i++) {
        if (levels[i].grade_level_code !== level.grade_level_code)
          newLevels.push(levels[i]);
      }
      await setLevels(newLevels);
      await setGradeLevels(gradeLevels);
      await setShowSelectNew(false);
      updateValue(true, level);
    } catch (error) {
      console.log({ error });
    }
  };

  const removeScale = (scale) => {
    //this removes a deleted grade level from the listof used grade levels;
    let newList = [];
    for (let i = 0; i < gradeLevels.length; i++) {
      if (gradeLevels[i].id !== scale.id) {
        newList.push(gradeLevels[i]);
      }
    }
    setGradeLevels(newList);
    setLevels([
      ...levels,
      {
        grade_name: scale.grade_level,
        maximum_step: scale.maximum_step,
        grade_level_code: scale.id,
        basic_scale_code: scale.basic_scale_code,
      },
    ]);
    setLoading(false);
    return setSuccess('Level deleted');
  };
  const deleteBasicScale = async (scale) => {
    console.log('deleting', { scale });
    //this deletes the basic scales under a grade level;
    try {
      setLoading(true);
      if (!scale.basic_scale_code) {
        console.log('here');
        return removeScale(scale);
      }
      const response = await axios.delete(
        `${API_URL}/basic_scale?institution_code=${company.institution_code}&basic_scale_code=${scale.basic_scale_code}&service_code=${service_code}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log({ response });
      const { code, message } = response.data.response;
      console.log({ code, message });
      if (code === '00') {
        setConfirmDel(false);
        await removeScale(scale);
        return;
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log({ error });
      return false;
    }
  };

  const finish = async (data) => {
    //this handles the update after final modifications are made;
    let response = await updateValue();
    if (response) {
      handleChange({}, 'structure');
    }
  };

  const openSelectLevel = () => {
    try {
      //loop through the row and ensure there is no empty field
      for (let i = 0; i < gradeLevels.length; i++) {
        const {
          grade_level,
          id,
          basic_scale_code,
          maximum_step,
          structure_code,
          ...steps
        } = gradeLevels[i];
        console.log({ steps });

        //check for levels without steps
        if (maximum_step === 0) {
          if (!steps[`NoStep`] || steps[`NoStep`] === 'NAN') {
            return Swal.fire({
              title: 'Error!',
              text: `${grade_level} is not filled up yet`,
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          }
        }

        //check for levels with steps
        for (let j = 0; j < maximum_step; j++) {
          if (!steps[`Step${j + 1}`] || steps[`Step${j + 1}`] === 'NAN') {
            return Swal.fire({
              title: 'Error!',
              text: `${grade_level} is not filled up yet`,
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          }
        }
      }
      return setShowSelectNew(true);
    } catch (error) {}
  };
  const updateValue = async (noAlert, select) => {
    //select is the latest gradelevel selected this enables the persisting of the data
    try {
      let scales = [];
      //loop through the rows and get the steps and grade levels
      for (let i = 0; i < gradeLevels.length; i++) {
        console.log('checking');
        const {
          grade_level,
          id,
          basic_scale_code,
          maximum_step,
          structure_code,
          ...steps
        } = gradeLevels[i];
        if (maximum_step === 0) {
          if (!steps[`NoStep`] || steps[`NoStep`] === 'NAN') {
            delete steps['NoStep'];
          }
        }
        for (let j = 0; j < maximum_step; j++) {
          if (!steps[`Step${j + 1}`] || steps[`Step${j + 1}`] === 'NAN') {
            console.log({ here: steps[`Step${j + 1}`] });
            delete steps[`Step${j + 1}`];
          }
        }
        scales.push({
          grade_level: id,
          basic_scale_code,
          structure_code,
          steps,
        });
      }
      if (select) {
        scales.push({
          grade_level: select.id,
          basic_scale_code: select.basic_scale_code,
          structure_code: select.structure_code,
          steps: {},
        });
      }
      const response = await axios.put(
        `${API_URL}/basic_scale`,
        { institution_code: company.institution_code, scales, service_code },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const { code, message } = response.data.response;
      if (code === '00') {
        if (!noAlert) {
          await getBasicScale(basicData.structure);
          if (!select) setSuccess(message.message);
        }
        return true;
      }
      setError(message.message);
    } catch (error) {
      console.log({ error });
      if (!noAlert) setError(error, message);
      return false;
    }
  };
  return {
    basicData,
    structures,
    regimes,
    loading,
    error,
    levels,
    gradeLevels,
    showSelectNew,
    confirmDel,
    setConfirmDel,
    setError,
    getRegmes,
    updateRegime,
    deleteBasicScale,
    getBasicScale,
    handleChange,
    selectRegime,
    selectStructure,
    setShowSelectNew,
    getBasicLevels,
    selectLevel,
    updateValue,
    setSuccess,
    finish,
    updateMyData,
    openSelectLevel,
    success,
  };
};
export default useBasicScale;
