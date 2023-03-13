var coordinates = {};

$(document).ready(function () {
  getCoordinates();
  render_elements();
})

function getCoordinates() {
  var searchparams = new URLSearchParams(window.location.search);
  console.log(searchparams);
  console.log(searchparams.has("source"));
  console.log(coordinates);
  if (searchparams.has("source") && searchparams.has("destination")) {
    var source = searchparams.get("source");
    console.log(source);
    var destination = searchparams.get("destination");
    console.log(destination);
    coordinates.source_lat = source.split(";")[0];
    console.log(coordinates.source_lat);
    coordinates.source_lng = source.split(";")[1];
    console.log(coordinates.source_lng);
    coordinates.destination_lat = destination.split(";")[0];
    console.log(coordinates.destination_lat);
    coordinates.destination_lng = destination.split(";")[1];
    console.log(coordinates.destination_lng);
  } else {
    alert("coordinates were not selected");
    window.history.back();
  }
}

function render_elements() {
  $.ajax({
    url: `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates.source_lng}%2C${coordinates.source_lat}%3B${coordinates.destination_lng}%2C${coordinates.destination_lat}?alternatives=true&geometries=polyline&steps=true&access_token=pk.eyJ1IjoiYXBvb3J2ZWxvdXMiLCJhIjoiY2ttZnlyMDgzMzlwNTJ4a240cmEzcG0xNyJ9.-nSyL0Gy2nifDibXJg4fTA`,
    type: "get",
    success: function (r){
      //console.log("what is r",r)
      var steps = r.routes[0].legs[0].steps
      console.log(steps)
      for (var i = 0; i < steps.length; i+=1) {
        console.log(i)
        var images = {
          "turn_right": "ar_right.png",
          "turn_left": "ar_left.png",
          "slight_right": "ar_slight_right.png",
          "slight_left": "ar_slight_left.png",
          "straight": "ar_straight.png"
      }
        var image
        var distance=steps[i].distance
        var instruction = steps[i].maneuver.instruction
        console.log(instruction)

        if (instruction.includes("Turn right")) {
          image = "turn_right"
      } 
        else if (instruction.includes("Turn left")) {
          image = "turn_left"
      }
      if (i > 0) {
        $("#scene_container").append(
          `<a-entity gps-entity-place="latitude:${steps[i].maneuver.location[1]};longitude: ${steps[i].maneuver.location[0]};">
            <a-image 
            src="./assets/${images[image]}"
            scale="3 3 3"
            position="0 0 0"
            id="step_${i}"
            look-at="#step_${i-1}"
            name="${instruction}">
            </a-image> 

            <a-entity>
            <a-text height="30" value="${instruction} (${distance}m)"></a-text>
            </a-entity>

          </a-entity>`
      )
    } 
    else {
        $("#scene_container").append(
          `<a-entity gps-entity-place="latitude:${steps[i].maneuver.location[1]};longitude: ${steps[i].maneuver.location[0]};">
            <a-image 
            src="./assets/ar_start.png"
            scale="3 3 3"
            position="0 0 0"
            id="step_${i}"
            look-at="#step_${i+1}"
            name="${instruction}">
            </a-image> 

            <a-entity>
            <a-text height="30" value="${instruction} (${distance}m)"></a-text>
            </a-entity>
            
          </a-entity>`
      )
    }

    }
  }
})
}
