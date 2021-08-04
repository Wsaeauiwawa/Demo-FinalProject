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
    };
  }

  onSelectModel(model) {
    this.setState({model});
    if (model == mobile) {
      var modelFile = 'models/model_fp32.tflite';
      var labelsFile = 'models/model.txt';
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
        // var w = response.width;
        // var h = response.height;
        this.setState({
          source: {uri: path},
          // imageHeight: h * width / w,
          // imageWidth: width
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
        // console.log(id)
        console.log(res.index);
        return (
          <TouchableOpacity
            style={{
              backgroundColor: blue,
              borderRadius: 10,
              height: 60,
              width: 250,
              marginTop: 10,
              marginLeft: 50,
              marginBottom: 10,
            }}
            onPress={() => {
              this.props.navigation.navigate('Predict', {index: res.index});
            }}>
            <Text key={res['index']} style={{color: '#000', paddingLeft: 10, marginTop: 15, fontSize:15, fontFamily: 'RobotoMono-VariableFont_wght'}}>
              {res['label'] + ' -' + (res['confidence'] * 100).toFixed(0) + '%'}
            </Text>
            <Icon
              name="arrow-right"
              size={20}
              color="#D3D3D3"
              style={{paddingLeft: 220}}
            />
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
      <View style={{flex: 1, backgroundColor: '#eff2f5', marginBottom:100}}>
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
                  <Text style={styles.text}>Select Picture</Text>
                )}
              </TouchableOpacity>
            ) : (
              <View>
              <Icon
                    name="leaf"
                    size={150}
                    color="#009900"
                    style={{marginTop: 45,marginLeft: 30}}
                  />
                <Text
                  style={{
                    marginLeft: 20,
                    color: '#000',
                    fontSize: 30,
                    fontFamily: 'RobotoMono-VariableFont_wght',
                    fontWeight: '500'
                    // marginTop: 30,
                  }}>
                  Leaf Herb
                </Text>
                
                {renderButton(mobile)}
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
    borderColor: blue,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    // marginLeft:30
  },
  text: {
    color: '#000',
    fontSize:20,
    fontFamily:'RobotoMono-VariableFont_wght',
    fontWeight: '300'
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
    fontFamily:'RobotoMono-VariableFont_wght'
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
});
