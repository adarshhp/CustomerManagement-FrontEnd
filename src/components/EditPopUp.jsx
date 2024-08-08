import apiRequest from "../lib/apiRequest";
import sty from "./formatedStyle.module.css";
import edb from "./EditPopUp.module.css";
import { useEffect, useState } from "react";
export default function EditPopUp({initialDetails,close}) {
  const [isFilled, setIsFilled] = useState(false);
  const [isDisciplineFilled, setIsDisciplineFilled] = useState(false);
  const [isYoPFilled, setYoPFilled] = useState(false);
  const [qualData, setQualData] = useState([]);
  const [discipline, setdiscipline] = useState([]);
  const [required, setRequired] = useState(true);
  const [selQual, setSelQual] = useState("");
  const [formdata, setformdata] = useState({
    qualification: "",
    decipline: "",
    university: "",
    yearOfPassing: null,
    cgpa: null,
    percentage: null,
    userid: 7,
  });
  useEffect(() => {
    if (formdata.cgpa == null && formdata.percentage == null) {
      setRequired(true);
      console.log("none is filled");
    } else {
      console.log("one is fillind");
      setRequired(false);
    }
  }, [formdata.cgpa, formdata.percentage]);
  function handleChange(e) {
    const { name, value } = e.target;
    if (name == "qualification") {
      setIsFilled(e.target.value !== "");
      setSelQual(value);
    } else if (name == "decipline") {
      setIsDisciplineFilled(e.target.value !== "");
    } else if (name == "yearOfPassing") {
      setYoPFilled(e.target.value !== "");
    }
    if ((name == "percentage" || name == "cgpa") && value == "") {
      setformdata({ ...formdata, [name]: null });
    } else {
      setformdata({ ...formdata, [name]: value });
    }
  }
  useEffect(() => {
    setformdata({...formdata,initialDetails});
    const fetchInitial = async () => {
      const data = await apiRequest("/qualdetail");
      setQualData(data.data);
    };
    fetchInitial();
  }, []);
  useEffect(() => {
    const fetchDisp = async () => {
      const data = await apiRequest("/listdeciplines", "POST", {
        Qualification: selQual,
      });
      setdiscipline(data.data);
    };
    if (selQual != "") {
      fetchDisp();
    }
  }, [selQual]);
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  const year = new Date().getFullYear();
  const years = Array.from(new Array(40), (val, index) => year - index);
  return (
    <>
    <form onSubmit={(e)=>handleSubmit(e)}>
      <div className={edb.largebox}>
        <div className={edb.smallbox}>
          <div className="row">
            <div
              className={`${
                isFilled ? `${sty.select_filled}` : `${sty.form_group}`
              }`}
            >
              <select
                className="item quali sel"
                onChange={handleChange}
                value={formdata.qualification}
                name="qualification"
                required
              >
                <option value=""></option>
                {qualData.map((val, index) => (
                  <>
                    <option value={val} key={index}>
                      {val}
                    </option>
                  </>
                ))}
              </select>
              <label
                htmlFor="qualification"
                className={`${isFilled ? `${sty.sel_label}` : ""}`}
              >
                <span className="star">*</span>Qualifiction
              </label>
            </div>
            <div
              className={`${
                isDisciplineFilled
                  ? `${sty.select_filled}`
                  : `${sty.form_group}`
              }`}
            >
              <select
                className="item quali sel"
                name="decipline"
                onChange={handleChange}
                value={formdata.decipline}
                required
              >
                <option value=""></option>
                {discipline.map((val, index) => (
                  <>
                    <option value={val} key={index}>
                      {val}
                    </option>
                  </>
                ))}
              </select>
              <label
                htmlFor="decipline"
                className={`${isDisciplineFilled ? `${sty.sel_label}` : ""}`}
              >
                <span className="star">*</span>Discipline
              </label>
            </div>
            <div className={sty.form_group}>
              <input
                type="text"
                placeholder=""
                className="quali"
                name="university"
                onChange={handleChange}
                value={formdata.university}
                required
              ></input>
              <label htmlFor="university">
                <span className="star">*</span>University Name
              </label>
            </div>
            <div
              className={`${
                isYoPFilled ? `${sty.select_filled}` : `${sty.form_group}`
              }`}
            >
              <select
                className="item quali sel"
                name="yearOfPassing"
                onChange={handleChange}
                value={formdata.yearOfPassing}
                required
              >
                <option value=""></option>
                {years.map((year, index) => {
                  return (
                    <option key={`year${index}`} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
              <label
                htmlFor="yearOfPassing"
                className={`${isYoPFilled ? `${sty.sel_label}` : ""}`}
              >
                <span className="star">*</span>Year of Passing
              </label>
            </div>
            <div className={sty.form_group}>
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                placeholder=""
                className="quali"
                name="cgpa"
                onChange={handleChange}
                value={formdata.cgpa}
                title="Please select either one of CGPA or Percentage"
                required={required}
              ></input>
              <label htmlFor="cgpa">CGPA</label>
            </div>
            <div className={sty.form_group}>
              <input
                type="number"
                min="0"
                max="100"
                placeholder=""
                className="quali"
                name="percentage"
                onChange={handleChange}
                value={formdata.percentage}
                required={required}
                title="Please select either one of CGPA or Percentage"
              />
              <label htmlFor="percentage">Percentage %</label>
            </div>
            <button type="submit" className="submitbtn">
              <svg
                width="30"
                height="30"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="imag"
              >
                <path
                  d="M30 38V22H10V38M10 2V12H26M34 38H6C4.93913 38 3.92172 37.5786 3.17157 36.8284C2.42143 36.0783 2 35.0609 2 34V6C2 4.93913 2.42143 3.92172 3.17157 3.17157C3.92172 2.42143 4.93913 2 6 2H28L38 12V34C38 35.0609 37.5786
                  36.0783 36.8284 36.8284C36.0783 37.5786 35.0609 38 34 38Z"
                  stroke="#1E1E1E"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      </form>
    </>
  );
}
