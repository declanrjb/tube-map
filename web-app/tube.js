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
            'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'LineString',
                    'coordinates': [
                    [
                        51.50307656230356,
                        -0.114360045100013
                    ],
                    [
                        51.50328069783045,
                        -0.114395255861667
                    ],
                    [
                        51.5034784630518,
                        -0.114368948336111
                    ],
                    [
                        51.50366219860013,
                        -0.114332251953889
                    ],
                    [
                        51.5040659,
                        -0.114192337047778
                    ],
                    [
                        51.5043086,
                        -0.114096037047778
                    ],
                    [
                        51.5044696,
                        -0.1139815
                    ],
                    [
                        51.5046516,
                        -0.1137946
                    ],
                    [
                        51.504799,
                        -0.1136079
                    ],
                    [
                        51.5049075,
                        -0.1134048
                    ],
                    [
                        51.5050063,
                        -0.1131417
                    ],
                    [
                        51.506476,
                        -0.1092595
                    ],
                    [
                        51.5065723,
                        -0.1090701
                    ],
                    [
                        51.506692,
                        -0.1089395
                    ],
                    [
                        51.506864,
                        -0.1088429
                    ],
                    [
                        51.5070007,
                        -0.1088102
                    ],
                    [
                        51.5072725,
                        -0.1087887
                    ],
                    [
                        51.5074523,
                        -0.1087619
                    ],
                    [
                        51.5076338,
                        -0.1086973
                    ],
                    [
                        51.507847,
                        -0.1085873
                    ],
                    [
                        51.5080127,
                        -0.1084586
                    ],
                    [
                        51.5081667,
                        -0.1082912
                    ],
                    [
                        51.5083174,
                        -0.1080765
                    ],
                    [
                        51.5084613,
                        -0.1077614
                    ],
                    [
                        51.508749,
                        -0.1072361
                    ],
                    [
                        51.5090563,
                        -0.1068369
                    ],
                    [
                        51.5095205,
                        -0.1062381
                    ],
                    [
                        51.5101285,
                        -0.1055763
                    ],
                    [
                        51.5112599,
                        -0.1047478
                    ],
                    [
                        51.5113986,
                        -0.1046271
                    ],
                    [
                        51.5115487,
                        -0.1044674
                    ],
                    [
                        51.5116495,
                        -0.1043403
                    ],
                    [
                        51.5117767,
                        -0.1041524
                    ],
                    [
                        51.5118509,
                        -0.1040192
                    ],
                    [
                        51.5119321,
                        -0.1038361
                    ],
                    [
                        51.5120113,
                        -0.1035903
                    ],
                    [
                        51.5120596,
                        -0.1033497
                    ],
                    [
                        51.5120935,
                        -0.1030186
                    ],
                    [
                        51.5121143,
                        -0.1026719
                    ],
                    [
                        51.5121239,
                        -0.102138
                    ],
                    [
                        51.5121219,
                        -0.1018242
                    ],
                    [
                        51.5120923,
                        -0.1010008
                    ],
                    [
                        51.5120869,
                        -0.1008694
                    ],
                    [
                        51.5118963,
                        -0.0982998
                    ],
                    [
                        51.5118666,
                        -0.0973127
                    ],
                    [
                        51.5118683,
                        -0.0970365
                    ],
                    [
                        51.5118847,
                        -0.0966025
                    ],
                    [
                        51.5118997,
                        -0.0963089
                    ],
                    [
                        51.5120346,
                        -0.0953763
                    ],
                    [
                        51.5121207,
                        -0.0948935
                    ],
                    [
                        51.5124642,
                        -0.0931581
                    ],
                    [
                        51.51344502962036,
                        -0.089008914472326
                    ]
                ]
                }
            }
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