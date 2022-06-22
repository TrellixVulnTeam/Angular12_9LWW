import { ToolService } from './tool.service';
export function ToolComponent(tool) {
    return (compType) => {
        ToolService.register(Object.assign({}, tool, {
            component: compType
        }));
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbC1jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vc3JjL2xpYi90b29sL3NoYXJlZC90b29sLWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsTUFBTSxVQUFVLGFBQWEsQ0FBQyxJQUFtQjtJQUMvQyxPQUFPLENBQUMsUUFBYSxFQUFFLEVBQUU7UUFDdkIsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUU7WUFDM0MsU0FBUyxFQUFFLFFBQVE7U0FDWixDQUFDLENBQUMsQ0FBQztJQUNkLENBQUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUb29sIH0gZnJvbSAnLi90b29sLmludGVyZmFjZSc7XG5pbXBvcnQgeyBUb29sU2VydmljZSB9IGZyb20gJy4vdG9vbC5zZXJ2aWNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIFRvb2xDb21wb25lbnQodG9vbDogUGFydGlhbDxUb29sPik6IChjbHM6IGFueSkgPT4gYW55IHtcbiAgcmV0dXJuIChjb21wVHlwZTogYW55KSA9PiB7XG4gICAgVG9vbFNlcnZpY2UucmVnaXN0ZXIoT2JqZWN0LmFzc2lnbih7fSwgdG9vbCwge1xuICAgICAgY29tcG9uZW50OiBjb21wVHlwZVxuICAgIH0gYXMgVG9vbCkpO1xuICB9O1xufVxuIl19