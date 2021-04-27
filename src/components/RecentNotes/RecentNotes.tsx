import { useDispatch, useSelector } from "react-redux";
import { FileObject} from "../../interfaces/FileTypes"
import { Link } from "react-router-dom";
import { SET_SELECTED_NOTE } from "../../actions/action_types";
import { RecentProps } from "../../interfaces/FileTypes";
import "./RecentNotes.scss";
import { useEffect } from "react";
import { retrieve_logged_action } from "../../actions/login_actions";
import { rootInitialState } from "../../interfaces/interfaces";

const RecentNotes: React.FC<RecentProps> = ({ content, homework }) => {
  //HOOKS
  const dispatch = useDispatch();
  const role = useSelector((state:rootInitialState)=> state.user.logged_user?.role as string )
  useEffect(()=> {
    dispatch(retrieve_logged_action())
  }, [])

  return (
    <Link to={role === "student" ? "/notes" : "/grade"} className='recent__link'>
      <div
        className="recent__wrap"
        onClick={() => dispatch({ type: SET_SELECTED_NOTE, payload: content })}
      >
        <div className="recent__head">{ content?.name ?? "Untitled note"}</div>
        <div className="recent__desc">{content?.description || homework?.content}</div>
      </div>
    </Link>
  );
};

export default RecentNotes;
