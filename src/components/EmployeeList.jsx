import { useState, useEffect } from 'react';
import './EmployeeList.css';
import apiRequest from "../lib/apiRequest";


function EmployeeList() {
    const [employee, setEmployeeList] = useState([]);

    const fetchEvents = async () => {
        try {
            const response = await apiRequest('');
            if (response) {
                setEmployeeList(response);
            }
        }
        catch (error) {
            console.log("some error while fetching employee details")
        }
    }
    useEffect(() => {
        fetchEvents();
    }, [])
    return (
        <div>

            <div className="topbarr">
                <div className="headingg">Employee List</div>

                <div className="search-containerr">
                    <form>
                        <input type="text" placeholder="Search" name="search" className="input" />
                        <button type="submit" className='butto'>Q</button>
                    </form>
                </div>
            </div>
            <div className='initial-place'>
                <div className='table-container'>
                    {employee.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Sl.No</th>
                                    <th>Name</th>
                                    <th>Date of joining</th>
                                    <th>Division</th>
                                    <th>Contact</th>
                                    <th>Reporting Manager</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>sample data</td>
                                    <td>sample data</td>
                                    <td>sample data</td>
                                    <td>sample data</td>
                                    <td>sample data</td>
                                    <td>sample data</td>
                                    <td>sample data</td>
                                </tr>

                            </tbody>
                        </table>) : (
                        <p className='nodetails'>no previous employee details added</p>
                    )
                    }
                </div>
            </div>
        </div>
    );
}

export default EmployeeList;
