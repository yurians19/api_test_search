module.exports =  async term => {
    const { itunnes } = require('../services')
    const { setOriginEntity } = require('./')
    const entities = ['musicVideo','ebook','movie']
    let arrItunnes = []
    await Promise.all(entities.map(async entity =>{
        const { results } = await itunnes(term,entity)
        arrItunnes.push(setOriginEntity(results,entity,'itunnes'))
    }))
    return [].concat(...arrItunnes)
}