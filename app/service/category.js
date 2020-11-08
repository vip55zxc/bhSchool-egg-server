const Service = require('egg').Service
class CategoryService extends Service {
  // create======================================================================================================>
  async create(payload) {
    const { ctx, service } = this
    const store = await service.store.show(payload.store)
    if (!store) {
      ctx.throw(404, 'store is not found')
    }
    return ctx.model.Category.create(payload)
  }

  // destroy======================================================================================================>  
  async destroy(_id) {
    const { ctx, service } = this
    const category = await ctx.service.category.find(_id)
    if (!category) {
      ctx.throw(404, 'category not found')
    }
    return ctx.model.Category.findByIdAndRemove(_id)
  }

  // update======================================================================================================>
  async update(_id, payload) {
    const { ctx, service } = this
    const category = await ctx.service.category.find(_id)
    if (!category) {
      ctx.throw(404, 'category not found')
    }
    return ctx.model.Category.findByIdAndUpdate(_id, payload)
  }

  // show======================================================================================================>
  async show(_id) {
    const category = await this.ctx.service.category.find(_id)
    if (!category) {
      this.ctx.throw(404, 'category not found')
    }
    return this.ctx.model.Category.findById(_id).populate('store')
  }

  // index======================================================================================================>
  async index(payload) {
    const { currentPage, pageSize, isPaging, search } = payload
    let res = []
    let count = 0
    let skip = ((Number(currentPage)) - 1) * Number(pageSize || 10)
    if(isPaging) {
      if(search) {
        res = await this.ctx.model.Category.find({mobile: { $regex: search } }).populate('store').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.Category.find({}).populate('store').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.Category.count({}).exec()
      }
    } else {
      if(search) {
        res = await this.ctx.model.Category.find({mobile: { $regex: search } }).populate('store').sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.Category.find({}).populate('store').sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.Category.count({}).exec()
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
    return this.ctx.model.Category.remove({ _id: { $in: payload } })
  }

  // 查询某商店的分类 业务service
  async querybystore(_id) {
    console.log(_id)
    const { ctx } = this 
    const store = await ctx.service.store.show(_id)
    console.log(23232323,store._id)
    return ctx.model.Category.find({ store: store._id }).exec()
  }
  // Commons======================================================================================================>
  async findByMobile(mobile) {
    return this.ctx.model.Category.findOne({mobile: mobile})
  }

  async find(id) {
    return this.ctx.model.Category.findById(id)
  }

  async findByIdAndUpdate(id, values) {
    return this.ctx.model.Category.findByIdAndUpdate(id, values)
  }

  

}


module.exports = CategoryService