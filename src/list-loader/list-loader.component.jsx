import ContentLoader from "react-content-loader";
const ListLoader=(props)=>{
    return(
        <ContentLoader viewBox="0 0 778 116" width={778} height={116} speed={2} backgroundColor="rgb(237,237,237)"
        foregroundColor="rgb(199,199,199)" {...props}>
      <rect x="3" y="19" rx="0" ry="0" width="315" height="42" />
      <rect x="3" y="71" rx="0" ry="0" width="315" height="42" />            
    </ContentLoader>
    )
}
export default ListLoader;