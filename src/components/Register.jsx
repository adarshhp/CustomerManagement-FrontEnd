import PersonalForm from "./PersonalForm";
import Wrapper from "./Wrapper";

function Register(){
    return(
        <Wrapper name="Personal" formComponent={<PersonalForm/>}/>
    )
}
export default Register;