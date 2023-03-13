let latitude, longitude, destination

$(document).ready(function(){
	alert("please allow the device to get your current location")
	initGeolocation()
})

$(function(){
	$("#navigate-button").click(function(){
		window.location.href = `ar_navigation.html?source=${latitude};${longitude}&destination=${destination.lat};${destination.lng}`
	})
})

function initGeolocation(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(success)
	}
	else{
		alert("Sorry, your browser does not support geolocation")
	}
}


function success(position){
	console.log(position)
	latitude=position.coords.latitude
	longitude=position.coords.longitude

	console.log(latitude,longitude)
	// Initializing Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiYXBvb3J2ZWxvdXMiLCJhIjoiY2ttZnlyMDgzMzlwNTJ4a240cmEzcG0xNyJ9.-nSyL0Gy2nifDibXJg4fTA'



var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	center: [longitude, latitude],
	zoom: 16
});   

map.addControl(
	new mapboxgl.GeolocateControl({
		positionOptions: {
			enableHighAccuracy: true
		},
		trackUserLocation: true
	})
);

map.addControl(
	new MapboxDirections({
		accessToken: mapboxgl.accessToken
	}),
	'top-left'
);

map.on("click",function(e){
	console.log(e)
	destination=e.lngLat

	
})

}
   