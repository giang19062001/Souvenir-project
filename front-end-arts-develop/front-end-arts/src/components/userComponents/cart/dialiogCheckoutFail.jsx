import * as React from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
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


 function AlertDialogFail({status,onClick}) {
 console.log("status",status)

  const [open, setOpen] = React.useState({status});

//   const handleClose = () => {
//     setOpen(false);
//     console.log(open)

//   };

  return (
    <div>
  
      <Dialog
        open={open}
        onClose={() => onClick(false) }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            <WarningAmberOutlinedIcon ></WarningAmberOutlinedIcon>
         <Divider sx={{marginY:1}}/>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant='h4'  align='center'>Card payment invalid</Typography>
            <Typography variant='h5' align='center'>Please enter again</Typography>
          </DialogContentText>
        </DialogContent>
        <Divider/>
        <DialogActions>
        
          <Button onClick = { () => onClick(false) }>Back
            
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialogFail