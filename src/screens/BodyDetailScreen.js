import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Table,
  TableWrapper,
  Col,
  Row,
  Cols,
  Cell,
} from 'react-native-table-component';

const BodyDetailScreen = props => {
  const {patientID, MACAddress, vital, titles} = props.route.params;

  const [tableheader, setTableHeader] = useState({
    tableHead: ['Date', 'Time', 'Tempurature'],
  });
  const [tabledata, setTableData] = useState({
    tableData: [],
  });

  useEffect(() => {
    fetch(
      `http://167.71.225.187:9000/vitals/${patientID}/${MACAddress}/${vital}/`,
    ).then(res => {
      res.json().then(data => {
        let tempData = [];
        console.log('This is Data : ', data.payload);

        data.payload.map(item => {
          const date = new Date(item.datetime)
            .toDateString()
            .split(' ')
            .slice(1, 4)
            .join(' ');

          const time = new Date(item.datetime).toTimeString().split(' ')[0];
          const value = item.value1;
          const newData = [date, time, value];
          console.log(newData);
          tempData.push(newData);
        });
        setTableData({
          tableData: tempData,
        });
      });
    });
  }, []);

  console.log('');

  console.log(tabledata.tableData);

  return (
    <View style={styles.container}>
      <Table borderStyle={{borderWidth: 1}}>
        <Row
          data={tableheader.tableHead}
          flexArr={[2, 2, 3]}
          style={styles.head}
          textStyle={styles.text}
        />
        <TableWrapper>
          {tabledata.tableData.map((rowData, index) => (
            <Row
              data={rowData}
              flexArr={[2, 2, 3]}
              style={[styles.row, index % 2 && {backgroundColor: '#F6F6F6'}]}
              textStyle={styles.text}
            />
          ))}
        </TableWrapper>
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  wrapper: {
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    backgroundColor: '#f6f8fa',
  },
  row: {
    height: 28,
    width: '100%',
  },
  text: {
    textAlign: 'center',
  },
});

export default BodyDetailScreen;
