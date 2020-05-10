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
    const select = document.querySelector('#select').value

    if ( 'background' === select ) {
      const rgb = AColorPicker.parseColor( color, "rgb" );
      const waterColor = rgb.map( value => value * 0.5 )
      map.setPaintProperty( 'background', 'background-color', color );
      map.setPaintProperty( 'water', 'fill-color', AColorPicker.parseColor( waterColor, "rgbcss" ) );
      map.setPaintProperty( 'waterway_tunnel', 'line-color', AColorPicker.parseColor( waterColor, "rgbcss" ) );
      map.setPaintProperty( 'waterway', 'line-color', AColorPicker.parseColor( waterColor, "rgbcss" ) );
    } else if ( 'road' === select ) {
      map.setPaintProperty( 'aeroway-runway', 'line-color', color );
      map.setPaintProperty( 'aeroway-taxiway', 'line-color', color );
      map.setPaintProperty( 'highway-path', 'line-color', color );
      map.setPaintProperty( 'highway-motorway-link', 'line-color', color );
      map.setPaintProperty( 'highway-link', 'line-color', color );
      map.setPaintProperty( 'highway-minor', 'line-color', color );
      map.setPaintProperty( 'highway-secondary-tertiary', 'line-color', color );
      map.setPaintProperty( 'highway-primary', 'line-color', color );
      map.setPaintProperty( 'highway-trunk', 'line-color', color );
      map.setPaintProperty( 'highway-motorway', 'line-color', color );
      map.setPaintProperty( 'bridge-trunk-primary', 'line-color', color );
      map.setPaintProperty( 'railway-hatching', 'line-color', color );
    }
  } )

  map.addControl( new ExportControl( {
    dpi: 300,
    attribution: "© Geolonia © OpenStreetMap Contributors",
  } ) )
})
