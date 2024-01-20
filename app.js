let web3;

// Check if Web3 has been injected by the browser (MetaMask)
if (window.ethereum) {
    web3 = new Web3(ethereum);
} else {
    console.error("No injected Web3 found. Install MetaMask or use a browser with Ethereum support.");
}

const contractAddress = "0x67812857F5aF62E2A5d8460041c3a496F8a764Cb"; 
const contract = new web3.eth.Contract(contractAbi, contractAddress);



async function claimBackXRP() {
    try {
        await contract.methods.claimBackXRP().send({ from: web3.eth.defaultAccount });
        console.log('XRP claimed back successfully');
    } catch (error) {
        console.error('Error claiming back XRP:', error.message);
    }
}

async function claimXRP() {
    try {
        const senderAddress = document.getElementById("claimSender").value;
        const secretNumber = document.getElementById("claimSecret").value;

        // Check if senderAddress and secretNumber are provided
        if (!senderAddress || !secretNumber) {
            console.error('Sender address and secret number are required.');
            return;
        }

        // Call the smart contract's claimXRP function
        await contract.methods.claimXRP(senderAddress, secretNumber).send({ from: web3.eth.defaultAccount });

        console.log('XRP claimed successfully');
    } catch (error) {
        console.error('Error claiming XRP:', error.message);
    }
}

async function sendXRP() {
    try {
        const receiverAddress = document.getElementById("sendReceiver").value;
        const secretNumber = document.getElementById("sendSecret").value;
        const valueXRP = document.getElementById("sendValue").value;

        // Check if receiverAddress, secretNumber, and valueXRP are provided
        if (!receiverAddress || !secretNumber || !valueXRP) {
            console.error('Receiver address, secret number, and value XRP are required.');
            return;
        }

        // Call the smart contract's sendXRP function
        await contract.methods.sendXRP(receiverAddress, secretNumber).send({ from: web3.eth.defaultAccount, value: web3.utils.toWei(valueXRP, 'ether') });

        console.log('XRP sent successfully');
    } catch (error) {
        console.error('Error sending XRP:', error.message);
    }
}


async function displayContractInfo() {
    try {
        const contractBalance = await web3.eth.getBalance(contractAddress);
        console.log('Contract Balance:', web3.utils.fromWei(contractBalance, 'ether'), 'ETH');
    } catch (error) {
        console.error('Error fetching contract information:', error.message);
    }
}
