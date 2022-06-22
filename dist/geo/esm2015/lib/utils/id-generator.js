import { Md5 } from 'ts-md5';
import { uuid } from '@igo2/utils';
/**
 * Generate a id from it's datasource options.
 * @param options Data source options
 * @returns A id
 */
export function generateIdFromSourceOptions(options) {
    const generators = {
        wms: generateWMSIdFromSourceOptions,
        wmts: generateWMTSIdFromSourceOptions,
        xyz: generateXYZIdFromSourceOptions,
        feature: generateFeatureIdFromSourceOptions,
        wfs: generateWfsIdFromSourceOptions,
        arcgisrest: generateArcgisRestIdFromSourceOptions,
        imagearcgisrest: generateArcgisRestIdFromSourceOptions,
        tilearcgisrest: generateArcgisRestIdFromSourceOptions,
        osm: (_options) => 'OSM',
        tiledebug: (_options) => 'tiledebug'
    };
    const generator = generators[options.type] || generateId;
    return generator(options);
}
/**
 * Generate a id from WMS data source options
 * @param options WMS data source options
 * @returns A md5 hash of the the url and layers
 */
export function generateWMSIdFromSourceOptions(options) {
    const layers = options.params.LAYERS;
    const url = standardizeUrl(options.url);
    const chain = 'wms' + url + layers;
    return Md5.hashStr(chain);
}
/**
 * Generate a id from WMTS data source options
 * @param options WMTS data source options
 * @returns A md5 hash of the the url and layer
 */
export function generateWMTSIdFromSourceOptions(options) {
    const layer = options.layer;
    const url = standardizeUrl(options.url);
    const chain = 'wmts' + url + layer;
    return Md5.hashStr(chain);
}
/**
 * Generate a id from XYZ data source options
 * @param options XYZ data source options
 * @returns A md5 hash of the the url and layer
 */
export function generateXYZIdFromSourceOptions(options) {
    const url = standardizeUrl(options.url);
    const chain = 'xyz' + url;
    return Md5.hashStr(chain);
}
/**
 * Generate a id from feature data source options
 * @param options XYZ data source options
 * @returns A md5 hash of the the url and layer
 */
export function generateFeatureIdFromSourceOptions(options) {
    if (!options.url) {
        return generateId(options);
    }
    const url = standardizeUrl(options.url);
    const chain = 'feature' + url;
    return Md5.hashStr(chain);
}
/**
 * Generate a id from feature data source options
 * @param options XYZ data source options
 * @returns A md5 hash of the the url and layer
 */
export function generateWfsIdFromSourceOptions(options) {
    if (!options.url || !options.params) {
        return generateId(options);
    }
    const url = standardizeUrl(options.url);
    const chain = 'wfs' + url + options.params.featureTypes;
    return Md5.hashStr(chain);
}
/**
 * Generate a id from ArcGIS Rest data source options
 * @param options ArcGIS Rest data source options
 * @returns A md5 hash of the url and layers
 */
export function generateArcgisRestIdFromSourceOptions(options) {
    const layers = options.layer;
    const url = standardizeUrl(options.url);
    const chain = (options.type || 'arcgis') + url + layers;
    return Md5.hashStr(chain);
}
/**
 * Generate a unique id
 * @returns A uuid
 */
export function generateId(_options) {
    return uuid();
}
export function standardizeUrl(url) {
    const absUrl = url.charAt(0) === '/' ? window.location.origin + url : url;
    const urlDecomposed = absUrl.split(/[?&]/);
    let urlStandardized = urlDecomposed.shift();
    const paramsToKeep = urlDecomposed.filter(p => p.length !== 0 && p.charAt(0) !== '_');
    if (paramsToKeep.length) {
        urlStandardized += '?' + paramsToKeep.join('&');
    }
    return urlStandardized;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWQtZ2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvZ2VvL3NyYy9saWIvdXRpbHMvaWQtZ2VuZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFFN0IsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQVFuQzs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLDJCQUEyQixDQUFDLE9BQTBCO0lBQ3BFLE1BQU0sVUFBVSxHQUFHO1FBQ2pCLEdBQUcsRUFBRSw4QkFBOEI7UUFDbkMsSUFBSSxFQUFFLCtCQUErQjtRQUNyQyxHQUFHLEVBQUUsOEJBQThCO1FBQ25DLE9BQU8sRUFBRSxrQ0FBa0M7UUFDM0MsR0FBRyxFQUFFLDhCQUE4QjtRQUNuQyxVQUFVLEVBQUUscUNBQXFDO1FBQ2pELGVBQWUsRUFBRSxxQ0FBcUM7UUFDdEQsY0FBYyxFQUFFLHFDQUFxQztRQUNyRCxHQUFHLEVBQUUsQ0FBQyxRQUE4QixFQUFFLEVBQUUsQ0FBQyxLQUFLO1FBQzlDLFNBQVMsRUFBRSxDQUFDLFFBQThCLEVBQUUsRUFBRSxDQUFDLFdBQVc7S0FDM0QsQ0FBQztJQUNGLE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDO0lBQ3pELE9BQU8sU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLDhCQUE4QixDQUFDLE9BQTZCO0lBQzFFLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ3JDLE1BQU0sR0FBRyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEMsTUFBTSxLQUFLLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxNQUFNLENB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QUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ3RGLElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRTtRQUN2QixlQUFlLElBQUksR0FBRyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDakQ7SUFDRCxPQUFPLGVBQWUsQ0FBQztBQUN6QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXJjR0lTUmVzdERhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9hcmNnaXNyZXN0LWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcbmltcG9ydCB7IE1kNSB9IGZyb20gJ3RzLW1kNSc7XG5cbmltcG9ydCB7IHV1aWQgfSBmcm9tICdAaWdvMi91dGlscyc7XG5cbmltcG9ydCB7IEFueURhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvYW55LWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcbmltcG9ydCB7IERhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgV01TRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy93bXMtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgV01UU0RhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd210cy1kYXRhc291cmNlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBXRlNEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4uL2RhdGFzb3VyY2UnO1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgaWQgZnJvbSBpdCdzIGRhdGFzb3VyY2Ugb3B0aW9ucy5cbiAqIEBwYXJhbSBvcHRpb25zIERhdGEgc291cmNlIG9wdGlvbnNcbiAqIEByZXR1cm5zIEEgaWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlSWRGcm9tU291cmNlT3B0aW9ucyhvcHRpb25zOiBEYXRhU291cmNlT3B0aW9ucyk6IHN0cmluZyB7XG4gIGNvbnN0IGdlbmVyYXRvcnMgPSB7XG4gICAgd21zOiBnZW5lcmF0ZVdNU0lkRnJvbVNvdXJjZU9wdGlvbnMsXG4gICAgd210czogZ2VuZXJhdGVXTVRTSWRGcm9tU291cmNlT3B0aW9ucyxcbiAgICB4eXo6IGdlbmVyYXRlWFlaSWRGcm9tU291cmNlT3B0aW9ucyxcbiAgICBmZWF0dXJlOiBnZW5lcmF0ZUZlYXR1cmVJZEZyb21Tb3VyY2VPcHRpb25zLFxuICAgIHdmczogZ2VuZXJhdGVXZnNJZEZyb21Tb3VyY2VPcHRpb25zLFxuICAgIGFyY2dpc3Jlc3Q6IGdlbmVyYXRlQXJjZ2lzUmVzdElkRnJvbVNvdXJjZU9wdGlvbnMsXG4gICAgaW1hZ2VhcmNnaXNyZXN0OiBnZW5lcmF0ZUFyY2dpc1Jlc3RJZEZyb21Tb3VyY2VPcHRpb25zLFxuICAgIHRpbGVhcmNnaXNyZXN0OiBnZW5lcmF0ZUFyY2dpc1Jlc3RJZEZyb21Tb3VyY2VPcHRpb25zLFxuICAgIG9zbTogKF9vcHRpb25zOiBBbnlEYXRhU291cmNlT3B0aW9ucykgPT4gJ09TTScsXG4gICAgdGlsZWRlYnVnOiAoX29wdGlvbnM6IEFueURhdGFTb3VyY2VPcHRpb25zKSA9PiAndGlsZWRlYnVnJ1xuICB9O1xuICBjb25zdCBnZW5lcmF0b3IgPSBnZW5lcmF0b3JzW29wdGlvbnMudHlwZV0gfHwgZ2VuZXJhdGVJZDtcbiAgcmV0dXJuIGdlbmVyYXRvcihvcHRpb25zKTtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZSBhIGlkIGZyb20gV01TIGRhdGEgc291cmNlIG9wdGlvbnNcbiAqIEBwYXJhbSBvcHRpb25zIFdNUyBkYXRhIHNvdXJjZSBvcHRpb25zXG4gKiBAcmV0dXJucyBBIG1kNSBoYXNoIG9mIHRoZSB0aGUgdXJsIGFuZCBsYXllcnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlV01TSWRGcm9tU291cmNlT3B0aW9ucyhvcHRpb25zOiBXTVNEYXRhU291cmNlT3B0aW9ucykge1xuICBjb25zdCBsYXllcnMgPSBvcHRpb25zLnBhcmFtcy5MQVlFUlM7XG4gIGNvbnN0IHVybCA9IHN0YW5kYXJkaXplVXJsKG9wdGlvbnMudXJsKTtcbiAgY29uc3QgY2hhaW4gPSAnd21zJyArIHVybCArIGxheWVycztcbiAgcmV0dXJuIE1kNS5oYXNoU3RyKGNoYWluKSBhcyBzdHJpbmc7XG59XG5cbi8qKlxuICogR2VuZXJhdGUgYSBpZCBmcm9tIFdNVFMgZGF0YSBzb3VyY2Ugb3B0aW9uc1xuICogQHBhcmFtIG9wdGlvbnMgV01UUyBkYXRhIHNvdXJjZSBvcHRpb25zXG4gKiBAcmV0dXJucyBBIG1kNSBoYXNoIG9mIHRoZSB0aGUgdXJsIGFuZCBsYXllclxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVXTVRTSWRGcm9tU291cmNlT3B0aW9ucyhvcHRpb25zOiBXTVRTRGF0YVNvdXJjZU9wdGlvbnMpIHtcbiAgY29uc3QgbGF5ZXIgPSBvcHRpb25zLmxheWVyO1xuICBjb25zdCB1cmwgPSBzdGFuZGFyZGl6ZVVybChvcHRpb25zLnVybCk7XG4gIGNvbnN0IGNoYWluID0gJ3dtdHMnICsgdXJsICsgbGF5ZXI7XG4gIHJldHVybiBNZDUuaGFzaFN0cihjaGFpbikgYXMgc3RyaW5nO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlIGEgaWQgZnJvbSBYWVogZGF0YSBzb3VyY2Ugb3B0aW9uc1xuICogQHBhcmFtIG9wdGlvbnMgWFlaIGRhdGEgc291cmNlIG9wdGlvbnNcbiAqIEByZXR1cm5zIEEgbWQ1IGhhc2ggb2YgdGhlIHRoZSB1cmwgYW5kIGxheWVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVhZWklkRnJvbVNvdXJjZU9wdGlvbnMob3B0aW9uczogV01UU0RhdGFTb3VyY2VPcHRpb25zKSB7XG4gIGNvbnN0IHVybCA9IHN0YW5kYXJkaXplVXJsKG9wdGlvbnMudXJsKTtcbiAgY29uc3QgY2hhaW4gPSAneHl6JyArIHVybDtcbiAgcmV0dXJuIE1kNS5oYXNoU3RyKGNoYWluKSBhcyBzdHJpbmc7XG59XG5cbi8qKlxuICogR2VuZXJhdGUgYSBpZCBmcm9tIGZlYXR1cmUgZGF0YSBzb3VyY2Ugb3B0aW9uc1xuICogQHBhcmFtIG9wdGlvbnMgWFlaIGRhdGEgc291cmNlIG9wdGlvbnNcbiAqIEByZXR1cm5zIEEgbWQ1IGhhc2ggb2YgdGhlIHRoZSB1cmwgYW5kIGxheWVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUZlYXR1cmVJZEZyb21Tb3VyY2VPcHRpb25zKG9wdGlvbnM6IFdNVFNEYXRhU291cmNlT3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMudXJsKSB7IHJldHVybiBnZW5lcmF0ZUlkKG9wdGlvbnMpOyB9XG4gIGNvbnN0IHVybCA9IHN0YW5kYXJkaXplVXJsKG9wdGlvbnMudXJsKTtcbiAgY29uc3QgY2hhaW4gPSAnZmVhdHVyZScgKyB1cmw7XG4gIHJldHVybiBNZDUuaGFzaFN0cihjaGFpbikgYXMgc3RyaW5nO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlIGEgaWQgZnJvbSBmZWF0dXJlIGRhdGEgc291cmNlIG9wdGlvbnNcbiAqIEBwYXJhbSBvcHRpb25zIFhZWiBkYXRhIHNvdXJjZSBvcHRpb25zXG4gKiBAcmV0dXJucyBBIG1kNSBoYXNoIG9mIHRoZSB0aGUgdXJsIGFuZCBsYXllclxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVXZnNJZEZyb21Tb3VyY2VPcHRpb25zKG9wdGlvbnM6IFdGU0RhdGFTb3VyY2VPcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucy51cmwgfHwgIW9wdGlvbnMucGFyYW1zKSB7IHJldHVybiBnZW5lcmF0ZUlkKG9wdGlvbnMpOyB9XG4gIGNvbnN0IHVybCA9IHN0YW5kYXJkaXplVXJsKG9wdGlvbnMudXJsKTtcbiAgY29uc3QgY2hhaW4gPSAnd2ZzJyArIHVybCArIG9wdGlvbnMucGFyYW1zLmZlYXR1cmVUeXBlcztcbiAgcmV0dXJuIE1kNS5oYXNoU3RyKGNoYWluKSBhcyBzdHJpbmc7XG59XG4vKipcbiAqIEdlbmVyYXRlIGEgaWQgZnJvbSBBcmNHSVMgUmVzdCBkYXRhIHNvdXJjZSBvcHRpb25zXG4gKiBAcGFyYW0gb3B0aW9ucyBBcmNHSVMgUmVzdCBkYXRhIHNvdXJjZSBvcHRpb25zXG4gKiBAcmV0dXJucyBBIG1kNSBoYXNoIG9mIHRoZSB1cmwgYW5kIGxheWVyc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVBcmNnaXNSZXN0SWRGcm9tU291cmNlT3B0aW9ucyhvcHRpb25zOiBBcmNHSVNSZXN0RGF0YVNvdXJjZU9wdGlvbnMpIHtcbiAgY29uc3QgbGF5ZXJzID0gb3B0aW9ucy5sYXllcjtcbiAgY29uc3QgdXJsID0gc3RhbmRhcmRpemVVcmwob3B0aW9ucy51cmwpO1xuICBjb25zdCBjaGFpbiA9IChvcHRpb25zLnR5cGUgfHwgJ2FyY2dpcycpICsgdXJsICsgbGF5ZXJzO1xuICByZXR1cm4gTWQ1Lmhhc2hTdHIoY2hhaW4pIGFzIHN0cmluZztcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZSBhIHVuaXF1ZSBpZFxuICogQHJldHVybnMgQSB1dWlkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUlkKF9vcHRpb25zOiBBbnlEYXRhU291cmNlT3B0aW9ucykge1xuICByZXR1cm4gdXVpZCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhbmRhcmRpemVVcmwodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBhYnNVcmwgPSB1cmwuY2hhckF0KDApID09PSAnLycgPyB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgdXJsIDogdXJsO1xuICBjb25zdCB1cmxEZWNvbXBvc2VkID0gYWJzVXJsLnNwbGl0KC9bPyZdLyk7XG4gIGxldCB1cmxTdGFuZGFyZGl6ZWQgPSB1cmxEZWNvbXBvc2VkLnNoaWZ0KCk7XG4gIGNvbnN0IHBhcmFtc1RvS2VlcCA9IHVybERlY29tcG9zZWQuZmlsdGVyKHAgPT4gcC5sZW5ndGggIT09IDAgJiYgcC5jaGFyQXQoMCkgIT09ICdfJyk7XG4gIGlmIChwYXJhbXNUb0tlZXAubGVuZ3RoKSB7XG4gICAgdXJsU3RhbmRhcmRpemVkICs9ICc/JyArIHBhcmFtc1RvS2VlcC5qb2luKCcmJyk7XG4gIH1cbiAgcmV0dXJuIHVybFN0YW5kYXJkaXplZDtcbn1cbiJdfQ==