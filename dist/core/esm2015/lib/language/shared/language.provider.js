import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { ConfigService } from '../../config/config.service';
import { LanguageLoader } from './language.loader';
export function defaultLanguageLoader(http, config) {
    return new LanguageLoader(http, undefined, undefined, config);
}
export function provideLanguageLoader(loader) {
    return {
        provide: TranslateLoader,
        useFactory: loader || defaultLanguageLoader,
        deps: [HttpClient]
    };
}
export function provideDefaultLanguageLoader(loader) {
    return {
        provide: TranslateLoader,
        useFactory: loader || defaultLanguageLoader,
        deps: [HttpClient, ConfigService]
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3VhZ2UucHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9saWIvbGFuZ3VhZ2Uvc2hhcmVkL2xhbmd1YWdlLnByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVuRCxNQUFNLFVBQVUscUJBQXFCLENBQ25DLElBQWdCLEVBQ2hCLE1BQXNCO0lBRXRCLE9BQU8sSUFBSSxjQUFjLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDaEUsQ0FBQztBQUVELE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxNQUFPO0lBQzNDLE9BQU87UUFDTCxPQUFPLEVBQUUsZUFBZTtRQUN4QixVQUFVLEVBQUUsTUFBTSxJQUFJLHFCQUFxQjtRQUMzQyxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUM7S0FDbkIsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLFVBQVUsNEJBQTRCLENBQUMsTUFBTztJQUNsRCxPQUFPO1FBQ0wsT0FBTyxFQUFFLGVBQWU7UUFDeEIsVUFBVSxFQUFFLE1BQU0sSUFBSSxxQkFBcUI7UUFDM0MsSUFBSSxFQUFFLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQztLQUNsQyxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVMb2FkZXIgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uL2NvbmZpZy9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBMYW5ndWFnZUxvYWRlciB9IGZyb20gJy4vbGFuZ3VhZ2UubG9hZGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRMYW5ndWFnZUxvYWRlcihcbiAgaHR0cDogSHR0cENsaWVudCxcbiAgY29uZmlnPzogQ29uZmlnU2VydmljZVxuKSB7XG4gIHJldHVybiBuZXcgTGFuZ3VhZ2VMb2FkZXIoaHR0cCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGNvbmZpZyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlTGFuZ3VhZ2VMb2FkZXIobG9hZGVyPykge1xuICByZXR1cm4ge1xuICAgIHByb3ZpZGU6IFRyYW5zbGF0ZUxvYWRlcixcbiAgICB1c2VGYWN0b3J5OiBsb2FkZXIgfHwgZGVmYXVsdExhbmd1YWdlTG9hZGVyLFxuICAgIGRlcHM6IFtIdHRwQ2xpZW50XVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZURlZmF1bHRMYW5ndWFnZUxvYWRlcihsb2FkZXI/KSB7XG4gIHJldHVybiB7XG4gICAgcHJvdmlkZTogVHJhbnNsYXRlTG9hZGVyLFxuICAgIHVzZUZhY3Rvcnk6IGxvYWRlciB8fCBkZWZhdWx0TGFuZ3VhZ2VMb2FkZXIsXG4gICAgZGVwczogW0h0dHBDbGllbnQsIENvbmZpZ1NlcnZpY2VdXG4gIH07XG59XG4iXX0=