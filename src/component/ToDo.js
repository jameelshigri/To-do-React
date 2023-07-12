import axios from "axios";
import React from "react";
import Form from "./Form";
function ToDo(props) {
  const [Task, setTask] = React.useState([]);
  const [newTask, setnewTask] = React.useState({ title: "" });
  const [editTask, setEditTask] = React.useState();
  const [toggle, setToggle] = React.useState(false);
  const handleSubmit = (item) => {
    addData(item);
  };
  const handleEdit = (id) => {
    setToggle(true);
    let edit = Task.filter((task) => task.id === id);
    setEditTask({ title: `${edit[0].title}`, id: edit[0].id });
  };
  async function updateTask(item) {
    await axios.patch("http://localhost:30005/todos/" + editTask.id, item);
    setToggle(false);
    fetchData();
  }
  async function handleDelete(id) {
    let choice = window.confirm("Are You Sure?");
    if (choice) {
      try {
        const response = await axios.delete(
          "http://localhost:30005/todos/" + id
        );
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
  async function addData(item) {
    console.log(item);
    const result = await axios.post("http://localhost:30005/todos", item);
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
      <Form
        header="Add New Tasks Here!"
        handler={handleSubmit}
        Task={newTask}
        ButtonText="Add"
      />
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
                    <button
                      className="btn btn-outline-success btn-floating mx-2"
                      onClick={() => {
                        handleEdit(taks.id);
                      }}
                    >
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
      {toggle ? (
        <Form
          header="Edit Task!"
          handler={updateTask}
          setToggle={setToggle}
          Task={editTask}
          ButtonText="Edit/Update"
        />
      ) : null}
    </div>
  );
}

export default ToDo;
