import * as olstyle from 'ol/style';
import { asArray as ColorAsArray } from 'ol/color';
/**
 * Create a marker style for points
 * @returns Style
 */
export function createOverlayMarkerStyle({ text, opacity = 1, markerColor = [0, 161, 222], markerOutlineColor = [255, 255, 255] } = {}) {
    let iconColor;
    let svgIconColor;
    let svgOutlineColor;
    let svg;
    const isIE = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent); // To fix IE11 svg bug (temporarly)
    const newColor = ColorAsArray(markerColor).slice(0);
    const newOutlineColor = ColorAsArray(markerOutlineColor).slice(0);
    if (newColor.length === 4 && (typeof markerColor !== 'string' || /^#[0-9A-F]{8}$/i.test(markerColor))) {
        opacity = newColor[3];
    }
    svgIconColor = `"rgba(${newColor[0]},${newColor[1]},${newColor[2]},${opacity})"`;
    iconColor = markerColor;
    svgOutlineColor = `"rgb(${newOutlineColor[0]},${newOutlineColor[1]},${newOutlineColor[2]})"`;
    svg =
        'data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" height="36" width="36" viewBox="0 0 36 36">' +
            '<path fill=' +
            svgIconColor +
            ' stroke=' +
            svgOutlineColor +
            ` stroke-width="2" d="M 17.692635,32.565644 C 15.71852,30.330584 13.290925,27.058065 11.6766,24.455732 9.3398623,20.688851 7.8905694,17.205334 7.6297492,14.728733 7.5616025,14.081649 7.5739557,12.528552 7.6513363,12.014724 8.1013861,9.0262716 9.8047068,6.3655569 12.310675,4.7364878 c 1.113691,-0.7239832 2.508083,-1.2834131 3.776687,-1.5152052 0.242945,-0.044389 0.451656,-0.09393 0.463804,-0.1100911 0.01215,-0.016161 0.638282,-0.025502 1.391411,-0.02076 1.088235,0.00685 1.450932,0.024316 1.766871,0.085071 2.650763,0.5097353 4.947142,1.8701891 6.498786,3.8501033 0.628018,0.8013587 1.297046,2.0200608 1.640967,2.9891872 0.191065,0.538399 0.427644,1.447408 0.477391,1.834287 0.0164,0.127546 0.0434,0.231902 0.06,0.231902 0.0166,0 0.03122,0.626135 0.03249,1.391411 0.0013,0.765276 -0.011,1.391411 -0.02726,1.391411 -0.01626,0 -0.05449,0.154049 -0.08495,0.342331 -0.08815,0.544879 -0.387235,1.721449 -0.604837,2.379406 -1.209421,3.656888 -4.014463,8.349762 -7.849521,13.132357 -0.790496,0.985807 -1.795217,2.167992 -1.842543,2.167992 -0.01896,0 -0.161766,-0.144111 -0.317336,-0.320246 z m 1.066937,-15.36525 c 0.133519,-0.02121 0.248766,-0.05657 0.256105,-0.07859 0.0073,-0.02202 0.04918,-0.03066 0.09298,-0.0192 0.0438,0.01145 0.107628,-0.0072 0.141834,-0.04137 0.03421,-0.03421 0.08456,-0.05474 0.111888,-0.04563 0.02733,0.0091 0.07703,-0.01077 0.110429,-0.04417 0.03341,-0.03341 0.08416,-0.05293 0.112796,-0.04338 0.02863,0.0095 0.08974,-0.01867 0.135802,-0.06271 0.04606,-0.04403 0.111902,-0.08625 0.146319,-0.09381 0.204084,-0.04483 0.762371,-0.519108 1.079463,-0.917027 0.26749,-0.335672 0.570987,-0.878795 0.529019,-0.946701 -0.01496,-0.0242 -0.0067,-0.044 0.01835,-0.044 0.05645,0 0.196809,-0.467982 0.158801,-0.529481 -0.01521,-0.02461 -0.0043,-0.04475 0.02427,-0.04475 0.03157,0 0.04365,-0.04329 0.03082,-0.11043 -0.01161,-0.06074 -0.0066,-0.110429 0.01124,-0.110429 0.01779,0 0.03235,-0.258405 0.03235,-0.574233 0,-0.315829 -0.01545,-0.574234 -0.03434,-0.574234 -0.01889,0 -0.02437,-0.03811 -0.01219,-0.08469 0.04412,-0.168712 -0.336329,-1.152668 -0.481536,-1.245401 -0.02327,-0.01486 -0.04022,-0.03992 -0.03765,-0.05568 0.01222,-0.07498 -0.156557,-0.318365 -0.406379,-0.586027 -0.295921,-0.317054 -0.773059,-0.690104 -0.83427,-0.652274 -0.0206,0.01273 -0.03745,0.0024 -0.03745,-0.02289 0,-0.06107 -0.433076,-0.2789369 -0.487546,-0.245273 -0.02338,0.01445 -0.04251,0.0068 -0.04251,-0.01695 0,-0.056281 -0.393995,-0.1865457 -0.613804,-0.2029397 -0.0943,-0.00703 -0.188579,-0.023183 -0.209503,-0.035888 -0.02092,-0.012705 -0.276571,-0.023337 -0.568105,-0.023627 -0.534044,-5.301e-4 -1.12638,0.091025 -1.12638,0.1741017 0,0.023781 -0.01713,0.032648 -0.03808,0.019705 -0.05054,-0.031232 -0.403641,0.1088602 -0.403641,0.1601422 0,0.02204 -0.01988,0.02779 -0.04417,0.01278 -0.0243,-0.01501 -0.04417,-0.0051 -0.04417,0.02209 0,0.02716 -0.01988,0.0371 -0.04417,0.02209 -0.0243,-0.01501 -0.04417,-0.0051 -0.04417,0.02209 0,0.02716 -0.01915,0.03755 -0.04256,0.02308 -0.02341,-0.01447 -0.08138,0.01252 -0.128834,0.05997 -0.04745,0.04745 -0.0974,0.07515 -0.111001,0.06155 -0.0136,-0.0136 -0.03722,0.0078 -0.05248,0.0476 -0.01526,0.03978 -0.0411,0.06408 -0.0574,0.054 -0.03277,-0.02025 -0.462299,0.323995 -0.491977,0.394291 -0.01026,0.02429 -0.07454,0.0912 -0.142856,0.148686 -0.248033,0.208705 -0.730279,0.974169 -0.672565,1.067553 0.0145,0.02346 0.0059,0.04266 -0.01914,0.04266 -0.05907,0 -0.241471,0.599428 -0.208527,0.685278 0.01385,0.0361 0.0044,0.06564 -0.02098,0.06564 -0.02539,0 -0.04169,0.0646 -0.03622,0.143558 0.0055,0.07896 -0.0042,0.213129 -0.02144,0.29816 -0.04741,0.233576 0.0511,1.055502 0.167516,1.397721 0.126048,0.370516 0.310099,0.740163 0.426484,0.856548 0.04776,0.04776 0.07554,0.08684 0.06174,0.08684 -0.0138,0 0.01516,0.05653 0.06436,0.125632 0.131301,0.184396 0.499365,0.587266 0.518785,0.567846 0.0092,-0.0092 0.09821,0.06081 0.197812,0.155562 0.09961,0.09475 0.190589,0.162786 0.202187,0.151188 0.0116,-0.0116 0.05991,0.01774 0.107361,0.06519 0.04745,0.04745 0.105426,0.07444 0.128834,0.05997 0.02341,-0.01447 0.04256,-0.0057 0.04256,0.01958 0,0.06106 0.344664,0.23496 0.399061,0.201341 0.02346,-0.0145 0.04266,-0.0059 0.04266,0.01914 0,0.05907 0.599429,0.241471 0.685279,0.208527 0.0361,-0.01385 0.06564,-0.0065 0.06564,0.01645 0,0.05196 1.079115,0.04833 1.413314,-0.0048 z"></path>` +
            '</svg>';
    let src;
    if (isIE) {
        switch (markerColor) {
            case 'blue' || [0, 161, 222] || '#00a1de':
                iconColor = 'blue';
                break;
            case 'red' || '#f64139':
                iconColor = 'red';
                break;
            case 'yellow' || '#ffd700':
                iconColor = 'yellow';
                break;
            case 'green' || '#008000':
                iconColor = 'green';
                break;
            default:
                iconColor = 'blue';
                break;
        }
        src = './assets/igo2/geo/icons/place_' + iconColor + '_36px.svg';
    }
    else {
        src = svg;
    }
    return new olstyle.Style({
        image: new olstyle.Icon({
            src: svg,
            opacity,
            imgSize: [36, 36],
            anchor: [0.5, 0.92]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1tYXJrZXItc3R5bGUudXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9nZW8vc3JjL2xpYi9vdmVybGF5L3NoYXJlZC9vdmVybGF5LW1hcmtlci1zdHlsZS51dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQztBQUNwQyxPQUFPLEVBQUUsT0FBTyxJQUFJLFlBQVksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUVuRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsd0JBQXdCLENBQUMsRUFDdkMsSUFBSSxFQUNKLE9BQU8sR0FBRyxDQUFDLEVBQ1gsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFDM0Isa0JBQWtCLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxLQU1sQyxFQUFFO0lBQ0osSUFBSSxTQUFTLENBQUM7SUFDZCxJQUFJLFlBQVksQ0FBQztJQUNqQixJQUFJLGVBQWUsQ0FBQztJQUNwQixJQUFJLEdBQUcsQ0FBQztJQUVSLE1BQU0sSUFBSSxHQUFHLDBCQUEwQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsbUNBQW1DO0lBRTdHLE1BQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEQsTUFBTSxlQUFlLEdBQUcsWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWxFLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLFdBQVcsS0FBSyxRQUFRLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQXFCLENBQUMsQ0FBQyxFQUFFO1FBQy9HLE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdkI7SUFFRCxZQUFZLEdBQUcsU0FBUyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLElBQUksQ0FBQztJQUNqRixTQUFTLEdBQUcsV0FBVyxDQUFDO0lBRXhCLGVBQWUsR0FBRyxRQUFRLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFFN0YsR0FBRztRQUNELDJIQUEySDtZQUMzSCxhQUFhO1lBQ2IsWUFBWTtZQUNaLFVBQVU7WUFDVixlQUFlO1lBQ2Ysc3RJQUFzdEk7WUFDdHRJLFFBQVEsQ0FBQztJQUVYLElBQUksR0FBRyxDQUFDO0lBQ1IsSUFBSSxJQUFJLEVBQUU7UUFDUixRQUFRLFdBQVcsRUFBRTtZQUNuQixLQUFLLE1BQU0sSUFBSSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksU0FBUztnQkFDdkMsU0FBUyxHQUFHLE1BQU0sQ0FBQztnQkFDbkIsTUFBTTtZQUNSLEtBQUssS0FBSyxJQUFJLFNBQVM7Z0JBQ3JCLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ2xCLE1BQU07WUFDUixLQUFLLFFBQVEsSUFBSSxTQUFTO2dCQUN4QixTQUFTLEdBQUcsUUFBUSxDQUFDO2dCQUNyQixNQUFNO1lBQ1IsS0FBSyxPQUFPLElBQUksU0FBUztnQkFDdkIsU0FBUyxHQUFHLE9BQU8sQ0FBQztnQkFDcEIsTUFBTTtZQUNSO2dCQUNFLFNBQVMsR0FBRyxNQUFNLENBQUM7Z0JBQ25CLE1BQU07U0FDVDtRQUNELEdBQUcsR0FBRyxnQ0FBZ0MsR0FBRyxTQUFTLEdBQUcsV0FBVyxDQUFDO0tBQ2xFO1NBQU07UUFDTCxHQUFHLEdBQUcsR0FBRyxDQUFDO0tBQ1g7SUFFRCxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQztRQUN2QixLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ3RCLEdBQUcsRUFBRSxHQUFHO1lBQ1IsT0FBTztZQUNQLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDakIsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQztTQUNwQixDQUFDO1FBQ0YsSUFBSSxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQztZQUNyQixJQUFJO1lBQ0osSUFBSSxFQUFFLHlCQUF5QjtZQUMvQixJQUFJLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDO1lBQ3pDLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUN2RCxRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUM7S0FDSCxDQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgb2xzdHlsZSBmcm9tICdvbC9zdHlsZSc7XG5pbXBvcnQgeyBhc0FycmF5IGFzIENvbG9yQXNBcnJheSB9IGZyb20gJ29sL2NvbG9yJztcblxuLyoqXG4gKiBDcmVhdGUgYSBtYXJrZXIgc3R5bGUgZm9yIHBvaW50c1xuICogQHJldHVybnMgU3R5bGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU92ZXJsYXlNYXJrZXJTdHlsZSh7XG4gIHRleHQsXG4gIG9wYWNpdHkgPSAxLFxuICBtYXJrZXJDb2xvciA9IFswLCAxNjEsIDIyMl0sXG4gIG1hcmtlck91dGxpbmVDb2xvciA9IFsyNTUsIDI1NSwgMjU1XVxufToge1xuICB0ZXh0Pzogc3RyaW5nO1xuICBvcGFjaXR5PzogbnVtYmVyO1xuICBtYXJrZXJDb2xvcj86IHN0cmluZyB8IG51bWJlcltdO1xuICBtYXJrZXJPdXRsaW5lQ29sb3I/OiBzdHJpbmcgfCBudW1iZXJbXTtcbn0gPSB7fSk6IG9sc3R5bGUuU3R5bGUge1xuICBsZXQgaWNvbkNvbG9yO1xuICBsZXQgc3ZnSWNvbkNvbG9yO1xuICBsZXQgc3ZnT3V0bGluZUNvbG9yO1xuICBsZXQgc3ZnO1xuXG4gIGNvbnN0IGlzSUUgPSAvbXNpZVxcc3x0cmlkZW50XFwvfGVkZ2VcXC8vaS50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KTsgLy8gVG8gZml4IElFMTEgc3ZnIGJ1ZyAodGVtcG9yYXJseSlcblxuICBjb25zdCBuZXdDb2xvciA9IENvbG9yQXNBcnJheShtYXJrZXJDb2xvcikuc2xpY2UoMCk7XG4gIGNvbnN0IG5ld091dGxpbmVDb2xvciA9IENvbG9yQXNBcnJheShtYXJrZXJPdXRsaW5lQ29sb3IpLnNsaWNlKDApO1xuXG4gIGlmIChuZXdDb2xvci5sZW5ndGggPT09IDQgJiYgKHR5cGVvZiBtYXJrZXJDb2xvciAhPT0gJ3N0cmluZycgfHwgL14jWzAtOUEtRl17OH0kL2kudGVzdChtYXJrZXJDb2xvciBhcyBzdHJpbmcpKSkge1xuICAgIG9wYWNpdHkgPSBuZXdDb2xvclszXTtcbiAgfVxuXG4gIHN2Z0ljb25Db2xvciA9IGBcInJnYmEoJHtuZXdDb2xvclswXX0sJHtuZXdDb2xvclsxXX0sJHtuZXdDb2xvclsyXX0sJHtvcGFjaXR5fSlcImA7XG4gIGljb25Db2xvciA9IG1hcmtlckNvbG9yO1xuXG4gIHN2Z091dGxpbmVDb2xvciA9IGBcInJnYigke25ld091dGxpbmVDb2xvclswXX0sJHtuZXdPdXRsaW5lQ29sb3JbMV19LCR7bmV3T3V0bGluZUNvbG9yWzJdfSlcImA7XG5cbiAgc3ZnID1cbiAgICAnZGF0YTppbWFnZS9zdmcreG1sO3V0ZjgsPHN2ZyB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGhlaWdodD1cIjM2XCIgd2lkdGg9XCIzNlwiIHZpZXdCb3g9XCIwIDAgMzYgMzZcIj4nICtcbiAgICAnPHBhdGggZmlsbD0nICtcbiAgICBzdmdJY29uQ29sb3IgK1xuICAgICcgc3Ryb2tlPScgK1xuICAgIHN2Z091dGxpbmVDb2xvciArXG4gICAgYCBzdHJva2Utd2lkdGg9XCIyXCIgZD1cIk0gMTcuNjkyNjM1LDMyLjU2NTY0NCBDIDE1LjcxODUyLDMwLjMzMDU4NCAxMy4yOTA5MjUsMjcuMDU4MDY1IDExLjY3NjYsMjQuNDU1NzMyIDkuMzM5ODYyMywyMC42ODg4NTEgNy44OTA1Njk0LDE3LjIwNTMzNCA3LjYyOTc0OTIsMTQuNzI4NzMzIDcuNTYxNjAyNSwxNC4wODE2NDkgNy41NzM5NTU3LDEyLjUyODU1MiA3LjY1MTMzNjMsMTIuMDE0NzI0IDguMTAxMzg2MSw5LjAyNjI3MTYgOS44MDQ3MDY4LDYuMzY1NTU2OSAxMi4zMTA2NzUsNC43MzY0ODc4IGMgMS4xMTM2OTEsLTAuNzIzOTgzMiAyLjUwODA4MywtMS4yODM0MTMxIDMuNzc2Njg3LC0xLjUxNTIwNTIgMC4yNDI5NDUsLTAuMDQ0Mzg5IDAuNDUxNjU2LC0wLjA5MzkzIDAuNDYzODA0LC0wLjExMDA5MTEgMC4wMTIxNSwtMC4wMTYxNjEgMC42MzgyODIsLTAuMDI1NTAyIDEuMzkxNDExLC0wLjAyMDc2IDEuMDg4MjM1LDAuMDA2ODUgMS40NTA5MzIsMC4wMjQzMTYgMS43NjY4NzEsMC4wODUwNzEgMi42NTA3NjMsMC41MDk3MzUzIDQuOTQ3MTQyLDEuODcwMTg5MSA2LjQ5ODc4NiwzLjg1MDEwMzMgMC42MjgwMTgsMC44MDEzNTg3IDEuMjk3MDQ2LDIuMDIwMDYwOCAxLjY0MDk2NywyLjk4OTE4NzIgMC4xOTEwNjUsMC41MzgzOTkgMC40Mjc2NDQsMS40NDc0MDggMC40NzczOTEsMS44MzQyODcgMC4wMTY0LDAuMTI3NTQ2IDAuMDQzNCwwLjIzMTkwMiAwLjA2LDAuMjMxOTAyIDAuMDE2NiwwIDAuMDMxMjIsMC42MjYxMzUgMC4wMzI0OSwxLjM5MTQxMSAwLjAwMTMsMC43NjUyNzYgLTAuMDExLDEuMzkxNDExIC0wLjAyNzI2LDEuMzkxNDExIC0wLjAxNjI2LDAgLTAuMDU0NDksMC4xNTQwNDkgLTAuMDg0OTUsMC4zNDIzMzEgLTAuMDg4MTUsMC41NDQ4NzkgLTAuMzg3MjM1LDEuNzIxNDQ5IC0wLjYwNDgzNywyLjM3OTQwNiAtMS4yMDk0MjEsMy42NTY4ODggLTQuMDE0NDYzLDguMzQ5NzYyIC03Ljg0OTUyMSwxMy4xMzIzNTcgLTAuNzkwNDk2LDAuOTg1ODA3IC0xLjc5NTIxNywyLjE2Nzk5MiAtMS44NDI1NDMsMi4xNjc5OTIgLTAuMDE4OTYsMCAtMC4xNjE3NjYsLTAuMTQ0MTExIC0wLjMxNzMzNiwtMC4zMjAyNDYgeiBtIDEuMDY2OTM3LC0xNS4zNjUyNSBjIDAuMTMzNTE5LC0wLjAyMTIxIDAuMjQ4NzY2LC0wLjA1NjU3IDAuMjU2MTA1LC0wLjA3ODU5IDAuMDA3MywtMC4wMjIwMiAwLjA0OTE4LC0wLjAzMDY2IDAuMDkyOTgsLTAuMDE5MiAwLjA0MzgsMC4wMTE0NSAwLjEwNzYyOCwtMC4wMDcyIDAuMTQxODM0LC0wLjA0MTM3IDAuMDM0MjEsLTAuMDM0MjEgMC4wODQ1NiwtMC4wNTQ3NCAwLjExMTg4OCwtMC4wNDU2MyAwLjAyNzMzLDAuMDA5MSAwLjA3NzAzLC0wLjAxMDc3IDAuMTEwNDI5LC0wLjA0NDE3IDAuMDMzNDEsLTAuMDMzNDEgMC4wODQxNiwtMC4wNTI5MyAwLjExMjc5NiwtMC4wNDMzOCAwLjAyODYzLDAuMDA5NSAwLjA4OTc0LC0wLjAxODY3IDAuMTM1ODAyLC0wLjA2MjcxIDAuMDQ2MDYsLTAuMDQ0MDMgMC4xMTE5MDIsLTAuMDg2MjUgMC4xNDYzMTksLTAuMDkzODEgMC4yMDQwODQsLTAuMDQ0ODMgMC43NjIzNzEsLTAuNTE5MTA4IDEuMDc5NDYzLC0wLjkxNzAyNyAwLjI2NzQ5LC0wLjMzNTY3MiAwLjU3MDk4NywtMC44Nzg3OTUgMC41MjkwMTksLTAuOTQ2NzAxIC0wLjAxNDk2LC0wLjAyNDIgLTAuMDA2NywtMC4wNDQgMC4wMTgzNSwtMC4wNDQgMC4wNTY0NSwwIDAuMTk2ODA5LC0wLjQ2Nzk4MiAwLjE1ODgwMSwtMC41Mjk0ODEgLTAuMDE1MjEsLTAuMDI0NjEgLTAuMDA0MywtMC4wNDQ3NSAwLjAyNDI3LC0wLjA0NDc1IDAuMDMxNTcsMCAwLjA0MzY1LC0wLjA0MzI5IDAuMDMwODIsLTAuMTEwNDMgLTAuMDExNjEsLTAuMDYwNzQgLTAuMDA2NiwtMC4xMTA0MjkgMC4wMTEyNCwtMC4xMTA0MjkgMC4wMTc3OSwwIDAuMDMyMzUsLTAuMjU4NDA1IDAuMDMyMzUsLTAuNTc0MjMzIDAsLTAuMzE1ODI5IC0wLjAxNTQ1LC0wLjU3NDIzNCAtMC4wMzQzNCwtMC41NzQyMzQgLTAuMDE4ODksMCAtMC4wMjQzNywtMC4wMzgxMSAtMC4wMTIxOSwtMC4wODQ2OSAwLjA0NDEyLC0wLjE2ODcxMiAtMC4zMzYzMjksLTEuMTUyNjY4IC0wLjQ4MTUzNiwtMS4yNDU0MDEgLTAuMDIzMjcsLTAuMDE0ODYgLTAuMDQwMjIsLTAuMDM5OTIgLTAuMDM3NjUsLTAuMDU1NjggMC4wMTIyMiwtMC4wNzQ5OCAtMC4xNTY1NTcsLTAuMzE4MzY1IC0wLjQwNjM3OSwtMC41ODYwMjcgLTAuMjk1OTIxLC0wLjMxNzA1NCAtMC43NzMwNTksLTAuNjkwMTA0IC0wLjgzNDI3LC0wLjY1MjI3NCAtMC4wMjA2LDAuMDEyNzMgLTAuMDM3NDUsMC4wMDI0IC0wLjAzNzQ1LC0wLjAyMjg5IDAsLTAuMDYxMDcgLTAuNDMzMDc2LC0wLjI3ODkzNjkgLTAuNDg3NTQ2LC0wLjI0NTI3MyAtMC4wMjMzOCwwLjAxNDQ1IC0wLjA0MjUxLDAuMDA2OCAtMC4wNDI1MSwtMC4wMTY5NSAwLC0wLjA1NjI4MSAtMC4zOTM5OTUsLTAuMTg2NTQ1NyAtMC42MTM4MDQsLTAuMjAyOTM5NyAtMC4wOTQzLC0wLjAwNzAzIC0wLjE4ODU3OSwtMC4wMjMxODMgLTAuMjA5NTAzLC0wLjAzNTg4OCAtMC4wMjA5MiwtMC4wMTI3MDUgLTAuMjc2NTcxLC0wLjAyMzMzNyAtMC41NjgxMDUsLTAuMDIzNjI3IC0wLjUzNDA0NCwtNS4zMDFlLTQgLTEuMTI2MzgsMC4wOTEwMjUgLTEuMTI2MzgsMC4xNzQxMDE3IDAsMC4wMjM3ODEgLTAuMDE3MTMsMC4wMzI2NDggLTAuMDM4MDgsMC4wMTk3MDUgLTAuMDUwNTQsLTAuMDMxMjMyIC0wLjQwMzY0MSwwLjEwODg2MDIgLTAuNDAzNjQxLDAuMTYwMTQyMiAwLDAuMDIyMDQgLTAuMDE5ODgsMC4wMjc3OSAtMC4wNDQxNywwLjAxMjc4IC0wLjAyNDMsLTAuMDE1MDEgLTAuMDQ0MTcsLTAuMDA1MSAtMC4wNDQxNywwLjAyMjA5IDAsMC4wMjcxNiAtMC4wMTk4OCwwLjAzNzEgLTAuMDQ0MTcsMC4wMjIwOSAtMC4wMjQzLC0wLjAxNTAxIC0wLjA0NDE3LC0wLjAwNTEgLTAuMDQ0MTcsMC4wMjIwOSAwLDAuMDI3MTYgLTAuMDE5MTUsMC4wMzc1NSAtMC4wNDI1NiwwLjAyMzA4IC0wLjAyMzQxLC0wLjAxNDQ3IC0wLjA4MTM4LDAuMDEyNTIgLTAuMTI4ODM0LDAuMDU5OTcgLTAuMDQ3NDUsMC4wNDc0NSAtMC4wOTc0LDAuMDc1MTUgLTAuMTExMDAxLDAuMDYxNTUgLTAuMDEzNiwtMC4wMTM2IC0wLjAzNzIyLDAuMDA3OCAtMC4wNTI0OCwwLjA0NzYgLTAuMDE1MjYsMC4wMzk3OCAtMC4wNDExLDAuMDY0MDggLTAuMDU3NCwwLjA1NCAtMC4wMzI3NywtMC4wMjAyNSAtMC40NjIyOTksMC4zMjM5OTUgLTAuNDkxOTc3LDAuMzk0MjkxIC0wLjAxMDI2LDAuMDI0MjkgLTAuMDc0NTQsMC4wOTEyIC0wLjE0Mjg1NiwwLjE0ODY4NiAtMC4yNDgwMzMsMC4yMDg3MDUgLTAuNzMwMjc5LDAuOTc0MTY5IC0wLjY3MjU2NSwxLjA2NzU1MyAwLjAxNDUsMC4wMjM0NiAwLjAwNTksMC4wNDI2NiAtMC4wMTkxNCwwLjA0MjY2IC0wLjA1OTA3LDAgLTAuMjQxNDcxLDAuNTk5NDI4IC0wLjIwODUyNywwLjY4NTI3OCAwLjAxMzg1LDAuMDM2MSAwLjAwNDQsMC4wNjU2NCAtMC4wMjA5OCwwLjA2NTY0IC0wLjAyNTM5LDAgLTAuMDQxNjksMC4wNjQ2IC0wLjAzNjIyLDAuMTQzNTU4IDAuMDA1NSwwLjA3ODk2IC0wLjAwNDIsMC4yMTMxMjkgLTAuMDIxNDQsMC4yOTgxNiAtMC4wNDc0MSwwLjIzMzU3NiAwLjA1MTEsMS4wNTU1MDIgMC4xNjc1MTYsMS4zOTc3MjEgMC4xMjYwNDgsMC4zNzA1MTYgMC4zMTAwOTksMC43NDAxNjMgMC40MjY0ODQsMC44NTY1NDggMC4wNDc3NiwwLjA0Nzc2IDAuMDc1NTQsMC4wODY4NCAwLjA2MTc0LDAuMDg2ODQgLTAuMDEzOCwwIDAuMDE1MTYsMC4wNTY1MyAwLjA2NDM2LDAuMTI1NjMyIDAuMTMxMzAxLDAuMTg0Mzk2IDAuNDk5MzY1LDAuNTg3MjY2IDAuNTE4Nzg1LDAuNTY3ODQ2IDAuMDA5MiwtMC4wMDkyIDAuMDk4MjEsMC4wNjA4MSAwLjE5NzgxMiwwLjE1NTU2MiAwLjA5OTYxLDAuMDk0NzUgMC4xOTA1ODksMC4xNjI3ODYgMC4yMDIxODcsMC4xNTExODggMC4wMTE2LC0wLjAxMTYgMC4wNTk5MSwwLjAxNzc0IDAuMTA3MzYxLDAuMDY1MTkgMC4wNDc0NSwwLjA0NzQ1IDAuMTA1NDI2LDAuMDc0NDQgMC4xMjg4MzQsMC4wNTk5NyAwLjAyMzQxLC0wLjAxNDQ3IDAuMDQyNTYsLTAuMDA1NyAwLjA0MjU2LDAuMDE5NTggMCwwLjA2MTA2IDAuMzQ0NjY0LDAuMjM0OTYgMC4zOTkwNjEsMC4yMDEzNDEgMC4wMjM0NiwtMC4wMTQ1IDAuMDQyNjYsLTAuMDA1OSAwLjA0MjY2LDAuMDE5MTQgMCwwLjA1OTA3IDAuNTk5NDI5LDAuMjQxNDcxIDAuNjg1Mjc5LDAuMjA4NTI3IDAuMDM2MSwtMC4wMTM4NSAwLjA2NTY0LC0wLjAwNjUgMC4wNjU2NCwwLjAxNjQ1IDAsMC4wNTE5NiAxLjA3OTExNSwwLjA0ODMzIDEuNDEzMzE0LC0wLjAwNDggelwiPjwvcGF0aD5gICtcbiAgICAnPC9zdmc+JztcblxuICBsZXQgc3JjO1xuICBpZiAoaXNJRSkge1xuICAgIHN3aXRjaCAobWFya2VyQ29sb3IpIHtcbiAgICAgIGNhc2UgJ2JsdWUnIHx8IFswLCAxNjEsIDIyMl0gfHwgJyMwMGExZGUnOlxuICAgICAgICBpY29uQ29sb3IgPSAnYmx1ZSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmVkJyB8fCAnI2Y2NDEzOSc6XG4gICAgICAgIGljb25Db2xvciA9ICdyZWQnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3llbGxvdycgfHwgJyNmZmQ3MDAnOlxuICAgICAgICBpY29uQ29sb3IgPSAneWVsbG93JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdncmVlbicgfHwgJyMwMDgwMDAnOlxuICAgICAgICBpY29uQ29sb3IgPSAnZ3JlZW4nO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGljb25Db2xvciA9ICdibHVlJztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHNyYyA9ICcuL2Fzc2V0cy9pZ28yL2dlby9pY29ucy9wbGFjZV8nICsgaWNvbkNvbG9yICsgJ18zNnB4LnN2Zyc7XG4gIH0gZWxzZSB7XG4gICAgc3JjID0gc3ZnO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBvbHN0eWxlLlN0eWxlKHtcbiAgICBpbWFnZTogbmV3IG9sc3R5bGUuSWNvbih7XG4gICAgICBzcmM6IHN2ZyxcbiAgICAgIG9wYWNpdHksXG4gICAgICBpbWdTaXplOiBbMzYsIDM2XSwgLy8gZm9yIGllXG4gICAgICBhbmNob3I6IFswLjUsIDAuOTJdXG4gICAgfSksXG4gICAgdGV4dDogbmV3IG9sc3R5bGUuVGV4dCh7XG4gICAgICB0ZXh0LFxuICAgICAgZm9udDogJzEycHggQ2FsaWJyaSxzYW5zLXNlcmlmJyxcbiAgICAgIGZpbGw6IG5ldyBvbHN0eWxlLkZpbGwoeyBjb2xvcjogJyMwMDAnIH0pLFxuICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2UoeyBjb2xvcjogJyNmZmYnLCB3aWR0aDogMyB9KSxcbiAgICAgIG92ZXJmbG93OiB0cnVlXG4gICAgfSlcbiAgfSk7XG59XG4iXX0=