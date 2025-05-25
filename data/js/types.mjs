/**
 * @typedef SystemAPI
 * @type {Object}
 *
 * @prop {() => Promise<null>} func
 * @prop {(code?: string) => Promise<null>} dispatch
 *
 * @prop {() => Promise<string>} get_appname
 * @prop {() => Promise<string>} get_appdesc
 * @prop {() => Promise<History[]>} all
 * @prop {(code: string) => Promise<void>} fav
 * @prop {(code: string) => Promise<void>} unfav
 */

/**
 * @typedef History
 * @type {Object}
 *
 * @prop {string} id
 * @prop {boolean} is_favorite
 * @prop {string} description
 */
