import PersonalForm from "./PersonalForm";
import Wrapper from "./Wrapper";
import ExperianceForm from "./ExperianceForm";
import MainHeading from "./MainHeading";
import './Model.css';

function Register(){
    return(
        <div className="wrapperdis">
            <div>
                    {<MainHeading />}
                </div >   
        <Wrapper name="Personal" formComponent={<PersonalForm/>} openflip={true}/>
        <Wrapper name="Previous Experience" formComponent={<ExperianceForm/> }openflip={false}/>
        </div>

    )
}
export default Register;