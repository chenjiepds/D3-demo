import React, {useEffect} from 'react'
import * as d3 from 'd3'
import dagreD3 from 'dagre-d3'

let dataset ={
    nodes: [
      {id: 0,label: "节点1",shape: "rect",status: 'success'},
      {id: 1,label: "节点2",shape: "rect",status: 'fail'},
      {id: 2,label: "节点3",shape: "diamond",status: 'success'},
      {id: 3,label: "节点4",shape: "diamond",status: 'running'},
      {id: 4,label: "节点5",shape: "rect",status: 'norun'},
      {id: 5,label: "节点6",shape: "rect",status: 'success'}
     ],
     edges: [
       {source: 0,target: 1,label: ""},
       {source: 1,target: 2,label: ""},
       {source: 2,target: 4,label: "正常"},
       {source: 2,target: 3,label: "不正常"},
       {source: 3,target: 5,label: "不正常"},
       {source: 3,target: 4,label: "正常"}
     ]
  }
  
const NetFlow = () => {
    const g = new dagreD3.graphlib.Graph()
    .setGraph({rankdir:'TB'})
    .setDefaultEdgeLabel(function () { return {}; });

    useEffect(() => {
        renderGraph()
    }, [])
    const createNodes = (nodes) => {
        nodes.forEach(item => {
            g.setNode(item.id, {
                label: item.label,
                class: `node-${item.status}`,
                shape: 'rect'
            })
        })
    }
    const createEdges = (edges) => {
        edges.forEach((item) => {
            g.setEdge(item.source, item.target, {
                label: item.label,
                style: 'fill: #fff; stroke: #333;'
            })
        })
    }
    const renderGraph = () => {
       const render = new dagreD3.render()
       const svgGroup = d3.select('#netContainer').append('g').attr('width', "100%").attr('height', '100%').attr('transform', )
       
        createNodes(dataset.nodes)
        createEdges(dataset.edges)
       render(svgGroup,g)
    }
    return (
        <svg id='netContainer' width='100%' height='800'></svg>
    )
}

export default NetFlow