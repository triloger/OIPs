import { Link } from 'gatsby'
import React from 'react'
import { MarkdownRemark } from '../../types/gql'
import { AuthorList } from './AuthorList'

interface Props {
  rows: Partial<MarkdownRemark>[]
}

const StatusTable: React.FC<Props> = ({ rows }) => {
  return (
    <table className="oiptable">
      <thead>
        <tr>
          <th className="oipnum">Number</th>
          <th className="title w-2/3">Title</th>
          <th className="author w-1/3">Author</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            <td className="oipnum">
              {row.frontmatter.oip ? (
                <a href={`/oips/oip-${row.frontmatter.oip}`}>
                  {row.frontmatter.oip}
                </a>
              ) : (
                <a href={`/occp/occp-${row.frontmatter.occp}`}>
                  {row.frontmatter.occp}
                </a>
              )}
            </td>
            <td className="title">{row.frontmatter.title}</td>
            <td className="author">
              <AuthorList author={row.frontmatter.author} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export { StatusTable }
