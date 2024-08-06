import React, { useState, useEffect } from 'react';
import './ExperianceForm.css';
import './PersonalForm.css';
import PopeUp from './PopeUp';
import './YourComponent.css';
import axios from 'axios';

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

        if (startDate && lastDate && new Date(startDate) > new Date(lastDate)) {
            startDateError = 'Start date cannot be after end date.';
            endDateError = 'End date cannot be before start date.';
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
                userid:7,
                companyName: formsData.companyName,
                designation: formsData.companyName,
                startDate: new Date(formsData.startDate).toISOString(),
                lastDate: new Date(formsData.lastDate).toISOString()
            };

            fetch('http://192.168.2.81:5003/api/preexp', {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(payload)
            })
                .then(() => {
                    setExperiences([...experiences, formsData]);
                    setFormsData({
                        companyName: "",
                        designation: "",
                        startDate: "",
                        lastDate: ""
                    });
                    setShowStatus(false);
                    setErrors(startDateError, '');

                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };



    useEffect(() => {

        const fetchEvents = () => {
            axios.get('http://192.168.2.81:5003/api/GetPrevExp/7')
                .then((resposne) => {

                    if (resposne?.status === 200) {
                        setExperiences(resposne?.data)
                        console.log(resposne?.data);
                    } else {
                        alert('something went wrong')
                    }
                })
                .catch((error) => {
                    return error
                })
        }
        fetchEvents();
    }, [])




    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };


    return (
        <div>
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
                            <label htmlFor="messi">Company Name</label>
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
                                name='designation'
                            />
                            <label htmlFor="messi2">Designation</label>
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
                            />
                            <label htmlFor="messi3">Start Date</label>
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
                            />
                            <label htmlFor="messi4">End Date</label>
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
                                    <p className='form-group' id='edit-icon'>
                                        <svg width="100" height="32" viewBox="0 0 151 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M117.688 51.5713C116.278 51.5713 115.072 51.0386 114.069 49.9733C113.066 48.908 112.564 47.6259 112.562 46.1268V10.738H110V5.29351H122.812V2.57129H138.188V5.29351H151V10.738H148.438V46.1268C148.438 47.6241 147.936 48.9062 146.933 49.9733C145.931 51.0405 144.724 51.5731 143.312 51.5713H117.688ZM143.312 10.738H117.688V46.1268H143.312V10.738ZM122.812 40.6824H127.938V16.1824H122.812V40.6824ZM133.062 40.6824H138.188V16.1824H133.062V40.6824Z" fill="black" />
                                            <path d="M79.1576 2.57129L73.9647 8.69629L84.3505 20.9463L89.5435 14.8213L79.1576 2.57129ZM68.7717 14.8213L48 39.3213V51.5713H58.3859L79.1576 27.0713L68.7717 14.8213Z" fill="black" />
                                        </svg>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                { status && <PopeUp submitconfirm={handleConfirm} submitcancel={handleCancel} />}
            </form>
        </div>
    );
}

export default ExperianceForm;
