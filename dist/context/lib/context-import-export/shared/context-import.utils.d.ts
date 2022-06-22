import type { default as OlGeometry } from 'ol/geom/Geometry';
import { IgoMap, VectorLayer, StyleService, StyleListService } from '@igo2/geo';
import { MessageService, LanguageService } from '@igo2/core';
import { DetailedContext } from '../../context-manager/shared/context.interface';
import { ContextService } from '../../context-manager/shared/context.service';
import OlFeature from 'ol/Feature';
export declare function handleFileImportSuccess(file: File, context: DetailedContext, messageService: MessageService, languageService: LanguageService, contextService: ContextService): void;
export declare function handleFileImportError(file: File, error: Error, messageService: MessageService, languageService: LanguageService, sizeMb?: number): void;
export declare function handleInvalidFileImportError(file: File, error: Error, messageService: MessageService, languageService: LanguageService): void;
export declare function handleSizeFileImportError(file: File, error: Error, messageService: MessageService, languageService: LanguageService, sizeMb: number): void;
export declare function handleUnreadbleFileImportError(file: File, error: Error, messageService: MessageService, languageService: LanguageService): void;
export declare function handleNothingToImportError(file: File, messageService: MessageService, languageService: LanguageService): void;
export declare function addContextToContextList(context: DetailedContext, contextTitle: string, contextService: ContextService): void;
export declare function getFileExtension(file: File): string;
export declare function computeLayerTitleFromFile(file: File): string;
export declare function addImportedFeaturesToMap(olFeatures: OlFeature<OlGeometry>[], map: IgoMap, layerTitle: string): VectorLayer;
export declare function addImportedFeaturesStyledToMap(olFeatures: OlFeature<OlGeometry>[], map: IgoMap, layerTitle: string, styleListService: StyleListService, styleService: StyleService): VectorLayer;
