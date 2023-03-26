import React, { useState, useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ProductCard from "../ProductCard/ProductCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import "./Home.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Home() {
  const { searchText } = useSelector((state) => state.common);
  const [filteredProducts, setFilteredProducts] = useState();
  useEffect(() => {
    async function getProducts() {
      const response = await axios.get(
        "http://localhost:8080/api/products"
      );
      // if (!response.error && !searchText) {
      //   setProductList(response.data.data);
      //   setFilteredProducts(response.data.data);
      // } else if (!response.error && searchText) {
      //   setFilteredProducts(
      //     response.data.data.filter((product) => {
      //       return product.itemName
      //         .toLowerCase()
      //         .includes(searchText.toLowerCase());
      //     })
      //   );
      // }
      if (!response.error) {
        // if (searchText == "") {
        //   setProductList(response.data.data);
        //   setFilteredProducts(response.data.data);
        // } else {
        //   setFilteredProducts(
        //     response.data.data.filter((product) => {
        //       return product.itemName.toLowerCase().includes(searchText);
        //     })
        //   );
        // }
        setProductList(response.data.data);
      }
    }
    getProducts();
  }, [searchText, 1000]);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const checkUserLogin = () => {
  //     if (!userDetails.email) {
  //       navigate("/login");
  //     }
  //   };
  //   checkUserLogin();
  // }, []);
  const [productList, setProductList] = React.useState();

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

  const [alignment, setAlignment] = React.useState("all");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    if (newAlignment == "all") {
      setFilteredProducts(productList);
    } else {
      setFilteredProducts(
        productList &&
          productList.filter((product) => {
            return product.itemCategory.includes(newAlignment);
          })
      );
      setProductList(
        productList &&
          productList.filter((product) => {
            return product.itemCategory.includes(newAlignment);
          })
      );
    }
  };

  const theme = useTheme();

  const [age, setAge] = React.useState("def");

  const handleChange = (event) => {
    setAge(event.target.value);
    console.log("Changing filter => ", event.target.value);
    if (event.target.value == 10) {
      setFilteredProducts(
        productList &&
          productList.sort((a, b) => {
            return b.itemPrice - a.itemPrice;
          })
      );
    } else if (event.target.value == 20) {
      const sortByLowToHigh =
        productList &&
        productList.sort((a, b) => {
          return a.itemPrice - b.itemPrice;
        });
      setFilteredProducts(sortByLowToHigh);
    } else if (event.target.value == 30) {
      setFilteredProducts(
        productList &&
          productList.sort((a, b) => {
            return a.createdAt - b.createdAt;
          })
      );
    }
  };

  const dummyItems = [
    {
      itemId: "1",
      itemName: "Shoes",
      itemPrice: "1000",
      itemDesc:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
      itemImage:
        "https://cdn.thewirecutter.com/wp-content/media/2021/02/whitesneakers-2048px-4180.jpg?auto=webp&quality=75&width=1024",
    },
    {
      itemId: "2",
      itemName: "EMERGO Runner running shoes",
      itemPrice: "1679",
      itemDesc:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
      itemImage:
        "https://www.rei.com/dam/content_team_010818_52427_htc_running_shoes_hero2_lg.jpg",
    },
    {
      itemId: "3",
      itemName: "boAt Airdopes 131",
      itemPrice: "1299",
      itemDesc:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
      itemImage:
        "https://5.imimg.com/data5/SELLER/Default/2022/8/WY/XV/CH/4390697/picsart-06-25-12-37-21-500x500.jpg",
    },
    {
      itemId: "4",
      itemName: "Jeans",
      itemPrice: "1300",
      itemDesc:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
      itemImage:
        "https://navbharattimes.indiatimes.com/photo/msid-89982887,imgsize-60574/pic.jpg",
    },
    {
      itemId: "5",
      itemName: "T - Shirt",
      itemPrice: "2000",
      itemDesc:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
      itemImage:
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/444527/item/goods_15_444527.jpg?width=1008&impolicy=quality_75",
    },
    {
      itemId: "6",
      itemName: "iPhone 14 Pro",
      itemPrice: "120000",
      itemDesc:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
      itemImage:
        "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-deeppurple?wid=2560&hei=1440&fmt=jpeg&qlt=95&.v=1663703840578",
    },
  ];

  const filteredTestProducts =
    productList &&
    productList.filter((product) => {
      return product.itemName.toLowerCase().includes(searchText);
    });

  const filterByCategory =
    productList &&
    productList.filter((product) => {
      return product.itemCategory.toLowerCase().includes(alignment);
    });

  return (
    <div>
      <div style={{ textAlign: "center", margin: "15px" }}>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value="all" aria-label="left aligned">
            All
          </ToggleButton>
          {productCategories &&
            productCategories.map((item) => (
              <ToggleButton value={item} aria-label={item}>
                {item}
              </ToggleButton>
            ))}
        </ToggleButtonGroup>
      </div>
      <div
        style={{ marginLeft: "50px", display: "flex", flexDirection: "column" }}
      >
        <label>Sort By:</label>
        <FormControl sx={{ width: 200 }}>
          <Select
            value={age}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            {/* <MenuItem value="">
              <em>None</em>
            </MenuItem> */}
            <MenuItem value="def">Default</MenuItem>
            <MenuItem value={10}>Price: High to Low</MenuItem>
            <MenuItem value={20}>Price: Low to High</MenuItem>
            <MenuItem value={30}>Newest</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="product-card-div">
        <div className="productcard-div">
          {productList &&
            productList.map((data) => (
              <ProductCard
                name={data.itemName}
                price={data.itemPrice}
                desc={data.itemDesc}
                imageUrl={data.itemImageUrl}
                itemId={data.itemId}
                itemCategory={data.itemCategory}
                availableQuantity={data.availableQuantity}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
