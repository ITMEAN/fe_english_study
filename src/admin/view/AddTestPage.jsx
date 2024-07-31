import { Link, useNavigate } from "react-router-dom";
import LayoutAdmin from "../LayoutAdmin";
import { Spinner } from "react-bootstrap";
import { AccessAlarm,  ArrowForwardIosSharp, AudiotrackOutlined, Description, DriveFileRenameOutline, Label} from "@mui/icons-material";
import { Box, Button, Input, InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { addTest } from "../../api/service/TestService";

export default function AddTestPage() {
    const [errorTime, setErrorTime] = useState("");
    const [errorName, setErrorName] = useState("");
    const [errorDescription, setErrorDescription] = useState("");
    const [errorType, setErrorType] = useState("");
    const [errorFile, setErrorFile] = useState("");
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [time,setTime] = useState("");
    const [type,setType] = useState("");
    const [file,setFile] = useState("");
    const [loading,setLoading] = useState(false);

    const navigate = useNavigate();
    const handleSetName = (name) => {
        if(name.length === 0){
            setErrorName("Tên không được để trống");
        }else{
            setErrorName("");
            setName(name);
        }
    }
    const handleSetDescription = (description) => {
        if(description.length === 0){
            setErrorDescription("Mô tả không được để trống");
        }else{
            setErrorDescription("");
            setDescription(description);
        }
    }
    const handleSetTime = (time) => {
        if(time.length === 0){
            setErrorTime("Thời gian không được để trống");
        }else{
            setErrorTime("");
            setTime(time);
        }
    }
    const handleSetType = (type) => {
        alert(type);
        if(type.length === 0){
            setErrorType("Loại không được để trống");
        }else{
            setErrorType("");
            setType(type);
        }
    }
    const handleSetFile = (file) => {
        if(file.length === 0){
            setErrorFile("File không được để trống");
        }else{
            setErrorFile("");
            setFile(file);
        }
    }
    const handleCreateTest =async () => {
      
        console.log(type);
        if(name.length === 0){
            setErrorName("Tên không được để trống");
        }else if(description.length === 0){
            setErrorDescription("Mô tả không được để trống");
        }else if(time.length === 0){
            setErrorTime("Thời gian không được để trống");
        }else if(type.length === 0){
            setErrorType("Loại không được để trống");
        }else if(file.length === 0){
            setErrorFile("File không được để trống");
        }else{
            try{
                setLoading(true);
                const response = await addTest(name,description,time,type,file);
                setLoading(false);
                navigate("/admin/test/add-part/"+response.id);
            }catch(error){
                setLoading(false);
                
                console.log(error);
            }
        }
        
    }



    return (
        <LayoutAdmin>
            <div style={{display:'flex',width:'100%',padding:10,flexDirection:'column'}}>
                <div style={{flex:1,flexDirection:"row"}}>
                    <Link>Thông tin test</Link> <ArrowForwardIosSharp/>
                </div>
                <h3>Nhập thông tin</h3>
                <div style={{border : '1px solid #ccc',padding:10,width:'100%',display:'flex',flexDirection:'column'}}>
                    <Box style={{flex:1,flexDirection:'row',gap:10}}>
                        <Box sx={{ display: "flex", alignItems: "flex-end" }} marginBottom={2}>
                                <DriveFileRenameOutline sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                                <TextField
                                    variant="standard"
                                    fullWidth
                                    id="outlined-adornment-password"
                                    type="text"
                                    endAdornment={<InputAdornment position="end"></InputAdornment>}
                                    label="Tên"
                                    onChange={(e) => handleSetName(e.target.value)}
                                    error={errorName !== ""}
                                    helperText={errorName}
                                  
                         />
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "flex-end" }} marginBottom={2}>
                                <Description sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                                <TextField
                                    variant="standard"
                                    fullWidth
                                    id="outlined-adornment-password"
                                    type="text"
                                    endAdornment={<InputAdornment position="end"></InputAdornment>}
                                    label="Mô tả"
                                    onChange={(e) => handleSetDescription(e.target.value)}
                                    error={errorDescription !== ""}
                                    helperText={errorDescription}
                                  
                         />
                        </Box>

                    </Box>
                    <Box style={{display:'flex',flexDirection:'row',gap:10}}>
                        <Box sx={{ display: "flex", alignItems: "flex-end" }} marginBottom={2}>
                                <AccessAlarm sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                                <TextField
                                    variant="standard"
                                    fullWidth
                                    id="outlined-adornment-password"
                                    type="number"
                                    endAdornment={<InputAdornment position="end"></InputAdornment>}
                                    label="Tên"
                                    onChange={(e) => handleSetTime(e.target.value)}
                                    error={errorTime !== ""}
                                    helperText={errorTime}
                                  
                         />
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "flex-end" }} marginBottom={2}>
                                <Label sx={{ color: "action.active", mr: 1, my: 0.5 }}>Loại</Label>
                                <Select
                                    label="loại"
                                    value={type}
                                    style={{width:'100%'}}
                                    onChange={(e) => handleSetType(e.target.value)}
                                    >
                                     <MenuItem value="TOEIC">TOEIC</MenuItem>
                                </Select>
                        </Box>

                    </Box>
                    <Box style={{display:'flex',flexDirection:'column',gap:10}}>

                        <Box sx={{ flex:1, alignItems: "flex-end" ,flexDirection:'row'}}>
                                <AudiotrackOutlined  sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                                <Input type="file" accept=".mp3,audio/*" onChange={(e) => handleSetFile(e.target.files[0])}/>
                                <div style={{width:'100%',display:'flex',marginLeft:30,color:'red'}}>{errorFile}</div>
                        </Box>
                    </Box>
                    {loading ? <Button variant="contained" style={{backgroundColor:'#37B7C3',marginTop:10}} disabled><Spinner/> Loading...</Button> : <Button variant="contained" style={{backgroundColor:'#37B7C3',marginTop:10}} onClick={handleCreateTest}>Tạo</Button>}
                </div>
            </div>
        </LayoutAdmin>
    )
}