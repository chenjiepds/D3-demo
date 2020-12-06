import React from 'react'
import { Row, List, Typography, Divider } from 'antd';
const Detail = ({ currentNode = {}, parentNode = [],data }) => {
    console.log(333,currentNode, parentNode)
    const { label, desc } = currentNode
    const parentNodeName = parentNode.map(item => item.label).join(',')
    return (
        <>
            <h2>节点详情</h2>
            <Row><span>节点名称：</span><span>{label}</span></Row>
            <Row><span>节点描述：</span><span>{desc}</span></Row>
            <Row><span>父节点：</span><span>{parentNodeName}</span></Row>
        </>
    )

    // return (
    //     <>
    //     <Divider orientation="left">Default Size</Divider>
    //     <List
    //       bordered
    //       dataSource={data}
    //       renderItem={item => (
    //         <List.Item>
    //     <List.Item.Meta
    //       title={item.label}
    //       description={item.desc}
    //     />
    //   </List.Item>
    //       )}
    //     />
    //     </>
    // )
}

export default Detail