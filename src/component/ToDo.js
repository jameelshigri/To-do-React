import axios from "axios";
import React from "react";
function ToDo(props) {
  const [Task, setTask] = React.useState([]);
  const [newTask, setnewTask] = React.useState({ title: "" });

  const handleChange = (e) => {
    setnewTask({ ...newTask, title: e.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    addData();
    // event.target.value = "";
  };
  async function handleDelete(id) {
    let choice = window.confirm("Are You Sure?");
    if (choice) {
      try {
        const response = await axios.delete(
          "http://localhost:30005/todos/" + id
        );
        console.log(response);
        if (response.status === 200) {
          fetchData();
          props.showAlert("Deleted!", "info");
        } else {
          props.showAlert("Something went wrong", "warning");
        }
      } catch (error) {
        console.error(error);
        props.showAlert("An error occurred", "error");
      }
    }
  }
  async function addData() {
    const result = await axios.post("http://localhost:30005/todos", newTask);
    if (result) {
      props.showAlert("Task Added Successfully!", "success");
      fetchData();
      setnewTask({ title: "" });
    }
  }
  async function fetchData() {
    await axios.get("http://localhost:30005/todos").then((res) => {
      setTask(res.data);
    });
  }
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <div
      className="container-fluid py-2"
      style={{ backgroundColor: "#00004d" }}
    >
      <div className="row justify-content-center">
        <div className="col col-md-6 col-sm-12 col-lg-6 py-2">
          <div className="card">
            <div className="card-body">
              <form className="" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="form-control py-2 btn-rounded"
                  id="task"
                  placeholder="Enter Task....."
                  value={newTask.title}
                  onChange={handleChange}
                  required
                />
                <button
                  type="submit"
                  className="btn btn-primary btn-rounded my-3"
                >
                  Add Task
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col col-md-6 col-sm-12 col-lg-6 py-1">
          <div className="card my-1">
            {Task.map((taks) => {
              return (
                <div
                  key={taks.id}
                  className="card-body my-border d-flex justify-content-between"
                >
                  <div className="d-flex flex-row align-items-center">
                    {taks.completed === true ? (
                      <span className="badge badge-success mx-2">Done</span>
                    ) : (
                      <span className="badge badge-danger mx-2">Pending</span>
                    )}
                    <h5 className="p-0 m-0 text-uppercase">{taks.title}</h5>
                  </div>
                  <div className="d-flex flex-row-reverse align-items-center">
                    <button className="btn btn-outline-success btn-floating mx-2">
                      <i className="fas fa-pen"></i>
                    </button>
                    <button
                      className="btn btn-outline-danger btn-floating"
                      onClick={() => {
                        handleDelete(taks.id);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToDo;
