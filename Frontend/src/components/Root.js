import Header from "./header/Header";
import Footer from "./footer/Footer"
import {Outlet} from "react-router-dom"
const Root = () => {
    return ( 
        <div>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
     );
}
export default Root;