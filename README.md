# OIP [Discord](https://discord.gg/VVDu6Er) [Twitter](https://twitter.com/oikos_cash) [Telegram](https://t.me/oikoscash)

Oikos Improvement Proposals (OIP) describe standards for the Oikos platform, including core protocol specifications, client APIs, and contract standards.

# Contributing

1.  Review [OIP-1](https://github.com/oikos-cash/OIPs/blob/master/content/oip/oip-1.md).
2.  Fork the repository by clicking "Fork" in the top right.
3.  Add your OIP to your fork of the repository. There is a [template OIP here](oip-x.md).
4.  Submit a Pull Request to Oikos's [OIPs repository](https://github.com/oikos-cash/OIPs).

Your first PR should be a first draft of the final OIP. It must meet the formatting criteria enforced by the build (largely, correct metadata in the header). An editor will manually review the first PR for a new OIP and assign it a number before merging it. Make sure you include a `discussions-to` header with the URL to a new thread on [research.oikos.cash](https://research.oikos.cash) where people can discuss the OIP as a whole.

If your OIP requires images, the image files should be included in a subdirectory of the `assets` folder for that OIP as follow: `assets/oip-X` (for oip **X**). When linking to an image in the OIP, use relative links such as `../assets/oip-X/image.png`.

When you believe your OIP is mature and ready to progress past the Draft phase, you should reach out to a Oikos Council member on discord by searching members with the "Oikos Council" role or finding them within the #governance channel. The Oikos Council will schedule in a call with the OIP author to go through the OIP in more detail.

Once assessed, a OIP is moved into `Feasibility` and a Core Contributor is assigned. The Core Contributor will work with the author to conduct a feasibility study. Once the Author and the Core Contributor are satisfied, a OIP is moved to `OC Review Pending`. Once the Oikos Council has formally reviewed the OIP during the OIP presentation they can either move it to a vote or send it back to `Feasability`. A vote is conducted within the `oikos.eth` snapshot space connected to our [dApp](https://oikos.cash/) . If a vote by the Oikos Council reaches a super majority, the OIP is moved to `Approved`, otherwise it is `Rejected`.

Once the OIP has been implemented by either the protocol DAO or the OIP author and relevant parties, the OIP is assigned the `Implemented` status. There is a 100 OKS (subject to changes) bounty for proposing a OIP that reaches the `Implemented` phase.

# OIP Statuses

- **Draft** - The initial state of a new OIP before the Oikos Council and core contributors have assessed it.
- **Feasibility** - a OIP that is being assessed for feasibility with an assigned Core Contributor
- **OC_Review_Pending** - a OIP that is awaiting a Oikos Council Review after the Author and Core Contributor are satisfied with feasibility
- **Vote_Pending** - a OIP that is awaiting a vote.
- **Approved** - a OIP that has successfully reached a super majority Oikos Council vote in favour.
- **Rejected** - a OIP that has failed to reach a super-majority Oikos Council vote in favour.
- **Implemented** - a OIP that has been released to main-net.

# Validation

OIPs must pass some validation tests.

It is possible to run the OIP validator locally:

```
npm install (if not done already)
npm run test
```

# Automerger

The OIP repository contains an "auto merge" feature to ease the workload for OIP editors. If a change is made via a PR to a draft OIP, then the authors of the OIP can Github approve the change to have it auto-merged by the [oip-automerger](https://github.com/bakaoh/oip_automerger) bot.
