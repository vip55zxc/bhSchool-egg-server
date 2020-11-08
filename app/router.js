'use strict'
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.index)

  // role
  // router.post('/api/role', controller.role.create)
  // router.delete('/api/role/:id', controller.role.destroy)
  // router.put('/api/role/:id', controller.role.update)
  // router.get('/api/role/:id', controller.role.show)
  // router.get('/api/role', controller.role.index)
  router.delete('/api/role', controller.role.removes)
  router.resources('role', '/api/role', controller.role)

  // gg
  router.post('/api/gg', app.jwt, controller.gg.create)
  router.delete('/api/gg/:id', app.jwt, controller.gg.destroy)
  router.get('/api/gg', controller.gg.index)
  router.put('/api/gg/:id', app.jwt, controller.gg.update)

  // store
  router.get('/api/store/querylistbystore/:id', controller.store.querylistbystore) // 小程序要的接口
  router.delete('/api/store/:id', app.jwt, controller.store.destroy)
  // router.delete('/api/store', controller.store.removes)
  // router.resources('store', '/api/store', controller.store)
  router.post('/api/store', app.jwt, controller.store.create)
  router.get('/api/store', controller.store.index)
  router.put('/api/store/:id', app.jwt, controller.store.update)

  // category
  router.get('/api/category/querybysotre/:id', controller.category.querybystore)
  // router.resources('category', '/api/category', controller.category)
  router.post('/api/category', app.jwt, controller.category.create)
  router.delete('/api/category/:id', app.jwt, controller.category.destroy)
  router.get('/api/category', controller.category.index)
  router.put('/api/category/:id', app.jwt, controller.category.update)

  // goods
  // router.resources('goods', '/api/goods', controller.goods)
  router.post('/api/goods', app.jwt, controller.goods.create)
  router.delete('/api/goods/:id', app.jwt, controller.goods.destroy)
  router.get('/api/goods', controller.goods.index)
  router.put('/api/goods/:id', app.jwt, controller.goods.update)


  // userAccess
  router.post('/api/user/access/login', controller.userAccess.login)
  router.get('/api/user/access/current', app.jwt, controller.userAccess.current)
  router.get('/api/user/access/logout', controller.userAccess.logout)
  router.put('/api/user/access/resetPsw', app.jwt, controller.userAccess.resetPsw)

  // user
  // router.post('/api/user', controller.user.create)
  // router.delete('/api/user/:id', controller.user.destroy)
  // router.put('/api/user/:id', controller.user.update)
  // router.get('/api/user/:id', controller.user.show)
  // router.get('/api/user', controller.user.index)
  router.delete('/api/user', controller.user.removes)
  router.resources('user', '/api/user', controller.user)

  // upload
  router.post('/api/upload', controller.upload.create)
  router.post('/api/upload/url', controller.upload.url)
  router.post('/api/uploads', controller.upload.multiple)
  router.delete('/api/upload/:id', controller.upload.destroy)
  // router.put('/api/upload/:id', controller.upload.update)
  router.post('/api/upload/:id', controller.upload.update) // Ant Design Pro
  router.put('/api/upload/:id/extra', controller.upload.extra)
  router.get('/api/upload/:id', controller.upload.show)
  router.get('/api/upload', controller.upload.index)
  router.delete('/api/upload', controller.upload.removes)
  // router.resources('upload', '/api/upload', controller.upload)
}
