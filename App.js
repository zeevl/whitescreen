/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NavigationContainer, useNavigation} from '@react-navigation/native';
import 'react-native-gesture-handler';

import React, {useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Bugsee from 'react-native-bugsee';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {RNCamera} from 'react-native-camera';
import {enableScreens} from 'react-native-screens';

enableScreens();

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
      onPres={() => console.log('view')}
      s>
      <Button title="camera" onPress={() => navigation.navigate('camera')} />
    </View>
  );
};

const CameraScreen = () => {
  const navigation = useNavigation();
  const ref = useRef();

  const handleSnapPicture = async () => {
    const res = await ref.current.takePictureAsync();
    navigation.navigate('picture', {uri: res.uri});
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
      }}>
      <RNCamera
        ref={(r) => {
          ref.current = r;
        }}
        style={{
          width: 300,
          height: 400,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        captureAudio={false}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
      <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={handleSnapPicture}
          style={{
            flex: 0,
            backgroundColor: '#fff',
            borderRadius: 5,
            padding: 15,
            paddingHorizontal: 20,
            alignSelf: 'center',
            margin: 20,
          }}>
          <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PictureScreen = ({route}) => {
  console.log('picture', route.params.uri);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        style={{width: 200, height: 300}}
        source={{uri: route.params.uri}}
      />
    </View>
  );
};

const CameraNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="camera"
        component={CameraScreen}
        options={{title: 'Camera', headerShown: false}}
      />
      <Stack.Screen
        name="picture"
        component={PictureScreen}
        options={{title: 'picture', headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const bugseeLaunchOptions = new Bugsee.AndroidLaunchOptions();
  bugseeLaunchOptions.videoEnabled = true;
  bugseeLaunchOptions.videoMode = Bugsee.VideoMode.V3;
  bugseeLaunchOptions.fallbackVideoMode = Bugsee.VideoMode.V2;
  bugseeLaunchOptions.setCustomOption('forceVideoModeV3', true);

  Bugsee.launch('f0ac1aa9-3c4c-49b6-a5fa-5b8a833f7e45', bugseeLaunchOptions);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={HomeScreen} />

        <Stack.Screen
          name="camera"
          component={CameraNavigation}
          options={{
            stackPresentation: 'fullScreenModal',
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 100,
    height: 100,
  },
});

export default App;
