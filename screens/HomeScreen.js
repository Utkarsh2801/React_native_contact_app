import React, {useState, useEffect} from 'react';

import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {Card} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';

export default function HomeScreen(props) {
  const [state, setState] = useState({
    data: [],
    loaded: false,
  });

  useEffect(() => {
    const {navigation} = props;
    navigation.addListener('focus', () => {
      getAllContacts();
    });
  }, []);

  let getAllContacts = async () => {
    await AsyncStorage.getAllKeys()
      .then((keys) => {
        // console.log(keys);
        return AsyncStorage.multiGet(keys)
          .then((result) => {
            setState({
              ...state,
              data: result.sort((a, b) => {
                if (JSON.parse(a[1]).fname < JSON.parse(b[1]).fname) return -1;
                if (JSON.parse(a[1]).fname > JSON.parse(b[1]).fname) return 1;

                return 0;
              }),
              loaded: true,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={state.data}
        renderItem={({item}) => {
          let contact = JSON.parse(item[1]);
          return (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('View', {
                  key: item[0].toString(),
                });
              }}>
              <View style={styles.listItem}>
                <View
                  style={[
                    styles.iconContainer,
                    {backgroundColor: contact.color},
                  ]}>
                  <Text style={styles.contactIcon}>
                    {contact.fname[0].toUpperCase()}
                  </Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>
                    {contact.fname} {contact.lname}
                  </Text>
                  <Text style={styles.infoText}>{contact.phone}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => item[0].toString()}
      />
      <TouchableOpacity
        style={styles.floatButton}
        onPress={() => {
          props.navigation.navigate('Add');
        }}>
        <Entypo name="plus" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#213135',
  },
  listItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    marginTop: 0,
    marginBottom: 0,
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#B83227',
    borderRadius: 100,
  },
  contactIcon: {
    fontSize: 28,
    color: '#fff',
    fontFamily: 'Acme-Regular',
  },
  infoContainer: {
    flexDirection: 'column',
  },
  infoText: {
    fontSize: 16,
    fontWeight: '400',
    paddingLeft: 10,
    paddingTop: 2,
    color: '#fff',
  },
  floatButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 60,
    backgroundColor: '#0ABDE3',
    borderRadius: 100,
  },
});
