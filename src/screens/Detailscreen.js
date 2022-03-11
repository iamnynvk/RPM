import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import CardView from '../components/CardView';
import {NAVIGATION} from '../constants/navigation';

const Detailscreen = props => {
  const [patientData, setPatientData] = useState([]);
  const [temp, setTemp] = useState();
  const [spo2, setSpo2] = useState();
  const [bp, setBp] = useState();
  const [weight, setWeight] = useState();
  const [glucose, setGlucose] = useState();
  const [pulse, setPulse] = useState();
  const [visible, setVisible] = useState(true);

  // get Patients ID & MAC Address
  const {patientID, MACAddress} = props.route.params;

  useEffect(() => {
    fetch(
      `http://167.71.225.187:9000/vitals/${patientID}/${MACAddress}/lastVitals/`,
    ).then(res => {
      res.json().then(data => {
        setPatientData(data.payload);

        const DetailData = data.payload;

        DetailData.map(item => {
          if (item.vital == 'temp') {
            setTemp(item.value1);
          } else if (item.vital == 'spo2') {
            setSpo2(item.value1);
            setPulse(item.value2);
          } else if (item.vital == 'bp') {
            setBp(item.value1);
          } else if (item.vital == 'weight') {
            setWeight(item.value1);
          } else if (item.vital == 'glucose') {
            setGlucose(item.value1);
          }
        });
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <CardView
          firstPress={() => {
            props.navigation.navigate(NAVIGATION.BODYDETAIL, {
              patientID,
              MACAddress,
              vital: 'temp',
              titles: 'Temperature',
            });
          }}
          iconFirstName="temperature-low"
          valueOne={temp ? temp : '-'}
          valueOneUnit="°F"
          secendPress={() => {
            props.navigation.navigate(NAVIGATION.BODYDETAIL, {
              patientID,
              MACAddress,
              vital: 'spo2',
              titles: 'SpO2',
            });
          }}
          iconSecendName="heart"
          valueTwo={spo2 ? spo2 : '-'}
          valueTwoUnit="%"
        />

        <CardView
          style={{marginTop: 10}}
          firstPress={() => {
            props.navigation.navigate(NAVIGATION.BODYDETAIL, {
              patientID,
              MACAddress,
              vital: 'spo2',
              titles: 'Pulse',
            });
          }}
          iconFirstName="heartbeat"
          valueOne={pulse ? pulse : '-'}
          valueOneUnit="bpm"
          secendPress={() => {
            props.navigation.navigate(NAVIGATION.BODYDETAIL, {
              patientID,
              MACAddress,
              vital: 'weight',
              titles: 'Weight',
            });
          }}
          iconSecendName="dumbbell"
          valueTwo={weight ? weight : '-'}
          valueTwoUnit="kg"
        />

        <CardView
          style={{marginTop: 10}}
          firstPress={() => {
            props.navigation.navigate(NAVIGATION.BODYDETAIL, {
              patientID,
              MACAddress,
              vital: 'glucose',
              titles: 'Glucose',
            });
          }}
          iconFirstName="calendar-check"
          valueOne={glucose ? glucose : '-'}
          valueOneUnit="mg/mL"
          secendPress={() => {
            props.navigation.navigate(NAVIGATION.BODYDETAIL, {
              patientID,
              MACAddress,
              vital: 'bp',
              titles: 'Blood Pressure',
            });
          }}
          iconSecendName="eye-dropper"
          valueTwo={bp ? bp : '-'}
          valueTwoUnit="mmHg"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F2F3',
    padding: 10,
    justifyContent: 'center',
  },
});

export default Detailscreen;
