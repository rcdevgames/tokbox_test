import React, { useState, useEffect }  from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ToastAndroid,
    StatusBar,
    StyleSheet,
    PermissionsAndroid,
    ActivityIndicator,
    Linking
} from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Home=({navigation}) => {
  const [tokbox, setTokbox] = useState({});
  const [loading, setLoading] = useState(false);
  const [sessionId, setSession] = useState("");
  
  useEffect(() => {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        // navigate(url);
      });
    } else {
      Linking.addEventListener('url', handleOpenURL);
    }
    return(() => {
      Linking.removeEventListener('url', handleOpenURL);
    });
  }, []);

  const handleOpenURL = (event) => {
    console.log(event.url);
    // navigate(event.url);
  }

  // const navigate = (url) => { // E
  //   // const { navigate } = this.props.navigation;
  //   const route = url.replace(/.*?:\/\//g, '');
  //   const id = route.match(/\/([^\/]+)\/?$/)[1];
  //   const routeName = route.split('/')[0];
  //   console.log(routeName);
  
  //   // if (routeName === 'people') {
  //     // navigate('People', { id, name: 'chris' })
  //   // };
  // }

  const getData = async () => {
    setLoading(true);
    try {
      const result = await fetch("https://tokbox.rcdevgames.net/api/create_session.php", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      var data = await result.json();
      setLoading(false);
      setTokbox(data);
      navigation.navigate('/rtc', data);
    } catch (error) {
      setLoading(false);
      ToastAndroid.show(error, ToastAndroid.LONG, ToastAndroid.BOTTOM);
    }
  }

  const joinData = async () => {
    setLoading(true);
    
    let formdata = new FormData();
    formdata.append("sessionId", sessionId)

    try {
      const result = await fetch("https://tokbox.rcdevgames.net/api/join_session.php", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formdata
      })
      var data = await result.json();
      setLoading(false);
      setTokbox(data);
      navigation.navigate('/rtc', data);
    } catch (error) {
      setLoading(false);
      ToastAndroid.show(error, ToastAndroid.LONG, ToastAndroid.BOTTOM);
    }
  }

  return (
    <View style={styles.container}>
        <StatusBar backgroundColor="#1976D2" />
        <View style={styles.buttonContainer}>
          {loading ? <ActivityIndicator color='#2196F3' size='large' /> : 
            <View style={styles.loginBox}>
              <Input
                style={{width: '100%'}}
                onChangeText={(val) => {
                  setSession(val);
                }}
                // secureTextEntry={showPass}
                style={styles.inputText}
                label="Session"
                leftIcon={
                  <Icon name="history" style={{fontSize: 20}}/>
                }
              />
              <View style={styles.buttonBox}>
                <TouchableOpacity 
                onPress={getData}
                style={styles.submitButton}>
                    <Text style={styles.buttonText}>Bikin Baru</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={joinData}
                style={styles.submitButton}>
                    <Text style={styles.buttonText}>Join</Text>
                </TouchableOpacity>
              </View>
            </View>}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      marginTop: 0,
      padding: 20,
      flex: 1,
      backgroundColor: '#ffffff',
    },
    buttonContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    submitButton: {
      paddingHorizontal: 30,
      paddingVertical: 10,
      backgroundColor: '#2196F3',
      width: '45%',
    },
    buttonText: {
      color: "#fff", fontSize: 16, fontWeight: '700', textAlign: 'center'
    },
    buttonBox: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%'
    },
    loginBox: {
      width: '100%'
      // flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center'
    }
  });

export default Home;