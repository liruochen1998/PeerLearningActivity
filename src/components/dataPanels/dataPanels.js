import React from 'react';
import './style.css';
import RadioButtonPanel from '../RadioButtonPanel/RadioButtonPanel.js';
import Slider from '../Slider/Slider.js';
import DataDisplay from '../DataDisplay/DataDisplay.js';
import {getDateRange, getDefaultDateInt, mapIntToDate} from '../../utils/data.js';


class DataPanels extends React.Component {
    constructor(props) {
      super(props);
  }
    render() {
        return(
          <div className='dataPanels'>
            <Slider 
              dateRange={getDateRange()}
              selectedDate={this.props.selectedDate}
              changeSelectedDate={this.props.changeSelectedDate}
            />
            <RadioButtonPanel changeDataType={this.props.changeDataType} headings={this.props.headings}/>
            <DataDisplay 
              selectedDate={this.props.selectedDate} 
              currentData={this.props.currentData} 
              selectedDataType={this.props.selectedDataType} 
              selectedState={this.props.selectedState}
              sendData={this.props.sendData}
            />
          </div>

        )
    }
}

export default DataPanels;
