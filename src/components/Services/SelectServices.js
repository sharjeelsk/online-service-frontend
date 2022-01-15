import React from 'react'
import {ReactComponent as Stepper} from '../images/Component 46 – 1.svg'
import "./Services.scss"
function SelectServices() {
    return (
        <div>
             <h1 className="no-more-excuses">No<br />More<br />Excuses</h1>
             <div className="row mx-5">
                 <div className="col-3 svgcol">
                    <Stepper className="svg" />
                 </div>

                 <div className="col-9 servcol">
                    <h1>Select Services</h1>
                 </div>
             </div>
        </div>
    )
}

export default SelectServices