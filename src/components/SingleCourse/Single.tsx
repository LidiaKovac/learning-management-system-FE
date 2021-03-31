import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enroll_action, get_enrolled_action } from "../../actions/class_actions";
import { enroll } from "../../api calls/class_api";
import { SingleProps } from "../../interfaces/ClassInterfaces";
import { rootInitialState } from "../../interfaces/interfaces";
import Spinner from "../Loader/Loader";
import "./Single.scss";

export const Single: React.FC<SingleProps> = ({ c }) => {
    const dispatch = useDispatch()
  const enrolled = useSelector(
    (state: rootInitialState) => state.classes.your_classes
  );
  const loading = useSelector((state:rootInitialState)=> state.user.loading)
  const [is_enrolled, setEnrolled] = useState<boolean>()
  useEffect(()=> {
      setEnrolled(check_if_enrolled())
  }, [])
  useEffect(()=> {
    setEnrolled(check_if_enrolled())
}, [enrolled])
  const check_if_enrolled = () => {
      const ids = enrolled.map((en)=> en.class_id)
      return ids.includes(c.class_id)
  };
  return (
    <div className="classes__single bg">
      <div className="class__header">{c.name}</div>
      <div className="class__content">{c.description}</div>
      <div className="class__author">Teacher: {c.author_data}</div>
      {!is_enrolled && <button className="enroll" onClick={() => {
          dispatch(enroll_action(c.class_id!))
          }}>
        {!loading ? "Enroll" : "Wait"}
      </button>}
    </div>
  );
};
