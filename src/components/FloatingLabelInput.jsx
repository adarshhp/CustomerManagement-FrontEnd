import React, { useState } from 'react';
import './FloatingLabelInput.css'; // Ensure to create this CSS file

const FloatingLabelInput = ({ label, type = 'text', ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    if (!props.value) {
      setIsFocused(false);
    }
  };

  return (
    <div className="floating-label-input">
      <input
        type={type}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      <label className={isFocused || props.value ? 'focused' : ''}>
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
