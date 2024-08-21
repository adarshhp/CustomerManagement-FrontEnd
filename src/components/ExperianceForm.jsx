import React, { useState, useEffect } from 'react';
import './ExperianceForm.css';
import './PersonalForm.css';
import PopeUp from './PopeUp';
import './YourComponent.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Edit from './Edit';
import './EducationalForm.css';
import sty from "./formatedStyle.module.css";
import Model from './Model';
import edb from "./EditPopUp.module.css";
import apiRequest from '../lib/apiRequest';
import DateImage from '../icons/DateImage';



function ExperianceForm({ initialDetailss, setInitialDetails }) {
    const [status, setShowStatus] = useState(false);
    const [formsData, setFormsData] = useState({
        companyName: "",
        designation: "",
        startDate: "",
        lastDate: ""
    });

    useEffect(() => {
        setFormsData(initialDetailss);
    }, [])

    //added this shit
    //const[initialDetailss,setInitialDetails]=useState([])
    useEffect(() => {
        setInitialDetails(formsData);
        console.log("changed");
    }, [formsData]);



    const [errors, setErrors] = useState({
        startDateError: '',
        endDateError: '',
        designationError: ''

    });


    const [experiences, setExperiences] = useState([]);
    console.log(experiences + 'gvykhyukefvfgysgvoyefuskfev');



    const handleSubmit = (e) => {
        e.preventDefault();
        const datainfo = validateForm();
        if (datainfo == true) {
            setShowStatus(true);
        } else {
            console.log("error occured");

        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormsData({ ...formsData, [name]: value });

        if (name === 'startDate' || name === 'lastDate') {
            const { startDateError, endDateError } = validateDates(formsData.startDate, formsData.lastDate);
            setErrors({ ...errors, startDateError, endDateError });
        }

        if (name === 'designation') {
            const designationError = validateDesignation(value);
            setErrors({ ...errors, designationError });
        }
        if(name==='companyName'){
            let val = e.target.value.replace(/[^a-zA-Z]/g, '');
            setFormsData({ ...formsData, [name]: val });
        }
        if(name==='designation'){
            let val = e.target.value.replace(/[^a-zA-Z]/g, '');
            setFormsData({ ...formsData, [name]: val });
        }
    };



    const validateDates = (startDate, lastDate) => {
        let startDateError = '';
        let endDateError = '';
        const today = new Date().setHours(0, 0, 0, 0);

        //    if (startDate && lastDate && new Date(startDate) >= new Date(lastDate)) {
        if (new Date(startDate) >= new Date(lastDate)) {
            // startDateError = 'Invalid Date';
            endDateError = 'Invalid Date';
        }
        if (startDate && new Date(startDate) > today) {
            startDateError = 'Invalid Date'
        }
        if (lastDate && new Date(lastDate) > today) {
            endDateError = 'Invalid Date'
        }

        return { startDateError, endDateError };
    };



    const handleCancel = () => {
        setShowStatus(false);
    };
    //i am addding the designation validation logic here
    const validateDesignation = (designation) => {
        if (designation.trim() === '') {
            return '';
        }
        const designationRegex = /^[A-Za-z\s]+$/;
        return designationRegex.test(designation) ? '' : 'Invalid Character';

    };

    const validateForm = () => {
        const { startDateError, endDateError } = validateDates(formsData.startDate, formsData.lastDate);
        const designationError = validateDesignation(formsData.designation);
        console.log(designationError + 'latest check');

        if (startDateError || endDateError || designationError) {
            setErrors({ startDateError, endDateError, designationError });
            return false;
        }

        return true;
    };



    const handleConfirm = async () => {
        const { startDateError, endDateError } = validateDates(formsData.startDate, formsData.lastDate);
        const designationError = validateDesignation(formsData.designation);
        // if (!startDateError && !endDateError ) {
        if (validateForm()) {
            console.log(validateForm(), "KKKKKKKKKKKKK");

            const payload = {
                userid: 7,
                companyName: formsData.companyName,
                designation: formsData.designation,
                startDate: new Date(formsData.startDate).toISOString(),
                lastDate: new Date(formsData.lastDate).toISOString()
            };

            // fetch('http://localhost:5003/api/preexp', {
            const res = await apiRequest('/preexp', "POST", payload)
            //     method: "POST",
            //     headers: { "content-type": "application/json" },
            //     body: JSON.stringify(payload)
            // })

            if (res) {

                setExperiences([...experiences]);
                setFormsData({
                    companyName: "",
                    designation: "",
                    startDate: "",
                    lastDate: ""
                });
                setShowStatus(false);
                console.log("works until here");
                setErrors(startDateError, '');
                setErrors(designationError);
                if (res) {
                    toast(res.message);
                }


            }

        } else {
            console.log('else part is working of handle confirm')
            setErrors(...errors, { designationError: 'Invalid character' })


        }
    };
    const fetchEvents = async () => {
        console.log("inside1");
        
        try {
          //  const response= axios.get('http://192.168.2.81:5003/api/GetPrevExp/7')
           const response = await apiRequest("/GetPrevExp/7")

            console.log("tttttttt fetch events is being called")

            if (response) {
                toast(response.message);
                setExperiences(response)
                console.log(response);
            } else {
                alert('some error while fetching data')
            }
        } catch (error) {
            console.log(error);
        }


    }
  


    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    const [editstatus, setEditStatus] = useState(false);
    const [identity, setEditId] = useState([])
    //handling the edit
    const handleEdit = (val) => {
        setEditStatus(true);
        setEditId(val);
        console.log(editstatus);

    }


    const handleClose = () => {
        fetchEvents();
        try{
        console.log("handleClosemethod triggered")
        setEditStatus(false);
        }catch(error){
            console.log(error)
        }finally{
            console.log("i am here");
            fetchEvents();
        }
if(refresh){
        setRefreshValue(true);
}else{
    setRefreshValue(false);
}
       
    };
    const [refresh,setRefreshValue]=useState(false);

    //i am trying to keep whole delete functionality in this area below
    const [deleteStatus, setDeleteStatus] = useState(false);
    const [itemToDelete, setItemToDelete] = useState([])


    const handleDelete = async (val) => {
        setDeleteStatus(true);
        setItemToDelete(val);

    }
    // useEffect(()=>{
    //     fetchEvents();
    // },[itemToDelete])
    useEffect(() => {

        fetchEvents();
    }, [refresh])



    const confirmDelete =  () => {
        if (!itemToDelete) return;

        //   const url = `http://localhost:5003/api/preexp`;
        try {
            console.log(itemToDelete)
            // await fetch(url, {
            apiRequest('/preexp', "DELETE", itemToDelete);
            //     method: "DELETE",
            //     headers: {
            //         "content-type": "application/json"
            //     },
            //     body: JSON.stringify(itemToDelete)
            // }).then(() => {
            //     toast('Your previous experiance has been successfully deleted');
            // })
            fetchEvents();

            toast('Your previous experiance has been successfully deleted');
        }
        catch (error) {
            console.log(error);
        } finally {
            fetchEvents();
            console.log("finally method");

        }
        console.log("delete method called")
       
        setItemToDelete(null);
        setDeleteStatus(false);
        console.log(fetchEvents, "ooooooooooooooooooooo")
    }

    const cancelDelete = () => {
        setDeleteStatus(false);
        setItemToDelete(null);
    }
useEffect(()=>{
    fetchEvents();
},[editstatus,status,deleteStatus])


    //i am trying to keep whole delete functionality in this area above


    return (
        <div>
            <ToastContainer />
            <form onSubmit={handleSubmit} className='formfull'>
                <div className='formydata'>
                    <div className='inneritems'>
                        <div className={sty.form_group}>
                            <input
                                type="text"
                                id="messi"
                                placeholder=''
                                className='textbox1'
                                value={formsData.companyName}
                                onChange={handleChange}
                                name='companyName'
                                // title='enter companyName'
                                required
                            // autoFocus="off"
                            />
                            <label htmlFor="messi"><span className="star">*</span>Company Name</label>
                        </div>
                        <div className={sty.form_group}>
                            <input
                                type="text"
                                id="messi2"
                                required
                                placeholder=''
                                className='textbox1'
                                value={formsData.designation}
                                onChange={handleChange}
                                // title='enter Designation'

                                name="designation"
                            />
                            <label htmlFor="messi2"><span className="star">*</span>Designation</label>

                            {errors.designationError && (
                                <p className='error'>{errors.designationError}</p>
                            )}


                        </div>
                        <div className={sty.form_group}>
                            <input
                                type="date"
                                id="messi3"
                                placeholder=''
                                className='textbox1'
                                value={formsData.startDate}
                                onChange={handleChange}
                                // title='fill StartingDate'

                                name='startDate'
                                required
                            />
                            <label htmlFor="messi3"><span className="star">*</span>Start Date</label>
                            {errors.startDateError && <p className='error'>{errors.startDateError}</p>}
                        </div>
                        <div className={sty.form_group}>
                            <input
                                type="date"
                                id="messi4"
                                placeholder=''
                                className='textbox1'
                                value={formsData.lastDate}
                                onChange={handleChange}
                                //  title='fill EndingDate'

                                name='lastDate'
                                required
                            />
                            <label htmlFor="messi4"><span className="star">*</span>End Date</label>
                            {errors.endDateError && <p className='error'>{errors.endDateError}</p>}
                        </div>
                        <button type="submit" className='submiticon' title='save'>
                            <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M34 42V26H14V42M14 6V16H30M38 42H10C8.93913 42 7.92172 41.5786 7.17157 40.8284C6.42143 40.0783 6 39.0609 6 38V10C6 8.93913 6.42143 7.92172 7.17157 7.17157C7.92172 6.42143 8.93913 6 10 6H32L42 16V38C42 39.0609 41.5786 40.0783 40.8284 40.8284C40.0783 41.5786 39.0609 42 38 42Z" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>




                    {experiences.length > 0 ? (
                        <table className='tabl'>
                            <thead className='tablehead'>
                                <tr className='top-heading'>
                                    <th>SL.No</th>
                                    <th>Company Name</th>
                                    <th>Designation</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Actions</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...experiences].sort((a, b) => b.id - a.id).map((val, index) => (//here i want to sort by val.id
                                    <tr className='decrease-me-there' key={index}>
                                        <td className='font-correction'>{index + 1}</td>
                                        <td className='font-correction'>{val.companyName}</td>
                                        <td className='font-correction'>{val.designation}</td>
                                        <td className='font-correction'><div className='datevalue'>{formatDate(val.startDate)}</div></td>
                                        <td className='font-correction'><div className='datevalue'>{formatDate(val.lastDate)}</div></td>

                                        <td className='editdeleteicons'>
                                            <p className='' id='edit-icon' title='edit' onClick={() => handleEdit(val)}>
                                                <svg width="22" height="30" viewBox="0 0 42 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M31.1576 0.571289L25.9647 6.69629L36.3505 18.9463L41.5435 12.8213L31.1576 0.571289ZM20.7717 12.8213L0 37.3213V49.5713H10.3859L31.1576 25.0713L20.7717 12.8213Z" fill="black" />
                                                </svg>
                                            </p>

                                            <p className='delete-button' id='delete-icon' title='delete' onClick={() => handleDelete(val)}>
                                                <svg width="22" height="30" viewBox="0 0 41 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.6875 49.5713C6.27812 49.5713 5.07204 49.0386 4.06925 47.9733C3.06646 46.908 2.56421 45.6259 2.5625 44.1268V8.73796H0V3.29351H12.8125V0.571289H28.1875V3.29351H41V8.73796H38.4375V44.1268C38.4375 45.6241 37.9361 46.9062 36.9333 47.9733C35.9305 49.0405 34.7236 49.5731 33.3125 49.5713H7.6875ZM33.3125 8.73796H7.6875V44.1268H33.3125V8.73796ZM12.8125 38.6824H17.9375V14.1824H12.8125V38.6824ZM23.0625 38.6824H28.1875V14.1824H23.0625V38.6824Z" fill="black" />
                                                </svg>
                                            </p>
                                        </td>
                                        <td></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="centertext">No previous experiences details added</p>
                    )}
                </div>

            </form>

            {status && <div className={edb.Message}><PopeUp submitconfirm={handleConfirm} submitcancel={handleCancel} /></div>}
            {editstatus && <Edit status={editstatus} close={handleClose} ide={identity} />}

            {deleteStatus && <div className={edb.Message}> <Model message='Are you sure, you want to Delete Previous Experiance' confirmHandler={confirmDelete} cancelHandler={cancelDelete} /></div>}
        </div>
    );
}

export default ExperianceForm;
