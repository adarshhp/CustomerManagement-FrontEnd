import React from 'react'
import "./Model.css";

function Model({message,confirmHandler,cancelHandler}) {
  //check
  return (
    <div className="largebox">
      <div className="smallbox">
        <div className="message">{message}</div>
        <div className="control">
          <button className="btn-diag confirm" onClick={confirmHandler}>Confirm</button>
          {cancelHandler && (
            <button className="btn-diag" onClick={cancelHandler}>Cancel</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Model;
