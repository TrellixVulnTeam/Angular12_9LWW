import { BehaviorSubject } from 'rxjs';
export class TableDatabase {
    constructor(data) {
        /** Stream that emits whenever the data has been modified. */
        this.dataChange = new BehaviorSubject([]);
        if (data) {
            this.dataChange.next(data);
        }
    }
    get data() {
        return this.dataChange.value;
    }
    set(data) {
        this.dataChange.next(data);
    }
    add(item) {
        const copiedData = this.data.slice();
        copiedData.push(item);
        this.set(copiedData);
    }
    remove(item) {
        const copiedData = this.data.slice();
        const index = copiedData.indexOf(item);
        copiedData.splice(index, 1);
        this.set(copiedData);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vc3JjL2xpYi90YWJsZS90YWJsZS1kYXRhYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXZDLE1BQU0sT0FBTyxhQUFhO0lBT3hCLFlBQVksSUFBSztRQU5qQiw2REFBNkQ7UUFDN0QsZUFBVSxHQUEyQixJQUFJLGVBQWUsQ0FBUSxFQUFFLENBQUMsQ0FBQztRQU1sRSxJQUFJLElBQUksRUFBRTtZQUNSLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztJQVJELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7SUFDL0IsQ0FBQztJQVFELEdBQUcsQ0FBQyxJQUFJO1FBQ04sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELEdBQUcsQ0FBQyxJQUFJO1FBQ04sTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFJO1FBQ1QsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQyxNQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdkIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBjbGFzcyBUYWJsZURhdGFiYXNlIHtcbiAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW5ldmVyIHRoZSBkYXRhIGhhcyBiZWVuIG1vZGlmaWVkLiAqL1xuICBkYXRhQ2hhbmdlOiBCZWhhdmlvclN1YmplY3Q8YW55W10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnlbXT4oW10pO1xuICBnZXQgZGF0YSgpOiBhbnlbXSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YUNoYW5nZS52YWx1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGRhdGE/KSB7XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIHRoaXMuZGF0YUNoYW5nZS5uZXh0KGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIHNldChkYXRhKSB7XG4gICAgdGhpcy5kYXRhQ2hhbmdlLm5leHQoZGF0YSk7XG4gIH1cblxuICBhZGQoaXRlbSkge1xuICAgIGNvbnN0IGNvcGllZERhdGEgPSB0aGlzLmRhdGEuc2xpY2UoKTtcbiAgICBjb3BpZWREYXRhLnB1c2goaXRlbSk7XG4gICAgdGhpcy5zZXQoY29waWVkRGF0YSk7XG4gIH1cblxuICByZW1vdmUoaXRlbSkge1xuICAgIGNvbnN0IGNvcGllZERhdGEgPSB0aGlzLmRhdGEuc2xpY2UoKTtcbiAgICBjb25zdCBpbmRleCA9IGNvcGllZERhdGEuaW5kZXhPZihpdGVtKTtcbiAgICBjb3BpZWREYXRhLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5zZXQoY29waWVkRGF0YSk7XG4gIH1cbn1cbiJdfQ==