import React from 'react'

import './popUp.styles.scss'

const PopUp = ({children, modalState}) =>{
    // const [modalState, setModalState] = useState(false)
    // const togglePopUp = () =>{
    //     setModalState(!modalState)
    // }
    return (
        <div>
            <div className={`modalBackground modalShowing-${modalState}`} >
                <div className='modalInner'>
                    {children}

                </div>
            </div>
            {/* <button onClick={()=>togglePopUp()}>
                Open modal
            </button> */}
        </div>
    )
}

export default PopUp