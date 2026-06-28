/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'drive.fs.serve': {
    methods: ["GET","HEAD"],
    pattern: '/uploads/*',
    tokens: [{"old":"/uploads/*","type":0,"val":"uploads","end":""},{"old":"/uploads/*","type":2,"val":"*","end":""}],
    types: placeholder as Registry['drive.fs.serve']['types'],
  },
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home']['types'],
  },
  'posts.index': {
    methods: ["GET","HEAD"],
    pattern: '/posts',
    tokens: [{"old":"/posts","type":0,"val":"posts","end":""}],
    types: placeholder as Registry['posts.index']['types'],
  },
  'posts.show': {
    methods: ["GET","HEAD"],
    pattern: '/posts/:slug',
    tokens: [{"old":"/posts/:slug","type":0,"val":"posts","end":""},{"old":"/posts/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['posts.show']['types'],
  },
  'admin.login': {
    methods: ["GET","HEAD"],
    pattern: '/admin/login',
    tokens: [{"old":"/admin/login","type":0,"val":"admin","end":""},{"old":"/admin/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['admin.login']['types'],
  },
  'admin.login.store': {
    methods: ["POST"],
    pattern: '/admin/login',
    tokens: [{"old":"/admin/login","type":0,"val":"admin","end":""},{"old":"/admin/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['admin.login.store']['types'],
  },
  'admin.dashboard': {
    methods: ["GET","HEAD"],
    pattern: '/admin',
    tokens: [{"old":"/admin","type":0,"val":"admin","end":""}],
    types: placeholder as Registry['admin.dashboard']['types'],
  },
  'admin.categories.index': {
    methods: ["GET","HEAD"],
    pattern: '/admin/categories',
    tokens: [{"old":"/admin/categories","type":0,"val":"admin","end":""},{"old":"/admin/categories","type":0,"val":"categories","end":""}],
    types: placeholder as Registry['admin.categories.index']['types'],
  },
  'admin.categories.create': {
    methods: ["GET","HEAD"],
    pattern: '/admin/categories/create',
    tokens: [{"old":"/admin/categories/create","type":0,"val":"admin","end":""},{"old":"/admin/categories/create","type":0,"val":"categories","end":""},{"old":"/admin/categories/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['admin.categories.create']['types'],
  },
  'admin.categories.store': {
    methods: ["POST"],
    pattern: '/admin/categories',
    tokens: [{"old":"/admin/categories","type":0,"val":"admin","end":""},{"old":"/admin/categories","type":0,"val":"categories","end":""}],
    types: placeholder as Registry['admin.categories.store']['types'],
  },
  'admin.categories.edit': {
    methods: ["GET","HEAD"],
    pattern: '/admin/categories/:slug/edit',
    tokens: [{"old":"/admin/categories/:slug/edit","type":0,"val":"admin","end":""},{"old":"/admin/categories/:slug/edit","type":0,"val":"categories","end":""},{"old":"/admin/categories/:slug/edit","type":1,"val":"slug","end":""},{"old":"/admin/categories/:slug/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['admin.categories.edit']['types'],
  },
  'admin.categories.update': {
    methods: ["POST"],
    pattern: '/admin/categories/:slug',
    tokens: [{"old":"/admin/categories/:slug","type":0,"val":"admin","end":""},{"old":"/admin/categories/:slug","type":0,"val":"categories","end":""},{"old":"/admin/categories/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['admin.categories.update']['types'],
  },
  'admin.categories.destroy': {
    methods: ["POST"],
    pattern: '/admin/categories/:slug/delete',
    tokens: [{"old":"/admin/categories/:slug/delete","type":0,"val":"admin","end":""},{"old":"/admin/categories/:slug/delete","type":0,"val":"categories","end":""},{"old":"/admin/categories/:slug/delete","type":1,"val":"slug","end":""},{"old":"/admin/categories/:slug/delete","type":0,"val":"delete","end":""}],
    types: placeholder as Registry['admin.categories.destroy']['types'],
  },
  'admin.posts.index': {
    methods: ["GET","HEAD"],
    pattern: '/admin/posts',
    tokens: [{"old":"/admin/posts","type":0,"val":"admin","end":""},{"old":"/admin/posts","type":0,"val":"posts","end":""}],
    types: placeholder as Registry['admin.posts.index']['types'],
  },
  'admin.posts.create': {
    methods: ["GET","HEAD"],
    pattern: '/admin/posts/create',
    tokens: [{"old":"/admin/posts/create","type":0,"val":"admin","end":""},{"old":"/admin/posts/create","type":0,"val":"posts","end":""},{"old":"/admin/posts/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['admin.posts.create']['types'],
  },
  'admin.posts.store': {
    methods: ["POST"],
    pattern: '/admin/posts',
    tokens: [{"old":"/admin/posts","type":0,"val":"admin","end":""},{"old":"/admin/posts","type":0,"val":"posts","end":""}],
    types: placeholder as Registry['admin.posts.store']['types'],
  },
  'admin.posts.edit': {
    methods: ["GET","HEAD"],
    pattern: '/admin/posts/:slug/edit',
    tokens: [{"old":"/admin/posts/:slug/edit","type":0,"val":"admin","end":""},{"old":"/admin/posts/:slug/edit","type":0,"val":"posts","end":""},{"old":"/admin/posts/:slug/edit","type":1,"val":"slug","end":""},{"old":"/admin/posts/:slug/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['admin.posts.edit']['types'],
  },
  'admin.posts.update': {
    methods: ["POST"],
    pattern: '/admin/posts/:slug',
    tokens: [{"old":"/admin/posts/:slug","type":0,"val":"admin","end":""},{"old":"/admin/posts/:slug","type":0,"val":"posts","end":""},{"old":"/admin/posts/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['admin.posts.update']['types'],
  },
  'admin.posts.destroy': {
    methods: ["POST"],
    pattern: '/admin/posts/:slug/delete',
    tokens: [{"old":"/admin/posts/:slug/delete","type":0,"val":"admin","end":""},{"old":"/admin/posts/:slug/delete","type":0,"val":"posts","end":""},{"old":"/admin/posts/:slug/delete","type":1,"val":"slug","end":""},{"old":"/admin/posts/:slug/delete","type":0,"val":"delete","end":""}],
    types: placeholder as Registry['admin.posts.destroy']['types'],
  },
  'admin.logout': {
    methods: ["POST"],
    pattern: '/admin/logout',
    tokens: [{"old":"/admin/logout","type":0,"val":"admin","end":""},{"old":"/admin/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['admin.logout']['types'],
  },
  'attachments': {
    methods: ["GET","HEAD"],
    pattern: '/attachments/:key/:name?',
    tokens: [{"old":"/attachments/:key/:name?","type":0,"val":"attachments","end":""},{"old":"/attachments/:key/:name?","type":1,"val":"key","end":""},{"old":"/attachments/:key/:name?","type":3,"val":"name","end":""}],
    types: placeholder as Registry['attachments']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
