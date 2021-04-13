import "./Upload_New.scss"
import SampleImage from "../../../assets/samples/sample.jpg"

import { useDispatch, useSelector } from "react-redux"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import AsyncSelect from "react-select"

import { AiOutlineCloudUpload, AiOutlineFileDone } from "react-icons/ai"
import Spinner from "../../../components/Loader/Loader"

import { LOADING_FALSE, LOADING_TRUE } from "../../../actions/action_types"
import { retrieve_logged_action } from "../../../actions/login_actions"
import {change_type_action} from "../../../actions/file_actions"
import { upload_file } from "../../../api calls/file_api"
import { LoggedState, rootInitialState, SelectOption } from "../../../interfaces/interfaces"


const UploadNotes: React.FC = () => {
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
	//HOOKS
	const history = useHistory()
	const dispatch = useDispatch()
	const logged_user = useSelector((state: LoggedState) => state.user.logged_user)
	const loading = useSelector((state: LoggedState) => state.user.loading)
	const file_type = useSelector((state:rootInitialState)=> state.file.type)
	const role = useSelector((state:LoggedState) => state?.user?.logged_user?.role)

	//STATE
	const [uploaded, setUploaded] = useState<string>("")
	const [file_name, setName] = useState<string>()

	//USE EFFECT
	useEffect(() => {

			dispatch(retrieve_logged_action())
			if (logged_user?.name === null) {
				history.push("/")
			}
	}, [])
	const on_change_handler = (value:string) => {
		setName(value)
	}
	const on_change_handler__type = (val: SelectOption | null) => {
		console.log(val)
		dispatch(change_type_action(val!.value))
	}

	const upload_file_handler = async (files: FileList): Promise<void> => {
		let fd = new FormData()
		fd.append("material", files[0])
		fd.append("type", file_type!)
		fd.append("name", file_name!)
		dispatch({ type: LOADING_TRUE })
		const new_file = await upload_file(file_type!, fd)
		if (new_file) {
			dispatch({ type: LOADING_FALSE })
			setUploaded(new_file.path)
		}
		setTimeout(()=> {
			if(role === "teacher") //this has to change to different paths
				history.push("/teacherdash")
			else if (role === "student") 
				history.push("/studentdash")
		}, 3000)
	}
	return (
		<>
			<div className="notes__wrap-page">
				<div className="notes__inner">
					<div className="notes__upload">
						<input
							type="file"
							id="file_upload"
							accept={
								  file_type === "pdf" ? ".pdf" 
								: file_type === "image" ? ".jpg, .png, .jpeg, .gif" 
								: file_type === "video" ? ".mp4, .mov, .mpeg, .mkv"
								: ".mp3, .wav, .aac, .flac"}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								upload_file_handler(e.target.files!)
							}
						/>
						{!uploaded ? (
							<label htmlFor="file_upload" className="notes__icon">
								{!loading && !uploaded ? <AiOutlineCloudUpload id="new"/> : <Spinner />}
							</label>
						) : (
							<AiOutlineFileDone className="notes__icon" />
						)}
						<input type="text" placeholder="Name of the file" id="name" onKeyUp={(e) => on_change_handler(e.currentTarget.value)} />
						<AsyncSelect
							options={options}
							id="type"
							className="notes__input--select"
							classNamePrefix="notes__input--select"
							isSearchable={false}
							defaultOptions
							onChange={(val: SelectOption | null) =>
								on_change_handler__type(val)
							}
						/>
					</div>
					{file_type === "pdf" ?
					<iframe
						className="notes__thumbnail"
						src={!uploaded ? process.env.REACT_APP_PDF_SAMPLE_URL : uploaded}
						title="pdf"
					></iframe>
					: file_type === "image" ? <img src={!uploaded ? SampleImage : uploaded} className="notes__thumbnail notes__thumbnail--image" alt="thumbnail"/> 
					: file_type === "video" ? <iframe src={!uploaded ? process.env.REACT_APP_VIDEO_SAMPLE_URL : uploaded} className="notes__thumbnail" title="video"></iframe>
					: file_type === "audio" ? <audio src={!uploaded? process.env.REACT_APP_AUDIO_SAMPLE_URL : uploaded} controls className="notes__thumbnail notes__thumbnail--audio"/>
					: <div className="notes__thumbnail--default">Choose a file type!</div>}
				</div>
			</div>
		</>
	)
}

export default UploadNotes
