import "./Notes.scss"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import MDEditor from "@uiw/react-md-editor"

const Notes: React.FC = () => {
	const [value, setValue] = useState<string | undefined>(
		"Type here your notes."
	)
    const [saved, setSaved] = useState<Date>( new Date())
    setInterval(()=>{
            setSaved(new Date())
            console.log("Saved")
    }, 60000)
    
	return (
		<div className="type__wrap-page">
			<div className="type__inner">
				<input
					type="text"
					style={{ alignSelf: "center" }}
					placeholder="Title of your notes"
				/>
				<MDEditor
					value={value ?? "Type here"}
					onChange={(content: string | undefined) => setValue(content)}
					className="type__editor"
				/>
                <small> Last saved: {saved}</small>
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
