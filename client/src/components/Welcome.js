import {Link} from "react-router-dom"
const Welcome = (props) => {
    return(
        <div>
            This is the welcome page<br></br>
            <Link to="/login">Login</Link><br></br>
            <Link to="/register">Register</Link>
        </div>
    )
}

export default Welcome