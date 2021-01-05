import React, { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { OTSession, OTPublisher, OTSubscriber } from 'opentok-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publishAudio: true,
      publishVideo: true,
      cameraPosition: 'front'
    }
    this.apiKey = '46967144';
    this.sessionId = '1_MX40Njk2NzE0NH5-MTYwNTUwMTk3Mzc1NH50TkZrMkRFMFYvczdKM2JiMml0cHpFaXV-fg';
    // this.token = 'T1==cGFydG5lcl9pZD00Njk2NzE0NCZzaWc9ZjhkMmUxMjIwZGFkNDE4NzkyYzQ5ZjU5OWI0MGY3ZjdhZjQ2NDdiYjpzZXNzaW9uX2lkPTFfTVg0ME5qazJOekUwTkg1LU1UWXdOVFV3TVRrM016YzFOSDUwVGtack1rUkZNRll2Y3pkS00ySmlNbWwwY0hwRmFYVi1mZyZjcmVhdGVfdGltZT0xNjA1NTAxOTc0Jm5vbmNlPTAuNTI4OTgyMDYzODE4MjMxNyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjA4MDkzOTc0JmNvbm5lY3Rpb25fZGF0YT13YXdhd190ZXN0JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';
    this.token = 'T1==cGFydG5lcl9pZD00Njk2NzE0NCZzaWc9NWI4Y2ZjMTMwY2Y5OTc2Y2E4M2FkZTdhMDYzYmQ4ZmY0OWJjYTg5MzpzZXNzaW9uX2lkPTFfTVg0ME5qazJOekUwTkg1LU1UWXdOVFV3TVRrM016YzFOSDUwVGtack1rUkZNRll2Y3pkS00ySmlNbWwwY0hwRmFYVi1mZyZjcmVhdGVfdGltZT0xNjA1NTA4NTEzJm5vbmNlPTAuMDIwMzEyMDY5Nzk0ODI3MzYmcm9sZT1zdWJzY3JpYmVyJmV4cGlyZV90aW1lPTE2MDYxMTMzMTMmY29ubmVjdGlvbl9kYXRhPXdhd2F3X3Rlc3RfMSZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==';
    
    // this.sessionId = '1_MX40Njk2NzE0NH5-MTYwNTUwMjAyODU2NH5VNXowZmVJSldBTG9ONTNFZjE1RHZMY1p-fg';
    // this.token = 'T1==cGFydG5lcl9pZD00Njk2NzE0NCZzaWc9YzUyYTA5OTQzMWM3YmFhMzc2YmRlMDdiZWE5ZjkzZWMzN2ZiYTgyNjpzZXNzaW9uX2lkPTFfTVg0ME5qazJOekUwTkg1LU1UWXdOVFV3TWpBeU9EVTJOSDVWTlhvd1ptVkpTbGRCVEc5T05UTkZaakUxUkhaTVkxcC1mZyZjcmVhdGVfdGltZT0xNjA1NTAyMDI5Jm5vbmNlPTAuODk3NTM3MTcwMDExMDQ4NCZyb2xlPXN1YnNjcmliZXImZXhwaXJlX3RpbWU9MTYwNjEwNjgyOSZjb25uZWN0aW9uX2RhdGE9d2F3YXdfdGVzdCZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==';
    this.deviceWidth = Dimensions.get('window').width;
    this.deviceHeight = Dimensions.get('window').height;
  }

  toggleAudio() {
    this.setState({
      publishAudio: !this.state.publishAudio
    });
  }
  switchCamera() {
    this.setState({
      cameraPosition: this.state.cameraPosition == 'front' ? 'rear':'front'
    });
  }
  toggleVideo() {
    this.setState({
      publishVideo: !this.state.publishVideo
    });
  }
  handleEvent(z) {
    console.log(z);
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <OTSession apiKey={this.apiKey} sessionId={this.sessionId} token={this.token}>
          <OTPublisher style={{ width: this.deviceWidth, height: this.deviceHeight/2 }}  properties={{
            publishAudio: this.state.publishAudio,
            publishVideo: this.state.publishVideo,
            cameraPosition: this.state.cameraPosition
          }}/>
          <OTSubscriber style={{ width: this.deviceWidth, height: this.deviceHeight/2 }} />
        </OTSession>
        <View style={styles.buttonBar}>
          <Icon.Button
            style={styles.iconStyle}
            backgroundColor="#0093E9"
            name={this.state.publishAudio ? 'mic' : 'mic-off'}
            onPress={() => this.toggleAudio()}
          />
          <Icon.Button
            style={styles.iconStyle}
            backgroundColor="#0093E9"
            name={this.state.cameraPosition == "front" ? 'camera-rear' : 'camera-front'}
            onPress={() => this.switchCamera()}
          />
          <Icon.Button
            style={styles.iconStyle}
            backgroundColor="#0093E9"
            name={this.state.publishVideo ? 'videocam' : 'videocam-off'}
            onPress={() => this.toggleVideo()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonBar: {
    height: 50,
    backgroundColor: '#0093E9',
    display: 'flex',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  localVideoStyle: {
    width: 140,
    height: 160,
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 100,
  },
  iconStyle: {
    fontSize: 34,
    paddingTop: 15,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 15,
    borderRadius: 0,
  },
  full: {
    flex: 1,
  },
});