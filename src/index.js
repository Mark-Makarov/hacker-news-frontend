import React from "react";
import { render } from "react-dom";
import "../../hacker-news-frontend/src/style/main.css";
import App from "../../hacker-news-frontend/src/components/App";
import { Provider } from "react-redux";
import { createStore } from "@reduxjs/toolkit";
import reducers from "../../hacker-news-frontend/src/reducers/reducers.js";

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
    document.getElementById("root")
);
