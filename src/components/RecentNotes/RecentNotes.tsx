import { useDispatch } from "react-redux";
import { FileObject} from "../../interfaces/FileTypes"
import { Link } from "react-router-dom";
import { SET_SELECTED_NOTE } from "../../actions/action_types";
import { RecentProps } from "../../interfaces/FileTypes";
import "./RecentNotes.scss";

const RecentNotes: React.FC<RecentProps> = ({ content, homework }) => {
  //HOOKS
  const dispatch = useDispatch();

  return (
    <Link to="/notes" className='recent__link'>
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
