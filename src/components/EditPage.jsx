import { useState } from "react";
import PersonalForm from "./PersonalForm";
import Wrapper from "./Wrapper";
import ExperianceForm from "./ExperianceForm";
import MainHeading from "./MainHeading";
import './Model.css';
import EducationalForm from "./EducationalForm";
import { useNavigate, useParams } from "react-router-dom";
import './EditPage.css';

function EditPage() {


//all newly done things here
let { id } = useParams();
console.log(id,"adarsh")




















    // Master values so their states are retained
    const[passId,setPassId]=useState(null);

    const PassIdFunc=(pasId)=>{
        console.log(pasId,"tiger");
        setPassId(pasId);
    }
    const [formdata, setformdata] = useState({
        qualification: "",
        decipline: "",
        university: "",
        yearOfPassing: null,
        cgpa: null,
        percentage: null,
        userid: passId,
    });
   

    const setterFunc = (data) => {
        setformdata(data);
    }
    //setting the Id to pass for validation
    

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
        userid: passId,
    });

    const setInitial = (data) => {
        console.log(data);
        setdataForm(data);
    }
    //personal page initial details setting
    const setPersonal=(temp)=>{
        setTempData(temp);
    }
const[startValues,setTempData]=useState({
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
const Navigate=useNavigate();
const handleBack=()=>{
 Navigate('/contact')
}

    return (
        <div className="register-container">
            <div className="hori-editpage">
          <div className="create-tab">Edit Employee Details</div>
          <div onClick={handleBack} className="backbutton">back</div>
          </div>
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
                
                {currentTab === "Personal" && <PersonalForm setEmpId={PassIdFunc} setStartDetails={setPersonal} startDetails={startValues}/>}
                {currentTab === "Educational Qualification" && 
                    <EducationalForm initialDetails={formdata} setInitialDetails={setterFunc} passedId={passId}/>
                }
                {currentTab === "Previous Experience" && 
                    <ExperianceForm initialDetailss={formsData} setInitialDetails={setInitial} passedId={passId}/>
                }
            </div>
        </div>
    );
}

export default EditPage;
