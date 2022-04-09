const fs = require('fs')
const kebabCase = require('lodash/kebabCase')
const statuses = require('./ci/statuses')

const kebabStatuses = statuses.map(kebabCase)

const Frontmatter = `
  fragment Frontmatter on MarkdownRemarkFrontmatter {
    oip
    occp
    title
    author
    network
    type
    proposal
    implementor
    release
    created
    updated
    status
  }
`
const allOipsQuery = `
  ${Frontmatter}
  query allOips {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/oips/" }
        frontmatter: { oip: { ne: null } }
      }
    ) {
      group(field: frontmatter___status) {
        fieldValue
        nodes {
          frontmatter {
            ...Frontmatter
          }
          md: rawMarkdownBody
          html
        }
      }
    }
  }
`

const allOccpQuery = `
  ${Frontmatter}
  query allOips {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/occp/" }
        frontmatter: { occp: { ne: null } }
      }
    ) {
      group(field: frontmatter___status) {
        fieldValue
        nodes {
          frontmatter {
            ...Frontmatter
          }
          md: rawMarkdownBody
          html
        }
      }
    }
  }
`

exports.onPostBuild = async ({ graphql }) => {
  const allOips = await graphql(allOipsQuery)
  const allOccp = await graphql(allOccpQuery)

  const oipsPath = './public/api/oips'
  const occpPath = './public/api/occp'

  ;[
    { path: oipsPath, result: allOips },
    { path: occpPath, result: allOccp },
  ].forEach(({ path, result }) => {
    if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true })

    // Initialize all statuses with empty array
    kebabStatuses.forEach((status) =>
      fs.writeFileSync(`${path}/${status}.json`, JSON.stringify([])),
    )

    result.data.allMarkdownRemark.group.forEach((group) => {
      const status = kebabCase(group.fieldValue)
      const data = group.nodes.map(({ frontmatter, ...node }) => ({
        ...frontmatter,
        ...node,
      }))
      fs.writeFileSync(`${path}/${status}.json`, JSON.stringify(data))
    })
  })
}

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions
  const typeDefs = [
    `
    type MarkdownRemarkFrontmatter implements Node {
      oip: Int
      occp: Int
      title: String
      type: String
      network: String
      status: String
      author: String
      implementor: String
      proposal: String
      release: String
      created: Date
      updated: Date
    }
  `,
    // schema.buildObjectType({
    //   name: 'Frontmatter',
    //   fields: {
    //     tags: {
    //       type: 'String!',
    //       resolve(source, args, context, info) {
    //         const { tags } = source
    //         console.log(source)
    //         switch (source[info.fieldName]) {
    //           case 'type':
    //             return 'TBD'
    //           case 'implementor':
    //             return 'TBD'
    //           default:
    //             return tags
    //         }
    //       },
    //     },
    //   },
    // }),
  ]
  createTypes(typeDefs)
}
