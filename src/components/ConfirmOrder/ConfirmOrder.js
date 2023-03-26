import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router";
import axios from "axios";
import "./ConfirmOrder.css";

const steps = ["Items", "Select Address", "Confirm Order"];

export default function ConfirmOrder() {
  const { userDetails } = useSelector((state) => state.common);

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 4;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const { confirmedProduct } = useSelector((state) => state.common);

  const [state, setState] = useState({
    addressName: "",
    contact: "",
    street: "",
    city: "",
    stateValue: "",
    landmark: "",
    zipCode: "",
  });

  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const navigate = useNavigate();

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    navigate("/products");
    alert("Order placed successfully!");
  };

  const handlePutAddress = async (e) => {
    e.preventDefault();
    const {
      addressName,
      contact,
      street,
      city,
      stateValue,
      landmark,
      zipCode,
    } = state;
    if (
      !addressName ||
      !contact ||
      !street ||
      !city ||
      !stateValue ||
      !landmark ||
      !zipCode
    ) {
      alert("Please enter all the fields");
    } else {
      try {
        const email = userDetails.email;
        var state = stateValue;
        const response = await axios.put(
          "http://localhost:8080//api/addresses",
          {
            email,
            addressName,
            contact,
            street,
            city,
            state,
            landmark,
            zipCode,
          }
        );
        if (!response.error) {
          console.log("Put address =>", response);
          alert("Address addition was successful!");
          handleNext();
        }
      } catch {
        alert("Address addition failed!");
      }
    }
    handleNext();
  };

  return (
    <Box sx={{ margin: "40px 120px" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box
            sx={{ mt: 2, mb: 1, display: activeStep == 0 ? "block" : "none" }}
          >
            {/* Step 1 */}
            <div className="confirm-selected-product-details-div">
              <div className="product-detail-left">
                <img
                  className="product-image"
                  src={confirmedProduct.imageUrl}
                  alt="product-image"
                />
              </div>
              <div className="product-detail-right">
                <label style={{ fontSize: "30px" }}>
                  {confirmedProduct.name}
                </label>
                <p>
                  Quantity:{" "}
                  <span style={{ fontWeight: 550 }}>
                    {confirmedProduct.orderQuantity}
                  </span>
                </p>
                <p>
                  Category:{" "}
                  <span style={{ fontWeight: 550 }}>
                    {confirmedProduct.itemCategory}
                  </span>
                </p>
                <p>{confirmedProduct.desc}</p>
                <p style={{ color: "red", fontSize: "22px" }}>
                  Total Price : ₹{" "}
                  {confirmedProduct.price * confirmedProduct.orderQuantity}
                </p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                variant="contained"
                sx={{ background: "var(--primary)" }}
              >
                Next
              </Button>
            </div>
          </Box>
          <Box
            sx={{ mt: 2, mb: 1, display: activeStep == 1 ? "block" : "none" }}
          >
            {/* Step 2 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  //marginLeft: "50px",
                  display: "flex",
                  flexDirection: "column",
                  //alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <label style={{ justifyContent: "flex-start" }}>
                  Select Address
                </label>
                <FormControl sx={{ width: 500 }}>
                  <Select
                    value={age}
                    size="small"
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {/* <MenuItem value="">
              <em>None</em>
            </MenuItem> */}
                    <MenuItem value="" disabled>
                      Select...
                    </MenuItem>
                    {/* <MenuItem value={10}>Price: High to Low</MenuItem>
                  <MenuItem value={20}>Price: Low to High</MenuItem>
                  <MenuItem value={30}>Newest</MenuItem> */}
                  </Select>
                </FormControl>
              </div>
              <p>-OR-</p>
              <label style={{ fontSize: "20px" }}>Add Address</label>
              <div>
                <div style={{ margin: "15px" }}>
                  <TextField
                    id="outlined-basic"
                    label="Name*"
                    variant="outlined"
                    sx={{ width: "40ch" }}
                    type="text"
                    name="addressName"
                    value={state.addressName}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div style={{ margin: "15px" }}>
                  <TextField
                    id="outlined-basic"
                    label="Contact Number*"
                    variant="outlined"
                    sx={{ width: "40ch" }}
                    type="number"
                    name="contact"
                    value={state.contact}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div style={{ margin: "15px" }}>
                  <TextField
                    id="outlined-basic"
                    label="Street*"
                    variant="outlined"
                    sx={{ width: "40ch" }}
                    type="text"
                    name="street"
                    value={state.street}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div style={{ margin: "15px" }}>
                  <TextField
                    id="outlined-basic"
                    label="City*"
                    variant="outlined"
                    sx={{ width: "40ch" }}
                    type="text"
                    name="city"
                    value={state.city}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div style={{ margin: "15px" }}>
                  <TextField
                    id="outlined-basic"
                    label="State*"
                    variant="outlined"
                    sx={{ width: "40ch" }}
                    type="text"
                    name="stateValue"
                    value={state.stateValue}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div style={{ margin: "15px" }}>
                  <TextField
                    id="outlined-basic"
                    label="Landmark*"
                    variant="outlined"
                    sx={{ width: "40ch" }}
                    type="text"
                    name="landmark"
                    value={state.landmark}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div style={{ margin: "15px" }}>
                  <TextField
                    id="outlined-basic"
                    label="Zip Code*"
                    variant="outlined"
                    sx={{ width: "40ch" }}
                    type="number"
                    name="zipCode"
                    value={state.zipCode}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Button
                  onClick={(e) => handlePutAddress(e)}
                  variant="contained"
                  sx={{ background: "var(--primary)" }}
                >
                  Next
                </Button>
              </div>
            </div>
          </Box>
          <Box
            sx={{ mt: 2, mb: 1, display: activeStep == 2 ? "block" : "none" }}
          >
            {/* Step 3 */}
            <div>
              <div className="placeorder-screen">
                <div className="placeorder-screen-left">
                  <label style={{ fontSize: "35px" }}>
                    {confirmedProduct.name}
                  </label>
                  <p>
                    Quantity:{" "}
                    <span style={{ fontWeight: "550" }}>
                      {confirmedProduct.orderQuantity}
                    </span>
                  </p>
                  <p>
                    Category:{" "}
                    <span style={{ fontWeight: "550" }}>
                      {confirmedProduct.itemCategory}
                    </span>
                  </p>
                  <p>{confirmedProduct.desc}</p>
                  <p style={{ color: "red", fontSize: "22px" }}>
                    Total Price : ₹{" "}
                    {confirmedProduct.price * confirmedProduct.orderQuantity}
                  </p>
                </div>
                <div className="vl"></div>
                <div className="placeorder-screen-right">
                  <label style={{ fontSize: "35px" }}>Address Details:</label>
                  <p style={{ marginTop: "10px" }}>{state.name}</p>
                  <p>Contact number: {state.contact}</p>
                  <p>
                    {state.street}, {state.city}
                  </p>
                  <p>{state.state}</p>
                  <p>{state.zipCode}</p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Button
                  onClick={(e) => handlePlaceOrder(e)}
                  variant="contained"
                  sx={{ background: "var(--primary)" }}
                >
                  Place Order
                </Button>
              </div>
            </div>
          </Box>

          {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box> */}
        </React.Fragment>
      )}
    </Box>
  );
}
