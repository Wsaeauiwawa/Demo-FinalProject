import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Button
} from 'react-native';

export default class Tab1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      herb: [],
      index: props.route.params.index,
    };
  }
 
  componentDidMount() {
    // console.log(this.state.index);
    const url = `http://localhost:3000/herb/`+this.state.index;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        // console.log(responseJson);
        this.setState(
          {
            herb: responseJson.detail,
          },
          function () {
            console.log(this.state.herb);
          },
        );
        // console.log(responseJson.detail)
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    
    return (
      <View style={styles.container}>
        <View style={styles.list}>
          {/* <Image
            style={{width: 80, height: 80, marginBottom: 3}}
            source={{uri: item.image}}
          /> */}
          <Text style={styles.txtlist}>{this.state.herb.name}</Text>
          <Text style={{color: '#fff'}}>ชื่อสามัญ: {this.state.herb.common_name}</Text>
        </View>

        {/* {renderHeader()} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00a352',
  },

  txt: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  header: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  txtinput: {
    padding: 7,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    fontSize: 16,
    margin: 15,
    paddingLeft: 30,
    backgroundColor: '#fff',
  },

  icon: {
    position: 'absolute',
    left: 22,
    top: 22,
  },

  list: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#00a352',
  },

  txtlist: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
    fontFamily: 'K2D-Light',
  },
});
