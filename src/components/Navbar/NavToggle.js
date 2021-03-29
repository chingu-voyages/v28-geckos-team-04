import React from 'react'
import navButton from '../../assets/nav_button.svg'

const NavToggle = ({ handleNavToggle }) => {
	return (
		<button onClick={handleNavToggle} className="nav-toggle">
			<img src={navButton} alt="nav Button" />
		</button>
	)
}

export default NavToggle
