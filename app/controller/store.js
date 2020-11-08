const Controller = require('egg').Controller

class StoreController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.createRule = {
      name: { type: 'string', required: true, allowEmpty: false },
      address: { type: 'string', required: true, allowEmpty: false },
      phone: { type: 'string', required: true, allowEmpty: false }
    }

  }

  // 创建商店
  async create() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(this.createRule)
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    const res = await service.store.create(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }
  
  // 删除单个商店
  async destroy() {
    const { ctx, service } = this
    // 校验参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    await service.store.destroy(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }

  // 修改商店
  async update() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(this.createRule)
    // 组装参数
    const { id } = ctx.params

    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    await service.store.update(id, payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }

  // 获取单个商店
  async show() {
    const { ctx, service } = this
    // 组装参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    const res = await service.store.show(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 获取所有商店(分页/模糊)
  async index() {
    const { ctx, service } = this
    // 组装参数
    const payload = ctx.query
    // 调用 Service 进行业务处理
    const res = await service.store.index(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 删除所选商店(条件id[])
  async removes() {
    const { ctx, service } = this
    // 组装参数
    // const payload = ctx.queries.id
    const { id } = ctx.request.body // {id: "5a452a44ab122b16a0231b42,5a452a3bab122b16a0231b41"}
    const payload = id.split(',') || []
    // 调用 Service 进行业务处理
    const result = await service.store.removes(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }


  // 获取某商店下的所有分类+分类下的商品
  async querylistbystore() {
    const { ctx, service } = this
    const { id } = ctx.params

    // 去查
    const res = await ctx.service.store.querylistbystore(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

}


module.exports = StoreController