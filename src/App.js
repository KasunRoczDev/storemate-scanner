import "./styles.css";
import { Html5Qrcode } from "html5-qrcode";
import {useEffect, useState} from "react";

let html5QrCode;
export default function App() {
    const [detectionCount, setDetectionCount] = useState(0);

    useEffect(() => {
        handleClickAdvanced();
    }, []);


    const qrConfig = {fps: 10, qrbox: { width: 200, height: 200 }
    };

    const resetDetectionCount = () => {
        setDetectionCount(0);
    };

    //Start Scanning and capturing data
    const handleClickAdvanced = () => {
        const html5QrCode = new Html5Qrcode("reader");
        const qrCodeSuccessCallback = (decodeText, decodedResult) => {
            if (detectionCount === 0) {
                setDetectionCount(1);
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
                setTimeout(resetDetectionCount, 3600);
            }
        };

        html5QrCode
            .start({ facingMode: "environment" }, qrConfig, qrCodeSuccessCallback)
            .catch((err) => {
                console.log(err);
            });
    };

    // stop camera
    const handleStop = () => {
        html5QrCode
            .stop()
            .then((res) => {
                html5QrCode.clear();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="App">
            <div className= "qr-reader-container">
                <div id="reader" style={{ width: "300px"}} />
            </div>
        </div>
    );
}
