import "./Notes.scss"

import { useDispatch, useSelector } from "react-redux"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"


import {AiOutlineCloudUpload, AiOutlineFileDone} from "react-icons/ai"

import { retrieve_logged_action } from "../../actions"
import { upload_file } from "../../api calls/file_api"

import { LoggedState } from "../../interfaces/interfaces"
import { LOADING_FALSE, LOADING_TRUE } from "../../actions/action_types"
import Spinner from "../../components/Loader/Loader"

const Notes:React.FC = () => {
	//HOOKS
	const history = useHistory()
	const dispatch = useDispatch()
	const logged_user = useSelector(
		(state: LoggedState) => state.user.logged_user
	)
    const loading = useSelector((state:LoggedState)=> state.user.loading)

	//STATE
	const [uploaded, setUploaded] = useState<string>("")

    //USE EFFECT
	useEffect(() => {
			if (document.cookie.length > 0) {
				dispatch(retrieve_logged_action())
                if (logged_user.name === null) {
                    history.push("/")
                } 
			} else {
				history.push("/")
			}
	}, [])
    const on_change_handler = (e:React.ChangeEvent<HTMLInputElement>) => {

    }

	const upload_pdf = async (file: FileList): Promise<void> => {
		let fd = new FormData()
		fd.append("material", file[0])
		fd.append("type", "pdf")
		fd.append("name", "")
        dispatch({type: LOADING_TRUE})
		const new_file = await upload_file("pdf", fd)
        dispatch({type: LOADING_FALSE})
		setUploaded(new_file.path)
		console.log("done")
	}
	return (
		<>
			<div className="notes__wrap-page">
                <div className="notes__inner">

				<div className="notes__upload">
					<input
						type="file"
						id="pdf"
						accept=".pdf"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							upload_pdf(e.target.files!)
						}
					/>
                    {!uploaded ? <label htmlFor="pdf" className="notes__icon">
                        {(!loading && !uploaded) ? <AiOutlineCloudUpload/> : <Spinner/> }
                    </label> : <AiOutlineFileDone className="notes__icon"/> }
                    <input type="text"/>
				</div>
				<iframe
					className="notes__pdf"
					src={
						!uploaded ? process.env.REACT_APP_PDF_SAMPLE_URL : uploaded
					}
				></iframe>
                </div>
			</div>
		</>
	)
}

export default Notes
