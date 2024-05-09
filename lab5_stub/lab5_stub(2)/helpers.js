//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
const checkId = (id) => {
    if (!id) {
        throw `Error: you must provide an id`;
    }
    if (typeof id !== 'string' || !isNaN(id)) {
        throw `Error: you must provide a string value`;
    }
    id = id.trim();
    if (id.length === 0) {
        throw `Error: you must provide a non-empty string value`;
    }
    return id;
}
export {checkId};