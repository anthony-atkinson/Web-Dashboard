import {View, Image, Text, TouchableHighlight} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Modal as ModalComp } from 'react-bootstrap';
import styles from "./styles";
import {Action} from "./reducer";

export default React.forwardRef( (props : Action, ref) => {
  const { show, confirmButtonText, content } = props;

  const [showModal, setShowModal] = useState<boolean>();

  useEffect(() => {
    setShowModal(show);
  }, [show]);

  const handleClose = () => setShowModal(false);

  return (
      <ModalComp show={showModal} onHide={handleClose}>
        <>
          <ModalComp.Body>
            <Text style={styles.modalText}>{content}</Text>
          </ModalComp.Body>

          <ModalComp.Footer>
            {/*<Button variant="secondary" onClick={handleClose}>Close</Button>*/}
            <Button variant="primary" className="ModalButton" onClick={handleClose}>
              {confirmButtonText}
            </Button>
          </ModalComp.Footer>
        </>
      </ModalComp >
  );
});