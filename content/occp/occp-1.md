---
occp: 1
network: BNB Chain
title: OCCP Purpose and Guidelines
status: Draft
author: Manuel Corona <@triloger>
created: 2022-05-17T00:00:00.000Z
type: Governance
---

## What is an OCCP?

OCCP stands for Oikos Configuration Change Proposal. OCCP's are documents to make a case for modifying one of the system configuration variables. The intent is to provide a clear and detailed history behind each configuration change and the rationale behind it at the time it was implemented. The author of the document is responsible for building consensus within the community and documenting dissenting opinions.

## OCCP Rationale

We intend OCCPs to be the primary mechanisms for proposing configuration changes to Oikos. Because they are maintained as text files in a versioned repository, their revision history is the historical record of the configuration change proposal.

It is highly recommended that a single OCCP contain a single variable change. The more focused the OCCP, the more successful it is likely to be.

An OCCP must meet certain minimum criteria. It must be a clear and complete description of the proposed variable change.

## OCCP Work Flow

Parties involved in the process are the _author_, the [_OIP editors_], and the [Oikos Team].

:warning: Before you begin, vet your idea, this will save you time. Ask the Oikos community first if the proposed change is original to avoid wasting time on something that will be rejected based on prior research (searching the Internet does not always do the trick). It also helps to make sure the idea is applicable to the entire community and not just the author. Just because an idea sounds good to the author does not mean it will have the intend effect. The appropriate public forum to gauge interest around your OCCP is [the Oikos Discord].

Your role as the champion is to write the OCCP using the style and format described below, initiate the discussions in the appropriate forums, and build community consensus around the idea. Following is the process that a successful OCCP will move along:

```
[ WIP ] -> [ PROPOSED ] -> [ APPROVED ] -> [ IMPLEMENTED ]
```

Each status change is requested by the OCCP author and reviewed by the OIP editors. Use a pull request to update the status. Please include a link to where people should continue discussing your OCCP. The OIP editors will process these requests as per the conditions below.

- **Work in progress (WIP)** -- Once the author has asked the Oikos community whether an idea has any chance of support, they will write a draft OCCP as a [pull request].

- **Proposed** If agreeable, OIP editor will assign the OCCP a number (generally the issue or PR number related to the OCCP) and merge your pull request. The OIP editor will not unreasonably deny an OCCP. Proposed OCCPs will be discussed on governance calls and in Discord. If there is a reasonable level of consensus around the change on the governance call the change will be moved to approved. If the change is contentious a vote of token holders may be held to resolve the issue or approval may be delayed until consensus is reached.

- **Approved** -- This OCCP has passed community governance and is now being prioritised.

- **Implemented** -- This OCCP has been implemented and the variable changed on mainnet.

## What belongs in a successful OCCP?

Each OCCP should have the following parts:

- Preamble - RFC 822 style headers containing metadata about the OCCP, including the OCCP number, a short descriptive title (limited to a maximum of 44 characters), and the author details.
- Simple Summary - “If you can’t explain it simply, you don’t understand it well enough.” Provide a simplified and layman-accessible explanation of the OCCP.
- Abstract - a short (~200 word) description of the variable change proposed.
- Motivation (\*optional) - The motivation is critical for OCCPs that want to update variables within Oikos. It should clearly explain why the existing variable is not incentive aligned. OCCP submissions without sufficient motivation may be rejected.
- Copyright Waiver - All OCCPs must be in the public domain. See the bottom of this OCCP for an example copyright waiver.

## OCCP Formats and Templates

OCCPs should be written in [markdown] format.
Image files should be included in a subdirectory of the `assets` folder for that OCCP as follows: `assets/occp-X` (for occp **X**). When linking to an image in the OCCP, use relative links such as `../assets/occp-X/image.png`.

## OCCP Header Preamble

Each OCCP must begin with an [RFC 822](https://www.ietf.org/rfc/rfc822.txt) style header preamble, preceded and followed by three hyphens (`---`). This header is also termed ["front matter" by Jekyll](https://jekyllrb.com/docs/front-matter/). The headers must appear in the following order. Headers marked with "\*" are optional and are described below. All other headers are required.

` oip:` <OCCP number> (this is determined by the OIP editor)

` title:` <OCCP title>

` author:` <a list of the author's or authors' name(s) and/or username(s), or name(s) and email(s). Details are below.>

` * discussions-to:` \<a url pointing to the official discussion thread\>

` status:` < WIP | PROPOSED | APPROVED | IMPLEMENTED >

` created:` <date created on>

` * updated:` <comma separated list of dates>

` * requires:` <OIP number(s)>

Headers that permit lists must separate elements with commas.

Headers requiring dates will always do so in the format of ISO 8601 (yyyy-mm-dd).

#### `author` header

The `author` header optionally lists the names, email addresses or usernames of the authors/owners of the OCCP. Those who prefer anonymity may use a username only, or a first name and a username. The format of the author header value must be:

> Random J. User &lt;address@dom.ain&gt;

or

> Random J. User (@username)

if the email address or GitHub username is included, and

> Random J. User

if the email address is not given.

#### `discussions-to` header

While an OCCP is in WIP or Proposed status, a `discussions-to` header will indicate the mailing list or URL where the OCCP is being discussed.

#### `created` header

The `created` header records the date that the OCCP was assigned a number. Both headers should be in yyyy-mm-dd format, e.g. 2001-08-14.

#### `updated` header

The `updated` header records the date(s) when the OCCP was updated with "substantial" changes. This header is only valid for OCCPs of Draft and Active status.

#### `requires` header

OCCPs may have a `requires` header, indicating the OCCP numbers that this OCCP depends on.

## Auxiliary Files

OCCPs may include auxiliary files such as diagrams. Such files must be named OCCP-XXXX-Y.ext, where “XXXX” is the OCCP number, “Y” is a serial number (starting at 1), and “ext” is replaced by the actual file extension (e.g. “png”).

## OIP Editors

The current OIP editors can be found listed in [OIP-1](https://github.com/oikos-cash/OIPs/blob/master/content/oips/oip-1.md)

## OIP Editor Responsibilities

For each new OCCP that comes in, an editor does the following:

- Read the OCCP to check if it is ready: sound and complete. The ideas must make technical sense, even if they don't seem likely to get to final status.
- The title should accurately describe the content.
- Check the OCCP for language (spelling, grammar, sentence structure, etc.), markup (Github flavored Markdown), code style

If the OCCP isn't ready, the editor will send it back to the author for revision, with specific instructions.

Once the OCCP is ready for the repository, the OIP editor will:

- Assign an OCCP number (generally the PR number or, if preferred by the author, the Issue # if there was discussion in the Issues section of this repository about this OCCP)

- Merge the corresponding pull request

- Send a message back to the OCCP author with the next step.

Many OCCPs are written and maintained by developers with write access to the BNB chain codebase. The OIP editors monitor OCCP changes, and correct any structure, grammar, spelling, or markup mistakes we see.

The editors don't pass judgment on OCCPs. We merely do the administrative & editorial part.

## History

The OCCP document was derived heavily from the EIP Ethereum Improvement Proposal document in many places text was simply copied and modified. Any comments about the OCCP document should be directed to the OIP editors. The history of the EIP is quoted below from the EIP document for context:

- _"This document (EIP) was derived heavily from [Bitcoin's BIP-0001] written by Amir Taaki which in turn was derived from [Python's PEP-0001]. In many places text was simply copied and modified. Although the PEP-0001 text was written by Barry Warsaw, Jeremy Hylton, and David Goodger, they are not responsible for its use..."_ \*

May 17, 202: OCCP-1 has been drafted and submitted as a PR.

See [the revision history for further details] which is available by clicking on the History button in the top right of the OCCP.

### Bibliography

[the oikos discord]: https://discord.gg/eEZbtVKgbb
[pull request]: https://github.com/oikos-cash/OIPs/pulls
[markdown]: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
[bitcoin's bip-0001]: https://github.com/bitcoin/bips
[python's pep-0001]: https://www.python.org/dev/peps/
[oikos team]: https://github.com/orgs/oikos-cash/people

## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).