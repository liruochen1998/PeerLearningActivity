import React from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import { statesData, dataCollect } from './us-states.js';
import { MAPBOX_TOKEN } from './tokens.js';
import { layerColors } from './layerColors.js';
import { getDefaultHeading, getHeadings, renderData, loadDataIntoGeoJSON, mapIntToDate} from '../../utils/data.js';

mapboxgl.accessToken = MAPBOX_TOKEN;

let enumDataLayerType;
let newPromise = new Promise(function(resolve) {
  resolve(renderData());
})


const setEnum = function(){
  let dataLayerTypes = {}
  let headings = getHeadings();
  headings.forEach(curr => {
      const enumValue = curr;
      dataLayerTypes = {...dataLayerTypes, [enumValue]: {name: curr, layerId: curr}};
  });
  enumDataLayerType = {...dataLayerTypes}; //TODO: replace this weith dataLayerTypes everywhere since it's no longer enum
  console.log(enumDataLayerType);
}

newPromise.then(setEnum).then(loadDataIntoGeoJSON);

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: 35.9,
      lng: -79.1,
      zoom: 3
    };
    this.map = null;
    // the state that mouse is on right now
    this.hoveredStateId = null;
    // the state that mouse has selected right now
    this.selectedStateId = null;
    // restrict user inside this region of the map
    this.bounds = [
      [-179, -5.91619], // Southwest coordinates
      [-20.96466, 75.3577635769] // Northeast coordinates
    ];
    this.initDataLayer = this.initDataLayer.bind(this);
    this.switchToLayer = this.switchToLayer.bind(this);
    this.currentDataLayer = null;
    this.finishLoadingMapStyle = false;
  }

  initDataLayer(dataId, layerType, visible) { 
    const layerId = layerType.layerId;
    const layerColor = layerColors['mapExample'];
    // const layerColor = layerColors[layerType.name];

    // fill states with different colors based on their corresponding data in geojson file
    // fill states with different opacity based on whether the mouse is hovering or not
    this.map.addLayer({
      id: layerId,
      source: dataId,
      type: 'fill',
      layout: {
        'visibility': (visible ? 'visible' : 'none')
      },
      paint: {
        'fill-color': [
          'interpolate',
          ['linear'],
          ['number', ['get', 'cases']],
          0,
          layerColor['0'],
          500,
          layerColor['10'],
          2000,
          layerColor['20'],
          5000,
          layerColor['50'],
          20000,
          layerColor['100'],
          50000,
          layerColor['200'],
          80000,
          layerColor['500'],
          100000,
          layerColor['1000'],
        ],
        'fill-opacity': [
          // if the state is either hovered or selected, highlight the state; otherwise cancel the highlight
          'case',
          [
            'any',
            ['boolean', ['feature-state', 'hover'], false],
            ['boolean', ['feature-state', 'select'], false],
            false
          ],
          0.85,
          0.5
        ]
      }

    });
    this.map.setFilter(layerId, ['==', ['string', ['get', 'date']], mapIntToDate(this.props.selectedDate)]);
    console.log(layerId);
    this.finishLoadingMapStyle = true;


    // when hovering, turn on the hover state for current map feature and turn off the hover state for previous map feature (if any)
    this.map.on('mousemove', layerId, (e) => {
      if (e.features.length > 0) {
        if (this.hoveredStateId) {
          this.map.setFeatureState(
            { source: dataId, id: this.hoveredStateId },
            { hover: false }
          );
        }
        this.hoveredStateId = e.features[0].id;
        this.map.setFeatureState(
          { source: dataId, id: this.hoveredStateId },
          { hover: true }
        );
      }
    });

    // when selecting, turn on the hover state for current map feature and turn off the select state for previous map feature (if any)
    this.map.on('click', layerId, (e) => {
      if (e.features.length > 0) {
        if (this.selectedStateId) {
          this.map.setFeatureState(
            { source: dataId, id: this.selectedStateId },
            { select: false }
          );
        }
        this.selectedStateId = e.features[0].id;
        this.map.setFeatureState(
          { source: dataId, id: this.selectedStateId },
          { select: true }
        );

        if (this.props.onClickMap && this.props.selectedDate && this.props.selectedDataType ) {
          console.log(this.props.selectedDate);
          console.log(this.props.selectedDataType);
          const dateFormatted = mapIntToDate(this.props.selectedDate);
          console.log(dateFormatted);
          // console.log(e.features[0].properties.data[dateFormatted][this.props.selectedDataType])
          // console.log(e.features[0].properties.data)
          console.log(e.features[0].properties);
          // const obj = JSON.parse(e.features[0].properties.data);
          // console.log(obj[dateFormatted]);

          // console.log(e.features[0].properties.data[0]['7/5'])
          // this.props.onClickMap(e.features[0].properties.name, e.features[0].properties.data[this.props.currentDate][this.props.selectedDataType]);
        }
      }
    });

    // when mouse leaveing the states map, turn off the hover state for current map feature
    this.map.on('mouseleave', layerId, () => {
      if (this.hoveredStateId) {
        this.map.setFeatureState(
          { source: dataId, id: this.hoveredStateId },
          { hover: false }
        );
      }
      this.hoveredStateId = null;
    });

  }

  switchToLayer(layerType) {
    for (const type in enumDataLayerType) {
      if (enumDataLayerType[type].layerId === layerType) {
        this.currentDataLayer = enumDataLayerType[type];
        this.map.setLayoutProperty(enumDataLayerType[type].layerId, 'visibility', 'visible');
      } else {
        this.map.setLayoutProperty(enumDataLayerType[type].layerId, 'visibility', 'none');
      }
    }
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
      maxBounds: this.bounds
    });

    this.map.on('load', () => {
      const dataId = 'states-data';
      // attach geojson data to the map
      this.map.addSource(dataId, {
        type: 'geojson',
        data: dataCollect.totalTests
      })

      // Object.keys(enumDataLayerType).forEach(curr => {
      //   this.initDataLayer(dataId, enumDataLayerType[curr], false);
      // })
      this.initDataLayer(dataId, enumDataLayerType.total_tests, true);
      // this.switchToLayer(getDefaultHeading());
      
      // add dashed-line borders to states
      this.map.addLayer({
        id: 'states-borders',
        type: 'line',
        source: dataId,
        layout: {},
        paint: {
          'line-color': '#FFFFFF',
          'line-width': 2,
          'line-dasharray': [3, 3]
        }
      });
    });

    this.map.on('styledata', function() {
      console.log('A styledata event occurred.');
    });

  }
  componentDidUpdate(prevProps) {
    if ((prevProps.selectedDate !== this.props.selectedDate) && this.finishLoadingMapStyle) {
      console.log(this.props.selectedDate);
      this.map.setFilter('total_tests', ['==', ['string', ['get', 'date']], mapIntToDate(this.props.selectedDate)]);
    }
  }


  render() {
    return (
      <div>
        <div ref={el => this.mapContainer = el} className="mapContainer" />
      </div>
    )
  }

}

export default Map;
