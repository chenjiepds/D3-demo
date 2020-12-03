import React, { useState,useCallback } from 'react'
import { Row, Col } from 'antd'
import NetFlow from './netflow.js'
import Detail from './detail.js'
import '../index.css';

function App () {
    const [node, setNode] = useState({})
    // const nodeClick = useCallback((data) => {
    //     console.log('data',data)
    //     setNode(data)
    // },[])
    return (
        <div className="app">
            <Row>
                <Col span={16}>
                    <NetFlow onNodeClick={(data)=> {setNode(data)}} />
                </Col>
                <Col span={8} className="right-container"><Detail {...node} /></Col>
            </Row>
        </div>
    );
}

export default App;
