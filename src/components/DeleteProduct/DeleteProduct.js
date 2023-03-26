import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { useSelector } from "react-redux";

export default function DeleteProduct({ open, close }) {
  const { productForEditing } = useSelector((state) => state.common);
  //const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };
  const handleDeleteOperation = async (e) => {
    e.preventDefault();
    const itemId = productForEditing;
    const response = await axios.post(
      "http://localhost:8080/products/delete-product",
      itemId
    );
    if (!response.error) {
      close();
      alert("Product deleted successfully!");
    } else {
      alert("Product deletion failed!");
    }
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={close}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Confirm deletion of product!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => handleDeleteOperation(e)}
          >
            Ok
          </Button>
          <Button variant="outlined" color="primary" onClick={close}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
