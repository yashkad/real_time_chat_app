import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import commonStyles from '../styles/common.styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Chats = props => {
  const {room, userName, Socket} = props.route.params;
  const [message, setMessage] = useState('');

  const [allMessages, setAllMessages] = useState([]);

  const sendMessage = async () => {
    if (message.trim() != '') {
      const data = {
        message: message.trim(),
        room,
        author: userName,
        time: getTime(),
        user_id: Socket.id,
      };
      await Socket.emit('send_message', data);
      setAllMessages(prev => [...prev, data]);
      setMessage('');
      Keyboard.dismiss();
    }
    console.log('Allmessages ', allMessages);
  };

  const getTime = () => {
    let hr = new Date(Date.now()).getHours();
    let min = new Date(Date.now()).getMinutes();
    let ampm = hr >= 12 ? 'am' : 'pm';
    hr = hr > 12 ? hr - 12 : hr;

    let time = hr + ':' + min + ' ' + ampm;
    return time;
  };

  useEffect(() => {
    Socket.on('recieve_message', message => {
      console.log('Message recieved ', message);
      setAllMessages(prev => [...prev, message]);
      console.log('allMessage : ', allMessages);
    });
  }, [Socket]);

  useEffect(() => {
    console.log('Socket : ', Socket);
  }, [message]);
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          padding: hp(1.4),
          paddingHorizontal: wp(5),
          justifyContent: 'center',
          alignItems: item.user_id == Socket.id ? 'flex-end' : 'flex-start',
        }}>
        <Text
          style={{
            backgroundColor: item.user_id == Socket.id ? '#718093' : '#00a8ff',

            paddingHorizontal: hp(2),
            paddingVertical: hp(1),
            borderRadius: hp(2),
            color: 'white',
            maxWidth: wp(50),
            lineHeight: hp(3),
          }}>
          {item.message}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: hp(1.4),
            }}>
            {item.author}
          </Text>
          <Text
            style={{
              fontSize: hp(1),
              marginLeft: wp(1),
            }}>
            {item.time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={commonStyles.container}>
      <View style={{backgroundColor: '#4834d4', paddingVertical: hp(1.5)}}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            textTransform: 'capitalize',
            fontWeight: 'bold',
            fontSize: hp(3),
          }}>
          {userName}
        </Text>
        <Text
          style={{textAlign: 'center', color: '#dcdde1', fontWeight: 'bold'}}>
          {room}
        </Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={allMessages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListFooterComponent={() => <View style={{height: hp(20)}}></View>}
      />

      <View style={styles.bottomBar}>
        <TextInput
          placeholder="Enter your message"
          value={message}
          onChangeText={text => setMessage(text)}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => sendMessage()} style={styles.sendBtn}>
          <Text style={{color: 'white'}}> {'>'} </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#130f40',
    flex: 1,
    paddingLeft: wp(5),
    backgroundColor: 'white',
    color: 'black',
  },
  bottomBar: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: hp(3),
    right: 0,
    left: 0,
    marginHorizontal: wp(5),
    justifyContent: 'space-between',
  },
  sendBtn: {
    backgroundColor: '#4834d4',
    padding: hp(2),
  },
});
