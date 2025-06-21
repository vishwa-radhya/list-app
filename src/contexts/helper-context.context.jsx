import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { ListItemsContext } from "./list-items-context";
import { pdfImageBase64Url } from "../utils/check-mobile";
import { auth } from "../utils/firebase";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { useToast } from "./toast-context.context";
pdfMake.vfs = pdfFonts.vfs;

export const HelperContext = createContext();

export const HelperProvider=({children})=>{

    const [aiChatMessages,setAiChatMessages]=useState([]);
    const {items}=useContext(ListItemsContext);
    const userName = auth.currentUser?.displayName;
    const userEmail = auth.currentUser?.email;
    const {showToast}=useToast();
    const [isSplitDialogOpen,setIsSplitDialogOpen]=useState(false);
    const [splitValue,setSplitValue]=useState('1');

    const handleSetSplitDialogOpen=(val)=>setIsSplitDialogOpen(val);
    const handleSetSplitValue=(val)=>setSplitValue(val)

    const generatePdf = (bool) => {
        if(!Object.keys(items).length) return;
        let splitVal = Number(splitValue.trim())
        let targetSplitValue = (splitVal>=1 && splitVal<=100000) ? splitVal : 1;
        const total =!bool ?  items.reduce((sum, p) => sum + Number(p?.price), 0) : items.reduce((sum, p) => sum + (Number(p?.price)/targetSplitValue), 0) ;
        const tableBody = [
          [{ text: "Name", bold: true }, { text: "Price", bold: true }],
          ...items.map((p) => [p.value, `₹${!bool ? p.price : parseFloat(p.price/targetSplitValue).toFixed(2)}`]),
          [{ text: "Total", bold: true }, { text: `₹${parseFloat(total).toFixed(2)}`, bold: true }],
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
              text: `${!bool ? 'Invoice' : 'Split Invoice'}`,
              fontSize:20,
              margin: [0, -10, 0, 20],
              alignment: "center",
            },
            {
              columns: [
                {
                  text: `Issued to: \n${userName}\n${userEmail} ${bool ? `\nSplit value: ${targetSplitValue}`:''}`,
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
    
        pdfMake.createPdf(dd).download(`${!bool ? 'list-app-invoice.pdf':`list-app-split-by-${targetSplitValue}-invoice.pdf`}`); 
        showToast(`${bool ? 'Split export':'Export'} successful, please check your browser downloads or file manager.`,4000)
      };
    
      const handlePdfGeneration=(bool)=>{
        generatePdf(bool)
      }

    return(
        <HelperContext.Provider value={{aiChatMessages,setAiChatMessages,handlePdfGeneration,isSplitDialogOpen,handleSetSplitDialogOpen,splitValue,handleSetSplitValue}}>
            {children}
        </HelperContext.Provider>
    )
}
HelperProvider.propTypes={
    children:PropTypes.node,
}