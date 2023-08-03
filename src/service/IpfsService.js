import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from 'axios';

// 创建了一个 IPFS HTTP 客户端实例，该实例用于与运行在本地的 IPFS 节点进行通信。
const ipfs = ipfsHttpClient({ host: '127.0.0.1', 'api-path': '/ipfs/api/v0/', protocol: 'http', port: '5001' });

// 接收一个JavaScript 对象作为参数，将其转换为 JSON 格式，然后添加到 IPFS 网络中。如果成功，它会返回添加的文件的 CID。如果失败，它会抛出一个错误。
export const storeMeta = async (data) => {
    
    const json = JSON.stringify(data);
        alert(json);
        try {
            const added = await ipfs.add(json);
            alert(added.path)
        }catch (error) {
            alert(error);
        }

}

// 使用 axios 发送一个 GET 请求到 IPFS 网关，以获取 CID 为 "QmaJ6kjXLxvPNgPaggntvtXuo9D4T2uYcU7sdxuyYV7hKA" 的文件的内容。
export const testGet = async () => {
    const meta = await axios.get("http://127.0.0.1:8080/ipfs/QmaJ6kjXLxvPNgPaggntvtXuo9D4T2uYcU7sdxuyYV7hKA")
    return meta;
}

// 接收一个实体（可能是一个文件或者其他数据），将其添加到 IPFS 网络中，并返回该文件在 IPFS 网关上的 URL。
export const addToIpfs = async (entity) => {
    debugger
     const added = await ipfs.add(entity)
    const cid = added.path
    const rst = "http://127.0.0.1:8080/ipfs/" + cid;
    return rst;
  }
//C:\Program Files (x86)\Common Files\Intel\Shared Libraries\redist\intel64\compiler;C:\Program Files\Python38\Scripts\;C:\Program Files\Python38;C:\WINDOWS\system32;C:\WINDOWS;C:\WINDOWS\System32\Wbem;C:\WINDOWS\System32\WindowsPowerShell\v1.0\;C:\WINDOWS\System32\OpenSSH\;C:\Program Files\Git\cmd;C:\Program Files\dotnet\;C:\ProgramData\chocolatey\bin;D:\mysql-8.0.26-winx64\bin;C:\Program Files\Graphviz\bin;C:\ProgramData\chocolatey\lib\maven\apache-maven-3.8.4\bin;C:\Program Files\TortoiseSVN\bin;C:\Program Files\Geth;C:\Program Files\CMake\bin;C:\Program Files\Go\bin;C:\Users\baiyuqi\AppData\Roaming\nvm;C:\Program Files\nodejs;C:\Program Files\Docker\Docker\resources\bin;C:\ProgramData\DockerDesktop\version-bin;D:\solc;C:\Users\baiyuqi\Downloads\x86_64-8.1.0-release-win32-seh-rt_v6-rev0\mingw64\bin;C:\Program Files\LLVM\bin;D:\rust\cargo-home\bin;C:\Windows\system32;C:\Windows;C:\Windows\System32\Wbem;C:\Windows\System32\WindowsPowerShell\v1.0\;C:\Windows\System32\OpenSSH\;C:\Users\baiyuqi\AppData\Local\Microsoft\WindowsApps;d:\applications\Microsoft VS Code\bin;C:\Users\baiyuqi\AppData\Roaming\Flow;C:\Users\baiyuqi\.dotnet\tools;C:\Users\baiyuqi\AppData\Local\Microsoft\WindowsApps;C:\Users\baiyuqi\AppData\Roaming\Python\Python38\Scripts;C:\JSBSim;C:\Program Files\FlightGear 2020.3\bin;C:\Program Files\OpenSSL-Win64\bin;C:\Program Files\Java\jdk1.8.0_131\bin;C:\Program Files\JetBrains\IntelliJ IDEA 2021.3\bin;D:\workspace\javafx-sdk-17.0.1\bin;C:\OpenCASCADE-7.6.0-vc14-64\opencascade-7.6.0\win64\vc14\bin;C:\OpenCASCADE-7.6.0-vc14-64\tbb_2017.0.100\bin\intel64\vc14_ui;C:\OpenCASCADE-7.6.0-vc14-64\openvr-1.14.15-64\bin\win64;C:\OpenCASCADE-7.6.0-vc14-64\freeimage-3.17.0-vc14-64\bin;C:\OpenCASCADE-7.6.0-vc14-64\freetype-2.5.5-vc14-64\bin;C:\OpenCASCADE-7.6.0-vc14-64\ffmpeg-3.3.4-64\bin;C:\Users\baiyuqi\AppData\Roaming\npm;C:\Users\baiyuqi\go\bin;C:\texlive\2022\bin\win32;C:\Users\baiyuqi\AppData\Roaming\cabal\bin;C:\tools\ghc-9.4.2\bin;C:\ghcup\bin;C:\tools\msys64