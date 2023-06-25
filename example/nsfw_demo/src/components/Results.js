import React from 'react'
import axios from "axios";

import GifBar from './GifBar'

// Render Text Prediction OR GifBar
const renderPredictions = props => {
  postPredictions(props);
  // only render if predictions is in singular format
  if (props.predictions[0] && props.predictions[0].className) {
    return (
      <div id="predictions">
        <ul>
          {props.predictions.map(prediction => (
            <li key={prediction.className}>
              {prediction.className} -{' '}
              {(prediction.probability * 100).toFixed(2)}%
            </li>
          ))}
        </ul>
      </div>
    )
  } else if (props.predictions[0]) {
    return <GifBar data={props.predictions} gifControl={props.gifControl} />
  }
}

const postPredictions = props => {
  if (props.predictions[0] && props.predictions[0].className) {
    axios
      .post("http://localhost:8000/api/predictions/", {
        className: props.predictions[0].className,
        probability: props.predictions[0].probability,
        file: props.graphic
      })
      .then((res) => console.log("Data Posted"))
      .catch((err) => console.log(err));
  }
};

export default props => (
  <div id="results">
    <p>{props.message}</p>
    {renderPredictions(props)}
  </div>
)
