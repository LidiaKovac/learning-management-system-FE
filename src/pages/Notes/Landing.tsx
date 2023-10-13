import { Link, useNavigate } from "react-router-dom";
// import { Menu } from "../../components/Sidebar/Menu";
import Notes from "../../assets/notes.png";
import Camera from "../../assets/camera.png";
import Audio from "../../assets/music.png"
import Video from "../../assets/video.png"
import "./Landing.scss";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import { HiPlusCircle, HiUpload } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";
import MDEditor from "@uiw/react-md-editor";

const LNotes: React.FC = () => {
  //HOOKS
  const dispatch = useDispatch();
  const history = useNavigate();

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
    // dispatch(get_your_files_action());
    if (selected_file.file_id) setSelected(selected_file);
  }, []);
  useEffect(() => {
    
    if (error === "jwt expired") history("/");
  }, [error]);

  return (
    <div className="landing__wrap">
      <div className="dashboard__menu">
        {/* <Menu /> */}
      </div>
      <div className="landing__main">
        {/* col 1 -> notes list 
            col 2 high -> other (filter from dropdown)
            col 2 low ->  create / upload buttons */}
        <div className="landing__notes">
          <span className="header-wrap">
            <img src={Notes} className="header-icon" alt="notes" />
            <span className="header">Your notes: </span>
            <Link to="/notes/type">
              <HiPlusCircle />
            </Link>
            <Link to="/notes/new">
              <HiUpload />
            </Link>
          </span>
          <div className="landing__list">
            {files
              ? files?.map((f) => (
                  <div onClick={() => setSelected(f)}>
                    <img
                      src={f.type === "image" ? Camera : (f.type === "markdown" || f.type === "pdf")  ? Notes : f.type === "audio" ? Audio : Video }
                      className="header-icon--small"
                      alt="picture_note"
                    />
                    {f.name || "Untitled note"}
                  </div>
                ))
              : "There are no files here"}
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
              <div style={{ width: "100%",
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "row", }}>
                <button
                  // onClick={() =>
                  //   dispatch(auto_save_note(selected, selected.file_id!))
                  // }
                >
                  Save
                </button>
                <button
                  style={{
                    background: "red",
                    width: "40px",
                    color: "white",
                    padding: 0,
                    marginLeft: "20px"
                  }}
                  // onClick={() =>{
                  //   dispatch(delete_file_action(selected.file_id!))
                  //   setSelected(undefined)
                  // }
                  // }
                >
                  <AiFillDelete
                    style={{
                      width: "25px",
                      height: "25px"
                    }}
                  />
                </button>
              </div>
            </>
          ) : selected?.type === "image" ?
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
                    // onClick={() =>
                    //   dispatch(auto_save_note(selected!, selected!.file_id!))
                    // }
                  >
                    Save
                  </button>
                  <button
                  style={{
                    background: "red",
                    width: "40px",
                    color: "white",
                    padding: 0,
                    marginLeft: "20px"
                  }}
                  // onClick={() =>{
                  //   dispatch(delete_file_action(selected.file_id!))
                  //   setSelected(undefined)
                  // }
                  // }
                >
                  <AiFillDelete
                    style={{
                      width: "25px",
                      height: "25px"
                    }}
                  />
                </button>
                </span>
                <img
                  src={selected?.description}
                  className="landing__thumb"
                  alt="thumbnail"
                />
              </> : (selected?.type === "video" || selected?.type ==="audio" || selected?.type === "pdf") && <iframe src={selected.description} className="thumbnail--landing" title={selected.type}></iframe>}
        </div>
        {/* <Link to="/notes/new">Upload notes</Link>
        <Link to="/notes/type">Type notes</Link> */}
      </div>
    </div>
  );
};

export default LNotes;
