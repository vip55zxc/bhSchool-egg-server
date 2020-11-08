const Service = require('egg').Service

class GgService extends Service {
  // create======================================================================================================>
  async create(payload) {
    return this.ctx.model.Gg.create(payload) 
  }

  // update======================================================================================================>
  async update(_id, _payload) {
    const { ctx, service } = this
    const gg = await ctx.service.gg.find(_id)
    if(!gg) {
      ctx.throw(404, 'gg not found')
    }
    return this.ctx.model.Gg.findByIdAndUpdate(_id, _payload) 
  }

  // destroy======================================================================================================>  
  async destroy(_id) {
    const { ctx, service } = this
    const gg = await ctx.service.gg.find(_id)
    if (!gg) {
      ctx.throw(404, 'gg not found')
    }
    return ctx.model.Gg.findByIdAndRemove(_id)
  }

  // index======================================================================================================>
  async index(payload) {
    const { currentPage, pageSize, isPaging, search } = payload
    let res = []
    let count = 0
    let skip = ((Number(currentPage)) - 1) * Number(pageSize || 10)
    if(isPaging) {
      if(search) {
        res = await this.ctx.model.Gg.find({content: { $regex: search } }).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.Gg.find({}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.Gg.count({}).exec()
      }
    } else {
      if(search) {
        res = await this.ctx.model.Gg.find({content: { $regex: search } }).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.Gg.find({}).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.Gg.count({}).exec()
      }
    }
    // 整理数据源 -> Ant Design Pro
    let data = res.map((e,i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })

    return { count: count, list: data, pageSize: Number(pageSize), currentPage: Number(currentPage) }
  }


  // Commons======================================================================================================>
  async find(id) {
    return this.ctx.model.Gg.findById(id)
  }


}

module.exports = GgService