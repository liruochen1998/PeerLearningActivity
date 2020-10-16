import React from 'react';
import { Container } from 'semantic-ui-react';
import './MapAndDataContainer.css';
import Map from '../Map/Map.js';
import DataPanels from '../dataPanels/dataPanels.js';

class MapAndDataContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedState: 'Alabama',
    };
    this.setSelectState = this.setSelectState.bind(this);
  }


  setSelectState(value) {
    this.setState({selectedState: [value]});
    this.childPanel.setSelectState(value);
  }

  render() {
    return(
      <Container>
        <DataPanels ref={ref => this.childPanel = ref}/>
        <Map onClickMap={this.setSelectState}/>
      </Container>
    )  
  }
}




export default MapAndDataContainer;