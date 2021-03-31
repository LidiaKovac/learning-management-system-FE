import { useDispatch } from "react-redux"
import { SET_SELECTED_NOTE } from "../../actions/action_types"
import { RecentProps } from "../../interfaces/FileTypes"
import "./RecentNotes.scss"

const RecentNotes:React.FC<RecentProps> = ({content}) => {
    //HOOKS 
    const dispatch = useDispatch()
    
    return (
        <div className="recent__wrap" onClick={()=> dispatch({type: SET_SELECTED_NOTE, payload: content})}>
            <div className="recent__head">{content.name}</div>
            <div className="recent__desc">{content.description}</div>
        </div>
    )
}

export default RecentNotes