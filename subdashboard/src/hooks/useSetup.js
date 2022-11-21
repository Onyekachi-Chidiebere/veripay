import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../helper/appConstants';
import { useNavigate } from 'react-router-dom';

const useSetup = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedId, setSelectedIds]= useState([]);
  const [regimeList, setRegimeList] = useState([]);
  const jwt = localStorage.getItem('@veripay_token');
  const company = JSON.parse(localStorage.getItem('@veripay_user'));
  let navigate = useNavigate();

  const selectService = (index) => {
    console.log({selectedId})
    console.log({index})
    //this selects or unselects required service
    services[index].subscribed = !services[index].subscribed;
    let newServices = [...services];
    //remove code from selected ids
    if(selectedId.includes(services[index].service_code)){
      let newIds = selectedId.filter(id=>id!==services[index].service_code)
      setSelectedIds(newIds);
    }else{
      setSelectedIds([...selectedId,services[index].service_code])
    }
      setServices(newServices);
  };
  const getServices = async () => {
    //get required services for the institution
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/institution_services`,
        { institution_code: company.institution_code },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const { code, message } = response.data.response;
      if (code === '00') {
        console.log({bbb:message})
        setServices(message.services);
        let ids =[];
         message.services.map((service) => {

          //gets all the service code of selected services
          if (service.subscribed) ids.push(service.service_code);
        });
        console.log({ids})
        setSelectedIds(ids)
        return setLoading(false);
      }
      setLoading(false);
      setError(message);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log({ error });
    }
  };

  const submitSelectedServices = async () => {
    //this submits selected services
  
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/subscribe_institution`,
        {
          institution_code: company.institution_code,
          services: selectedId,
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
        setLoading(false);
        return navigate('/dashboard/setup/service');
      }
      setLoading(false);
      setError(message);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log({ error });
    }
  };

  const getSalaryRegime = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/salary_regime?institution_code=${company.institution_code}`,

        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const { code, message } = response.data.response;
      if (code === '00') {
        setRegimeList([...message.regimes]);
        console.log({ message: message.regimes });
        return setLoading(false);
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
    services,
    regimeList,
    selectedId,
    setError,
    getServices,
    getSalaryRegime,
    selectService,
    submitSelectedServices,
  };
};
export default useSetup;
