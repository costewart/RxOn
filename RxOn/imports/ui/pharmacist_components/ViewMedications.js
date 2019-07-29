import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Medication from "../patient_components/Medication";
import IconButton from "@material-ui/core/IconButton";
import ViewIcon from '@material-ui/icons/ViewList';

export default function ViewMedicationsDialog(props) {
    const [open, setOpen] = useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function renderMedication() {
        return props.prescriptions.map(px => <Medication key={px._id} ContainerProps={px} hideActions={true}/>);
    }

    return (
        <React.Fragment>
            <IconButton variant="outlined" color="primary" onClick={handleClickOpen}>
                <ViewIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="add-dialog-title" maxWidth="md">
                <DialogTitle id="edit-dialog-title">Prescriptions</DialogTitle>
                <DialogContent>
                    {renderMedication()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
