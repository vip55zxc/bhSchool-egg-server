const Service = require('egg').Service

class StoreService extends Service {
  // create======================================================================================================>
  async create(payload) {
    return this.ctx.model.Store.create(payload)
  }

  // destroy======================================================================================================>  
  async destroy(_id) {
    const {
      ctx,
      service
    } = this
    const store = await ctx.service.store.find(_id)
    if (!store) {
      ctx.throw(404, 'store not found')
    }
    return ctx.model.Store.findByIdAndRemove(_id)
  }

  // update======================================================================================================>
  async update(_id, payload) {
    const {
      ctx,
      service
    } = this
    const store = await ctx.service.store.find(_id)
    if (!store) {
      ctx.throw(404, 'store not found')
    }
    return ctx.model.Store.findByIdAndUpdate(_id, payload)
  }

  // show======================================================================================================>
  async show(_id) {
    const store = await this.ctx.service.store.find(_id)
    if (!store) {
      this.ctx.throw(404, 'store not found')
    }
    return this.ctx.model.Store.findById(_id)
  }

  // index======================================================================================================>
  async index(payload) {
    const {
      currentPage,
      pageSize,
      isPaging,
      search
    } = payload
    let res = []
    let count = 0
    let skip = ((Number(currentPage)) - 1) * Number(pageSize || 10)
    if (isPaging) {
      if (search) {
        res = await this.ctx.model.Store.find({
          name: {
            $regex: search
          }
        }).skip(skip).limit(Number(pageSize)).sort({
          createdAt: -1
        }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.Store.find({}).skip(skip).limit(Number(pageSize)).sort({
          createdAt: -1
        }).exec()
        count = await this.ctx.model.Store.count({}).exec()
      }
    } else {
      if (search) {
        res = await this.ctx.model.Store.find({
          name: {
            $regex: search
          }
        }).sort({
          createdAt: -1
        }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.Store.find({}).sort({
          createdAt: -1
        }).exec()
        count = await this.ctx.model.Store.count({}).exec()
      }
    }
    // 整理数据源 -> Ant Design Pro
    let data = res.map((e, i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })

    return {
      count: count,
      list: data,
      pageSize: Number(pageSize),
      currentPage: Number(currentPage)
    }
  }

  // removes======================================================================================================>
  async removes(values) {
    return this.ctx.model.Store.remove({
      _id: {
        $in: values
      }
    })
  }

  // 查询撒倒萨倒萨
  async querylistbystore(_id) {
    const {
      ctx,
      service
    } = this
    // 商店所有分类+每个分类下商品
    //let shopList = undefined

    //1.校验该商店
    const store = await ctx.service.store.find(_id)
    //if(!store) {return} 
    //2.如果存在，带出数据
    //2.1 查询该商店有哪些分类
    let categories = await ctx.service.category.querybystore(_id)
    console.log(`该商店${store.name}的所有分类是：${categories}`)

    /**
     * ：[{ _id: 5b93c2bd598e5a03ec91080a,
  name: '校园主食',
  store: 5b93be592072dd03d449f1f1,
  goodsList:[]
  __v: 0,
  createdAt: 2018-09-08T12:38:21.025Z },{ _id: 5b93c312598e5a03ec91080b,
  name: '校园炒菜',
   goodsList:[...]
  store: 5b93be592072dd03d449f1f1,
  __v: 0,
  createdAt: 2018-09-08T12:39:46.070Z }]
     */

    let preData = []
    for (let item of categories) {
      let goodsList = await this.ctx.model.Goods.find({
        category: item._id
      }).exec()
      preData.push(goodsList)
    }
    console.log(preData)


    let data = preData.map((e, i) => {
      const jsonObject = Object.assign({}, categories[i]._doc)
      jsonObject.goodsList = e
      return jsonObject
    })

    // let data =  categories.map( async (e,i) => {
    //   const goodsList =  await this.ctx.model.Goods.find({ category: e._id }).exec()
    //   const jsonObject = Object.assign({}, e._doc)
    //   jsonObject.goodsList = goodsList
    //   jsonObject.goodsList = goodsList
    // })


    //console.log(`该商店${store.name}的所有分类+每个分类下商品数据返回给小程序是：${data[0]}`)
    return data
  }

  // Commons======================================================================================================>
  async find(id) {
    return this.ctx.model.Store.findById(id)
  }

}

module.exports = StoreService