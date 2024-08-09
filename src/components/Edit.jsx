import React, { useState, useEffect } from 'react';
import './Edit.css';
import EditButton from '../icons/EditButton';
import Model from './Model';
import { toast } from 'react-toastify';

function Edit({ status, close, ide }) {
    const [formsData, setFormsData] = useState({
        companyName: "",
        designation: "",
        startDate: "",
        lastDate: ""
    });

    const [updateState, setUpdateState] = useState(false);

    // Fetch data for editing
    useEffect(() => {
        const fetchData = async () => {
            if (ide) {
                try {
                    const response = await fetch(`http://192.168.2.81:5003/api/preexp/${ide}`);
                    const data = await response.json();
                    if (response.ok) {
                        setFormsData({
                            companyName: data.companyName,
                            designation: data.designation,
                            startDate: new Date(data.startDate).toISOString().split('T')[0],
                            lastDate: new Date(data.lastDate).toISOString().split('T')[0]
                        });
                    } else {
                        console.error('Failed to fetch data for editing');
                    }
                } catch (error) {
                    console.error('Error during fetch:', error);
                }
            }
        };

        fetchData();
    }, [ide]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormsData({ ...formsData, [name]: value });
    };

    const handleSubmitting = async () => {
        const payload = {
            id: ide,
            userid: 7,
            companyName: formsData.companyName,
            designation: formsData.designation,
            startDate: new Date(formsData.startDate).toISOString(),
            lastDate: new Date(formsData.lastDate).toISOString()
        };
        try {
            const response = await fetch('http://192.168.2.81:5003/api/preexp', {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
                
            }).then(()=>{
toast('Previous Experiance has been updated successfully');
close();
            })

            if (response.ok) {
                // Optionally close the modal and refresh data
                close();
            } else {
                throw new Error('Network response was not ok');
            }
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
        <div className='editbox'>
            <div className='editpage'>
                <div className='edit-header'>
                    <p className='heading'>EDIT PERSONAL EXPERIENCE</p>
                    <button type="button" onClick={close} className='closebutton'>X</button>
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
                    </div>
                    <button type="submit" className='submiticon' onClick={handleSubmit}>
                        <EditButton />
                    </button>
                </div>
                <p style={{ textAlign: 'center', marginTop: '10px', color: 'black' ,fontFamily:'revert',fontSize:'15px' }}>
                    Click on the save button to confirm the update
                </p>
                {updateState && (
                    <Model
                        message='Are you sure you want to update Previous Experiance?'
                        cancelHandler={handleCancelling}
                        confirmHandler={handleSubmitting}
                    />
                )}
            </div>
        </div>
    );
}

export default Edit;
