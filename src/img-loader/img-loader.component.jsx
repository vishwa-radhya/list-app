import ContentLoader from "react-content-loader";

const ImgLoader=(props)=>{
    return (
        <ContentLoader viewBox="0 0 300 200" width={300} height={200} speed={2} className="content-loader" backgroundColor="rgb(240,240,240)"
        foregroundColor="rgb(219,219,219)" {...props}>
      <rect x="55" y="9" rx="20" ry="20" width="190" height="180" />           
    </ContentLoader>
    )
}
export default ImgLoader;