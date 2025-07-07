import "./PersonalForm.css";
import { useState } from "react";
//import MainHeading from "./MainHeading";
function Wrapper({ name, formComponent, isOpen = false,onToggle }) {
  const [showFormData, setShowFormData] = useState(isOpen);
  const toggleFormVisibility = () => {
    setShowFormData((prev) => !prev);
    if (onToggle) {
      onToggle(); // Notify parent to update the current open section
    }
  };
  console.log(showFormData,isOpen);
  return (
    <>
      <div>
        <div className={`${isOpen?"showColor":""} prsnl`} onClick={(e) => {
                  e.stopPropagation(); 
                  toggleFormVisibility();
              }}>
          {!isOpen? (
            <button
              className="butt"
            >
              {" "}
              <svg
                width="35"
                height="35"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 14V30M14 22H30M42 22C42 33.0457 33.0457 42 22 42C10.9543 42 2 33.0457 2 22C2 10.9543 10.9543 2 22 2C33.0457 2 42 10.9543 42 22Z"
                  stroke="#1E1E1E"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => {
                setShowFormData(!showFormData);
              }}
              className="butt"
            >
              <svg
                width="35"
                height="35"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 43.2C13.416 43.2 4.8 34.584 4.8 24C4.8 13.416 13.416 4.8 24 4.8C34.584 4.8 43.2 13.416 43.2 24C43.2 34.584 34.584 43.2 24 43.2ZM24 0C20.8483 0 17.7274 0.620779 14.8156 1.82689C11.9038 3.033 9.25804 4.80083 7.02944 7.02944C2.52856 11.5303 0 17.6348 0 24C0 30.3652 2.52856 36.4697 7.02944 40.9706C9.25804 43.1992 11.9038 44.967 14.8156 46.1731C17.7274 47.3792 20.8483 48 24 48C30.3652 48 36.4697 45.4714 40.9706 40.9706C45.4714 36.4697 48 30.3652 48 24C48 20.8483 47.3792 17.7274 46.1731 14.8156C44.967 11.9038 43.1992 9.25804 40.9706 7.02944C38.742 4.80083 36.0962 3.033 33.1844 1.82689C30.2726 0.620779 27.1517 0 24 0ZM12 26.4H36V21.6H12"
                  fill="black"
                />
              </svg>
            </button>
          )}
          <span className="namer_label"> {name} </span>
        </div>
      </div>
      {isOpen && <div className="wrapper_form">{formComponent}</div>}
    </>
  );
}
export default Wrapper;
