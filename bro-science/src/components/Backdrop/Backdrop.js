import React from 'react';

const Backdrop=(props)=>{
    return(
        <div className="w-100 h-100 bg-black-10 aspect-ratio--object fixed pointer" onClick={props.click}/>
    )
}
export default Backdrop;