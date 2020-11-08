const Controller = require('egg').Controller

class GoodsController extends Controller {
  constructor(ctx) {
    super(ctx)

    this.createRule = {
      name: { type: 'string', required: true, allowEmpty: false },
      price: { type: 'string', required: true, allowEmpty: false },
      category: { type: 'string', required: true, allowEmpty: false },
    }

  }

  // 创建商品
  async create() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(this.createRule)
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    const res = await service.goods.create(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 修改商品
  async update() {
    const { ctx, service } = this
    // 校验参数
    // ctx.validate(this.createRule)
    // 组装参数
    const { id } = ctx.params
    const payload =  ctx.request.body || {}
    // 调用 Service 进行业务处理
    const res = await service.goods.update(id, payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 删除单个商品
  async destroy() {
    const { ctx, service } = this
    // 校验参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    await service.goods.destroy(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }

  // 获取所有角色(分页/模糊)
  async index() {
    const { ctx, service } = this
    // 组装参数
    const payload = ctx.query
    // 调用 Service 进行业务处理
    const res = await service.goods.index(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }


}


module.exports = GoodsController