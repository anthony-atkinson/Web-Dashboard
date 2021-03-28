import {View, Image, Text, TouchableHighlight, StyleSheet, Picker} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Modal as ModalComp } from 'react-bootstrap';
import {ManualLocationProperties} from "./models";
import Colors from "../../constants/colors";
import {Input} from "react-native-elements";
import DropDownPicker from 'react-native-dropdown-picker';

interface ModalProps {
  showModal: boolean,
  runOnComplete: Function
}

enum CityZipSelection {
  CITY,
  ZIP,
  NOT_SELECTED
}

export default function ManualLocationModal(props : ModalProps) {
  const [showModal, setShowModal] = useState<boolean>();
  const [cityOrZip, setCityOrZip] = useState<CityZipSelection>(CityZipSelection.NOT_SELECTED);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [countryCode, setCountryCode] = useState('');

  useEffect(() => {
    setShowModal(props.showModal);
  }, [props.showModal]);

  const handleClose = ( ) => {
    setShowModal(false);
  };

  const handleOkay = () => {
    const retProps = new ManualLocationProperties();
    retProps.city = city;
    retProps.countryCode = countryCode;
    retProps.state = state;
    retProps.zipCode = postalCode;
    setShowModal(false);
    props.runOnComplete(retProps);
  };

  return (
      <View>
      <ModalComp
          show={showModal}
          backdrop='static'
          onHide={handleClose}>
        <>
          <ModalComp.Header>
            <Text style={styles.modalHeader}>
              Manual Set Location
            </Text>
          </ModalComp.Header>
          <ModalComp.Body>
            <Text>
              This browser does not support getting location automatically.
              Please fill out the information below so that we can
              retrieve weather information.
              {'\n'}
              {'\n'}
            </Text>
            <DropDownPicker
                items={[
                  {label: 'Select Option', value: CityZipSelection.NOT_SELECTED, selected: true},
                  {label: 'City, State, Country Code', value: CityZipSelection.CITY},
                  {label: 'Zip/Postal Code', value: CityZipSelection.ZIP},
                ]}
                containerStyle={{height: 40, marginBottom: 30}}
                onChangeItem={item => setCityOrZip(item.value)}
            />
            { (cityOrZip === CityZipSelection.CITY) ? (
                <View>
                  <Input
                      label='City'
                      value={city}
                      editable={true}
                      onChangeText={v => setCity(v) }
                  />
                  <Input
                      label='State (optional)'
                      value={state}
                      editable={true}
                      onChangeText={v => setState(v) }
                  />
                  <Input
                      label='Country Code'
                      value={countryCode}
                      editable={true}
                      onChangeText={v => setCountryCode(v) }
                  />
                </View>
            ) : null }
            { (cityOrZip === CityZipSelection.ZIP) ? (
                <View>
                  <Input
                      label='Zip/Postal Code'
                      value={postalCode}
                      editable={true}
                      onChangeText={v => setPostalCode(v) }
                  />
                </View>
            ) : null}
          </ModalComp.Body>

          <ModalComp.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" onClick={handleOkay}>Okay</Button>
          </ModalComp.Footer>
        </>
      </ModalComp>
      </View>
  );
}

const styles = StyleSheet.create({
  openButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderRadius: 0,
    padding: 10,
    elevation: 2,
  },
  modalHeader: {
    fontSize: 20,
  },
});