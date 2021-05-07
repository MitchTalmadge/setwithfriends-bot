import React from "react";
import ReactDOM from "react-dom";

const Popup = () => {
    return (
        <div>
            <h1 style={{ whiteSpace: "nowrap" }}>Set with Friends Bot</h1>
            <hr />

        </div>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Popup />
    </React.StrictMode>,
    document.getElementById("app")
);