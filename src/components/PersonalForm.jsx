import { useEffect, useState } from "react";
import "./PersonalForm.css";
import apiRequest from "../lib/apiRequest";
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
        DOB: "",
        Nationlity: "",
        reportingmanager:""
    })
    //usestate for changing form from readonly to editable
    const [editForm, setEditForm] = useState(true);
    function handlechange(e) {
        const { name, value } = e.target;
        setformsData({ ...formsData, [name]: value });
        console.log(name, value, e.target.value);
    }
    useEffect(() => {
        validatePan(formsData.panNum);
        validateEmail(formsData.email);
        validateAdhar(formsData.aadhaarNum);
    }, [formsData]);



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
        fetch(process.env.REACT_APP_SERVER + '/api/adduserinprogression/0', {
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
    }
    const validatePan = (panNum) => {
        const pa = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
        if (pa.test(panNum.toUpperCase())) {
            seterrorPanMsg(null);
        } else {
            seterrorPanMsg("Invalid Pan Number")
        }
    }
    const validateAdhar = (number) => {
        const ad = new RegExp(/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/);
        console.log(number, ad.test(number));
        if (ad.test(number)) {
            setAdharMsg(null);
        } else {
            setAdharMsg("Invalid Aadhaar Number");
        }
    }
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const response = await apiRequest("/ListofUser");
        const data = await response.json();
        setDropdownData(data);
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      }
    };
    fetchDropdownData();
    }, []); 

    const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
    const [dropdownData, setDropdownData] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorPanMsg, seterrorPanMsg] = useState(null);
    const [errorAdharMsg, setAdharMsg] = useState(null);

    return (
        <form className='personaldata' onSubmit={submitted} >
            <div className='personal1'>
                <div className='group1'>
                    <div className="closeone">
                        <div class="form-group">
                            <input className='fname wide' name='fname' type='text' autocomplete="off" list="autocompleteOff" pattern="^[a-zA-Z ]*$" title="Alphabets only" placeholder="" value={formsData.fname} onChange={handlechange} required />
                            <label htmlFor="fname"><span className="star">*</span>First Name</label>
                        </div>
                        <div className="form-group">
                            <input className='lname' name='lname' type='text' autocomplete="off" list="autocompleteOff" pattern="^[a-zA-Z ]*$" title="Alphabets only" placeholder='' value={formsData.lname} onChange={handlechange} required />
                            <label for="fname"><span className="star">*</span>Last Name</label>
                        </div>
                    </div>

                    <select name="gender" className="reporting" value={selectedOption}  onChange={handleSelectChange}>
                    <option value="">Reporting Manager</option>
                    {dropdownData.map((item) => (
                    <option key={item.id} value={item.value}>
                    {item.label}
                    </option>
                    ))}
                        
                    </select>
                </div>
                <div className="labelish">
                    <div className="fe">
                        <span className="star"></span>
                        <input className="email" name="email" autocomplete="off" list="autocompleteOff" type="email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" placeholder="" onChange={handlechange} value={formsData.email} required />
                        <label for="email"><span className="star">*</span>Email</label>
                        {errorMessage != null && formsData.email != "" && <span className="error">{errorMessage}</span>}
                    </div>
                    <div className="overr">
                        <div className="form-group">
                            <input className='phnnum' id="phoneno" type='text' pattern=".{5,10}" name='phNum' autocomplete="off" list="autocompleteOff" placeholder='' value={formsData.phNum} onChange={handlechange} />
                            <label for="phNum">Employee Id</label>
                        </div>
                    </div>

                </div>

                <div className="labelish" >
                    <div className="fe">
                        <input className='permnt' name="permAddr" type='text' autocomplete="off" list="autocompleteOff" placeholder='' value={formsData.permAddr} onChange={handlechange} />
                        <label for="permAddr">Permanent Address</label>
                    </div>
                    <div className="overr">
                        <select className='marstatus selctor' name='mstatus' value={formsData.mstatus} onChange={handlechange} >
                            <option>Marital Status</option>
                            <option value='married'>Married</option>
                            <option value='unmarried'>UnMarried</option>
                        </select>
                        <br/>
                        <br/>
                        <div className="finale">
                            <input className='forgrp' type='text' name='panNum' autocomplete="off" list="autocompleteOff" placeholder='' value={formsData.panNum.toUpperCase()} onChange={handlechange} />
                            <label for="panNum">PAN Card Number</label>
                            {errorPanMsg != null && formsData.panNum != "" && <span className="error">{errorPanMsg}</span>}
                        </div>

                    </div>
                </div>

                <div className="group2" id="forthrow">
                    <div className="together">
                        <select name="gender" className="gender selctor" value="DOB" onChange={handlechange}>
                            <option> Gender</option>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                            <option value='others'>Others</option>
                        </select>
                        <select className='bloodgrp selctor' name="bldGrp" value="Nationality" onChange={handlechange}>
                            <option>Blood Group </option>
                            <option value='A+'> A+</option>
                            <option value='B+'>AB+</option>
                            <option value='O+'>O+</option>
                            <option value='O-'> O-</option>
                            <option value='AB-'>AB-</option>
                            <option value='others'> Others</option>
                        </select>
                    </div>
                    <div className="over">
                        <div className="form-group">
                            <input className='phnnum' id="phoneno" type='text' pattern=".{5,10}" name='phNum' autocomplete="off" list="autocompleteOff" placeholder='' value={formsData.phNum} onChange={handlechange} />
                            <label for="phNum">Phone Number</label>
                        </div>
                    </div>
                </div>


                <div className="group2" id="forthrow">
                    <div className="together">
                        <select name="gender" className="gender selctor" value="DOB" onChange={handlechange}>
                            <option> DOB</option>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                            <option value='others'>Others</option>
                        </select>
                        <select className='bloodgrp selctor' name="bldGrp" value="Nationality" onChange={handlechange}>
                            <option>Nationality </option>
                            <option value='A+'> A+</option>
                            <option value='B+'>AB+</option>
                            <option value='O+'>O+</option>
                            <option value='O-'> O-</option>
                            <option value='AB-'>AB-</option>
                            <option value='others'> Others</option>
                        </select>

                    </div>

                    <div className="over">
                        <div className="form-group">
                            <input className='phnnum' id="phoneno" type='text' pattern=".{5,10}" name='phNum' autocomplete="off" list="autocompleteOff" placeholder='' value={formsData.phNum} onChange={handlechange} />
                            <label for="phNum">Adhar Card No:</label>
                        </div>
                    </div>
                </div>


                <div className="forgrp">
                    <input className='lname' name='lname' type='text' autocomplete="off" list="autocompleteOff" pattern="^[a-zA-Z ]*$" title="Alphabets only" placeholder='' value={formsData.lname} onChange={handlechange} required />
                    <label for="fname"><span className="star">*</span>Division of Employee</label>
                </div>
                <div className="forgrp">
                    <input className='lname' name='lname' type='text' autocomplete="off" list="autocompleteOff" pattern="^[a-zA-Z ]*$" title="Alphabets only" placeholder='' value={formsData.lname} onChange={handlechange} required />
                    <label for="fname"><span className="star">*</span>Role of Employee</label>
                </div>
                <div className="group4">
                    <div className="fo">
                        <input className='lname' name='lname' type='text' autocomplete="off" list="autocompleteOff" pattern="^[a-zA-Z ]*$" title="Alphabets only" placeholder='' value={formsData.lname} onChange={handlechange} required />
                        <label for="fname"><span className="star">*</span>Rank</label>
                    </div>

                    <div className="cbutton">
                        <button className='button' type='submit'>Save</button>
                        <button className="button" type="button" > Edit</button>
                    </div>
                </div>








            </div>
            {showPopeup && (<PopeUp submitconfirm={submitconfirm} submitcancel={submitcancel} />)}
            {
                showStatusBar != null && (
                    <PopeUp message={showStatusBar} submitconfirm={closestatus} />
                )
            }
        </form >
    )

}
export default PersonalForm;