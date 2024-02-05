import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import {App} from "./App";
import {inspect} from "util";
import styles from './styles.module.scss'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className={styles.appWrapper}>
          <App/>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
