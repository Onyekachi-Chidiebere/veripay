import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import { NavLink } from 'react-router-dom';
import useBasicScale from '../hooks/useBasicScale';
import BasicScaleAddTable from './BasicScaleAddTable';
import DeleteDialog from './deleteDialog/DeleteDialog';
import Select, { SelectPopUp } from './Select';

const AddBasicLevel = () => {
  const {
    error,
    regimes,
    levels,
    selectRegime,
    selectStructure,
    deleteBasicScale,
    basicData,
    structures,
    gradeLevels,
    showSelectNew,
    confirmDel,
    setConfirmDel,
    setShowSelectNew,
    getBasicLevels,
    selectLevel,
    updateValue,
    setSuccess,
    finish,
    updateMyData,
    updateRegime,
    openSelectLevel,
    setError,
    success,
  } = useBasicScale();
  useEffect(() => {
    updateRegime();
  }, []);
  useEffect(() => {
    levels.sort((a, b) => {
      console.log({ a: a.grade_name, b: b.grade_name });
      return a.grade_name.localeCompare(b.grade_name);
    });
  }, [levels]);

  return (
    <div className="w-100  dashboard-main-card">
      {confirmDel && (
        <DeleteDialog
          name={confirmDel.grade_level}
          _delete={() => {
            deleteBasicScale(confirmDel);
          }}
          closeDialog={() => setConfirmDel(false)}
        />
      )}
      {showSelectNew && (
        <SelectPopUp
          items={levels}
          id="grade_name"
          handleSelect={selectLevel}
          handleClose={() => setShowSelectNew(false)}
        />
      )}
      <div className="w-100 pt-4 dashboard-card">
        {success && (
          <SweetAlert
            success
            title="Success"
            onConfirm={() => {
              setConfirmDel(false);
              setSuccess(false);
            }}
            onCancel={() => {
              setConfirmDel(false);
              setSuccess(false);
            }}
          >
            {success}
          </SweetAlert>
        )}
        {error && (
          <SweetAlert
            error
            title="Error"
            onConfirm={() => {
              setError(false);
            }}
            onCancel={() => {
              setError(false);
            }}
          >
            {error}
          </SweetAlert>
        )}
        <div className="salary-regime-menu d-flex justify-content-between mt-4 mx-4 align-items-center">
          <span className="salary-regime-title mx-3 fs-6 mb-3">
            Basic Salary Scale
          </span>
          <NavLink
            to="/dashboard/setup/salary_structure/structure"
            className="edit-grade-scale-btn "
          >
            <span className="fs-7">{'View Regime Structures'}</span>
          </NavLink>
        </div>
        <div className="pt-4 pb-4"></div>
        <Row className="justify-content-md-center">
          <Col md={5}>
            <Select
              label="Salary Scale Regime "
              text={basicData.regime.regime_name}
              data={regimes}
              handleSelect={selectRegime}
              id="regime_name"
              disabled={true}
            />
            <Select
              label="Salary Structure "
              text={basicData.structure.structure_name}
              data={structures}
              handleSelect={selectStructure}
              id="structure_name"
            />
          </Col>
        </Row>
        <div className="basic-scale-divider" />
        {basicData.structure.structure_name && (
          <BasicScaleAddTable
            updateMyData={updateMyData}
            confirmDel={confirmDel}
            setConfirmDel={setConfirmDel}
            deleteBasicScale={deleteBasicScale}
            structure={basicData.structure.structure_name}
            showSelectNew={showSelectNew}
            openSelectLevel={openSelectLevel}
            data={gradeLevels}
            levels={levels}
            selectLevel={selectLevel}
            updateValue={updateValue}
            finish={finish}
          />
        )}
      </div>
    </div>
  );
};
export default AddBasicLevel;
