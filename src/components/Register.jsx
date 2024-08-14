import { useState } from "react";
import PersonalForm from "./PersonalForm";
import Wrapper from "./Wrapper";
import ExperianceForm from "./ExperianceForm";
import MainHeading from "./MainHeading";
import './Model.css';
import EducationalForm from "./EducationalForm";

function Register() {
    // Master values so their states are retained
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

    const [currentTab, setCurrentTab] = useState("Personal");

    const handleTabChange = (tab) => {
        setCurrentTab(tab);
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
    );
}

export default Register;
