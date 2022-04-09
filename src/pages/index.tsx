import * as React from 'react'
import { Helmet } from 'react-helmet'

import Main from '../layout/Main'

// markup
const IndexPage = () => (
  <Main>
    <Helmet title="Oikos Improvement Proposals" />
    <h1 className="page-heading">
      Oikos Improvement Proposals{' '}
      <a
        href="https://discordapp.com/channels/696732796323889233/"
        rel="nofollow"
      >
        <img
          className="max-w-full"
          src="https://img.shields.io/discord/696732796323889233.svg?color=768AD4&amp;label=discord"
          alt="Discord"
          data-canonical-src="https://img.shields.io/discord/696732796323889233.svg?color=768AD4&amp;label=discord"
        />
      </a>
    </h1>
    <p>
      Oikos Improvement Proposals (OIP) describe standards for the
      Oikos platform, including core protocol specifications, client APIs,
      and contract standards.
    </p>

    <h2>Contributing</h2>
    <ol>
      <li>
        Review <a href="/oip/oip-1">OIP-1</a>.
      </li>
      <li>
        Fork the repository by visiting the OIP{' '}
        <a href="https://github.com/oikos-cash/OIPs">repo</a> and pressing
        "Fork" in the top right.
      </li>
      <li>
        Add your OIP to your fork of the repository. There is a{' '}
        <a href="https://github.com/oikos-cash/OIPs/blob/master/oip-x.md">
          template OIP here
        </a>
        .
      </li>
      <li>
        Submit a Pull Request to Oikos's{' '}
        <a href="https://github.com/oikos-cash/OIPs">OIP repository</a>.
      </li>
    </ol>

    <p>
      Your first PR should be a first draft of the final OIP. It must meet the
      formatting criteria enforced by the build (largely, correct metadata in
      the header). An editor will manually review the first PR for a new OIP and
      assign it a number before merging it. Make sure you include a <code>discussions-to</code> header with the URL to a discussion forum or
      open GitHub issue where people can discuss the OIP as a whole.
    </p>
    <p>
      If your OIP requires images, the image files should be included in a
      subdirectory of the `assets` folder for that OIP as follow: <code>oip/assets/oip-X</code> (for oip <b>X</b>). When linking to an
      image in the OIP, use relative links such as{' '}
      <code>../assets/oip-X/image.png</code>.
    </p>
    <p>
      When you believe your OIP is mature and ready to progress past the{' '}
      <code>Draft</code> phase, you should reach out to a Oikos Council member
      on discord by searching members with the "Oikos Council" role or finding
      them within the #governance channel. The Oikos Council will schedule in
      a call with the OIP author to go through the OIP in more detail.
    </p>

    <p>
      Once assessed, a OIP is moved into <code>Feasibility</code> and a Core
      Contributor is assigned. The Core Contributor will work with the author to
      conduct a feasibility study. Once the Author and the Core Contributor are
      satisfied, a OIP is moved to <code>OC Review Pending</code>. Once the
      Oikos Council has formally reviewed the OIP during the OIP presentation
      they can either move it to a vote or send it back to{' '}
      <code>Feasability</code>. A vote is conducted within the{' '}
      <code>oikos.eth</code> snapshot space connected on the
      upcoming staking dApp. If a vote by
      the Oikos Council reaches a super majority, the OIP is moved to{' '}
      <code>Approved</code>, otherwise it is <code>Rejected</code>.
    </p>

    <p>
      Once the OIP has been implemented by either the protocol DAO or the OIP
      author and relevant parties, the OIP is assigned the{' '}
      <code>Implemented</code> status. Community members who successfully reach
      this stage are entitled to a reward from the Oikos Protocol.
    </p>

    <h2>OIP status terms</h2>
    <ul>
      <li>
        <strong>Draft</strong> - The initial state of a new OIP before the
        Oikos Council and core contributors have assessed it.
      </li>
      <li>
        <strong>Feasibility</strong> - a OIP that is being assessed for
        feasability with an assigned Core Contributor
      </li>
      <li>
        <strong>OC Review Pending</strong> - a OIP that is awaiting a Oikos
        Council Review after the Author and Core Contributor are satisfied with
        feasibility
      </li>
      <li>
        <strong>Vote Pending</strong> - a OIP that is awaiting a vote.
      </li>
      <li>
        <strong>Approved</strong> - a OIP that has successfully reached a super
        majority Oikos Council vote in favour.
      </li>
      <li>
        <strong>Rejected</strong> - a OIP that has failed to reach a
        supermajority Oikos Council vote in favour.
      </li>
      <li>
        <strong>Implemented</strong> - a OIP that has been released to main-net.
      </li>
    </ul>
  </Main>
)

export default IndexPage
