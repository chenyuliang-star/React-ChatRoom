import React, { Component } from "react";

class Text extends Component {

    constructor (props) {
       super( );
       console.log(props)
       console.log( this.props) ;
    }
    componentDidMount () {
        console.log(this.props);
    }
    render (){
        return null;
    }
}

export default Text