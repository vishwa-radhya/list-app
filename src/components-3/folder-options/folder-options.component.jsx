import { forwardRef, Fragment, useContext } from 'react';
import './folder-options.styles.css';
import { FolderNamesContext } from '../../contexts/folder-names-context';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCircleInfo } from 'react-icons/fa6';
import { FaPen,FaTrash,FaFileExport,FaArrowsSplitUpAndLeft } from 'react-icons/fa6';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { auth } from '../../utils/firebase';
import PropTypes from 'prop-types';
import { ListItemsContext } from '../../contexts/list-items-context';
import { pdfImageBase64Url } from '../../utils/check-mobile';
import { useToast } from '../../contexts/toast-context.context';
pdfMake.vfs = pdfFonts.vfs;
const FolderOptions=forwardRef((props,ref1)=>{
    const {handleSetRenameFolderDialog,handleSetDeleteFolderDialog}=useContext(FolderNamesContext);
    const navigateRouter = useNavigate();
    const pathLocation = useLocation();
    const userName = auth.currentUser?.displayName;
    const userEmail = auth.currentUser?.email;
    const { folderInstanceType } = props;
    const {items}=useContext(ListItemsContext);
    const {showToast} = useToast();
    
    const handleFolderInfoRouting=()=>{
        navigateRouter(`${pathLocation.pathname}/info`)        
    }

    const generatePdf = () => {
    if(!Object.keys(items).length) return;

    const total = items.reduce((sum, p) => sum + Number(p?.price), 0);
    const tableBody = [
      [{ text: "Name", bold: true }, { text: "Price", bold: true }],
      ...items.map((p) => [p.value, `₹${p.price}`]),
      [{ text: "Total", bold: true }, { text: `₹${total}`, bold: true }],
    ];

    const dd = {
      content: [
        {
          image: pdfImageBase64Url, 
          width: 60,
          margin: [225, 10, 0, 0],
        },
        {
          text: "List App",
          style: "header",
          margin: [0, 10, 0, 20],
          alignment: "center",
        },
        {
          text: "Invoice",
          fontSize:20,
          margin: [0, -10, 0, 20],
          alignment: "center",
        },
        {
          columns: [
            {
              text: `Issued to: \n${userName}\n${userEmail}`,
              margin: [0, 0, 0, 10],
            },
            {
              text: `Date: ${new Date().toLocaleDateString()}`,
              alignment: "right",
              margin: [0, 0, 0, 10],
            },
          ],
        },
        {
          table: {
            widths: ["*", "auto"],
            body: tableBody,
          },
          layout: {
            fillColor: (rowIndex) => (rowIndex === 0 ? "#eeeeee" : null),
            hLineWidth: () => 0.5,
            vLineWidth: () => 0.5,
            hLineColor: () => "#ccc",
            vLineColor: () => "#ccc",
          },
          margin: [0, 0, 0, 20],
        },
        {
          text: "Generated via pdfMake",
          style: "footer",
          alignment: "center",
        },
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
        },
        footer: {
          fontSize: 10,
          italics: true,
          color: "gray",
        },
      },
    };

    pdfMake.createPdf(dd).download("invoice.pdf"); 
    showToast('Export successful, please check your browser downloads or file manager.',4000)
  };

    return(
        <div className='folder-options-division' ref={ref1}>
            <div onClick={handleFolderInfoRouting}><FaCircleInfo className='frfa'></FaCircleInfo>Details</div>
            <hr />
            <div onClick={()=>{
                handleSetDeleteFolderDialog(false);
                handleSetRenameFolderDialog(true)
            }}><FaPen className='frfa'></FaPen>Rename</div>
            <div onClick={()=>{
                handleSetRenameFolderDialog(false);
                handleSetDeleteFolderDialog(true)
            }}><FaTrash className='frfa'></FaTrash>Delete</div>
            {folderInstanceType && <Fragment>
            <div onClick={()=>{
                generatePdf()
            }}><FaFileExport className='frfa'></FaFileExport>Export</div>
            <div onClick={()=>{
              // showToast('Export successful, please check your browser downloads or file manager.',4000)
            }}><FaArrowsSplitUpAndLeft className='frfa'></FaArrowsSplitUpAndLeft>Split</div>
            </Fragment>}
        </div>
    )
})
FolderOptions.propTypes={
    folderInstanceType:PropTypes.string,
}
FolderOptions.displayName='FolderOptions'
export default FolderOptions;