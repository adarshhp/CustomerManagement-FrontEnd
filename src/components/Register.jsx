import PersonalForm from "./PersonalForm";
import Wrapper from "./Wrapper";
import ExperianceForm from "./ExperianceForm";
import MainHeading from "./MainHeading";
import './Model.css';
import EducationalForm from "./EducationalForm";
import PreviousExperiance from "./PreviousExperiance";

function Register(){
    return(
        <div className="wrapperdis">
            <div>
                    {<MainHeading />}
                </div >   

                <Wrapper name="Personal" formComponent={<PersonalForm/>} isOpen={true}/>
                <Wrapper name="Educational Details" formComponent={<EducationalForm/>} />
                <Wrapper name="Previous Experience" formComponent={<ExperianceForm/> }/>
                
        </div>

    )
}
export default Register;