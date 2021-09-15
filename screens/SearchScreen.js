import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FindData: '',
      SPname: '',
      Cname: '',
      Sname: '',
      Family: '',
      // URL: '',
      Root: '',
      Stem: '',
      Leaf: '',
      Flower: '',
      Fruit: '',
      Seed: '',
      // image: '',
    };
  }

  SearchRecord = () => {
    var FindData = this.state.FindData;

    if (FindData.length == 0) {
      alert('Please fill in...');
    } else {
      var SearchAPIURL = 'http://172.20.10.4:81/herb/search.php';
      // var SearchAPIURL = 'http://192.168.100.27:8080/herb/search.php';

      var header = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      var Data = {
        FindData: FindData,
      };
      fetch(SearchAPIURL, {
        method: 'POST',
        header: header,
        body: JSON.stringify(Data),
      })
        .then(response => response.json())
        .then(response => {
          this.setState({SPname: response[0].SPname});
          this.setState({Cname: response[0].Cname});
          this.setState({Sname: response[0].Sname});
          this.setState({Family: response[0].Family});
          // this.setState({Pic: response[0].Pic});
          this.setState({Root: response[0].Root});
          this.setState({Stem: response[0].Stem});
          this.setState({Leaf: response[0].Leaf});
          this.setState({Flower: response[0].Flower});
          this.setState({Fruit: response[0].Fruit});
          this.setState({Seed: response[0].Seed});
        })
        .catch(error => {
          alert(error);
          console.log(error);
        });
    }
  };
  render() {
    return (
      <ScrollView
        style={styles.container}
        scrollEnable={true}
        showsVerticalScrollIndictor={true}>
        <Ionicons
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
          Search
        </Text>
        <View style={{backgroundColor: '#c0e7cd'}}>
          <TextInput
            placeholder={'Search'}
            style={styles.txtinput}
            onChangeText={FindData => this.setState({FindData})}
          />
          <Icon style={styles.icon} name="search" size={20} color="#ddd" />
        </View>
        <TouchableOpacity onPress={this.SearchRecord} style={styles.area}>
          <Text style={styles.paragraph}>Search</Text>
        </TouchableOpacity>
        <View style={styles.list}>
          {/* <Image
            style={{width: 80, height: 80, marginBottom: 3}}
            source={{uri: this.state.image}}
          /> */}
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 10,
              marginBottom: 5,
              color: '#006400',
              fontFamily: 'RobotoMono-VariableFont_wght',
            }}>
            {this.state.SPname} ({this.state.Cname})
          </Text>
          <Text style={{color: '#000'}}>{this.state.Sname}</Text>
          <Text style={{color: '#000', textTransform: 'uppercase'}}>
            {this.state.Family}
          </Text>
          <Text style={styles.txtlist}>ลักษณะ</Text>
          <Text style={styles.txtlist}>ราก</Text>
          <Text style={{color: '#000'}}> {this.state.Root}</Text>
          <Text style={styles.txtlist}>ลำต้น</Text>
          <Text style={{color: '#000'}}> {this.state.Stem}</Text>
          <Text style={styles.txtlist}>ใบ</Text>
          <Text style={{color: '#000'}}> {this.state.Leaf}</Text>
          <Text style={styles.txtlist}>ดอก</Text>
          <Text style={{color: '#000'}}> {this.state.Flower}</Text>
          <Text style={styles.txtlist}>ผล</Text>
          <Text style={{color: '#000'}}> {this.state.Fruit}</Text>
          <Text style={styles.txtlist}>เมล็ด</Text>
          <Text style={{color: '#000'}}> {this.state.Seed}</Text>
        </View>
      </ScrollView>
    );
  }
}

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c0e7cd',
    // marginBottom: 100
    
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
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    marginTop: 20,
    marginBottom: 100
  },

  txtlist: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
    fontFamily: 'K2D-Light',
  },
  paragraph: {
    margin: 5,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'K2D-Light',
  },
  area: {
    backgroundColor: '#00a352',
    borderRadius: 20,
    borderWidth: 2,
    padding: 2,
    borderColor: '#00a352',
    marginHorizontal: 150,
    
  },
  txtStyle: {
    borderBottomWidth: 1,
    borderBottomColor: 'red',
    marginBottom: 20,
  },
});
