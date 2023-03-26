import React, { useState } from "react";
import "./SignUp.css";
import LockIcon from "@mui/icons-material/Lock";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

function SignUp() {
  const [state, setState] = useState({
    userType: "admin",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
  });

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);

  const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);

  const [openPasswordErrorSnackbar, setOpenPasswordErrorSnackbar] =
    React.useState(false);

  const handleSuccessSnackbar = () => {
    setOpenSuccessSnackbar(true);
  };

  const handleErrorSnackbar = () => {
    setOpenErrorSnackbar(true);
  };

  const handlePasswordErrorSnackbar = () => {
    setOpenPasswordErrorSnackbar(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccessSnackbar(false);
    setOpenErrorSnackbar(false);
    setOpenPasswordErrorSnackbar(false);
  };

  var vertical = "top";
  var horizontal = "right";

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const {
      userType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      contactNumber,
    } = state;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !contactNumber
    ) {
      // alert("Please fill all the required fields!");
      handleErrorSnackbar();
      return;
    }
    if (password !== confirmPassword) {
      // alert("Password does not match");
      handlePasswordErrorSnackbar();
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        { userType, firstName, lastName, email, password, contactNumber }
      );
      if (!response.error) {
        handleSuccessSnackbar();
        console.log(response);
        dispatch({
          type: "SET_USER",
          payload: {
            userType: response.data.data.userType,
            firstName: response.data.data.firstName,
            lastName: response.data.data.lastName,
            email: response.data.data.email,
            contactNumber: response.data.data.contactNumber,
            addressName: response.data.data.addressName,
            street: response.data.data.street,
            city: response.data.data.city,
            state: response.data.data.state,
            landmark: response.data.data.landmark,
            zipCode: response.data.data.zipCode,
          },
        });
        navigate("/products");
      }
    } catch {
      // alert("Error in signup!");
      handleErrorSnackbar();
    }
  };

  return (
    <>
      <div style={{ marginTop: "50px" }}>
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
          <label style={{ fontWeight: "520", fontSize: "25px" }}>Sign up</label>
          <div className="email-password-div">
            <div style={{ margin: "15px" }}>
              <TextField
                id="outlined-basic"
                label="First Name *"
                variant="outlined"
                sx={{ width: "40ch" }}
                type="text"
                name="firstName"
                value={state.firstName}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div style={{ margin: "15px" }}>
              <TextField
                id="outlined-basic"
                label="Last Name *"
                variant="outlined"
                sx={{ width: "40ch" }}
                type="text"
                name="lastName"
                value={state.lastName}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div style={{ margin: "15px" }}>
              <TextField
                id="outlined-basic"
                label="Email Address *"
                variant="outlined"
                sx={{ width: "40ch" }}
                type="email"
                name="email"
                value={state.email}
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
            <div style={{ margin: "15px" }}>
              <TextField
                id="outlined-basic"
                label="Confirm Password *"
                variant="outlined"
                sx={{ width: "40ch" }}
                type="password"
                name="confirmPassword"
                value={state.confirmPassword}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div style={{ margin: "15px" }}>
              <TextField
                id="outlined-basic"
                label="contact Number *"
                variant="outlined"
                sx={{ width: "40ch" }}
                type="number"
                name="contactNumber"
                value={state.contactNumber}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="signup-button-div">
            <Button
              variant="contained"
              sx={{ width: "45ch", background: "var(--primary)" }}
              onClick={(e) => handleSignUp(e)}
            >
              SIGN UP
            </Button>
            <a
              style={{ marginTop: "15px", marginLeft: "auto" }}
              href="/login"
            >
              Already have an account? Sign In
            </a>
          </div>
          <p style={{ color: "grey", marginTop: "45px" }}>
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
          Signup successful!
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
          Signup failed!
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openPasswordErrorSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Password and confirm password do not match!
        </Alert>
      </Snackbar>
    </>
  );
}

export default SignUp;
