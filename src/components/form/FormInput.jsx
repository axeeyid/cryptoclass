import React from 'react';

const FormInput = ({ label, name, type, value, onChange, placeholder, disabled }) => {
  return (
    <div className="form-control text-black">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        id={name} // Menambahkan id untuk aksesibilitas
        value={value}
        onChange={onChange}
        className="input input-bordered"
        placeholder={placeholder}
        disabled={disabled}
        required // Menandai input sebagai wajib
      />
    </div>
  );
};

export default FormInput;
