import { distinctUntilChanged } from 'rxjs/operators';
import { Watcher, SubjectStatus } from '@igo2/utils';
export class LayerWatcher extends Watcher {
    constructor() {
        super();
        this.loaded = 0;
        this.loading = 0;
        this.layers = [];
        this.subscriptions = [];
    }
    watch() { }
    unwatch() {
        this.layers.forEach(layer => this.unwatchLayer(layer), this);
    }
    watchLayer(layer) {
        if (layer.status$ === undefined) {
            return;
        }
        this.layers.push(layer);
        const layer$$ = layer.status$
            .pipe(distinctUntilChanged())
            .subscribe(status => {
            if (status === SubjectStatus.Error) {
                this.loading = 0;
                this.loaded = -1;
            }
            if (status === SubjectStatus.Working) {
                this.loading += 1;
            }
            else if (status === SubjectStatus.Done) {
                this.loaded += 1;
            }
            if (this.loaded >= this.loading) {
                this.loading = this.loaded = 0;
                this.status = SubjectStatus.Done;
            }
            else if (this.loading > 0) {
                this.status = SubjectStatus.Working;
            }
        });
        this.subscriptions.push(layer$$);
    }
    unwatchLayer(layer) {
        layer.status$.next(SubjectStatus.Done);
        const index = this.layers.indexOf(layer);
        if (index >= 0) {
            const status = layer.watcher.status;
            if ([SubjectStatus.Working, SubjectStatus.Waiting].indexOf(status) !== -1) {
                this.loaded += 1;
            }
            this.subscriptions[index].unsubscribe();
            this.subscriptions.splice(index, 1);
            this.layers.splice(index, 1);
            layer.watcher.unwatch();
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItd2F0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2dlby9zcmMvbGliL21hcC91dGlscy9sYXllci13YXRjaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRELE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBR3JELE1BQU0sT0FBTyxZQUFhLFNBQVEsT0FBTztJQU12QztRQUNFLEtBQUssRUFBRSxDQUFDO1FBTkYsV0FBTSxHQUFHLENBQUMsQ0FBQztRQUNYLFlBQU8sR0FBRyxDQUFDLENBQUM7UUFDWixXQUFNLEdBQVksRUFBRSxDQUFDO1FBQ3JCLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztJQUkzQyxDQUFDO0lBRUQsS0FBSyxLQUFJLENBQUM7SUFFVixPQUFPO1FBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxVQUFVLENBQUMsS0FBWTtRQUNyQixJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQy9CLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPO2FBQzFCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2FBQzVCLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNsQixJQUFJLE1BQU0sS0FBSyxhQUFhLENBQUMsS0FBSyxFQUFFO2dCQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztnQkFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNsQjtZQUNELElBQUksTUFBTSxLQUFLLGFBQWEsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO2FBQ25CO2lCQUFNLElBQUksTUFBTSxLQUFLLGFBQWEsQ0FBQyxJQUFJLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO2FBQ2xCO1lBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQzthQUNsQztpQkFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUM7YUFDckM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVMLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxZQUFZLENBQUMsS0FBWTtRQUN2QixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekMsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO1lBQ2QsTUFBTSxNQUFNLEdBQUksS0FBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDN0MsSUFDRSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFDckU7Z0JBQ0EsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7YUFDbEI7WUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUIsS0FBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNsQztJQUNILENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IFdhdGNoZXIsIFN1YmplY3RTdGF0dXMgfSBmcm9tICdAaWdvMi91dGlscyc7XG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMnO1xuXG5leHBvcnQgY2xhc3MgTGF5ZXJXYXRjaGVyIGV4dGVuZHMgV2F0Y2hlciB7XG4gIHByaXZhdGUgbG9hZGVkID0gMDtcbiAgcHJpdmF0ZSBsb2FkaW5nID0gMDtcbiAgcHJpdmF0ZSBsYXllcnM6IExheWVyW10gPSBbXTtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICB3YXRjaCgpIHt9XG5cbiAgdW53YXRjaCgpIHtcbiAgICB0aGlzLmxheWVycy5mb3JFYWNoKGxheWVyID0+IHRoaXMudW53YXRjaExheWVyKGxheWVyKSwgdGhpcyk7XG4gIH1cblxuICB3YXRjaExheWVyKGxheWVyOiBMYXllcikge1xuICAgIGlmIChsYXllci5zdGF0dXMkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmxheWVycy5wdXNoKGxheWVyKTtcblxuICAgIGNvbnN0IGxheWVyJCQgPSBsYXllci5zdGF0dXMkXG4gICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKVxuICAgICAgLnN1YnNjcmliZShzdGF0dXMgPT4ge1xuICAgICAgICBpZiAoc3RhdHVzID09PSBTdWJqZWN0U3RhdHVzLkVycm9yKSB7XG4gICAgICAgICAgdGhpcy5sb2FkaW5nID0gMDtcbiAgICAgICAgICB0aGlzLmxvYWRlZCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGF0dXMgPT09IFN1YmplY3RTdGF0dXMuV29ya2luZykge1xuICAgICAgICAgIHRoaXMubG9hZGluZyArPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gU3ViamVjdFN0YXR1cy5Eb25lKSB7XG4gICAgICAgICAgdGhpcy5sb2FkZWQgKz0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmxvYWRlZCA+PSB0aGlzLmxvYWRpbmcpIHtcbiAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0aGlzLmxvYWRlZCA9IDA7XG4gICAgICAgICAgdGhpcy5zdGF0dXMgPSBTdWJqZWN0U3RhdHVzLkRvbmU7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5sb2FkaW5nID4gMCkge1xuICAgICAgICAgIHRoaXMuc3RhdHVzID0gU3ViamVjdFN0YXR1cy5Xb3JraW5nO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKGxheWVyJCQpO1xuICB9XG5cbiAgdW53YXRjaExheWVyKGxheWVyOiBMYXllcikge1xuICAgIGxheWVyLnN0YXR1cyQubmV4dChTdWJqZWN0U3RhdHVzLkRvbmUpO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5sYXllcnMuaW5kZXhPZihsYXllcik7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgIGNvbnN0IHN0YXR1cyA9IChsYXllciBhcyBhbnkpLndhdGNoZXIuc3RhdHVzO1xuICAgICAgaWYgKFxuICAgICAgICBbU3ViamVjdFN0YXR1cy5Xb3JraW5nLCBTdWJqZWN0U3RhdHVzLldhaXRpbmddLmluZGV4T2Yoc3RhdHVzKSAhPT0gLTFcbiAgICAgICkge1xuICAgICAgICB0aGlzLmxvYWRlZCArPSAxO1xuICAgICAgfVxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zW2luZGV4XS51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB0aGlzLmxheWVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgKGxheWVyIGFzIGFueSkud2F0Y2hlci51bndhdGNoKCk7XG4gICAgfVxuICB9XG59XG4iXX0=