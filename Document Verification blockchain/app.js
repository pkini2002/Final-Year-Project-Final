
var cid='';
function uploadFile() {
const fileInput = document.getElementById('fileInput');
const file = fileInput.files[0];

const formData = new FormData();
formData.append('file', file);

const apiKey = '717c579e3fb60f7e05c4'; // Replace with your Pinata API Key
const apiSecret = 'cdb7a99f9d3e60f7d194768544bb5ec8fa3eff3aa782dcb6eae1dae4144b2845'; // Replace with your Pinata API Secret

const requestOptions = {
    method: 'POST',
    headers: {
        'pinata_api_key': apiKey,
        'pinata_secret_api_key': apiSecret,
    },
    body: formData,
};

fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', requestOptions)
    .then(response => response.json())
    .then(data => {
        console.log('Upload successful:', data);
        cid = data.IpfsHash;
        console.log(cid);
        const url = 'https://gateway.pinata.cloud/ipfs/' + cid; // Constructing the URL
        alert('File uploaded successfully!');
    })
    .catch(error => {
        console.error('Error uploading file:', error);
        alert( 'Error uploading file: ' + error.message);
    });
}
// Initialize Web3
let web3;

// Check if MetaMask is installed
if (typeof window.ethereum !== 'undefined') {
    // Initialize Web3 object with the current provider
    web3 = new Web3(window.ethereum);

    // Request account access if needed
    window.ethereum.enable().then(function(accounts) {
        // Accounts now exposed
        console.log(accounts);
    });
} else {
    // MetaMask is not detected
    console.error('MetaMask not detected');
}

// Contract ABI (ApplicationRegistry)
const contractABI =[
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "string",
        "name": "appId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "cid",
        "type": "string"
      }
    ],
    "name": "ApplicationCreated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "applications",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "appId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "cid",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "applicationsByAppId",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "appId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "cid",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "applicationsByCid",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "appId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "cid",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "nextId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_appId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_cid",
        "type": "string"
      }
    ],
    "name": "createApplication",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_appId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "getApplicationByAppIdAndName",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getAllApplications",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      },
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      },
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

// Contract address
const contractAddress = '0x884331fEd89f327d78Dc98B073e4d97A4b44fB4F';

// Initialize contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to create an application
async function createApplication() {
  const name = document.getElementById('name').value;
  const appId = document.getElementById('appId').value;

  try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.createApplication(name, appId, cid).send({ from: accounts[0] });
      
      // Display success message
      alert("Application created successfully");
  } catch (error) {
      console.error("Error creating application:", error);
      // Display error message
      alert("Error creating application");
  }
}

async function getApplication() {
  const appId = document.getElementById('appId').value; // Get the appId input value
  const name = document.getElementById('name').value; // Get the name input value

  try {
      const accounts = await web3.eth.getAccounts();
      const app = await contract.methods.getApplicationByAppIdAndName(appId, name).call({ from: accounts[0] });

      if (app[0] !== "") { // Check if the returned appId is not empty (indicating application found)
          const cid = app[2]; // Extract cid from the result
          const url = 'https://gateway.pinata.cloud/ipfs/' + cid;
          console.log(url); // Constructing the URL
          document.getElementById('applicationDetails').innerHTML = `<p>Verification Successful</p><br><a href="${url}" target="_blank"><button id="submit-btn" style="margin-left: 50px;" type="button">View Document</button></a>`;
      } else {
          document.getElementById('applicationDetails').innerHTML = `<p>Verification failed</p>: Application not found`;
      }
  } catch (error) {
      console.error("Error retrieving application:", error);
      document.getElementById('applicationDetails').innerHTML = `<p>Verification failed: Application not found</p>`;
  }
}



async function getAllApplications() {
  try {
      const accounts = await web3.eth.getAccounts();
      const result = await contract.methods.getAllApplications().call({ from: accounts[0] });

      const names = result[0];
      const appIds = result[1];
      const cids = result[2];

      // Display applications
      const table = document.createElement('table');
      table.classList.add('applications-table'); // Add class for styling
      const headerRow = table.insertRow();
      const nameHeader = headerRow.insertCell(0);
      const appIdHeader = headerRow.insertCell(1);
      const cidHeader = headerRow.insertCell(2);
      nameHeader.innerHTML = "<b>Name</b>";
      appIdHeader.innerHTML = "<b>Roll No</b>";
      cidHeader.innerHTML = "<b>CID</b>";

      for (let i = 0; i < names.length; i++) {
          const row = table.insertRow();
          const nameCell = row.insertCell(0);
          const appIdCell = row.insertCell(1);
          const cidCell = row.insertCell(2);
          nameCell.textContent = names[i];
          appIdCell.textContent = appIds[i];
          cidCell.textContent = cids[i];
      }

      document.getElementById('applicationsTable').innerHTML = ''; // Clear previous content
      document.getElementById('applicationsTable').appendChild(table);
  } catch (error) {
      console.error("Error retrieving applications:", error);
      // Display error message
      alert("Error retrieving applications");
  }
}



