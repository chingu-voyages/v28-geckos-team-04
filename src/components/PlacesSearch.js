import usePlacesAutoComplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
} from '@reach/combobox'
import '@reach/combobox/styles.css'

function PlacesSearch({ panTo }) {
	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions,
	} = usePlacesAutoComplete({
		requestOptions: {
			location: { lat: () => 40.712776, lng: () => -74.005974 },
			radius: 200 * 1000,
		},
	})
	return (
		<div className="search">
			<Combobox
				onSelect={async (address) => {
					setValue(address, false)
					clearSuggestions()

					try {
						const results = await getGeocode({ address })
						const { lat, lng } = await getLatLng(results[0])
						panTo({ lat, lng })
					} catch (error) {
						console.log('error')
					}
				}}
			>
				<ComboboxInput
					value={value}
					onChange={(e) => {
						setValue(e.target.value)
					}}
					disabled={!ready}
					placeholder="Search for a place"
				/>
				<ComboboxPopover>
					<ComboboxList>
						{status === 'OK' &&
							data.map(({ id, description }) => (
								<ComboboxOption key={id} value={description} />
							))}
					</ComboboxList>
				</ComboboxPopover>
			</Combobox>
		</div>
	)
}

export default PlacesSearch