import React, { Component } from 'react';
import { Platform, StyleSheet, Image, Text, View, TouchableOpacity, Button } from 'react-native';
import Tflite from 'tflite-react-native';
import ImagePicker from 'react-native-image-picker';

let tflite = new Tflite();

const height = 350;
const width = 350;
const blue = "#25d5fd";
const mobile = "Classify";

export default class HomeScreen extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      model: null,
      source: null,
      imageHeight: height,
      imageWidth: width,
      recognitions: []

    };
  }

  onSelectModel(model) {
    this.setState({ model });
    if (model == mobile) {
        var modelFile = 'models/model_fp32.tflite';
        var labelsFile = 'models/model.txt';
    }
    else {
      var modelFile = 'models/model_fp32.tflite';
      var labelsFile = 'models/model.txt';
    }

    tflite.loadModel({
      model: modelFile,
      labels: labelsFile,
    },
      (err, res) => {
        if (err)
          console.log(err);
        else
          console.log(res);
      }
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
     ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        var path = Platform.OS === 'ios' ? response.uri : 'file://' + response.path;
        var w = response.width;
        var h = response.height;
        this.setState({
          source: { uri: path },
          imageHeight: h * width / w,
          imageWidth: width
        });
        if (this.state.model) {
            tflite.runModelOnImage({
              path,
              imageMean: 128.0,
              imageStd: 128.0,
              numResults: 3,
              threshold: 0.05
            },
              (err, res) => {
                if (err)
                  console.log(err);
                else
                  this.setState({ recognitions: res });
              });
        }

      }
    });
  }

   renderResults() {
    const { model, recognitions, imageHeight, imageWidth } = this.state;
    if (model == mobile) {
        return recognitions.map((res, id) => {
          // console.log(id)
          console.log(res)
          return (
            <TouchableOpacity onPress={() => { this.props.navigation.navigate("Details") }} >
            <Text key={id} style={{ color: '#fff' }}>
              {res["label"] + "-" + (res["confidence"] * 100).toFixed(0) + "%"}
            </Text>
            </TouchableOpacity>
          )
        });
    }
  }

  render() {
   const { model, source, imageHeight, imageWidth } = this.state;
    var renderButton = (m) => {
      //  console.log(m)
      return (
        <TouchableOpacity style={styles.button} onPress={this.onSelectModel.bind(this, m)}>
          <Text style={styles.buttonText}>{m}</Text>
        </TouchableOpacity>
         
      );
    }
    return(
      <View style={styles.container}>
      {model ?
          <TouchableOpacity style={
            [styles.imageContainer, {
              height: imageHeight,
              width: imageWidth,
              borderWidth: source ? 0 : 2
            }]} onPress={this.onSelectImage.bind(this)}>
            {
              source ?
                <Image source={source} style={{
                  height: imageHeight, width: imageWidth
                }} resizeMode="contain" /> :
                <Text style={styles.text}>Select Picture</Text>
            }
            <View style={styles.boxes}>
              {this.renderResults()}
            </View>
          </TouchableOpacity>
          
          :
          <View>
            {renderButton(mobile)}
          </View>
          
        }
        {/* <Button title="Back" onPress={() => { this.props.navigation.navigate("Details") }} /> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  imageContainer: {
    borderColor: blue,
    borderRadius: 5,
    alignItems: "center"
  },
  text: {
    color: blue
  },
  button: {
    width: 200,
    backgroundColor: blue,
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 15
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
  }
});