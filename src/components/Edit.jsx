import React, { useState, useEffect } from 'react';
import './Edit.css';
import EditButton from '../icons/EditButton';
import Model from './Model';
import { toast } from 'react-toastify';
import edb from "./EditPopUp.module.css";
import apiRequest from '../lib/apiRequest';


function Edit({ status, close, ide }) {
    const [formsData, setFormsData] = useState(ide);
    const formatDate = async (dateString) => {
        const date = new Date(dateString);

        const year = date.getFullYear();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
       

        return `${year}-${month}-${day}`;
    };


    const [updateState, setUpdateState] = useState(false);

    // Fetch data for editing
    useEffect(() => {
        async function func() {
            const s = await formatDate(formsData.startDate);
            const l = await formatDate(formsData.lastDate);
            setFormsData({
                companyName: ide.companyName,
                designation: ide.designation,
                startDate: s,
                lastDate: l
            })
            console.log(l, s);
        }
        func();

    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormsData({ ...formsData, [name]: value });
    };

    const handleSubmitting = async () => {
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
            const response = await fetch('http://192.168.2.81:5003/api/preexp', {
          // apiRequest('/api/preexp',{
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)

            }).then(() => {
                toast('Previous Experiance has been updated successfully');
                close();
            })

            // if (response.ok) {
            //     // Optionally close the modal and refresh data
            //     close();
            // } else {
            //     throw new Error('Network response was not ok');
            // }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        setUpdateState(true);
    };

    const handleCancelling = () => {
        setUpdateState(false);
    };

    return (
        <div className={edb.largebox}>
            <div className='editpage'>
                <div className={edb.top_bar}>
                    <p className='heading'>EDIT PREVIOUS EXPERIENCE</p>
                    <button type="button" onClick={close} className={edb.close}title='CLOSE'>X</button>
                </div>
                <div className='inneritemss'>
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
                            label='update Company Name'
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
                            title='update designation'
                        />
                        <label htmlFor="messi2"><span className="star">*</span>Designation</label>
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
                            label='update start date'
                        />
                        <label htmlFor="messi3"><span className="star">*</span>Start Date</label>
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
                            label='update end date'
                        />
                        <label htmlFor="messi4"><span className="star">*</span>End Date</label>
                    </div>
                    <button type="submit" className='submiticon' onClick={handleSubmit} title="SAVE">
                        <EditButton />
                    </button>
                </div>
                <p style={{ textAlign: 'center', marginTop: '10px', color: 'black', fontFamily: 'revert', fontSize: '15px' }}>
                    Click on the save button to confirm the update
                </p>
                {updateState && (
                    <div className={edb.Message}>
                    <Model
                  
                        message='Are you sure you want to update Previous Experiance?'
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
