import React from 'react';
import InputLoading from '../components/loading/InputLoading';
import './styles.css';
import useNextLevelSetup from './useNextLevelSetup';
// import loodingIcon from '../images/loading.svg'

const NextLevelSetup = () =>{
    const {setup, loading, sendData} = useNextLevelSetup();
   return <div>
    <h1 className='approval-title mx-4 mt-4 mb-2'>Next Level Approval Setup</h1>
    <div className='approval-card mx-4 p-4'>
        <div className='d-flex justify-content-between approval-tab px-4 py-2 my-4  mx-3 align-items-center'>
            <span>Employee Enrollment</span>
            <div>
            {loading.employeeEnrollment&&<InputLoading/>}
            <label class="switch">
                <input type="checkbox"  onChange={({target})=>sendData('employeeEnrollment',target.checked)} checked={setup.employeeEnrollment} />
                <span class="slider round"></span>
            </label>
            </div>
        </div>
        <div className='d-flex justify-content-between approval-tab px-4 py-2 mx-3 my-4 align-items-center'>
            <span>New Sub Admin</span>
            <div>
            {loading.newSubAdmin&&<InputLoading/>}
            <label class="switch">
                <input onChange={({target})=>sendData('newSubAdmin',target.checked)} checked={setup.newSubAdmin} type="checkbox"/>
                <span class="slider round"></span>
            </label>
            </div>
        </div>
        <div className='d-flex justify-content-between approval-tab px-4 py-2 mx-3 my-4 align-items-center'>
            <span>Activity Updates</span>
            <div>
            {loading.activityUpdate&&<InputLoading/>}
            <label class="switch">
                <input type="checkbox"  onChange={({target})=>sendData('activityUpdate',target.checked)} checked={setup.activityUpdate} />
                <span class="slider round"></span>
            </label>
            </div>
        </div>
    </div>
   </div>
};

export default NextLevelSetup;