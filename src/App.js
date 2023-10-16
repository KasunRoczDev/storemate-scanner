import "./styles.css";
import { Html5Qrcode } from "html5-qrcode";
import { useEffect } from "react";

let html5QrCode;
export default function App() {
    
    const qrConfig = {fps: 10, qrbox: { width: 200, height: 200 }
    };

    //Start Scanning and capturing data
    const handleClickAdvanced = () => {
        const html5QrCode = new Html5Qrcode("reader");
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

    useEffect(() => {
        // Automatically start the scanning process when the component is mounted
        handleClickAdvanced();
    }, []);

    return (
        <div className="App">
            <div className= "qr-reader-container">
                <div id="reader" style={{ width: "300px"}} />
            </div>
        </div>
    );
}
