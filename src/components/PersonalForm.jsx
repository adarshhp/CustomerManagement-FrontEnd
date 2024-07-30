import { useEffect, useState } from "react";
import "./PersonalForm.css";
import PopeUp from "./PopeUp";
function PersonalForm() {
    const [formsData, setformsData] = useState({
        fname: "",
        lname: "",
        email: "",
        tempAddr: "",
        permAddr: "",
        gender: "",
        bldGrp: "",
        mstatus: "",
        panNum: "",
        phNum: "",
        aadhaarNum: "",
    })
    //usestate for changing form from readonly to editable
    const [editForm, setEditForm] = useState(true);
    function handlechange(e) {
        const { name, value } = e.target;
        setformsData({ ...formsData, [name]: value });
        validateEmail(formsData.email);
        console.log(name, value)
    }
    async function fetchInitial() {
        const response = await fetch('http://192.168.2.83:5003/api/getUnfinished');
        const data = await response.json();
        let previousUser = data.user;
        if (previousUser != null) {
            setformsData({
                fname: previousUser.fname || "",
                lname: previousUser.lname || "",
                email: previousUser.email || "",
                tempAddr: previousUser.tempAddr || "",
                permAddr: previousUser.permAddr || "",
                gender: previousUser.gender || "",
                bldGrp: previousUser.bldGrp || "",
                mstatus: previousUser.mstatus || "",
                panNum: previousUser.panNum || "",
                phNum: previousUser.phNum || "",
                aadhaarNum: previousUser.aadhaarNum || "",
            });
            validateEmail(previousUser.email);

        }
        console.log(formsData, previousUser)

    }
    useEffect(() => {
        fetchInitial();
    }, []);


    const [showPopeup, setshowPopeup] = useState(false);
    //getbackmsg
    const [showStatusBar, setshowStatusBar] = useState(null);



    function submitted(e) {
        e.preventDefault()
        if (errorMessage == null) {
            setshowPopeup(true);
        }
    }
    function submitcancel() {
        setshowPopeup(false);
    }
    async function submitconfirm() {
        fetch('http://192.168.2.83:5003/api/adduserinprogression/0', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formsData)
        }).then(resp => resp.json()).then((res) => {
            setshowPopeup(false);
            setshowStatusBar(res.message);
            console.log(res);
        })

    }
    function closestatus() {
        setshowStatusBar(null);

    }
    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (re.test(String(email).toLowerCase())) {
            setErrorMessage(null);
        } else {
            setErrorMessage("Invalid Email Format");
        }
    };
    const [errorMessage, setErrorMessage] = useState(null);

    return (
        <form className='personaldata' onSubmit={submitted} >
            <div className='personal1'>
                <div className='group1'>
                    <div class="form-group">
                        <input className='fname wide' name='fname' type='text' autocomplete="off" list="autocompleteOff" pattern="^[a-zA-Z ]*$" title="alphanumeric charecters only" placeholder="" value={formsData.fname} onChange={handlechange} required />
                        <label for="fname">First Name</label>
                    </div>
                    <div className="form-group">
                        <input className='lname' name='lname' type='text' autocomplete="off" list="autocompleteOff" pattern="^[a-zA-Z ]*$" title="alphanumeric charecters only" placeholder='' value={formsData.lname} onChange={handlechange} required />
                        <label for="fname">Last Name</label>
                    </div>
                </div>
                <div className="labelish">
                    <div className="form-group">
                        <input className="email" name="email" autocomplete="off" list="autocompleteOff" type="email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" placeholder="" onChange={handlechange} value={formsData.email} required />
                        <label for="email">Email</label>
                        {errorMessage != null && formsData.email != "" && <span className="error">{errorMessage}</span>}
                    </div>
                   
                </div>

                <div className="form-group">
                    <input className='permnt' name="permAddr" type='text' autocomplete="off" list="autocompleteOff" placeholder='' value={formsData.permAddr} onChange={handlechange} />
                    <label for="permAddr">Permanent Address</label>
                </div>
                <div className="form-group">
                <input className='temp' name='tempAddr' type='text' autocomplete="off" list="autocompleteOff" placeholder='' value={formsData.tempAddr} onChange={handlechange} />
                <label for="tempAddr">Temporary Address</label>
                </div>
                <div className='group2'>
                    <select name="gender" className="gender selctor" value={formsData.gender} onChange={handlechange}>
                        <option>Select Gender</option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='others'>Others</option>
                    </select>
                    <select className='bloodgrp selctor' name="bldGrp" value={formsData.bldGrp} onChange={handlechange}>
                        <option>Blood Group </option>
                        <option value='A+'> A+</option>
                        <option value='B+'>AB+</option>
                        <option value='O+'>O+</option>
                        <option value='AB-'>AB-</option>
                    </select>

                </div>
            </div>

            <div className='personal2'>
                <select className='marstatus selctor' name='mstatus' value={formsData.mstatus} onChange={handlechange} >
                    <option>Marital Status</option>
                    <option value='married'>Married</option>
                    <option value='unmarried'>UnMarried</option>
                </select>
                <div className="form-group">
                    <input className='pancard' type='text' name='panNum' autocomplete="off" list="autocompleteOff" placeholder='' pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" value={formsData.panNum.toUpperCase()} onChange={handlechange} />
                    <label for="panNum">Pan card no</label>
                </div>
                <div className="form-group">
                <input className='aadnum' type='number' name='aadhaarNum' autocomplete="off" list="autocompleteOff" placeholder='' value={formsData.aadhaarNum} onChange={handlechange} />
                <label for="aadhaarNum">aadhaar card no:</label>
                </div>
                <div className="form-group">
                <input className='phnnum' type='number' name='phNum' autocomplete="off" list="autocompleteOff" placeholder='' value={formsData.phNum} onChange={handlechange} />
                <label for="phNum">phone no:</label>
                </div>
                <div className="cbutton">
                    <button className='button' type='submit'>Save</button>
                    <button className="button" type="button" > Edit</button>
                </div>

            </div>
            {showPopeup && (<PopeUp submitconfirm={submitconfirm} submitcancel={submitcancel} />)}
            {showStatusBar != null && (
                <PopeUp message={showStatusBar} submitconfirm={closestatus} />
            )}
        </form>
    )

}
export default PersonalForm;