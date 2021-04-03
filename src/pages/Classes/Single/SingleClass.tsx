import { useEffect } from "react";
import { Menu } from "../../../components/Menu/Menu";
import "./Single.scss"

const SingleClassPage = () => {
  useEffect(()=> {
    
  }, [])
  return (
    <div className="classes__wrap">
      <div className="dashboard__menu">
        <Menu />
      </div>
      <div className="classes__content">
        <div className='header'>{}</div>
      </div>
    </div>
  );
};

export default SingleClassPage;
