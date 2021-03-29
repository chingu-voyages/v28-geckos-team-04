import React from 'react'
import { useHistory } from 'react-router-dom'
import close from '../../assets/close.svg'

const Modal = ({ children, handleClose }) => {
	let history = useHistory()
	const exitModal = () => {
		history.push('/')
	}
	return (
		<>
			<div className="backdrop" onClick={exitModal}></div>
			<div className="modal">
				<button onClick={exitModal} className="modal-close">
					<img src={close} alt="close button" />
				</button>
				{children}
			</div>
		</>
	)
}

export default Modal
