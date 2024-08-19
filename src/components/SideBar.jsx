import sty from "./sidebar.module.css"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';
import Register from "./Register";

export default function SideBar(){
    return(
        <div className={sty.sidebar}>
          
          <ul className={sty.unlist}>
            <ul className={sty.lilist}><a href="/" className="black"><span> <DashboardIcon/></span>Dash Board</a></ul>
            <ul className={sty.lilist} ><a href="/about" className="black"><span> <PersonAddIcon/></span>Create Employee</a></ul>
            <ul className={sty.lilist}><a href="/contact" className="black"><span> <PeopleIcon/></span>Employee List</a></ul>
          </ul>
        </div>
    );
}