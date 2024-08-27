import React, { useState } from 'react';
import sty from "./sidebar.module.css";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from 'react-router-dom'; // Assuming you're using react-router

export default function SideBar() {
    const [activeTab, setActiveTab] = useState('/'); // Default to the home route

    const handleTabClick = (path) => {
        setActiveTab(path);
    };

    return (
        <div className={sty.sidebar}>
            <ul className={sty.unlist}>
                <li className={sty.lilist}>
                    <Link 
                        to="/" 
                        className={activeTab === '/' ? sty.active : ''} 
                        onClick={() => handleTabClick('/')}
                    >
                        <span><DashboardIcon /></span>Dash Board
                    </Link>
                </li>
                <li className={sty.lilist}>
                    <Link 
                        to="/about" 
                        className={activeTab === '/about' ? sty.active : ''} 
                        onClick={() => handleTabClick('/about')}
                    >
                        <span><PersonAddIcon /></span>Create Employee
                    </Link>
                </li>
                <li className={sty.lilist}>
                    <Link 
                        to="/contact" 
                        className={activeTab === '/contact' ? sty.active : ''} 
                        onClick={() => handleTabClick('/contact')}
                    >
                        <span><PeopleIcon /></span>Employee List
                    </Link>
                </li>
            </ul>
        </div>
    );
}
