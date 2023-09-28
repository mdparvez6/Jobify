const FormRow = ({ type, name, labeltext, defaultvalue }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labeltext || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        defaultValue={defaultvalue || ""}
        required
      />
    </div>
  );
};

export default FormRow;
