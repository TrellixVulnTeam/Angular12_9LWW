import { trigger, state, style, transition, animate } from '@angular/animations';
export function toolSlideInOut(speed = '300ms', type = 'ease-in-out') {
    return trigger('toolSlideInOut', [
        state('enter', style({
            transform: 'translate3d(0, 0, 0)'
        })),
        transition('void => enter', animate(speed + ' ' + type))
    ]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJveC5hbmltYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vc3JjL2xpYi90b29sL3Rvb2xib3gvdG9vbGJveC5hbmltYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLE9BQU8sRUFDUCxLQUFLLEVBQ0wsS0FBSyxFQUNMLFVBQVUsRUFDVixPQUFPLEVBRVIsTUFBTSxxQkFBcUIsQ0FBQztBQUU3QixNQUFNLFVBQVUsY0FBYyxDQUM1QixLQUFLLEdBQUcsT0FBTyxFQUNmLElBQUksR0FBRyxhQUFhO0lBRXBCLE9BQU8sT0FBTyxDQUFDLGdCQUFnQixFQUFFO1FBQy9CLEtBQUssQ0FDSCxPQUFPLEVBQ1AsS0FBSyxDQUFDO1lBQ0osU0FBUyxFQUFFLHNCQUFzQjtTQUNsQyxDQUFDLENBQ0g7UUFDRCxVQUFVLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDO0tBQ3pELENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICB0cmlnZ2VyLFxuICBzdGF0ZSxcbiAgc3R5bGUsXG4gIHRyYW5zaXRpb24sXG4gIGFuaW1hdGUsXG4gIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YVxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRvb2xTbGlkZUluT3V0KFxuICBzcGVlZCA9ICczMDBtcycsXG4gIHR5cGUgPSAnZWFzZS1pbi1vdXQnXG4pOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEge1xuICByZXR1cm4gdHJpZ2dlcigndG9vbFNsaWRlSW5PdXQnLCBbXG4gICAgc3RhdGUoXG4gICAgICAnZW50ZXInLFxuICAgICAgc3R5bGUoe1xuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgwLCAwLCAwKSdcbiAgICAgIH0pXG4gICAgKSxcbiAgICB0cmFuc2l0aW9uKCd2b2lkID0+IGVudGVyJywgYW5pbWF0ZShzcGVlZCArICcgJyArIHR5cGUpKVxuICBdKTtcbn1cbiJdfQ==