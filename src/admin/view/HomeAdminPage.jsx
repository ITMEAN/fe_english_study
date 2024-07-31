import getUser from "../../helper/User";
import LayoutAdmin from "../LayoutAdmin";

export default function HomeAdminPage() {
    const user = getUser();
    return (
        <LayoutAdmin>
            <div className="home" style={{backgroundColor:'red'}}>
                <h1>Welcome {user.name}</h1>
            </div>
        </LayoutAdmin>
    )
}