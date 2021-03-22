import React, {useEffect, useState} from "react"
import {Link, useHistory} from "react-router-dom"
import Waving from "../../assets/waving.png"
import AsyncSelect from 'react-select'
import "./SignUp.scss"
import {ImCross, ImCheckmark} from "react-icons/im"
import { rootInitialState, SelectOption } from "../../interfaces/interfaces"
import { useDispatch, useSelector } from "react-redux"
import { join_action } from "../../actions"
import Spinner from "../../components/Loader/Loader"
import { JoinData_w_conf } from "../../interfaces/LoginTypes"

const SignUp = () => {
	//HOOKS
	const dispatch = useDispatch()
	const history = useHistory()
	const props = useSelector((state: rootInitialState) => state.user)

	//STATE
	const [user_data, set_user_data] = useState<JoinData_w_conf>({
		name: "",
		last_name: "",
		pronouns: "",
		birthday: "",
		email: "",
		role: "teacher",
		password: "",
		password_conf: ""
	})
	const [pass_match, set_pass_match] = useState<Boolean>(false)
	const [error, set_error] = useState<String>("")

	//SELECT OPTIONS
    const options:Array<SelectOption> = [
        {value: "she/her", label: "She/Her"},
        {value: "he/him", label: "He/Him"},
        {value: "they/them", label: "They/Them"}
    ]

	//EVENT HANDLERS
	const onKeyUpHandler = async(e:React.KeyboardEvent<HTMLInputElement>) => {
		await set_user_data({
			...user_data,
			[e.currentTarget.id]: e.currentTarget.value
		})
		
	}
	const onChangeHandler__pronouns = async(val:SelectOption | null) => {
		await set_user_data({
			...user_data,
			pronouns: val!.value.toString()
		})
	}
	const onChangeHandler = async(e:React.FormEvent<HTMLInputElement>) => {
		if (e.currentTarget.id === "birthday") {
			await set_user_data({
				...user_data,
				birthday: e.currentTarget.value
			})
		} else await set_user_data({
			...user_data,
			role: (e.currentTarget.checked ? "student" : "teacher")
		})
		
	}
	
	//FUNCTIONS 
	const check_pass = () => {
		if (user_data.password_conf === user_data.password) {
			set_pass_match(true)
		} else set_pass_match(false)
	}
	const submit_forms = () => {
		if (
			user_data.name !== "" 
			&& user_data.last_name !== "" 
			&& user_data.pronouns !== "" 
			&& user_data.email !== ""
			&& user_data.role !== ""
			&& user_data.birthday !== ""
			)
			if (pass_match)
				dispatch(join_action(user_data))
			else set_error("Passwords don't match!")
		else set_error("Please fill out all the sections.")
	}
	//USE EFFECTS 
	useEffect(()=> {
		if(props.is_authorized) {
			history.push("/redirect")
		}
	}, [props])

	return (
		<div className="signup-wrap">
			<div className="signup-form__wrap">
				<div className="signup-form__header">
					<img src={Waving} /> Welcome!
				</div>
				<div className="signup-form__input--row">
					<input type="text" id="name" placeholder="Name" onKeyUp={onKeyUpHandler}/>
					<input type="text" id="last_name" placeholder="Last name" onKeyUp={onKeyUpHandler} />
				</div>
                <AsyncSelect options={options} id="pronouns" className="signup-form__input--select" classNamePrefix="signup-form__input--select" isSearchable={false} defaultOptions onChange={(val:SelectOption | null)=>onChangeHandler__pronouns(val)}/>
                <input type="date" id="birthday" onChange={onChangeHandler}/>
                <input type="text" id="email" placeholder="Email" onKeyUp={onKeyUpHandler} />
				<span className="signup-form__input--error">{props.error === "email already in use!" ? "Email already in use!" : ""}</span>
                <input type="password" id="password" placeholder="Password" onKeyUp={onKeyUpHandler} onBlur={check_pass} />
               <div style={{
				   width: "75%", 
				   placeSelf: "flex-start", 
				   marginLeft: "30px", 
				   display: "flex", 
				   flexDirection: "row" 
				}}> <input type="password" id="password_conf" placeholder="Confirm your password" onKeyUp={onKeyUpHandler} onBlur={check_pass}/> {pass_match 
			   	? <ImCheckmark className="check_icon" style={{color: "green"}}/> 
				: <ImCross className="check_icon" style={{color: "red"}}/>}</div>
				<span className="signup-form__input--error">
					{(!pass_match && error === "Passwords don't match!") ? "Passwords don't match!" : "" }
				</span>
				<div style={{
				   width: "75%",
				   height: "40px",
				   display: "flex", 
				   flexDirection: "row",
				   justifyContent :"flex-start",
				   alignItems: "center"
				}}>
					<input type="checkbox" id="role" onChange={onChangeHandler}/> <label style={{fontSize: "11pt"}} htmlFor="role">Student?</label>
					</div>
				<span style={{marginTop: "10px"}} className="signup-form__input--error">
					{error === "Please fill out all the sections." ? "Please fill out all the sections." : "" }
				</span>
                <button className="signup-form__submit" onClick={submit_forms}> 
				{props.loading ? <Spinner /> : "JOIN"} </button>
                <div className="login-form__footer">
					<div>
						<div className="login-form__hl"></div>
						<span>or</span>
						<div className="login-form__hl"></div>
					</div>
					<Link to="/" className="signup-form__link">
						Already have an account? 
					</Link>
				</div>
			</div>
		</div>
	)
}

export default SignUp
