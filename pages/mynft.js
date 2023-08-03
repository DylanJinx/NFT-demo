import { useEffect, useState } from "react";
import NftImage from "../src/components/NftImage";
import { owned } from "../src/service/nft-service";

function MyNft() {
    // Nfts是一个数组，每个元素是一个nft
    const [Nfts, setNfts] = useState([]);


    useEffect(() => {
        const fetchNfts = async () => {
            const ns = await owned();
            if(ns.success) {
                setNfts(ns.data);
            }
        }
    
        fetchNfts();
    }, []);
    


    return(
        <div className ="main">
            {
                Nfts.map((nft) => {
                    return (
                        <NftImage nft = {nft} />        
                    );
                    
                })
                
            }
            
        </div>
    )
}

export default MyNft;