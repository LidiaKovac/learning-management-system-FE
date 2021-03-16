import React from "react"
import "./Loader.scss"
import Loader from "react-loaders"

const Spinner:React.FC = () => {
  return <Loader type="line-scale" active />
}

export default Spinner