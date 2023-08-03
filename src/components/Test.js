import { create as ipfsHttpClient } from "ipfs-http-client";

// 创建了一个 IPFS HTTP 客户端实例，该实例用于与运行在本地的 IPFS 节点进行通信。
const ipfs = ipfsHttpClient({ host: '127.0.0.1', 'api-path': '/ipfs/api/v0/', protocol: 'http', port: '5001' });

function Test({ children }) {
    const connectIpfs = async () => {
        debugger
        const data = {
            name: "hero",
            desc: "hello world"
        };
        const json = JSON.stringify(data);
        // 获得CID
        const added = await ipfs.add(json);
        alert(added.path)
    }

    return (
        <div>
            <a href = "javascript:void(0);" onClick={connectIpfs}>测试</a>
        </div>
    )
}

export default Test;