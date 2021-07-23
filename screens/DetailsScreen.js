import React from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DetailsScreen = ({navigation}) => {

  function renderHeader() {
    return (
      <View
        style={{
          position: 'absolute',
          top: 15,
          left: 10,
          right: 10
        }}
      >
      <View style={{flexDirection: 'row'}}>
        <View style={{ flex: 1}}>
        <TouchableOpacity
            style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.5)' }}
            onPress={() => { navigation.navigate("Home") }}
        >
          <Image
            source={require('../assets/icons/back.png')}
            resizeMode="contain"
            style={{
             width: 15,
             height: 15
            }}
          />
        </TouchableOpacity>
        </View>
      </View>
      
      </View>
    )
    
  }

  return (
    <View style={styles.container}>
      {/* Banner Photo */}
      <View style={{height: "35%"}}>
        <Image
          source={require('../assets/background.png')}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
        <View 
          style={{
            flex: 1,
            marginTop: -40,
            backgroundColor: '#eff2f5',
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            paddingVertical: 24
            
          }}
        >
        </View>
      </View>
      {renderHeader()}
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
