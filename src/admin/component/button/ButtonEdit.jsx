import { Edit } from "@mui/icons-material";
import { Button } from "@mui/material";


export default function ButtonEdit(props) {
    return (
        <Button variant="contained" style={{backgroundColor:'green'}} onClick={props.onClick} startIcon={<Edit/>}>
            {props.children}
        </Button>
    );
}