/*
Note sure if the below code works so feel free to edit, thought someone out there might find it useful.
Origin @ https://stackoverflow.com/questions/62425979/key-based-authentication-or-sas-generation-is-only-available-in-node-js-runtime
Reference Microsoft Library https://azure.github.io/azure-storage-node/azure-storage.js.html#sunlight-1-line-258
*/

var storage = require("azure-storage");

  var startDate = new Date();
  var expiryDate = new Date();
  startDate.setTime(startDate.getTime() - 5*60*1000);
  expiryDate.setTime(expiryDate.getTime() + 24*60*60*1000);
  var AccountSasConstants = storage.Constants.AccountSasConstants;
  var sharedAccessPolicy = {
    AccessPolicy: {
      Services: AccountSasConstants.Services.BLOB ,
      ResourceTypes: AccountSasConstants.Resources.SERVICE + 
                      AccountSasConstants.Resources.CONTAINER +
                      AccountSasConstants.Resources.OBJECT,
      Permissions: AccountSasConstants.Permissions.READ + 
                    AccountSasConstants.Permissions.ADD +
                    AccountSasConstants.Permissions.CREATE +
                    AccountSasConstants.Permissions.WRITE +
                    AccountSasConstants.Permissions.DELETE +
                    AccountSasConstants.Permissions.LIST,
      Protocols: AccountSasConstants.Protocols.HTTPSORHTTP,
      Start: startDate,
      Expiry: expiryDate
    }
    
  };
  const accountname ="<user account>";
  const key = "<key goes here>";
  var sas =storage.generateAccountSharedAccessSignature(accountname,key,sharedAccessPolicy);
  console.log(sas);
