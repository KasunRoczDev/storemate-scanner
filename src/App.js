// App.js
import React, {useEffect, useState} from "react";
import { Html5Qrcode } from "html5-qrcode";

const qrConfig = { fps: 10, qrbox: { width: 300, height: 300 } };
const brConfig = { fps: 10, qrbox: { width: 300, height: 150 } };
let html5QrCode;

const Scanner = (props) => {
  useEffect(async () => {
      html5QrCode = new Html5Qrcode("reader");

      let permission = await navigator.permissions.query({
          name: "camera"
      });

      console.log(permission);

      // Use getUserMedia to access the camera when the component mounts
      // if (navigator.mediaDevices || navigator.mediaDevices.getUserMedia) {
      //     navigator.mediaDevices.getUserMedia({audio: false, video: true})
      //         .then(function (stream) {
      //             // Access granted, do something with the stream if needed
      //         })
      //         .catch(function (error) {
      //             console.error('Error accessing camera and microphone:', error);
      //         });
      // } else {
      //     console.error('getUserMedia is not supported in this browser.');
      // }
  }, []);

  const handleClickAdvanced = () => {
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
      props.onResult(decodedText);
      handleStop();
    };
    html5QrCode.start(
        { facingMode: "environment" },
        props.type === "QR" ? qrConfig : brConfig,
        qrCodeSuccessCallback
    );
  };

  const handleStop = () => {
    try {
      html5QrCode
          .stop()
          .then((res) => {
            html5QrCode.clear();
          })
          .catch((err) => {
            console.log(err.message);
          });
    } catch (err) {
      console.log(err);
    }
  };

  return (
      <div style={{ position: "relative" }}>
        <div id="reader" width="100%" />
        <button onClick={handleClickAdvanced}>
          click pro {props.type}
        </button>
        <button onClick={handleStop}>stop pro</button>
      </div>
  );
};

export default Scanner;
