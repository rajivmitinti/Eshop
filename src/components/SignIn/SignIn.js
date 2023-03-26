import React, { useState } from "react";
import "./SignIn.css";
import LockIcon from "@mui/icons-material/Lock";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

function SignIn() {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);

  const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);

  const [openInputErrorSnackbar, setOpenInputErrorSnackbar] =
    React.useState(false);

  const handleSuccessSnackbar = () => {
    setOpenSuccessSnackbar(true);
  };

  const handleErrorSnackbar = () => {
    setOpenErrorSnackbar(true);
  };

  const handleInputErrorSnackbar = () => {
    setOpenInputErrorSnackbar(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccessSnackbar(false);
    setOpenErrorSnackbar(false);
    setOpenInputErrorSnackbar(false);
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { username, password } = state;
    if (!username || !password) {
      // alert("Please fill the deails properly!");
      handleInputErrorSnackbar();
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signin",
        {
          username,
          password,
        }
      );
      if (!response.error) {
        console.log(response);
        dispatch({
          type: "SET_USER",
          payload: {
            userType: response.data.data.userType,
            firstName: response.data.data.firstName,
            lastName: response.data.data.lastName,
            email: response.data.data.username,
            contactNumber: response.data.data.contact,
            addressName: response.data.data.addressName,
            street: response.data.data.street,
            city: response.data.data.city,
            state: response.data.data.state,
            landmark: response.data.data.landmark,
            zipCode: response.data.data.zipCode,
          }
        })
        handleSuccessSnackbar();
        navigate("/products");
      }
    } catch {
      //alert("Error in signup!");
      handleErrorSnackbar();
    }
  };

  var vertical = "top";
  var horizontal = "right";

  return (
    <>
      <div style={{ height: "90vh" }}>
        <div className="signin-div">
          <div>
            <LockIcon
              sx={{
                color: "white",
                padding: "10px 10px",
                background: "#F50057",
                borderRadius: "50%",
                backgroundPosition: "inherit",
              }}
            />
          </div>
          <label style={{ fontWeight: "520", fontSize: "25px" }}>Sign in</label>
          <div className="username-password-div">
            <div style={{ margin: "15px" }}>
              <TextField
                id="outlined-basic"
                label="email Address *"
                variant="outlined"
                sx={{ width: "40ch" }}
                type="email"
                name="username"
                value={state.username}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div style={{ margin: "15px" }}>
              <TextField
                id="outlined-basic"
                label="Password *"
                variant="outlined"
                sx={{ width: "40ch" }}
                type="password"
                name="password"
                value={state.password}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="signin-button-div">
            <Button
              variant="contained"
              sx={{ width: "45ch", background: "var(--primary)" }}
              onClick={(e) => handleSignIn(e)}
            >
              SIGN IN
            </Button>
            <a style={{ marginTop: "15px" }} href="/signup">
              Don't have an account? Sign Up
            </a>
          </div>
          <p style={{ color: "grey", margin: "45px 0px" }}>
            Copyright © <a href="https://upgrad.com">upGrad</a> 2021
          </p>
        </div>
      </div>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openSuccessSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Login successful!
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Login failed!
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openInputErrorSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Please fill all the fields properly!
        </Alert>
      </Snackbar>
    </>
  );
}

export default SignIn;
