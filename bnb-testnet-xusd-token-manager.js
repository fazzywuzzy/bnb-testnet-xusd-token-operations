const { ethers } = require('ethers');
require('dotenv').config();

// Contract address and ABI
const contractAddress = '0xA6d369f9ef6e3570AFA807ee75F81eE5dbAdD68B';
const abi = [
    "function mint(address to, uint256 amount) external",
    "function burn(uint256 amount) external"
];

const walletAddress = '0x6Be4eea873b7E59118E6D8750BFc78E3A8de1f8A';

// Connect to BNB Smart Chain testnet
const provider = new ethers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/');

const privateKey = process.env.METAMASK_PRIVATE_KEY;
if (!privateKey) {
    throw new Error('Please set your METAMASK_PRIVATE_KEY in the .env file');
}
const signer = new ethers.Wallet(privateKey, provider);

const contract = new ethers.Contract(contractAddress, abi, signer);

async function mintTokens(amount) {
    const amountWithDecimals = amount * 1e6; // Multiply by 1,000,000 for 6 decimal places
    try {
        const tx = await contract.mint(walletAddress, amountWithDecimals);
        await tx.wait();
        console.log(`Successfully minted ${amount} XUSD tokens to ${walletAddress}`);
    } catch (error) {
        console.error('Error minting tokens:', error);
    }
}

async function burnTokens(amount) {
    const amountWithDecimals = amount * 1e6; // Multiply by 1,000,000 for 6 decimal places
    try {
        const tx = await contract.burn(amountWithDecimals);
        await tx.wait();
        console.log(`Successfully burned ${amount} XUSD tokens from ${walletAddress}`);
    } catch (error) {
        console.error('Error burning tokens:', error);
    }
}

// Example usage
async function main() {
    await mintTokens(100); // Mint 100 XUSD tokens
    await burnTokens(50);  // Burn 50 XUSD tokens
}

main();
