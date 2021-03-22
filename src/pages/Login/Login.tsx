//REACT and REDUX
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router"

import { useDispatch, useSelector } from "react-redux"
import { login_action, retrieve_logged_action } from "../../actions/login_actions"

//ASSETS and STYLING
import "./Login.scss"
import Waving from "../../assets/waving.png"
import Spinner from "../../components/Loader/Loader"

//INTERFACES & TYPES
import { LoginData } from "../../interfaces/LoginTypes"
import { LoggedState, rootInitialState } from "../../interfaces/interfaces"
import { LOADING_FALSE } from "../../actions/action_types"

const Login: React.FC<any> = () => {
	//HOOKS
	const dispatch = useDispatch()
	const history = useHistory()

	//STATE
	const [login_data, setLogin] = useState<LoginData>({
		email: "",
		password: "",
	})
	const props = useSelector((state: rootInitialState) => state.user)
	const loading = useSelector((state:LoggedState)=> state.user.loading)

	//USE EFFECTS:
	useEffect(() => {
		if (props.is_authorized) {
			history.push("/redirect")
		}
	}, [props.is_authorized])

	useEffect(() => {
		if (document.cookie.length > 0) {
			dispatch(retrieve_logged_action())
			if (props.is_authorized) {
				//history.goBack()
			} else {
				dispatch({type: LOADING_FALSE})
		}
		}
		if (loading) dispatch({type: LOADING_FALSE})
	}, [])

	//FUNCTIONS
	const submit_login = async (data: LoginData) => {
		dispatch(login_action(data))
	}
	const on_change_handler = async (
		e: React.KeyboardEvent<HTMLInputElement>
	) => {
		setLogin({
			...login_data,
			[e.currentTarget.id]: e.currentTarget.value,
		})
	}
	return (
		<div className="login-wrap">
			<div className="login-form__wrap">
				<div className="login-form__header">
					<img src={Waving} />
					Welcome back
				</div>
				<div className="login-form__content">
					{props.error !== "" ? <div className="">{props.error}</div> : ""}
					<input
						type="text"
						placeholder="Email"
						id="email"
						onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
							on_change_handler(e)
						}
					/>
					<input
						type="password"
						placeholder="Password"
						id="password"
						onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
							on_change_handler(e)
						}
					/>
				</div>
				<button
					className="login-form__submit"
					onClick={() => submit_login(login_data)}
				>
					{props.loading ? <Spinner /> : "LOGIN"}
				</button>
				<div className="login-form__footer">
					<div>
						<div className="login-form__hl"></div>
						<span>or</span>
						<div className="login-form__hl"></div>
					</div>
					<Link to="/join" className="login-form__link">
						Create a new account
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Login
