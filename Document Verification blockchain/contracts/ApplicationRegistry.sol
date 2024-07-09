pragma solidity ^0.8.9;

contract ApplicationRegistry {
    struct Application {
        string name; // Name of the application
        string appId; // Application number (alphanumeric)
        string cid; // Content ID
    }

    Application[] public applications;
    mapping(string => Application) public applicationsByAppId;
    mapping(string => Application) public applicationsByCid;
    uint public nextId;

    // Event for application creation
    event ApplicationCreated(string indexed appId, string name, string cid);

    constructor() {
        nextId = 1;
    }

    function createApplication(string memory _name, string memory _appId, string memory _cid) public {
        Application memory newApp = Application(_name, _appId, _cid);
        applications.push(newApp);
        applicationsByAppId[_appId] = newApp;
        applicationsByCid[_cid] = newApp;
        emit ApplicationCreated(_appId, _name, _cid);
    }

function getApplicationByAppIdAndName(string memory _appId, string memory _name) public view returns (string memory, string memory, string memory) {
    // Search for the application in the array
    for (uint i = 0; i < applications.length; i++) {
        if (keccak256(bytes(applications[i].appId)) == keccak256(bytes(_appId)) && keccak256(bytes(applications[i].name)) == keccak256(bytes(_name))) {
            return (applications[i].appId, applications[i].name, applications[i].cid);
        }
    }
    // Return empty strings if application not found
    return ("", "", "");
}



    // Function to get all applications
    function getAllApplications() public view returns (string[] memory, string[] memory, string[] memory) {
        string[] memory names = new string[](applications.length);
        string[] memory appIds = new string[](applications.length);
        string[] memory cids = new string[](applications.length);

        for (uint i = 0; i < applications.length; i++) {
            names[i] = applications[i].name;
            appIds[i] = applications[i].appId;
            cids[i] = applications[i].cid;
        }

        return (names, appIds, cids);
    }
}


