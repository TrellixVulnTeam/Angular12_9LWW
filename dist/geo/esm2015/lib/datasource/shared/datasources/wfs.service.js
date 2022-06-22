import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { DataService } from './data.service';
import { formatWFSQueryString, gmlRegex, defaultEpsg, defaultMaxFeatures, getFormatFromOptions } from './wms-wfs.utils';
import { concatMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class WFSService extends DataService {
    constructor(http) {
        super();
        this.http = http;
    }
    getData() {
        console.log('This is defining a data service.');
        return 'This is defining a data service.';
    }
    getSourceFieldsFromWFS(dataSourceOptions) {
        if (!dataSourceOptions.sourceFields || dataSourceOptions.sourceFields.length === 0) {
            dataSourceOptions.sourceFields = [];
            this.defineFieldAndValuefromWFS(dataSourceOptions).subscribe(getfeatureSourceField => {
                dataSourceOptions.sourceFields = getfeatureSourceField;
            });
        }
        else {
            this.defineFieldAndValuefromWFS(dataSourceOptions).subscribe(getfeatureSourceField => {
                dataSourceOptions.sourceFields.forEach(sourcefield => {
                    if (sourcefield.alias === undefined) {
                        sourcefield.alias = sourcefield.name; // to allow only a list of sourcefield with names
                    }
                    if (sourcefield.values === undefined || sourcefield.values.length === 0) {
                        sourcefield.values = getfeatureSourceField.find(sf => sf.name === sourcefield.name).values;
                    }
                });
            });
        }
    }
    wfsGetFeature(dataSourceOptions, nb = defaultMaxFeatures, epsgCode = defaultEpsg, propertyName, startIndex = 0, forceDefaultOutputFormat = false) {
        const queryStringValues = formatWFSQueryString(dataSourceOptions, nb, epsgCode, propertyName, startIndex, forceDefaultOutputFormat);
        const baseUrl = queryStringValues.find(f => f.name === 'getfeature').value;
        const outputFormat = dataSourceOptions.paramsWFS.outputFormat;
        if (forceDefaultOutputFormat || gmlRegex.test(outputFormat) || !outputFormat) {
            return this.http.get(baseUrl, { responseType: 'text' });
        }
        else {
            return this.http.get(baseUrl);
        }
    }
    defineFieldAndValuefromWFS(dataSourceOptions) {
        return new Observable(d => {
            var _a;
            const sourceFields = [];
            let fieldList;
            let fieldListWoGeom;
            let fieldListWoGeomStr;
            let olFormats;
            let effectiveOlFormats;
            olFormats = getFormatFromOptions(dataSourceOptions);
            const gmlDataSourceOptions = JSON.parse(JSON.stringify(dataSourceOptions));
            delete gmlDataSourceOptions.paramsWFS.outputFormat;
            delete gmlDataSourceOptions.formatOptions;
            effectiveOlFormats = getFormatFromOptions(gmlDataSourceOptions);
            let sourceFieldsToRetrieveValues = (_a = dataSourceOptions.sourceFields) === null || _a === void 0 ? void 0 : _a.filter(f => !f.values).map(f => f.name);
            // Validate if the service manage no outputformat (wfs 1.0.0 and GML is the default return)
            this.wfsGetFeature(dataSourceOptions, 1, undefined, undefined, 0, true).pipe(concatMap(res => String(res).toLowerCase().includes('exception') ? of(false) : of(true)), concatMap(allowGml => {
                // If the service return GML (return no exception)
                return this.wfsGetFeature(dataSourceOptions, 1).pipe(concatMap(firstFeature => {
                    const features = olFormats.readFeatures(firstFeature);
                    fieldList = features[0].getKeys();
                    if (dataSourceOptions.sourceFields || dataSourceOptions.sourceFields.length === 0) {
                        sourceFieldsToRetrieveValues = fieldList;
                    }
                    fieldListWoGeom = fieldList.filter(field => sourceFieldsToRetrieveValues.includes(field) &&
                        field !== features[0].getGeometryName() &&
                        !field.match(/boundedby/gi));
                    fieldListWoGeomStr = fieldListWoGeom.join(',');
                    const processingArray = [];
                    let startIndex = 0;
                    // If the service do not allow gml return, dice the call in multiple
                    // calls by increment of chunkSize with the original outputFormat
                    if (!allowGml && dataSourceOptions.paramsWFS.version === '2.0.0' &&
                        dataSourceOptions.paramsWFS.maxFeatures > defaultMaxFeatures) {
                        const chunkSize = 1000;
                        while (startIndex < dataSourceOptions.paramsWFS.maxFeatures) {
                            processingArray.push(this.wfsGetFeature(dataSourceOptions, chunkSize, dataSourceOptions.paramsWFS.srsName, fieldListWoGeomStr, startIndex));
                            startIndex += chunkSize;
                        }
                        effectiveOlFormats = olFormats;
                    }
                    else {
                        processingArray.push(this.wfsGetFeature(dataSourceOptions, dataSourceOptions.paramsWFS.maxFeatures || defaultMaxFeatures, dataSourceOptions.paramsWFS.srsName, fieldListWoGeomStr, 0, true));
                    }
                    return combineLatest(processingArray);
                }));
            })).subscribe((results) => {
                let mfeatures = [];
                results.map((result) => {
                    const loopFeatures = effectiveOlFormats.readFeatures(result);
                    mfeatures = mfeatures.concat(loopFeatures);
                });
                this.built_properties_value(mfeatures).forEach(element => {
                    sourceFields.push(element);
                });
                d.next(sourceFields);
                d.complete();
            });
        });
    }
    built_properties_value(features) {
        if (features.length === 0) {
            return [];
        }
        const kv = Object.assign({}, features[0].getProperties());
        delete kv[features[0].getGeometryName()];
        delete kv.boundedBy;
        const sourceFields = [];
        for (const property in kv) {
            if (kv.hasOwnProperty(property)) {
                const fieldType = typeof features[0].get(property) === 'object'
                    ? undefined
                    : typeof features[0].get(property);
                sourceFields.push({
                    name: property,
                    alias: property,
                    type: fieldType,
                    values: [kv[property]]
                });
            }
        }
        features.every((element) => {
            const featureProperties = element.getProperties();
            for (const key in featureProperties) {
                if (featureProperties.hasOwnProperty(key) && key in kv) {
                    sourceFields.filter(f => f.name === key).forEach(v => {
                        if (v.values.indexOf(featureProperties[key]) === -1) {
                            v.values.push(featureProperties[key]);
                        }
                    });
                }
            }
            return true;
        });
        return sourceFields;
    }
}
WFSService.ɵfac = function WFSService_Factory(t) { return new (t || WFSService)(i0.ɵɵinject(i1.HttpClient)); };
WFSService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: WFSService, factory: WFSService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WFSService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.HttpClient }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ZzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9nZW8vc3JjL2xpYi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy93ZnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUlyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLG9CQUFvQixFQUNuQixRQUFRLEVBQ1IsV0FBVyxFQUNYLGtCQUFrQixFQUNsQixvQkFBb0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBSzNDLE1BQU0sT0FBTyxVQUFXLFNBQVEsV0FBVztJQUN6QyxZQUFvQixJQUFnQjtRQUNsQyxLQUFLLEVBQUUsQ0FBQztRQURVLFNBQUksR0FBSixJQUFJLENBQVk7SUFFcEMsQ0FBQztJQUVELE9BQU87UUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7UUFDaEQsT0FBTyxrQ0FBa0MsQ0FBQztJQUM1QyxDQUFDO0lBRU0sc0JBQXNCLENBQUMsaUJBQThEO1FBQzFGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLElBQUksaUJBQWlCLENBQUMsWUFBWSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUc7WUFDbkYsaUJBQWlCLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxTQUFTLENBQUMscUJBQXFCLENBQUMsRUFBRTtnQkFDbkYsaUJBQWlCLENBQUMsWUFBWSxHQUFHLHFCQUFxQixD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dWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IG9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcbmltcG9ydCB7IFdGU0RhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi93ZnMtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgV01TRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuL3dtcy1kYXRhc291cmNlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4vZGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7IGZvcm1hdFdGU1F1ZXJ5U3RyaW5nLFxuICAgICAgICAgIGdtbFJlZ2V4LFxuICAgICAgICAgIGRlZmF1bHRFcHNnLFxuICAgICAgICAgIGRlZmF1bHRNYXhGZWF0dXJlcyxcbiAgICAgICAgICBnZXRGb3JtYXRGcm9tT3B0aW9uc30gZnJvbSAnLi93bXMtd2ZzLnV0aWxzJztcbmltcG9ydCB7IGNvbmNhdE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB0eXBlIHsgZGVmYXVsdCBhcyBPbEdlb21ldHJ5IH0gZnJvbSAnb2wvZ2VvbS9HZW9tZXRyeSc7XG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBXRlNTZXJ2aWNlIGV4dGVuZHMgRGF0YVNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgZ2V0RGF0YSgpIHtcbiAgICBjb25zb2xlLmxvZygnVGhpcyBpcyBkZWZpbmluZyBhIGRhdGEgc2VydmljZS4nKTtcbiAgICByZXR1cm4gJ1RoaXMgaXMgZGVmaW5pbmcgYSBkYXRhIHNlcnZpY2UuJztcbiAgfVxuXG4gIHB1YmxpYyBnZXRTb3VyY2VGaWVsZHNGcm9tV0ZTKGRhdGFTb3VyY2VPcHRpb25zOiBXRlNEYXRhU291cmNlT3B0aW9ucyB8IFdNU0RhdGFTb3VyY2VPcHRpb25zKSB7XG4gICAgaWYgKCFkYXRhU291cmNlT3B0aW9ucy5zb3VyY2VGaWVsZHMgfHwgZGF0YVNvdXJjZU9wdGlvbnMuc291cmNlRmllbGRzLmxlbmd0aCA9PT0gMCApIHtcbiAgICAgIGRhdGFTb3VyY2VPcHRpb25zLnNvdXJjZUZpZWxkcyA9IFtdO1xuICAgICAgdGhpcy5kZWZpbmVGaWVsZEFuZFZhbHVlZnJvbVdGUyhkYXRhU291cmNlT3B0aW9ucykuc3Vic2NyaWJlKGdldGZlYXR1cmVTb3VyY2VGaWVsZCA9PiB7XG4gICAgICAgIGRhdGFTb3VyY2VPcHRpb25zLnNvdXJjZUZpZWxkcyA9IGdldGZlYXR1cmVTb3VyY2VGaWVsZDtcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVmaW5lRmllbGRBbmRWYWx1ZWZyb21XRlMoZGF0YVNvdXJjZU9wdGlvbnMpLnN1YnNjcmliZShnZXRmZWF0dXJlU291cmNlRmllbGQgPT4ge1xuICAgICAgICBkYXRhU291cmNlT3B0aW9ucy5zb3VyY2VGaWVsZHMuZm9yRWFjaChzb3VyY2VmaWVsZCA9PiB7XG4gICAgICAgICAgaWYgKHNvdXJjZWZpZWxkLmFsaWFzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNvdXJjZWZpZWxkLmFsaWFzID0gc291cmNlZmllbGQubmFtZTsgLy8gdG8gYWxsb3cgb25seSBhIGxpc3Qgb2Ygc291cmNlZmllbGQgd2l0aCBuYW1lc1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc291cmNlZmllbGQudmFsdWVzID09PSB1bmRlZmluZWQgfHwgc291cmNlZmllbGQudmFsdWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgc291cmNlZmllbGQudmFsdWVzID0gZ2V0ZmVhdHVyZVNvdXJjZUZpZWxkLmZpbmQoc2YgPT4gc2YubmFtZSA9PT0gc291cmNlZmllbGQubmFtZSkudmFsdWVzO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHdmc0dldEZlYXR1cmUoXG4gICAgZGF0YVNvdXJjZU9wdGlvbnM6IFdGU0RhdGFTb3VyY2VPcHRpb25zIHwgV01TRGF0YVNvdXJjZU9wdGlvbnMsXG4gICAgbmI6IG51bWJlciA9IGRlZmF1bHRNYXhGZWF0dXJlcyxcbiAgICBlcHNnQ29kZTogc3RyaW5nID0gZGVmYXVsdEVwc2csXG4gICAgcHJvcGVydHlOYW1lPzogc3RyaW5nLFxuICAgIHN0YXJ0SW5kZXg6IG51bWJlciA9IDAsXG4gICAgZm9yY2VEZWZhdWx0T3V0cHV0Rm9ybWF0OiBib29sZWFuID0gZmFsc2VcbiAgKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCBxdWVyeVN0cmluZ1ZhbHVlcyA9IGZvcm1hdFdGU1F1ZXJ5U3RyaW5nKGRhdGFTb3VyY2VPcHRpb25zLCBuYiwgZXBzZ0NvZGUsIHByb3BlcnR5TmFtZSwgc3RhcnRJbmRleCwgZm9yY2VEZWZhdWx0T3V0cHV0Rm9ybWF0ICk7XG4gICAgY29uc3QgYmFzZVVybCA9IHF1ZXJ5U3RyaW5nVmFsdWVzLmZpbmQoZiA9PiBmLm5hbWUgPT09ICdnZXRmZWF0dXJlJykudmFsdWU7XG4gICAgY29uc3Qgb3V0cHV0Rm9ybWF0ID0gZGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTLm91dHB1dEZvcm1hdDtcbiAgICBpZiAoZm9yY2VEZWZhdWx0T3V0cHV0Rm9ybWF0IHx8IGdtbFJlZ2V4LnRlc3Qob3V0cHV0Rm9ybWF0KSB8fCAhb3V0cHV0Rm9ybWF0KSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwLmdldChiYXNlVXJsLCB7IHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwLmdldChiYXNlVXJsKTtcbiAgICB9XG4gIH1cblxuICBkZWZpbmVGaWVsZEFuZFZhbHVlZnJvbVdGUyhcbiAgICBkYXRhU291cmNlT3B0aW9uczogV0ZTRGF0YVNvdXJjZU9wdGlvbnMgfCBXTVNEYXRhU291cmNlT3B0aW9uc1xuICApOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShkID0+IHtcbiAgICAgIGNvbnN0IHNvdXJjZUZpZWxkcyA9IFtdO1xuICAgICAgbGV0IGZpZWxkTGlzdDtcbiAgICAgIGxldCBmaWVsZExpc3RXb0dlb207XG4gICAgICBsZXQgZmllbGRMaXN0V29HZW9tU3RyO1xuICAgICAgbGV0IG9sRm9ybWF0cztcbiAgICAgIGxldCBlZmZlY3RpdmVPbEZvcm1hdHM7XG5cbiAgICAgIG9sRm9ybWF0cyA9IGdldEZvcm1hdEZyb21PcHRpb25zKGRhdGFTb3VyY2VPcHRpb25zKTtcbiAgICAgIGNvbnN0IGdtbERhdGFTb3VyY2VPcHRpb25zOiBXRlNEYXRhU291cmNlT3B0aW9ucyB8IFdNU0RhdGFTb3VyY2VPcHRpb25zID0gSlNPTi5wYXJzZShcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkoZGF0YVNvdXJjZU9wdGlvbnMpXG4gICAgICApO1xuICAgICAgZGVsZXRlIGdtbERhdGFTb3VyY2VPcHRpb25zLnBhcmFtc1dGUy5vdXRwdXRGb3JtYXQ7XG4gICAgICBkZWxldGUgKGdtbERhdGFTb3VyY2VPcHRpb25zIGFzIFdGU0RhdGFTb3VyY2VPcHRpb25zKS5mb3JtYXRPcHRpb25zO1xuXG4gICAgICBlZmZlY3RpdmVPbEZvcm1hdHMgPSBnZXRGb3JtYXRGcm9tT3B0aW9ucyhnbWxEYXRhU291cmNlT3B0aW9ucyk7XG4gICAgICBsZXQgc291cmNlRmllbGRzVG9SZXRyaWV2ZVZhbHVlcyA9IGRhdGFTb3VyY2VPcHRpb25zLnNvdXJjZUZpZWxkcz8uZmlsdGVyKGYgPT4gIWYudmFsdWVzKS5tYXAoZiA9PiBmLm5hbWUpO1xuXG4gICAgICAvLyBWYWxpZGF0ZSBpZiB0aGUgc2VydmljZSBtYW5hZ2Ugbm8gb3V0cHV0Zm9ybWF0ICh3ZnMgMS4wLjAgYW5kIEdNTCBpcyB0aGUgZGVmYXVsdCByZXR1cm4pXG4gICAgICB0aGlzLndmc0dldEZlYXR1cmUoZGF0YVNvdXJjZU9wdGlvbnMsIDEsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCAwLCB0cnVlKS5waXBlKFxuICAgICAgICBjb25jYXRNYXAocmVzID0+IFN0cmluZyhyZXMpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ2V4Y2VwdGlvbicpID8gb2YoZmFsc2UpIDogb2YodHJ1ZSkpLFxuICAgICAgICBjb25jYXRNYXAoYWxsb3dHbWwgPT4ge1xuICAgICAgICAgIC8vIElmIHRoZSBzZXJ2aWNlIHJldHVybiBHTUwgKHJldHVybiBubyBleGNlcHRpb24pXG4gICAgICAgICAgcmV0dXJuIHRoaXMud2ZzR2V0RmVhdHVyZShkYXRhU291cmNlT3B0aW9ucywgMSkucGlwZShcbiAgICAgICAgICAgIGNvbmNhdE1hcChmaXJzdEZlYXR1cmUgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBmZWF0dXJlcyA9IG9sRm9ybWF0cy5yZWFkRmVhdHVyZXMoZmlyc3RGZWF0dXJlKTtcbiAgICAgICAgICAgICAgZmllbGRMaXN0ID0gZmVhdHVyZXNbMF0uZ2V0S2V5cygpO1xuICAgICAgICAgICAgICBpZiAoZGF0YVNvdXJjZU9wdGlvbnMuc291cmNlRmllbGRzIHx8IGRhdGFTb3VyY2VPcHRpb25zLnNvdXJjZUZpZWxkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBzb3VyY2VGaWVsZHNUb1JldHJpZXZlVmFsdWVzID0gZmllbGRMaXN0O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGZpZWxkTGlzdFdvR2VvbSA9IGZpZWxkTGlzdC5maWx0ZXIoXG4gICAgICAgICAgICAgICAgZmllbGQgPT5cbiAgICAgICAgICAgICAgICAgIHNvdXJjZUZpZWxkc1RvUmV0cmlldmVWYWx1ZXMuaW5jbHVkZXMoZmllbGQpICYmXG4gICAgICAgICAgICAgICAgICBmaWVsZCAhPT0gZmVhdHVyZXNbMF0uZ2V0R2VvbWV0cnlOYW1lKCkgJiZcbiAgICAgICAgICAgICAgICAgICFmaWVsZC5tYXRjaCgvYm91bmRlZGJ5L2dpKVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBmaWVsZExpc3RXb0dlb21TdHIgPSBmaWVsZExpc3RXb0dlb20uam9pbignLCcpO1xuICAgICAgICAgICAgICBjb25zdCBwcm9jZXNzaW5nQXJyYXkgPSBbXTtcbiAgICAgICAgICAgICAgbGV0IHN0YXJ0SW5kZXggPSAwO1xuICAgICAgICAgICAgICAvLyBJZiB0aGUgc2VydmljZSBkbyBub3QgYWxsb3cgZ21sIHJldHVybiwgZGljZSB0aGUgY2FsbCBpbiBtdWx0aXBsZVxuICAgICAgICAgICAgICAvLyBjYWxscyBieSBpbmNyZW1lbnQgb2YgY2h1bmtTaXplIHdpdGggdGhlIG9yaWdpbmFsIG91dHB1dEZvcm1hdFxuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgIWFsbG93R21sICYmIGRhdGFTb3VyY2VPcHRpb25zLnBhcmFtc1dGUy52ZXJzaW9uID09PSAnMi4wLjAnICYmXG4gICAgICAgICAgICAgICAgZGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTLm1heEZlYXR1cmVzID4gZGVmYXVsdE1heEZlYXR1cmVzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2h1bmtTaXplID0gMTAwMDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoc3RhcnRJbmRleCA8IGRhdGFTb3VyY2VPcHRpb25zLnBhcmFtc1dGUy5tYXhGZWF0dXJlcykge1xuICAgICAgICAgICAgICAgICAgcHJvY2Vzc2luZ0FycmF5LnB1c2godGhpcy53ZnNHZXRGZWF0dXJlKFxuICAgICAgICAgICAgICAgICAgICBkYXRhU291cmNlT3B0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgY2h1bmtTaXplLFxuICAgICAgICAgICAgICAgICAgICBkYXRhU291cmNlT3B0aW9ucy5wYXJhbXNXRlMuc3JzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZmllbGRMaXN0V29HZW9tU3RyLFxuICAgICAgICAgICAgICAgICAgICBzdGFydEluZGV4XG4gICAgICAgICAgICAgICAgICApKTtcbiAgICAgICAgICAgICAgICAgIHN0YXJ0SW5kZXggKz0gY2h1bmtTaXplO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlZmZlY3RpdmVPbEZvcm1hdHMgPSBvbEZvcm1hdHM7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc2luZ0FycmF5LnB1c2godGhpcy53ZnNHZXRGZWF0dXJlKFxuICAgICAgICAgICAgICAgICAgZGF0YVNvdXJjZU9wdGlvbnMsXG4gICAgICAgICAgICAgICAgICBkYXRhU291cmNlT3B0aW9ucy5wYXJhbXNXRlMubWF4RmVhdHVyZXMgfHwgZGVmYXVsdE1heEZlYXR1cmVzLFxuICAgICAgICAgICAgICAgICAgZGF0YVNvdXJjZU9wdGlvbnMucGFyYW1zV0ZTLnNyc05hbWUsXG4gICAgICAgICAgICAgICAgICBmaWVsZExpc3RXb0dlb21TdHIsXG4gICAgICAgICAgICAgICAgICAwLCB0cnVlXG4gICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QocHJvY2Vzc2luZ0FycmF5KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgfSkpLnN1YnNjcmliZSgocmVzdWx0cykgPT4ge1xuICAgICAgICAgIGxldCBtZmVhdHVyZXM6IG9sRmVhdHVyZTxPbEdlb21ldHJ5PltdID0gW107XG4gICAgICAgICAgcmVzdWx0cy5tYXAoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbG9vcEZlYXR1cmVzID0gZWZmZWN0aXZlT2xGb3JtYXRzLnJlYWRGZWF0dXJlcyhyZXN1bHQpO1xuICAgICAgICAgICAgbWZlYXR1cmVzID0gbWZlYXR1cmVzLmNvbmNhdChsb29wRmVhdHVyZXMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuYnVpbHRfcHJvcGVydGllc192YWx1ZShtZmVhdHVyZXMpLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBzb3VyY2VGaWVsZHMucHVzaChlbGVtZW50KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBkLm5leHQoc291cmNlRmllbGRzKTtcbiAgICAgICAgICBkLmNvbXBsZXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsdF9wcm9wZXJ0aWVzX3ZhbHVlKGZlYXR1cmVzOiBvbEZlYXR1cmU8T2xHZW9tZXRyeT5bXSk6IHN0cmluZ1tdIHtcbiAgICBpZiAoZmVhdHVyZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGNvbnN0IGt2ID0gT2JqZWN0LmFzc2lnbih7fSwgZmVhdHVyZXNbMF0uZ2V0UHJvcGVydGllcygpKTtcbiAgICBkZWxldGUga3ZbZmVhdHVyZXNbMF0uZ2V0R2VvbWV0cnlOYW1lKCldO1xuICAgIGRlbGV0ZSBrdi5ib3VuZGVkQnk7XG4gICAgY29uc3Qgc291cmNlRmllbGRzID0gW107XG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBrdikge1xuICAgICAgaWYgKGt2Lmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgICBjb25zdCBmaWVsZFR5cGUgPVxuICAgICAgICAgIHR5cGVvZiBmZWF0dXJlc1swXS5nZXQocHJvcGVydHkpID09PSAnb2JqZWN0J1xuICAgICAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgICAgIDogdHlwZW9mIGZlYXR1cmVzWzBdLmdldChwcm9wZXJ0eSk7XG4gICAgICAgIHNvdXJjZUZpZWxkcy5wdXNoKHtcbiAgICAgICAgICBuYW1lOiBwcm9wZXJ0eSxcbiAgICAgICAgICBhbGlhczogcHJvcGVydHksXG4gICAgICAgICAgdHlwZTogZmllbGRUeXBlLFxuICAgICAgICAgIHZhbHVlczogW2t2W3Byb3BlcnR5XV1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGZlYXR1cmVzLmV2ZXJ5KChlbGVtZW50KSA9PiB7XG4gICAgICBjb25zdCBmZWF0dXJlUHJvcGVydGllcyA9IGVsZW1lbnQuZ2V0UHJvcGVydGllcygpO1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gZmVhdHVyZVByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKGZlYXR1cmVQcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KGtleSkgJiYga2V5IGluIGt2KSB7XG4gICAgICAgICAgc291cmNlRmllbGRzLmZpbHRlcihmID0+IGYubmFtZSA9PT0ga2V5KS5mb3JFYWNoKHYgPT4ge1xuICAgICAgICAgICAgaWYgKHYudmFsdWVzLmluZGV4T2YoZmVhdHVyZVByb3BlcnRpZXNba2V5XSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgIHYudmFsdWVzLnB1c2goZmVhdHVyZVByb3BlcnRpZXNba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICAgIHJldHVybiBzb3VyY2VGaWVsZHM7XG4gIH1cbn1cbiJdfQ==