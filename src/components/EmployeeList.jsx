import { useState, useEffect } from 'react';
import './EmployeeList.css';
import apiRequest from "../lib/apiRequest";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function EmployeeList() {
    const [employee, setEmployeeList] = useState([]);
    console.log(employee, "messiiii")

    const fetchEvents = async () => {
        try {
            const response = await apiRequest('/getAllUsers');
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





    const handleSearch = (e) => {
        setSearchItem(e.target.value);
    }

    const handleSearchCondition = (e) => {
        setSearchCondition(e.target.value);
        console.log(searchCondition, "jkkkkkkkkk")
    }
    const [searchCondition, setSearchCondition] = useState("fname");

    const [searchItem, setSearchItem] = useState("");


    const Employees = employee.filter(emp =>
        emp[searchCondition].toLowerCase().includes(searchItem.toLowerCase())

    );

    const [itemToDeletee, setItemToDelete] = useState(null)
    const handleDelete = async (value) => {
        try {
            await apiRequest('/deleteuser', "DELETE", value);

            toast.success("Successfully deleted employee details");
            await fetchEvents();
        } catch (error) {
            console.error("Error while deleting: ", error);
            toast.error("Some problem while deleting");
        }
    };

    const handleFilter = () => {
if(filterstatus === false){
        setFilterStatus(true)
}else{
    setFilterStatus(false)
}

    }
    const [filterstatus, setFilterStatus] = useState(false);
    // const Navigate=useNavigate();
    // const bringEdit=(id)=>{
    //     console.log("navigation")
    //     Navigate(`/editpage?id=${id}}`)
    // }

    const Navigate=useNavigate();

    const bringEdit=(id)=>{
        console.log(id,"oooooooooo")
        Navigate(`/editpage/${id}`)
    }

    return (
        <div>
            <ToastContainer />
            <div className="topbarr">
                <div className="headingg">Employee List</div>
                {filterstatus ? (<div className='addfilter'>
                    <select className='search-c' onChange={handleSearchCondition}>
                        <option name='fname'>fname</option>
                        <option name='fname'>fname</option>
                        <option name='fname'>fname</option>
                        <option name='divisionOfEmployee'>divisionOfEmployee</option>
                        <option name='reportingManager'>reportingManager</option>
                    </select>
                </div>) : (<p></p>)}
                <div className='search-filter'>
                    <div className=''>
                        <button className='filter-button' onClick={handleFilter}>ADD FILTER</button>
                    </div>

                    <div className="search-containerr">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input type="text" placeholder="Search" name="search" value={searchItem} onChange={handleSearch} className="input" />
                            <button type="submit" className='butto'>Q</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className='initial-place'>
                <div className='table-container'>
                    {Employees.length > 0 ? (
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
                                {Employees.map((value, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{value.fname}</td>
                                        <td>{value.doj}</td>
                                        <td>{value.divisionOfEmployee}</td>
                                        <td>{value.phNum}</td>
                                        <td>{value.reportingManager}</td>
                                        <td className='editdeleteicons'>
                                            <p className='' id='edit-icon' title='edit' >
                                                <svg width="22" height="30" viewBox="0 0 42 50" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>bringEdit(value.userId)}>
                                                    <path d="M31.1576 0.571289L25.9647 6.69629L36.3505 18.9463L41.5435 12.8213L31.1576 0.571289ZM20.7717 12.8213L0 37.3213V49.5713H10.3859L31.1576 25.0713L20.7717 12.8213Z" fill="black" />
                                                </svg>
                                            </p>

                                            <p className='delete-button' id='delete-icon' title='delete' onClick={() => handleDelete(value)}>
                                                <svg width="22" height="30" viewBox="0 0 41 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.6875 49.5713C6.27812 49.5713 5.07204 49.0386 4.06925 47.9733C3.06646 46.908 2.56421 45.6259 2.5625 44.1268V8.73796H0V3.29351H12.8125V0.571289H28.1875V3.29351H41V8.73796H38.4375V44.1268C38.4375 45.6241 37.9361 46.9062 36.9333 47.9733C35.9305 49.0405 34.7236 49.5731 33.3125 49.5713H7.6875ZM33.3125 8.73796H7.6875V44.1268H33.3125V8.73796ZM12.8125 38.6824H17.9375V14.1824H12.8125V38.6824ZM23.0625 38.6824H28.1875V14.1824H23.0625V38.6824Z" fill="black" />
                                                </svg>
                                            </p>
                                        </td>
                                    </tr>
                                ))

                                }

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
