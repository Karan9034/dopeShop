const FlipChain = artifacts.require("FlipChain");

module.exports = function (deployer) {
  deployer.deploy(FlipChain);
};
