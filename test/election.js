const { expect } = require("chai");

// describe("Token Contract", function () {
//   let Token;
//   let hardhatToken;
//   let owner;
//   let addr1;
//   let addr2;
//   let addrs;

//   beforeEach(async function () {
//     election = await ethers.getContractFactory("Election");
//     [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
//     hardhatElection = await election.deploy();
//   });

//   describe("Deployment", function () {
//     it("Should have zero votes at start", async function () {

//     console.log("hardhatElection.candidatesCount(): ",  await parseInt(hardhatElection.candidatesCount()));

//       expect(await hardhatElection.candidatesCount()).to.equal(0);
//     });
   
//   });


// });


// const Election = artifacts.require("Election");

describe("Election", function (accounts) {
  let electionInstance;

  beforeEach(async function () {
    election = await ethers.getContractFactory("Election");
    electionInstance = await election.deploy("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266");
  });

  it("Start with zero candidates", async function () {
    const count = await electionInstance.candidatesCount();
    expect(count.toNumber()).to.equal(0);
  });

  it("Adding a condidate", async function () {
   
    await electionInstance.addCandidate("ibti","vote for me","2");
    const countR = await electionInstance.candidatesCount();
    const count = countR.toNumber();
    console.log("num of candidates: ", count)
    const candDet = await electionInstance.candidates(count)
    console.log("candidate details: ", candDet);
    expect(await count).to.equal(1);
  });

  // it("initializes the candidates with the correct values", async function () {
  //   let candidate = await electionInstance.candidates(1);
  //   expect(candidate[0].toNumber()).to.equal(1);
  //   expect(candidate[1]).to.equal("Candidate1");
  //   expect(candidate[2].toNumber()).to.equal(0);

  //   candidate = await electionInstance.candidates(2);
  //   expect(candidate[0].toNumber()).to.equal(2);
  //   expect(candidate[1]).to.equal("Candidate2");
  //   expect(candidate[2].toNumber()).to.equal(0);
  // });

  // it("allows a voter to cast a vote", async function () {
  //   const candidateId = 1;
  //   const receipt = await electionInstance.vote(candidateId, { from: accounts[0] });
  //   expect(receipt.logs.length).to.equal(1);
  //   expect(receipt.logs[0].event).to.equal("votedEvent");
  //   expect(receipt.logs[0].args._candidateId.toNumber()).to.equal(candidateId);

  //   const voted = await electionInstance.voters(accounts[0]);
  //   expect(voted).to.be.true;

  //   const candidate = await electionInstance.candidates(candidateId);
  //   expect(candidate[2].toNumber()).to.equal(1);
  // });

  // it("throws an exception for invalid candidates", async function () {
  //   try {
  //     await electionInstance.vote(99, { from: accounts[1] });
  //     throw new Error("Exception not thrown");
  //   } catch (error) {
  //     expect(error.message).to.include("revert");

  //     const candidate1 = await electionInstance.candidates(1);
  //     expect(candidate1[2].toNumber()).to.equal(1);

  //     const candidate2 = await electionInstance.candidates(2);
  //     expect(candidate2[2].toNumber()).to.equal(0);
  //   }
  // });

  // it("throws an exception for double voting", async function () {
  //   const candidateId = 2;
  //   await electionInstance.vote(candidateId, { from: accounts[1] });

  //   try {
  //     await electionInstance.vote(candidateId, { from: accounts[1] });
  //     throw new Error("Exception not thrown");
  //   } catch (error) {
  //     expect(error.message).to.include("revert");

  //     const candidate1 = await electionInstance.candidates(1);
  //     expect(candidate1[2].toNumber()).to.equal(1);

  //     const candidate2 = await electionInstance.candidates(2);
  //     expect(candidate2[2].toNumber()).to.equal(1);
  //   }
  // });
});
