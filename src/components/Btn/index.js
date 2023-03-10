import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'


const BtnSuccess = withStyles((theme) => ({
    root: {
        borderRadius: 8,
        backgroundColor: '#2d5ead',
        textTransform: 'none',
        padding: '5px 10px',
        boxShadow:'inset 0 0 6px #00000012, 0 2px 6px #00000021',
        '&:hover': {
            background: '#2d5ead',
        },
        '&:disabled': {
            opacity: 0.9,
            backgroundColor:'#2d5ead' ,
            gap: "10px",
            label:{
                color: "rgba(60, 60, 67, 0.3)",
            }
        },
    },
    label:{
        fontSize:  15,
        color: '#ffffff',
    }
}))(Button);

const BtnCancel = withStyles((theme) => ({
    root: {
        borderRadius: 8,
        backgroundColor: '#0b1d4b',
        textTransform: 'none',
        padding: (props)=> props.padding || '5px 10px',
        boxShadow:'inset 0 0 6px #00000012, 0 2px 6px #00000021',
        '&:hover': {
            background: '#0b1d4b',
        },
        '&:disabled': {
            opacity: 0.9,
            backgroundColor: "#0b1d4b",
            gap: "10px",
            label:{
                color: "rgba(60, 60, 67, 0.3)",
            }
        },
    },
    label:{
        fontSize:  15,
        color: '#ffffff',
    }
}))(Button);

const Btn = (props) => {
    return (<>
        {
            props.success ?
                <BtnSuccess onClick={props.onClick} variant="contained" fullWidth={props.fullWidth} >
                    {props.label}
                </BtnSuccess>
                :
                <BtnCancel onClick={props.onClick} variant="contained" >
                    {props.label}
                </BtnCancel>
        }
    </>)

}

export default Btn