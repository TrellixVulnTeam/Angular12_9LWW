import { OnInit, OnDestroy, EventEmitter, ElementRef } from '@angular/core';
import type { TemplateRef } from '@angular/core';
import { FloatLabelType } from '@angular/material/form-field';
import { LayerListDisplacement } from './layer-list.enum';
import { LayerListSelectVisibleEnum } from './layer-list.enum';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { LayerListControlsOptions } from '../layer-list-tool/layer-list-tool.interface';
import { IgoMap } from '../../map/shared/map';
import { Layer } from '../shared/layers/layer';
import { MatSliderChange } from '@angular/material/slider';
import * as i0 from "@angular/core";
export declare class LayerListComponent implements OnInit, OnDestroy {
    private elRef;
    orderable: boolean;
    thresholdToFilterAndSort: number;
    layers$: BehaviorSubject<Layer[]>;
    change$: ReplaySubject<void>;
    showToolbar$: BehaviorSubject<boolean>;
    layerTool: boolean;
    hideSelectedLayers: boolean;
    activeLayer$: BehaviorSubject<Layer>;
    layersChecked: Layer[];
    selection: boolean;
    private change$$;
    private layers$$;
    layerItemChangeDetection$: BehaviorSubject<any>;
    templateLayerToolbar: TemplateRef<any>;
    layersAreAllVisible: boolean;
    ogcButton: boolean;
    timeButton: boolean;
    get map(): IgoMap;
    set map(value: IgoMap);
    private _map;
    set layers(value: Layer[]);
    get layers(): Layer[];
    private _layers;
    set activeLayer(value: Layer);
    get activeLayer(): Layer;
    private _activeLayer;
    floatLabel: FloatLabelType;
    layerFilterAndSortOptions: LayerListControlsOptions;
    excludeBaseLayers: boolean;
    toggleLegendOnVisibilityChange: boolean;
    expandLegendOfVisibleLayers: boolean;
    updateLegendOnResolutionChange: boolean;
    queryBadge: boolean;
    appliedFilterAndSort: EventEmitter<LayerListControlsOptions>;
    get keyword(): string;
    set keyword(value: string);
    private _keyword;
    get onlyVisible(): boolean;
    set onlyVisible(value: boolean);
    private _onlyVisible;
    get sortAlpha(): boolean;
    set sortAlpha(value: boolean);
    private _sortedAlpha;
    get opacity(): number;
    set opacity(opacity: number);
    get badgeOpacity(): number;
    get raiseDisabled(): boolean;
    get lowerDisabled(): boolean;
    get raiseDisabledSelection(): boolean;
    get lowerDisabledSelection(): boolean;
    get checkOpacity(): number;
    set checkOpacity(opacity: number);
    get layerListDisplacement(): typeof LayerListDisplacement;
    toggleOpacity: boolean;
    selectAllCheck: boolean;
    selectAllCheck$: BehaviorSubject<boolean>;
    private selectAllCheck$$;
    constructor(elRef: ElementRef);
    /**
     * Subscribe to the search term stream and trigger researches
     * @internal
     */
    ngOnInit(): void;
    ngOnDestroy(): void;
    activeLayerIsValid(layer: Layer): boolean;
    activeLayersAreValid(layers: Layer[]): boolean;
    zoomLayerExtents(layer: Layer): void;
    zoomLayersExtents(layers: Layer[]): void;
    changeOpacity(event: MatSliderChange): void;
    clearKeyword(): void;
    getLowerLayer(): {
        zIndex: any;
        id: any;
    };
    isLowerBaselayer(layer: any): boolean;
    getUpperLayer(): {
        zIndex: any;
        id: any;
    };
    isUpperBaselayer(layer: any): boolean;
    moveActiveLayer(activeLayer: Layer, actiontype: LayerListDisplacement): void;
    private getLinkedLayers;
    raisableLayers(layers: Layer[]): boolean;
    raisableLayer(index: number): any;
    raiseLayers(layers: Layer[], fromUi?: boolean): void;
    lowerableLayers(layers: Layer[]): boolean;
    lowerableLayer(index: number): any;
    lowerLayers(layers: Layer[], fromUi?: boolean): void;
    private next;
    private computeLayers;
    onKeywordChange(term: any): void;
    onAppliedFilterAndSortChange(appliedFilter: LayerListControlsOptions): void;
    private filterLayers;
    private sortLayersByZindex;
    private sortLayersByTitle;
    private normalize;
    private computeShowToolbar;
    toggleLayerTool(layer: any): void;
    removeLayers(layers?: Layer[]): void;
    toggleVisibility(layers?: Layer[]): void;
    isLayerRemovable(layer: Layer): boolean;
    isAllLayersRemovable(layers: Layer[]): boolean;
    get statusSelectedLayersCheck(): LayerListSelectVisibleEnum;
    layersCheck(event: {
        layer: Layer;
        check: boolean;
    }): void;
    toggleSelectionMode(value: boolean): void;
    layersCheckedOpacity(): any;
    selectAll(): void;
    isScrolledIntoView(elemSource: any, elem: any): boolean;
    computeElementRef(type?: string): any[];
    removeProblemLayerInList(layersList: Layer[]): Layer[];
    static ɵfac: i0.ɵɵFactoryDeclaration<LayerListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LayerListComponent, "igo-layer-list", never, { "layersAreAllVisible": "layersAreAllVisible"; "ogcButton": "ogcButton"; "timeButton": "timeButton"; "map": "map"; "layers": "layers"; "floatLabel": "floatLabel"; "layerFilterAndSortOptions": "layerFilterAndSortOptions"; "excludeBaseLayers": "excludeBaseLayers"; "toggleLegendOnVisibilityChange": "toggleLegendOnVisibilityChange"; "expandLegendOfVisibleLayers": "expandLegendOfVisibleLayers"; "updateLegendOnResolutionChange": "updateLegendOnResolutionChange"; "queryBadge": "queryBadge"; }, { "appliedFilterAndSort": "appliedFilterAndSort"; }, ["templateLayerToolbar"], ["[igoLayerItemToolbar]"]>;
}