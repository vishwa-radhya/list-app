import ContentLoader from "react-content-loader";

const ImgLoaderForPicture=(props)=>{
    return (
        <ContentLoader viewBox="0 0 278 200" width={278} height={200} speed={2} className="content-loader" backgroundColor="rgb(240,240,240)"
        foregroundColor="rgb(219,219,219)" {...props}>
      <rect x="60" y="19" rx="20" ry="20" width="200" height="170" />           
    </ContentLoader>
    )
}
export default ImgLoaderForPicture;