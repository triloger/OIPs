const Yup = require('yup')
const glob = require('glob')
const fm = require('front-matter')
const statuses = require('./statuses')
const fs = require('fs/promises')
const { promisify } = require('util')
const g = promisify(glob)

const snapshotIdRegex = /^https?:\/\/(snapshot.org).*\/([A-z0-9]{7,})$/

const commonValidationSchema = Yup.object().shape({
  file: Yup.string().required(),
  title: Yup.string().required(),
  type: Yup.string().oneOf(['Meta-Governance', 'Governance']).required(),
  proposal: Yup.string().matches(snapshotIdRegex),
  status: Yup.string().oneOf(statuses),
  author: Yup.string().required(),
  network: Yup.string()
    .oneOf(['Ethereum', 'Optimism', 'Ethereum & Optimism'])
    .required(),
  implementor: Yup.string().nullable(),
  release: Yup.string().nullable(),
  created: Yup.date().nullable(),
  updated: Yup.date().nullable(),
  requires: Yup.mixed().nullable(),
  'discussions-to': Yup.string().nullable(),
})

const oipValidationSchema = commonValidationSchema
  .concat(
    Yup.object().shape({
      oip: Yup.number().required(),
      network: Yup.string().required(),
    }),
  )
  .noUnknown()
  .strict()

const occpValidationSchema = commonValidationSchema
  .concat(
    Yup.object().shape({
      occp: Yup.number().required(),
    }),
  )
  .noUnknown()
  .strict()

;(async () => {
  try {
    const oips = await g('./content/oips/*.md')
    const occp = await g('./content/occp/*.md')

    // OIP
    await Promise.all(
      oips.map(async (file) => {
        const content = await fs.readFile(file, 'utf-8')
        const { attributes } = fm(content)
        const castValues = oipValidationSchema.cast({ file, ...attributes })
        return await oipValidationSchema.validate(castValues)
      }),
    )
    // OCCP
    await Promise.all(
      occp.map(async (file) => {
        const content = await fs.readFile(file, 'utf-8')
        const { attributes } = fm(content)
        const castValues = occpValidationSchema.cast({ file, ...attributes })
        return await occpValidationSchema.validate(castValues)
      }),
    )
  } catch (error) {
    console.log(error)
    console.error({
      value: error.value,
      errors: error.errors,
    })
    process.exit(1)
  }
})()
