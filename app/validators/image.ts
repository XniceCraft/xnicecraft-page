import vine from '@vinejs/vine'

export const imageValidator = () =>
  vine.file({
    size: '10mb',
    extnames: ['jpg', 'jpeg', 'png', 'webp'],
  })

export const imageCreateFieldValidator = () =>
  vine.object({
    type: vine.literal('replace'),
    file: imageValidator(),
  })

export const imageUpdateFieldValidator = () =>
  vine.union([
    vine.union.if(
      (value) => vine.helpers.isObject(value) && value.type === 'keep',
      vine.object({
        type: vine.literal('keep'),
      })
    ),
    vine.union.if(
      (value) => vine.helpers.isObject(value) && value.type === 'replace',
      vine.object({
        type: vine.literal('replace'),
        file: imageValidator(),
      })
    ),
  ])
