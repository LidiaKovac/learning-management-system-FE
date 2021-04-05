import React, { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { HiPlusCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useHistory, useParams } from "react-router-dom";
import AsyncSelect from "react-select"
import { LOADING_FALSE, LOADING_TRUE } from "../../../actions/action_types";
import { select_class_action } from "../../../actions/class_actions";
import { retrieve_logged_action } from "../../../actions/login_actions";
import { create_section } from "../../../api calls/class_api";
import { upload_file } from "../../../api calls/file_api";
import { Menu } from "../../../components/Menu/Menu";
import {
  SingleClassProps,
  SectionReqBody,
  Section,
} from "../../../interfaces/ClassInterfaces";
import { rootInitialState, SelectOption } from "../../../interfaces/interfaces";
import "./Single.scss";

const SingleClassPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams<SingleClassProps>();
  const selected = useSelector(
    (state: rootInitialState) => state.classes.selected_class?.class
  );
  const sections = useSelector(
    (state: rootInitialState) => state.classes.selected_class?.sections
  );
  const author_data = useSelector(
    (state: rootInitialState) => state.classes.selected_class?.author_data
  );
  const logged = useSelector(
    (state: rootInitialState) => state.user.logged_user
  );
  useEffect(() => {
    dispatch(retrieve_logged_action());
    if (!logged?.name) history.push("/");
    dispatch(select_class_action(params.id));
    is_owner();
    console.log(section)
  }, []);
  useEffect(() => {
    is_owner();
  }, [selected]);

  const options: Array<SelectOption> = [
		{
			value: "pdf",
			label: "PDF",
		},
		{
			value: "image",
			label: "Image",
		},
		{
			value: "video",
			label: "Video",
		},
		{
			value: "audio",
			label: "Audio",
		},
    
	]

  const [create, setCreate] = useState<Boolean>(false);
  const [section, createSection] = useState<SectionReqBody>();
  const on_change_handler__type = (val: SelectOption | null) => {
		console.log(val)
		createSection({
      ...section,
      files: {
        ...section?.files,
        type: val?.value,
        name: selected.name
      }
    })
	}
  const is_owner = () => {
    if (author_data?.email === logged?.email) return true;
    else return false;
  };

  const onChangeHandler = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    createSection({
      ...section,
      section: {
        ...section?.section,
        [event.currentTarget.id]: event.currentTarget.value,
      },
    });
  };
  const create_new_section = async () => {
    dispatch({ type: LOADING_TRUE });
    console.log(section);
    const new_section = await create_section(section, parseInt(params.id));
    if (new_section.message === "Created") setCreate(false);
    dispatch(select_class_action(params.id));
  };

  const onChangeFile = async (files: FileList | undefined): Promise<void> => {
      let fd = new FormData()
      fd.append("material", files![0])
      fd.append("type", section?.files?.type!)
      fd.append("name", section?.files?.name!)
      dispatch({ type: LOADING_TRUE })
      const new_file = await upload_file(section?.files?.type!, fd)
      if (new_file) {
        dispatch({ type: LOADING_FALSE })
      }
  }
  
  return (
    <div className="classes__wrap">
      <div className="dashboard__menu">
        <Menu />
      </div>
      <div className="classes__content">
        <div className="classes__header-container">
          <div className="header class__header">{selected?.name}</div>
          <div className="classes__section-header">{selected?.description}</div>
        </div>
        {!create && is_owner() && (
          <div className="classes__add-section" onClick={() => setCreate(true)}>
            <HiPlusCircle /> <span>Add a section</span>
          </div>
        )}
        {create && (
          <div className="classes_create">
            <input
              className="section__input"
              id="name"
              placeholder="Section title"
              onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
                onChangeHandler(e)
              }
            />
            <textarea
              id="description"
              onKeyUp={(e: React.KeyboardEvent<HTMLTextAreaElement>) =>
                onChangeHandler(e)
              }
              className="section__textarea"
              placeholder="Brief description"
              rows={10}
            ></textarea>
            <span className='section__options'>
            {section?.files?.type && <> <input
              type="file" 
              id="add_to_section" 
              accept={
                section?.files?.type === "pdf" ? ".pdf" 
              : section?.files?.type === "image" ? ".jpg, .png, .jpeg, .gif" 
              : section?.files?.type === "video" ? ".mp4, .mov, .mpeg, .mkv"
              : ".mp3, .wav, .aac, .flac"}
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=> {
              onChangeFile(e.currentTarget.files!)
              } } />
            <label htmlFor="add_to_section">
              <span>Add a file</span>
              <AiOutlineCloudUpload />
            </label> </>}
            <AsyncSelect
							options={options}
							id="type"
							className="section--select"
							classNamePrefix="section--select"
							isSearchable={false}
							defaultOptions
							onChange={(val: SelectOption |  null) =>
								on_change_handler__type(val)
							}
						/>
            </span>
            <div className="section__actions">
              <button
                onClick={() => create_new_section()}
                className="section__button"
              >
                Add section
              </button>
              <button
                className="section__button"
                onClick={() => setCreate(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <ol className="sections__list">
          {sections?.map((s: Section, index: number) => (
            <li key={index}>
              <div className="section__name">{s.name}</div>
              <div className="section__content">{s.description}</div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default SingleClassPage;
