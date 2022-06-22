import { SearchSource } from './sources/source';
import { SearchSourceService } from './search-source.service';
/**
 * Search source factory
 * @ignore
 */
export function searchSourceServiceFactory(sources) {
    return new SearchSourceService(sources);
}
/**
 * Function that returns a provider for the SearchSource service
 */
export function provideSearchSourceService() {
    return {
        provide: SearchSourceService,
        useFactory: searchSourceServiceFactory,
        deps: [SearchSource]
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXNvdXJjZS1zZXJ2aWNlLnByb3ZpZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2dlby9zcmMvbGliL3NlYXJjaC9zaGFyZWQvc2VhcmNoLXNvdXJjZS1zZXJ2aWNlLnByb3ZpZGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFOUQ7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLDBCQUEwQixDQUFDLE9BQXVCO0lBQ2hFLE9BQU8sSUFBSSxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMxQyxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLFVBQVUsMEJBQTBCO0lBQ3hDLE9BQU87UUFDTCxPQUFPLEVBQUUsbUJBQW1CO1FBQzVCLFVBQVUsRUFBRSwwQkFBMEI7UUFDdEMsSUFBSSxFQUFFLENBQUMsWUFBWSxDQUFDO0tBQ3JCLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VhcmNoU291cmNlIH0gZnJvbSAnLi9zb3VyY2VzL3NvdXJjZSc7XG5pbXBvcnQgeyBTZWFyY2hTb3VyY2VTZXJ2aWNlIH0gZnJvbSAnLi9zZWFyY2gtc291cmNlLnNlcnZpY2UnO1xuXG4vKipcbiAqIFNlYXJjaCBzb3VyY2UgZmFjdG9yeVxuICogQGlnbm9yZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2VhcmNoU291cmNlU2VydmljZUZhY3Rvcnkoc291cmNlczogU2VhcmNoU291cmNlW10pIHtcbiAgcmV0dXJuIG5ldyBTZWFyY2hTb3VyY2VTZXJ2aWNlKHNvdXJjZXMpO1xufVxuXG4vKipcbiAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHByb3ZpZGVyIGZvciB0aGUgU2VhcmNoU291cmNlIHNlcnZpY2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVTZWFyY2hTb3VyY2VTZXJ2aWNlKCkge1xuICByZXR1cm4ge1xuICAgIHByb3ZpZGU6IFNlYXJjaFNvdXJjZVNlcnZpY2UsXG4gICAgdXNlRmFjdG9yeTogc2VhcmNoU291cmNlU2VydmljZUZhY3RvcnksXG4gICAgZGVwczogW1NlYXJjaFNvdXJjZV1cbiAgfTtcbn1cbiJdfQ==