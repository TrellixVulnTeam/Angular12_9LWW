import { OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { WorkspaceStore, WorkspaceSelectorComponent } from '@igo2/common';
import { ImageLayer, VectorLayer } from '../../layer';
import { IgoMap } from '../../map';
import { WfsWorkspaceService } from '../shared/wfs-workspace.service';
import { WmsWorkspaceService } from '../shared/wms-workspace.service';
import { EditionWorkspaceService } from '../shared/edition-workspace.service';
import { FeatureWorkspaceService } from '../shared/feature-workspace.service';
import * as i0 from "@angular/core";
export declare class WorkspaceSelectorDirective implements OnInit, OnDestroy {
    private component;
    private wfsWorkspaceService;
    private wmsWorkspaceService;
    private editionWorkspaceService;
    private featureWorkspaceService;
    private layers$$;
    private entities$$;
    map: IgoMap;
    changeWorkspace: EventEmitter<string>;
    disableSwitch: EventEmitter<boolean>;
    relationLayers: EventEmitter<ImageLayer[] | VectorLayer[]>;
    rowsInMapExtentCheckCondition: EventEmitter<boolean>;
    get workspaceStore(): WorkspaceStore;
    constructor(component: WorkspaceSelectorComponent, wfsWorkspaceService: WfsWorkspaceService, wmsWorkspaceService: WmsWorkspaceService, editionWorkspaceService: EditionWorkspaceService, featureWorkspaceService: FeatureWorkspaceService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private onLayersChange;
    private getOrCreateWorkspace;
    private layerIsEditable;
    static ɵfac: i0.ɵɵFactoryDeclaration<WorkspaceSelectorDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WorkspaceSelectorDirective, "[igoWorkspaceSelector]", never, { "map": "map"; }, { "changeWorkspace": "changeWorkspace"; "disableSwitch": "disableSwitch"; "relationLayers": "relationLayers"; "rowsInMapExtentCheckCondition": "rowsInMapExtentCheckCondition"; }, never>;
}
