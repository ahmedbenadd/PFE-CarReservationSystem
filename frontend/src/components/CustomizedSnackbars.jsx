import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function CustomizedSnackbars({ open, onClose, severity, message }) {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
            <Alert
                onClose={onClose}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}