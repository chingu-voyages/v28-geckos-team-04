import React from 'react'
import compass from '../assets/compass.svg'

const CenterUserButton = ({ userLocation, handleHomeButton }) => {
	return (
		<button onClick={() => handleHomeButton(userLocation)} className="home-button">
			<img src={compass} alt="RETURN HOME" />
		</button>
	)
}

export default CenterUserButton
