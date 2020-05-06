import 'babel-polyfill' // For ie11
import ExportControl from '@tilecloud/mbgl-export-control'

const map = new window.geolonia.Map('#map');

map.on('load', () => {
  // Hide pois
  map.setLayoutProperty('building', 'visibility', 'none')
  map.setLayoutProperty('poi', 'visibility', 'none')
  map.setLayoutProperty('poi-primary', 'visibility', 'none')

  // Place color picker
  AColorPicker.from( '#color-picker' ).on( 'change', ( picker, color ) => {
    const rgb = AColorPicker.parseColor( color, "rgb" );
    const waterColor = rgb.map( value => value * 0.5 )
    map.setPaintProperty( 'background', 'background-color', color );
    map.setPaintProperty( 'water', 'fill-color', AColorPicker.parseColor( waterColor, "rgbcss" ) );
    map.setPaintProperty( 'waterway_tunnel', 'line-color', AColorPicker.parseColor( waterColor, "rgbcss" ) );
    map.setPaintProperty( 'waterway', 'line-color', AColorPicker.parseColor( waterColor, "rgbcss" ) );
  } )

  map.addControl(new ExportControl({
    dpi: 300,
    attribution: "© Geolonia © OpenStreetMap Contributors",
  }))
})
