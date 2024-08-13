import React, { useState, useEffect } from 'react';
import './Edit.css';
import EditButton from '../icons/EditButton';
import Model from './Model';
import { toast } from 'react-toastify';
import edb from "./EditPopUp.module.css";
import apiRequest from '../lib/apiRequest';

function Edit({ status, close, ide }) {
    const [formsData, setFormsData] = useState(ide);
    const [errors, setErrors] = useState({
        startDateError: '',
        endDateError: '',
        designationError: ''
    });
    const [updateState, setUpdateState] = useState(false);

    const validateDates = (startDate, lastDate) => {
        let startDateError = '';
        let endDateError = '';
        const today = new Date().setHours(0, 0, 0, 0);

      //  if (startDate && lastDate && new Date(startDate) >= new Date(lastDate)) {
        if ( new Date(startDate) >= new Date(lastDate)) {

          //  startDateError = 'Invalid Date';
            endDateError = 'Invalid Date';
        }
        if (startDate && new Date(startDate) > today) {
            startDateError = 'Invalid Date';
        }
        if (lastDate && new Date(lastDate) > today) {
            endDateError = 'Invalid Date';
        }
        if(new Date(startDate)<=new Date(lastDate)){
            startDateError='';
            endDateError='';
        }


        return { startDateError, endDateError };
    };

    const validateDesignation = (designation) => {
        if (designation.trim() === '') {
            return ''; 
        }
        const designationRegex = /^[A-Za-z\s]+$/;
        return designationRegex.test(designation) ? '' : 'Invalid Character';
    };

    const validateForm = () => {
        console.log('validate form called');
        const { startDateError, endDateError } = validateDates(formsData.startDate, formsData.lastDate);
        const designationError = validateDesignation(formsData.designation);


        if (startDateError || endDateError || designationError) {
            setErrors({ startDateError, endDateError, designationError });
            console.log(errors+'from the validate form');
            return false;
        }
        return true;
    };

    const formatDate = async (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        async function func() {
            const s = await formatDate(formsData.startDate);
            const l = await formatDate(formsData.lastDate);
            setFormsData({
                companyName: ide.companyName,
                designation: ide.designation,
                startDate: s,
                lastDate: l
            });
        }
        func();
    }, [ide]);

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
    };

    const handleSubmitting = async () => {
        
        if (validateForm()) {
            const payload = {
                id: ide.id,
                userid: 7,
                companyName: formsData.companyName,
                designation: formsData.designation,
                startDate: new Date(formsData.startDate).toISOString(),
                lastDate: new Date(formsData.lastDate).toISOString()
            };

            try {
                console.log(payload);
                await fetch('http://192.168.2.81:5003/api/preexp', {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });
                toast('Previous Experience has been updated successfully');
                close();
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission

        if (validateForm()) {
            setUpdateState(true);
        }
    };

    const handleCancelling = () => {
        setUpdateState(false);
    };

    return (
        <div className={edb.largebox}>
            <div className='editpage'>
                <div className={edb.top_bar}>
                    <p className='heading'>EDIT PREVIOUS EXPERIENCE</p>
                    <button type="button" onClick={close} className={edb.close} title='close'>X</button>
                </div>
                <form className='inneritemss' onSubmit={handleSubmit}>
                    <div className='form-groups'>
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
                        <label htmlFor="messi"><span className="star">*</span>Company</label>
                    </div>
                    <div className='form-groups'>
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
                        {formsData.designation.trim() !== '' && errors.designationError && (
                            <p className='error'>{errors.designationError}</p>
                        )}
                    </div>
                    <div className='form-groups'>
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
                    <div className='form-groups'>
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
                    <button type="submit" className='submiticon'  title="update">
                        <EditButton />
                    </button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '10px', color: 'black', fontFamily: 'revert', fontSize: '15px' }}>
                </p>
                {updateState && (
                    <div className={edb.Message}>
                        <Model
                            message='Are you sure , you want to update Previous Experience?'
                            cancelHandler={handleCancelling}
                            confirmHandler={handleSubmitting}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Edit;
