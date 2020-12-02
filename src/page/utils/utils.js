export function getNodeById (data, id) {
    return data.filter(item => item.id == id)
}

export function getParentIdByEdges(edges, id) {
    let parentIds = []
     edges.map(item => {
        if(item.target == id){
            parentIds.push(item.source)
    }
})
return parentIds
}