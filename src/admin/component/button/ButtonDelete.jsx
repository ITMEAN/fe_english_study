import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function ButtonDelete(props) {
    return (
        <Button variant="contained" color="error" onClick={props.onClick} startIcon={<Delete/>}>
            {props.children}
        </Button>
    );
}