const map = new mapboxgl.Map({
    // TO MAKE THE MAP APPEAR YOU MUST
    // ADD YOUR ACCESS TOKEN FROM
    // https://account.mapbox.com
    accessToken: 'pk.eyJ1IjoiZGVjbGFucmpiIiwiYSI6ImNseGRtNTZ2czA3aHoycW90NTAxd3M3dDIifQ.iOdlGiZZiJarclPoCFVNYA',
    container: 'map', // container ID
    center: [-0.12701602587011104, 51.50399978909556], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 12, // starting zoom,
    // style: 'mmapbox://styles/declanrjb/cmt4gvoti00e901s44gm0hi79',
    config: {
            basemap: {
                theme: 'monochrome',
                // lightPreset: 'night'
            }
    }

});

map.on('load', () => {
        map.addSource('route', {
            'type': 'geojson',
            'data': '../data/lines_raw.json'
        });

        map.addLayer({
            type: 'line',
            source: 'route',
            id: 'line-background',
            paint: {
                'line-color': 'black',
                'line-width': 6,
                'line-opacity': 0
            }
        });

        // add a line layer with line-dasharray set to the first value in dashArraySequence
        map.addLayer({
            type: 'line',
            source: 'route',
            id: 'line-dashed',
            paint: {
                'line-color': 'black',
                'line-width': 6,
                'line-dasharray': [0, 4, 3],
                'line-emissive-strength': 1
            }
        });

        // technique based on https://jsfiddle.net/2mws8y3q/
        // an array of valid line-dasharray values, specifying the lengths of the alternating dashes and gaps that form the dash pattern
        const dashArraySequence = [
            [0, 4, 3],
            [0.5, 4, 2.5],
            [1, 4, 2],
            [1.5, 4, 1.5],
            [2, 4, 1],
            [2.5, 4, 0.5],
            [3, 4, 0],
            [0, 0.5, 3, 3.5],
            [0, 1, 3, 3],
            [0, 1.5, 3, 2.5],
            [0, 2, 3, 2],
            [0, 2.5, 3, 1.5],
            [0, 3, 3, 1],
            [0, 3.5, 3, 0.5]
        ];

        let step = 0;

        function animateDashArray(timestamp) {
            // Update line-dasharray using the next value in dashArraySequence. The
            // divisor in the expression `timestamp / 50` controls the animation speed.
            const newStep = parseInt(
                (timestamp / 10) % dashArraySequence.length
            );

            if (newStep !== step) {
                map.setPaintProperty(
                    'line-dashed',
                    'line-dasharray',
                    dashArraySequence[step]
                );
                step = newStep;
            }

            // Request the next frame of the animation.
            requestAnimationFrame(animateDashArray);
        }

        // start the animation
        animateDashArray(0);
    });