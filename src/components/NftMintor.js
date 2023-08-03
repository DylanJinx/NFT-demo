import styles from './NftMintor.module.css'
import { useState } from "react";
import React from 'react';
import { create as ipfsHttpClient } from "ipfs-http-client";
import { mintNFT } from '../service/nft-service';
import { useRouter } from 'next/router';

// 创建了一个 IPFS HTTP 客户端实例，该实例用于与运行在本地的 IPFS 节点进行通信。
const ipfs = ipfsHttpClient({ host: '127.0.0.1', 'api-path': '/ipfs/api/v0/', protocol: 'http', port: '5001' });

function NftMinter() {

    const router = useRouter();
    const [meta, setMeta] = useState({
        name:"",
        description:"",
    });

    const [uri, setUri] = useState("");

   // 选择文件后，调用此方法
    const onChange = async (e) => {
        const image = e.target.files[0];
        alert(e.target.files[0]);

        // 将文件添加到IPFS，获得CID
        const added = await ipfs.add(image);
        const cid = added.path;
        const imageUri = "http://127.0.0.1:8080/ipfs/" + cid;
        // 改变Uri的值
        setUri(imageUri);
    }

    // 上传元数据，铸币
    const mint = async () => {
        const data = {
            ...meta,
            imageUri: uri
        };
        const json = JSON.stringify(data);
        // 获得CID
        const added = await ipfs.add(json);
        alert(added.path);

        const tokenUri = "http://127.0.0.1:8080/ipfs/" + added.path;

        // 调用nft-service.js中的mintNFT方法，mintNFT是将tokenUri上传到合约中
        const {success, tokenId} = await mintNFT(tokenUri);

        if(success) {
            alert("mint success, tokenId: " + tokenId);
            router.push('/mynft');
        }
    }
  

    return (
        <div className={styles.CreatorWrapper}>
            <div className={styles.CreatorContainer}>

                <input
                    placeholder="Asset Name"
                    className={styles.NftField}
                    onChange={(e)=>setMeta({...meta, name:e.target.value})}
                    

                />
                <textarea
                    placeholder="Asset Description"
                    className={styles.NftField}
                    onChange={(e)=>setMeta({...meta, description:e.target.value})}
                    
                />

                <input
                    type='file'
                    placeholder="Asset Image"
                    className="my-4"
                    onChange={onChange}
                />

                <img width="350" src={uri} className={styles.NftImage} />


                <button
                    className="mt-8 bg-blue-500 text-white rounded p-4"
                    onClick={mint}
                >Create Item</button>

            </div>

        </div>
    )
}

export default NftMinter