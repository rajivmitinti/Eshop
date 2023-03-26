import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Chip } from "@mui/material";
import axios from "axios";
import "./ProductPage.css";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

function ProductPage() {
  const { productSelected } = useSelector((state) => state.common);
  const [productCategories, setProductCategories] = useState();

  useEffect(() => {
    async function getProductCategories() {
      const response = await axios.get(
        "http://localhost:8080/api/products/categories"
      );
      if (!response.error) {
        console.log("Product categories => ", response);
        setProductCategories(response.data.data);
      }
    }
    getProductCategories();
  }, []);

  const [orderQuantity, setOrderQuantity] = useState(1);

  const handleChangeQuantity = (e) => {
    setOrderQuantity(e.target.value);
  };

  const [alignment, setAlignment] = React.useState("left");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const {
      name,
      itemId,
      desc,
      price,
      imageUrl,
      itemCategory,
      availableQuantity,
    } = productSelected;
    dispatch({
      type: "SET_CONFIRMED_PRODUCT",
      payload: {
        name,
        itemId,
        desc,
        price,
        imageUrl,
        orderQuantity,
        itemCategory,
        availableQuantity,
      },
    });
    navigate(`/products/${productSelected.itemId}/confirm-order`);
  };

  return (
    <div>
      <div style={{ textAlign: "center", margin: "15px" }}>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value="left" aria-label="left aligned">
            All
          </ToggleButton>
          {productCategories &&
            productCategories.map((item) => (
              <ToggleButton value={item} aria-label={item}>
                {item}
              </ToggleButton>
            ))}
          {/* <ToggleButton value="left" aria-label="left aligned">
            All
          </ToggleButton>
          <ToggleButton value="center" aria-label="centered">
            Apparel
          </ToggleButton>
          <ToggleButton value="aligned" aria-label="justified aligned">
            Electronics
          </ToggleButton>
          <ToggleButton value="right" aria-label="right aligned">
            Footwear
          </ToggleButton>
          <ToggleButton value="justify" aria-label="justified">
            Personal Care
          </ToggleButton> */}
        </ToggleButtonGroup>
      </div>

      <div className="selected-product-details-div">
        <div className="product-detail-left">
          <img
            className="product-image"
            src={productSelected.imageUrl}
            alt="product-image"
          />
        </div>
        <div className="product-detail-right">
          <div
            className="product-title"
            style={{ display: "flex", alignItems: "center" }}
          >
            <label>{productSelected.name}</label>
            <Chip
              label={"Available quantity: " + productSelected.availableQuantity}
              color="primary"
              sx={{
                marginTop: "7px",
                marginLeft: "20px",
                background: "var(--primary)",
              }}
            />
          </div>
          <p>
            Category:{" "}
            <span style={{ fontWeight: 550 }}>
              {productSelected.itemCategory}
            </span>
          </p>
          <p>{productSelected.desc}</p>
          <p style={{ color: "red", fontSize: "22px" }}>
            ₹{productSelected.price}
          </p>

          <TextField
            id="outlined-basic"
            label="Enter quantity*"
            variant="outlined"
            name="orderQuantity"
            value={orderQuantity}
            onChange={(e) => handleChangeQuantity(e)}
          />

          <p>
            <Button
              variant="contained"
              sx={{ background: "var(--primary)" }}
              onClick={(e) => handlePlaceOrder(e)}
            >
              Place Order
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
