import {Link} from "react-router-dom"
import MDEditor from "@uiw/react-md-editor"
const Guide = () => {
    return (<>
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
							<br/>
							<strong>Image from link WITH DIMENSIONS: </strong> {`<img src=link width="number" height="number"/>`}
							<br />
							<strong style={{ color: "red" }}>
								Copy pasting an image won't work, use the uploader in this page.
								<br/>
								If you use the second method, you can specify only one dimension.
							</strong>
						</p>
						<p>
							<strong>Unordered list</strong> - List item
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
    </>)
}

export default Guide