/**
 * menshend-api
 * The API for the Menshend Project
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as querystring from "querystring";
import * as url from "url";

import * as isomorphicFetch from "isomorphic-fetch";
import * as assign from "core-js/library/fn/object/assign";

interface Dictionary<T> { [index: string]: T; }
export interface FetchAPI { (url: string, init?: any): Promise<any>; }

const BASE_PATH = "https://virtserver.swaggerhub.com/nebtex/Menshend/1.0.0".replace(/\/+$/, '');

export interface FetchArgs {
    url: string;
    options: any; 
}

export class BaseAPI {
    basePath: string;
    fetch: FetchAPI;

    constructor(fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) {
        this.basePath = basePath;
        this.fetch = fetch;
    }
}

export interface AdminService {
    "meta"?: Metadata;
    "strategy"?: AdminServiceStrategy;
    "resolver"?: AdminServiceResolver;
    "cache"?: ServiceCache;
    "impersonateWithinRole"?: boolean;
    "isActive"?: boolean;
    "fullUrl"?: string;
    "secretPaths"?: Array<string>;
}

export interface AdminServiceResolver {
    "lua"?: LuaResolver;
    "yaml"?: YAMLResolver;
}

export interface AdminServiceStrategy {
    "proxy"?: Proxy;
    "redirect"?: Redirect;
    "portForward"?: PortForward;
}

export interface ClientService {
    "meta"?: Metadata;
    "impersonateWithinRole"?: boolean;
    "fullUrl"?: string;
    "isActive"?: boolean;
    "secretPaths"?: Array<string>;
}

export interface Cors {
    "allowedOrigins"?: Array<string>;
    "allowedMethods"?: Array<string>;
    "allowedHeaders"?: Array<string>;
    "allowCredentials"?: boolean;
    "optionsPassthrough"?: boolean;
    "maxAge"?: number;
    "exposedHeaders"?: Array<string>;
}

export interface Flash {
    "flashes"?: Array<string>;
}

export interface InlineResponse500 {
    "message"?: string;
}

export interface LoginStatus {
    "isLogged"?: boolean;
    "isAdmin"?: boolean;
    "canImpersonate"?: boolean;
    "sessionExpiresAt"?: number;
}

export interface LongDescriptionLocal {
    "content"?: string;
}

export interface LongDescriptionRemote {
    "content"?: string;
    "url"?: string;
}

export interface LuaResolver {
    "content"?: string;
    "makeBodyAvailable"?: boolean;
}

export interface Metadata {
    "id"?: string;
    "roleId"?: string;
    "logo"?: string;
    "name"?: string;
    "description"?: string;
    "subDomain"?: string;
    "tags"?: Array<string>;
    "longDescription"?: MetadataLongDescription;
}

export interface MetadataLongDescription {
    "remote"?: LongDescriptionRemote;
    "local"?: LongDescriptionLocal;
}

export interface PortForward {
}

export interface Proxy {
    "cors"?: Cors;
    "csrf"?: boolean;
}

export interface Redirect {
}

/**
 * vault secret object
 */
export interface Secret {
    "requestId"?: string;
    "leaseDuration"?: number;
    "renewable"?: boolean;
    "data"?: any;
    "warnings"?: Array<string>;
    "wrapInfo"?: SecretWrapInfo;
    "auth"?: SecretAuth;
}

export interface SecretAuth {
    "clientToken"?: string;
    "accessor"?: string;
    "policies"?: Array<string>;
    "metadata"?: any;
    "leaseDuration"?: number;
    "renewable"?: boolean;
}

export interface SecretWrapInfo {
    "token"?: string;
    "ttl"?: number;
    "creationTime"?: number;
    "wrappedAccessor"?: string;
}

export interface ServiceCache {
    "ttl"?: number;
}

export interface Space {
    "logo"?: string;
    "name"?: string;
    "shortDescription"?: string;
    "longDescription"?: string;
    "host"?: string;
}

export interface YAMLResolver {
    "content"?: string;
}



/**
 * AdminApi - fetch parameter creator
 */
export const AdminApiFetchParamCreactor = {
    /** 
     * delete service
     * @param id service id
     */
    adminDeleteService(params: {  id: string; }): FetchArgs {
        // verify required parameter "id" is set
        if (params["id"] == null) {
            throw new Error("Missing required parameter id when calling adminDeleteService");
        }
        const baseUrl = `/v1/adminServices/{id}`
            .replace(`{${"id"}}`, `${ params.id }`);
        let urlObj = url.parse(baseUrl, true);
        let fetchOptions: RequestInit = { method: "DELETE" };

        let contentTypeHeader: Dictionary<string>;
        if (contentTypeHeader) {
            fetchOptions.headers = contentTypeHeader;
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /** 
     * returns all the available information of the service
     * @param id service id
     */
    adminGetService(params: {  id: string; }): FetchArgs {
        // verify required parameter "id" is set
        if (params["id"] == null) {
            throw new Error("Missing required parameter id when calling adminGetService");
        }
        const baseUrl = `/v1/adminServices/{id}`
            .replace(`{${"id"}}`, `${ params.id }`);
        let urlObj = url.parse(baseUrl, true);
        let fetchOptions: RequestInit = { method: "GET" };

        let contentTypeHeader: Dictionary<string>;
        if (contentTypeHeader) {
            fetchOptions.headers = contentTypeHeader;
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /** 
     * returns all the available information of the service over all the roles
     * @param subdomain subdomain
     */
    adminListService(params: {  subdomain: string; }): FetchArgs {
        // verify required parameter "subdomain" is set
        if (params["subdomain"] == null) {
            throw new Error("Missing required parameter subdomain when calling adminListService");
        }
        const baseUrl = `/v1/adminServices`;
        let urlObj = url.parse(baseUrl, true);
        urlObj.query = assign({}, urlObj.query, { 
            "subdomain": params.subdomain,
        });
        let fetchOptions: RequestInit = { method: "GET" };

        let contentTypeHeader: Dictionary<string>;
        if (contentTypeHeader) {
            fetchOptions.headers = contentTypeHeader;
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /** 
     * create a new service
     * @param id service id
     * @param body 
     */
    adminSaveService(params: {  id: string; body: AdminService; }): FetchArgs {
        // verify required parameter "id" is set
        if (params["id"] == null) {
            throw new Error("Missing required parameter id when calling adminSaveService");
        }
        // verify required parameter "body" is set
        if (params["body"] == null) {
            throw new Error("Missing required parameter body when calling adminSaveService");
        }
        const baseUrl = `/v1/adminServices/{id}`
            .replace(`{${"id"}}`, `${ params.id }`);
        let urlObj = url.parse(baseUrl, true);
        let fetchOptions: RequestInit = { method: "PUT" };

        let contentTypeHeader: Dictionary<string>;
        contentTypeHeader = { "Content-Type": "application/json" };
        if (params["body"]) {
            fetchOptions.body = JSON.stringify(params["body"] || {});
        }
        if (contentTypeHeader) {
            fetchOptions.headers = contentTypeHeader;
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
}

/**
 * AdminApi - functional programming interface
 */
export const AdminApiFp = {
    /** 
     * delete service
     * @param id service id
     */
    adminDeleteService(params: { id: string;  }): (fetch: FetchAPI, basePath?: string) => Promise<any> {
        const fetchArgs = AdminApiFetchParamCreactor.adminDeleteService(params);
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw response;
                }
            });
        };
    },
    /** 
     * returns all the available information of the service
     * @param id service id
     */
    adminGetService(params: { id: string;  }): (fetch: FetchAPI, basePath?: string) => Promise<AdminService> {
        const fetchArgs = AdminApiFetchParamCreactor.adminGetService(params);
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw response;
                }
            });
        };
    },
    /** 
     * returns all the available information of the service over all the roles
     * @param subdomain subdomain
     */
    adminListService(params: { subdomain: string;  }): (fetch: FetchAPI, basePath?: string) => Promise<Array<AdminService>> {
        const fetchArgs = AdminApiFetchParamCreactor.adminListService(params);
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw response;
                }
            });
        };
    },
    /** 
     * create a new service
     * @param id service id
     * @param body 
     */
    adminSaveService(params: { id: string; body: AdminService;  }): (fetch: FetchAPI, basePath?: string) => Promise<AdminService> {
        const fetchArgs = AdminApiFetchParamCreactor.adminSaveService(params);
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw response;
                }
            });
        };
    },
};

/**
 * AdminApi - object-oriented interface
 */
export class AdminApi extends BaseAPI {
    /** 
     * delete service
     * @param id service id
     */
    adminDeleteService(params: {  id: string; }) {
        return AdminApiFp.adminDeleteService(params)(this.fetch, this.basePath);
    }
    /** 
     * returns all the available information of the service
     * @param id service id
     */
    adminGetService(params: {  id: string; }) {
        return AdminApiFp.adminGetService(params)(this.fetch, this.basePath);
    }
    /** 
     * returns all the available information of the service over all the roles
     * @param subdomain subdomain
     */
    adminListService(params: {  subdomain: string; }) {
        return AdminApiFp.adminListService(params)(this.fetch, this.basePath);
    }
    /** 
     * create a new service
     * @param id service id
     * @param body 
     */
    adminSaveService(params: {  id: string; body: AdminService; }) {
        return AdminApiFp.adminSaveService(params)(this.fetch, this.basePath);
    }
};

/**
 * AdminApi - factory interface
 */
export const AdminApiFactory = function (fetch?: FetchAPI, basePath?: string) {
    return {
        /** 
         * delete service
         * @param id service id
         */
        adminDeleteService(params: {  id: string; }) {
            return AdminApiFp.adminDeleteService(params)(fetch, basePath);
        },
        /** 
         * returns all the available information of the service
         * @param id service id
         */
        adminGetService(params: {  id: string; }) {
            return AdminApiFp.adminGetService(params)(fetch, basePath);
        },
        /** 
         * returns all the available information of the service over all the roles
         * @param subdomain subdomain
         */
        adminListService(params: {  subdomain: string; }) {
            return AdminApiFp.adminListService(params)(fetch, basePath);
        },
        /** 
         * create a new service
         * @param id service id
         * @param body 
         */
        adminSaveService(params: {  id: string; body: AdminService; }) {
            return AdminApiFp.adminSaveService(params)(fetch, basePath);
        },
    }
};


/**
 * AuthApi - fetch parameter creator
 */
export const AuthApiFetchParamCreactor = {
    /** 
     * get login status
     */
    loginStatus(): FetchArgs {
        const baseUrl = `/v1/account`;
        let urlObj = url.parse(baseUrl, true);
        let fetchOptions: RequestInit = { method: "GET" };

        let contentTypeHeader: Dictionary<string>;
        if (contentTypeHeader) {
            fetchOptions.headers = contentTypeHeader;
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /** 
     * login off
     */
    logout(): FetchArgs {
        const baseUrl = `/v1/account`;
        let urlObj = url.parse(baseUrl, true);
        let fetchOptions: RequestInit = { method: "DELETE" };

        let contentTypeHeader: Dictionary<string>;
        if (contentTypeHeader) {
            fetchOptions.headers = contentTypeHeader;
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
}

/**
 * AuthApi - functional programming interface
 */
export const AuthApiFp = {
    /** 
     * get login status
     */
    loginStatus(): (fetch: FetchAPI, basePath?: string) => Promise<LoginStatus> {
        const fetchArgs = AuthApiFetchParamCreactor.loginStatus();
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw response;
                }
            });
        };
    },
    /** 
     * login off
     */
    logout(): (fetch: FetchAPI, basePath?: string) => Promise<LoginStatus> {
        const fetchArgs = AuthApiFetchParamCreactor.logout();
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw response;
                }
            });
        };
    },
};

/**
 * AuthApi - object-oriented interface
 */
export class AuthApi extends BaseAPI {
    /** 
     * get login status
     */
    loginStatus() {
        return AuthApiFp.loginStatus()(this.fetch, this.basePath);
    }
    /** 
     * login off
     */
    logout() {
        return AuthApiFp.logout()(this.fetch, this.basePath);
    }
};

/**
 * AuthApi - factory interface
 */
export const AuthApiFactory = function (fetch?: FetchAPI, basePath?: string) {
    return {
        /** 
         * get login status
         */
        loginStatus() {
            return AuthApiFp.loginStatus()(fetch, basePath);
        },
        /** 
         * login off
         */
        logout() {
            return AuthApiFp.logout()(fetch, basePath);
        },
    }
};


/**
 * ClientApi - fetch parameter creator
 */
export const ClientApiFetchParamCreactor = {
    /** 
     * list or search availables services
     * @param subdomain filter by subdomain
     * @param role filter by role
     */
    listAvailableServices(params: {  subdomain?: string; role?: string; }): FetchArgs {
        const baseUrl = `/v1/clientServices`;
        let urlObj = url.parse(baseUrl, true);
        urlObj.query = assign({}, urlObj.query, { 
            "subdomain": params.subdomain,
            "role": params.role,
        });
        let fetchOptions: RequestInit = { method: "GET" };

        let contentTypeHeader: Dictionary<string>;
        if (contentTypeHeader) {
            fetchOptions.headers = contentTypeHeader;
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
}

/**
 * ClientApi - functional programming interface
 */
export const ClientApiFp = {
    /** 
     * list or search availables services
     * @param subdomain filter by subdomain
     * @param role filter by role
     */
    listAvailableServices(params: { subdomain?: string; role?: string;  }): (fetch: FetchAPI, basePath?: string) => Promise<Array<ClientService>> {
        const fetchArgs = ClientApiFetchParamCreactor.listAvailableServices(params);
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw response;
                }
            });
        };
    },
};

/**
 * ClientApi - object-oriented interface
 */
export class ClientApi extends BaseAPI {
    /** 
     * list or search availables services
     * @param subdomain filter by subdomain
     * @param role filter by role
     */
    listAvailableServices(params: {  subdomain?: string; role?: string; }) {
        return ClientApiFp.listAvailableServices(params)(this.fetch, this.basePath);
    }
};

/**
 * ClientApi - factory interface
 */
export const ClientApiFactory = function (fetch?: FetchAPI, basePath?: string) {
    return {
        /** 
         * list or search availables services
         * @param subdomain filter by subdomain
         * @param role filter by role
         */
        listAvailableServices(params: {  subdomain?: string; role?: string; }) {
            return ClientApiFp.listAvailableServices(params)(fetch, basePath);
        },
    }
};


/**
 * FlashesApi - fetch parameter creator
 */
export const FlashesApiFetchParamCreactor = {
    /** 
     * list current flashes (only makes sense in browsers)
     */
    getFlashes(): FetchArgs {
        const baseUrl = `/v1/flashes`;
        let urlObj = url.parse(baseUrl, true);
        let fetchOptions: RequestInit = { method: "GET" };

        let contentTypeHeader: Dictionary<string>;
        if (contentTypeHeader) {
            fetchOptions.headers = contentTypeHeader;
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
}

/**
 * FlashesApi - functional programming interface
 */
export const FlashesApiFp = {
    /** 
     * list current flashes (only makes sense in browsers)
     */
    getFlashes(): (fetch: FetchAPI, basePath?: string) => Promise<Flash> {
        const fetchArgs = FlashesApiFetchParamCreactor.getFlashes();
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw response;
                }
            });
        };
    },
};

/**
 * FlashesApi - object-oriented interface
 */
export class FlashesApi extends BaseAPI {
    /** 
     * list current flashes (only makes sense in browsers)
     */
    getFlashes() {
        return FlashesApiFp.getFlashes()(this.fetch, this.basePath);
    }
};

/**
 * FlashesApi - factory interface
 */
export const FlashesApiFactory = function (fetch?: FetchAPI, basePath?: string) {
    return {
        /** 
         * list current flashes (only makes sense in browsers)
         */
        getFlashes() {
            return FlashesApiFp.getFlashes()(fetch, basePath);
        },
    }
};


/**
 * SecretsApi - fetch parameter creator
 */
export const SecretsApiFetchParamCreactor = {
    /** 
     * return secret associate with a service
     * @param id secret path
     */
    readSecret(params: {  id: string; }): FetchArgs {
        // verify required parameter "id" is set
        if (params["id"] == null) {
            throw new Error("Missing required parameter id when calling readSecret");
        }
        const baseUrl = `/v1/secret/{id}`
            .replace(`{${"id"}}`, `${ params.id }`);
        let urlObj = url.parse(baseUrl, true);
        let fetchOptions: RequestInit = { method: "GET" };

        let contentTypeHeader: Dictionary<string>;
        if (contentTypeHeader) {
            fetchOptions.headers = contentTypeHeader;
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
}

/**
 * SecretsApi - functional programming interface
 */
export const SecretsApiFp = {
    /** 
     * return secret associate with a service
     * @param id secret path
     */
    readSecret(params: { id: string;  }): (fetch: FetchAPI, basePath?: string) => Promise<Secret> {
        const fetchArgs = SecretsApiFetchParamCreactor.readSecret(params);
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw response;
                }
            });
        };
    },
};

/**
 * SecretsApi - object-oriented interface
 */
export class SecretsApi extends BaseAPI {
    /** 
     * return secret associate with a service
     * @param id secret path
     */
    readSecret(params: {  id: string; }) {
        return SecretsApiFp.readSecret(params)(this.fetch, this.basePath);
    }
};

/**
 * SecretsApi - factory interface
 */
export const SecretsApiFactory = function (fetch?: FetchAPI, basePath?: string) {
    return {
        /** 
         * return secret associate with a service
         * @param id secret path
         */
        readSecret(params: {  id: string; }) {
            return SecretsApiFp.readSecret(params)(fetch, basePath);
        },
    }
};


/**
 * SpaceApi - fetch parameter creator
 */
export const SpaceApiFetchParamCreactor = {
    /** 
     * get lab metadata (name, log, description)
     */
    getSpace(): FetchArgs {
        const baseUrl = `/v1/space`;
        let urlObj = url.parse(baseUrl, true);
        let fetchOptions: RequestInit = { method: "GET" };

        let contentTypeHeader: Dictionary<string>;
        if (contentTypeHeader) {
            fetchOptions.headers = contentTypeHeader;
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
}

/**
 * SpaceApi - functional programming interface
 */
export const SpaceApiFp = {
    /** 
     * get lab metadata (name, log, description)
     */
    getSpace(): (fetch: FetchAPI, basePath?: string) => Promise<Space> {
        const fetchArgs = SpaceApiFetchParamCreactor.getSpace();
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw response;
                }
            });
        };
    },
};

/**
 * SpaceApi - object-oriented interface
 */
export class SpaceApi extends BaseAPI {
    /** 
     * get lab metadata (name, log, description)
     */
    getSpace() {
        return SpaceApiFp.getSpace()(this.fetch, this.basePath);
    }
};

/**
 * SpaceApi - factory interface
 */
export const SpaceApiFactory = function (fetch?: FetchAPI, basePath?: string) {
    return {
        /** 
         * get lab metadata (name, log, description)
         */
        getSpace() {
            return SpaceApiFp.getSpace()(fetch, basePath);
        },
    }
};
