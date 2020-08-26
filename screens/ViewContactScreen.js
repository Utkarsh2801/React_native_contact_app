import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import {CardItem} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';

export default function ViewContactScreen(props) {
  const [state, setState] = useState({
    fname: '',
    lname: '',
    phone: '',
    email: '',
    address: '',
    key: '',
  });

  useEffect(() => {
    const {navigation} = props;
    navigation.addListener('focus', () => {
      var key = props.route.params['key'];
      getContact(key);
    });
  }, []);

  let getContact = async (key) => {
    await AsyncStorage.getItem(key)
      .then((contactjsonString) => {
        var contact = JSON.parse(contactjsonString);
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

  let callAction = (phone) => {
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telpromt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let smsAction = (phone) => {
    let phoneNumber = phone;
    phoneNumber = `sms:${phone}`;

    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let editContact = (key) => {
    props.navigation.navigate('Edit', {
      key,
    });
  };

  let deleteContact = (key) => {
    Alert.alert('Delete Contact ?', `${state.fname} ${state.lname}`, [
      {
        text: 'Cancel',
        onPress: () => console.log('cancel tapped'),
      },
      {
        text: 'OK',
        onPress: async () => {
          await AsyncStorage.removeItem(key)
            .then(() => {
              props.navigation.goBack();
            })
            .catch((err) => {
              console.log(err);
            });
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={[styles.contactIconContainer, {backgroundColor: state.color}]}>
        <Text style={styles.contactIcon}>
          {state.fname ? state.fname[0].toUpperCase() : ''}
        </Text>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {state.fname ? state.fname : ''} {state.lname ? state.lname : ''}
          </Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View>
          <CardItem style={styles.cardItem}>
            <Text style={styles.infoText}>Phone</Text>
          </CardItem>
          <CardItem
            style={[
              styles.cardItem,
              {
                borderBottomWidth: 1,
                borderBottomColor: 'rgba(218,224,226,0.9)',
                paddingBottom: 15,
              },
            ]}>
            <Text style={styles.infoData}>
              {state.phone ? state.phone : ''}
            </Text>
          </CardItem>
        </View>
        <View>
          <CardItem style={styles.cardItem}>
            <Text style={styles.infoText}>Email</Text>
          </CardItem>
          <CardItem
            style={[
              styles.cardItem,
              {
                borderBottomWidth: 1,
                borderBottomColor: 'rgba(218,224,226,0.9)',
                paddingBottom: 20,
              },
            ]}>
            <Text style={styles.infoData}>
              {state.email ? state.email : ''}
            </Text>
          </CardItem>
        </View>
        <View>
          <CardItem style={styles.cardItem}>
            <Text style={styles.infoText}>Address</Text>
          </CardItem>
          <CardItem style={styles.cardItem}>
            <Text style={[styles.infoData, {paddingBottom: 20}]}>
              {state.address ? state.address : ''}
            </Text>
          </CardItem>
        </View>
      </View>

      <View style={styles.editButtonContainer}>
        <TouchableOpacity
          style={styles.editButtonAction}
          onPress={() => {
            editContact(state.key);
          }}>
          <Entypo name="edit" size={20} color="#ffffff" />
          <Text style={styles.editContactText}>Edit Contact</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionContainer}>
        <CardItem style={styles.actionButton}>
          <TouchableOpacity
            onPress={() => {
              smsAction(state.phone);
            }}>
            <Entypo name="message" size={25} color="#fff" />
          </TouchableOpacity>
        </CardItem>
        <CardItem style={styles.actionButton}>
          <TouchableOpacity
            onPress={() => {
              callAction(state.phone);
            }}>
            <Entypo name="phone" size={25} color="#fff" />
          </TouchableOpacity>
        </CardItem>

        <CardItem style={styles.actionButton}>
          <TouchableOpacity
            onPress={() => {
              deleteContact(state.key);
            }}>
            <Entypo name="trash" size={25} color="#fff" />
          </TouchableOpacity>
        </CardItem>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#213135',
  },
  contactIconContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactIcon: {
    fontSize: 100,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '10%',
  },
  nameContainer: {
    width: '100%',
    height: 50,
    padding: 10,
    backgroundColor: 'rgba(75,75,75,0.6)',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
  name: {
    fontSize: 24,
    color: '#000',
    fontWeight: '900',
    fontFamily: 'Acme-Regular',
    color: '#ffffff',
  },
  infoText: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Kanit-Regular',
    color: '#ffffff',
  },
  infoData: {
    color: '#ffffff',
  },
  actionContainer: {
    position: 'absolute',
    right: 10,
    top: 15,
    backgroundColor: 'transparent',
  },
  actionButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingTop: 0,
  },
  actionText: {
    color: '#B83227',
    fontWeight: '900',
  },
  infoContainer: {
    flexDirection: 'column',
    // backgroundColor: '#213135',
    marginTop: 10,
  },
  cardItem: {
    backgroundColor: '#213135',
    paddingTop: 8,
    paddingBottom: 5,
  },
  editButtonAction: {
    flexDirection: 'row',
    backgroundColor: '#0ABDE3',
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 25,
  },
  editContactText: {
    color: '#ffffff',
    paddingLeft: 8,
  },
  editButtonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 20,
  },
});
