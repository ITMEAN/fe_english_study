import Header from "./Components/header/Header"
import './App.css'

export default function Layout(props){
    
    return (
        <div className="app">
            <main>
                <Header/>
                <div className="content">
                    {props.children}
                 </div>
            </main>
        </div>
    )
    
}