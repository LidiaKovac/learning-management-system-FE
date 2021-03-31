import { Link, useHistory } from "react-router-dom";
import { Menu } from "../../components/Menu/Menu";
import Notes from "../../assets/notes.png";
import Camera from "../../assets/camera.png";
import "./Landing.scss";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  auto_save_note,
  get_your_files_action,
} from "../../actions/file_actions";
import { rootInitialState } from "../../interfaces/interfaces";
import { FileObject } from "../../interfaces/FileTypes";
import { HiPlusCircle, HiUpload } from "react-icons/hi";

const LNotes: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const files = useSelector((state: rootInitialState) => state.file.your_files);
  const error = useSelector((state: rootInitialState) => state.user.error);
  const [selected, setSelected] = useState<FileObject>();
  useEffect(() => {
    dispatch(get_your_files_action());
  }, []);
  useEffect(() => {
    console.log("there is an error", error);
    if (error === "jwt expired") history.push("/");
  }, [error]);
  return (
    <div className="landing__wrap">
      <div className="dashboard__menu">
        <Menu />
      </div>
      <div className="landing__main">
        {/* col 1 -> notes list 
            col 2 high -> other (filter from dropdown)
            col 2 low ->  create / upload buttons */}
        <div className="landing__notes">
          <span className="header-wrap">
            <img src={Notes} className="header-icon" />
            <span className="header">Your notes: </span>
            <Link to='/notes/type'>
              <HiPlusCircle />
            </Link>
            <Link to='/notes/new'>
              <HiUpload />
            </Link>
          </span>
          <div className="landing__list">
            {files?.map((f) => (
              <div onClick={() => setSelected(f)}>
                <img
                  src={f.type === "image" ? Camera : Notes}
                  className="header-icon--small"
                />
                {f.name || "Untitled note"}
              </div>
            ))}
          </div>
        </div>
        <div className="landing__edit">
          {selected?.type === "markdown" ? (
            <>
              <textarea
                className="landing__edit-note"
                id="edit-note"
                value={selected?.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setSelected({
                    ...selected,
                    description: e.currentTarget.value,
                  })
                }
              ></textarea>
              <button
                onClick={() =>
                  dispatch(auto_save_note(selected, selected.file_id!))
                }
              >
                Save
              </button>
            </>
          ) : selected?.type === 'image' &&(
            <>
              <span className="landing__input">
                <input
                  type="name"
                  value={selected?.name}
                  placeholder="Name of the file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSelected({
                      ...selected,
                      name: e.currentTarget.value,
                    })
                  }
                />
                <button
                  onClick={() =>
                    dispatch(auto_save_note(selected!, selected!.file_id!))
                  }
                >
                  Save
                </button>
              </span>
              <img src={selected?.description} className="landing__thumb" />
            </>
          )}
        </div>
        {/* <Link to="/notes/new">Upload notes</Link>
        <Link to="/notes/type">Type notes</Link> */}
      </div>
    </div>
  );
};

export default LNotes;
