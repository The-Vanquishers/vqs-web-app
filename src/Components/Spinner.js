import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
function Spinner(props) {
    return (
        <div className="spinner-container">
            <CircularProgress
                size={58}
                sx={{ color: "#D82148" }}
                variant='indeterminate' />
        </div>
    );
}

export default Spinner;