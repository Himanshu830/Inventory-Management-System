
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/App.css';
import App from './App';
import { RecoilRoot } from 'recoil';


ReactDOM.render(
  <RecoilRoot>
  <React.StrictMode>
    <App />
  </React.StrictMode> 
  </RecoilRoot>,
  document.getElementById('root')
);
            