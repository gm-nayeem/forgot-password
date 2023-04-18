import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Context from './context/Context';


ReactDOM.createRoot(document.getElementById('root')).render(
  <div>
    <Context>
      <App />
    </Context>
  </div>,
)
