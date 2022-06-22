export class ObjectUtils {
    static resolve(obj, key) {
        const keysArray = key
            .replace(/\[/g, '.')
            .replace(/\]/g, '')
            .split('.');
        let current = obj;
        while (keysArray.length) {
            if (typeof current !== 'object') {
                return undefined;
            }
            current = current[keysArray.shift()];
        }
        return current;
    }
    static isObject(item) {
        return (item &&
            typeof item === 'object' &&
            !Array.isArray(item) &&
            item !== null &&
            !(item instanceof Date));
    }
    static mergeDeep(target, source, ignoreUndefined = false) {
        const output = Object.assign({}, target);
        if (ObjectUtils.isObject(target) && ObjectUtils.isObject(source)) {
            Object.keys(source)
                .filter(key => !ignoreUndefined || source[key] !== undefined)
                .forEach(key => {
                if (ObjectUtils.isObject(source[key])) {
                    if (!(key in target)) {
                        Object.assign(output, { [key]: source[key] });
                    }
                    else {
                        output[key] = ObjectUtils.mergeDeep(target[key], source[key], ignoreUndefined);
                    }
                }
                else {
                    Object.assign(output, { [key]: source[key] });
                }
            });
        }
        return output;
    }
    static copyDeep(src) {
        const target = Array.isArray(src) ? [] : {};
        for (const prop in src) {
            if (src.hasOwnProperty(prop)) {
                const value = src[prop];
                if (value && typeof value === 'object') {
                    target[prop] = this.copyDeep(value);
                }
                else {
                    target[prop] = value;
                }
            }
        }
        return target;
    }
    static removeDuplicateCaseInsensitive(obj) {
        const summaryCapitalizeObject = {};
        const capitalizeObject = {};
        const upperCaseCount = [];
        for (const property in obj) {
            if (obj.hasOwnProperty(property)) {
                const upperCaseProperty = property.toUpperCase();
                if (!summaryCapitalizeObject.hasOwnProperty(upperCaseProperty)) {
                    summaryCapitalizeObject[upperCaseProperty] = [
                        { [property]: obj[property] }
                    ];
                }
                else {
                    summaryCapitalizeObject[upperCaseProperty].push({
                        [property]: obj[property]
                    });
                }
                // counting the number of uppercase lettersMna
                upperCaseCount.push({
                    key: property,
                    count: property.replace(/[^A-Z]/g, '').length
                });
            }
        }
        for (const capitalizedProperty in summaryCapitalizeObject) {
            if (summaryCapitalizeObject.hasOwnProperty(capitalizedProperty)) {
                if (summaryCapitalizeObject.hasOwnProperty(capitalizedProperty)) {
                    const capitalizedPropertyObject = summaryCapitalizeObject[capitalizedProperty];
                    if (capitalizedPropertyObject.length === 1) {
                        // for single params (no duplicates)
                        const singlePossibility = capitalizedPropertyObject[0];
                        capitalizeObject[capitalizedProperty] =
                            singlePossibility[Object.keys(singlePossibility)[0]];
                    }
                    else if (capitalizedPropertyObject.length > 1) {
                        // defining the closest to lowercase property
                        const paramClosestToLowercase = upperCaseCount
                            .filter(f => f.key.toLowerCase() === capitalizedProperty.toLowerCase())
                            .reduce((prev, current) => {
                            return prev.y < current.y ? prev : current;
                        });
                        capitalizeObject[paramClosestToLowercase.key.toUpperCase()] =
                            obj[paramClosestToLowercase.key];
                    }
                }
            }
        }
        for (const property in obj) {
            if (obj.hasOwnProperty(property)) {
                delete obj[property];
            }
        }
        for (const property in capitalizeObject) {
            if (capitalizeObject.hasOwnProperty(property)) {
                obj[property] = capitalizeObject[property];
            }
        }
    }
    static removeUndefined(obj) {
        const output = {};
        if (ObjectUtils.isObject(obj)) {
            Object.keys(obj)
                .filter(key => obj[key] !== undefined)
                .forEach(key => {
                if (ObjectUtils.isObject(obj[key]) || Array.isArray(obj[key])) {
                    output[key] = ObjectUtils.removeUndefined(obj[key]);
                }
                else {
                    output[key] = obj[key];
                }
            });
            return output;
        }
        if (Array.isArray(obj)) {
            return obj.map(o => ObjectUtils.removeUndefined(o));
        }
        return obj;
    }
    static removeNull(obj) {
        const output = {};
        if (ObjectUtils.isObject(obj)) {
            Object.keys(obj)
                .filter(key => obj[key] !== null)
                .forEach(key => {
                if (ObjectUtils.isObject(obj[key]) || Array.isArray(obj[key])) {
                    output[key] = ObjectUtils.removeNull(obj[key]);
                }
                else {
                    output[key] = obj[key];
                }
            });
            return output;
        }
        if (Array.isArray(obj)) {
            return obj.map(o => ObjectUtils.removeNull(o));
        }
        return obj;
    }
    static naturalCompare(a, b, direction = 'asc', nullsFirst) {
        if (direction === 'desc') {
            b = [a, (a = b)][0];
        }
        // nullsFirst = undefined : end if direction = 'asc', first if direction = 'desc'
        // nullsFirst = true : always first
        // nullsFirst = false : always end
        if (a === null ||
            a === '' ||
            a === undefined ||
            b === null ||
            b === '' ||
            b === undefined) {
            const nullScore = a === b
                ? 0
                : a === undefined
                    ? 3
                    : b === undefined
                        ? -3
                        : a === null
                            ? 2
                            : b === null
                                ? -2
                                : a === ''
                                    ? 1
                                    : -1;
            if (direction === 'desc') {
                return nullsFirst !== false ? nullScore : nullScore * -1;
            }
            return nullsFirst === true ? nullScore * -1 : nullScore;
        }
        const ax = [];
        const bx = [];
        a = '' + a;
        b = '' + b;
        a.replace(/(\d+)|(\D+)/g, (_, $1, $2) => {
            ax.push([$1 || Infinity, $2 || '']);
        });
        b.replace(/(\d+)|(\D+)/g, (_, $1, $2) => {
            bx.push([$1 || Infinity, $2 || '']);
        });
        while (ax.length && bx.length) {
            const an = ax.shift();
            const bn = bx.shift();
            const nn = an[0] - bn[0] || an[1].localeCompare(bn[1]);
            if (nn) {
                return nn;
            }
        }
        return ax.length - bx.length;
    }
    /**
     * Return true if two object are equivalent.
     * Objects are considered equivalent if they have the same properties and
     * if all of their properties (first-level only) share the same value.
     * @param obj1 First object
     * @param obj2 Second object
     * @returns Whether two objects arer equivalent
     */
    static objectsAreEquivalent(obj1, obj2) {
        if (obj1 === obj2) {
            return true;
        }
        const obj1Props = Object.getOwnPropertyNames(obj1);
        const obj2Props = Object.getOwnPropertyNames(obj2);
        if (obj1Props.length !== obj2Props.length) {
            return false;
        }
        for (const prop of obj1Props) {
            if (obj1[prop] !== obj2[prop]) {
                return false;
            }
        }
        return true;
    }
    /**
     * Return a new object with an array of keys removed
     * @param obj Source object
     * @param keys Keys to remove
     * @returns A new object
     */
    static removeKeys(obj, keys) {
        const newObj = Object.keys(obj)
            .filter(key => keys.indexOf(key) < 0)
            .reduce((_obj, key) => {
            _obj[key] = obj[key];
            return _obj;
        }, {});
        return newObj;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0LXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvdXRpbHMvc3JjL2xpYi9vYmplY3QtdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxPQUFPLFdBQVc7SUFDdEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFXLEVBQUUsR0FBVztRQUNyQyxNQUFNLFNBQVMsR0FBRyxHQUFHO2FBQ2xCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO2FBQ25CLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO2FBQ2xCLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNkLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUNsQixPQUFPLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDdkIsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7Z0JBQy9CLE9BQU8sU0FBUyxDQUFDO2FBQ2xCO1lBQ0QsT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUN0QztRQUVELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQVk7UUFDMUIsT0FBTyxDQUNMLElBQUk7WUFDSixPQUFPLElBQUksS0FBSyxRQUFRO1lBQ3hCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDcEIsSUFBSSxLQUFLLElBQUk7WUFDYixDQUFDLENBQUMsSUFBSSxZQUFZLElBQUksQ0FBQyxDQUN4QixDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxTQUFTLENBQ2QsTUFBYyxFQUNkLE1BQWMsRUFDZCxlQUFlLEdBQUcsS0FBSztRQUV2QixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN6QyxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMs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ImV4cG9ydCBjbGFzcyBPYmplY3RVdGlscyB7XG4gIHN0YXRpYyByZXNvbHZlKG9iajogb2JqZWN0LCBrZXk6IHN0cmluZyk6IGFueSB7XG4gICAgY29uc3Qga2V5c0FycmF5ID0ga2V5XG4gICAgICAucmVwbGFjZSgvXFxbL2csICcuJylcbiAgICAgIC5yZXBsYWNlKC9cXF0vZywgJycpXG4gICAgICAuc3BsaXQoJy4nKTtcbiAgICBsZXQgY3VycmVudCA9IG9iajtcbiAgICB3aGlsZSAoa2V5c0FycmF5Lmxlbmd0aCkge1xuICAgICAgaWYgKHR5cGVvZiBjdXJyZW50ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgY3VycmVudCA9IGN1cnJlbnRba2V5c0FycmF5LnNoaWZ0KCldO1xuICAgIH1cblxuICAgIHJldHVybiBjdXJyZW50O1xuICB9XG5cbiAgc3RhdGljIGlzT2JqZWN0KGl0ZW06IG9iamVjdCkge1xuICAgIHJldHVybiAoXG4gICAgICBpdGVtICYmXG4gICAgICB0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICFBcnJheS5pc0FycmF5KGl0ZW0pICYmXG4gICAgICBpdGVtICE9PSBudWxsICYmXG4gICAgICAhKGl0ZW0gaW5zdGFuY2VvZiBEYXRlKVxuICAgICk7XG4gIH1cblxuICBzdGF0aWMgbWVyZ2VEZWVwKFxuICAgIHRhcmdldDogb2JqZWN0LFxuICAgIHNvdXJjZTogb2JqZWN0LFxuICAgIGlnbm9yZVVuZGVmaW5lZCA9IGZhbHNlXG4gICk6IGFueSB7XG4gICAgY29uc3Qgb3V0cHV0ID0gT2JqZWN0LmFzc2lnbih7fSwgdGFyZ2V0KTtcbiAgICBpZiAoT2JqZWN0VXRpbHMuaXNPYmplY3QodGFyZ2V0KSAmJiBPYmplY3RVdGlscy5pc09iamVjdChzb3VyY2UpKSB7XG4gICAgICBPYmplY3Qua2V5cyhzb3VyY2UpXG4gICAgICAgIC5maWx0ZXIoa2V5ID0+ICFpZ25vcmVVbmRlZmluZWQgfHwgc291cmNlW2tleV0gIT09IHVuZGVmaW5lZClcbiAgICAgICAgLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICBpZiAoT2JqZWN0VXRpbHMuaXNPYmplY3Qoc291cmNlW2tleV0pKSB7XG4gICAgICAgICAgICBpZiAoIShrZXkgaW4gdGFyZ2V0KSkge1xuICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG91dHB1dCwgeyBba2V5XTogc291cmNlW2tleV0gfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBvdXRwdXRba2V5XSA9IE9iamVjdFV0aWxzLm1lcmdlRGVlcChcbiAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSxcbiAgICAgICAgICAgICAgICBzb3VyY2Vba2V5XSxcbiAgICAgICAgICAgICAgICBpZ25vcmVVbmRlZmluZWRcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQsIHsgW2tleV06IHNvdXJjZVtrZXldIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cblxuICBzdGF0aWMgY29weURlZXAoc3JjKTogYW55IHtcbiAgICBjb25zdCB0YXJnZXQgPSBBcnJheS5pc0FycmF5KHNyYykgPyBbXSA6IHt9O1xuICAgIGZvciAoY29uc3QgcHJvcCBpbiBzcmMpIHtcbiAgICAgIGlmIChzcmMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBzcmNbcHJvcF07XG4gICAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgdGFyZ2V0W3Byb3BdID0gdGhpcy5jb3B5RGVlcCh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFyZ2V0W3Byb3BdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIHN0YXRpYyByZW1vdmVEdXBsaWNhdGVDYXNlSW5zZW5zaXRpdmUob2JqOiBvYmplY3QpIHtcbiAgICBjb25zdCBzdW1tYXJ5Q2FwaXRhbGl6ZU9iamVjdCA9IHt9O1xuICAgIGNvbnN0IGNhcGl0YWxpemVPYmplY3QgPSB7fTtcbiAgICBjb25zdCB1cHBlckNhc2VDb3VudCA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBvYmopIHtcbiAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICAgIGNvbnN0IHVwcGVyQ2FzZVByb3BlcnR5ID0gcHJvcGVydHkudG9VcHBlckNhc2UoKTtcbiAgICAgICAgaWYgKCFzdW1tYXJ5Q2FwaXRhbGl6ZU9iamVjdC5oYXNPd25Qcm9wZXJ0eSh1cHBlckNhc2VQcm9wZXJ0eSkpIHtcbiAgICAgICAgICBzdW1tYXJ5Q2FwaXRhbGl6ZU9iamVjdFt1cHBlckNhc2VQcm9wZXJ0eV0gPSBbXG4gICAgICAgICAgICB7IFtwcm9wZXJ0eV06IG9ialtwcm9wZXJ0eV0gfVxuICAgICAgICAgIF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VtbWFyeUNhcGl0YWxpemVPYmplY3RbdXBwZXJDYXNlUHJvcGVydHldLnB1c2goe1xuICAgICAgICAgICAgW3Byb3BlcnR5XTogb2JqW3Byb3BlcnR5XVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvdW50aW5nIHRoZSBudW1iZXIgb2YgdXBwZXJjYXNlIGxldHRlcnNNbmFcbiAgICAgICAgdXBwZXJDYXNlQ291bnQucHVzaCh7XG4gICAgICAgICAga2V5OiBwcm9wZXJ0eSxcbiAgICAgICAgICBjb3VudDogcHJvcGVydHkucmVwbGFjZSgvW15BLVpdL2csICcnKS5sZW5ndGhcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3QgY2FwaXRhbGl6ZWRQcm9wZXJ0eSBpbiBzdW1tYXJ5Q2FwaXRhbGl6ZU9iamVjdCkge1xuICAgICAgaWYgKHN1bW1hcnlDYXBpdGFsaXplT2JqZWN0Lmhhc093blByb3BlcnR5KGNhcGl0YWxpemVkUHJvcGVydHkpKSB7XG4gICAgICAgIGlmIChzdW1tYXJ5Q2FwaXRhbGl6ZU9iamVjdC5oYXNPd25Qcm9wZXJ0eShjYXBpdGFsaXplZFByb3BlcnR5KSkge1xuICAgICAgICAgIGNvbnN0IGNhcGl0YWxpemVkUHJvcGVydHlPYmplY3QgPVxuICAgICAgICAgICAgc3VtbWFyeUNhcGl0YWxpemVPYmplY3RbY2FwaXRhbGl6ZWRQcm9wZXJ0eV07XG4gICAgICAgICAgaWYgKGNhcGl0YWxpemVkUHJvcGVydHlPYmplY3QubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAvLyBmb3Igc2luZ2xlIHBhcmFtcyAobm8gZHVwbGljYXRlcylcbiAgICAgICAgICAgIGNvbnN0IHNpbmdsZVBvc3NpYmlsaXR5ID0gY2FwaXRhbGl6ZWRQcm9wZXJ0eU9iamVjdFswXTtcbiAgICAgICAgICAgIGNhcGl0YWxpemVPYmplY3RbY2FwaXRhbGl6ZWRQcm9wZXJ0eV0gPVxuICAgICAgICAgICAgICBzaW5nbGVQb3NzaWJpbGl0eVtPYmplY3Qua2V5cyhzaW5nbGVQb3NzaWJpbGl0eSlbMF1dO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY2FwaXRhbGl6ZWRQcm9wZXJ0eU9iamVjdC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAvLyBkZWZpbmluZyB0aGUgY2xvc2VzdCB0byBsb3dlcmNhc2UgcHJvcGVydHlcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtQ2xvc2VzdFRvTG93ZXJjYXNlID0gdXBwZXJDYXNlQ291bnRcbiAgICAgICAgICAgICAgLmZpbHRlcihcbiAgICAgICAgICAgICAgICBmID0+IGYua2V5LnRvTG93ZXJDYXNlKCkgPT09IGNhcGl0YWxpemVkUHJvcGVydHkudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZWR1Y2UoKHByZXYsIGN1cnJlbnQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJldi55IDwgY3VycmVudC55ID8gcHJldiA6IGN1cnJlbnQ7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY2FwaXRhbGl6ZU9iamVjdFtwYXJhbUNsb3Nlc3RUb0xvd2VyY2FzZS5rZXkudG9VcHBlckNhc2UoKV0gPVxuICAgICAgICAgICAgICBvYmpbcGFyYW1DbG9zZXN0VG9Mb3dlcmNhc2Uua2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBvYmopIHtcbiAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICAgIGRlbGV0ZSBvYmpbcHJvcGVydHldO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gY2FwaXRhbGl6ZU9iamVjdCkge1xuICAgICAgaWYgKGNhcGl0YWxpemVPYmplY3QuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICAgIG9ialtwcm9wZXJ0eV0gPSBjYXBpdGFsaXplT2JqZWN0W3Byb3BlcnR5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgcmVtb3ZlVW5kZWZpbmVkKG9iajogb2JqZWN0KTogYW55IHtcbiAgICBjb25zdCBvdXRwdXQgPSB7fTtcbiAgICBpZiAoT2JqZWN0VXRpbHMuaXNPYmplY3Qob2JqKSkge1xuICAgICAgT2JqZWN0LmtleXMob2JqKVxuICAgICAgICAuZmlsdGVyKGtleSA9PiBvYmpba2V5XSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgIGlmIChPYmplY3RVdGlscy5pc09iamVjdChvYmpba2V5XSkgfHwgQXJyYXkuaXNBcnJheShvYmpba2V5XSkpIHtcbiAgICAgICAgICAgIG91dHB1dFtrZXldID0gT2JqZWN0VXRpbHMucmVtb3ZlVW5kZWZpbmVkKG9ialtrZXldKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3V0cHV0W2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgIHJldHVybiBvYmoubWFwKG8gPT4gT2JqZWN0VXRpbHMucmVtb3ZlVW5kZWZpbmVkKG8pKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgc3RhdGljIHJlbW92ZU51bGwob2JqOiBvYmplY3QpOiBhbnkge1xuICAgIGNvbnN0IG91dHB1dCA9IHt9O1xuICAgIGlmIChPYmplY3RVdGlscy5pc09iamVjdChvYmopKSB7XG4gICAgICBPYmplY3Qua2V5cyhvYmopXG4gICAgICAgIC5maWx0ZXIoa2V5ID0+IG9ialtrZXldICE9PSBudWxsKVxuICAgICAgICAuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgIGlmIChPYmplY3RVdGlscy5pc09iamVjdChvYmpba2V5XSkgfHwgQXJyYXkuaXNBcnJheShvYmpba2V5XSkpIHtcbiAgICAgICAgICAgIG91dHB1dFtrZXldID0gT2JqZWN0VXRpbHMucmVtb3ZlTnVsbChvYmpba2V5XSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dHB1dFtrZXldID0gb2JqW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICByZXR1cm4gb2JqLm1hcChvID0+IE9iamVjdFV0aWxzLnJlbW92ZU51bGwobykpO1xuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBzdGF0aWMgbmF0dXJhbENvbXBhcmUoYSwgYiwgZGlyZWN0aW9uID0gJ2FzYycsIG51bGxzRmlyc3Q/OiBib29sZWFuKSB7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2Rlc2MnKSB7XG4gICAgICBiID0gW2EsIChhID0gYildWzBdO1xuICAgIH1cblxuICAgIC8vIG51bGxzRmlyc3QgPSB1bmRlZmluZWQgOiBlbmQgaWYgZGlyZWN0aW9uID0gJ2FzYycsIGZpcnN0IGlmIGRpcmVjdGlvbiA9ICdkZXNjJ1xuICAgIC8vIG51bGxzRmlyc3QgPSB0cnVlIDogYWx3YXlzIGZpcnN0XG4gICAgLy8gbnVsbHNGaXJzdCA9IGZhbHNlIDogYWx3YXlzIGVuZFxuICAgIGlmIChcbiAgICAgIGEgPT09IG51bGwgfHxcbiAgICAgIGEgPT09ICcnIHx8XG4gICAgICBhID09PSB1bmRlZmluZWQgfHxcbiAgICAgIGIgPT09IG51bGwgfHxcbiAgICAgIGIgPT09ICcnIHx8XG4gICAgICBiID09PSB1bmRlZmluZWRcbiAgICApIHtcbiAgICAgIGNvbnN0IG51bGxTY29yZSA9XG4gICAgICAgIGEgPT09IGJcbiAgICAgICAgICA/IDBcbiAgICAgICAgICA6IGEgPT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gM1xuICAgICAgICAgIDogYiA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyAtM1xuICAgICAgICAgIDogYSA9PT0gbnVsbFxuICAgICAgICAgID8gMlxuICAgICAgICAgIDogYiA9PT0gbnVsbFxuICAgICAgICAgID8gLTJcbiAgICAgICAgICA6IGEgPT09ICcnXG4gICAgICAgICAgPyAxXG4gICAgICAgICAgOiAtMTtcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdkZXNjJykge1xuICAgICAgICByZXR1cm4gbnVsbHNGaXJzdCAhPT0gZmFsc2UgPyBudWxsU2NvcmUgOiBudWxsU2NvcmUgKiAtMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsc0ZpcnN0ID09PSB0cnVlID8gbnVsbFNjb3JlICogLTEgOiBudWxsU2NvcmU7XG4gICAgfVxuXG4gICAgY29uc3QgYXggPSBbXTtcbiAgICBjb25zdCBieCA9IFtdO1xuICAgIGEgPSAnJyArIGE7XG4gICAgYiA9ICcnICsgYjtcblxuICAgIGEucmVwbGFjZSgvKFxcZCspfChcXEQrKS9nLCAoXywgJDEsICQyKSA9PiB7XG4gICAgICBheC5wdXNoKFskMSB8fCBJbmZpbml0eSwgJDIgfHwgJyddKTtcbiAgICB9KTtcblxuICAgIGIucmVwbGFjZSgvKFxcZCspfChcXEQrKS9nLCAoXywgJDEsICQyKSA9PiB7XG4gICAgICBieC5wdXNoKFskMSB8fCBJbmZpbml0eSwgJDIgfHwgJyddKTtcbiAgICB9KTtcblxuICAgIHdoaWxlIChheC5sZW5ndGggJiYgYngubGVuZ3RoKSB7XG4gICAgICBjb25zdCBhbiA9IGF4LnNoaWZ0KCk7XG4gICAgICBjb25zdCBibiA9IGJ4LnNoaWZ0KCk7XG4gICAgICBjb25zdCBubiA9IGFuWzBdIC0gYm5bMF0gfHwgYW5bMV0ubG9jYWxlQ29tcGFyZShiblsxXSk7XG4gICAgICBpZiAobm4pIHtcbiAgICAgICAgcmV0dXJuIG5uO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBheC5sZW5ndGggLSBieC5sZW5ndGg7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRydWUgaWYgdHdvIG9iamVjdCBhcmUgZXF1aXZhbGVudC5cbiAgICogT2JqZWN0cyBhcmUgY29uc2lkZXJlZCBlcXVpdmFsZW50IGlmIHRoZXkgaGF2ZSB0aGUgc2FtZSBwcm9wZXJ0aWVzIGFuZFxuICAgKiBpZiBhbGwgb2YgdGhlaXIgcHJvcGVydGllcyAoZmlyc3QtbGV2ZWwgb25seSkgc2hhcmUgdGhlIHNhbWUgdmFsdWUuXG4gICAqIEBwYXJhbSBvYmoxIEZpcnN0IG9iamVjdFxuICAgKiBAcGFyYW0gb2JqMiBTZWNvbmQgb2JqZWN0XG4gICAqIEByZXR1cm5zIFdoZXRoZXIgdHdvIG9iamVjdHMgYXJlciBlcXVpdmFsZW50XG4gICAqL1xuICBzdGF0aWMgb2JqZWN0c0FyZUVxdWl2YWxlbnQob2JqMTogb2JqZWN0LCBvYmoyOiBvYmplY3QpOiBib29sZWFuIHtcbiAgICBpZiAob2JqMSA9PT0gb2JqMikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29uc3Qgb2JqMVByb3BzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqMSk7XG4gICAgY29uc3Qgb2JqMlByb3BzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqMik7XG4gICAgaWYgKG9iajFQcm9wcy5sZW5ndGggIT09IG9iajJQcm9wcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHByb3Agb2Ygb2JqMVByb3BzKSB7XG4gICAgICBpZiAob2JqMVtwcm9wXSAhPT0gb2JqMltwcm9wXSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgbmV3IG9iamVjdCB3aXRoIGFuIGFycmF5IG9mIGtleXMgcmVtb3ZlZFxuICAgKiBAcGFyYW0gb2JqIFNvdXJjZSBvYmplY3RcbiAgICogQHBhcmFtIGtleXMgS2V5cyB0byByZW1vdmVcbiAgICogQHJldHVybnMgQSBuZXcgb2JqZWN0XG4gICAqL1xuICBzdGF0aWMgcmVtb3ZlS2V5cyhvYmo6IG9iamVjdCwga2V5czogc3RyaW5nW10pOiBvYmplY3Qge1xuICAgIGNvbnN0IG5ld09iaiA9IE9iamVjdC5rZXlzKG9iailcbiAgICAgIC5maWx0ZXIoa2V5ID0+IGtleXMuaW5kZXhPZihrZXkpIDwgMClcbiAgICAgIC5yZWR1Y2UoKF9vYmosIGtleSkgPT4ge1xuICAgICAgICBfb2JqW2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgcmV0dXJuIF9vYmo7XG4gICAgICB9LCB7fSk7XG5cbiAgICByZXR1cm4gbmV3T2JqO1xuICB9XG59XG4iXX0=