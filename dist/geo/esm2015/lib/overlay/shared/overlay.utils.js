import * as olstyle from 'ol/style';
import { asArray as ColorAsArray } from 'ol/color';
import { FeatureDataSource } from '../../datasource';
import { VectorLayer } from '../../layer/shared/layers/vector-layer';
import { StyleService } from '../../layer/shared/style.service';
import { createOverlayMarkerStyle } from './overlay-marker-style.utils';
/**
 * Create an overlay layer and it's source
 * @returns Overlay layer
 */
export function createOverlayLayer() {
    const overlayDataSource = new FeatureDataSource();
    return new VectorLayer({
        title: 'Overlay',
        zIndex: 300,
        source: overlayDataSource,
        style: createOverlayLayerStyle()
    });
}
/**
 * Create an overlay style with markers for points and a basic stroke/fill
 * combination for lines and polygons
 * @returns Style function
 */
function createOverlayLayerStyle() {
    const defaultStyle = createOverlayDefaultStyle();
    const markerStyle = createOverlayMarkerStyle();
    let style;
    return (olFeature) => {
        if (olFeature.getId() === 'bufferFeature') {
            style = createBufferStyle(olFeature.get('bufferStroke'), 2, olFeature.get('bufferFill'), olFeature.get('bufferText'));
            return style;
        }
        else {
            const customStyle = olFeature.get('_style');
            if (customStyle) {
                const styleService = new StyleService();
                return styleService.createStyle(customStyle);
            }
            const geometryType = olFeature.getGeometry().getType();
            style = geometryType === 'Point' ? markerStyle : defaultStyle;
            style.getText().setText(olFeature.get('_mapTitle'));
            return style;
        }
    };
}
/**
 * Create a basic style for lines and polygons
 * @returns Style
 */
export function createOverlayDefaultStyle({ text, strokeWidth = 2, fillColor = [0, 161, 222, 0.3], strokeColor = [0, 161, 222, 0.9], } = {}) {
    const fillWithOpacity = ColorAsArray(fillColor).slice(0);
    const strokeWithOpacity = ColorAsArray(strokeColor).slice(0);
    const stroke = new olstyle.Stroke({
        width: strokeWidth,
        color: strokeWithOpacity
    });
    const fill = new olstyle.Fill({
        color: fillWithOpacity
    });
    return new olstyle.Style({
        stroke,
        fill,
        image: new olstyle.Circle({
            radius: 5,
            stroke,
            fill
        }),
        text: new olstyle.Text({
            text,
            font: '12px Calibri,sans-serif',
            fill: new olstyle.Fill({ color: '#000' }),
            stroke: new olstyle.Stroke({ color: '#fff', width: 3 }),
            overflow: true
        })
    });
}
function createBufferStyle(strokeRGBA = [0, 161, 222, 1], strokeWidth = 2, fillRGBA = [0, 161, 222, 0.15], bufferRadius) {
    const stroke = new olstyle.Stroke({
        width: strokeWidth,
        color: strokeRGBA
    });
    const fill = new olstyle.Fill({
        color: fillRGBA
    });
    return new olstyle.Style({
        stroke,
        fill,
        image: new olstyle.Circle({
            radius: 5,
            stroke,
            fill
        }),
        text: new olstyle.Text({
            font: '12px Calibri,sans-serif',
            text: bufferRadius,
            fill: new olstyle.Fill({ color: '#000' }),
            stroke: new olstyle.Stroke({ color: '#fff', width: 3 }),
            overflow: true
        })
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS51dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2dlby9zcmMvbGliL292ZXJsYXkvc2hhcmVkL292ZXJsYXkudXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFFcEMsT0FBTyxFQUFFLE9BQU8sSUFBSSxZQUFZLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFbkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDckQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUd4RTs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsa0JBQWtCO0lBQ2hDLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO0lBQ2xELE9BQU8sSUFBSSxXQUFXLENBQUM7UUFDckIsS0FBSyxFQUFFLFNBQVM7UUFDaEIsTUFBTSxFQUFFLEdBQUc7UUFDWCxNQUFNLEVBQUUsaUJBQWlCO1FBQ3pCLEtBQUssRUFBRSx1QkFBdUIsRUFBRTtLQUNqQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQVMsdUJBQXVCO0lBQzlCLE1BQU0sWUFBWSxHQUFHLHlCQUF5QixFQUFFLENBQUM7SUFDakQsTUFBTSxXQUFXLEdBQUcsd0JBQXdCLEVBQUUsQ0FBQztJQUUvQyxJQUFJLEtBQUssQ0FBQztJQUVWLE9BQU8sQ0FBQyxTQUFnQyxFQUFFLEVBQUU7UUFDMUMsSUFBSSxTQUFTLENBQUMsS0FBSyxFQUFFLEtBQUssZUFBZSxFQUFFO1lBQ3pDLEtBQUssR0FBRyxpQkFBaUIsQ0FDdkIsU0FBUyxDQUFDLEdBQUcsQ0FB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LENBQUM7SUFFSCxNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDNUIsS0FBSyxFQUFFLFFBQVE7S0FDaEIsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDdkIsTUFBTTtRQUNOLElBQUk7UUFDSixLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ3hCLE1BQU0sRUFBRSxDQUFDO1lBQ1QsTUFBTTtZQUNOLElBQUk7U0FDTCxDQUFDO1FBQ0YsSUFBSSxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQztZQUNyQixJQUFJLEVBQUUseUJBQXlCO1lBQy9CLElBQUksRUFBRSxZQUFZO1lBQ2xCLElBQUksRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7WUFDekMsTUFBTSxFQUFFLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQ3ZELFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQztLQUNILENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBvbHN0eWxlIGZyb20gJ29sL3N0eWxlJztcbmltcG9ydCBPbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XG5pbXBvcnQgeyBhc0FycmF5IGFzIENvbG9yQXNBcnJheSB9IGZyb20gJ29sL2NvbG9yJztcblxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlJztcbmltcG9ydCB7IFZlY3RvckxheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy92ZWN0b3ItbGF5ZXInO1xuaW1wb3J0IHsgU3R5bGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL3N0eWxlLnNlcnZpY2UnO1xuaW1wb3J0IHsgY3JlYXRlT3ZlcmxheU1hcmtlclN0eWxlIH0gZnJvbSAnLi9vdmVybGF5LW1hcmtlci1zdHlsZS51dGlscyc7XG5pbXBvcnQgdHlwZSB7IGRlZmF1bHQgYXMgT2xHZW9tZXRyeSB9IGZyb20gJ29sL2dlb20vR2VvbWV0cnknO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBvdmVybGF5IGxheWVyIGFuZCBpdCdzIHNvdXJjZVxuICogQHJldHVybnMgT3ZlcmxheSBsYXllclxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlT3ZlcmxheUxheWVyKCk6IFZlY3RvckxheWVyIHtcbiAgY29uc3Qgb3ZlcmxheURhdGFTb3VyY2UgPSBuZXcgRmVhdHVyZURhdGFTb3VyY2UoKTtcbiAgcmV0dXJuIG5ldyBWZWN0b3JMYXllcih7XG4gICAgdGl0bGU6ICdPdmVybGF5JyxcbiAgICB6SW5kZXg6IDMwMCxcbiAgICBzb3VyY2U6IG92ZXJsYXlEYXRhU291cmNlLFxuICAgIHN0eWxlOiBjcmVhdGVPdmVybGF5TGF5ZXJTdHlsZSgpXG4gIH0pO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhbiBvdmVybGF5IHN0eWxlIHdpdGggbWFya2VycyBmb3IgcG9pbnRzIGFuZCBhIGJhc2ljIHN0cm9rZS9maWxsXG4gKiBjb21iaW5hdGlvbiBmb3IgbGluZXMgYW5kIHBvbHlnb25zXG4gKiBAcmV0dXJucyBTdHlsZSBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBjcmVhdGVPdmVybGF5TGF5ZXJTdHlsZSgpOiAob2xGZWF0dXJlOiBPbEZlYXR1cmU8T2xHZW9tZXRyeT4pID0+IG9sc3R5bGUuU3R5bGUge1xuICBjb25zdCBkZWZhdWx0U3R5bGUgPSBjcmVhdGVPdmVybGF5RGVmYXVsdFN0eWxlKCk7XG4gIGNvbnN0IG1hcmtlclN0eWxlID0gY3JlYXRlT3ZlcmxheU1hcmtlclN0eWxlKCk7XG5cbiAgbGV0IHN0eWxlO1xuXG4gIHJldHVybiAob2xGZWF0dXJlOiBPbEZlYXR1cmU8T2xHZW9tZXRyeT4pID0+IHtcbiAgICBpZiAob2xGZWF0dXJlLmdldElkKCkgPT09ICdidWZmZXJGZWF0dXJlJykge1xuICAgICAgc3R5bGUgPSBjcmVhdGVCdWZmZXJTdHlsZShcbiAgICAgICAgb2xGZWF0dXJlLmdldCgnYnVmZmVyU3Ryb2tlJyksXG4gICAgICAgIDIsXG4gICAgICAgIG9sRmVhdHVyZS5nZXQoJ2J1ZmZlckZpbGwnKSxcbiAgICAgICAgb2xGZWF0dXJlLmdldCgnYnVmZmVyVGV4dCcpXG4gICAgICApO1xuICAgICAgcmV0dXJuIHN0eWxlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjdXN0b21TdHlsZSA9IG9sRmVhdHVyZS5nZXQoJ19zdHlsZScpO1xuICAgICAgaWYgKGN1c3RvbVN0eWxlKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlU2VydmljZSA9IG5ldyBTdHlsZVNlcnZpY2UoKTtcbiAgICAgICAgcmV0dXJuIHN0eWxlU2VydmljZS5jcmVhdGVTdHlsZShjdXN0b21TdHlsZSk7XG4gICAgICB9XG4gICAgICBjb25zdCBnZW9tZXRyeVR5cGUgPSBvbEZlYXR1cmUuZ2V0R2VvbWV0cnkoKS5nZXRUeXBlKCk7XG4gICAgICBzdHlsZSA9IGdlb21ldHJ5VHlwZSA9PT0gJ1BvaW50JyA/IG1hcmtlclN0eWxlIDogZGVmYXVsdFN0eWxlO1xuICAgICAgc3R5bGUuZ2V0VGV4dCgpLnNldFRleHQob2xGZWF0dXJlLmdldCgnX21hcFRpdGxlJykpO1xuICAgICAgcmV0dXJuIHN0eWxlO1xuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBiYXNpYyBzdHlsZSBmb3IgbGluZXMgYW5kIHBvbHlnb25zXG4gKiBAcmV0dXJucyBTdHlsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlT3ZlcmxheURlZmF1bHRTdHlsZSh7XG4gIHRleHQsXG4gIHN0cm9rZVdpZHRoID0gMixcbiAgZmlsbENvbG9yID0gWzAsIDE2MSwgMjIyLCAwLjNdLFxuICBzdHJva2VDb2xvciA9IFswLCAxNjEsIDIyMiwgMC45XSxcbn06IHtcbiAgdGV4dD86IHN0cmluZztcbiAgc3Ryb2tlV2lkdGg/OiBudW1iZXI7XG4gIGZpbGxDb2xvcj86IHN0cmluZyB8IG51bWJlcltdO1xuICBzdHJva2VDb2xvcj86IHN0cmluZyB8IG51bWJlcltdO1xufSA9IHt9KTogb2xzdHlsZS5TdHlsZSB7XG4gIGNvbnN0IGZpbGxXaXRoT3BhY2l0eSA9IENvbG9yQXNBcnJheShmaWxsQ29sb3IpLnNsaWNlKDApO1xuICBjb25zdCBzdHJva2VXaXRoT3BhY2l0eSA9IENvbG9yQXNBcnJheShzdHJva2VDb2xvcikuc2xpY2UoMCk7XG5cbiAgY29uc3Qgc3Ryb2tlID0gbmV3IG9sc3R5bGUuU3Ryb2tlKHtcbiAgICB3aWR0aDogc3Ryb2tlV2lkdGgsXG4gICAgY29sb3I6IHN0cm9rZVdpdGhPcGFjaXR5XG4gIH0pO1xuXG4gIGNvbnN0IGZpbGwgPSBuZXcgb2xzdHlsZS5GaWxsKHtcbiAgICBjb2xvcjogZmlsbFdpdGhPcGFjaXR5XG4gIH0pO1xuXG4gIHJldHVybiBuZXcgb2xzdHlsZS5TdHlsZSh7XG4gICAgc3Ryb2tlLFxuICAgIGZpbGwsXG4gICAgaW1hZ2U6IG5ldyBvbHN0eWxlLkNpcmNsZSh7XG4gICAgICByYWRpdXM6IDUsXG4gICAgICBzdHJva2UsXG4gICAgICBmaWxsXG4gICAgfSksXG4gICAgdGV4dDogbmV3IG9sc3R5bGUuVGV4dCh7XG4gICAgICB0ZXh0LFxuICAgICAgZm9udDogJzEycHggQ2FsaWJyaSxzYW5zLXNlcmlmJyxcbiAgICAgIGZpbGw6IG5ldyBvbHN0eWxlLkZpbGwoeyBjb2xvcjogJyMwMDAnIH0pLFxuICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2UoeyBjb2xvcjogJyNmZmYnLCB3aWR0aDogMyB9KSxcbiAgICAgIG92ZXJmbG93OiB0cnVlXG4gICAgfSlcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJ1ZmZlclN0eWxlKFxuICBzdHJva2VSR0JBOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSA9IFswLCAxNjEsIDIyMiwgMV0sXG4gIHN0cm9rZVdpZHRoOiBudW1iZXIgPSAyLFxuICBmaWxsUkdCQTogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0gPSBbMCwgMTYxLCAyMjIsIDAuMTVdLFxuICBidWZmZXJSYWRpdXM/XG4pOiBvbHN0eWxlLlN0eWxlIHtcbiAgY29uc3Qgc3Ryb2tlID0gbmV3IG9sc3R5bGUuU3Ryb2tlKHtcbiAgICB3aWR0aDogc3Ryb2tlV2lkdGgsXG4gICAgY29sb3I6IHN0cm9rZVJHQkFcbiAgfSk7XG5cbiAgY29uc3QgZmlsbCA9IG5ldyBvbHN0eWxlLkZpbGwoe1xuICAgIGNvbG9yOiBmaWxsUkdCQVxuICB9KTtcblxuICByZXR1cm4gbmV3IG9sc3R5bGUuU3R5bGUoe1xuICAgIHN0cm9rZSxcbiAgICBmaWxsLFxuICAgIGltYWdlOiBuZXcgb2xzdHlsZS5DaXJjbGUoe1xuICAgICAgcmFkaXVzOiA1LFxuICAgICAgc3Ryb2tlLFxuICAgICAgZmlsbFxuICAgIH0pLFxuICAgIHRleHQ6IG5ldyBvbHN0eWxlLlRleHQoe1xuICAgICAgZm9udDogJzEycHggQ2FsaWJyaSxzYW5zLXNlcmlmJyxcbiAgICAgIHRleHQ6IGJ1ZmZlclJhZGl1cyxcbiAgICAgIGZpbGw6IG5ldyBvbHN0eWxlLkZpbGwoeyBjb2xvcjogJyMwMDAnIH0pLFxuICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2UoeyBjb2xvcjogJyNmZmYnLCB3aWR0aDogMyB9KSxcbiAgICAgIG92ZXJmbG93OiB0cnVlXG4gICAgfSlcbiAgfSk7XG59XG4iXX0=