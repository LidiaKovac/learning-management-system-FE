import { Link } from "react-router-dom"


const L_Notes:React.FC = () => {
    return (<div className="">
        <Link to="/notes/new">Upload notes</Link>
        <Link to="/notes/type">Type notes</Link>
    </div>)
}

export default L_Notes