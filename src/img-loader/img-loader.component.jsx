import ContentLoader from "react-content-loader";

const ImgLoader=(props)=>{
    return (
        <ContentLoader viewBox="0 0 778 200" width={778} height={200} speed={2} backgroundColor="rgb(240,240,240)"
        foregroundColor="rgb(219,219,219)" {...props}>
      <rect x="290" y="19" rx="20" ry="20" width="190" height="160" />           
    </ContentLoader>
    )
}
export default ImgLoader;