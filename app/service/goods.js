const Service = require('egg').Service

class GoodsService extends Service {
  // create======================================================================================================>
  async create(payload) {
    const { ctx, service } = this
    const category = await service.category.show(payload.category)
    if (!category) {
      ctx.throw(404, 'category is not found')
    }
    return ctx.model.Goods.create(payload)
  }

  // destroy======================================================================================================>  
  async destroy(_id) {
    const { ctx, service } = this
    const goods = await ctx.service.goods.find(_id)
    if (!goods) {
      ctx.throw(404, 'goods not found')
    }
    return ctx.model.Goods.findByIdAndRemove(_id)
  }

  // update======================================================================================================>
  async update(_id, payload) {
    const { ctx, service } = this
    const goods = await ctx.service.goods.find(_id)
    if (!goods) {
      ctx.throw(404, 'goods not found')
    }
    return ctx.model.Goods.findByIdAndUpdate(_id, payload)
  }

  // show======================================================================================================>
  async show(_id) {
    const goods = await this.ctx.service.goods.find(_id)
    if (!goods) {
      this.ctx.throw(404, 'goods not found')
    }
    return this.ctx.model.Goods.findById(_id).populate('category')
  }

  // index======================================================================================================>
  async index(payload) {
    const { currentPage, pageSize, isPaging, search } = payload
    let res = []
    let count = 0
    let skip = ((Number(currentPage)) - 1) * Number(pageSize || 10)
    if(isPaging) {
      if(search) {
        res = await this.ctx.model.Goods.find({mobile: { $regex: search } }).populate('category').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.Goods.find({}).populate('category').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.Goods.count({}).exec()
      }
    } else {
      if(search) {
        res = await this.ctx.model.Goods.find({mobile: { $regex: search } }).populate('category').sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.Goods.find({}).populate('category').sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.Goods.count({}).exec()
      }
    }
    // 整理数据源 -> Ant Design Pro
    let data = res.map((e,i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })

    return { count: count, list: data, pageSize: Number(pageSize), currentPage: Number(currentPage) }
  }  
  

  async removes(payload) {
    return this.ctx.model.Goods.remove({ _id: { $in: payload } })
  }

  // 查询mou分类下的所属商品 业务service
  async querygoodslistbycategory(_id) {
    console.log(_id)
    const { ctx } = this 
    const category = await ctx.service.category.show(_id)
    console.log(23232323,category._id)
    return ctx.model.Goods.find({ category: category._id }).exec()
  }
  
  // Commons======================================================================================================>
  async find(id) {
    return this.ctx.model.Goods.findById(id)
  }

  async findByIdAndUpdate(id, values) {
    return this.ctx.model.Goods.findByIdAndUpdate(id, values)
  }

  

}


module.exports = GoodsService