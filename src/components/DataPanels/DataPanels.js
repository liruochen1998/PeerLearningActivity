import React from "react";
import "./DataPanel.css";
import RadioButtonPanel from "../RadioButtonPanel/RadioButtonPanel.js";
import Slider from "../Slider/Slider.js";
import DataDisplay from "../DataDisplay/DataDisplay.js";

class DataPanels extends React.Component {
  render() {
    return (
      <div className="dataPanels" data-testid="DataPanels">
        <Slider
          selectedDate={this.props.selectedDate}
          changeSelectedDate={this.props.changeSelectedDate}
          dateRange={this.props.dateRange}
        />
        <RadioButtonPanel changeDataType={this.props.changeDataType} selectedDataType={this.props.selectedDataType} />
        <DataDisplay
          selectedDate={this.props.selectedDate}
          currentData={this.props.currentData}
          selectedDataType={this.props.selectedDataType}
          selectedState={this.props.selectedState}
          sendData={this.props.sendData}
        />
      </div>
    );
  }
}

export default DataPanels;
