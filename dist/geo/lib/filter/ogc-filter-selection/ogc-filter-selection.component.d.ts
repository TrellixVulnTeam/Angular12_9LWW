import { OnInit } from '@angular/core';
import { OgcFilterableDataSource, OgcPushButton, OgcSelectorBundle, SelectorGroup } from '../../filter/shared/ogc-filter.interface';
import { IgoMap } from '../../map';
import { OGCFilterService } from '../shared/ogc-filter.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OgcFilterOperator } from '../shared/ogc-filter.enum';
import { MatSelect } from '@angular/material/select';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OgcFilterSelectionComponent implements OnInit {
    private ogcFilterService;
    private formBuilder;
    sel: MatSelect;
    refreshFilters: () => void;
    datasource: OgcFilterableDataSource;
    map: IgoMap;
    checkboxesIndex: number;
    radioButtonsIndex: number;
    baseIndex: number;
    get currentFilter(): any;
    set currentFilter(value: any);
    private _currentFilter;
    ogcFilterOperator: typeof OgcFilterOperator;
    form: FormGroup;
    private ogcFilterWriter;
    color: string;
    allSelected: boolean;
    select: FormControl;
    enabled$: BehaviorSubject<any>;
    enableds$: BehaviorSubject<any[]>;
    applyFiltersTimeout: any;
    get ogcFiltersSelectors(): any[];
    get currentPushButtonsGroup(): any;
    set currentPushButtonsGroup(value: any);
    get currentCheckboxesGroup(): any;
    set currentCheckboxesGroup(value: any);
    get currentRadioButtonsGroup(): any;
    set currentRadioButtonsGroup(value: any);
    get currentSelectGroup(): any;
    set currentSelectGroup(value: any);
    get enabled(): any;
    set enabled(value: any);
    get enableds(): any[];
    set enableds(value: any[]);
    constructor(ogcFilterService: OGCFilterService, formBuilder: FormBuilder);
    private buildForm;
    getPushButtonsGroups(): SelectorGroup[];
    getCheckboxesGroups(): SelectorGroup[];
    getRadioButtonsGroups(): SelectorGroup[];
    getSelectGroups(): SelectorGroup[];
    ngOnInit(): void;
    private getSelectEnabled;
    getToolTip(selector: any): string;
    getButtonColor(pushButton: OgcPushButton): {};
    bundleIsVertical(bundle: OgcSelectorBundle): boolean;
    private onPushButtonsChangeGroup;
    private onCheckboxesChangeGroup;
    private onRadioButtonsChangeGroup;
    private onSelectChangeGroup;
    onSelectionChange(currentOgcSelection?: any, selectorType?: any): void;
    emptyRadioButtons(): void;
    emptySelect(): void;
    toggleAllSelection(): void;
    optionClick(): void;
    private applyFilters;
    isMoreResults(bundle: any, type: any): boolean;
    displayMoreResults(type: any): void;
    isLessResults(bundle: any, type: any): boolean;
    displayLessResults(type: any): void;
    isTemporalOperator(): boolean;
    changeProperty(value: any, pos?: number, refreshFilter?: boolean): void;
    detectProperty(pos?: number): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<OgcFilterSelectionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OgcFilterSelectionComponent, "igo-ogc-filter-selection", never, { "refreshFilters": "refreshFilters"; "datasource": "datasource"; "map": "map"; "checkboxesIndex": "checkboxesIndex"; "radioButtonsIndex": "radioButtonsIndex"; "baseIndex": "baseIndex"; "currentFilter": "currentFilter"; }, {}, never, never>;
}
