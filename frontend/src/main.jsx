import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// In your main JavaScript file (e.g., index.js)
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import store from './store.js';



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    </Provider>,
)
