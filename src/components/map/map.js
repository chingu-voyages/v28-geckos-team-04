import React, { useCallback, useState, useRef, useEffect } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'

import mapStyles from './styles/mapStyles'
import CenterUserButton from '../CenterUserButton'
import PlacesSearch from '../PlacesSearch'

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
const libraries = ['places'] //avoid unnecessary rerenders

function Map({ iNatResults, handleDrag, userLocation }) {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		libraries,
	})
	const [selected, setSelected] = useState(null)

	const mapRef = useRef()
	const onMapLoad = useCallback((map) => {
		mapRef.current = map
	}, [])

	const panTo = useCallback(({ lat, lng }) => {
		mapRef.current.panTo({ lat, lng })
		//mapRef.current.setZoom(14)
	}, [])

	const handleCenterUser = (pos) => {
		const { latitude, longitude } = pos.coords
		panTo({ lat: latitude, lng: longitude })
		mapRef.current.setZoom(11)
	}

	useEffect(() => {
		const success = async (pos) => {
			const { latitude, longitude } = await pos.coords
			panTo({ lat: latitude, lng: longitude })
		}
		navigator.geolocation.getCurrentPosition(success)
	}, [panTo])

	const getNewBounds = () => {
		handleDrag(mapRef.current.getBounds())
	}

	if (loadError) return 'Error loading map'
	if (!isLoaded) return 'Loading map...'
	return (
		<div>
			<CenterUserButton
				userLocation={userLocation}
				handleHomeButton={handleCenterUser}
			/>
			<PlacesSearch panTo={panTo} />
			<GoogleMap
				mapContainerStyle={mapContainerStyle}
				zoom={11}
				center={center}
				options={options}
				onLoad={onMapLoad}
				onIdle={getNewBounds}
				onClick={selected && (() => setSelected(null))}
			>
				{userLocation && (
					<Marker
						position={{
							lat: userLocation.coords.latitude,
							lng: userLocation.coords.longitude,
						}}
					/>
				)}
				{iNatResults.map((marker) => (
					<Marker
						key={marker.id}
						position={{
							lat: marker.geojson.coordinates[1],
							lng: marker.geojson.coordinates[0],
						}}
						icon={{
							url: '/mushroom.png',
							scaledSize: new window.google.maps.Size(30, 30),
						}}
						onClick={() => {
							setSelected(marker)
						}}
					/>
				))}

				{selected && (
					<InfoWindow
						options={{
							pixelOffset: new window.google.maps.Size(0, -30),
						}}
						position={{
							lat: selected.geojson.coordinates[1],
							lng: selected.geojson.coordinates[0],
						}}
						onCloseClick={() => {
							setSelected(null)
						}}
					>
						<div>
							<h2>{selected.taxon.name}</h2>
							<p>
								found at latitude:{selected.geojson.coordinates[1]}{' '}
								longitude:
								{selected.geojson.coordinates[0]}
							</p>
						</div>
					</InfoWindow>
				)}
			</GoogleMap>
		</div>
	)
}

export default Map
