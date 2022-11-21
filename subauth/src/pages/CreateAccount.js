import React, { useEffect, useState } from 'react';
import OTP from '../components/OTPPopUp';
import logo from '../images/logo.svg';
import '../styles/CreateAccountStyle.css';
import { Col, Row } from 'react-bootstrap';
import useCreateAccount from '../hooks/useCreateAccount';
import Error from '../components/Error';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SelectPopUp from '../components/SelectPopUp';
import { Dots } from 'react-activity';
import accountInfoImage from '../images/accountInfoImage.png';
import accountLocationImage from '../images/accountLocationImage.png';
import { useNavigate } from 'react-router-dom';
import 'react-activity/dist/Dots.css';
import LocalizedStrings from 'react-localization';

const useStyles = makeStyles({
  underline: {
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
  },
});

const yourhandle = require('countrycitystatejson');

const CreateAccount = () => {
  const [institutionCode, setInstitutionCode] = useState(false);
  const [otp, setOtp]=useState(false)
  const year = new Date().getFullYear();
 
  // fetch('https://api.ipregistry.co/?key=kcrwcfb182aar4gm')
  //   .then(function (response) {
  //       return response.json();
  //   })
  //   .then(function (payload) {
  //     console.log({country:payload.location.country})
  //       console.log(payload.location.country.name + ', ' + payload.location.city);
  //   });

  const CompanyInfo = () => {
  let navigate = useNavigate();
  const {
      error,
      loading,
      companyData,
      handleChange,
      getCountry,
      setError,
      sendCompanyDetails,
    } = useCreateAccount();
    const [countries, setCountries] = useState([]);
    const [showSelectCode, setShowSelectCode] = useState(false);
    const handleContinue = async (e) => {
      e.preventDefault();
      //this gets the company institution code and updates the infomation for submitting company location
      let response = await sendCompanyDetails(companyData);
      if (response) {
        if (response.otp)
          setOtp(response.otp)
        if (response.institution_code)
          setInstitutionCode(response.institution_code);
      }
      return;
    };
    const classes = useStyles();
    const [country, setCounty] = useState({
      phone: '--',
      emoji: '--',
      name: '--',
    });

    const selectCountry = (country) => {
      //handles selecting the country, updating the country for client and upadatting the required state
      let value = yourhandle.getAll()[country.id];
      console.log({ccc:country})
      handleChange(country.id, 'country_id');
      let newState = [];
      for (let state in value.states) {
        newState.push({ state });
      }

      handleChange(`+${value.phone}`, 'country_code');
      handleChange(value.name, 'country');
      setCounty(value);
      setShowSelectCode(false);
    };
    useEffect(() => {
      //update country once page loads
      let newCountries = [];
      for (let country in yourhandle.getAll()) {
        newCountries.push({ ...yourhandle.getAll()[country], id: country });
      }
      //check if the account is on recovery mode and redirect to appropriate page; 
      let recovered_institution_code = localStorage.getItem('@recovered_institution_code');
      if (recovered_institution_code) {
        handleChange(recovered_institution_code, 'institution_code')
        // localStorage.removeItem('@recovered_institution_code')
      }
      setCountries(newCountries);
      // get user country on page load
      (async () => {
        let currentCountry = await getCountry();
        selectCountry(currentCountry);
      })();
    }, []);

    return (
      <div className="d-flex w-100 ">
        {error && <Error message={error} open={setError} />}

        {showSelectCode && (
          <SelectPopUp
            handleChange={handleChange}
            items={countries}
            id="name"
            param1="phone"
            param2="emoji"
            handleSelect={selectCountry}
            open={setShowSelectCode}
          />
        )}

        <img src={accountInfoImage} alt="img" className="company-info-image" />
        {/* <div className="bg-dark create-account-second-part "> */}
        <Col className=" create-account-second-part ">
          <Col md={8}>
            <p className="create-account-tag">Create Account</p>
            <p className="create-account-title-tag">
              We suggest you use your company name for your preferred url
            </p>
            <Row className="create-input-margin-bottom">
              <Col>
                <div className="create-account-input">
                  <TextField
                    fullWidth={true}
                    value={companyData.business_name}
                    InputProps={{ classes }}
                    id="filled-basic"
                    onChange={(value) => {
                      handleChange(value.target.value, 'business_name');
                      if (value.target.value.length < 15)
                        handleChange(value.target.value.toLowerCase().replace(/\s/g , ''), 'company_url');
                    }}
                    label="Company/Business Name"
                    size="small"
                  />
                </div>
              </Col>
            </Row>
            <Row className="create-input-margin-bottom">
              <Col>
                <div className="create-account-dual-input-holder">
                  <div className="create-account-input-big">
                    <TextField
                      fullWidth={true}
                      value={companyData.company_url}
                      InputProps={{ classes }}
                      id="filled-basic"
                      onChange={(value) =>
                        handleChange(value.target.value, 'company_url')
                      }
                      label="Choose Veripay Url"
                      size="small"
                    />
                  </div>
                  <div className="create-account-input-link">.veripay.ng</div>
                  {/* <i className="create-account-input-tooltip">
                            <span>i</span>
                            <p className="tooltiptext">
                              Choose the url that would be used as your veripay
                              url
                            </p>
                          </i> */}
                </div>
              </Col>
            </Row>
            <p className="create-input-url-warn">
              Company URL must contain only alphabets and must not be more than
              15 characters
            </p>
            <Row className="create-input-margin-bottom">
              <Col>
                <div className="create-account-input">
                  <TextField
                    fullWidth={true}
                    value={companyData.email}
                    InputProps={{ classes }}
                    id="filled-basic"
                    onChange={(value) =>
                      handleChange(value.target.value, 'email')
                    }
                    label="Email Address"
                    size="small"
                  />
                </div>
              </Col>
            </Row>
            <Row className="create-input-margin-bottom">
              <Col>
                <div className="create-account-dual-input-holder">
                  <div
                    onClick={() => setShowSelectCode(true)}
                    className="create-account-input-code-select"
                  >
                    <p className="create-account-code-label">Country Code</p>
                    {country.phone === '--' ? (
                      <Dots />
                    ) : (
                      <p className="create-account-code">
                        +{country.phone} {country.emoji}
                      </p>
                    )}
                  </div>
                  <div className="create-account-input-big">
                    <TextField
                      fullWidth={true}
                      onChange={(value) =>
                        handleChange(value.target.value, 'phone', true)
                      }
                      value={companyData.phone}
                      InputProps={{ classes }}
                      id="filled-basic"
                      label="Phone Number"
                      size="small"
                    />
                  </div>
                </div>
            
              </Col>
            </Row>

            <Row className="create-input-margin-bottom">
              <Col>
                <button onClick={handleContinue} className="create-account-btn">
                  <p>{loading ? 'Loading...' : 'Continue'}</p>
                </button>
                <p className="login-register-label mt-4">
              Already have an account?          
              <span 
                onClick={() => navigate('/')}
                className="login-register-link "
              >
                   &nbsp; Login 
              </span>
            </p>
              </Col>
            </Row>
          </Col>
        </Col>
        {/* </div> */}
      </div>
    );
  };

  const CompanyLocation = () => {
    const [showSelectCode, setShowSelectCode] = useState(false);
    const [showSelectState, setShowSelectState] = useState(false);
    const [showSelectCity, setShowSelectCity] = useState(false);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState([]);
    const [state, setState] = useState();
    const [countries, setCountries] = useState([]);
    const {
      companyData,
      handleChange,
      getCountry,
      loading,
      error,
      setShowOtp,
      showOtp,
      otpLoading,
      setError,
      resendOtp,
      sendLocationDetails,
      verifyOtp,
    } = useCreateAccount();
    const [country, setCounty] = useState({
      phone: '--',
      emoji: '--',
      name: '--',
    });

    const selectCountry = (country) => {
      //handles selecting the country and upadatting the required state
      let value = yourhandle.getAll()[country.id];
      let newState = [];
       handleChange(country.id, 'country_id');
      for (let state in value.states) {
        newState.push({ state });
      }

      handleChange(`+${value.phone}`, 'country_code');
      handleChange(value.name, 'country');
      setStates(newState);
      setCounty(value);
      setShowSelectCode(false);
    };

    const selectState = (state) => {
      let data = state.state;
      //handles select state
      handleChange(data, 'state');
      setState(data);
      setCities(country.states[data]);
      setShowSelectState(false);
    };

    const selectCity = (city) => {
      //handles select city
      handleChange(city.name, 'city');
      setCity(city.name);
      setShowSelectCity(false);
    };
    const classes = useStyles();
    useEffect(() => {
      //show otp if the user has gotten to otp stage;
     
        
      //update country once page loads
      let newCountries = [];
      for (let country in yourhandle.getAll()) {
        newCountries.push({ ...yourhandle.getAll()[country], id: country });
      }
      setCountries(newCountries);

      //get user country on page load
      (async () => {
        let currentCountry = await getCountry();
        selectCountry(currentCountry);
         await  handleChange(institutionCode, 'institution_code');
   
      })();
      //check if user is on otp recovery mode
    
      
    }, []);
   
    useEffect(() => {
       if (otp) 
       { setShowOtp(true);
        resendOtp(otp);
         console.log({ otp });
       }
    },[otp])

    useEffect(() => {
      (async () => {
        if (companyData.otp_code.length === 6) {
          console.log('sending code');
          await verifyOtp({
            otp_code: companyData.otp_code,
            institution_code: institutionCode,
          });
        }
      })();
    }, [companyData.otp_code]);
    console.log({showOtp})
    return (
      <div className="d-flex w-100 ">
        {error && <Error message={error} open={setError} />}
        {showOtp && (
          <OTP
            loading={otpLoading}
            handleChange={handleChange}
            handleResendOtp={()=>resendOtp(institutionCode)}
          />
        )}
        <img
          src={accountLocationImage}
          alt="img"
          className="company-info-image"
        />
        {showSelectCode && (
          <SelectPopUp
            handleChange={handleChange}
            items={countries}
            id="name"
            param1="phone"
            param2="emoji"
            handleSelect={selectCountry}
            open={setShowSelectCode}
          />
        )}
        {showSelectState && (
          <SelectPopUp
            handleChange={handleChange}
            items={states}
            id="state"
            handleSelect={selectState}
            open={setShowSelectState}
          />
        )}
        {showSelectCity && (
          <SelectPopUp
            handleChange={handleChange}
            items={cities}
            id="name"
            handleSelect={selectCity}
            open={setShowSelectCity}
          />
        )}
        {/* <div className="bg-dark create-account-second-part "> */}
        <Col className=" create-account-second-part ">
          <Col md={10}>
            <p className="create-account-tag">Company’s Location Information</p>
            <p className="create-account-title-tag">
              Enter your company’s current location
            </p>
            <Row className="create-input-margin-bottom">
              <Col>
                <div
                  onClick={() => setShowSelectCode(true)}
                  className="create-input-select-new-holder"
                >
                  <div>
                    <p className="create-input-select-new-label">Country</p>
                    <p className="create-input-select-new-value">
                      {country.name}
                    </p>
                  </div>
                  <svg
                    width="12"
                    height="7"
                    viewBox="0 0 12 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.691281 0.891231C0.826282 0.756398 1.00928 0.680664 1.20008 0.680664C1.39088 0.680664 1.57388 0.756398 1.70889 0.891231L6.00011 5.18243L10.2913 0.891231C10.4278 0.76405 10.6083 0.694811 10.7949 0.698103C10.9814 0.701394 11.1594 0.776957 11.2913 0.908874C11.4232 1.04079 11.4988 1.21876 11.5021 1.40529C11.5054 1.59182 11.4361 1.77234 11.3089 1.90883L6.50891 6.70883C6.37391 6.84366 6.19091 6.9194 6.00011 6.9194C5.80931 6.9194 5.62631 6.84366 5.49131 6.70883L0.691281 1.90883C0.556448 1.77383 0.480713 1.59083 0.480713 1.40003C0.480713 1.20923 0.556448 1.02623 0.691281 0.891231Z"
                      fill="#535461"
                    />
                  </svg>
                </div>
              </Col>
            </Row>
            <Row className="create-input-margin-bottom">
              <Col>
                <div
                  onClick={() => setShowSelectState(true)}
                  className="create-input-select-new-holder"
                >
                  <div>
                    <p className="create-input-select-new-label">State</p>
                    <p className="create-input-select-new-value">{state}</p>
                  </div>
                  <svg
                    width="12"
                    height="7"
                    viewBox="0 0 12 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.691281 0.891231C0.826282 0.756398 1.00928 0.680664 1.20008 0.680664C1.39088 0.680664 1.57388 0.756398 1.70889 0.891231L6.00011 5.18243L10.2913 0.891231C10.4278 0.76405 10.6083 0.694811 10.7949 0.698103C10.9814 0.701394 11.1594 0.776957 11.2913 0.908874C11.4232 1.04079 11.4988 1.21876 11.5021 1.40529C11.5054 1.59182 11.4361 1.77234 11.3089 1.90883L6.50891 6.70883C6.37391 6.84366 6.19091 6.9194 6.00011 6.9194C5.80931 6.9194 5.62631 6.84366 5.49131 6.70883L0.691281 1.90883C0.556448 1.77383 0.480713 1.59083 0.480713 1.40003C0.480713 1.20923 0.556448 1.02623 0.691281 0.891231Z"
                      fill="#535461"
                    />
                  </svg>
                </div>
              </Col>
            </Row>
            <Row className="create-input-margin-bottom">
              <Col>
                <div
                  onClick={() => setShowSelectCity(true)}
                  className="create-input-select-new-holder"
                >
                  <div>
                    <p className="create-input-select-new-label">City</p>
                    <p className="create-input-select-new-value">{city}</p>
                  </div>
                  <svg
                    width="12"
                    height="7"
                    viewBox="0 0 12 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.691281 0.891231C0.826282 0.756398 1.00928 0.680664 1.20008 0.680664C1.39088 0.680664 1.57388 0.756398 1.70889 0.891231L6.00011 5.18243L10.2913 0.891231C10.4278 0.76405 10.6083 0.694811 10.7949 0.698103C10.9814 0.701394 11.1594 0.776957 11.2913 0.908874C11.4232 1.04079 11.4988 1.21876 11.5021 1.40529C11.5054 1.59182 11.4361 1.77234 11.3089 1.90883L6.50891 6.70883C6.37391 6.84366 6.19091 6.9194 6.00011 6.9194C5.80931 6.9194 5.62631 6.84366 5.49131 6.70883L0.691281 1.90883C0.556448 1.77383 0.480713 1.59083 0.480713 1.40003C0.480713 1.20923 0.556448 1.02623 0.691281 0.891231Z"
                      fill="#535461"
                    />
                  </svg>
                </div>
              </Col>
            </Row>

            <Row className="create-input-margin-bottom">
              <Col>
                <div className="create-account-input">
                  <TextField
                    fullWidth={true}
                    value={companyData.zip_code}
                    type='number'
                    InputProps={{ classes }}
                    id="filled-basic"
                    onChange={(value) => {
                      handleChange(value.target.value, 'zip_code');
                    }}
                    label="Zip code"
                    size="small"
                  />
                </div>
              </Col>
            </Row>

            <Row className="create-input-margin-bottom">
              <Col>
                <div className="create-account-input-textarea">
                  <TextField
                    multiline
                    rows={4}
                    fullWidth={true}
                    value={companyData.address}
                    InputProps={{ classes }}
                    id="filled-basic"
                    onChange={(value) => {
                      handleChange(value.target.value, 'address');
                    }}
                    label="Address"
                    size="small"
                  />
                </div>
              </Col>
            </Row>
            <Row className="create-input-margin-bottom">
              <Col>
                <button
                  disabled={loading}
                  onClick={() => sendLocationDetails(companyData)}
                  className="create-account-btn"
                >
                  <p>{loading ? 'Loading...' : 'Continue'}</p>
                </button>
              </Col>
            </Row>
          </Col>
        </Col>
        {/* </div> */}
      </div>
    );
  };
  useEffect(() => {
     //update the user institution code to render location page and call resend otp function
      let recoveryOtp = localStorage.getItem('@recovered_otp_code');
      let recoveryInstitutionCode = localStorage.getItem('@recovered_institution_code');
      if (recoveryOtp) {
        setOtp(recoveryOtp)
        setInstitutionCode(recoveryOtp)
      }
    if (recoveryInstitutionCode) {
        setInstitutionCode(recoveryInstitutionCode)
      }
    },[])
  return (
    <div className="create-account-body">
      <Row className="justify-content-center">
        <Col md={10} >
          <div className="create-account-logo-container ">
            <img src={logo} alt="Logo" className="create-account-logo" />
            <p className="create-account-logo-label">Veripay</p>
          </div>

          {institutionCode ? <CompanyLocation /> : <CompanyInfo />}
        </Col>
      </Row>
      <footer>© {year} Veripay - All Rights Reserved </footer>
    </div>
  );
};
export default CreateAccount;
