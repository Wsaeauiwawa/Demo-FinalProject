import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Button,
  ScrollView,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
    const url = `http://192.168.100.27:3000/herb/` + this.state.index;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        // console.log(responseJson);
        this.setState(
          {
            herb: responseJson.detail,
          },
          function () {
            // console.log(this.state.herb);
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
      <ScrollView
        style={styles.container}
        scrollEnable={true}
        showsVerticalScrollIndictor={true}>
        <Icon
          name="leaf-outline"
          size={50}
          color="#000"
          style={{marginLeft: 175, marginTop: 15}}
        />
        <Text
          style={{
            fontSize: 25,
            fontFamily: 'RobotoMono-VariableFont_wght',
            color: '#000',
            marginLeft: 160,
            fontWeight: '500',
          }}>
          Result
        </Text>

        <View style={styles.list}>
          <Image
            style={{
              width: 200,
              height: 200,
              marginBottom: 3,
              borderRadius: 10,
              borderColor: '#000',
              marginLeft: 80,
            }}
            source={{uri: this.state.herb.Pic}}
          />
          <Text style={styles.txtlist}>{this.state.herb.SPname}</Text>
          <Text style={{color: '#696969'}}>{this.state.herb.Cname}</Text>
          <Text style={{color: '#696969'}}>{this.state.herb.Sname}</Text>
          <Text style={{color: '#696969'}}>{this.state.herb.Family}</Text>
          <Text style={styles.txtlist}>ลักษณะ</Text>
          <Text style={styles.txtlist}>ราก</Text>
          <Text style={{color: '#696969'}}>{this.state.herb.Root}</Text>
          <Text style={styles.txtlist}>ลำต้น</Text>
          <Text style={{color: '#696969'}}>{this.state.herb.Stem}</Text>
          <Text style={styles.txtlist}>ใบ</Text>
          <Text style={{color: '#696969'}}>{this.state.herb.Leaf}</Text>
          <Text style={styles.txtlist}>ดอก</Text>
          <Text style={{color: '#696969'}}>{this.state.herb.Flower}</Text>
          <Text style={styles.txtlist}>ผล</Text>
          <Text style={{color: '#696969'}}>{this.state.herb.Fruit}</Text>
          <Text style={styles.txtlist}>เมล็ด</Text>
          <Text style={{color: '#000'}}>{this.state.herb.Seed}</Text>
          {/* <Text
            style={{color: 'blue'}}
            onPress={() => Linking.openURL(this.state.herb.Pic)}>
            อ่านเพิ่มเติม
          </Text> */}
        </View>

        {/* {renderHeader()} */}
      </ScrollView>
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
    backgroundColor: '#F8F8FF',
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
    backgroundColor: '#fff',
    marginTop: 10,
    marginBottom: 10,
  },

  txtlist: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#000',
    fontFamily: 'RobotoMono-VariableFont_wght',
  },
});
