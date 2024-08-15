import sty from "./sidebar.module.css"
import Register from "./Register";
export default function SideBar(){
    return(
        <div className={sty.sidebar}>
          <h2>Sidebar</h2>
          <ul className={sty.unlist}>
            <li className={sty.lilist}><a href="/">Dash Board</a></li>
            <li className={sty.lilist} ><a href="/about">Create Employee</a></li>
            <li className={sty.lilist}><a href="/contact">Employee List</a></li>
          </ul>
        </div>
    );
}