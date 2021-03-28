import {View, Image, Text, TouchableHighlight, StyleSheet, Picker} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import {ManualLocationProperties} from "./models";
import Colors from "../../constants/colors";
import {Input} from "react-native-elements";
import DropDownPicker from 'react-native-dropdown-picker';

interface ModalProps {
  showModal: boolean,
  runOnComplete: Function
}

export default function RequestLocationModal(props : ModalProps) {
  const [showModal, setShowModal] = useState<boolean>();

  useEffect(() => {
    setShowModal(props.showModal);
  }, [props.showModal]);

  const handleClose = ( ) => {
    setShowModal(false);
  };

  const handleOkay = () => {
    setShowModal(false);
    props.runOnComplete();
  };

  return (
      <View>
      <Modal
          show={showModal}
          backdrop='static'
          onHide={handleClose}>
        <>
          <Modal.Header>
            <Text style={styles.modalHeader}>
              Location Requested
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Text>
              We are about to request location info from you. This location information
              will only be used for getting weather information.
              {'\n'}
              {'\n'}
              Click the <Text style={styles.boldText}>Okay</Text> button below to allow the app to request information.
              Or you can press the <Text style={styles.boldText}>Cancel</Text> button (however weather information won't
              be able to be retrieved).
            </Text>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" onClick={handleOkay}>Okay</Button>
          </Modal.Footer>
        </>
      </Modal>
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
  boldText: {
    fontWeight: "bold",
  },
});