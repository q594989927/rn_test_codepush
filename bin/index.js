require('babel-polyfill')
require('babel-register')
import * as user from './pushy/user'
import * as api from './pushy/api'
import * as app from './pushy/app'
import * as _package from './pushy/package'
// commands.login( { args:["qianqibaiguai@foxmail.com","Qq416997155"]})

const me = async () => {
  await api.loadSession()
  user.commands.me()
}

const selectApp = async () => {
  await api.loadSession()
  await app.listApp('android')
  // app.getSelectedApp('android')
}

const listPackage = async () => {
  const appId = '17225'
  await api.loadSession()
  _package.listPackage('17225')

  // const { data } = await api.get(`/app/${appId}/package/list?limit=1000`)
  // console.log(data)
}

const publish = async () => {
  const appId = '17225'
  await api.loadSession()
  const { hash } = await api.uploadFile('./res.ppk')
  console.log(hash)
  const { id } = await api.post(`/app/${appId}/version/create`, {
    name: '1.0.4',
    hash,
    description: '我是描述',
    metaInfo: '我是metaInfo'
  })
  console.log(`Version published: ${id}`)
  const pkgId = '26252'
  await api.put(`/app/${appId}/package/${pkgId}`, {
    versionId: id
  })
  console.log('Ok.')
}

// selectApp()
// listPackage()
publish()
// me()
