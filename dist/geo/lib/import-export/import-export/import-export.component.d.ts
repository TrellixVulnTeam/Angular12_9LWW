import { OnDestroy, OnInit, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MessageService, LanguageService, ConfigService, StorageService } from '@igo2/core';
import { IgoMap } from '../../map/shared/map';
import { Layer } from '../../layer/shared/layers/layer';
import { AnyLayer } from '../../layer/shared/layers/any-layer';
import { ExportOptions } from '../shared/export.interface';
import { ExportFormat } from '../shared/export.type';
import { ExportService } from '../shared/export.service';
import { ImportService } from '../shared/import.service';
import { StyleService } from '../../layer/shared/style.service';
import { StyleListService } from '../style-list/style-list.service';
import type { WorkspaceStore } from '@igo2/common';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { InputProjections, ProjectionsLimitationsOptions } from '../../map/';
import { DownloadService } from '../../download/shared/download.service';
import * as i0 from "@angular/core";
export declare class ImportExportComponent implements OnDestroy, OnInit {
    private importService;
    private exportService;
    private languageService;
    private messageService;
    private styleListService;
    private styleService;
    private formBuilder;
    private config;
    private cdRef;
    private storageService;
    private downloadService;
    form: FormGroup;
    importForm: FormGroup;
    formats$: BehaviorSubject<any>;
    encodings$: BehaviorSubject<any>;
    exportableLayers$: BehaviorSubject<AnyLayer[]>;
    loading$: BehaviorSubject<boolean>;
    forceNaming: boolean;
    controlFormat: string;
    private layers$$;
    private exportableLayers$$;
    private formats$$;
    private encodings$$;
    private formLayer$$;
    private exportOptions$$;
    private espgCodeRegex;
    private clientSideFileSizeMax;
    fileSizeMb: number;
    projections$: BehaviorSubject<InputProjections[]>;
    private projectionsConstraints;
    popupChecked: boolean;
    private previousLayerSpecs$;
    selectFirstProj: boolean;
    map: IgoMap;
    private _projectionsLimitations;
    set projectionsLimitations(value: ProjectionsLimitationsOptions);
    get projectionsLimitations(): ProjectionsLimitationsOptions;
    /**
     * Store that holds the available workspaces.
     */
    store: WorkspaceStore;
    selectedMode: string;
    selectMode: EventEmitter<string>;
    exportOptions$: BehaviorSubject<ExportOptions>;
    exportOptionsChange: EventEmitter<ExportOptions>;
    get layers(): any;
    set layers(value: any);
    get inputProj(): any;
    set inputProj(value: any);
    get popupAllowed(): boolean;
    set popupAllowed(value: boolean);
    constructor(importService: ImportService, exportService: ExportService, languageService: LanguageService, messageService: MessageService, styleListService: StyleListService, styleService: StyleService, formBuilder: FormBuilder, config: ConfigService, cdRef: ChangeDetectorRef, storageService: StorageService, downloadService: DownloadService);
    ngOnInit(): void;
    private computeProjections;
    private getWorkspaceByLayerId;
    getLayerTitleById(id: any): string;
    layerHasSelectedFeatures(layer: Layer): boolean;
    onlySelected(event: MatSlideToggleChange, id: string): void;
    onlySelectedClick(event: any, id: string): void;
    inLayersIdToExportSelectionOnly(layer: Layer): boolean;
    ngOnDestroy(): void;
    private handlePreviousLayerSpecs;
    importFiles(files: File[]): void;
    handlePopup(preCheck?: boolean): boolean;
    handleExportFormSubmit(data: ExportOptions): void;
    private createTitleEmptyRows;
    private circleToPoint;
    private buildForm;
    private onFileImportSuccess;
    private onFileImportError;
    private onPopupBlockedError;
    private onFileExportError;
    private loadConfig;
    encodingDefaultValue(format: ExportFormat): "UTF8" | "LATIN1";
    private loadEncodings;
    private computeFormats;
    private validateListFormat;
    modeChanged(mode: any): void;
    private onFileExportSuccess;
    onImportExportChange(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ImportExportComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ImportExportComponent, "igo-import-export", never, { "selectFirstProj": "selectFirstProj"; "map": "map"; "projectionsLimitations": "projectionsLimitations"; "store": "store"; "selectedMode": "selectedMode"; "exportOptions$": "exportOptions$"; }, { "selectMode": "selectMode"; "exportOptionsChange": "exportOptionsChange"; }, never, never>;
}
