import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ToastAndroid,
    StyleSheet,
    NativeModules,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { OTSession, OTPublisher, OTSubscriber } from 'opentok-react-native';

const RTC = ({navigation,route}) => {
    let {apiKey, sessionId, token} = route.params;
    const [archeiveId, setArcheiveId] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [isRecord, setRecord] = useState(false);
    const [publishAudio, setPublishAudio] = useState(true);
    const [publishVideo, setPublishVideo] = useState(true);
    const [cameraPosition, setcameraPosition] = useState('front');

    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;

    const otSessionRef = React.createRef();

    useEffect(() => {
      console.log(apiKey, sessionId, token);
        // return(() => {
        //     console.log("cleanup");
        // });
    }, []);

    const toggleAudio = () => {
        setPublishAudio(!publishAudio);
    }
    const switchCamera = () => {
        setcameraPosition(cameraPosition == 'front' ? 'rear':'front');
    }
    const toggleVideo = () => {
        setPublishVideo(!publishVideo);
    }
    const endCall = () => {
      otSessionRef.current.disconnectSession();
      navigation.goBack();
    }
    const recording = async () => {
      setLoading(true);

      if (isRecord == true) {
        try {
          const result = await fetch("https://tokbox.rcdevgames.net/api/recording.php?action=stop&id=" + archeiveId, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          })
          // var data = await result.json();
          console.log(result);
        } catch (error) {
          setLoading(false);
          ToastAndroid.show(error, ToastAndroid.LONG, ToastAndroid.BOTTOM);
        }
      }else {
        try {
          const result = await fetch("https://tokbox.rcdevgames.net/api/recording.php?action=start&session=" + sessionId, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          })
          // var data = await result.json();
          console.log(result);
        } catch (error) {
          setLoading(false);
          ToastAndroid.show(error, ToastAndroid.LONG, ToastAndroid.BOTTOM);
        }
      }
    }

    const sessionEventHandlers = {
      streamCreated: event => {
        console.log('Stream created!', event);
      },
      streamDestroyed: event => {
        console.log('Stream destroyed!', event);
      },
      sessionConnected: event => {
        console.log('Stream connected', event);
        // this.setState({
        //   isConnected: true,
        // })
      },
      archiveStarted: event => {
        console.log('Recording Started', event);
        setArcheiveId(event.archiveId);
        setLoading(false);
        setRecord(true);
      },
      archiveStopped: event => {
        console.log('Recording Stoped', event);
        setArcheiveId("");
        setLoading(false);
        setRecord(false);
      }

      
    }

    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <OTSession apiKey={apiKey} sessionId={sessionId} token={token} ref={otSessionRef} eventHandlers={sessionEventHandlers}>
            <OTPublisher style={{ width: deviceWidth, height: deviceHeight/2 }}  properties={{
              publishAudio: publishAudio,
              publishVideo: publishVideo,
              cameraPosition: cameraPosition
            }}/>
            <OTSubscriber style={{ width: deviceWidth, height: deviceHeight/2 }} />
          </OTSession>
          {/* <View style={{...styles.buttonBar, bottom: 50}}>

            <View style={{...styles.iconStyle, backgroundColor: '#0093E9', justifyContent: 'center', alignContent: 'center'}}>
              <ActivityIndicator color='#FFF' size='small' />
            </View>
          </View> */}
          <View style={styles.buttonBar}>
            {isLoading ? <View style={{...styles.iconStyle, backgroundColor: '#0093E9', justifyContent: 'center', alignContent: 'center'}}>
              <ActivityIndicator color='#FFF' size='small' />
            </View> : <Icon.Button
              style={styles.iconStyle}
              backgroundColor="#0093E9"
              name={isRecord ? 'stop' : 'fiber-manual-record'}
              onPress={recording}
            />}
            <Icon.Button
              style={styles.iconStyle}
              backgroundColor="#0093E9"
              name={publishAudio ? 'mic' : 'mic-off'}
              onPress={toggleAudio}
            />
            <Icon.Button
              style={{...styles.iconStyle, color: 'red'}}
              backgroundColor="#0093E9"
              name='call-end'
              onPress={endCall}
            />
            <Icon.Button
              style={styles.iconStyle}
              backgroundColor="#0093E9"
              name={cameraPosition == "front" ? 'camera-rear' : 'camera-front'}
              onPress={switchCamera}
            />
            <Icon.Button
              style={styles.iconStyle}
              backgroundColor="#0093E9"
              name={publishVideo ? 'videocam' : 'videocam-off'}
              onPress={toggleVideo}
            />
          </View>
        </View>
    );
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
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 10
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
      paddingLeft: 5,
      paddingRight: 5,
      paddingBottom: 15,
      borderRadius: 0,
    },
    full: {
      flex: 1,
    },
});

export default RTC;