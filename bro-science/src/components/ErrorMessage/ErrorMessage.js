import React,{Component} from 'react'
import './ErrorMessage.css'

class ErrorMessage extends Component{

    render(props){
        return(
            <h3 className="errorStyle">{this.props.errorMessage}</h3>
        )
    }
}

export default ErrorMessage;