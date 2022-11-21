import { useReducer, useState } from "react";

const useNextLevelSetup = () => {

    const [enrollment, setEnrollment] = useState({})
    const [newSubAdmin, setNewSubAdmin] = useState({})
    const [activityUpdate, setActivityUpdate] = useState({})

    const [setup, setSetup]=useReducer(
        (state,nextState)=>({...state, ...nextState}),{
            employeeEnrollment:false,
            newSubAdmin:true,
            activityUpdate:false,
    })
    const [loading, setLoading]=useReducer(
        (state, nextState)=>({...state, ...nextState}),{
        employeeEnrollment:false,
        newSubAdmin:false,
        activityUpdate:false,
    })

    const sendData = async(field, value)=>{
        console.log({field, value})
        //ensure a process is not running;
        if(loading[field]) return;

        //update loading object;
        setLoading({[field]:true})

        //send data api
        setTimeout(()=>{
            setSetup({[field]:value})
            setLoading({[field]:false})
    }, 1000);
    }
    return {setup,loading,enrollment,newSubAdmin,activityUpdate,sendData}
};

export default useNextLevelSetup;