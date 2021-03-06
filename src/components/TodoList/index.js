
import React, { useState } from "react";
import { Modal, Button, Alert, Card, Table } from "react-bootstrap";
import Analytics from "../Analytics";
import "./todolist.css";

const TodoList = (props) => {
  let getFromLocalStorage = JSON.parse(localStorage.getItem("AddTaskData"));
  const [taskList, setTaskList] = useState(getFromLocalStorage);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [edit, setEdit] = useState("");
  const [show, setShow] = useState(false);
  const [isChecked, setIsChecked] = useState([]);

  // Modal Edit
  const handleClose = () => setShow(false);
  const handleOpen = (index, task) => {
    setShow(true);
    setEditIndex(index);
    setEdit(task);
  };
  // Add Task
  let list = [];
  const manageTask = (index) => {
    if (!index) {
      // Add
      if (getFromLocalStorage) {
        list = getFromLocalStorage;
      }
      if (!input) {
        return alert("Task can not be null")
        // return <Alert variant="danger">
        //   Task can not be enter null
        // </Alert>
      }
      list.push(input);
      setTaskList(list);
      localStorage.setItem("AddTaskData", JSON.stringify(list));
      setInput("");
      return <Alert variant="success">
        Task added successfully
      </Alert>

      // return props.showAlert("Task added successfully", "success");
    } else {
      //Edit
      const updatedList = [...taskList];
      updatedList[editIndex] = edit;
      setTaskList(updatedList);
      localStorage.setItem("AddTaskData", JSON.stringify(updatedList));
      setEdit("");
      setShow(false);
      return alert("Task Updated successfully")
      // return <Alert variant="success">
      //   Task Updated successfully
      // </Alert>
    }
  };

  // Delete Task
  const deleteTask = (index) => {
    const deletedData = taskList.filter((el, i) => {
      return index !== i;
    });
    localStorage.setItem("AddTaskData", JSON.stringify(deletedData));
    setTaskList(deletedData);
    return alert("Task deleted successfully")
    // return <Alert variant="success">
    //   Task deleted successfully
    // </Alert>
  };

  // check change
  const checkChangeHandler = (checkData, index) => {
    let updatedChecked = [...isChecked];
    updatedChecked[index] = checkData;
    setIsChecked(updatedChecked);
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <>
      <div className="container">
        <div>
          <div className="2w-50">
            <div className="mt-5 row">
              <h2 style={{ textDecoration: "underline" }}>
                To-do List
              </h2>
              <div className="mt-3 form-floating d-flex justify-content-center">
                <textarea
                  className="form-control"
                  id="floatingTextarea"
                  value={input}
                  onChange={onChange}
                  placeholder="Enter Your Task"
                  rows="2" cols="50"></textarea>
                <i id="floatingTextarea" onClick={() => manageTask()} className="mx-3 fa fa-plus-square-o fa-3x" aria-hidden="true"></i>
              </div>

              <div className="mt-4">
                {taskList?.length ? (
                  <>
                    <hr style={{ marginTop: "1rem", backgroundColor: "red", width: "100%" }} />
                    <h4>List of Task</h4>
                    {
                      taskList.filter(ele => props.search ?
                        (
                          ele?.toLowerCase()?.includes(props.search?.toLowerCase())
                        )
                        : true)
                        .map((elem, id) => {
                          return (
                            <div className="d-flex justify-content-start" key={id}>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="checkBOX"
                                value={isChecked[id]}
                                onChange={(e) =>
                                  checkChangeHandler(e.target.checked, id)
                                }
                                id="flexCheckDefault"
                              />
                              <div className="card d-flex" style={{ width: "23rem" }}>
                                <h5 style={{ textDecoration: `${isChecked[id] ? "line-through" : "none"}` }}
                                  className="mx-4">{elem}</h5>
                              </div>
                              <div>
                                <i
                                  style={{
                                    opacity: `${isChecked[id] ? "0.3" : "1"}`,
                                    pointerEvents: `${isChecked[id] ? "none" : "all"
                                      }`,
                                  }}
                                  className="fa fa-pencil-square-o"
                                  onClick={() => handleOpen(id, elem)}
                                  aria-hidden="true"
                                ></i>

                                {/* Modal for Editing Task */}
                                <Modal show={show} onHide={handleClose}>
                                  <Modal.Header
                                    size="lg"
                                    aria-labelledby="contained-modal-title-vcenter"
                                    centered="true"
                                  >
                                    <Modal.Title>Edit Task</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    <textarea
                                      className="form-control"
                                      id="floatingTextarea"
                                      value={edit}
                                      onChange={(e) => setEdit(e.target.value)}
                                    ></textarea>
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                      cancel
                                    </Button>
                                    <Button
                                      variant="primary"
                                      onClick={() => manageTask(id)}
                                    >
                                      Save
                                    </Button>
                                  </Modal.Footer>
                                </Modal>
                                {/* Delete Icon For Task */}
                                <i
                                  onClick={() => deleteTask(id)}
                                  className="fa fa-trash-o"
                                  aria-hidden="true"
                                ></i>
                              </div>
                            </div>
                          );
                        })
                    }
                    {/* <Analytics totalLength={getFromLocalStorage.length} checkedList={isChecked.length} /> */}
                  </>
                ) : (
                  <div className="m-4">
                    <p>No task</p>
                  </div>
                )}
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
