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

    // Experience component state
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

    return (
        <div className="register-container">
          <div className="create-tab">Create Employee</div>
            <div className="tabs">
                <button
                    className={`tab-button ${currentTab === "Personal" ? "active" : ""}`}
                    onClick={() => handleTabChange("Personal")}
                >
                    Employee Details
                </button>
                <button
                    className={`tab-button ${currentTab === "Educational Qualification" ? "active" : ""}`}
                    onClick={() => handleTabChange("Educational Qualification")}
                >
                    Educational Qualification
                </button>
                <button
                    className={`tab-button ${currentTab === "Previous Experience" ? "active" : ""}`}
                    onClick={() => handleTabChange("Previous Experience")}
                >
                    Previous Experience
                </button>
            </div>
            <div className="tab-content">
                
                {currentTab === "Personal" && <PersonalForm />}
                {currentTab === "Educational Qualification" && 
                    <EducationalForm initialDetails={formdata} setInitialDetails={setterFunc} />
                }
                {currentTab === "Previous Experience" && 
                    <ExperianceForm initialDetailss={formsData} setInitialDetails={setInitial} />
                }
            </div>
        </div>
    );
}

export default Register;
