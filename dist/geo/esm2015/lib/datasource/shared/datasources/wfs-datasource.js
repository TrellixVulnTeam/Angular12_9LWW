import olSourceVector from 'ol/source/Vector';
import * as OlLoadingStrategy from 'ol/loadingstrategy';
import olProjection from 'ol/proj/Projection';
import * as olproj from 'ol/proj';
import { DataSource } from './datasource';
import { OgcFilterWriter } from '../../../filter/shared/ogc-filter';
import { defaultFieldNameGeometry, checkWfsParams, getFormatFromOptions, buildUrl } from './wms-wfs.utils';
import { BehaviorSubject } from 'rxjs';
export class WFSDataSource extends DataSource {
    constructor(options, wfsService, authInterceptor) {
        super(checkWfsParams(options, 'wfs'));
        this.options = options;
        this.wfsService = wfsService;
        this.authInterceptor = authInterceptor;
        this.mostRecentIdCallOGCFilter = 0;
        this.ogcFilters$ = new BehaviorSubject(undefined);
        const ogcFilters = this.options.ogcFilters;
        const fieldNameGeometry = this.options.paramsWFS.fieldNameGeometry || defaultFieldNameGeometry;
        const ogcFilterWriter = new OgcFilterWriter();
        this.options.ogcFilters =
            ogcFilterWriter.defineOgcFiltersDefaultOptions(ogcFilters, fieldNameGeometry);
        if (this.options.ogcFilters.enabled &&
            this.options.ogcFilters.editable &&
            (options.sourceFields || []).filter(sf => !sf.values).length > 0) {
            this.wfsService.getSourceFieldsFromWFS(this.options);
        }
        if (ogcFilters === null || ogcFilters === void 0 ? void 0 : ogcFilters.pushButtons) {
            ogcFilters.pushButtons.selectorType = 'pushButton';
        }
        if (ogcFilters === null || ogcFilters === void 0 ? void 0 : ogcFilters.checkboxes) {
            ogcFilters.checkboxes.selectorType = 'checkbox';
        }
        if (ogcFilters === null || ogcFilters === void 0 ? void 0 : ogcFilters.radioButtons) {
            ogcFilters.radioButtons.selectorType = 'radioButton';
        }
        if (ogcFilters === null || ogcFilters === void 0 ? void 0 : ogcFilters.select) {
            ogcFilters.select.selectorType = 'select';
        }
        this.setOgcFilters(this.options.ogcFilters, true);
    }
    set ogcFilters(value) {
        this.options.ogcFilters = value;
    }
    get ogcFilters() {
        return this.options.ogcFilters;
    }
    createOlSource() {
        const vectorSource = new olSourceVector({
            format: getFormatFromOptions(this.options),
            url: (extent, resolution, proj) => {
                const paramsWFS = this.options.paramsWFS;
                const wfsProj = paramsWFS.srsName ? new olProjection({ code: paramsWFS.srsName }) : proj;
                const ogcFilters = this.options.ogcFilters;
                const currentExtent = olproj.transformExtent(extent, proj, wfsProj);
                paramsWFS.srsName = paramsWFS.srsName || proj.getCode();
                return buildUrl(this.options, currentExtent, wfsProj, ogcFilters);
            },
            strategy: OlLoadingStrategy.bbox
        });
        return vectorSource;
    }
    setOgcFilters(ogcFilters, triggerEvent = false) {
        this.ogcFilters = ogcFilters;
        this.mostRecentIdCallOGCFilter += 1;
        if (triggerEvent) {
            this.ogcFilters$.next(this.ogcFilters);
        }
    }
    onUnwatch() { }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ZzLWRhdGFzb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9nZW8vc3JjL2xpYi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy93ZnMtZGF0YXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGNBQWMsTUFBTSxrQkFBa0IsQ0FBQztBQUM5QyxPQUFPLEtBQUssaUJBQWlCLE1BQU0sb0JBQW9CLENBQUM7QUFDeEQsT0FBTyxZQUFZLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxLQUFLLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFHbEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUkxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFcEUsT0FBTyxFQUNMLHdCQUF3QixFQUN4QixjQUFjLEVBQ2Qsb0JBQW9CLEVBQ3BCLFFBQVEsRUFDVCxNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHdkMsTUFBTSxPQUFPLGFBQWMsU0FBUSxVQUFVO0lBYTNDLFlBQ1MsT0FBNkIsRUFDMUIsVUFBc0IsRUFDeEIsZUFBaUM7UUFFekMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUovQixZQUFPLEdBQVAsT0FBTyxDQUFzQjtRQUMxQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3hCLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtRQWRwQyw4QkFBeUIsR0FBVyxDQUFDLENBQUM7UUFTcEMsZ0JBQVcsR0FBdUMsSUFBSSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFTeEYsTUFBTSxVQUFVLEdBQUksSUFBSSxDQUFDLE9BQTBDLENBQUMsVUFBVSxDQUFDO1FBQy9FLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLE9B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Q0FBQztJQUVELGFBQWEsQ0FBQyxVQUE2QixFQUFFLGVBQXdCLEtBQUs7UUFDeEUsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLHlCQUF5QixJQUFJLENBQUMsQ0FBQztRQUNwQyxJQUFJLFlBQVksRUFBRTtZQUNoQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDeEM7SUFDSCxDQUFDO0lBRU0sU0FBUyxLQUFLLENBQUM7Q0FDdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xTb3VyY2VWZWN0b3IgZnJvbSAnb2wvc291cmNlL1ZlY3Rvcic7XG5pbXBvcnQgKiBhcyBPbExvYWRpbmdTdHJhdGVneSBmcm9tICdvbC9sb2FkaW5nc3RyYXRlZ3knO1xuaW1wb3J0IG9sUHJvamVjdGlvbiBmcm9tICdvbC9wcm9qL1Byb2plY3Rpb24nO1xuaW1wb3J0ICogYXMgb2xwcm9qIGZyb20gJ29sL3Byb2onO1xuaW1wb3J0IHR5cGUgeyBkZWZhdWx0IGFzIE9sR2VvbWV0cnkgfSBmcm9tICdvbC9nZW9tL0dlb21ldHJ5JztcblxuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4vZGF0YXNvdXJjZSc7XG5pbXBvcnQgeyBXRlNEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4vd2ZzLWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcbmltcG9ydCB7IFdGU1NlcnZpY2UgfSBmcm9tICcuL3dmcy5zZXJ2aWNlJztcblxuaW1wb3J0IHsgT2djRmlsdGVyV3JpdGVyIH0gZnJvbSAnLi4vLi4vLi4vZmlsdGVyL3NoYXJlZC9vZ2MtZmlsdGVyJztcbmltcG9ydCB7IE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucywgT2djRmlsdGVyc09wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi9maWx0ZXIvc2hhcmVkL29nYy1maWx0ZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7XG4gIGRlZmF1bHRGaWVsZE5hbWVHZW9tZXRyeSxcbiAgY2hlY2tXZnNQYXJhbXMsXG4gIGdldEZvcm1hdEZyb21PcHRpb25zLFxuICBidWlsZFVybFxufSBmcm9tICcuL3dtcy13ZnMudXRpbHMnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBdXRoSW50ZXJjZXB0b3IgfSBmcm9tICdAaWdvMi9hdXRoJztcblxuZXhwb3J0IGNsYXNzIFdGU0RhdGFTb3VyY2UgZXh0ZW5kcyBEYXRhU291cmNlIHtcbiAgcHVibGljIG9sOiBvbFNvdXJjZVZlY3RvcjxPbEdlb21ldHJ5PjtcbiAgcHVibGljIG1vc3RSZWNlbnRJZENhbGxPR0NGaWx0ZXI6IG51bWJlciA9IDA7XG5cbiAgc2V0IG9nY0ZpbHRlcnModmFsdWU6IE9nY0ZpbHRlcnNPcHRpb25zKSB7XG4gICAgKHRoaXMub3B0aW9ucyBhcyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMpLm9nY0ZpbHRlcnMgPSB2YWx1ZTtcbiAgfVxuICBnZXQgb2djRmlsdGVycygpOiBPZ2NGaWx0ZXJzT3B0aW9ucyB7XG4gICAgcmV0dXJuICh0aGlzLm9wdGlvbnMgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zKS5vZ2NGaWx0ZXJzO1xuICB9XG5cbiAgcmVhZG9ubHkgb2djRmlsdGVycyQ6IEJlaGF2aW9yU3ViamVjdDxPZ2NGaWx0ZXJzT3B0aW9ucz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHVuZGVmaW5lZCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG9wdGlvbnM6IFdGU0RhdGFTb3VyY2VPcHRpb25zLFxuICAgIHByb3RlY3RlZCB3ZnNTZXJ2aWNlOiBXRlNTZXJ2aWNlLFxuICAgIHByaXZhdGUgYXV0aEludGVyY2VwdG9yPzogQXV0aEludGVyY2VwdG9yXG4gICkge1xuICAgIHN1cGVyKGNoZWNrV2ZzUGFyYW1zKG9wdGlvbnMsICd3ZnMnKSk7XG5cbiAgICBjb25zdCBvZ2NGaWx0ZXJzID0gKHRoaXMub3B0aW9ucyBhcyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMpLm9nY0ZpbHRlcnM7XG4gICAgY29uc3QgZmllbGROYW1lR2VvbWV0cnkgPSB0aGlzLm9wdGlvbnMucGFyYW1zV0ZTLmZpZWxkTmFtZUdlb21ldHJ5IHx8IGRlZmF1bHRGaWVsZE5hbWVHZW9tZXRyeTtcbiAgICBjb25zdCBvZ2NGaWx0ZXJXcml0ZXIgPSBuZXcgT2djRmlsdGVyV3JpdGVyKCk7XG4gICAgKHRoaXMub3B0aW9ucyBhcyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMpLm9nY0ZpbHRlcnMgPVxuICAgICAgb2djRmlsdGVyV3JpdGVyLmRlZmluZU9nY0ZpbHRlcnNEZWZhdWx0T3B0aW9ucyhvZ2NGaWx0ZXJzLCBmaWVsZE5hbWVHZW9tZXRyeSk7XG4gICAgaWYgKFxuICAgICAgKHRoaXMub3B0aW9ucyBhcyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMpLm9nY0ZpbHRlcnMuZW5hYmxlZCAmJlxuICAgICAgKHRoaXMub3B0aW9ucyBhcyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMpLm9nY0ZpbHRlcnMuZWRpdGFibGUgJiZcbiAgICAgIChvcHRpb25zLnNvdXJjZUZpZWxkcyB8fCBbXSkuZmlsdGVyKHNmID0+ICFzZi52YWx1ZXMpLmxlbmd0aCA+IDBcbiAgICApIHtcbiAgICAgIHRoaXMud2ZzU2VydmljZS5nZXRTb3VyY2VGaWVsZHNGcm9tV0ZTKHRoaXMub3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaWYgKG9nY0ZpbHRlcnM/LnB1c2hCdXR0b25zKXtcbiAgICAgIG9nY0ZpbHRlcnMucHVzaEJ1dHRvbnMuc2VsZWN0b3JUeXBlID0gJ3B1c2hCdXR0b24nO1xuICAgIH1cbiAgICBpZiAob2djRmlsdGVycz8uY2hlY2tib3hlcyl7XG4gICAgICBvZ2NGaWx0ZXJzLmNoZWNrYm94ZXMuc2VsZWN0b3JUeXBlID0gJ2NoZWNrYm94JztcbiAgICB9XG4gICAgaWYgKG9nY0ZpbHRlcnM/LnJhZGlvQnV0dG9ucyl7XG4gICAgICBvZ2NGaWx0ZXJzLnJhZGlvQnV0dG9ucy5zZWxlY3RvclR5cGUgPSAncmFkaW9CdXR0b24nO1xuICAgIH1cbiAgICBpZiAob2djRmlsdGVycz8uc2VsZWN0KXtcbiAgICAgIG9nY0ZpbHRlcnMuc2VsZWN0LnNlbGVjdG9yVHlwZSA9ICdzZWxlY3QnO1xuICAgIH1cblxuICAgIHRoaXMuc2V0T2djRmlsdGVycygodGhpcy5vcHRpb25zIGFzIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucykub2djRmlsdGVycywgdHJ1ZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlT2xTb3VyY2UoKTogb2xTb3VyY2VWZWN0b3I8T2xHZW9tZXRyeT4ge1xuICAgIGNvbnN0IHZlY3RvclNvdXJjZSA9IG5ldyBvbFNvdXJjZVZlY3Rvcih7XG4gICAgICBmb3JtYXQ6IGdldEZvcm1hdEZyb21PcHRpb25zKHRoaXMub3B0aW9ucyksXG4gICAgICB1cmw6IChleHRlbnQsIHJlc29sdXRpb24sIHByb2o6IG9sUHJvamVjdGlvbikgPT4ge1xuICAgICAgICBjb25zdCBwYXJhbXNXRlMgPSB0aGlzLm9wdGlvbnMucGFyYW1zV0ZTO1xuICAgICAgICBjb25zdCB3ZnNQcm9qID0gcGFyYW1zV0ZTLnNyc05hbWUgPyBuZXcgb2xQcm9qZWN0aW9uKHsgY29kZTogcGFyYW1zV0ZTLnNyc05hbWUgfSkgOiBwcm9qO1xuICAgICAgICBjb25zdCBvZ2NGaWx0ZXJzID0gKHRoaXMub3B0aW9ucyBhcyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMpLm9nY0ZpbHRlcnM7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRFeHRlbnQgPSBvbHByb2oudHJhbnNmb3JtRXh0ZW50KGV4dGVudCwgcHJvaiwgd2ZzUHJvaik7XG4gICAgICAgIHBhcmFtc1dGUy5zcnNOYW1lID0gcGFyYW1zV0ZTLnNyc05hbWUgfHwgcHJvai5nZXRDb2RlKCk7XG4gICAgICAgIHJldHVybiBidWlsZFVybCh0aGlzLm9wdGlvbnMsIGN1cnJlbnRFeHRlbnQsIHdmc1Byb2osIG9nY0ZpbHRlcnMpO1xuICAgICAgfSxcbiAgICAgIHN0cmF0ZWd5OiBPbExvYWRpbmdTdHJhdGVneS5iYm94XG4gICAgfSk7XG4gICAgcmV0dXJuIHZlY3RvclNvdXJjZTtcbiAgfVxuXG4gIHNldE9nY0ZpbHRlcnMob2djRmlsdGVyczogT2djRmlsdGVyc09wdGlvbnMsIHRyaWdnZXJFdmVudDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgdGhpcy5vZ2NGaWx0ZXJzID0gb2djRmlsdGVycztcbiAgICB0aGlzLm1vc3RSZWNlbnRJZENhbGxPR0NGaWx0ZXIgKz0gMTtcbiAgICBpZiAodHJpZ2dlckV2ZW50KSB7XG4gICAgICB0aGlzLm9nY0ZpbHRlcnMkLm5leHQodGhpcy5vZ2NGaWx0ZXJzKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb25VbndhdGNoKCkgeyB9XG59XG4iXX0=