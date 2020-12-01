export function getNodeById (data, id) {
    return data.filter(item => item.id == id)
}