import React, { useEffect, useState, useRef } from 'react'
import * as d3 from 'd3'
import dagreD3 from 'dagre-d3'
import ToolTip from './utils/tooltip.js'
import Dialog from './dialog.js'
import { getNodeById, getParentIdByEdges } from './utils/utils.js'
import { Form, Button, Space, message, Modal, Input } from 'antd'
import { PlusCircleOutlined, DeleteOutlined, FormOutlined, MenuFoldOutlined } from '@ant-design/icons';


let data = {
    nodes: [
        { id: 0, label: "节点1", shape: "rect", status: 'success', desc: '节点描述' },
        { id: 1, label: "节点2", shape: "rect", status: 'fail', desc: '节点描述' },
        { id: 2, label: "节点3", shape: "diamond", status: 'success', desc: '节点描述' },
        { id: 3, label: "节点4", shape: "diamond", status: 'running', desc: '节点描述' },
        { id: 4, label: "节点5", shape: "rect", status: 'norun', desc: '节点描述' },
        { id: 5, label: "节点6", shape: "rect", status: 'success', desc: '节点描述' }
    ],
    edges: [
        { source: 0, target: 1, label: "" },
        { source: 1, target: 2, label: "" },
        { source: 2, target: 4, label: "正常" },
        { source: 2, target: 3, label: "不正常" },
        { source: 3, target: 5, label: "不正常" },
        { source: 3, target: 4, label: "正常" }
    ]
}

const NetFlow = ({ onNodeClick }) => {
    const [dataset, setDataset] = useState(data)
    const selectNode = useRef(null)
    const [direction, setDirection] = useState('TB')
    const [dialogData, setDialogData] = useState({visible: false, option: 'add', data: {}})
    let option = useRef('add')


    useEffect(() => {
        renderGraph()
    }, [dataset, direction])

    // 创建节点
    const createNodes = (nodes, g) => {
        nodes.forEach(item => {
            item && g.setNode(item.id, {
                label: item.label,
                labelStyle: 'fill:#ffffff',
                class: `node-${item.status}`,
                shape: 'rect'
            })
        })
    }

    // 创建连线
    const createEdges = (edges, g) => {
        edges.forEach((item) => {
            g.setEdge(item.source, item.target, {
                label: item.label,
                labelStyle: 'fill:#C16E12',
                style: 'fill: #fff; stroke: #333;'
            })
        })
    }


    // 渲染画布
    const renderGraph = () => {
        const svgGroup = d3.select('#netContainer')
        const innerGroup = d3.select('#gContainer')
        const g = new dagreD3.graphlib.Graph().setGraph({ rankdir: direction })

        createNodes(dataset.nodes, g)
        createEdges(dataset.edges, g)
        // 缩放
        const zoom = d3.zoom().on("zoom", function () {
            innerGroup.attr('transform', d3.event.transform)
        })
        svgGroup.call(zoom)

        const render = new dagreD3.render()
        render(innerGroup, g)

        innerGroup.selectAll('g.node')
            .on('click', (v) => {
                // 当前点击节点
                const node = g.node(v)
                const currentNode = getNodeById(dataset.nodes, v)[0]
                d3.select('.selected-node').classed('selected-node', false)
                d3.select(node.elem).classed('selected-node', true)
                const tempNode = { ...currentNode }

                // 获取父级元素
                let parentNode = []
                dataset.edges.forEach(item => {
                    if (item.target == currentNode.id) {
                        tempNode.source = item.source
                        parentNode.push(...getNodeById(dataset.nodes, item.source))
                    }
                })

                selectNode.current = tempNode
                console.log('select', selectNode.current)
                onNodeClick({ currentNode, parentNode })

            })
            .on("mouseover", function (v) {
                const nodeData = getNodeById(dataset.nodes, v)[0]
                // console.log(nodeData)
                const { label = '', desc = '',id } = nodeData
                //tooltip显示
                ToolTip.show(`编号：${id}<br/>名称：${label}</br>描述：${desc}`)
            })
            .on("mouseout", function (v) {
                //tooltip隐藏
                ToolTip.hide()
            })

        // 居中显示
        const initialScale = 1.5;
        const tWidth = (svgGroup._groups[0][0].clientWidth - g.graph().width * initialScale) / 2;
        const tHeight = (svgGroup._groups[0][0].clientHeight - g.graph().height * initialScale) / 2;
        svgGroup.call(zoom.transform, d3.zoomIdentity.translate(tWidth, tHeight).scale(initialScale)); //元素居中

    }
    const addNode = () => {
        showModal('add')
    }
    const editNode = () => {
        if (!selectNode.current) {
            message.warning('请选择节点')
            return
        }
        showModal('edit')
    }
    const deleteNode = () => {
        if (!selectNode.current) {
            message.warning('请选择节点')
            return
        }

        const { id, label, source } = selectNode.current
        const { nodes, edges } = dataset
        // 删除节点
        for (let i = nodes.length - 1; i >= 0; i--) {
            if (nodes[i].id === id) {
                nodes.splice(i, 1)
            }
        }

        // 删除连线
        for (let i = edges.length - 1; i >= 0; i--) {
            if (edges[i].target === id || edges[i].source === id) {
                edges.splice(i, 1)
            }
        }
        console.log('delete', dataset)
        setDataset({ nodes, edges })
    }

    // 切换
    const toggleDirection = () => {
        setDirection(direction === 'LR' ? 'TB' :'LR')
    }

    const showModal = (op) => {
        const data = op === 'edit' ? selectNode.current : {}
        setDialogData({visible: true, option: op, data })
    }

    // 点击确定
    const handleData = (formdata) => {
        const {id, label, source, desc} = formdata
        let {nodes, edges} = dataset
        if(option.current === 'edit') {
            // 编辑
            nodes = nodes.map(item => item.id == id? ({...item, desc, label}) : item)
            onNodeClick({currentNode: getNodeById(nodes, id)[0]})
        } else {
            // 新增
            nodes.push({id, label,desc, status:'norun', shape: 'rect', })
            edges.push({target:id, source, label: ''})
        }
        setDataset({nodes, edges})
    }

    return (
        <>
            <Space>
                <Button type="primary" size="large" icon={<PlusCircleOutlined />} onClick={addNode}>添加</Button>
                <Button size="large" icon={<FormOutlined />} onClick={editNode}>修改</Button>
                <Button type="primary" size="large" danger="true" icon={<DeleteOutlined />} onClick={deleteNode}>删除</Button>
                <Button type="primary" size="large" icon={<MenuFoldOutlined />} onClick={toggleDirection}>切换</Button>
            </Space>
            <svg id='netContainer' width='100%' height='800'><g id="gContainer"></g></svg>
            <Dialog {...dialogData} onSendData= {handleData} onCancel = {(visible) => setDialogData({visible})}/>
        </>
    )
}

export default React.memo(NetFlow)