import React from 'react'
import Modal from '../UI/Modal'
import logo from '../../assets/logo.svg'

export default function About() {
	return (
		<Modal>
			<img src={logo} alt="logo" />
			<p>
				Myco-locate is an app designed to help mushroom foragers find and share
				locations for their desired mushroom. For gourmet use only! Practice safe
				foraging. Pulling data from the iNaturalist API, it returns mushroom
				locations.
			</p>
			<p>
				Developed by{' '}
				<a
					href="https://github.com/iamtimleonard"
					target={`_blank`}
					className="cheee"
				>
					Tim Leonard
				</a>
				,{' '}
				<a
					href="https://github.com/Monikathanki"
					target={`_blank`}
					className="cheee"
				>
					Monika Thanki
				</a>
				, and{' '}
				<a
					href="https://github.com/mylesjeffery"
					target={`_blank`}
					className="cheee"
				>
					Myles Jeffery
				</a>{' '}
				for Chingu Voyage 28. The project was managed by Ambareen
			</p>
		</Modal>
	)
}
