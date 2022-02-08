import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function DownloadDialog(props) {
  return (
    <Dialog
      open={props.open}
      onClose={() => props.handleDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {'Download attendance data ?'}
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do you want to download attendance data?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => props.handleDialog(false)}>Cancel</Button>
        <Button onClick={() => props.handleDownload()} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DownloadDialog;
