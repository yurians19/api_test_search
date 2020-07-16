module.exports =  (arr,entity,serviceOrigin) => {
     arr.map(elem=>{
        elem.entity = entity
        elem.serviceOrigin = serviceOrigin
        if (elem.trackName) {
            elem.name = elem.trackName
        }
        if (elem.Name) {
            elem.name = elem.Name
        }
        if (elem.name) {
            elem.name = elem.name
        }
    })
    return arr
}