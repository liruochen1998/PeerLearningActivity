import React from 'react';
// import * as d3 from 'd3';
import {getHeadings} from '../../utils/data.js';
import './style.css';



function RadioButton(headings, checkedButton, handleChange) {
    let nameCount = -1;
    const labels = headings.map(currHeading => {
            nameCount ++;
            return(
        <div className="field" key = {nameCount}>
            <div className="ui radio checkbox">
                <input type="radio" name={'button' + nameCount} value={currHeading} checked={checkedButton === currHeading} onChange={handleChange} />
                <label>{currHeading}</label>
            </div>
        </div>
            )
    })
    return(
        labels
    )
    
}


class RadioButtonPanel extends React.Component {

    constructor(props) {
        super(props);
        this.headings = getHeadings();
        this.state={
            checkedButton: this.headings[0]
        }
        this.handleChange = this.handleChange.bind(this);
        
    }

    handleClick(heading){
        this.setState({checkedButton: heading})
    }

    handleChange(event){
        this.setState({checkedButton: event.target.value});
    }
    
    // call window.pageComponent.getCheckedButton() to get the checked button
    getCheckedButton(){
        return this.state.checkedButton;
    }

    render() {
        return(
            <div ref={(childComponent) => {window.childComponent = childComponent}} className="ui raised segment compact radioPanel">
                <div className="ui form">
                    <div className="grouped fields">
                        {RadioButton(this.headings, this.state.checkedButton, this.handleChange)}
                    </div>
                </div>
            </div>


        )
    }
}

export default RadioButtonPanel;