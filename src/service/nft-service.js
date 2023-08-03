import { ethers } from "ethers";
import {rpcUrl} from "../config";
import { trying } from "./ConnectionService";
import { NetworkConfiguration } from "../config";   
import NFT from "../../artifacts/contracts/NFT.sol/MyErc721.json";
import { NotificationManager } from "react-notifications";
import axios from "axios";

export const owned = async () => {
    // 因为是读合约，所以不需要provider.getSigner()
    const {success, provider, signer} = await trying();
    // 如果success=false，说明用户没有连接钱包，提示警告
    if (!success) {
        NotificationManager.warning("warning!" + '\t\t network not right!' );
        return {success:false};
    }
    const address = await signer.getAddress();
    
    const nft = new ethers.Contract(NetworkConfiguration.nftAddress, NFT.abi, provider);
    
    const count = await nft.balanceOf(address);
    const amount = count.toNumber();

    //Promise.all函数接收一个Promise数组，然后返回一个新的Promise，这个新的Promise会在所有的Promise都完成时解析
    //Promise.all会返回一个包含所有NFT信息的数组。
    const rst = await Promise.all(
        // 循环，构造了一个数组，数组的长度是amount
        Array.from({length: amount}, async(v, i)=>{
            const tokenId = await nft.tokenOfOwnerByIndex(address, i);
            const tokenUri = await nft.tokenURI(tokenId);
            const meta = await axios.get(tokenUri);
            return {...meta.data, tokenId, tokenUri};
        })
    
    )

    return {success: true, data: rst};
}

export const totalsupply = async () => {
    // 获取到NetworkConfiguration.params[0].rpcUrls[0]  即"http://localhost:8545"
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl());

    const nft = new ethers.Contract(NetworkConfiguration.nftAddress, NFT.abi, provider);

    const total = await nft.totalsupply();

    return total;
}

export const mintNFT = async (tokenUri) => {
    // 尝试连接钱包
    const {success, provider, signer} = await trying();
    if (!success) {
        NotificationManager.warning("warning!" + '\t\t network not right!' );
        return {success:false};
    }

    let nft = new ethers.Contract(NetworkConfiguration.nftAddress, NFT.abi, signer);
    const address = await signer.getAddress();
    
    // 使用signer来调用智能合约nft中的mintNFT方法，mint方法的参数是address和tokenUri
    let transaction = await nft.connect(signer).mint(address, tokenUri, {value: 1000000000});
    let tx = await transaction.wait();
    debugger;
    let event = tx.events[0];

    // event.args[2]是tokenId
    let value = event.args[2];
    console.log(value);

    // toNumber()方法将value转换为数字
    let tokenId = value.toNumber();
    // alert(tokenId);
    return {success:true, tokenId};

}