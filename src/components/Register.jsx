import PersonalForm from "./PersonalForm";
import Wrapper from "./Wrapper";
import ExperianceForm from "./ExperianceForm";

function Register(){
    return(
        <div>
        <Wrapper name="Personal" formComponent={<PersonalForm/>}/>
        <Wrapper name="Previous Experiance" formComponent={<ExperianceForm/>}/>
        </div>

    )
}
export default Register;