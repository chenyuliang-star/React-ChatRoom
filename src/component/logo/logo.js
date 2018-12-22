import React, { Component } from "react";
import logoImg from "../../statics/logo.jpg";
import "./logo.css";

class Logo extends Component {
    render () {
        return (
            <div className = "logo-wrapper">
               <img className = "logo-img" src = { logoImg } alt = "logo" />
            </div>
        );
    }
}
export default Logo;