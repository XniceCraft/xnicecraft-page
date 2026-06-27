/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'drive.fs.serve': {
    methods: ["GET","HEAD"]
    pattern: '/uploads/*'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { '*': ParamValue[] }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'home': {
    methods: ["GET","HEAD"]
    pattern: '/'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'admin.login': {
    methods: ["GET","HEAD"]
    pattern: '/admin/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/session_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/session_controller').default['index']>>>
    }
  }
  'admin.login.store': {
    methods: ["POST"]
    pattern: '/admin/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/session_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/session_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.dashboard': {
    methods: ["GET","HEAD"]
    pattern: '/admin'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/dashboard_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/dashboard_controller').default['index']>>>
    }
  }
  'admin.categories.index': {
    methods: ["GET","HEAD"]
    pattern: '/admin/categories'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/categories_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/categories_controller').default['index']>>>
    }
  }
  'admin.categories.create': {
    methods: ["GET","HEAD"]
    pattern: '/admin/categories/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/categories_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/categories_controller').default['create']>>>
    }
  }
  'admin.categories.store': {
    methods: ["POST"]
    pattern: '/admin/categories'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/category').upsertCategoryValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/category').upsertCategoryValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/categories_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/categories_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.categories.edit': {
    methods: ["GET","HEAD"]
    pattern: '/admin/categories/:slug/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/categories_controller').default['edit']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/categories_controller').default['edit']>>>
    }
  }
  'admin.categories.update': {
    methods: ["POST"]
    pattern: '/admin/categories/:slug'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/category').upsertCategoryValidator)>>
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/category').upsertCategoryValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/categories_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/categories_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.categories.destroy': {
    methods: ["POST"]
    pattern: '/admin/categories/:slug/delete'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/categories_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/categories_controller').default['destroy']>>>
    }
  }
  'admin.posts.index': {
    methods: ["GET","HEAD"]
    pattern: '/admin/posts'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/posts_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/posts_controller').default['index']>>>
    }
  }
  'admin.posts.create': {
    methods: ["GET","HEAD"]
    pattern: '/admin/posts/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/posts_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/posts_controller').default['create']>>>
    }
  }
  'admin.posts.store': {
    methods: ["POST"]
    pattern: '/admin/posts'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/post').createPostValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/post').createPostValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/posts_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/posts_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.posts.edit': {
    methods: ["GET","HEAD"]
    pattern: '/admin/posts/:slug/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/posts_controller').default['edit']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/posts_controller').default['edit']>>>
    }
  }
  'admin.posts.update': {
    methods: ["POST"]
    pattern: '/admin/posts/:slug'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/post').updatePostValidator)>>
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/post').updatePostValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/posts_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/posts_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.posts.destroy': {
    methods: ["POST"]
    pattern: '/admin/posts/:slug/delete'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/posts_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/posts_controller').default['destroy']>>>
    }
  }
  'session.destroy': {
    methods: ["POST"]
    pattern: '/admin/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/session_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/session_controller').default['destroy']>>>
    }
  }
  'attachments': {
    methods: ["GET","HEAD"]
    pattern: '/attachments/:key/:name?'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { key: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('@jrmc/adonis-attachment/controllers/attachments_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('@jrmc/adonis-attachment/controllers/attachments_controller').default['handle']>>>
    }
  }
}
