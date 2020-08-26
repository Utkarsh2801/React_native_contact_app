import React, {useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AsyncStorage from '@react-native-community/async-storage';

import {Form, Item, Input} from 'native-base';

export default function AddNewContactScreen(props) {
  let getRandomColor = () => {
    let colors = [
      '#FF3E4D',
      '#FF3E4D',
      '#0A79DF',
      '#30336B',
      '#E74292',
      '#8B78E6',
      '#019031',
      '#BA2F16',
      '#192A56',
      '#EA7773',
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  };

  const [state, setState] = useState({
    fname: '',
    lname: '',
    phone: '',
    email: '',
    address: '',
    color: '',
  });

  let saveContact = async () => {
    let color = getRandomColor();

    if (
      state.fname !== '' &&
      state.lname !== '' &&
      state.phone !== '' &&
      state.email !== '' &&
      state.address !== ''
    ) {
      //create contact object
      var contact = {
        fname: state.fname,
        lname: state.lname,
        phone: state.phone,
        email: state.email,
        address: state.address,
        color,
      };

      await AsyncStorage.setItem(Date.now().toString(), JSON.stringify(contact))
        .then(() => {
          props.navigation.goBack();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Alert.alert('All fields are required');
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity
          style={styles.saveButtonAction}
          onPress={() => {
            saveContact();
          }}>
          <Text style={styles.saveContactText}>Save</Text>
        </TouchableOpacity>
      </View>

      <Form>
        <View style={styles.withIcon}>
          <View style={{paddingTop: 30}}>
            <Entypo name="user" size={20} color="#cccccc" />
          </View>
          <View style={styles.inputItems}>
            <Item style={styles.inputItem}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                placeholder="First Name"
                style={{
                  color: '#ffffff',
                  textDecorationLine: 'none',
                  fontSize: 15,
                }}
                placeholderTextColor="#cccccc"
                onChangeText={(fname) =>
                  setState({
                    ...state,
                    fname,
                  })
                }></Input>
            </Item>
            <Item style={styles.inputItem}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Last Name"
                keyboardType="default"
                style={{
                  color: '#ffffff',
                  textDecorationLine: 'none',
                  fontSize: 15,
                }}
                placeholderTextColor="#cccccc"
                onChangeText={(lname) =>
                  setState({
                    ...state,
                    lname,
                  })
                }></Input>
            </Item>
          </View>
        </View>
        <View style={styles.withIcon}>
          <View style={{paddingTop: 30}}>
            <FontAwesome name="phone" size={25} color="#cccccc" />
          </View>
          <View style={styles.inputItems}>
            <Item style={styles.inputItem}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="number-pad"
                placeholder="Phone"
                style={{color: '#ffffff'}}
                style={{
                  color: '#ffffff',
                  textDecorationLine: 'none',
                  fontSize: 15,
                }}
                placeholderTextColor="#cccccc"
                onChangeText={(phone) =>
                  setState({
                    ...state,
                    phone,
                  })
                }></Input>
            </Item>
          </View>
        </View>
        <View style={styles.withIcon}>
          <View style={{paddingTop: 30}}>
            <MaterialIcons name="email" size={25} color="#cccccc" />
          </View>
          <View style={styles.inputItems}>
            <Item style={styles.inputItem}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="Email"
                style={{
                  color: '#ffffff',
                  textDecorationLine: 'none',
                  fontSize: 15,
                }}
                placeholderTextColor="#cccccc"
                onChangeText={(email) =>
                  setState({
                    ...state,
                    email,
                  })
                }></Input>
            </Item>
          </View>
        </View>
        <View style={styles.withIcon}>
          <View style={{paddingTop: 30}}>
            <FontAwesome name="address-card" size={25} color="#cccccc" />
          </View>
          <View style={styles.inputItems}>
            <Item style={styles.inputItem}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                placeholder="Address"
                style={{
                  color: '#ffffff',
                  textDecorationLine: 'none',
                  fontSize: 15,
                }}
                placeholderTextColor="#cccccc"
                onChangeText={(address) =>
                  setState({
                    ...state,
                    address,
                  })
                }></Input>
            </Item>
          </View>
        </View>
      </Form>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#213135',
    paddingTop: 10,
  },
  inputItem: {
    margin: 10,
  },
  button: {
    backgroundColor: '#B83227',
    marginTop: 40,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  empty: {
    height: 500,
  },
  saveButtonAction: {
    flexDirection: 'row',
    backgroundColor: '#0ABDE3',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 25,
  },
  saveContactText: {
    color: '#ffffff',
  },
  saveButtonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingBottom: 30,
    marginTop: 10,
  },
  withIcon: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 20,
  },
  inputItems: {
    width: '80%',
    marginLeft: 5,
  },
});
