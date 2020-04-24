const fse = require('fs-extra');

const path = require('path');

function loadJson() {
    fse.readJSON('./mongoose/seeders/ferry_routes/Secret_South.geojson').then(async(json) =>{
        const seedData = [];
        let list = json.features.map(async (feature) => {
            const geometryType = feature.geometry.type;
            if (geometryType !== 'Point') {
                let routeName = feature.properties.Name;
                let coordinates = feature.geometry.coordinates;
                if (geometryType === 'LineString') {
                    let cs = [];
                    coordinates.map(c => {
                        cs.push({lat: c[1], lng: c[0]});
                    });

                    seedData.push({name: routeName, geometryType: geometryType, coordinates: cs})
                }
                else if (geometryType === 'Polygon') {
                    let cs = [];
                    coordinates.map(coordinate => {
                        let polygonCoordinates = [];
                        coordinate.map(c => {
                            polygonCoordinates.push({lat: c[1], lng: c[0]});
                        });
                        cs.push(polygonCoordinates)
                    });
                    seedData.push({name: routeName, geometryType: geometryType, coordinates: cs})
                }

            }
            if (seedData) return seedData;
        });
        const results = await Promise.all(list);
        console.log(seedData[0])
        return results;
    });

}



    module.exports =  loadJson()
