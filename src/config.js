export const NetworkConfiguration = {
    
    chainId: 0x7A69,
    nftAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",

    params: [{
        chainId: '0x7A69', //31337
        rpcUrls: ["http://localhost:8545"],
        chainName: "NFT-localhost",
        nativeCurrency: {
            name: "DETH",
            symbol: "DETH",
            decimals: 18
        },
        blockExplorerUrls: ["https://polygonscan.com/"]

    }]

    

}
export const rpcUrl = ()=>{
    return NetworkConfiguration.params[0].rpcUrls[0]; // 即上面代码中的 rpcUrls: ["http://localhost:8545"]
}
