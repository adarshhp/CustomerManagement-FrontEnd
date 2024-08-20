import { useEffect, useState } from "react";
import "./PersonalForm.css";
import apiRequest from "../lib/apiRequest";
import PopeUp from "./PopeUp";
import sty from "./formatedStyle.module.css";


function PersonalForm() {
    const [formsData, setformsData] = useState({
        fname: "",
        lname: "",
        reportingManager:"",
        email: "",
        employeeID: "",
        permAddr: "",
        mstatus: "",
        panNum: "",
        gender:"",
        bldGrp: "",
        phNum: "",
        dob:"",
        nationality: "",
        aadhaarNum: "",
        divisionOfEmployee: "",
        roleOFEmployee:"",
        rank:""
        
    })
    //usestate for changing form from readonly to editable
    const [editForm, setEditForm] = useState(true);
    const [error,setErrors]=useState("");
    function handlechange(e) {
        const { name, value } = e.target;
      
        
        const isValidDate = (dateValue) => {
          const date = new Date(dateValue);
          const year = date.getFullYear();
          return !isNaN(date.getTime()) && year >= 1900;

        };
      
      
        if (name === 'dob') {
          if (isValidDate(value)) {
            setformsData({ ...formsData, [name]: value });
          } else {
            alert("Date of birth cannot be before the year 1900.");
          }
        } else if(name==='phNum'){
            let val = e.target.value.replace(/[^\d]/g, '');
            if (val.length > 10) {
                val = val.slice(0, 10); 
            }
            setformsData({ ...formsData, [name]: val });
        }else if(name==='aadhaarNum'){
            let val = e.target.value.replace(/[^\d]/g, '');
            if (val.length > 12) {
                val = val.slice(0, 12); 
            }
            setformsData({ ...formsData, [name]: val });
        }else if(name==='fname'){
            let val =  e.target.value.replace(/\d/g, '');
            setformsData({ ...formsData, [name]: val });
        }else if(name==='lname'){
            let val = e.target.value.replace(/\d/g, '');
            setformsData({ ...formsData, [name]: val });
        }
            else {
         
          setformsData({ ...formsData, [name]: value });
        }
      
        console.log(name, value, e.target.value);
      }
      

   

    useEffect(() => {
        validatePan(formsData.panNum);
        validateEmail(formsData.email);
       // validateAdhar(formsData.aadhaarNum);
       validateDate(formsData.Date);
    }, [formsData]);

    validateDate=(date)=>{
        
    }



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
        fetch(process.env.REACT_APP_SERVER + '/api/addUserPersonalDetails', {
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
        const pa = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    
        const cleanedPanNum = panNum.toUpperCase().replace(/[^A-Z0-9]/g, '');
        console.log(cleanedPanNum,"vvvvvvvvvvvv");
    
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
    const [errorPanMsg, seterrorPanMsg] = useState(null);
    const [errorAdharMsg, setAdharMsg] = useState(null);

//use state for all dropdowns
const [nation,setNation]=useState([]);
const [role,setRole]=useState([]);
const [divisionOfEmployee,setdivisionOfEmployee]=useState([]);
const [rank,setRank]=useState([]);
const [manager,setManager]=useState([]);




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
    const fetchDivision=async()=>{
        try{
            const responce=await apiRequest('/GetDivisions');
            setdivisionOfEmployee(responce);
            const data=await responce.json();
            if(Array.isArray(data)){
                setdivisionOfEmployee(data);
            }else{
                console.log('error fetching divisionOfEmployee');
            }
        }catch(error){
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
            console.log(response, "responseeee");
            // const data = await response.json();
            console.log("inside........");
            
            
            
            setManager(response);

        } catch (error) {
            console.error('Error fetching dropdown data:', error);
        }
    };
    
    useEffect(()=>{
        fetchNation();
fetchRole();
fetchDivision();
fetchRank();
fetchDropdownData();
fetchManager();

    },[])
    

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

                    <select name="reportingManager" className="reporting" value={formsData.reportingManager} onChange={handlechange} required>
                    {/* handleSelectChange */}
                        <option value="">Reporting Manager</option>
                        {manager.map((item,index) => (
                            <option key={index} value={item.name}>
                                {item.name}
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
                            <input className='phnnum' id="phoneno" type='text' pattern=".{5,10}" name='employeeID' autocomplete="off" list="autocompleteOff" placeholder='' value={formsData.employeeID} onChange={handlechange} required/>
                            <label for="phNum">Employee Id</label>
                        </div>
                    </div>

                </div>

                <div className="labelish" >
                    <div className="fe">
                        <input className='permnt' name="permAddr" type='text' autocomplete="off" list="autocompleteOff" placeholder='' value={formsData.permAddr} onChange={handlechange} required/>
                        <label for="permAddr">Permanent Address</label>
                    </div>
                    <div className="overr">
                        <select className='marstatus selctor' name='mstatus' value={formsData.mstatus} onChange={handlechange} required >
                            <option>Marital Status</option>
                            <option value='married'>Married</option>
                            <option value='unmarried'>UnMarried</option>
                        </select>
                        <br />
                        <br />
                        <div className="finale">
                            <input className='forgrp' type='text' name='panNum' autocomplete="off" list="autocompleteOff" placeholder='' value={formsData.panNum.toUpperCase()} onChange={handlechange} required/>
                            <label for="panNum">PAN Card Number</label>
                            {errorPanMsg != null && formsData.panNum != "" && <span className="error">{errorPanMsg}</span>}
                        </div>

                    </div>
                </div>

                <div className="group2" id="forthrow">
                    <div className="together">
                        <select name="gender" className="gender selctor" value={formsData.gender} onChange={handlechange} required>
                            <option> Gender</option>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                            <option value='others'>Others</option>
                        </select>
                        <select className='bloodgrp selctor' name="bldGrp" value={formsData.bldGrp} onChange={handlechange} required>
                            <option>Blood Group </option>
                            <option>A+</option>
                            <option>B+</option>
                            <option>O+</option>
                            <option>AB+</option>
                            <option>A-</option>
                           
                        </select>
                    </div>
                    <div className="over">
                        <div className="form-group">
                            <input className='phnnum' id="phoneno" type='text' pattern=".{5,10}" name='phNum' autocomplete="off" list="autocompleteOff" placeholder='' value={formsData.phNum} onChange={handlechange} required/>
                            <label for="phNum">Phone Number</label>
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

                                onChange={handlechange}
                                // title='fill StartingDate'

                                name='dob'
                                required
                            />
                            <label htmlFor="messi3"><span className="star">*</span>DOB</label>
                            {error.DateError && <p className='error'>{error.DateError}</p>}

                        </div>

                        <select className='bloodgrp selctor' name="nationality" value={formsData.nationality} onChange={handlechange} required>
                            <option>Nationality </option>
                          
                            {dropdownData.map((item,index) => (
                            <option key={index} value={item.nationality}>
                                {item.nationality}
                            </option>
                        ))}

                        </select>

                    </div>

                    <div className="over">
                        <div className="form-group">
                            <input className='phnnum' id="phoneno" type='text' name='aadhaarNum' autocomplete="off" list="autocompleteOff" placeholder='' value={formsData.aadhaarNum} onChange={handlechange} required/>
                            <label for="phNum">Adhar Card No:</label>
                        </div>
                    </div>
                </div>

                <div className="move-left">
                    <div className="forgrp">
                        <select name="divisionOfEmployee" className="gender selctor" value={formsData.divisionOfEmployee} onChange={handlechange} required>
                            <option> Division of employee</option>
                            {divisionOfEmployee.map((val, index) => (
                                <>
                                    <option value={val.division} key={index}>
                                        {val.division}
                                    </option>
                                </>
                            ))}
                           
                        </select>
                    </div>

                    <div className="forgrp">
                        <select name="roleOFEmployee" className="gender selctor" value={formsData.roleOFEmployee} onChange={handlechange} required >
                            <option> Role of employee</option>
                            
                            {role.map((val, index) => (
                                <>
                                    <option value={val.role} key={index}>
                                        {val.role}
                                    </option>
                                </>
                            ))}
                        </select>
                    </div>
                    <div className="group4">
                        <div className="fo">
                            <select name="rank" className="gender selctor" value={formsData.rank} onChange={handlechange} required>
                                <option> Rank</option>
                               
                            {rank.map((val, index) => (
                                <>
                                    <option value={val.rank} key={index}>
                                        {val.rank}
                                    </option>
                                </>
                            ))}
                            </select>
                        </div>

                        <div className="cbutton">
                            <button className='button' type='submit'>Save</button>
                            <button className="button" type="button" > Edit</button>
                        </div>
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