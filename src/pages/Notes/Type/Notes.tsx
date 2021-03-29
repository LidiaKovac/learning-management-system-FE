import "./Notes.scss"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import MDEditor from "@uiw/react-md-editor"
import moment from "moment"
import Spinner from "../../../components/Loader/Loader"

import { rootInitialState } from "../../../interfaces/interfaces"
import { useDispatch, useSelector } from "react-redux"
import {
	auto_save_note,
	get_your_files_action,
	upload_markdown_action,
} from "../../../actions/file_actions"
import Guide from "../Guide/Guide"
import { LOADING_FALSE, LOADING_TRUE } from "../../../actions/action_types"
import { upload_file } from "../../../api calls/file_api"
import { retrieve_logged_action } from "../../../actions/login_actions"

const Notes: React.FC = () => {
	//STATE
	const [value, setValue] = useState<string | undefined>(
		"Type here your notes."
	)
	const [saved, setSaved] = useState<Date | null>(null)
	const [name, setName] = useState<string>("")
	const [created, setCreated] = useState<boolean>(false)

	//HOOKS
	const dispatch = useDispatch()
	const history = useHistory()
	const state = useSelector((state: rootInitialState) => state)
	const logged = useSelector((state: rootInitialState) => state.user.logged_user)
	const loading = useSelector((state:rootInitialState) => state.user.loading)
	const files = useSelector((state:rootInitialState) => state.file.your_files)
	const error = useSelector((state: rootInitialState) => state.user.error)

	//USE EFFECT
	//useEffect(() => {
	//		setInterval(() => {
	//			console.log("10 secs")
	//			console.log(state.file.file_id)
	//			localStorage.setItem("draft", value!)
	//			localStorage.setItem("title", name)
	//			if (error === "jwt expired") {
	//				history.push("/")
	//			}
	//		}, 10000)
	//	}, [])
	useEffect(()=> {
		retrieve_login()
		dispatch(get_your_files_action())
		if (loading) {
			dispatch({type: LOADING_FALSE})
		}
	}, [])
	useEffect(()=> {
		if (error === "jwt expired") {
			history.push("/")
		}
	}, [error])

	//FUNCTIONS
	const retrieve_login = async() => {
		if (!logged) {
			const login = await dispatch(retrieve_logged_action())
			if (!login) {
				history.push("/")
			}
		}
	}

	const upload_file_handler = async (files: FileList): Promise<void> => {
		let fd = new FormData()
		fd.append("material", files[0])
		fd.append("type", "image")
		fd.append("name", name)
		dispatch({ type: LOADING_TRUE })
		const new_file = await upload_file("image", fd)
		if (new_file) {
			dispatch({ type: LOADING_FALSE })
		}
		dispatch(get_your_files_action())
	}
	const initialize_note = async () => {
		if (!created) {
			if (name?.length! > 3) {
				dispatch(
					upload_markdown_action({
						type: "markdown",
						material: value,
						name: name,
					})
				)
				setSaved(new Date())
				setCreated(true)
			}
		}
	}

	return (
		<div className="type__wrap-page">
			<div className="type__inner">
				<span>
					<input
						type="text"
						style={{ alignSelf: "center" }}
						placeholder="Title of your notes"
						onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
							setName(e.currentTarget.value)
						}
						onBlur={() => initialize_note()}
					/>
					<button
						onClick={() =>
							dispatch(
								auto_save_note(
									{ material: value, name: name, type: "markdown" },
									state.file.file_id!
								)
							)
						}
					>
						SAVE
					</button>
				</span>
				<MDEditor
					value={value ?? "Type here"}
					onChange={(content: string | undefined) => setValue(content)}
					onFocus={() => setValue("")}
					className="type__editor"
				/>
				<small>
					{" "}
					Last saved:{" "}
					{saved
						? moment(saved).format("ddd, DD/MM/YY, HH:mm")
						: "Not saved yet."}
				</small>
				<div className="type__guide">
					<div className="type__instructions">
						<Guide/>
					</div>
					<div className="type__uploader">
						<h2>Your images: </h2>
						{!loading 
						? <><input type="file" accept=".jpg, .png, .gif, .jpeg" id="img-notes" 
									onChange={(e:React.ChangeEvent<HTMLInputElement>)=> upload_file_handler(e.currentTarget.files!)}/> 
							<label htmlFor="img-notes"><p>+ ADD AN IMAGE</p></label>
						</>
						: <Spinner/>
						}
						<div className="type__divider"></div>
						{files?.filter((file)=>file.type === "image").slice(0,4).map((file)=> 
							<>
							<span className="type__files">
							<img className="type__thumb" src={`https://${file.description}`} alt="thumb"/> <span>https://{file.description}</span>
							</span>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Notes
