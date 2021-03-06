import React, { useState } from 'react';
import { loadCSS } from 'fg-loadcss';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Medication from '../patient_components/medication_list_components/Medication';
import IconButton from '@material-ui/core/IconButton';

export default function ViewMedicationsDialog(props) {
    const [open, setOpen] = useState(false);

    React.useEffect(() => {
        loadCSS(
            'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
            document.querySelector('#font-awesome-css')
        );
    }, []);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function renderMedication() {
        if (props.prescriptions && props.prescriptions.length > 0) {
            return props.prescriptions.map(px => (
                <Medication key={px._id} ContainerProps={px} hideActions={true} />
            ));
        }
        return <div> Oops, no prescriptions available! </div>;
    }

    return (
        <React.Fragment>
            <IconButton
                className={clsx('fas fa-file-medical')}
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="add-dialog-title"
                maxWidth="md"
            >
                <DialogTitle id="edit-dialog-title">Prescriptions</DialogTitle>
                <DialogContent>{renderMedication()}</DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
