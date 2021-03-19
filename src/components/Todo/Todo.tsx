import "./Todo.scss"

const Todo:React.FC = () => {
    //this will be hardcoded until I implement the backend
    return (
        <div className="todo__wrap">
            <div className="todo__single">
                <input type="checkbox" id="1"/> <label htmlFor="1"> To do 1 </label>
            </div>
            <div className="todo__single">
                <input type="checkbox" id="2"/> <label htmlFor="2"> To do 2 </label>
            </div>
            <div className="todo__single">
                <input type="checkbox" id="3"/> <label htmlFor="3"> To do 3 </label>
            </div>
            <input type="text" style={{width: "150px"}}/>
        </div>
    )
}

export default Todo