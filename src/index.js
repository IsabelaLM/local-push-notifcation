import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import PushNotification from 'react-native-push-notification';
import OneSignal from 'react-native-onesignal';
import axios from 'axios';

import PushController from './components/PushController';
import api from './services/api';
import OneSignalCredentials from '../credentials/onesignal';

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
  btn4: {
    backgroundColor: '#333',
    borderRadius: 5,
    padding: 20,
  },
  btn5: {
    backgroundColor: '#339',
    borderRadius: 5,
    padding: 20,
  },
  btn6: {
    backgroundColor: '#C93',
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

  sendOneSignalNotification = async () => {
    console.log('Teste OneSiganl REST API & .postNotification()');

    const otherParameters = {};
    const data = 'Teste de mensagem usando postNotification!';
    const contents = {
      en: 'You got notification from user',
    };

    try {
      OneSignal.postNotification(
        contents,
        data,
        'd79eae26-fc27-44db-97f1-6ce733655f6c',
        otherParameters
      );
      // const response = await api.get(`/apps`);
      // console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  sendNotificationWithFetch = () => {
    const data = 'teste com fetch... escondendo credentials';

    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Basic ${OneSignalCredentials.apiKey}`,
    };

    const endpoint = 'https://onesignal.com/api/v1/notifications';

    const params = {
      method: 'POST',
      headers,
      body: JSON.stringify({
        app_id: OneSignalCredentials.app_id,
        included_segments: ['All'],
        contents: { en: data },
      }),
    };
    fetch(endpoint, params).then(res => console.log(res));
  };

  sendNotificationWithAxios = async () => {
    const NotificationData = 'teste com axios!';

    // const headers = {
    //   'Content-Type': 'application/json; charset=utf-8',
    //   Authorization: `Basic ${OneSignalCredentials.apiKey}`,
    // };

    // const endpoint = 'https://onesignal.com/api/v1/notifications';

    // const config = {
    //   url: endpoint,
    //   method: 'POST',
    //   headers,
    //   data: {
    //     app_id: OneSignalCredentials.app_id,
    //     included_segments: ['All'],
    //     contents: { en: NotificationData },
    //   },
    // };

    // try {
    //   const response = await axios(config);
    //   console.log(response);
    // } catch (err) {
    //   console.log(err);
    // }

    // const apiTest = axios.create({
    //   baseURL: 'https://onesignal.com/api/v1',
    //   headers,
    // });

    const configTest = {
      url: '/notifications',
      method: 'POST',
      data: {
        app_id: OneSignalCredentials.app_id,
        included_segments: ['All'],
        contents: { en: NotificationData },
      },
    };

    console.log('--- teste 5 ---');

    try {
      const response = await api(configTest);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  getInfoWithAxios = async () => {
    const configTest = {
      url: '/apps',
      method: 'GET',
      headers: {
        Authorization: `Basic ${OneSignalCredentials.userKey}`,
      },
      // data: {
      //   app_id: OneSignalCredentials.app_id,
      //   contents: {},
      // },
    };

    console.log('--- teste 11 ---');

    try {
      const response = await api(configTest);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
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

        <TouchableOpacity
          style={styles.btn4}
          onPress={this.sendNotificationWithFetch}
        >
          <Text style={styles.txt}>testa OneSignal REST API</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn5}
          onPress={this.sendNotificationWithAxios}
        >
          <Text style={styles.txt}>testa OneSignal REST API com AXIOS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn6} onPress={this.getInfoWithAxios}>
          <Text style={styles.txt}>testa GET com AXIOS</Text>
        </TouchableOpacity>

        <PushController />
      </View>
    );
  }
}
