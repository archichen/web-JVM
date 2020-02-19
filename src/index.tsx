import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import FS from './fs';
import loadJDK from './jdk/loadJDK';
import main from './jvm/main';
import Cmd from './jvm/cmd';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

let cmd: Cmd = new Cmd({
    class: "main",
    args: ["arg1", "arg2"]
});

new FS().init();

loadJDK();

main(cmd);