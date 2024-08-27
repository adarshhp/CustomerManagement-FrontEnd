import { useEffect, useState } from "react";
import "./PersonalForm.css";
import apiRequest from "../lib/apiRequest";
import PopeUp from "./PopeUp";
import sty from "./formatedStyle.module.css";
import { ToastContainer, toast } from 'react-toastify';
import PlusIcon from "../icons/PlusIcon";



function PersonalForm({ setEmpId, setStartDetails, startDetails ,initialPersonalForm}) {


const[editing,setEditData]=useState([])
useEffect(()=>{
const fetcheditdata= async()=>{
    const editdata=await apiRequest(`/getUserById${initialPersonalForm}`)
    console.log(editdata,"france 4")
    setformsData(editdata)
    if (editdata.divisionOfEmployee !== "") {
        setDoE(true);
    }
    if (editdata.rank !== "") {
        setRanks(true);
    }

    if (editdata.nationality !== "") {
        setNationality(true)
            ;
    }
    if (editdata.bldGrp !== "") {
        setBlood(true);
    }
    if (editdata.reportingManager != "") {
        setReportId(true);
    }
    if (editdata.mstatus !== "") {
        setMarriage(true);
    }
    if (editdata.roleOFEmployee !== "") {
        setRoleofEmployee(true);
    }
    if (editdata.gender !== "") {
        setGender(true);
    }
}
if(initialPersonalForm){
   fetcheditdata();
}
   
},[])


    const [formsData, setformsData] = useState({
        fname: "",
        lname: "",
        reportingManager: "",
        email: "",
        employeeID: "",
        permAddr: "",
        mstatus: "",
        panNum: "",
        gender: "",
        bldGrp: "",
        phNum: "",
        dob: "",
        nationality: "",
        aadhaarNum: "",
        divisionOfEmployee: "",
        roleOFEmployee: "",
        rank: "",
        doj: ""

    })
    useEffect(() => {
        setStartDetails(formsData)
    }, [formsData])


    useEffect(() => {
        //i edited here to set editing or startdetails based on data
       
        setformsData(startDetails);
        

        console.log(startDetails, "jjjjjjjj");
        if (startDetails.divisionOfEmployee !== "") {
            setDoE(true);
        }
        if (startDetails.rank !== "") {
            setRanks(true);
        }

        if (startDetails.nationality !== "") {
            setNationality(true)
                ;
        }
        if (startDetails.bldGrp !== "") {
            setBlood(true);
        }
        if (startDetails.reportingManager != "") {
            setReportId(true);
        }
        if (startDetails.mstatus !== "") {
            setMarriage(true);
        }
        if (startDetails.roleOFEmployee !== "") {
            setRoleofEmployee(true);
        }
        if (startDetails.gender !== "") {
            setGender(true);
        }
    }, [])

    //usestate for changing form from readonly to editable
    const [editForm, setEditForm] = useState(true);
    const [error, setErrors] = useState("");
    function handlechange(e) {
        const { name, value } = e.target;
        setformsData({ ...formsData, [name]: value });

        if (name === 'dob') {

            //  validateDate(value);

            console.log("calling the dob validation" + value);


        } else if (name === 'phNum') {
            let val = e.target.value.replace(/[^\d]/g, '');
            if (val.length > 10) {
                val = val.slice(0, 10);
            }
            setformsData({ ...formsData, [name]: val });
        } else if (name === 'aadhaarNum') {
            let val = e.target.value.replace(/[^\d]/g, '');
            if (val.length > 12) {
                val = val.slice(0, 12);
            }
            setformsData({ ...formsData, [name]: val });
        } else if (name === 'fname') {
            let val = e.target.value.replace(/[^a-zA-Z]/g, '');
            setformsData({ ...formsData, [name]: val });
        } else if (name === 'lname') {
            let val = e.target.value.replace(/[^a-zA-Z\s]/g, '');
            setformsData({ ...formsData, [name]: val });
        } else if (name === 'divisionOfEmployee') {
            setDoE(true);
        } else if (name === 'roleOFEmployee') {
            setRoleofEmployee(true);
        } else if (name === 'rank') {
            setRanks(true);
        } else if (name === 'gender') {
            setGender(true);
        }
        else if (name === 'bldGrp') {
            setBlood(true)
        } else if (name === 'nationality') {
            setNationality(true)
        } else if (name === 'mstatus') {
            setMarriage(true);
        } else if (name == 'employeeID') {
            testEmployeeId(value);
            let val = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
            setformsData({ ...formsData, [name]: val });
        } else if (name === 'reportingManager') {
            setReportId(true);
        }
        else {

            setformsData({ ...formsData, [name]: value });
        }

        console.log(name, value, e.target.value);
    }

    const [isDoEFilled, setDoE] = useState(false);
    const [isRoleFilled, setRoleofEmployee] = useState(false);
    const [isRankFilled, setRanks] = useState(false);
    const [isBloodFilled, setBlood] = useState(false);

    const [isNationalityFilled, setNationality] = useState(false);

    const [isGenderFilled, setGender] = useState(false);
    const [isMarriageFilled, setMarriage] = useState(false);
    const [isReportFilled, setReportId] = useState(false);




    useEffect(() => {
        validatePan(formsData.panNum);
        validateEmail(formsData.email);
        // validateAdhar(formsData.aadhaarNum);
        validateDate(formsData.Date);
        console.log(formsData.Date, "wwwwwwwww")
        validatePhone(formsData.phNum);
        validateAadhar(formsData.aadhaarNum);
    }, [formsData]);
    const [dateError, setDateErrorMessage] = useState(null);
    // useEffect(()=>{
    //     setDateErrorMessage("Invalid Date");
    // })
    const validatePhone = (phone) => {
        const phonee = String(phone);
        if (phonee.length !== 0) {
            if (phonee.length <= 9) {
                setPhoneError("Invalid Phone no")
            } else {
                setPhoneError("");
            }
        }
    }
    const validateAadhar = (aadhar) => {
        const aadharr = String(aadhar);
        if (aadharr.length !== 0) {
            if (aadharr.length <= 11) {

                setAadharError("Invalid aadhar");
            } else {
                setAadharError("");
            }
        }


    }

    const [phoneError, setPhoneError] = useState("");
    const [aadharError, setAadharError] = useState("");



    const validateDate = (date) => {
        const currentDate = new Date(); // Get current date and time
        console.log("Current Date:", currentDate);

        // Ensure the given date is parsed correctly
        const givenDate = new Date(date);
        if (isNaN(givenDate.getTime())) {
            setDateErrorMessage("");
            return;
        }

        console.log("Given Date:", givenDate);

        // Convert both dates to milliseconds for comparison
        const currentTimestamp = currentDate.getTime();
        const givenTimestamp = givenDate.getTime();

        // Check if the given date is in the future
        if (givenTimestamp > currentTimestamp) {
            setDateErrorMessage("Invalid Date");
            return;
        }

        // Define the cutoff date (January 1, 1960)
        const cutoffDate = new Date('1960-01-01');
        const cutoffTimestamp = cutoffDate.getTime();

        // Check if the given date is before the cutoff date
        if (givenTimestamp < cutoffTimestamp) {
            setDateErrorMessage("Date cannot be before 1960.");
            return;
        }

        // If all checks pass, clear the error message
        setDateErrorMessage(null);
        console.log("Date is valid.");
    };




    const [showPopeup, setshowPopeup] = useState(false);
    //getbackmsg
    const [showStatusBar, setshowStatusBar] = useState(null);



    function submitted(e) {
        e.preventDefault()
        if (errorMessage == null && !phoneError && !dateError && !aadharError && !errorPanMsg) {
            setshowPopeup(true);
        }
    }
    function submitcancel() {
        setshowPopeup(false);
    }
    async function submitconfirm() {
        fetch(process.env.REACT_APP_SERVER + '/api/addUserPersonalDetails', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formsData)
        }).then(resp => resp.json()).then((res) => {
            setshowPopeup(false);
            setshowStatusBar(res.message);
            if (res.message) {
                toast(res.message);
            }

            console.log(res.user.userId, "lion3");
            setEmpId(res.user.userId);

        })
    }
    function closestatus() {
        setshowStatusBar(null);

    }
    const validateEmail = (email) => {
        // const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        // const re = /^[a-zA-Z0-9._-]+\.com$/;
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;


        if (re.test(String(email).toLowerCase())) {
            setErrorMessage(null);
        } else {
            setErrorMessage("Invalid Email Format");
        }
    }
    const validatePan = (panNum) => {
        const pa = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

        const cleanedPanNum = panNum.toUpperCase().replace(/[^A-Z0-9]/g, '');
        console.log(cleanedPanNum, "vvvvvvvvvvvv");

        if (pa.test(cleanedPanNum)) {
            seterrorPanMsg(null);
        } else {
            console.log("PAN validation failed");
            seterrorPanMsg("Invalid PAN Number");
        }
    };

    // const validateAdhar = (number) => {
    //     const ad = new RegExp(/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/);
    //     console.log(number, ad.test(number));
    //     if (ad.test(number)) {
    //         setAdharMsg(null);
    //     } else {
    //         setAdharMsg("Invalid Aadhaar Number");
    //     }
    // }


    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const [dropdownData, setDropdownData] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [employeeErrorMessage, setEmployeeErrorMessage] = useState(null);
    const [errorPanMsg, seterrorPanMsg] = useState(null);
    const [errorAdharMsg, setAdharMsg] = useState(null);

    //use state for all dropdowns
    const [nation, setNation] = useState([]);
    const [role, setRole] = useState([]);
    const [divisionOfEmployee, setdivisionOfEmployee] = useState([]);
    const [rank, setRank] = useState([]);
    const [manager, setManager] = useState([]);




    //fetching nationalities and mapping to nation
    const fetchNation = async () => {
        try {
            const response = await apiRequest('/GetNationality');
            const data = await response.json();
            if (Array.isArray(data)) {
                setNation(data);
            } else {
                console.error('Unexpected response format for nationalities:', data);
            }
        } catch (error) {
            console.log('Error fetching nationalities:', error);
        }
    };
    //fetchroles
    const fetchRole = async () => {
        try {
            const response = await apiRequest('/GetRoles');
            setRole(response)
            const data = await response.json();
            if (Array.isArray(data)) {
                setRole(data);
            } else {
                console.error('Unexpected response format for nationalities:', data);
            }
        } catch (error) {
            console.log('Error fetching nationalities:', error);
        }
    };
    //fetch division
    const fetchDivision = async () => {
        try {
            const responce = await apiRequest('/GetDivisions');
            setdivisionOfEmployee(responce);
            const data = await responce.json();
            if (Array.isArray(data)) {
                setdivisionOfEmployee(data);
            } else {
                console.log('error fetching divisionOfEmployee');
            }
        } catch (error) {
            console.log(error);
        }
    }

    //fetching rank
    const fetchRank = async () => {
        try {
            const response = await apiRequest('/GetRanks');
            setRank(response);

            const data = await response.json();

            if (Array.isArray(data)) {


                setRank(data);
            } else {
                console.error('Unexpected response format for nationalities:', data);
            }
        } catch (error) {
            console.log('Error fetching nationalities:', error);
        }
    };
    //fetching nationality
    const fetchDropdownData = async () => {
        try {
            const response = await apiRequest("/GetNationality");
            console.log(response, "responseeee");
            // const data = await response.json();
            console.log("inside........");



            setDropdownData(response);

        } catch (error) {
            console.error('Error fetching dropdown data:', error);
        }
    };
    //fetching reporting manager
    const fetchManager = async () => {
        try {
            const response = await apiRequest("/ReportingManager");



            setManager(response);

        } catch (error) {
            console.error('Error fetching dropdown data:', error);
        }
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        fetchNation();
        fetchRole();
        fetchDivision();
        fetchRank();
        fetchDropdownData();
        fetchManager();
    }, [])

    //     useEffect(()=>{
    // SetInitialDetails(formsData)
    //     },[formsData])
    function testEmployeeId(input) {
        let regex = /XCL[0-9]{5}/i;
        if (!(regex.test(input))) {
            setEmployeeErrorMessage("invalid Employeeid");
        } else {
            setEmployeeErrorMessage(null);
        }
    }
    const clearForm = () => {
        setformsData({
            fname: "",
            lname: "",
            reportingManager: "",
            email: "",
            employeeID: "",
            permAddr: "",
            mstatus: "",
            panNum: "",
            gender: "",
            bldGrp: "",
            phNum: "",
            dob: "",
            nationality: "",
            aadhaarNum: "",
            divisionOfEmployee: "",
            roleOFEmployee: "",
            rank: ""

        })
        setEmpId(null);
        setDoE(true);
        setRanks(true);
        setNationality(true)
        setBlood(true);
    }
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = ('0' + (today.getMonth() + 1)).slice(-2); // Months are zero-based
        const day = ('0' + today.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    return (

        <form className='personaldata' onSubmit={submitted} >
            {/* <div><button onClick={clearForm}>click me</button></div> */}

            <div className='personal1'>
                <ToastContainer />
                
                <div className="EMP_BUTTON" onClick={clearForm}>Create New<div className="iconn"></div></div>

                <div className='group1'>


                    <div className="closeone">

                        <div class="form-group">
                            <input className='fname wide' name='fname' type='text' autocomplete="off" list="autocompleteOff" pattern="^[a-zA-Z ]*$" title="Alphabets only" placeholder="" value={formsData.fname} onChange={handlechange} required />
                            <label htmlFor="fname"><span className="star">*   </span>First Name</label>
                        </div>
                        <div className="form-group">
                            <input className='lname' name='lname' type='text' autocomplete="off" list="autocompleteOff" pattern="^[a-zA-Z ]*$" title="Alphabets only" placeholder='' value={formsData.lname} onChange={handlechange} required />
                            <label for="fname"><span className="star">*   </span>Last Name</label>
                        </div>
                    </div>
                    <div className={`${isReportFilled ? `report2` : `report`
                        }`}>


                        <select name="reportingManager" className="reporting" value={formsData.reportingManager} onChange={handlechange} required>
                            {/* handleSelectChange    ---[...experiences].sort((a, b) => b.id - a.id).map((val, index)--- */}
                            <option value=""></option>
                            {[...manager].sort((a, b) => a.name.localeCompare(b.name)).map((item, index) => (
                                <option key={index} value={item.name}>
                                    {item.name}
                                </option>
                            ))}

                        </select>
                        <label
                            className={`${isReportFilled ? 'sel_label' : ''}`}
                        >
                            <span className="star">*   </span>Reporting Manager
                        </label>

                    </div>
                </div>
                <div className="labelish">
                    <div className="fe">
                        <span className="star"></span>
                        <input className="email" name="email" autocomplete="off" list="autocompleteOff" type="email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" placeholder="" onChange={handlechange} value={formsData.email} required />
                        <label for="email"><span className="star">*   </span>Email</label>
                        {errorMessage != null && formsData.email != "" && <span className="error">{errorMessage}</span>}
                    </div>
                    <div className="overr">
                        <div className="form-employee">
                            <input className='phnnum' id="phoneno" type='text' pattern=".{5,10}" name='employeeID' autocomplete="off" list="autocompleteOff" placeholder='' value={formsData.employeeID} onChange={handlechange} required />
                            <label for="phNum"><span className="star">*   </span>Employee Id</label>
                            {/* {employeeErrorMessage != null && formsData.employeeID != "" && <span className="error">{employeeErrorMessage}</span>} */}
                        </div>
                    </div>

                </div>

                <div className="labelish" >
                    <div className="fe">
                        {/* <input className='permnt' name="permAddr" type='text' autocomplete="off" list="autocompleteOff" placeholder='' value={formsData.permAddr} onChange={handlechange} required /> */}
                        <textarea className="aadressarea" name="permAddr" type='text' autocomplete="off" list="autocompleteOff" placeholder='' value={formsData.permAddr} onChange={handlechange} required></textarea>
                        <label for="permAddr"><span className="star">*   </span>Permanent Address</label>
                    </div>
                    <div className="overr">
                        <div className={`${isMarriageFilled ? `b` : `marriage`
                            }`}>
                            <select className='marstatus selctor' name='mstatus' value={formsData.mstatus} onChange={handlechange} required >
                                <option></option>
                                <option value='married'>Married</option>
                                <option value='unmarried'>UnMarried</option>
                            </select>
                            <label
                                className={`${isMarriageFilled ? 'sel_label' : ''}`}
                            >
                                <span className="star">*   </span> Marrital Status
                            </label>
                        </div>
                        <br />
                        <br />
                        <div className="finale">
                            <input className='forgrp' type='text' name='panNum' autocomplete="off" list="autocompleteOff" placeholder='' value={formsData.panNum.toUpperCase()} onChange={handlechange} required />
                            <label for="panNum"><span className="star">*   </span>PAN Card Number</label>
                            {errorPanMsg != null && formsData.panNum != "" && <span className="error">{errorPanMsg}</span>}
                        </div>

                    </div>
                </div>

                <div className="group2 sidewayFix" id="forthrow">
                    <div className="together">
                        <div className={`${isGenderFilled ? `f_group` : `${sty.form_group}`
                            }`}>
                            <select name="gender" className="gender selctor" value={formsData.gender} onChange={handlechange} required>
                                <option></option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                                <option value='others'>Others</option>
                            </select>
                            <label
                                className={`${isGenderFilled ? 'sel_label' : ''}`}
                            >
                                <span className="star">*   </span>Gender
                            </label>

                        </div>
                        <div className={`${isBloodFilled ? `selectt_filled` : `blood`
                            }`}>
                            <select className='bloodgrp selectorrr' name="bldGrp" value={formsData.bldGrp} onChange={handlechange} required>
                                <option></option>
                                <option>A+</option>
                                <option>B+</option>
                                <option>O+</option>
                                <option>AB+</option>
                                <option>A-</option>

                            </select>
                            <label
                                className={`${isBloodFilled ? 'sel_label' : ''}`}
                            >
                                <span className="star">*   </span>Blood Group
                            </label>

                        </div>
                    </div>
                    <div className="over">
                        <div className="rm-group">
                            <input className='phnnum' id="phoneno" type='text' pattern=".{5,10}" name='phNum' autocomplete="off" list="autocompleteOff" placeholder='' value={formsData.phNum} onChange={handlechange} required />
                            <label for="phNum"><span className="star">*   </span>Phone Number</label>
                            {phoneError && <p className="error">{phoneError}</p>}
                        </div>
                    </div>
                </div>


                <div className="group2" id="forthrow">
                    <div className="together">

                        <div className={sty.form_group}>
                            <input
                                type="date"
                                id="messi3"
                                placeholder=''
                                className='textbox1'
                                max={getCurrentDate()}

                                onChange={handlechange}
                                // title='fill StartingDate'
                                value={formsData.dob}

                                name='dob'
                                required
                            />
                            <label htmlFor="messi3"><span className="star">*   </span>DOB</label>
                            {error.DateError && <p className='error'>{error.DateError}</p>}
                            {dateError && <p className="error">{dateError}</p>}

                        </div>
                        <div className={`${isNationalityFilled ? `zlatan_filled` : `natione`
                            }`}>
                            <select className='bloodgrp selector' name="nationality" required value={formsData.nationality} onChange={handlechange} >
                                <option> </option>

                                {dropdownData.map((item, index) => (
                                    <option key={index} value={item.nationality}>
                                        {item.nationality}
                                    </option>
                                ))}

                            </select>
                            <label
                                className={`${isNationalityFilled ? 'sel_label' : ''}`}
                            >
                                <span className="star">*   </span> Nationality
                            </label>

                        </div>

                    </div>

                    <div className="over">
                        <div className="form-groupp">
                            <input className='phnnum' id="phoneno" type='text' name='aadhaarNum' autocomplete="off" list="autocompleteOff" placeholder='' value={formsData.aadhaarNum} onChange={handlechange} required />
                            <label for="phNum"><span className="star">*   </span>Adhar Card No:</label>
                            {aadharError && <p className="error">{aadharError}</p>}
                        </div>
                    </div>
                </div>

                <div className="move-left">
                    <div className="inlinee">
                        <div className={`${isDoEFilled ? `select_filled` : `forgrp`
                            }`}>
                            <select name="divisionOfEmployee" className="gende selctor" value={formsData.divisionOfEmployee} onChange={handlechange} required>
                                <option></option>
                                {[...divisionOfEmployee].sort((a, b) => a.division.localeCompare(b.division)).map((val, index) => (
                                    <>
                                        <option value={val.division} key={index}>
                                            {val.division}
                                        </option>
                                    </>
                                ))}

                            </select>
                            <label
                                className={`${isDoEFilled ? 'sel_label' : ''}`}
                            >
                                <span className="star">*   </span> Division of employee
                            </label>
                        </div>
                        <div className={sty.rorm_group}>
                            <input
                                type="date"
                                id="messi3"
                                placeholder=''
                                className='textbox1'


                                onChange={handlechange}
                                // title='fill StartingDate'
                                value={formsData.doj}
                                max={getCurrentDate()}
                                name='doj'
                                required
                            />
                            <label htmlFor="messi3"><span className="star">*   </span>Join date</label>
                            {error.DateError && <p className='error'>{error.DateError}</p>}
                            {dateError && <p className="error">{dateError}</p>}

                        </div>
                    </div>


                    <div className={`${isRoleFilled ? `select_filled` : `forr`
                        }`}>
                        <select name="roleOFEmployee" className="gende selctor" value={formsData.roleOFEmployee} onChange={handlechange} required >
                            <option></option>

                            {[...role].sort((a, b) => a.role.localeCompare(b.role)).map((val, index) => (
                                <>
                                    <option value={val.role} key={index}>
                                        {val.role}
                                    </option>
                                </>
                            ))}
                        </select>
                        <label
                            className={`${isRoleFilled ? 'sel_label' : ''}`}
                        >
                            <span className="star">*   </span> Role of Employee
                        </label>
                    </div>
                    <div className="group4">
                        <div className={`${isRankFilled ? `lectt_filled` : `fo`
                            }`}>
                            <select name="rank" className="gende selctor" value={formsData.rank} onChange={handlechange} required>
                                <option></option>

                                {rank.map((val, index) => (
                                    <>
                                        <option value={val.rank} key={index}>
                                            {val.rank}
                                        </option>
                                    </>
                                ))}
                            </select>
                            <label
                                className={`${isRankFilled ? 'sel_label' : 'sel_label'}`}
                            >
                                <span className="star">*   </span> Rank of Employee
                            </label>
                        </div>

                        <div className="cbutton">
                            <button className='button' type='submit'>Save</button>

                        </div>
                    </div>

                </div>








            </div>
            {showPopeup && (<PopeUp submitconfirm={submitconfirm} submitcancel={submitcancel} />)}
            {/* {
                showStatusBar != null && (
                    <PopeUp message={showStatusBar} submitconfirm={closestatus} />
                )
            } */}
        </form >
    )

}
export default PersonalForm;