import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@material-ui/core';
import {Link} from 'react-router-dom'
import { connect } from "react-redux"; 
import orderActionType from "../../../redux/order/order.type";
import { afterOrderSuccess } from "../../../redux/order/order.action"
import { createStructuredSelector } from "reselect";


 function AlertDialog({addOrderStatusMiddleware}) {
  const  handleStatus = () =>{
    addOrderStatusMiddleware();
  };

  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
  
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
         
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <img src="https://cachbothuocla.vn/wp-content/uploads/2019/03/tick-xanh.png" width={200}></img>
            <Typography>You was ordered successfull</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Link to="/user/1" >
           <Button onClick={handleStatus} >View order </Button>
        </Link>
        
          <Button onClick={handleClose} >Back
            
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProp = createStructuredSelector({

});

const mapDispatchToProp = (dispatch) => ({
  addOrderStatusMiddleware:() => dispatch(afterOrderSuccess()),
});

export default connect(mapStateToProp, mapDispatchToProp)(AlertDialog);