import React, { useState } from "react";

function Form(props) {
  const [item, setItem] = useState(props.Task);
  return (
    <div className="row justify-content-center">
      <div className="col col-md-6 col-sm-12 col-lg-6 py-2">
        <div className="card">
          <div className="card-body text-center">
            <h5 className="card-title">{props.header}</h5>
            <form>
              <input
                type="text"
                className="form-control py-2 btn-rounded"
                id="task"
                placeholder="Enter Task....."
                value={item.title}
                onChange={(e) => setItem({ title: e.target.value })}
                required
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  props.handler(item);
                  setItem({ title: "" });
                }}
                className="btn btn-primary btn-rounded my-3"
              >
                {props.ButtonText}
              </button>
              {props.Toggle && (
                <button
                  className="btn btn-danger ms-2 btn-rounded my-3"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    props.setToggle(false);
                  }}
                >
                  Cancel
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
Form.defaultProps = {
  Title: "Form",
};

export default Form;
