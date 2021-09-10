const abis = [
  {
    inputs: [],
    name: "count",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lk",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ls",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "kind", type: "uint256" },
      { internalType: "uint256", name: "salt", type: "uint256" },
    ],
    name: "mine",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

module.exports = abis;
