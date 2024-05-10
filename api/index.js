import categorys from './categorys'
import banners from './banners'
import restaurants from './restaurants'


const json = {
	categorys,
	banners,
	restaurants
}

export default (name, id) => new Promise(resolve => resolve(id ? json[name].filter(item => item.id === id)[0] : json[name]), 100)
