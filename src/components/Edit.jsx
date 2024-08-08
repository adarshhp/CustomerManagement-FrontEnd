import React, { useState } from 'react';
import './Edit.css';
import EditButton from '../icons/EditButton';

function Edit({ status, close,ide }) {
    const [formsData, setFormsData] = useState({
        companyName: "",
        designation: "",
        startDate: "",
        lastDate: ""
    });


    console.log(status + "hello from edit.jsx");
    console.log(ide+"yeahhhhh i got the id here fantastic");
   


    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormsData({ ...formsData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            id:ide,
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
                
            });

            if (!response.ok) {
                // close();
                throw new Error('Network response was not ok   manhhhh');
            }


        } catch (error) {
            console.error('Error during fetch:', error);
        }

    };

    return (
        <div className='editbox'>
            <div className='editpage'>
                <p>EDIT PERSONAL EXPERIENCE</p>
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
                    <button type="button" onClick={close}>Close</button>
                </div>
                <p style={{ textAlign: 'center', marginTop: '40px', color: 'red' }}>
                    Click on the save button to confirm the update
                </p>
            </div>

        </div>
    );
}

export default Edit;
