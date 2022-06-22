import { HttpClient } from '@angular/common/http';
import { ConfigService, LanguageService, StorageService } from '@igo2/core';
import { SearchSource } from './source';
import { StoredQueriesSearchSource, StoredQueriesReverseSearchSource } from './storedqueries';
/**
 * StoredQueries search source factory
 * @ignore
 */
export function storedqueriesSearchSourceFactory(http, languageService, storageService, config) {
    return new StoredQueriesSearchSource(http, languageService, storageService, config.getConfig(`searchSources.${StoredQueriesSearchSource.id}`));
}
/**
 * Function that returns a provider for the StoredQueries search source
 */
export function provideStoredQueriesSearchSource() {
    return {
        provide: SearchSource,
        useFactory: storedqueriesSearchSourceFactory,
        multi: true,
        deps: [HttpClient, LanguageService, StorageService, ConfigService]
    };
}
/**
 * StoredQueriesReverse search source factory
 * @ignore
 */
export function storedqueriesReverseSearchSourceFactory(http, languageService, storageService, config) {
    return new StoredQueriesReverseSearchSource(http, languageService, storageService, config.getConfig(`searchSources.${StoredQueriesReverseSearchSource.id}`));
}
/**
 * Function that returns a provider for the StoredQueriesReverse search source
 */
export function provideStoredQueriesReverseSearchSource() {
    return {
        provide: SearchSource,
        useFactory: storedqueriesReverseSearchSourceFactory,
        multi: true,
        deps: [HttpClient, LanguageService, StorageService, ConfigService]
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmVkcXVlcmllcy5wcm92aWRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9nZW8vc3JjL2xpYi9zZWFyY2gvc2hhcmVkL3NvdXJjZXMvc3RvcmVkcXVlcmllcy5wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRWxELE9BQU8sRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUU1RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3hDLE9BQU8sRUFDTCx5QkFBeUIsRUFDekIsZ0NBQWdDLEVBQ2pDLE1BQU0saUJBQWlCLENBQUM7QUFFekI7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLGdDQUFnQyxDQUM5QyxJQUFnQixFQUNoQixlQUFnQyxFQUNoQyxjQUE4QixFQUM5QixNQUFxQjtJQUVyQixPQUFPLElBQUkseUJBQXlCLENBQ2xDLElBQUksRUFDSixlQUFlLEVBQ2YsY0FBYyxFQUNkLE1BQU0sQ0FBQyxTQUFTLENBQUMsaUJBQWlCLHlCQUF5QixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQ2xFLENBQUM7QUFDSixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLFVBQVUsZ0NBQWdDO0lBQzlDLE9BQU87UUFDTCxPQUFPLEVBQUUsWUFBWTtRQUNyQixVQUFVLEVBQUUsZ0NBQWdDO1FBQzVDLEtBQUssRUFBRSxJQUFJO1FBQ1gsSUFBSSxFQUFFLENBQUMsVUFBVSxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsYUFBYSxDQUFDO0tBQ25FLENBQUM7QUFDSixDQUFDO0FBRUQ7OztHQUdHO0FBRUgsTUFBTSxVQUFVLHVDQUF1QyxDQUNyRCxJQUFnQixFQUNoQixlQUFnQyxFQUNoQyxjQUE4QixFQUM5QixNQUFxQjtJQUVyQixPQUFPLElBQUksZ0NBQWdDLENBQ3pDLElBQUksRUFDSixlQUFlLEVBQ2YsY0FBYyxFQUNkLE1BQU0sQ0FBQyxTQUFTLENBQUMsaUJBQWlCLGdDQUFnQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQ3pFLENBQUM7QUFDSixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLFVBQVUsdUNBQXVDO0lBQ3JELE9BQU87UUFDTCxPQUFPLEVBQUUsWUFBWTtRQUNyQixVQUFVLEVBQUUsdUNBQXVDO1FBQ25ELEtBQUssRUFBRSxJQUFJO1FBQ1gsSUFBSSxFQUFFLENBQUMsVUFBVSxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsYUFBYSxDQUFDO0tBQ25FLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSwgTGFuZ3VhZ2VTZXJ2aWNlLCBTdG9yYWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xuXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2UgfSBmcm9tICcuL3NvdXJjZSc7XG5pbXBvcnQge1xuICBTdG9yZWRRdWVyaWVzU2VhcmNoU291cmNlLFxuICBTdG9yZWRRdWVyaWVzUmV2ZXJzZVNlYXJjaFNvdXJjZVxufSBmcm9tICcuL3N0b3JlZHF1ZXJpZXMnO1xuXG4vKipcbiAqIFN0b3JlZFF1ZXJpZXMgc2VhcmNoIHNvdXJjZSBmYWN0b3J5XG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdG9yZWRxdWVyaWVzU2VhcmNoU291cmNlRmFjdG9yeShcbiAgaHR0cDogSHR0cENsaWVudCxcbiAgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXG4gIHN0b3JhZ2VTZXJ2aWNlOiBTdG9yYWdlU2VydmljZSxcbiAgY29uZmlnOiBDb25maWdTZXJ2aWNlXG4pIHtcbiAgcmV0dXJuIG5ldyBTdG9yZWRRdWVyaWVzU2VhcmNoU291cmNlKFxuICAgIGh0dHAsXG4gICAgbGFuZ3VhZ2VTZXJ2aWNlLFxuICAgIHN0b3JhZ2VTZXJ2aWNlLFxuICAgIGNvbmZpZy5nZXRDb25maWcoYHNlYXJjaFNvdXJjZXMuJHtTdG9yZWRRdWVyaWVzU2VhcmNoU291cmNlLmlkfWApXG4gICk7XG59XG5cbi8qKlxuICogRnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgcHJvdmlkZXIgZm9yIHRoZSBTdG9yZWRRdWVyaWVzIHNlYXJjaCBzb3VyY2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVTdG9yZWRRdWVyaWVzU2VhcmNoU291cmNlKCkge1xuICByZXR1cm4ge1xuICAgIHByb3ZpZGU6IFNlYXJjaFNvdXJjZSxcbiAgICB1c2VGYWN0b3J5OiBzdG9yZWRxdWVyaWVzU2VhcmNoU291cmNlRmFjdG9yeSxcbiAgICBtdWx0aTogdHJ1ZSxcbiAgICBkZXBzOiBbSHR0cENsaWVudCwgTGFuZ3VhZ2VTZXJ2aWNlLCBTdG9yYWdlU2VydmljZSwgQ29uZmlnU2VydmljZV1cbiAgfTtcbn1cblxuLyoqXG4gKiBTdG9yZWRRdWVyaWVzUmV2ZXJzZSBzZWFyY2ggc291cmNlIGZhY3RvcnlcbiAqIEBpZ25vcmVcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc3RvcmVkcXVlcmllc1JldmVyc2VTZWFyY2hTb3VyY2VGYWN0b3J5KFxuICBodHRwOiBIdHRwQ2xpZW50LFxuICBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcbiAgc3RvcmFnZVNlcnZpY2U6IFN0b3JhZ2VTZXJ2aWNlLFxuICBjb25maWc6IENvbmZpZ1NlcnZpY2Vcbikge1xuICByZXR1cm4gbmV3IFN0b3JlZFF1ZXJpZXNSZXZlcnNlU2VhcmNoU291cmNlKFxuICAgIGh0dHAsXG4gICAgbGFuZ3VhZ2VTZXJ2aWNlLFxuICAgIHN0b3JhZ2VTZXJ2aWNlLFxuICAgIGNvbmZpZy5nZXRDb25maWcoYHNlYXJjaFNvdXJjZXMuJHtTdG9yZWRRdWVyaWVzUmV2ZXJzZVNlYXJjaFNvdXJjZS5pZH1gKVxuICApO1xufVxuXG4vKipcbiAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHByb3ZpZGVyIGZvciB0aGUgU3RvcmVkUXVlcmllc1JldmVyc2Ugc2VhcmNoIHNvdXJjZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZVN0b3JlZFF1ZXJpZXNSZXZlcnNlU2VhcmNoU291cmNlKCkge1xuICByZXR1cm4ge1xuICAgIHByb3ZpZGU6IFNlYXJjaFNvdXJjZSxcbiAgICB1c2VGYWN0b3J5OiBzdG9yZWRxdWVyaWVzUmV2ZXJzZVNlYXJjaFNvdXJjZUZhY3RvcnksXG4gICAgbXVsdGk6IHRydWUsXG4gICAgZGVwczogW0h0dHBDbGllbnQsIExhbmd1YWdlU2VydmljZSwgU3RvcmFnZVNlcnZpY2UsIENvbmZpZ1NlcnZpY2VdXG4gIH07XG59XG4iXX0=