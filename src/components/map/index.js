import React, { useCallback, useState, useRef } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import mapStyles from './styles/mapStyles'

const mapContainerStyle = {
	width: '100vw',
	height: '100vh',
}
const center = {
	lat: 40.712776,
	lng: -74.005974,
}
const options = {
	styles: mapStyles,
	disableDefaultUI: true,
	zoomControl: true,
}

function Map() {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	})
	const [markers, setMarkers] = useState([])
	const [selected, setSelected] = useState(null)

	const onMapClick = useCallback((event) => {
		setMarkers((current) => [
			...current,
			{
				lat: event.latLng.lat(),
				lng: event.latLng.lng(),
				time: new Date(),
			},
		])
	}, [])

	const mapRef = useRef()
	const onMapLoad = useCallback((map) => {
		mapRef.current = map
	}, [])

	if (loadError) return 'Error loading map'
	if (!isLoaded) return 'Loading map...'
	return (
		<div>
			<GoogleMap
				mapContainerStyle={mapContainerStyle}
				zoom={11}
				center={center}
				options={options}
				onClick={
					selected
						? () => {
								setSelected(null)
						  }
						: onMapClick
				}
				onLoad={onMapLoad}
			>
				{markers.map((marker) => (
					<Marker
						key={marker.time.toISOString()}
						position={{ lat: marker.lat, lng: marker.lng }}
						icon={{
							url: '/mushroom.png',
							scaledSize: new window.google.maps.Size(30, 30),
						}}
						onClick={() => {
							setSelected(marker)
						}}
					/>
				))}

				{selected ? (
					<InfoWindow
						position={{ lat: selected.lat, lng: selected.lng }}
						onCloseClick={() => {
							setSelected(null)
						}}
					>
						<div>
							<h2>Mushroom</h2>
							<p>
								found at latitude:{selected.lat} longitude:
								{selected.lng}
							</p>
						</div>
					</InfoWindow>
				) : null}
			</GoogleMap>
		</div>
	)
}

export default Map
