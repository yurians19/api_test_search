module.exports =  (arr,entity,serviceOrigin) => {
     arr.map(elem=>{
        elem.entity = entity
        elem.serviceOrigin = serviceOrigin
    })
    return arr
}