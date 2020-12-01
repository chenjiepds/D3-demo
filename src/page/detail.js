import React from 'react'
import { Row } from 'antd';
const Detail = ({ currentNode = {}, parentNode = [] }) => {
    console.log(currentNode, parentNode)
    const { label = '', desc = '' } = currentNode
    const parentNodeName = parentNode.map(item => item.label).join(',')
    return (
        <>
            <h2>节点详情</h2>
            <Row><span>节点名称：</span><span>{label}</span></Row>
            <Row><span>节点描述：</span><span>{desc}</span></Row>
            <Row><span>父节点：</span><span>{parentNodeName}</span></Row>
        </>
    )
}

export default Detail