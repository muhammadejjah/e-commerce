import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { openImg } from '../../State/ModalSlice'

const Modal = ({ url, openImage }) => {
    const dispatch = useDispatch()
    const openHandler = () => {
        dispatch(openImg())
    }
    return (
        <Fragment>
            <div
                className='back-drop d-flex align-items-center justify-content-center '
                style={{
                    transition: "all 500ms",
                    opacity: openImage ? "1" : "0",
                    visibility: openImage ? "visible" : "hidden",
                }}
                onClick={openHandler}
            >
            </div>
            <div 
            className='over-lay d-flex align-items-center justify-content-center '
            style={{
                transition: "all 500ms",
                opacity: openImage ? "1" : "0",
                visibility: openImage ? "visible" : "hidden",
            }}
            >
                
                    <img
                        alt=''
                        src={url}
                        className='img-fluid'
                        style={{ 
                            transform: openImage ? "scale(1)" : "scale(0)", 
                            transition: "all 500ms",
                            width:openImage?"80%":"0px"
                         }}
                    />
                
            </div>
        </Fragment>
    )
}

export default Modal
