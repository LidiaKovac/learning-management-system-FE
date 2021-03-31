import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { get_homework_action } from "../../actions/events_actions"
import { rootInitialState } from "../../interfaces/interfaces"
import "./Homework.scss"

const Homework:React.FC = () => {
    //HOOKS 
    const dispatch = useDispatch()

    //USE SELECTOR
    const role = useSelector((state:rootInitialState)=> state.user.logged_user?.role)
    const hw = useSelector((state:rootInitialState)=> state.events.homework)
    const events = useSelector((state:rootInitialState)=> state.events.your_events)

    //USE EFFECT 
    useEffect(()=> {
        dispatch(get_homework_action())
    }, [])
    return (
        <div className="homework__wrap">
            {role ==="student" 
                ? hw?.map((homework, index)=> <div className="homework__single">
                <input type="checkbox" id={index.toString()}/> <label htmlFor={index.toString()}> {homework.description} </label>
            </div>) 
                : events?.filter((ev)=> ev.type !== "homework").map((homework, index)=> <div className="homework__single" key={index}>
                <input type="checkbox" id={index.toString()}/> <label htmlFor={index.toString()}> {homework.description} </label>
            </div>)}
        </div>
    )
}

export default Homework