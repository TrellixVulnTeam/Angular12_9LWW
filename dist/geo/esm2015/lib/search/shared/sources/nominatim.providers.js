import { HttpClient } from '@angular/common/http';
import { ConfigService, StorageService } from '@igo2/core';
import { SearchSource } from './source';
import { NominatimSearchSource } from './nominatim';
/**
 * Nominatim search source factory
 * @ignore
 */
export function nominatimSearchSourceFactory(http, config, storageService) {
    return new NominatimSearchSource(http, config.getConfig(`searchSources.${NominatimSearchSource.id}`), storageService);
}
/**
 * Function that returns a provider for the Nominatim search source
 */
export function provideNominatimSearchSource() {
    return {
        provide: SearchSource,
        useFactory: nominatimSearchSourceFactory,
        multi: true,
        deps: [HttpClient, ConfigService, StorageService]
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9taW5hdGltLnByb3ZpZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2dlby9zcmMvbGliL3NlYXJjaC9zaGFyZWQvc291cmNlcy9ub21pbmF0aW0ucHJvdmlkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUUzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVwRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsNEJBQTRCLENBQzFDLElBQWdCLEVBQ2hCLE1BQXFCLEVBQ3JCLGNBQThCO0lBRTlCLE9BQU8sSUFBSSxxQkFBcUIsQ0FDOUIsSUFBSSxFQUNKLE1BQU0sQ0FBQyxTQUFTLENBQUMsaUJBQWlCLHFCQUFxQixDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQzdELGNBQWMsQ0FDZixDQUFDO0FBQ0osQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxVQUFVLDRCQUE0QjtJQUMxQyxPQUFPO1FBQ0wsT0FBTyxFQUFFLFlBQVk7UUFDckIsVUFBVSxFQUFFLDRCQUE0QjtRQUN4QyxLQUFLLEVBQUUsSUFBSTtRQUNYLElBQUksRUFBRSxDQUFDLFVBQVUsRUFBRSxhQUFhLEVBQUUsY0FBYyxDQUFDO0tBQ2xELENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSwgU3RvcmFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcblxuaW1wb3J0IHsgU2VhcmNoU291cmNlIH0gZnJvbSAnLi9zb3VyY2UnO1xuaW1wb3J0IHsgTm9taW5hdGltU2VhcmNoU291cmNlIH0gZnJvbSAnLi9ub21pbmF0aW0nO1xuXG4vKipcbiAqIE5vbWluYXRpbSBzZWFyY2ggc291cmNlIGZhY3RvcnlcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vbWluYXRpbVNlYXJjaFNvdXJjZUZhY3RvcnkoXG4gIGh0dHA6IEh0dHBDbGllbnQsXG4gIGNvbmZpZzogQ29uZmlnU2VydmljZSxcbiAgc3RvcmFnZVNlcnZpY2U6IFN0b3JhZ2VTZXJ2aWNlXG4pIHtcbiAgcmV0dXJuIG5ldyBOb21pbmF0aW1TZWFyY2hTb3VyY2UoXG4gICAgaHR0cCxcbiAgICBjb25maWcuZ2V0Q29uZmlnKGBzZWFyY2hTb3VyY2VzLiR7Tm9taW5hdGltU2VhcmNoU291cmNlLmlkfWApLFxuICAgIHN0b3JhZ2VTZXJ2aWNlXG4gICk7XG59XG5cbi8qKlxuICogRnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgcHJvdmlkZXIgZm9yIHRoZSBOb21pbmF0aW0gc2VhcmNoIHNvdXJjZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZU5vbWluYXRpbVNlYXJjaFNvdXJjZSgpIHtcbiAgcmV0dXJuIHtcbiAgICBwcm92aWRlOiBTZWFyY2hTb3VyY2UsXG4gICAgdXNlRmFjdG9yeTogbm9taW5hdGltU2VhcmNoU291cmNlRmFjdG9yeSxcbiAgICBtdWx0aTogdHJ1ZSxcbiAgICBkZXBzOiBbSHR0cENsaWVudCwgQ29uZmlnU2VydmljZSwgU3RvcmFnZVNlcnZpY2VdXG4gIH07XG59XG4iXX0=