import React, { useState } from 'react';

const useCreateSubAdmin = () => {
    const [adminInfo, setAdminInfo] = useState({
        username:'',
        email:'',
        phone:'',
        institution:{},
        module:{},
        requireAuth:{},

    })

    const handleChange = (value, name) => {
        setAdminInfo({
          ...adminInfo,
          [name]: value,
        });
      };
    const submitAdmininfo = () =>{}

    return {adminInfo, handleChange, submitAdmininfo}
};

export default useCreateSubAdmin;