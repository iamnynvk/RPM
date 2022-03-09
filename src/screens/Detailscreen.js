import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import useOrientation from '../hooks/useOrientation';
import Icon from 'react-native-ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Detailscreen = props => {
  const [patientData, setPatientData] = useState([]);

  // get Patients ID & MAC Address
  const {patientID} = props?.route?.params;
  const {MACAddress} = props?.route?.params;

  useEffect(() => {
    fetch(
      `http://167.71.225.187:9000/vitals/${patientID}/${MACAddress}/lastVitals/`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    ).then(res => {
      if (res.ok) {
        res.json().then(data => {
          setPatientData([data.payload]);
        });
      }
    });
  }, []);

  // using hook for check screen is portrait or landscape
  const orientation = useOrientation();
  const screen = orientation.isPortrait;

  // screen wise data render card
  const numCols = screen ? 2 : 3;

  {
    patientData.map(data => {
      console.log(data);
    });
  }

  return (
    <View style={styles.container}>
      {patientData.map((item, index) => {
        return (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            key={index}>
            <View style={styles.mainView}>
              <View style={styles.touchView}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                  }}>
                  <View style={styles.iconView}>
                    <FontAwesome5
                      name="thermometer-half"
                      size={50}
                      color="#000"
                    />
                  </View>

                  {/* Temprature here */}
                  <View style={[styles.textView]}>
                    <View>
                      <Text style={styles.numText}>{item[0].value1} </Text>
                    </View>

                    <View>
                      <Text style={styles.unitText}>{item[0].value1uom}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.touchView}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                  }}>
                  <View style={styles.iconView}>
                    <Icon name="clipboard" size={60} color="#000000" />
                  </View>

                  {/* spo2 here */}
                  <View style={[styles.textView]}>
                    <View>
                      <Text style={styles.numText}>
                        {item[1]?.value1 ? item[1]?.value1 : null}
                      </Text>
                    </View>

                    <View>
                      <Text style={styles.unitText}>
                        {item[1]?.value1uom ? item[1]?.value1uom : null}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.mainView, {marginTop: 10}]}>
              <View style={styles.touchView}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                  }}>
                  <View style={styles.iconView}>
                    <Icon name="pulse" size={60} color="#000000" />
                  </View>

                  {/* pulse here */}
                  <View style={[styles.textView]}>
                    <View>
                      <Text style={styles.numText}>
                        {item[1]?.value2 ? item[1]?.value2 : null}{' '}
                      </Text>
                    </View>

                    <View>
                      <Text style={styles.unitText}>
                        {item[1]?.value2uom ? item[1]?.value2uom : null}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.touchView}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                  }}>
                  <View style={styles.iconView}>
                    <FontAwesome5 name="weight" size={60} color="#000000" />
                  </View>

                  {/* weight here */}
                  <View style={[styles.textView]}>
                    <View>
                      <Text style={styles.numText}>
                        {item[3]?.value1 ? item[3]?.value1 : null}{' '}
                      </Text>
                    </View>

                    <View>
                      <Text style={styles.unitText}>
                        {item[3]?.value1uom ? item[3]?.value1uom : null}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.mainView, {marginTop: 10}]}>
              <View style={styles.touchView}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                  }}>
                  <View style={styles.iconView}>
                    <Fontisto name="blood-test" size={60} color="#000" />
                  </View>

                  {/* glucose here */}
                  <View style={[styles.textView]}>
                    <View>
                      <Text style={styles.numText}>-</Text>
                    </View>

                    <View>
                      <Text style={styles.unitText}>-</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.touchView}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                  }}>
                  <View style={styles.iconView}>
                    <MaterialCommunityIcons
                      name="file-document"
                      size={60}
                      color="#000000"
                    />
                  </View>

                  {/* blood presure here */}
                  <View style={[styles.textView]}>
                    <View>
                      <Text style={styles.numText}>
                        {item[2]?.value1 ? item[2]?.value1 : null}{' '}
                      </Text>
                    </View>

                    <View>
                      <Text style={styles.unitText}>
                        {item[2]?.value1uom ? item[2]?.value1uom : null}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F2F3',
    padding: 10,
  },
  mainView: {
    height: 200,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  touchView: {
    flex: 1,
    borderWidth: 0.5,
    backgroundColor: '#fff',
    marginRight: 10,
    borderRadius: 25,
  },
  iconView: {
    marginTop: 10,
    marginHorizontal: 30,
    marginVertical: 10,
  },
  textView: {
    marginTop: 30,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  numText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 40,
    alignSelf: 'center',
    color: '#000',
  },
  unitText: {
    marginTop: 30,
    fontFamily: 'OpenSans-Medium',
    fontSize: 20,
  },
  imageSetView: {
    flex: 1,
  },
});

export default Detailscreen;
