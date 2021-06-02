import React, { Component } from 'react';
import styles from './styles.model.css'


export class FormSearch extends Component {

    state = {
        city: ''
    }

    submitData = (e) => {
        e.preventDefault()
        // this.setState({city: e.target.value })
        console.log(e.target.value)
    }

    componentDidMount(){
        
    }

    render() {
        return (
            <form className="Form"  >
                <input placeholder="City" type="text" onChange={this.props.inputData} onSubmit={this.submitData} />
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default FormSearch
