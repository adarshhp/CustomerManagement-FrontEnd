import { useState } from "react";
import PersonalForm from "./PersonalForm";
import Wrapper from "./Wrapper";
import ExperianceForm from "./ExperianceForm";
import MainHeading from "./MainHeading";
import './Model.css';
import EducationalForm from "./EducationalForm";

function Register() {
    const [passId, setPassId] = useState(null);

    const PassIdFunc = (pasId) => {
        console.log(pasId, "tiger");
        setPassId(pasId);
    };

    const [formdata, setFormdata] = useState({
        qualification: "",
        decipline: "",
        university: "",
        yearOfPassing: null,
        cgpa: null,
        percentage: null,
        userid: passId,
    });

    const setterFunc = (data) => {
        setFormdata(data);
    };

    const [currentTab, setCurrentTab] = useState("Personal");

    const handleTabChange = (tab) => {
        if (tab === "Educational Qualification" || tab === "Previous Experience") {
            if (passId) {
                setCurrentTab(tab);
            }
        } else {
            setCurrentTab(tab);
        }
    };

    const [formsData, setFormsData] = useState({
        companyName: "",
        designation: "",
        startDate: "",
        lastDate: "",
        userid: passId,
    });

    const setInitial = (data) => {
        console.log(data);
        setFormsData(data);
    };

    const [startValues, setStartValues] = useState({
        fname: "",
        lname: "",
        reportingManager: "",
        email: "",
        employeeID: "",
        permAddr: "",
        mstatus: "",
        panNum: "",
        gender: "",
        bldGrp: "",
        phNum: "",
        dob: "",
        nationality: "",
        aadhaarNum: "",
        divisionOfEmployee: "",
        roleOFEmployee: "",
        rank: ""
    });

    const setPersonal = (temp) => {
        setStartValues(temp);
    };

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
                    className={`tab-button ${currentTab === "Educational Qualification" ? "active" : ""} ${!passId ? "disabled" : ""}`}
                    onClick={() => handleTabChange("Educational Qualification")}
                    disabled={!passId}
                >
                    Educational Qualification
                </button>
                <button
                    className={`tab-button ${currentTab === "Previous Experience" ? "active" : ""} ${!passId ? "disabled" : ""}`}
                    onClick={() => handleTabChange("Previous Experience")}
                    disabled={!passId}
                >
                    Previous Experience
                </button>
            </div>
            <div className="tab-content">
                {currentTab === "Personal" && <PersonalForm setEmpId={PassIdFunc} setStartDetails={setPersonal} startDetails={startValues} />}
                {currentTab === "Educational Qualification" && 
                    <EducationalForm initialDetails={formdata} setInitialDetails={setterFunc} passedId={passId} />
                }
                {currentTab === "Previous Experience" && 
                    <ExperianceForm initialDetailss={formsData} setInitialDetails={setInitial} passedId={passId} />
                }
            </div>
        </div>
    );
}

export default Register;
