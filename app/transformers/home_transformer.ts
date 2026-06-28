import { BaseTransformer } from '@adonisjs/core/transformers'

import type Home from '#models/home'

export default class HomeTransformer extends BaseTransformer<Home> {
  toObject() {
    return {}
  }
}
