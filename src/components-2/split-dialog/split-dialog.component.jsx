import './split-dialog.styles.css'
import { useContext } from 'react';
import { HelperContext } from '../../contexts/helper-context.context';

const SplitDialog = () => {

    const {handleSetSplitDialogOpen,splitValue,handleSetSplitValue,handlePdfGeneration}=useContext(HelperContext);

    const handleSplitDialogKeyUp=(key)=>{
        if(key==='Enter'){
            handlePdfGeneration(true)
            handleSetSplitDialogOpen(false)
        }
    }

    return ( 
        <div className='overlaying' onClick={(e)=>{
            e.stopPropagation()
        }}>
        <div className='split-dialog-div'  onClick={(e)=>e.stopPropagation()}>
        <fieldset>
            <legend>Split count</legend>
            <input type="text" maxLength={6}  onChange={(e)=>{
                handleSetSplitValue(e.target.value)}
            } onClick={(e)=>e.stopPropagation()} value={splitValue} onKeyUp={(e)=>handleSplitDialogKeyUp(e.key)} />
        </fieldset>
        <div className="split-dialog-btn-wrapper">
            <button onClick={(e)=>{
                e.stopPropagation();
                handleSetSplitDialogOpen(false)}
            }>Cancel</button>
            <button  onClick={(e)=>{
                e.stopPropagation();
                handlePdfGeneration(true)
                handleSetSplitDialogOpen(false)
            }} disabled={ Number(splitValue.trim())<=0}>Split</button>
        </div>
        </div>
        </div>
     );
}
export default SplitDialog;