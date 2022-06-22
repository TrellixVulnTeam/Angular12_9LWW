import olSource from 'ol/source/Source';
import olSourceVector from 'ol/source/Vector';
import type { default as OlGeometry } from 'ol/geom/Geometry';
import { DataSourceOptions } from './datasource.interface';
import { WFSDataSourceOptionsParams } from './wfs-datasource.interface';
export interface WMSDataSourceOptions extends DataSourceOptions {
    paramsWFS?: WFSDataSourceOptionsParams;
    urlWfs?: string;
    url: string;
    params: WMSDataSourceOptionsParams;
    crossOrigin?: string;
    projection?: string;
    resolutions?: number[];
    serverType?: string;
    ratio?: number;
    ol?: olSourceVector<OlGeometry> | olSource;
    refreshIntervalSec?: number;
    contentDependentLegend?: boolean;
    excludeAttribute?: Array<string>;
}
export interface WMSDataSourceOptionsParams {
    LAYERS: string;
    VERSION?: string;
    TIME?: string;
    FEATURE_COUNT?: number;
    FILTER?: string;
    INFO_FORMAT?: string;
    DPI?: number;
    MAP_RESOLUTION?: number;
    FORMAT_OPTIONS?: string;
}
