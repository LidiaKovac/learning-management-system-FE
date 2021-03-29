import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { get_homework_action } from "../../actions/events_actions"
import { rootInitialState } from "../../interfaces/interfaces"
import "./Homework.scss"

const Homework:React.FC = () => {
    const dispatch = useDispatch()
    const hw = useSelector((state:rootInitialState)=> state.events.homework)
    useEffect(()=> {
        dispatch(get_homework_action())
    }, [])
    return (
        <div className="homework__wrap">
            {hw?.map((homework, index)=> <div className="homework__single">
                <input type="checkbox" id={index.toString()}/> <label htmlFor={index.toString()}> {homework.description} </label>
            </div>)}
        </div>
    )
}

export default Homework