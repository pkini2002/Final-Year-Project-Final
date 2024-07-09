const ApplicationRegistry = artifacts.require("ApplicationRegistry");

module.exports = function (deployer) {
  deployer.deploy(ApplicationRegistry);
};