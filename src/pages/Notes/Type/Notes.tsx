import "./Notes.scss"
import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import MDEditor from "@uiw/react-md-editor"
import moment from "moment"
import { rootInitialState } from "../../../interfaces/interfaces"
import { useDispatch, useSelector } from "react-redux"
import {
	auto_save_note,
	upload_markdown_action,
} from "../../../actions/file_actions"

const Notes: React.FC = () => {
	//STATE
	const [value, setValue] = useState<string | undefined>(
		"Type here your notes."
	)
	const [saved, setSaved] = useState<Date | null>(null)
	const [name, setName] = useState<string>("")
	const [created, setCreated] = useState<boolean>(false)
	const [fileId, setId] = useState<number>()

	//HOOKS
	const dispatch = useDispatch()
	const history = useHistory()
	const state = useSelector((state: rootInitialState) => state)
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
	//FUNCTIONS
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
		}}
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
				<button onClick={()=> dispatch(auto_save_note({material: value, name: name, type: "markdown"}, state.file.file_id!))}>SAVE</button>
				</span>
				<MDEditor
					value={value ?? "Type here"}
					onChange={(content: string | undefined) => setValue(content)}
					className="type__editor"
				/>
				<small>
					{" "}
					Last saved:{" "}
					{saved
						? moment(saved).format("ddd, DD/MM/YY, HH:mm")
						: "Not saved yet."}
				</small>
				<div className="type__instructions">
					<h2>
						<Link to="/notes/new">Looking to upload a file?</Link>
					</h2>
					<h2>How to use this editor:</h2>
					<p>
						<strong>Bold: </strong> **text**
					</p>
					<p>
						<strong>Cursive: </strong> *text*
					</p>
					<p>
						<strong>Underline: </strong> {`<u>text</u>`}
					</p>
					<p>
						<strong>Image from link: </strong> ![alternative text](your link)
						<br />
						<strong style={{ color: "red" }}>
							Copy pasting an image won't work.
						</strong>
					</p>
					<p>
						<strong>Unordered ist</strong> - List item
					</p>
					<p>
						<strong>Numbered list</strong> 1. List item
					</p>
					<p>
						<strong>To do list</strong> - [] Task
					</p>
					<p>
						<strong>Titles: </strong> Add as many # as the importance lowers:
						<br />
						<span>
							<strong>Example:</strong>{" "}
							<strong style={{ color: "red" }}>
								The max number of # is 6.
							</strong>
						</span>
						<MDEditor.Markdown
							source="
                            # #Title
                            ## ##Title
                            ### ###Title 
                            "
						/>
					</p>
				</div>
			</div>
		</div>
	)
}

export default Notes
