import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import commonStyles from '../styles/common.styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import InputBox from '../components/InputBox';
import io from 'socket.io-client';

// const ENDPOINT = 'https://chatting-native.herokuapp.com/';
// const ENDPOINT = 'http://192.168.1.13:4444'
const ENDPOINT = 'https://salty-escarpment-48130.herokuapp.com';

const Socket = io.connect(ENDPOINT);

const Home = props => {
  const [userName, setUserName] = useState('');
  const [room, setRoom] = useState('12345');

  const joinRoom = async () => {
    if (userName !== '' && room != '') {
      await Socket.emit('join_room', room);
      props.navigation.navigate('Chats', {
        userName: userName,
        room: room,
        Socket: Socket,
      });
    }
  };
  return (
    <ScrollView style={commonStyles.container}>
      <View style={styles.body}>
        <View style={styles.topView}>
          <Text style={styles.heading}>Chating Rooms</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Welcome in spacy!</Text>

          <View style={{marginHorizontal: wp(10), marginTop: hp(5)}}>
            <InputBox
              type="text"
              value={userName}
              onChange={setUserName}
              placeholder="Insert your username"
            />
            <InputBox
              type="number"
              value={room}
              onChange={setRoom}
              placeholder="Insert room id or create one"
              style={{marginTop: hp(3)}}
            />
            <TouchableOpacity onPress={() => joinRoom()}>
              <Text style={styles.button}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#4834d4',
    flex: 1,
    justifyContent: 'center',
  },
  topView: {
    height: hp(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderTopRightRadius: wp(10),
    borderTopLeftRadius: wp(10),
    flex: 1,
    paddingVertical: hp('5%'),
    height: hp(50),
  },
  heading: {
    color: 'white',
    fontSize: 30,
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: hp('3%'),
    color: 'black',
    fontWeight: 'bold',
  },
  button: {
    textAlign: 'center',
    backgroundColor: '#4834d4',
    color: 'white',
    fontSize: hp('3%'),
    borderRadius: hp(1),
    marginTop: hp(5),
    padding: hp(1.5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});
