import React, { Component } from 'react'
import loadingImage from "../images/loading.gif"

export default class Spinner extends Component {
    render() {
        return (
            <div className="text-center" >
                <img className="my-3" src={loadingImage} alt="loading..." style={{ width: "40px" }} />
            </div>
        )
    }
}
