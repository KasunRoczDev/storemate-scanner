// index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const rootElement = document.getElementById("root");

const scannerConfigs = [
    { type: "QR", onResult: (res) => alert(res) },
    { type: "BR", onResult: (res) => alert(res) },
];

ReactDOM.render(
    <React.StrictMode>
        {scannerConfigs.map((config, index) => (
            <App key={index} {...config} />
        ))}
    </React.StrictMode>,
    rootElement
);
