//REACT and REDUX

import React, { useEffect, useState, FormEvent } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router"

import { useDispatch, useSelector } from "react-redux"

//ASSETS and STYLING
import "./Login.scss"
import Waving from "../../assets/waving.png"
import Spinner from "../../components/Loader/Loader"
import { login } from "../../reducers/user"
import { setLoading } from "../../reducers/loading"
import { useAppDispatch } from "../../store"

//INTERFACES & TYPES

const Login = () => {
	//HOOKS
	const dispatch = useAppDispatch()
	const history = useNavigate()

	//STATE
	const [login_data, setLogin] = useState<LoginData>({
		email: "",
		password: "",
	})

	//USE SELECTOR
	const props = useSelector((state: rootInitialState) => state.user)
	const loading = useSelector((state: LoggedState) => state.user.loading)

	//USE EFFECTS:
	useEffect(() => {
		if (localStorage.getItem("token")) {
			history("/redirect")
		}
	}, [localStorage.getItem("token")])

	// useEffect(() => {

	// 	if (document.cookie.length > 0 && !props.logged_out) {
	// 		dispatch(retrieve_logged_action())
	// 		if (props.is_authorized) {
	// 			//history.goBack()
	// 		} else {
	// 			dispatch({ type: LOADING_FALSE })
	// 		}
	// 	}
	// 	if (loading) dispatch({ type: LOADING_FALSE })
	// }, [])

	//FUNCTIONS
	const submitLogin = async (event:FormEvent) => {
		event.preventDefault()
		dispatch(setLoading(true))
		await dispatch(login(new FormData(event.target as HTMLFormElement)))
		if(props.logged_user?.role === "student") {
			history("/studentdash")
		} else {
			history("/teacherdash")
		}
	
	}
	return (
		<div className="login-wrap">
			<div className="login-form__wrap">
				<div className="login-form__header">
					<img src={Waving} alt="waving" />
					Welcome back
				</div>
				<form className="login-form__content" onSubmit={submitLogin}>
					{props.error !== "" ? <div className="">{props.error}</div> : ""}
					<input
						type="text"
						placeholder="Email"
						name="email"
						
					/>
					<input
						type="password"
						placeholder="Password"
						name="password"

					/>
					<button
						className="login-form__submit"

					// onClick={() => submit_login(login_data)}
					>
						{props.loading ? <Spinner /> : "LOGIN"}
					</button>
				</form>
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
