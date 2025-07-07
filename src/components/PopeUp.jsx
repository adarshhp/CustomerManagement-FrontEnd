import React from 'react'
import "./PopeUp.css"

function PopeUp({submitconfirm,submitcancel,message}) {
    return (
        <div className='largebox'>
            <div className='smallbox'>
                <div className='msg'>{message||"Are You Sure, You Want To Save This"}</div>
                    {message?(
                        <div className='but'>
                        <button className='okay' type='submit' onClick={submitconfirm}>Okay</button>
                        </div>
                    ):(
                        <div className='but'>
                        <button className='cancel' type='submit 'onClick={submitconfirm}> Save</button>
                        <button className='save' type='submit' onClick={submitcancel}> cancel</button>
                        </div>
                    )}
            </div>

        </div>
    )
}

export default PopeUp
