---
oip: 3
network: Polygon
title: Support OKS on EVM compatible chain
status: Draft
author: Manuel Corona (@triloger)
created: 2022-04-17T00:00:00.000Z
type: Governance
---

## Simple Summary

<!--"If you can't explain it simply, you don't understand it well enough." Simply describe the outcome the proposed changes intends to achieve. This should be non-technical and accessible to a casual community member.-->

Enable OKS to be used on EVM compatible chain

## Abstract

<!--A short (~200 word) description of the proposed change, the abstract should clearly describe the proposed change. This is what *will* be done if the OIP is implemented, not *why* it should be done or *how* it will be done. If the OIP proposes deploying a new contract, write, "we propose to deploy a new contract that will do x".-->

Integrate with Polygon to enable the staking of `OKS`.

## Motivation

<!--This is the problem statement. This is the *why* of the OIP. It should clearly explain *why* the current state of the protocol is inadequate.  It is critical that you explain *why* the change is needed, if the OIP proposes changing how something is calculated, you must address *why* the current calculation is innaccurate or wrong. This is not the place to describe how the OIP will address the issue!-->

After investigating the various options, Polygon was deemed to be the best fit for Oikos's needs. In short, Ethereum's Virtual Machine (the EVM) allows contract code from BNB Chain to be ported to Polygon wholesale, with only minor modifications. 

In order to tease out any challenges integrating with a new blockchain, several tests have been underway on Matic (Polygon) Testnet Mumbai since late December. After a couple of months working closely with the team, the code is ready to be released on mainnet.

## Specification

> Note: This OIP proposes using Polygon for staking only. Future proposals may well introduce support for exchanging as well.

<!--The specification should describe the syntax and semantics of any new feature, there are five sections
1. Overview
2. Rationale
3. Technical Specification
4. Test Cases
5. Configurable Values
-->

### Overview

<!--This is a high level overview of *how* the OIP will solve the problem. The overview should clearly describe how the new feature will be implemented.-->

The creation of two new contracts - a deposit contract for BNB Chain and withdrawal for Polygon.

1. A bridge contract on Polygon: `OikosBridgeToMatic` that supports the following:

   - When invoked by a user for a deposit of OKS, will hold the OKS as a deposit, will burn any escrowed BNB Chain OKS and send a message to Polygon representing the deposited OKS and escrow entries
   - When distributed with OKS rewards, will hold the OKS as a deposit, and send a message to Polygon representing the OKS to be distributed as rewards to Polygon
   - When invoked with a relayed message of withdrawal from Polygon, will relinquish the OKS to the account

2. A bridge contract on Polygon: `OikosBridgeToBase` that supports the following:
   - When invoked by a user for a withdrawal of OKS, will burn the OKS on Polygon and send a message to BNB Chain representing the OKS to withdraw
   - When invoked with a relayed message of deposit from BNB Chain, will mint the OKS to the user on Polygon and populate escrow entries matching what was previously on BNB Chain
   - When invoked with a relayed message of OKS rewards from BNB Chain, will mint this OKS right into the `RewardsDistribution` contrat for the upcoming claim period

Further, a polymorphic approach to existing contracts needs to be considered (see Limitations of the EVM below). By utilizing polymorphism and the contract labeling within the Oikos protocol, we can allow for different implementations of key contracts. These include:

- `EtherCollateral` replaced with an empty shell (no native Ether support)
- `SupplySchedule` replaced with a `FixedSupplySchedule` that allows for a fixed amount at construction time (as OKS on Polygon will purely be a representation of the OKS in the BNB Chain deposit contract and have no monetary policy)
- `Oikos` replaced with `MintableOikos` to allow for the minting and burning of OKS on Polygon due to messages from the Polygon bridge (as regular OKS cannot be minted outside the regular supply schedule)
- `DebtCache` replaced with `RealtimeDebtCache` to ignore debt caching in Polygon
- `RewardEscrowV2` replaced with `ImportableRewardEscrowV2` allow escrow entries on Polygon to be imported from BNB Chain (coming with [OIP-60](./OIP-60.md))

### Rationale

<!--This is where you explain the reasoning behind how you propose to solve the problem. Why did you propose to implement the change in this way, what were the considerations and trade-offs. The rationale fleshes out what motivated the design and why particular design decisions were made. It should describe alternate designs that were considered and related work. The rationale may also provide evidence of consensus within the community, and should discuss important objections or concerns raised during discussion.-->

In essence Optimism is a virtual blockchain, connected to and supported by BNB Chain. In order for state to enter Polygon, it needs to be passed in by a transaction to BNB Chain. These transactions include ERC20 deposits, as well as more sophisticated payloads of structured data.

In order for existing users to utilize Polygon, their BNB Chain OKS needs to find its way to Polygon. To this end, this OIP proposes creating an ERC20 deposit contract for OKS with custom features to migrate escrow entries.

#### Limitations of the EVM

Due to the nature of on-chain fraud proofs, certain limitations are in place to enable trustless verification of state transitions within the EVM.

- _Contract size limits_: in order to run in the EVM, contracts must be transpiled using the EVM transpiler, adding wrapping bytecode to contracts and expanding size. This only affects contracts near to the 24KB limit of EIP-170. Mitigation: switch to subclass of the contract with stubs for unused Polygon functionality.
- Contract deployment limits: contracts and the construction code need to fit within approximately 7.5m, as to be instantiated within the fraud proofs execution manager. Mitigation: the overhaul and removal of complex constructor logic in [OIP-100](./OIP-100.md)
- No native Ether: the EVM uses wETH instead of ETH for all payments. Mitigation: removal of unused `EtherCollateral` and `Depot` contrats from Polygon deploy.
- No self-destruct: the EVM transpiler does not allow the use of `selfdestruct`. As [this opcode is problematic](https://twitter.com/VitalikButerin/status/1301390479968202752?s=20) in Ethereum in general, the mitigation is to remove support for this feature altogether in all Oikos contracts.
- Compiler safety checks: when a contract's constructor arguments are read as potential opcodes, dangerous pairings can occur, proventing their instantiation in the execution manager for fraud proofs. Mitigation: on deployment, prevent contract creation with dangerous opcodes in the address (by analyzing after creation).

### Technical Specification

<!--The technical specification should outline the public API of the changes proposed. That is, changes to any of the interfaces Oikos currently exposes or the creations of new ones.-->

```solidity
interface IOikosBridgeToOptimism {
    // invoked by users on BNB Chain
    function deposit(uint amount) external;

    // invoked by users that want to also migrate their escrow
    function depositAndMigrateEscrow(uint256 depositAmount, uint256[] calldata entryIDs) external;

    // invoked by a generous BNB Chain user (the OikosDAO)
    function rewardDeposit(uint amount) external;

    // implementation of RewardsDistributionRecipient (for potential future use)
    function notifyRewardAmount(uint256 amount) external;

    // invoked by the relayer on BNB Chain
    function completeWithdrawal(address account, uint amount) external;

    // restricted owner function to migrate to a new bridge
    function migrateBridge(address newBridge) external;


}

interface IOikosBridgeToBase {
    // invoked by users on Polygon
    function initiateWithdrawal(uint amount) external;

    // invoked by the relayer on Polygon
    function mintSecondaryFromDeposit(address account, uint amount) external;

    // invoked by the relayer on Polygon
    function mintSecondaryFromDepositForRewards(uint amount) external;

    // invoked by the relayer on Polygon
    function importVestingEntries(
        address account,
        uint256 escrowedAmount,
        VestingEntry[] calldata vestingEntries
    ) external;
}
```

> Note: in order to connect these bridge contracts to the Optimism messengers, a proposal to add to the AddressResolver is as follows:
>
> For the external Optimism messenger contracts, the `ext:Messenger` label be imported to that layer's `AddressResolver`. These can be configured at deploy time.
>
> For each bridge to indicate the other as a message recipient, the target layer can act as a prefix. I.e. the BNB Chain bridge needs to know about `EVM:OikosBridgeToBase` and the Polygon bridge needs to know about its counterpart, the `base:OikosBridgeToOptimism`. As these dependencies are circular, they can be configured soon after deployment of the protocol on both layers.

### Test Cases

<!--Test cases for an implementation are mandatory for OIPs but can be included with the implementation..-->

TBD

### Configurable Values (Via OCCP)

<!--Please list all values configurable via OCCP under this implementation.-->

As this OIP only proposes supporting `OKS` staking on Polygon, there will be no trading rewards to claim on Polygon. Thus only OKS rewards are relevant here, and those will only exist if they are sent to Polygon by a benevolent holder - such as the OikosDAO.

## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).