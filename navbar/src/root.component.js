import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import './style.css';
export default function Root(props) {
  let sidebar = document.querySelector('.root-side-bar')
  return  <nav className="dasbboard-nav">
        <div className="dasbboard-logo-container">
          <img src={logo} alt="Logo" className="dashboard-logo" />
          <h1 className="dasbboard-logo-label">Veripay</h1>
        </div>
        <div className="d-flex">
          {/* notification icon */}
          <button className="btn ">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.6734 17.5533C19.0306 16.9802 18.4677 16.3232 18.0001 15.6C17.4896 14.6017 17.1836 13.5115 17.1001 12.3933V9.10002C17.1045 7.34376 16.4675 5.64633 15.3086 4.32666C14.1498 3.007 12.5489 2.15592 10.8068 1.93335V1.07335C10.8068 0.837307 10.713 0.610932 10.5461 0.444025C10.3792 0.277117 10.1528 0.18335 9.91678 0.18335C9.68074 0.18335 9.45436 0.277117 9.28746 0.444025C9.12055 0.610932 9.02678 0.837307 9.02678 1.07335V1.94668C7.30028 2.1853 5.71876 3.04152 4.57513 4.35675C3.4315 5.67199 2.80327 7.35711 2.80678 9.10002V12.3933C2.72328 13.5115 2.4173 14.6017 1.90678 15.6C1.44737 16.3216 0.893577 16.9785 0.260114 17.5533C0.189002 17.6158 0.132008 17.6927 0.0929255 17.7789C0.0538429 17.8651 0.0335671 17.9587 0.0334473 18.0533V18.96C0.0334473 19.1368 0.103685 19.3064 0.228709 19.4314C0.353734 19.5564 0.523303 19.6267 0.700114 19.6267H19.2334C19.4103 19.6267 19.5798 19.5564 19.7049 19.4314C19.8299 19.3064 19.9001 19.1368 19.9001 18.96V18.0533C19.9 17.9587 19.8797 17.8651 19.8406 17.7789C19.8016 17.6927 19.7446 17.6158 19.6734 17.5533ZM1.42011 18.2933C2.04039 17.6942 2.58651 17.0227 3.04678 16.2933C3.68986 15.0877 4.06507 13.7574 4.14678 12.3933V9.10002C4.12034 8.31871 4.2514 7.54007 4.53214 6.81046C4.81289 6.08086 5.23759 5.41521 5.78095 4.85315C6.3243 4.29109 6.97521 3.84413 7.6949 3.53887C8.41459 3.2336 9.18836 3.07629 9.97011 3.07629C10.7519 3.07629 11.5256 3.2336 12.2453 3.53887C12.965 3.84413 13.6159 4.29109 14.1593 4.85315C14.7026 5.41521 15.1273 6.08086 15.4081 6.81046C15.6888 7.54007 15.8199 8.31871 15.7934 9.10002V12.3933C15.8752 13.7574 16.2504 15.0877 16.8934 16.2933C17.3537 17.0227 17.8998 17.6942 18.5201 18.2933H1.42011Z"
                fill="black"
              />
            </svg>
          </button>
          <button
            className="btn d-md-none d-sm-block mb-n5"
        onClick={() => {
              sidebar.classList.toggle('root-side-bar-show')
            }}
          >
            {/* tribar icon */}
            <svg
              width="41"
              height="36"
              viewBox="0 0 41 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-n5"
            >
              <path
                d="M5.59009 7.5H35.3981"
                stroke="black"
                stroke-width="3.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.59009 15.5H35.3981"
                stroke="black"
                stroke-width="3.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.59009 23.5H35.3981"
                stroke="black"
                stroke-width="3.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </nav>;
}
