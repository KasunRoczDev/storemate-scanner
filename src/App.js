import "./styles.css";
import { Html5Qrcode } from "html5-qrcode";
import { useState, useEffect } from "react";

let html5QrCode;
export default function App() {
    useEffect(() => {
        html5QrCode = new Html5Qrcode("reader");
    }, []);

    const [result, setResult] = useState("");
    const [display, setDisplay] = useState(true);
    const [cancel, setCancel] = useState(false);

    const qrConfig = { fps: 10, qrbox: { width: 200, height: 200 } };

    //Start Scanning and capturing data
    const handleClickAdvanced = () => {
        setResult("");
        setDisplay(false);
        setCancel(true);

        const qrCodeSuccessCallback = (decodeText, decodedResult) => {
            document.getElementById('search_product').value(decodeText);
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
            <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2>
            <div className={display ? "d-none" : "qr-reader-container"}>
                <div id="reader" style={{ width: "300px" }} />
            </div>
            <button onClick={() => handleClickAdvanced()}>Scan</button>
            {cancel && (
                <div className="d-flex justify-content-center align-items-center mt-4">
                    <button className="button-styles" onClick={() => handleStop()}>
                        Stop
                    </button>
                </div>
            )}
            <p>{result}</p>
        </div>
    );
}
