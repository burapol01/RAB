export const ADD_ROLE_MENU = 'ADD_ROLE_MENU';
export const ADD_ROLE_MENU_FUNC = 'ADD_ROLE_MENU_FUNC';
export function addRoleMenuFuncList(add) {
    return {
        type: ADD_ROLE_MENU,
        payload: add
    };
}
export function addRoleMenuFunction(add) {
    return {
        type: ADD_ROLE_MENU_FUNC,
        payload: add
    };
}
