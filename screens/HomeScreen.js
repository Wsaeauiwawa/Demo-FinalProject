import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Button,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Tflite from 'tflite-react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

let tflite = new Tflite();

const height = 350;
const width = 350;
const blue = '#00BCD4';
const mobile = 'Predict';

export default class HomeScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      model: null,
      source: null,
      imageHeight: height,
      imageWidth: width,
      recognitions: [],
      // herb: [],
    };
  }

  onSelectModel(model) {
    this.setState({model});
    if (model == mobile) {
      var modelFile = 'models/model_100_class4.tflite';
      var labelsFile = 'models/model_100_class4.txt';
    }

    tflite.loadModel(
      {
        model: modelFile,
        labels: labelsFile,
      },
      (err, res) => {
        if (err) console.log(err);
        else console.log(res);
      },
    );
  }

  onSelectImage() {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        var path =
          Platform.OS === 'ios' ? response.uri : 'file://' + response.path;
        this.setState({
          source: {uri: path},
          imageHeight: 350,
          imageWidth: 350,
        });

        if (this.state.model) {
          tflite.runModelOnImage(
            {
              path,
              imageMean: 128.0,
              imageStd: 128.0,
              numResults: 3,
              threshold: 0.05,
            },
            (err, res) => {
              if (err) console.log(err);
              else this.setState({recognitions: res});
            },
          );
        }
      }
    });
  }

  renderResults() {
    const {model, recognitions, imageHeight, imageWidth} = this.state;
    if (model == mobile) {
      return recognitions.map((res, id) => {
        console.log(res);
        // var data;
        // const url = `http://192.168.100.27:3000/herb/` + res.index;
        // console.log(res.index);
        // console.log(url);
        // fetch(url)
        //   .then(response => response.json())
        //   .then(responseJson => {
        //     console.log(responseJson.detail.SPname);
        //     console.log(responseJson.detail.Pic);
        //     data = responseJson.detail;
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });

        return (
          <TouchableOpacity
            key={id}
            style={styles.result}
            onPress={() => {
              this.props.navigation.navigate('Predict', {index: res.index});
              // console.log(data.SPname);
            }}>
            {/* <Image
            style={{
              width: 200,
              height: 200,
              marginBottom: 3,
              borderRadius: 10,
              borderColor: '#000',
              marginLeft: 80,
            }}
            source={{uri: data.Pic}}
          /> */}
            <Text
              style={{
                color: '#006633',
                paddingLeft: 10,
                marginTop: 5,
                fontSize: 15,
                fontFamily: 'RobotoMono-VariableFont_wght',
                fontWeight: 'bold',
              }}
              onPress={() => {
                // console.log(data.SPname);
              }}>
              {/* {this.state.herb.SPname} */}
              {res['label'] + ' -' + (res['confidence'] * 100).toFixed(0) + '%'}
            </Text>

            <MaterialCommunityIcons
              name="eye"
              size={20}
              color="#000"
              style={{paddingLeft: 210}}
            />
            <Text
              style={{
                paddingLeft: 179,
                color: '#006633',
                fontSize: 13,
                fontFamily: 'RobotoMono-VariableFont_wght',
              }}>
              See Detail
            </Text>
          </TouchableOpacity>
        );
      });
    }
  }

  render() {
    const {model, source, imageHeight, imageWidth} = this.state;
    var renderButton = m => {
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={this.onSelectModel.bind(this, m)}>
          <Icon
            name="camera"
            size={50}
            color="#fff"
            style={{marginVertical: 10}}
          />
          <Text style={styles.buttonText}>{m}</Text>
        </TouchableOpacity>
      );
    };
    return (
      <View style={{flex: 1, backgroundColor: '#eff2f5', marginBottom: 100}}>
        <View style={{height: '35%'}}>
          <Image
            source={require('../assets/background.png')}
            resizeMode="cover"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#eff2f5',
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            marginTop: -40,
          }}>
          <ScrollView scrollEnable={true} showsVerticalScrollIndictor={true}>
            {model ? (
              <TouchableOpacity
                style={[
                  styles.imageContainer,
                  {
                    height: imageHeight,
                    width: imageWidth,
                    borderWidth: source ? 0 : 2,
                  },
                ]}
                onPress={this.onSelectImage.bind(this)}>
                {source ? (
                  <Image
                    source={source}
                    style={{
                      height: imageHeight,
                      width: imageWidth,
                    }}
                    resizeMode="contain"
                  />
                ) : (
                  <View>
                    <Text style={styles.text}>Select Picture</Text>
                    <Icon
                      name="image"
                      size={80}
                      color="#D3D3D3"
                      style={{paddingLeft: 45, marginTop: 105}}
                    />
                  </View>
                )}
              </TouchableOpacity>
            ) : (
              <View>
                <Icon
                  name="leaf"
                  size={150}
                  color="#009900"
                  style={{marginTop: 45, marginLeft: 30}}
                />
                <Text
                  style={{
                    marginLeft: 20,
                    color: '#000',
                    fontSize: 30,
                    fontFamily: 'RobotoMono-VariableFont_wght',
                    fontWeight: '500',
                    // marginTop: 30,
                  }}>
                  Ton Herb
                </Text>

                {renderButton(mobile)}
                {/* {renderButton(mobile)} */}
              </View>
            )}
            <View>{this.renderResults()}</View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    borderColor: '#009900',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    // marginLeft:30
  },
  text: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'RobotoMono-VariableFont_wght',
    fontWeight: '300',
  },
  button: {
    backgroundColor: '#191970',
    borderRadius: 10,
    height: 100,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 50,
    // marginLeft: 100
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '200',
    fontFamily: 'RobotoMono-VariableFont_wght',
  },
  box: {
    position: 'absolute',
    borderColor: blue,
    borderWidth: 2,
  },
  boxes: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  result: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 10,
    height: 70,
    width: 270,
    marginTop: 10,
    marginLeft: 40,
    marginBottom: 10,
  },
});
