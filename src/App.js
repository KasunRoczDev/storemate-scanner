import "./styles.css";
import { Html5Qrcode } from "html5-qrcode";
import { useState, useEffect } from "react";

let html5QrCode;
export default function App() {
    useEffect(() => {
        html5QrCode = new Html5Qrcode("reader");
        handleClickAdvanced();
    }, []);

    const [display, setDisplay] = useState(true);
    const [cancel, setCancel] = useState(false);

    const qrConfig = { fps: 10, qrbox: { width: 300, height: 300 } };

    //Start Scanning and capturing data
    const handleClickAdvanced = () => {
        setDisplay(false);
        setCancel(true);

        const qrCodeSuccessCallback = (decodeText, decodedResult) => {
            window.parent.postMessage(
                {
                    event_id: 'add_scanned_product',
                    data: {
                        sku: decodeText
                    }
                },
                "*"
            );
            handleStop();
        };

        html5QrCode
            .start({ facingMode: "environment" }, qrConfig, qrCodeSuccessCallback)
            .catch((err) => {
                console.log(err);
            });
    };

    //stop camera
    const handleStop = () => {
        html5QrCode
            .stop()
            .then((res) => {
                setDisplay(true);
                html5QrCode.clear();
                setCancel(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="App">
            <div className={display ? "d-none" : "qr-reader-container"}>
                <div id="reader" style={{ width: "400px" }} />
            </div>
        </div>
    );
}
