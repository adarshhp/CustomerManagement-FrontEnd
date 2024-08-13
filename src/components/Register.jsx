import PersonalForm from "./PersonalForm";
import Wrapper from "./Wrapper";
import ExperianceForm from "./ExperianceForm";
import MainHeading from "./MainHeading";
import './Model.css';
import EducationalForm from "./EducationalForm";
import PreviousExperiance from "./PreviousExperiance";
import { useEffect, useState } from "react";

function Register(){
    //master values so they're states are retained
    
    const [formdata, setformdata] = useState({
        qualification: "",
        decipline: "",
        university: "",
        yearOfPassing: null,
        cgpa: null,
        percentage: null,
        userid: 7,
      });
      const setterFunc = (data) => {
        console.log(data);
        setformdata(data);
    }
    useEffect(()=>{
        console.log(formdata);
    },[formdata]);
    const [currentOpen, setCurrentOpen] = useState("Personal");

    const handleToggle = (section) => {
        // Toggle the visibility of the section
        setCurrentOpen((prev) => (prev === section ? null : section));
    };


//experiance component
const [formsData, setdataForm] = useState({
    companyName: "",
    designation: "",
    startDate: "",
    lastDate: "",
    userid: 7,
  });
  const setInitial = (data) => {
    console.log(data);
    setdataForm(data);
}
    return(
        <div className="wrapperdis">
            <div>
                    {<MainHeading />}
                </div >   
                <Wrapper name="Personal" formComponent={<PersonalForm/>} isOpen={currentOpen === "Personal"}
                onToggle={() => handleToggle("Personal")} />
                <Wrapper name="Educational Qualification" formComponent={<EducationalForm initialDetails={formdata} setInitialDetails={setterFunc}/>}  isOpen={currentOpen === "Educational Qualification"}
                onToggle={() => handleToggle("Educational Qualification")} />
                <Wrapper name="Previous Experience" formComponent={<ExperianceForm  initialDetailss={formsData} setInitialDetails={setInitial}/> }  isOpen={currentOpen === "Previous Experience"}
                onToggle={() => handleToggle("Previous Experience")} />
        </div>

    )
}
export default Register;