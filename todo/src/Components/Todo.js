import { Box, Button, Chip, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./Todo.css";
import { useParams, useNavigate } from "react-router-dom";
import {
  edit,
  addData,
  CheckUser,
  deleteData,
  getData,
  signout,
} from "../config/firebasemethods";

export default function Todo() {
  const navigate = useNavigate();

  const params = useParams();

  const [id, SetId] = useState("");
  let [task, settask] = useState([]);
  let [Data, SetData] = useState([]);
  let [Dat, SetDat] = useState([]);
  let [todo, settodo] = useState("");
  let [update, setupdate] = useState([]);
  let getTodos = () => {
    getData(`Todo/${params.id}`)
      .then((suc) => {
        SetData(suc);
        // console.log("Data recieved")
        let b = [];
        suc.map((e, i) => {
          b.push(e.Todo);
        });
        SetDat([...b]);
        settask([...b]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    CheckUser()
      .then((res) => {
        if (res == params.id) {
          SetId(res);
          getTodos();
        } else {
          console.log("not signed in");
          navigate("/Login");
        }
      })
      .catch((rej) => {
        console.log(rej)
        navigate("/Login");
      });
  }, []);

  let del = (d) => {
    Data.map((e, i) => {
      if (e.Todo == task[d]) {
        deleteData(`Todo/${id}`, e.uid);
      }
    });
    task.splice(d, 1);
    setupdate([...task]);
  };
  let Edit = (d) => {
    let a = prompt("Edit The Task");
    Data.map((e, i) => {
      if (e.Todo == task[d]) {
        edit(`Todo/${id}/${e.uid}`, a);
      }
    });
    task[d] = a;
    setupdate([...task]);
  };

  let add = () => {
    let a = todo;
    task.push(a);
    settask(task);
    setupdate([...task]);
    settodo("");
  };

  let out=() => {
    signout(params.id);
    navigate("/Login")
  }

  let all = () => {
    deleteData(`Todo/${id}`);
    setupdate([]);
    settask([]);
  };

  let save = () => {
    task.map((e, i) => {
      !Dat.includes(e) &&
        addData(
          {
            Todo: e,
            User_Id: id,
            index: i,
          },
          `Todo/${id}`
        )
          .then((suc) => {
            // console.log(suc);
            getData(`Todo/${params.id}`)
              .then((suc) => {
                SetData(suc);
                let b = [];
                suc.map((e, i) => {
                  b.push(e.Todo);
                });
                SetDat([...b]);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
    });
  };
  useEffect(() => {
    settask(update);
  }, []);
  return (
    <>
      <div className="main">
        <div>
          <Typography
            sx={{
              fontFamily: 'Times, "Times New Roman", Times',
              fontSize: "4.4em",
              color: "	aliceblue",
              fontWeight: "bold",
              marginLeft: "530px",
            }}
            variant="h2"
          >
            Todo App
          </Typography>
        </div>
        <div>
        <Button
            variant="contained"
            sx={{ position:"relative",marginLeft: "1000px", marginTop: "-110px" }}
            onClick={() => {
              out();
            }}
          >
            Sign Out
          </Button>
        </div>
        <div className="box">
          <div>
            <Typography
              sx={{
                fontFamily: 'Times, "Times New Roman", Times',
                fontSize: "2em",
                color: "dark black",
                fontWeight: "bold",
                marginLeft: "136px",
                marginTop: "10px",
                textDecoration: "underline 4px",
              }}
              variant="h2"
            >
              {" "}
              Tasks Todo List
            </Typography>
          </div>
          <div>
            <TextField
              size="small"
              onChange={(e) => {
                settodo(e.target.value);
              }}
              sx={{ marginTop: "10px", marginLeft: "49px", width: "343px" }}
              placeholder="enter task here"
            ></TextField>
            {task.length == 0 ? (
              <Typography
                sx={{
                  fontSize: "1.7em",
                  marginLeft: "89px",
                  marginTop: "12px",
                  color: "red",
                }}
                variant="h4"
              >
                Currently List Is Empty
              </Typography>
            ) : (
              task.map((e, i) => (
                <Box padding="8px">
                  <Chip
                    icon={
                      <EditIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          Edit(i);
                        }}
                      />
                    }
                    sx={{ fontSize: "1.4em", width: "633px", height: "44px" }}
                    variant="outlined"
                    onClick={() => {}}
                    onDelete={() => del(i)}
                    deleteIcon={<DeleteIcon />}
                    label={e}
                    key={i}
                  />
                  <br />
                </Box>
              ))
            )}
          </div>
        </div>
        <div>
          <Button
            variant="contained"
            size="small"
            sx={{ marginLeft: "830px", marginTop: "78px", height: "39px" }}
            onClick={() => {
              if (task.length < 5) {
                add();
              }
            }}
          >
            Add Task
          </Button>
          <br />
        </div>
        <div>
          <Button
            variant="contained"
            sx={{ marginLeft: "480px", marginTop: "349px" }}
            onClick={() => {
              all();
            }}
          >
            Delete All
          </Button>
          <Button
            variant="contained"
            sx={{ marginLeft: "200px", marginTop: "349px" }}
            onClick={() => {
              save();
            }}
          >
            Save
          </Button>
        </div>
        
      </div>
    </>
  );
}
