import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import PushNotification from 'react-native-push-notification';
import OneSignal from 'react-native-onesignal';
import PushController from './components/PushController';

import './config/ReactotronConfig';

// import Routes from './routes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn1: {
    backgroundColor: '#39F',
    borderRadius: 5,
    padding: 20,
  },
  btn2: {
    backgroundColor: '#F39',
    borderRadius: 5,
    padding: 20,
  },
  btn3: {
    backgroundColor: '#9F3',
    borderRadius: 5,
    padding: 20,
  },
  txt: {
    color: '#FFF',
  },
});

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // seconds: 60,
    };

    OneSignal.init('36a5bc55-52b8-4a1a-9ba6-71c313ab109f');
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);

    console.log('Teste log');
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived = data => {
    console.tron.log(`OneSignal - onReceived: ${data}`);
    console.log(`OneSignal - onReceived`);
    console.log(data);
  };

  onOpened = notification => {
    console.tron.log('OneSignal - onOpened');
  };

  onIds = id => {
    console.tron.log('OneSignal - onIds');
  };

  sendInstantNotification = () => {
    PushNotification.localNotification({
      /* Android Only Properties */
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      message: 'Notificação instantânea!', // (required)
    });

    console.tron.log('Hi');
  };

  sendTimedNotification = () => {
    PushNotification.localNotificationSchedule({
      message: 'Norificação em 1 min', // (required)
      date: new Date(Date.now() + 60 * 1000), // in 60 sec
    });

    console.tron.log(`date.now: ${new Date(Date.now())} + 1 min`);
  };

  sendScheduledNotification = () => {
    PushNotification.localNotificationSchedule({
      message: 'Norificação do horário marcado', // (required)
      date: new Date('2019-07-29T15:15:00'),
    });

    console.tron.log(
      `date.now: ${new Date(Date.now())} ---> até horário marcado!`
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btn1}
          onPress={this.sendInstantNotification}
        >
          <Text style={styles.txt}>envia notif agora</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn2}
          onPress={this.sendTimedNotification}
        >
          <Text style={styles.txt}>inicia timer de 1 minuto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn3}
          onPress={this.sendScheduledNotification}
        >
          <Text style={styles.txt}>agenda notif para horário marcado</Text>
        </TouchableOpacity>

        <PushController />
      </View>
    );
  }
}
