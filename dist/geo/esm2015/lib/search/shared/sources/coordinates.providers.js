import { ConfigService, LanguageService, StorageService } from '@igo2/core';
import { SearchSource } from './source';
import { CoordinatesReverseSearchSource, CoordinatesSearchResultFormatter } from './coordinates';
import { ProjectionService } from '../../../map/shared/projection.service';
/**
 * ICherche search result formatter factory
 * @ignore
 */
export function defaultCoordinatesSearchResultFormatterFactory(languageService) {
    return new CoordinatesSearchResultFormatter(languageService);
}
/**
 * Function that returns a provider for the ICherche search result formatter
 */
export function provideDefaultCoordinatesSearchResultFormatter() {
    return {
        provide: CoordinatesSearchResultFormatter,
        useFactory: defaultCoordinatesSearchResultFormatterFactory,
        deps: [LanguageService]
    };
}
/**
 * CoordinatesReverse search source factory
 * @ignore
 */
export function CoordinatesReverseSearchSourceFactory(config, languageService, storageService, _projectionService) {
    return new CoordinatesReverseSearchSource(config.getConfig(`searchSources.${CoordinatesReverseSearchSource.id}`), languageService, storageService, config.getConfig('projections') || []);
}
/**
 * Function that returns a provider for the IChercheReverse search source
 */
export function provideCoordinatesReverseSearchSource() {
    return {
        provide: SearchSource,
        useFactory: CoordinatesReverseSearchSourceFactory,
        multi: true,
        deps: [ConfigService, LanguageService, StorageService, ProjectionService]
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29vcmRpbmF0ZXMucHJvdmlkZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvZ2VvL3NyYy9saWIvc2VhcmNoL3NoYXJlZC9zb3VyY2VzL2Nvb3JkaW5hdGVzLnByb3ZpZGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFNUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN4QyxPQUFPLEVBQ0wsOEJBQThCLEVBQzlCLGdDQUFnQyxFQUNqQyxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUUzRTs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsOENBQThDLENBQzVELGVBQWdDO0lBRWhDLE9BQU8sSUFBSSxnQ0FBZ0MsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUMvRCxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLFVBQVUsOENBQThDO0lBQzVELE9BQU87UUFDTCxPQUFPLEVBQUUsZ0NBQWdDO1FBQ3pDLFVBQVUsRUFBRSw4Q0FBOEM7UUFDMUQsSUFBSSxFQUFFLENBQUMsZUFBZSxDQUFDO0tBQ3hCLENBQUM7QUFDSixDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLHFDQUFxQyxDQUNuRCxNQUFxQixFQUNyQixlQUFnQyxFQUNoQyxjQUE4QixFQUM5QixrQkFBcUM7SUFFckMsT0FBTyxJQUFJLDhCQUE4QixDQUN2QyxNQUFNLENBQUMsU0FBUyxDQUFDLGlCQUFpQiw4QkFBOEIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUN0RSxlQUFlLEVBQ2YsY0FBYyxFQUNiLE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFrQixJQUFJLEVBQUUsQ0FDeEQsQ0FBQztBQUNKLENBQUM7QUFFRDs7R0FFRztBQUNILE1BQU0sVUFBVSxxQ0FBcUM7SUFDbkQsT0FBTztRQUNMLE9BQU8sRUFBRSxZQUFZO1FBQ3JCLFVBQVUsRUFBRSxxQ0FBcUM7UUFDakQsS0FBSyxFQUFFLElBQUk7UUFDWCxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQztLQUMxRSxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbmZpZ1NlcnZpY2UsIExhbmd1YWdlU2VydmljZSwgU3RvcmFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcblxuaW1wb3J0IHsgU2VhcmNoU291cmNlIH0gZnJvbSAnLi9zb3VyY2UnO1xuaW1wb3J0IHtcbiAgQ29vcmRpbmF0ZXNSZXZlcnNlU2VhcmNoU291cmNlLFxuICBDb29yZGluYXRlc1NlYXJjaFJlc3VsdEZvcm1hdHRlclxufSBmcm9tICcuL2Nvb3JkaW5hdGVzJztcbmltcG9ydCB7IFByb2plY3Rpb24gfSBmcm9tICcuLi8uLi8uLi9tYXAvc2hhcmVkL3Byb2plY3Rpb24uaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBQcm9qZWN0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL21hcC9zaGFyZWQvcHJvamVjdGlvbi5zZXJ2aWNlJztcblxuLyoqXG4gKiBJQ2hlcmNoZSBzZWFyY2ggcmVzdWx0IGZvcm1hdHRlciBmYWN0b3J5XG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0Q29vcmRpbmF0ZXNTZWFyY2hSZXN1bHRGb3JtYXR0ZXJGYWN0b3J5KFxuICBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZVxuKSB7XG4gIHJldHVybiBuZXcgQ29vcmRpbmF0ZXNTZWFyY2hSZXN1bHRGb3JtYXR0ZXIobGFuZ3VhZ2VTZXJ2aWNlKTtcbn1cblxuLyoqXG4gKiBGdW5jdGlvbiB0aGF0IHJldHVybnMgYSBwcm92aWRlciBmb3IgdGhlIElDaGVyY2hlIHNlYXJjaCByZXN1bHQgZm9ybWF0dGVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlRGVmYXVsdENvb3JkaW5hdGVzU2VhcmNoUmVzdWx0Rm9ybWF0dGVyKCkge1xuICByZXR1cm4ge1xuICAgIHByb3ZpZGU6IENvb3JkaW5hdGVzU2VhcmNoUmVzdWx0Rm9ybWF0dGVyLFxuICAgIHVzZUZhY3Rvcnk6IGRlZmF1bHRDb29yZGluYXRlc1NlYXJjaFJlc3VsdEZvcm1hdHRlckZhY3RvcnksXG4gICAgZGVwczogW0xhbmd1YWdlU2VydmljZV1cbiAgfTtcbn1cblxuLyoqXG4gKiBDb29yZGluYXRlc1JldmVyc2Ugc2VhcmNoIHNvdXJjZSBmYWN0b3J5XG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDb29yZGluYXRlc1JldmVyc2VTZWFyY2hTb3VyY2VGYWN0b3J5KFxuICBjb25maWc6IENvbmZpZ1NlcnZpY2UsXG4gIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxuICBzdG9yYWdlU2VydmljZTogU3RvcmFnZVNlcnZpY2UsXG4gIF9wcm9qZWN0aW9uU2VydmljZTogUHJvamVjdGlvblNlcnZpY2Vcbikge1xuICByZXR1cm4gbmV3IENvb3JkaW5hdGVzUmV2ZXJzZVNlYXJjaFNvdXJjZShcbiAgICBjb25maWcuZ2V0Q29uZmlnKGBzZWFyY2hTb3VyY2VzLiR7Q29vcmRpbmF0ZXNSZXZlcnNlU2VhcmNoU291cmNlLmlkfWApLFxuICAgIGxhbmd1YWdlU2VydmljZSxcbiAgICBzdG9yYWdlU2VydmljZSxcbiAgICAoY29uZmlnLmdldENvbmZpZygncHJvamVjdGlvbnMnKSBhcyBQcm9qZWN0aW9uW10pIHx8IFtdXG4gICk7XG59XG5cbi8qKlxuICogRnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgcHJvdmlkZXIgZm9yIHRoZSBJQ2hlcmNoZVJldmVyc2Ugc2VhcmNoIHNvdXJjZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZUNvb3JkaW5hdGVzUmV2ZXJzZVNlYXJjaFNvdXJjZSgpIHtcbiAgcmV0dXJuIHtcbiAgICBwcm92aWRlOiBTZWFyY2hTb3VyY2UsXG4gICAgdXNlRmFjdG9yeTogQ29vcmRpbmF0ZXNSZXZlcnNlU2VhcmNoU291cmNlRmFjdG9yeSxcbiAgICBtdWx0aTogdHJ1ZSxcbiAgICBkZXBzOiBbQ29uZmlnU2VydmljZSwgTGFuZ3VhZ2VTZXJ2aWNlLCBTdG9yYWdlU2VydmljZSwgUHJvamVjdGlvblNlcnZpY2VdXG4gIH07XG59XG4iXX0=