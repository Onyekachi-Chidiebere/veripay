import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import useGradeLevel from '../hooks/useGradeLevel';
import Select from './Select';
import TextInput from './TextInput';
import { useNavigate } from 'react-router-dom';

const AddGradeLevel = ({ close, handleUpdate }) => {
  const {
    gradeLevelLists,
    regimes,
    gradeData,
    loading,
    success,
    error,
    handleChange,
    selectRegime,
    selectCategory,
    selectGradeLevel,
    selectStructure,
    addGradeLevel,
    setError,
    setSuccess,
    updateRegime,
  } = useGradeLevel();

  useEffect(() => {
    updateRegime();
  }, []);
  return (
    <div className="w-100 pt-4 edit-card">
      {success && (
        <SweetAlert
          success
          title="Success"
          onConfirm={() => {
            setSuccess(false);
            close();
          }}
          onCancel={() => {
            setSuccess(false);
            close();
          }}
        >
          {success}
        </SweetAlert>
      )}
      {error && (
        <SweetAlert
          danger
          title="Error"
          onConfirm={() => setError(false)}
          onCancel={() => setError(false)}
        >
          {error}
        </SweetAlert>
      )}

      <Row className="justify-content-md-center">
        <Col md={4} className="edit-container">
          <div className="d-flex justify-content-end align-items-center mx-3">
            <svg
              onClick={() => close()}
              className="select-close-button"
              id="close"
              width="170"
              height="170"
              viewBox="0 0 170 170"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M91.3762 10.625C108.376 11.6875 124.314 20.1875 136.001 31.875C149.814 46.75 157.251 64.8125 157.251 86.0624C157.251 103.062 150.876 119 140.251 132.812C129.626 145.562 114.751 155.125 97.7512 158.312C80.7512 161.5 63.7512 159.375 48.8762 150.875C34.0012 142.375 22.3137 129.625 15.9387 113.687C9.56371 97.7499 8.50121 79.6874 13.8137 63.7499C19.1262 46.7499 28.6887 32.9374 43.5637 23.375C57.3762 13.8125 74.3762 9.56245 91.3762 10.625ZM96.6887 147.687C110.501 144.5 123.251 137.062 132.814 125.375C141.314 113.687 146.626 99.8749 145.564 84.9999C145.564 67.9999 139.189 51 127.501 39.3125C116.876 28.6875 104.126 22.3125 89.2512 21.25C75.4387 20.1875 60.5637 23.375 48.8762 31.875C37.1887 40.375 28.6887 52.0624 24.4387 66.9374C20.1887 80.7499 20.1887 95.6249 26.5637 109.437C32.9387 123.25 42.5012 133.875 55.2512 141.312C68.0012 148.75 82.8762 150.875 96.6887 147.687ZM83.9387 79.6874L109.439 53.1249L116.876 60.5624L91.3762 87.1249L116.876 113.687L109.439 121.125L83.9387 94.5624L58.4387 121.125L51.0012 113.687L76.5012 87.1249L51.0012 60.5624L58.4387 53.1249L83.9387 79.6874Z"
                fill="#E36E6E"
              />
            </svg>
          </div>
          <p className="text-center fs-6">Add Grade Level</p>
          <Select
            label="Salary Scale Regime "
            text={gradeData.regime.regime_name}
            data={regimes}
            handleSelect={selectRegime}
            id="regime_name"
            disabled={true}
          />
          <Select
            label="Salary Structure Category "
            text={gradeData.category.category_name}
            data={gradeData.regime.categories}
            id="category_name"
            handleSelect={selectCategory}
          />
          <Select
            label="Salary Structure"
            text={gradeData.structure.structure_name}
            data={gradeData.category.salary_structures}
            id="structure_name"
            handleSelect={selectStructure}
          />

          <Select
            label="Salary Grade Level"
            text={gradeData.grade_level_digit.id}
            data={gradeLevelLists}
            id="id"
            handleSelect={selectGradeLevel}
          />
          <div className="mt-3 mx-3">
            <TextInput
              placeholder="Grade Name"
              onChange={handleChange}
              field={'name'}
              value={gradeData.name}
              disabled={true}
            />
          </div>
          <div className="add-salary-grade-text-btn mx-3">
            <span className="add-salary-grade-text fs-7">Status:</span>
            <button
              className="btn"
              onClick={() => handleChange(true, 'step_status')}
            >
              {!gradeData.step_status ? (
                <svg
                  className="me-2"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C10.0222 22 8.08879 21.4135 6.4443 20.3147C4.79981 19.2159 3.51809 17.6541 2.76121 15.8268C2.00433 13.9996 1.8063 11.9889 2.19215 10.0491C2.578 8.10929 3.53041 6.32746 4.92894 4.92894C6.32746 3.53041 8.10929 2.578 10.0491 2.19215C11.9889 1.8063 13.9996 2.00433 15.8268 2.76121C17.6541 3.51809 19.2159 4.79981 20.3147 6.4443C21.4135 8.08879 22 10.0222 22 12C22 14.6522 20.9464 17.1957 19.0711 19.0711C17.1957 20.9464 14.6522 22 12 22ZM12 4C10.4178 4 8.87104 4.4692 7.55544 5.34825C6.23985 6.2273 5.21447 7.47673 4.60897 8.93854C4.00347 10.4003 3.84504 12.0089 4.15372 13.5607C4.4624 15.1126 5.22433 16.538 6.34315 17.6569C7.46197 18.7757 8.88743 19.5376 10.4393 19.8463C11.9911 20.155 13.5997 19.9965 15.0615 19.391C16.5233 18.7855 17.7727 17.7602 18.6518 16.4446C19.5308 15.129 20 13.5823 20 12C20 9.87827 19.1572 7.84344 17.6569 6.34315C16.1566 4.84286 14.1217 4 12 4Z"
                    fill="#B4B4B4"
                  />
                </svg>
              ) : (
                <svg
                  width="19"
                  className="me-2"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z"
                    fill="#0C71BF"
                  />
                  <path
                    d="M12 7C11.0111 7 10.0444 7.29324 9.22215 7.84265C8.39991 8.39206 7.75904 9.17295 7.3806 10.0866C7.00217 11.0002 6.90315 12.0055 7.09608 12.9755C7.289 13.9454 7.76521 14.8363 8.46447 15.5355C9.16373 16.2348 10.0546 16.711 11.0246 16.9039C11.9945 17.0969 12.9998 16.9978 13.9134 16.6194C14.827 16.241 15.6079 15.6001 16.1574 14.7779C16.7068 13.9556 17 12.9889 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7Z"
                    fill="#0C71BF"
                  />
                </svg>
              )}

              <span className="add-salary-grade-text fs-7">Has Step</span>
            </button>
            <button
              onClick={() => {
                handleChange(0, 'maximum_step');
                handleChange(false, 'step_status');
              }}
              className="btn"
            >
              {gradeData.step_status ? (
                <svg
                  className="me-2"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C10.0222 22 8.08879 21.4135 6.4443 20.3147C4.79981 19.2159 3.51809 17.6541 2.76121 15.8268C2.00433 13.9996 1.8063 11.9889 2.19215 10.0491C2.578 8.10929 3.53041 6.32746 4.92894 4.92894C6.32746 3.53041 8.10929 2.578 10.0491 2.19215C11.9889 1.8063 13.9996 2.00433 15.8268 2.76121C17.6541 3.51809 19.2159 4.79981 20.3147 6.4443C21.4135 8.08879 22 10.0222 22 12C22 14.6522 20.9464 17.1957 19.0711 19.0711C17.1957 20.9464 14.6522 22 12 22ZM12 4C10.4178 4 8.87104 4.4692 7.55544 5.34825C6.23985 6.2273 5.21447 7.47673 4.60897 8.93854C4.00347 10.4003 3.84504 12.0089 4.15372 13.5607C4.4624 15.1126 5.22433 16.538 6.34315 17.6569C7.46197 18.7757 8.88743 19.5376 10.4393 19.8463C11.9911 20.155 13.5997 19.9965 15.0615 19.391C16.5233 18.7855 17.7727 17.7602 18.6518 16.4446C19.5308 15.129 20 13.5823 20 12C20 9.87827 19.1572 7.84344 17.6569 6.34315C16.1566 4.84286 14.1217 4 12 4Z"
                    fill="#B4B4B4"
                  />
                </svg>
              ) : (
                <svg
                  width="19"
                  className="me-2"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z"
                    fill="#0C71BF"
                  />
                  <path
                    d="M12 7C11.0111 7 10.0444 7.29324 9.22215 7.84265C8.39991 8.39206 7.75904 9.17295 7.3806 10.0866C7.00217 11.0002 6.90315 12.0055 7.09608 12.9755C7.289 13.9454 7.76521 14.8363 8.46447 15.5355C9.16373 16.2348 10.0546 16.711 11.0246 16.9039C11.9945 17.0969 12.9998 16.9978 13.9134 16.6194C14.827 16.241 15.6079 15.6001 16.1574 14.7779C16.7068 13.9556 17 12.9889 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7Z"
                    fill="#0C71BF"
                  />
                </svg>
              )}

              <span className="add-salary-grade-text fs-7">No Step</span>
            </button>
          </div>
          <div className="mx-3">
            <TextInput
              placeholder="Maximum Step"
              onChange={handleChange}
              field={'maximum_step'}
              value={gradeData.maximum_step}
              type="number"
              disabled={!gradeData.step_status}
            />
          </div>
          <div className="add-salary-grade-text-btn mx-3">
            <span className="add-salary-grade-text fs-7">Pension Status:</span>
            <button
              onClick={() => handleChange(true, 'pensionable')}
              className="btn"
            >
              {!gradeData.pensionable ? (
                <svg
                  className="me-1"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C10.0222 22 8.08879 21.4135 6.4443 20.3147C4.79981 19.2159 3.51809 17.6541 2.76121 15.8268C2.00433 13.9996 1.8063 11.9889 2.19215 10.0491C2.578 8.10929 3.53041 6.32746 4.92894 4.92894C6.32746 3.53041 8.10929 2.578 10.0491 2.19215C11.9889 1.8063 13.9996 2.00433 15.8268 2.76121C17.6541 3.51809 19.2159 4.79981 20.3147 6.4443C21.4135 8.08879 22 10.0222 22 12C22 14.6522 20.9464 17.1957 19.0711 19.0711C17.1957 20.9464 14.6522 22 12 22ZM12 4C10.4178 4 8.87104 4.4692 7.55544 5.34825C6.23985 6.2273 5.21447 7.47673 4.60897 8.93854C4.00347 10.4003 3.84504 12.0089 4.15372 13.5607C4.4624 15.1126 5.22433 16.538 6.34315 17.6569C7.46197 18.7757 8.88743 19.5376 10.4393 19.8463C11.9911 20.155 13.5997 19.9965 15.0615 19.391C16.5233 18.7855 17.7727 17.7602 18.6518 16.4446C19.5308 15.129 20 13.5823 20 12C20 9.87827 19.1572 7.84344 17.6569 6.34315C16.1566 4.84286 14.1217 4 12 4Z"
                    fill="#B4B4B4"
                  />
                </svg>
              ) : (
                <svg
                  width="19"
                  className="me-1"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z"
                    fill="#0C71BF"
                  />
                  <path
                    d="M12 7C11.0111 7 10.0444 7.29324 9.22215 7.84265C8.39991 8.39206 7.75904 9.17295 7.3806 10.0866C7.00217 11.0002 6.90315 12.0055 7.09608 12.9755C7.289 13.9454 7.76521 14.8363 8.46447 15.5355C9.16373 16.2348 10.0546 16.711 11.0246 16.9039C11.9945 17.0969 12.9998 16.9978 13.9134 16.6194C14.827 16.241 15.6079 15.6001 16.1574 14.7779C16.7068 13.9556 17 12.9889 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7Z"
                    fill="#0C71BF"
                  />
                </svg>
              )}

              <span className="add-salary-grade-text fs-7">Pensionable</span>
            </button>
            <button
              onClick={() => handleChange(false, 'pensionable')}
              className="btn"
            >
              {gradeData.pensionable ? (
                <svg
                  className="me-1"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C10.0222 22 8.08879 21.4135 6.4443 20.3147C4.79981 19.2159 3.51809 17.6541 2.76121 15.8268C2.00433 13.9996 1.8063 11.9889 2.19215 10.0491C2.578 8.10929 3.53041 6.32746 4.92894 4.92894C6.32746 3.53041 8.10929 2.578 10.0491 2.19215C11.9889 1.8063 13.9996 2.00433 15.8268 2.76121C17.6541 3.51809 19.2159 4.79981 20.3147 6.4443C21.4135 8.08879 22 10.0222 22 12C22 14.6522 20.9464 17.1957 19.0711 19.0711C17.1957 20.9464 14.6522 22 12 22ZM12 4C10.4178 4 8.87104 4.4692 7.55544 5.34825C6.23985 6.2273 5.21447 7.47673 4.60897 8.93854C4.00347 10.4003 3.84504 12.0089 4.15372 13.5607C4.4624 15.1126 5.22433 16.538 6.34315 17.6569C7.46197 18.7757 8.88743 19.5376 10.4393 19.8463C11.9911 20.155 13.5997 19.9965 15.0615 19.391C16.5233 18.7855 17.7727 17.7602 18.6518 16.4446C19.5308 15.129 20 13.5823 20 12C20 9.87827 19.1572 7.84344 17.6569 6.34315C16.1566 4.84286 14.1217 4 12 4Z"
                    fill="#B4B4B4"
                  />
                </svg>
              ) : (
                <svg
                  width="19"
                  className="me-1"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z"
                    fill="#0C71BF"
                  />
                  <path
                    d="M12 7C11.0111 7 10.0444 7.29324 9.22215 7.84265C8.39991 8.39206 7.75904 9.17295 7.3806 10.0866C7.00217 11.0002 6.90315 12.0055 7.09608 12.9755C7.289 13.9454 7.76521 14.8363 8.46447 15.5355C9.16373 16.2348 10.0546 16.711 11.0246 16.9039C11.9945 17.0969 12.9998 16.9978 13.9134 16.6194C14.827 16.241 15.6079 15.6001 16.1574 14.7779C16.7068 13.9556 17 12.9889 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7Z"
                    fill="#0C71BF"
                  />
                </svg>
              )}

              <span className="add-salary-grade-text fs-7">
                Not Pensionable
              </span>
            </button>
          </div>
          <div className="mb-3 mx-3">
            <button
              onClick={async () => {
                let data = await addGradeLevel();
                if (data) handleUpdate();
              }}
              className="create-account-btn"
            >
              <p>{loading ? 'Loading...' : 'Submit'}</p>
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default AddGradeLevel;
