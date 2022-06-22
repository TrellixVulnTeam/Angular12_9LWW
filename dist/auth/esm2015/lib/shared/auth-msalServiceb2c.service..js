/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Inject, Injectable } from '@angular/core';
import { WrapperSKU } from '@azure/msal-browser';
import { MSAL_INSTANCE } from '@azure/msal-angular';
import { from } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class MsalServiceb2c {
    constructor(instance, location) {
        this.instance = instance;
        this.location = location;
        this.name = '@azure/msal-angular';
        this.version = '2.0.0-beta.2';
        const hash = this.location.path(true).split('#').pop();
        if (hash) {
            this.redirectHash = `#${hash}`;
        }
        this.instance.initializeWrapperLibrary(WrapperSKU.Angular, this.version);
    }
    acquireTokenPopup(request) {
        return from(this.instance.acquireTokenPopup(request));
    }
    acquireTokenRedirect(request) {
        return from(this.instance.acquireTokenRedirect(request));
    }
    acquireTokenSilent(silentRequest) {
        return from(this.instance.acquireTokenSilent(silentRequest));
    }
    handleRedirectObservable(hash) {
        return from(this.instance.handleRedirectPromise(hash || this.redirectHash));
    }
    loginPopup(request) {
        return from(this.instance.loginPopup(request));
    }
    loginRedirect(request) {
        return from(this.instance.loginRedirect(request));
    }
    logout(logoutRequest) {
        return from(this.instance.logout(logoutRequest));
    }
    logoutRedirect(logoutRequest) {
        return from(this.instance.logoutRedirect(logoutRequest));
    }
    logoutPopup(logoutRequest) {
        return from(this.instance.logoutPopup(logoutRequest));
    }
    ssoSilent(request) {
        return from(this.instance.ssoSilent(request));
    }
    /**
     * Gets logger for msal-angular.
     * If no logger set, returns logger instance created with same options as msal-browser
     */
    getLogger() {
        if (!this.logger) {
            this.logger = this.instance.getLogger().clone(this.name, this.version);
        }
        return this.logger;
    }
    // Create a logger instance for msal-angular with the same options as msal-browser
    setLogger(logger) {
        this.logger = logger.clone(this.name, this.version);
        this.instance.setLogger(logger);
    }
}
MsalServiceb2c.ɵfac = function MsalServiceb2c_Factory(t) { return new (t || MsalServiceb2c)(i0.ɵɵinject(MSAL_INSTANCE), i0.ɵɵinject(i1.Location)); };
MsalServiceb2c.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: MsalServiceb2c, factory: MsalServiceb2c.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MsalServiceb2c, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MSAL_INSTANCE]
            }] }, { type: i1.Location }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1tc2FsU2VydmljZWIyYy5zZXJ2aWNlLi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2F1dGgvc3JjL2xpYi9zaGFyZWQvYXV0aC1tc2FsU2VydmljZWIyYy5zZXJ2aWNlLi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBVUgsVUFBVSxFQUNiLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBYyxJQUFJLEVBQUUsTUFBTSxNQUFNLENBQUM7OztBQUl4QyxNQUFNLE9BQU8sY0FBYztJQUt2QixZQUNrQyxRQUFrQyxFQUN4RCxRQUFrQjtRQURJLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBQ3hELGFBQVEsR0FBUixRQUFRLENBQVU7UUFKdEIsU0FBSSxHQUFHLHFCQUFxQixDQUFDO1FBQzdCLFlBQU8sR0FBRyxjQUFjLENBQUM7UUFLN0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3ZELElBQUksSUFBSSxFQUFFO1lBQ04sSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1NBQ2xDO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRUQsaUJBQWlCLENBQUMsT0FBcUI7UUFDbkMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFDRCxvQkFBb0IsQ0FBQyxPQUF3QjtRQUN6QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUNELGtCQUFrQixDQUFDLGFBQTRCO1FBQzNDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBQ0Qsd0JBQXdCLENBQUMsSUFBYTtRQUNsQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBQ0QsVUFBVSxDQUFDLE9BQXNCO1FBQzdCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUNELGFBQWEsQ0FBQyxPQUF5QjtRQUNuQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFDRCxNQUFNLENBQUMsYUFBaUM7UUFDcEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBQ0QsY0FBYyxDQUFDLGFBQWlDO1FBQzVDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUNELFdBQVcsQ0FBQyxhQUFzQztRQUM5QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFDRCxTQUFTLENBQUMsT0FBeUI7UUFDL0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBQ0Q7OztPQUdHO0lBQ0gsU0FBUztRQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMxRTtRQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBQ0Qsa0ZBQWtGO0lBQ2xGLFNBQVMsQ0FBQyxNQUFjO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs0RUE1RFEsY0FBYyxjQU1YLGFBQWE7b0VBTmhCLGNBQWMsV0FBZCxjQUFjO3VGQUFkLGNBQWM7Y0FEMUIsVUFBVTs7c0JBT0YsTUFBTTt1QkFBQyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgICBJUHVibGljQ2xpZW50QXBwbGljYXRpb24sXG4gICAgRW5kU2Vzc2lvblJlcXVlc3QsXG4gICAgRW5kU2Vzc2lvblBvcHVwUmVxdWVzdCxcbiAgICBBdXRoZW50aWNhdGlvblJlc3VsdCxcbiAgICBSZWRpcmVjdFJlcXVlc3QsXG4gICAgU2lsZW50UmVxdWVzdCxcbiAgICBQb3B1cFJlcXVlc3QsXG4gICAgU3NvU2lsZW50UmVxdWVzdCxcbiAgICBMb2dnZXIsXG4gICAgV3JhcHBlclNLVVxufSBmcm9tICdAYXp1cmUvbXNhbC1icm93c2VyJztcbmltcG9ydCB7IE1TQUxfSU5TVEFOQ0UgfSBmcm9tICdAYXp1cmUvbXNhbC1hbmd1bGFyJztcbmltcG9ydCB7IE9ic2VydmFibGUsIGZyb20gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IElNc2FsU2VydmljZSB9IGZyb20gJ0BhenVyZS9tc2FsLWFuZ3VsYXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTXNhbFNlcnZpY2ViMmMgaW1wbGVtZW50cyBJTXNhbFNlcnZpY2Uge1xuICAgIHByaXZhdGUgcmVkaXJlY3RIYXNoOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBsb2dnZXI6IExvZ2dlcjtcbiAgICBwcml2YXRlIG5hbWUgPSAnQGF6dXJlL21zYWwtYW5ndWxhcic7XG4gICAgcHJpdmF0ZSB2ZXJzaW9uID0gJzIuMC4wLWJldGEuMic7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoTVNBTF9JTlNUQU5DRSkgcHVibGljIGluc3RhbmNlOiBJUHVibGljQ2xpZW50QXBwbGljYXRpb24sXG4gICAgICAgIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uXG4gICAgKSB7XG4gICAgICAgIGNvbnN0IGhhc2ggPSB0aGlzLmxvY2F0aW9uLnBhdGgodHJ1ZSkuc3BsaXQoJyMnKS5wb3AoKTtcbiAgICAgICAgaWYgKGhhc2gpIHtcbiAgICAgICAgICAgIHRoaXMucmVkaXJlY3RIYXNoID0gYCMke2hhc2h9YDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluc3RhbmNlLmluaXRpYWxpemVXcmFwcGVyTGlicmFyeShXcmFwcGVyU0tVLkFuZ3VsYXIsIHRoaXMudmVyc2lvbik7XG4gICAgfVxuXG4gICAgYWNxdWlyZVRva2VuUG9wdXAocmVxdWVzdDogUG9wdXBSZXF1ZXN0KTogT2JzZXJ2YWJsZTxBdXRoZW50aWNhdGlvblJlc3VsdD4ge1xuICAgICAgICByZXR1cm4gZnJvbSh0aGlzLmluc3RhbmNlLmFjcXVpcmVUb2tlblBvcHVwKHJlcXVlc3QpKTtcbiAgICB9XG4gICAgYWNxdWlyZVRva2VuUmVkaXJlY3QocmVxdWVzdDogUmVkaXJlY3RSZXF1ZXN0KTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiBmcm9tKHRoaXMuaW5zdGFuY2UuYWNxdWlyZVRva2VuUmVkaXJlY3QocmVxdWVzdCkpO1xuICAgIH1cbiAgICBhY3F1aXJlVG9rZW5TaWxlbnQoc2lsZW50UmVxdWVzdDogU2lsZW50UmVxdWVzdCk6IE9ic2VydmFibGU8QXV0aGVudGljYXRpb25SZXN1bHQ+IHtcbiAgICAgICAgcmV0dXJuIGZyb20odGhpcy5pbnN0YW5jZS5hY3F1aXJlVG9rZW5TaWxlbnQoc2lsZW50UmVxdWVzdCkpO1xuICAgIH1cbiAgICBoYW5kbGVSZWRpcmVjdE9ic2VydmFibGUoaGFzaD86IHN0cmluZyk6IE9ic2VydmFibGU8QXV0aGVudGljYXRpb25SZXN1bHQ+IHtcbiAgICAgICAgcmV0dXJuIGZyb20odGhpcy5pbnN0YW5jZS5oYW5kbGVSZWRpcmVjdFByb21pc2UoaGFzaCB8fCB0aGlzLnJlZGlyZWN0SGFzaCkpO1xuICAgIH1cbiAgICBsb2dpblBvcHVwKHJlcXVlc3Q/OiBQb3B1cFJlcXVlc3QpOiBPYnNlcnZhYmxlPEF1dGhlbnRpY2F0aW9uUmVzdWx0PiB7XG4gICAgICAgIHJldHVybiBmcm9tKHRoaXMuaW5zdGFuY2UubG9naW5Qb3B1cChyZXF1ZXN0KSk7XG4gICAgfVxuICAgIGxvZ2luUmVkaXJlY3QocmVxdWVzdD86IFJlZGlyZWN0UmVxdWVzdCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICByZXR1cm4gZnJvbSh0aGlzLmluc3RhbmNlLmxvZ2luUmVkaXJlY3QocmVxdWVzdCkpO1xuICAgIH1cbiAgICBsb2dvdXQobG9nb3V0UmVxdWVzdD86IEVuZFNlc3Npb25SZXF1ZXN0KTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiBmcm9tKHRoaXMuaW5zdGFuY2UubG9nb3V0KGxvZ291dFJlcXVlc3QpKTtcbiAgICB9XG4gICAgbG9nb3V0UmVkaXJlY3QobG9nb3V0UmVxdWVzdD86IEVuZFNlc3Npb25SZXF1ZXN0KTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiBmcm9tKHRoaXMuaW5zdGFuY2UubG9nb3V0UmVkaXJlY3QobG9nb3V0UmVxdWVzdCkpO1xuICAgIH1cbiAgICBsb2dvdXRQb3B1cChsb2dvdXRSZXF1ZXN0PzogRW5kU2Vzc2lvblBvcHVwUmVxdWVzdCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICByZXR1cm4gZnJvbSh0aGlzLmluc3RhbmNlLmxvZ291dFBvcHVwKGxvZ291dFJlcXVlc3QpKTtcbiAgICB9XG4gICAgc3NvU2lsZW50KHJlcXVlc3Q6IFNzb1NpbGVudFJlcXVlc3QpOiBPYnNlcnZhYmxlPEF1dGhlbnRpY2F0aW9uUmVzdWx0PiB7XG4gICAgICAgIHJldHVybiBmcm9tKHRoaXMuaW5zdGFuY2Uuc3NvU2lsZW50KHJlcXVlc3QpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyBsb2dnZXIgZm9yIG1zYWwtYW5ndWxhci5cbiAgICAgKiBJZiBubyBsb2dnZXIgc2V0LCByZXR1cm5zIGxvZ2dlciBpbnN0YW5jZSBjcmVhdGVkIHdpdGggc2FtZSBvcHRpb25zIGFzIG1zYWwtYnJvd3NlclxuICAgICAqL1xuICAgIGdldExvZ2dlcigpOiBMb2dnZXIge1xuICAgICAgICBpZiAoIXRoaXMubG9nZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlciA9IHRoaXMuaW5zdGFuY2UuZ2V0TG9nZ2VyKCkuY2xvbmUodGhpcy5uYW1lLCB0aGlzLnZlcnNpb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxvZ2dlcjtcbiAgICB9XG4gICAgLy8gQ3JlYXRlIGEgbG9nZ2VyIGluc3RhbmNlIGZvciBtc2FsLWFuZ3VsYXIgd2l0aCB0aGUgc2FtZSBvcHRpb25zIGFzIG1zYWwtYnJvd3NlclxuICAgIHNldExvZ2dlcihsb2dnZXI6IExvZ2dlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlci5jbG9uZSh0aGlzLm5hbWUsIHRoaXMudmVyc2lvbik7XG4gICAgICAgIHRoaXMuaW5zdGFuY2Uuc2V0TG9nZ2VyKGxvZ2dlcik7XG4gICAgfVxuXG59XG4iXX0=