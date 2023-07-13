import React from "react";

function Alert(props) {
  return (
    props.alert && (
      <div className="d-flex align-items-center justify-content-end p-2">
        <div
          className={`alert bg-${props.alert.type} text-white d-flex w-50 align-items-center`}
          role="alert"
        >
          <button className="btn btn-sm btn-floating btn-primary me-1">
            <i className="fas fa-info me-2"></i>
          </button>
          <div>
            <strong>{props.alert.msg}</strong>
          </div>
        </div>
      </div>
    )
  );
}

export default Alert;
