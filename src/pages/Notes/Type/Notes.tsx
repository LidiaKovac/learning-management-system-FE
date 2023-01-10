import "./Notes.scss"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import MDEditor from "@uiw/react-md-editor"
import moment from "moment"
//import Spinner from "../../../components/Loader/Loader"

import { useDispatch, useSelector } from "react-redux"

import Guide from "../Guide/Guide"
//import { upload_file } from "../../../api calls/file_api"

const Notes: React.FC = () => {
	//STATE
	const [value, setValue] = useState<string | undefined>(
		"Type here your notes."
	)
	const [saved, setSaved] = useState<Date | null>(null)
	const [name, setName] = useState<string>("")
	const [created, setCreated] = useState<boolean>(false)
	const [editId, setEditId] = useState<number>()

	//HOOKS
	const dispatch = useDispatch()
	const history = useHistory()
	const state = useSelector((state: rootInitialState) => state)
	const selected = useSelector((state:rootInitialState)=> state.file.selected)
	const logged = useSelector((state: rootInitialState) => state.user.logged_user)
	const loading = useSelector((state:rootInitialState) => state.user.loading)
	//const files = useSelector((state:rootInitialState) => state.file.your_files)
	const error = useSelector((state: rootInitialState) => state.user.error)
	const file_created = useSelector((state:rootInitialState)=> state.file.file_id)

	//USE EFFECT
	//useEffect(() => {
	//		setInterval(() => {
	//			localStorage.setItem("draft", value!)
	//			localStorage.setItem("title", name)
	//			if (error === "jwt expired") {
	//				history.push("/")
	//			}
	//		}, 10000)
	//	}, [])
	// useEffect(()=> {
	// 	dispatch(retrieve_logged_action())
	// 	if (!logged?.name) {
	// 		history.push("/")
	// 	}
	// 	dispatch(get_your_files_action())
	// 	if (loading) {
	// 		dispatch({type: LOADING_FALSE})
	// 	}
	// }, [])
	// useEffect(()=> {
	// 	if (error === "jwt expired") {
	// 		history.push("/")
	// 	}
	// }, [error])

	
	// const upload_file_handler = async (files: FileList): Promise<void> => {
	// 	let fd = new FormData()
	// 	fd.append("material", files[0])
	// 	fd.append("type", "image")
	// 	fd.append("name", name)
	// 	dispatch({ type: LOADING_TRUE })
	// 	const new_file = await upload_file("image", fd)
	// 	if (new_file) {
	// 		dispatch({ type: LOADING_FALSE })
	// 	}
	// 	dispatch(get_your_files_action())
	// }
	const initialize_note = async () => {
		if (!created) {
			if (name?.length! > 3) {
				// dispatch(
				// 	upload_markdown_action({
				// 		type: "markdown",
				// 		material: value,
				// 		name: name,
				// 	})
				// 	)
					setSaved(new Date())
					setCreated(true)
					setEditId(file_created!)
					console.log(editId)
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
						// onClick={() =>
						// 	{console.log(file_created)
						// 		dispatch(
						// 		auto_save_note(
						// 			{ description: value, name: name, type: "markdown" },
						// 			file_created!
						// 		)
						// 	)}
						// }
					>
						SAVE
					</button>
				</span>
				<MDEditor
					value={value ?? "Type here"}
					onChange={(content: string | undefined) => setValue(content)}
					//onFocus={() => setValue("")}
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
					{/* <div className="type__uploader">
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
					</div> */}
				</div>
			</div>
		</div>
	)
}

export default Notes
