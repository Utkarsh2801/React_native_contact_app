import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {Form, Item, Input} from 'native-base';

export default function EditContactScreen(props) {
  const [state, setState] = useState({
    fname: '',
    lname: '',
    phone: '',
    email: '',
    address: '',
    key: '',
  });

  let getContact = async (key) => {
    await AsyncStorage.getItem(key)
      .then((contactJsonString) => {
        var contact = JSON.parse(contactJsonString);
        contact['key'] = key;
        setState({
          ...state,
          ...contact,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let updateContact = async (key) => {
    if (
      state.fname !== '' &&
      state.lname !== '' &&
      state.phone !== '' &&
      state.email !== '' &&
      state.address !== ''
    ) {
      var contact = {
        fname: state.fname,
        lname: state.lname,
        phone: state.phone,
        email: state.email,
        address: state.address,
      };

      await AsyncStorage.mergeItem(key, JSON.stringify(contact))
        .then(() => {
          props.navigation.goBack();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const {navigation} = props;
    navigation.addListener('focus', () => {
      var key = props.route.params['key'];
      getContact(key);
    });
  }, []);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity
          style={styles.saveButtonAction}
          onPress={() => {
            updateContact(state.key);
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
                value={state.fname ? state.fname : ''}
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
                value={state.lname ? state.lname : ''}
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
                value={state.phone ? state.phone : ''}
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
                value={state.email ? state.email : ''}
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
                value={state.address ? state.address : ''}
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
