import React, { Component } from 'react';
import { Info } from './Info';
const FormData = require('form-data');
const fetch = require('node-fetch');

const API_KEY_FACE = '4q457jKcTPSBhkewJNybMYP5c23CS44B';
const API_SECRET = 'Z4tsTn0_AROlNc1-eFP83Zv43KpYcH27';

export default class FacePlus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gender: '',
      age: '',
      ethnicity: '',
      dataUri: '',
      emotion: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.renderSwitch = this.renderSwitch.bind(this);
  }

  componentDidMount() {
    Webcam.attach('#myCamera');
  }

  handleClick(event) {
    event.preventDefault();

    Webcam.snap(dataUri => {
      this.setState({ dataUri });
      const URI = dataUri.slice(23);

      const data = new FormData();
      data.append('api_key', API_KEY_FACE);
      data.append('image_base64', URI);
      data.append('api_secret', API_SECRET);
      data.append('return_attributes', 'gender,age,ethnicity,emotion,beauty');

      fetch('https://api-us.faceplusplus.com/facepp/v3/detect', {
        method: 'POST',
        body: data
      })
        .then(res => res.json())
        .then(json => {
          console.log(json);
          const { gender, ethnicity, age, emotion } = json.faces[0].attributes;
          return this.setState({
            gender: gender.value,
            age: age.value,
            ethnicity: ethnicity.value,
            emotion
          });
        })
        .catch(err => console.error(err));
    });
  }

  handleDownload(event) {
    event.preventDefault();

    const img = document.getElementById('embedId');

    if (document.createEvent) {
      var evObj = document.createEvent('MouseEvents');
      evObj.initEvent('click', true, false);
      img.dispatchEvent(evObj);
    } else if (document.createEventObject) {
      img.fireEvent('on' + evt);
    }
  }

  renderSwitch(param) {
    switch (param) {
      case 'happiness':
        return '😁';
      case 'neutral':
        return '😐';
      case 'disgust':
        return '😒';
      case 'sadness':
        return '😕';
      case 'anger':
        return '😡';
      case 'surprise':
        return '😯';
      case 'fear':
        return '😱';
      default:
        return '😐';
    }
  }

  render() {
    const dataUri = this.state.dataUri;

    const emotion = this.state.emotion;

    let arr = Object.values(emotion);
    let max = Math.max(...arr);

    let mood = '';

    for (let key in emotion) {
      if (emotion[key] === max) {
        mood = key;
      }
    }

    let emoji = this.renderSwitch(mood);

    return (
      <div>
        <div className="flex-container">
          <div className="text-center">
            <div id="myCamera" className="webcam-style" />
            <button onClick={this.handleClick}>Take Snapshot</button>
          </div>
          <div className="text-center">
            {dataUri.length > 0 ? (
              <div>
                <img
                  id="selfie"
                  src={dataUri}
                  className="animated fadeInRight"
                />
                <div>
                  <a href={dataUri} id="embedId" download="image.png">
                    <button onClick={this.handleDownload}>
                      Download Image
                    </button>
                  </a>
                </div>
              </div>
            ) : (
              <div className="placeholder">
                <p className="animated pulse infinite">Take A Selfie </p>
                <p className="animated pulse infinite">
                  & Remember To Smile 😁
                </p>
              </div>
            )}
          </div>
        </div>
        <hr />
        {dataUri.length > 0 ? (
          <Info stats={this.state} mood={mood} emoji={emoji} />
        ) : (
          <div className="text-center flex-container-2 amatic animated infinite">
            <p className="text-bold">
              Show Me Who You Are & I'll Tell You Who You Are...
            </p>
          </div>
        )}
      </div>
    );
  }
}
