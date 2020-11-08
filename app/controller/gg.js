const Controller = require('egg').Controller

class GgController extends Controller {
  constructor(ctx) {
    super(ctx)

    this.createRule = {
      content: { type: 'string', required: true, allowEmpty: false },
    }

  }

  // 创建公告
  async create() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(this.createRule)
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    const res = await service.gg.create(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 修改公告
  async update() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(this.createRule)
    // 组装参数
    const { id } = ctx.params
    const payload =  ctx.request.body || {}
    // 调用 Service 进行业务处理
    const res = await service.gg.update(id, payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 删除单个公告
  async destroy() {
    const { ctx, service } = this
    // 校验参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    await service.gg.destroy(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }

  // 获取所有公告(分页/模糊)
  async index() {
    const { ctx, service } = this
    // 组装参数
    const payload = ctx.query
    // 调用 Service 进行业务处理
    const res = await service.gg.index(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }


}


module.exports = GgController