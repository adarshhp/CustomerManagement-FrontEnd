import React, { useState, useEffect } from 'react';
import './ExperianceForm.css';
import './PersonalForm.css';
import PopeUp from './PopeUp';
import './YourComponent.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Edit from './Edit';

function ExperianceForm() {
    const [status, setShowStatus] = useState(false);
    const [formsData, setFormsData] = useState({
        companyName: "",
        designation: "",
        startDate: "",
        lastDate: ""
    });



    const [errors, setErrors] = useState({
        startDateError: '',
        endDateError: ''
    });


    const [experiences, setExperiences] = useState([]);



    const handleSubmit = (e) => {
        e.preventDefault();
        const { startDateError, endDateError } = validateDates(formsData.startDate, formsData.lastDate);
        if (!startDateError && !endDateError) {
            setShowStatus(true);
            console.log(status);
        } else {
            setErrors({ startDateError, endDateError });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormsData({ ...formsData, [name]: value })

        if (name === 'startDate' || name === 'lastDate') {
            const { startDateError, endDateError } = validateDates(formsData.startDate, formsData.lastDate);
            setErrors({ startDateError, endDateError });
        }
    };



    const validateDates = (startDate, lastDate) => {
        let startDateError = '';
        let endDateError = '';
        const today = new Date().setHours(0, 0, 0, 0);

        if (startDate && lastDate && new Date(startDate) >= new Date(lastDate)) {
            startDateError = 'Start date cannot be same or after end date.';
            endDateError = 'End date cannot be same or before start date.';
        }
        if (startDate && new Date(startDate) > today) {
            startDateError = 'cannot enter a future reference'
        }
        if (lastDate && new Date(lastDate) > today) {
            endDateError = 'cannot enter a future reference'
        }


        return { startDateError, endDateError };
    };



    const handleCancel = () => {
        setShowStatus(false);
    };



    const handleConfirm = () => {
        const { startDateError, endDateError } = validateDates(formsData.startDate, formsData.lastDate);
        if (!startDateError && !endDateError) {


            const payload = {
                userid: 7,
                companyName: formsData.companyName,
                designation: formsData.designation,
                startDate: new Date(formsData.startDate).toISOString(),
                lastDate: new Date(formsData.lastDate).toISOString()
            };

            fetch(process.env.REACT_APP_SERVER+'/api/preexp', {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(payload)
            })
                .then((res) => {
                    setExperiences([...experiences]);
                    setFormsData({
                        companyName: "",
                        designation: "",
                        startDate: "",
                        lastDate: ""
                    });
                    setShowStatus(false);
                    setErrors(startDateError, '');
                    if (res?.status === 200) {
                        res.json().then((res) => toast(res.message));
                    }

                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };
    useEffect(() => {
        const fetchEvents = () => {
            axios.get(process.env.REACT_APP_SERVER+'5003/api/GetPrevExp/7')
                .then((resposne) => {

                    if (resposne?.status === 200) {
                        toast(resposne.message);
                        setExperiences(resposne?.data)
                        console.log(resposne?.data);
                    } else {
                        alert('something went wrong')
                    }
                    if(resposne?.status === 405){
                        toast(resposne.message);
                    }
                })
                .catch((error) => {
                    return error
                })
        }
        fetchEvents();
    }, [formsData])



    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    const [editstatus, setEditStatus] = useState(false);
    const [identity, setEditId] = useState()
    //handling the edit
    const handleEdit = (id) => {
        setEditStatus(true);
        setEditId(id);
        console.log(editstatus);

    }


    const handleClose = () => {
        console.log("handleClosemethod triggered")
        setEditStatus(false);
        fetchEvents();
    }



    const handleDelete = (id) => {

        const url = `http://192.168.2.81:5003/api/preexp/${id}`;
        try {
            fetch(url, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json"
                }
            })

        }
        catch (error) {
            console.log(error);
        }
      fetchEvents();
      console.log(fetchEvents)
    }


    return (
        <div>
            <ToastContainer />
            <form onSubmit={handleSubmit} className='formfull'>
                <div className='formitem1'>
                    <div className='inneritems'>
                        <div className='form-group'>
                            <input
                                type="text"
                                id="messi"
                                placeholder=''
                                className='textbox1'
                                value={formsData.companyName}
                                onChange={handleChange}
                                name='companyName'
                                required
                            />
                            <label htmlFor="messi"><span className="star">*</span>Company Name</label>
                        </div>
                        <div className='form-group'>
                            <input
                                type="text"
                                id="messi2"
                                required
                                placeholder=''
                                className='textbox1'
                                value={formsData.designation}
                                onChange={handleChange}
                                name="designation"
                            />
                            <label htmlFor="messi2"><span className="star">*</span>Designation</label>
                        </div>
                        <div className='form-group'>
                            <input
                                type="date"
                                id="messi3"
                                placeholder=''
                                className='textbox1'
                                value={formsData.startDate}
                                onChange={handleChange}
                                name='startDate'
                                required
                            />
                            <label htmlFor="messi3"><span className="star">*</span>Start Date</label>
                            {errors.startDateError && <p className='error'>{errors.startDateError}</p>}
                        </div>
                        <div className='form-group'>
                            <input
                                type="date"
                                id="messi4"
                                placeholder=''
                                className='textbox1'
                                value={formsData.lastDate}
                                onChange={handleChange}
                                name='lastDate'
                                required
                            />
                            <label htmlFor="messi4"><span className="star">*</span>End Date</label>
                            {errors.endDateError && <p className='error'>{errors.endDateError}</p>}
                        </div>
                        <button type="submit" className='submiticon'>
                            <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M34 42V26H14V42M14 6V16H30M38 42H10C8.93913 42 7.92172 41.5786 7.17157 40.8284C6.42143 40.0783 6 39.0609 6 38V10C6 8.93913 6.42143 7.92172 7.17157 7.17157C7.92172 6.42143 8.93913 6 10 6H32L42 16V38C42 39.0609 41.5786 40.0783 40.8284 40.8284C40.0783 41.5786 39.0609 42 38 42Z" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>



                    <div className='inneritems'>
                        <ul style={{ width: '-webkit-fill-available' }} className='topside'>
                            {experiences.map((exp, index) => (
                                <li key={index} className='listed'>
                                    <p className='index'>{index + 1}</p>
                                    <p className='form-group' id="ff"> {exp.companyName}</p>
                                    <p className='form-group' id="ff">{exp.designation}</p>
                                    <p className='form-group' id="ff">{formatDate(exp.startDate)}</p>
                                    <p className='form-group' id="ff">{formatDate(exp.lastDate)}</p>
                                    <p className='form-group' id='edit-icon' onClick={() => handleEdit(exp.id)}>
                                        <svg width="30" height="37" viewBox="0 0 42 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M31.1576 0.571289L25.9647 6.69629L36.3505 18.9463L41.5435 12.8213L31.1576 0.571289ZM20.7717 12.8213L0 37.3213V49.5713H10.3859L31.1576 25.0713L20.7717 12.8213Z" fill="black" />
                                        </svg>
                                    </p>
                                    <p id='delete-icon' onClick={handleDelete(exp.id)}>
                                        <svg width="30" height="37" viewBox="0 0 41 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.6875 49.5713C6.27812 49.5713 5.07204 49.0386 4.06925 47.9733C3.06646 46.908 2.56421 45.6259 2.5625 44.1268V8.73796H0V3.29351H12.8125V0.571289H28.1875V3.29351H41V8.73796H38.4375V44.1268C38.4375 45.6241 37.9361 46.9062 36.9333 47.9733C35.9305 49.0405 34.7236 49.5731 33.3125 49.5713H7.6875ZM33.3125 8.73796H7.6875V44.1268H33.3125V8.73796ZM12.8125 38.6824H17.9375V14.1824H12.8125V38.6824ZM23.0625 38.6824H28.1875V14.1824H23.0625V38.6824Z" fill="black" />
                                        </svg>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {status && <PopeUp submitconfirm={handleConfirm} submitcancel={handleCancel} />}
                {editstatus && <Edit status={editstatus} close={handleClose} ide={identity} />}
            </form>
        </div>
    );
}

export default ExperianceForm;
