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
import MDEditor from "@uiw/react-md-editor";

const LNotes: React.FC = () => {
  //HOOKS
  const dispatch = useDispatch();
  const history = useHistory();

  //SELECTORS
  const files = useSelector((state: rootInitialState) => state.file.your_files);
  const error = useSelector((state: rootInitialState) => state.user.error);
  const selected_file = useSelector(
    (state: rootInitialState) => state.file.selected
  );

  //USE STATE
  const [selected, setSelected] = useState<FileObject>();

  //USE EFFECT
  useEffect(() => {
    dispatch(get_your_files_action());
    if (selected_file !== {}) setSelected(selected_file);
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
            <img src={Notes} className="header-icon" alt='notes' />
            <span className="header">Your notes: </span>
            <Link to="/notes/type">
              <HiPlusCircle />
            </Link>
            <Link to="/notes/new">
              <HiUpload />
            </Link>
          </span>
          <div className="landing__list">
            {files?.map((f) => (
              <div onClick={() => setSelected(f)}>
                <img
                  src={f.type === "image" ? Camera : Notes}
                  className="header-icon--small" alt='picture_note'
                />
                {f.name || "Untitled note"}
              </div>
            ))}
          </div>
        </div>
        <div className="landing__edit">
          {selected?.type === "markdown" ? (
            <>
              <MDEditor
                value={selected?.description ?? "Type here"}
                onChange={(content: string | undefined) =>
                  setSelected({ ...selected, description: content })
                }
                //onFocus={() => setValue("")}
                className="landing__editor"
              />

              <button
                onClick={() =>
                  dispatch(auto_save_note(selected, selected.file_id!))
                }
              >
                Save
              </button>
            </>
          ) : (
            selected?.type === "image" && (
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
                <img src={selected?.description} className="landing__thumb" alt='thumbnail' />
              </>
            )
          )}
        </div>
        {/* <Link to="/notes/new">Upload notes</Link>
        <Link to="/notes/type">Type notes</Link> */}
      </div>
    </div>
  );
};

export default LNotes;
