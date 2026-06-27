import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'home': { paramsTuple?: []; params?: {} }
    'admin.login': { paramsTuple?: []; params?: {} }
    'admin.login.store': { paramsTuple?: []; params?: {} }
    'admin.dashboard': { paramsTuple?: []; params?: {} }
    'admin.categories.index': { paramsTuple?: []; params?: {} }
    'admin.categories.create': { paramsTuple?: []; params?: {} }
    'admin.categories.store': { paramsTuple?: []; params?: {} }
    'admin.categories.edit': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'admin.categories.update': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'admin.categories.destroy': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'admin.posts.index': { paramsTuple?: []; params?: {} }
    'admin.posts.create': { paramsTuple?: []; params?: {} }
    'admin.posts.store': { paramsTuple?: []; params?: {} }
    'admin.posts.edit': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'admin.posts.update': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'admin.posts.destroy': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'attachments': { paramsTuple: [ParamValue,ParamValue?]; params: {'key': ParamValue,'name'?: ParamValue} }
  }
  GET: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'home': { paramsTuple?: []; params?: {} }
    'admin.login': { paramsTuple?: []; params?: {} }
    'admin.dashboard': { paramsTuple?: []; params?: {} }
    'admin.categories.index': { paramsTuple?: []; params?: {} }
    'admin.categories.create': { paramsTuple?: []; params?: {} }
    'admin.categories.edit': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'admin.posts.index': { paramsTuple?: []; params?: {} }
    'admin.posts.create': { paramsTuple?: []; params?: {} }
    'admin.posts.edit': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'attachments': { paramsTuple: [ParamValue,ParamValue?]; params: {'key': ParamValue,'name'?: ParamValue} }
  }
  HEAD: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'home': { paramsTuple?: []; params?: {} }
    'admin.login': { paramsTuple?: []; params?: {} }
    'admin.dashboard': { paramsTuple?: []; params?: {} }
    'admin.categories.index': { paramsTuple?: []; params?: {} }
    'admin.categories.create': { paramsTuple?: []; params?: {} }
    'admin.categories.edit': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'admin.posts.index': { paramsTuple?: []; params?: {} }
    'admin.posts.create': { paramsTuple?: []; params?: {} }
    'admin.posts.edit': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'attachments': { paramsTuple: [ParamValue,ParamValue?]; params: {'key': ParamValue,'name'?: ParamValue} }
  }
  POST: {
    'admin.login.store': { paramsTuple?: []; params?: {} }
    'admin.categories.store': { paramsTuple?: []; params?: {} }
    'admin.categories.update': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'admin.categories.destroy': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'admin.posts.store': { paramsTuple?: []; params?: {} }
    'admin.posts.update': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'admin.posts.destroy': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'session.destroy': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}