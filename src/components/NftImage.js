// 为mynft.js中的组件，显示nft的图片

function NftImage({nft}){
    return(       
        <div class="nftcard">
            <img src={nft.imageUri}
                class="nft-image" />
            <div class="name">{nft.name}</div>
            <div class="desc">{nft.description}</div>
            <button class="btn">buy</button>
        </div>
    )
}

export default NftImage;