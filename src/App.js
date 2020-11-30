import React from 'react'
import {Row, Col} from 'antd'
import NetFlow from './netflow.js'
import Detail from './detail.js'
import './index.css';

function App() {
  return (
    <div  className="app">
      <Row>
        <Col span={16}><NetFlow /></Col>
        <Col span={8}><Detail/></Col>
      </Row>
    </div>
  );
}

export default App;
