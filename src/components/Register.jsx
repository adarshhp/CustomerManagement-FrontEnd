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
    },[formdata])
    return(
        <div className="wrapperdis">
            <div>
                    {<MainHeading />}
                </div >   
                <Wrapper name="Personal" formComponent={<PersonalForm/>} isOpen={true} />
                <Wrapper name="Educational Details" formComponent={<EducationalForm initialDetails={formdata} setInitialDetails={setterFunc}/>} />
                <Wrapper name="Previous Experience" formComponent={<ExperianceForm/> }/>

        </div>

    )
}
export default Register;