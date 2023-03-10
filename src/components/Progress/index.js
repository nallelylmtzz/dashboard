import { Grid, CircularProgress, Backdrop, } from '@material-ui/core'

import './style.css';

const Progress = ({
    loading,
}) => {
    if (loading) {
        return (
            <Backdrop  className="backdrop"  open={true}>
                <Grid container alignItems='center' justify='center' alignContent='center'>
                    <Grid item sm={12} md={12} lg={12} align='center'>
                        <CircularProgress color="inherit" size={60} />
                    </Grid>
                </Grid>
            </Backdrop>

        )
    }
    return <></>
}

export default Progress;