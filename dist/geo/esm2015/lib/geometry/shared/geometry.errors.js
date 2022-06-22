/* eslint-disable */
// See this issue: https://github.com/Microsoft/TypeScript/issues/13965
// And the solution: https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
// for an explanation as to why the prototype is set manually
/* eslint-enable */
export class GeometrySliceError extends Error {
}
export class GeometrySliceMultiPolygonError extends GeometrySliceError {
    constructor() {
        super('Can\'t slice a MultiPolygon.');
        Object.setPrototypeOf(this, GeometrySliceMultiPolygonError.prototype);
    }
}
export class GeometrySliceLineStringError extends GeometrySliceError {
    constructor() {
        super('Can\'t slice with a line that has more than 2 points.');
        Object.setPrototypeOf(this, GeometrySliceLineStringError.prototype);
    }
}
export class GeometrySliceTooManyIntersectionError extends GeometrySliceError {
    constructor() {
        super('More than 2 intersections found between the target polygon and the slicing line.');
        Object.setPrototypeOf(this, GeometrySliceTooManyIntersectionError.prototype);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbWV0cnkuZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvZ2VvL3NyYy9saWIvZ2VvbWV0cnkvc2hhcmVkL2dlb21ldHJ5LmVycm9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxvQkFBb0I7QUFDcEIsdUVBQXVFO0FBQ3ZFLGtKQUFrSjtBQUNsSiw2REFBNkQ7QUFDN0QsbUJBQW1CO0FBRW5CLE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxLQUFLO0NBQUc7QUFFaEQsTUFBTSxPQUFPLDhCQUErQixTQUFRLGtCQUFrQjtJQUNwRTtRQUNFLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLDhCQUE4QixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7Q0FDRjtBQUVELE1BQU0sT0FBTyw0QkFBNkIsU0FBUSxrQkFBa0I7SUFDbEU7UUFDRSxLQUFLLENBQUMsdURBQXVELENBQUMsQ0FBQztRQUMvRCxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSw0QkFBNEIsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN0RSxDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8scUNBQXNDLFNBQVEsa0JBQWtCO0lBQzNFO1FBQ0UsS0FBSyxDQUFDLGtGQUFrRixDQUFDLENBQUM7UUFDMUYsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUscUNBQXFDLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDL0UsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgKi9cbi8vIFNlZSB0aGlzIGlzc3VlOiBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzEzOTY1XG4vLyBBbmQgdGhlIHNvbHV0aW9uOiBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L1R5cGVTY3JpcHQvd2lraS9CcmVha2luZy1DaGFuZ2VzI2V4dGVuZGluZy1idWlsdC1pbnMtbGlrZS1lcnJvci1hcnJheS1hbmQtbWFwLW1heS1uby1sb25nZXItd29ya1xuLy8gZm9yIGFuIGV4cGxhbmF0aW9uIGFzIHRvIHdoeSB0aGUgcHJvdG90eXBlIGlzIHNldCBtYW51YWxseVxuLyogZXNsaW50LWVuYWJsZSAqL1xuXG5leHBvcnQgY2xhc3MgR2VvbWV0cnlTbGljZUVycm9yIGV4dGVuZHMgRXJyb3Ige31cblxuZXhwb3J0IGNsYXNzIEdlb21ldHJ5U2xpY2VNdWx0aVBvbHlnb25FcnJvciBleHRlbmRzIEdlb21ldHJ5U2xpY2VFcnJvciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCdDYW5cXCd0IHNsaWNlIGEgTXVsdGlQb2x5Z29uLicpO1xuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBHZW9tZXRyeVNsaWNlTXVsdGlQb2x5Z29uRXJyb3IucHJvdG90eXBlKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgR2VvbWV0cnlTbGljZUxpbmVTdHJpbmdFcnJvciBleHRlbmRzIEdlb21ldHJ5U2xpY2VFcnJvciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCdDYW5cXCd0IHNsaWNlIHdpdGggYSBsaW5lIHRoYXQgaGFzIG1vcmUgdGhhbiAyIHBvaW50cy4nKTtcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgR2VvbWV0cnlTbGljZUxpbmVTdHJpbmdFcnJvci5wcm90b3R5cGUpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHZW9tZXRyeVNsaWNlVG9vTWFueUludGVyc2VjdGlvbkVycm9yIGV4dGVuZHMgR2VvbWV0cnlTbGljZUVycm9yIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoJ01vcmUgdGhhbiAyIGludGVyc2VjdGlvbnMgZm91bmQgYmV0d2VlbiB0aGUgdGFyZ2V0IHBvbHlnb24gYW5kIHRoZSBzbGljaW5nIGxpbmUuJyk7XG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIEdlb21ldHJ5U2xpY2VUb29NYW55SW50ZXJzZWN0aW9uRXJyb3IucHJvdG90eXBlKTtcbiAgfVxufVxuIl19