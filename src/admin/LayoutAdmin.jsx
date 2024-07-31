import '../App.css'
import Sidebar from './component/slidebar/slidebar'
export default function LayoutAdmin(props){
    return (
        <div className="app">
            <div style={{flexDirection:'row',display:'flex',height:'100vh'}}>
                <Sidebar/>
                <div style={{flex:1,maxHeight:'100vh',overflowY:'auto',backgroundColor:'#f0f0f0'}}>
                    {props.children}
                </div>
            </div>
        </div>
    )
    
}