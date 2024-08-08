import React from 'react'
import Wrapper from "./Wrapper";
import EducationalForm from "./EducationalForm";

function Education() {
  return (
    <Wrapper name="Educational Qualification" formComponent={<EducationalForm />}/>
  )
}

export default Education
