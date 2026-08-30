$(document).ready(function(){

    var lineColors = {'London Overground': 'red',
                    'Elizabeth line': 'yellow',
                    'Victoria': 'blue',
                    'Piccadilly': 'green',
                    'District': 'black',
                    'Circle': 'black',
                    'Metropolitan': 'black',
                    'Hammersmith & City': 'black',
                    'Central': 'black',
                    'Jubilee': 'black',
                    'DLR': 'black',
                    'Bakerloo': 'black',
                    'Northern': 'black',
                    'Waterloo & City': 'black',
                    'East London': 'black',
                    'Thameslink 6tph line': 'black',
                    'Tramlink': 'black',
                    'Crossrail 2': 'black',
                    'IFS Cloud Cable Car': 'black'}

    var severityColorRamp = [
        '#270cae',
        '#7a75ff',
        '#f0e243',
        '#eb5c2c',
        '#b50000'
    ]

    var severityRemap = {'Special Service': 4,
                    'Closed': 5,
                    'Suspended': 5,
                    'Part Suspended': 4,
                    'Planned Closure': 5,
                    'Part Closure': 4,
                    'Severe Delays': 3,
                    'Reduced Service': 2,
                    'Bus Service': 2,
                    'Minor Delays': 1,
                    'Good Service': 0,
                    'Part Closed': 3,
                    'Exit Only': 0,
                    'No Step Free Access': 0,
                    'Change of frequency': 0,
                    'Diverted': 3,
                    'Not Running': 5,
                    'Issues Reported': 2,
                    'No Issues': 0,
                    'Information': 0,
                    'Service Closed': 5}

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

        const dashArraySequence = [[0.0, 2.0, 1.5],
            [0.25, 2.0, 1.25],
            [0.5, 2.0, 1.0],
            [0.75, 2.0, 0.75],
            [1.0, 2.0, 0.5],
            [1.25, 2.0, 0.25],
            [1.5, 2.0, 0.0],
            [0.0, 0.25, 1.5, 1.75],
            [0.0, 0.5, 1.5, 1.5],
            [0.0, 0.75, 1.5, 1.25],
            [0.0, 1.0, 1.5, 1.0],
            [0.0, 1.25, 1.5, 0.75],
            [0.0, 1.5, 1.5, 0.5],
            [0.0, 1.75, 1.5, 0.25]
        ];

        function makeAnimator(svgId, speed) {
            let step = 0;

            function animateDashArray(timestamp) {
                // Update line-dasharray using the next value in dashArraySequence. The
                // divisor in the expression `timestamp / 50` controls the animation speed.
                const newStep = parseInt(
                    (timestamp / speed) % dashArraySequence.length
                );

                if (newStep !== step) {
                    map.setPaintProperty(
                        svgId,
                        'line-dasharray',
                        dashArraySequence[step]
                    );
                    step = newStep;
                }

                // Request the next frame of the animation.
                requestAnimationFrame(animateDashArray);
            }

            return animateDashArray;
        } 

        $.getJSON('https://api.tfl.gov.uk/Line/Mode/tube/Status', function( statuses ) {
            $.getJSON('data/lines.json', function(lines) {
                $.each(statuses, function(i, status) {
                    var severityDesc = status['lineStatuses'][0]['statusSeverityDescription'];
                    console.log(severityDesc);
                    var severity = severityRemap[severityDesc];
                    var lineName = status['name']
                    var line = lines[lineName]

                    map.addSource(lineName, {
                        'type': 'geojson',
                        'data': line['geometry']
                    });

                    map.addLayer({
                        type: 'line',
                        source: lineName,
                        id: lineName,
                        paint: {
                            'line-color': severityColorRamp[severity],
                            // 'line-width': (severity + 1) * 2,
                            'line-width': 5,
                            // 'line-dasharray': [0, 4, 3],
                            'line-emissive-strength': 1
                        }
                    });

                    animator = makeAnimator(lineName, 40 + (severity * 10))
                    animator(0);

                })
            })
        })

        $.getJSON( "data/lines.json", function( data ) {

            // $.each( data, function( i, line ) {
            //     var lineName = line['lineName']
            //     // var segmentName = segment['properties']['id'];

            //     map.addSource(lineName, {
            //         'type': 'geojson',
            //         'data': line['geometry']
            //     });
            //     // console.log(segment)

            //     map.addLayer({
            //         type: 'line',
            //         source: lineName,
            //         id: lineName,
            //         paint: {
            //             'line-color': lineColors[lineName],
            //             'line-width': 6,
            //             'line-dasharray': [0, 4, 3],
            //             'line-emissive-strength': 1
            //         }
            //     });

            //     animator = makeAnimator(lineName, 40)
            //     animator(0);

            // });
        });



            // add a line layer with line-dasharray set to the first value in dashArraySequence


            // technique based on https://jsfiddle.net/2mws8y3q/
            // an array of valid line-dasharray values, specifying the lengths of the alternating dashes and gaps that form the dash pattern



        });

}); 

