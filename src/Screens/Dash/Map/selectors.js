export const getOverlappingMarkers = (data) => {
    const _data = data.map(rec => rec.json_build_object);
    const markers = _data.map(({ properties, geometry }) => {
        return {
            latlng: {
                latitude: geometry.coordinates[1],
                longitude: geometry.coordinates[0],
            },
            covid19_positive_on: properties.covid19_positive_on,
            user_id: properties.user_id || null,
            created_at: properties.created_at || null,
        }
    });
    console.debug(`Processed ${markers.length} locations`);
    return markers;
}