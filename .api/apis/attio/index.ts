import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'attio/2.0.0 (api/6.1.2)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Lists all system-defined and user-defined objects in your workspace.
   *
   * Required scopes: `object_configuration:read`.
   *
   * @summary List objects
   */
  getV2Objects(): Promise<FetchResponse<200, types.GetV2ObjectsResponse200>> {
    return this.core.fetch('/v2/objects', 'get');
  }

  /**
   * Creates a new custom object in your workspace.
   *
   * Required scopes: `object_configuration:read-write`.
   *
   * @summary Create an object
   * @throws FetchError<409, types.PostV2ObjectsResponse409> Conflict
   */
  postV2Objects(body: types.PostV2ObjectsBodyParam): Promise<FetchResponse<200, types.PostV2ObjectsResponse200>> {
    return this.core.fetch('/v2/objects', 'post', body);
  }

  /**
   * Gets a single object by its `object_id` or slug.
   *
   * Required scopes: `object_configuration:read`.
   *
   * @summary Get an object
   * @throws FetchError<404, types.GetV2ObjectsObjectResponse404> Not Found
   */
  getV2ObjectsObject(metadata: types.GetV2ObjectsObjectMetadataParam): Promise<FetchResponse<200, types.GetV2ObjectsObjectResponse200>> {
    return this.core.fetch('/v2/objects/{object}', 'get', metadata);
  }

  /**
   * Updates a single object. The object to be updated is identified by its `object_id`.
   *
   * Required scopes: `object_configuration:read-write`.
   *
   * @summary Update an object
   * @throws FetchError<400, types.PatchV2ObjectsObjectResponse400> Bad Request
   * @throws FetchError<404, types.PatchV2ObjectsObjectResponse404> Not Found
   * @throws FetchError<409, types.PatchV2ObjectsObjectResponse409> Conflict
   */
  patchV2ObjectsObject(body: types.PatchV2ObjectsObjectBodyParam, metadata: types.PatchV2ObjectsObjectMetadataParam): Promise<FetchResponse<200, types.PatchV2ObjectsObjectResponse200>> {
    return this.core.fetch('/v2/objects/{object}', 'patch', body, metadata);
  }

  /**
   * Lists all attributes defined on a specific object or list. Attributes are returned in
   * the order that they are sorted by in the UI.
   *
   * Required scopes: `object_configuration:read`.
   *
   * @summary List attributes
   */
  getV2TargetIdentifierAttributes(metadata: types.GetV2TargetIdentifierAttributesMetadataParam): Promise<FetchResponse<200, types.GetV2TargetIdentifierAttributesResponse200>> {
    return this.core.fetch('/v2/{target}/{identifier}/attributes', 'get', metadata);
  }

  /**
   * Creates a new attribute on either an object or a list.
   *
   * To create an attribute on an object, you must also have the
   * `object_configuration:read-write` scope.
   *
   * To create an attribute on a list, you must also have the `list_configuration:read-write`
   * scope.
   *
   * @summary Create an attribute
   * @throws FetchError<400, types.PostV2TargetIdentifierAttributesResponse400> Bad Request
   * @throws FetchError<404, types.PostV2TargetIdentifierAttributesResponse404> Not Found
   * @throws FetchError<409, types.PostV2TargetIdentifierAttributesResponse409> Conflict
   */
  postV2TargetIdentifierAttributes(body: types.PostV2TargetIdentifierAttributesBodyParam, metadata: types.PostV2TargetIdentifierAttributesMetadataParam): Promise<FetchResponse<200, types.PostV2TargetIdentifierAttributesResponse200>> {
    return this.core.fetch('/v2/{target}/{identifier}/attributes', 'post', body, metadata);
  }

  /**
   * Gets information about a single attribute on either an object or a list.
   *
   * Required scopes: `object_configuration:read`.
   *
   * @summary Get an attribute
   * @throws FetchError<404, types.GetV2TargetIdentifierAttributesAttributeResponse404> Not Found
   */
  getV2TargetIdentifierAttributesAttribute(metadata: types.GetV2TargetIdentifierAttributesAttributeMetadataParam): Promise<FetchResponse<200, types.GetV2TargetIdentifierAttributesAttributeResponse200>> {
    return this.core.fetch('/v2/{target}/{identifier}/attributes/{attribute}', 'get', metadata);
  }

  /**
   * Updates a single attribute on a given object or list.
   *
   * Required scopes: `object_configuration:read-write`.
   *
   * @summary Update an attribute
   * @throws FetchError<400, types.PatchV2TargetIdentifierAttributesAttributeResponse400> Bad Request
   * @throws FetchError<404, types.PatchV2TargetIdentifierAttributesAttributeResponse404> Not Found
   */
  patchV2TargetIdentifierAttributesAttribute(body: types.PatchV2TargetIdentifierAttributesAttributeBodyParam, metadata: types.PatchV2TargetIdentifierAttributesAttributeMetadataParam): Promise<FetchResponse<200, types.PatchV2TargetIdentifierAttributesAttributeResponse200>> {
    return this.core.fetch('/v2/{target}/{identifier}/attributes/{attribute}', 'patch', body, metadata);
  }

  /**
   * Lists all select options for a particular attribute on either an object or a list.
   *
   * Required scopes: `object_configuration:read`.
   *
   * @summary List select options
   * @throws FetchError<404, types.GetV2TargetIdentifierAttributesAttributeOptionsResponse404> Not Found
   */
  getV2TargetIdentifierAttributesAttributeOptions(metadata: types.GetV2TargetIdentifierAttributesAttributeOptionsMetadataParam): Promise<FetchResponse<200, types.GetV2TargetIdentifierAttributesAttributeOptionsResponse200>> {
    return this.core.fetch('/v2/{target}/{identifier}/attributes/{attribute}/options', 'get', metadata);
  }

  /**
   * Adds a select option to a select attribute on an object or a list.
   *
   * Required scopes: `object_configuration:read-write`.
   *
   * @summary Create a select option
   * @throws FetchError<400, types.PostV2TargetIdentifierAttributesAttributeOptionsResponse400> Bad Request
   * @throws FetchError<404, types.PostV2TargetIdentifierAttributesAttributeOptionsResponse404> Not Found
   * @throws FetchError<409, types.PostV2TargetIdentifierAttributesAttributeOptionsResponse409> Conflict
   */
  postV2TargetIdentifierAttributesAttributeOptions(body: types.PostV2TargetIdentifierAttributesAttributeOptionsBodyParam, metadata: types.PostV2TargetIdentifierAttributesAttributeOptionsMetadataParam): Promise<FetchResponse<200, types.PostV2TargetIdentifierAttributesAttributeOptionsResponse200>> {
    return this.core.fetch('/v2/{target}/{identifier}/attributes/{attribute}/options', 'post', body, metadata);
  }

  /**
   * Updates a select option on an attribute on either an object or a list.
   *
   * Required scopes: `object_configuration:read-write`.
   *
   * @summary Update a select option
   * @throws FetchError<400, types.PatchV2TargetIdentifierAttributesAttributeOptionsOptionResponse400> Bad Request
   * @throws FetchError<404, types.PatchV2TargetIdentifierAttributesAttributeOptionsOptionResponse404> Not Found
   * @throws FetchError<409, types.PatchV2TargetIdentifierAttributesAttributeOptionsOptionResponse409> Conflict
   */
  patchV2TargetIdentifierAttributesAttributeOptionsOption(body: types.PatchV2TargetIdentifierAttributesAttributeOptionsOptionBodyParam, metadata: types.PatchV2TargetIdentifierAttributesAttributeOptionsOptionMetadataParam): Promise<FetchResponse<200, types.PatchV2TargetIdentifierAttributesAttributeOptionsOptionResponse200>> {
    return this.core.fetch('/v2/{target}/{identifier}/attributes/{attribute}/options/{option}', 'patch', body, metadata);
  }

  /**
   * Lists all statuses for a particular status attribute on either an object or a list.
   *
   * Required scopes: `object_configuration:read`.
   *
   * @summary List statuses
   * @throws FetchError<404, types.GetV2TargetIdentifierAttributesAttributeStatusesResponse404> Not Found
   */
  getV2TargetIdentifierAttributesAttributeStatuses(metadata: types.GetV2TargetIdentifierAttributesAttributeStatusesMetadataParam): Promise<FetchResponse<200, types.GetV2TargetIdentifierAttributesAttributeStatusesResponse200>> {
    return this.core.fetch('/v2/{target}/{identifier}/attributes/{attribute}/statuses', 'get', metadata);
  }

  /**
   * Add a new status to a status attribute on either an object or a list.
   *
   * Required scopes: `object_configuration:read-write`.
   *
   * @summary Create a status
   * @throws FetchError<400, types.PostV2TargetIdentifierAttributesAttributeStatusesResponse400> Bad Request
   * @throws FetchError<404, types.PostV2TargetIdentifierAttributesAttributeStatusesResponse404> Not Found
   * @throws FetchError<409, types.PostV2TargetIdentifierAttributesAttributeStatusesResponse409> Conflict
   */
  postV2TargetIdentifierAttributesAttributeStatuses(body: types.PostV2TargetIdentifierAttributesAttributeStatusesBodyParam, metadata: types.PostV2TargetIdentifierAttributesAttributeStatusesMetadataParam): Promise<FetchResponse<200, types.PostV2TargetIdentifierAttributesAttributeStatusesResponse200>> {
    return this.core.fetch('/v2/{target}/{identifier}/attributes/{attribute}/statuses', 'post', body, metadata);
  }

  /**
   * Update a status on an status attribute on either an object or a list.
   *
   * Required scopes: `object_configuration:read-write`.
   *
   * @summary Update a status
   * @throws FetchError<400, types.PatchV2TargetIdentifierAttributesAttributeStatusesStatusResponse400> Bad Request
   * @throws FetchError<404, types.PatchV2TargetIdentifierAttributesAttributeStatusesStatusResponse404> Not Found
   * @throws FetchError<409, types.PatchV2TargetIdentifierAttributesAttributeStatusesStatusResponse409> Conflict
   */
  patchV2TargetIdentifierAttributesAttributeStatusesStatus(body: types.PatchV2TargetIdentifierAttributesAttributeStatusesStatusBodyParam, metadata: types.PatchV2TargetIdentifierAttributesAttributeStatusesStatusMetadataParam): Promise<FetchResponse<200, types.PatchV2TargetIdentifierAttributesAttributeStatusesStatusResponse200>> {
    return this.core.fetch('/v2/{target}/{identifier}/attributes/{attribute}/statuses/{status}', 'patch', body, metadata);
  }

  /**
   * Lists people, company or other records, with the option to filter and sort results.
   *
   * Required scopes: `record_permission:read`, `object_configuration:read`.
   *
   * @summary List records
   * @throws FetchError<400, types.PostV2ObjectsObjectRecordsQueryResponse400> Bad Request
   * @throws FetchError<404, types.PostV2ObjectsObjectRecordsQueryResponse404> Not Found
   */
  postV2ObjectsObjectRecordsQuery(body: types.PostV2ObjectsObjectRecordsQueryBodyParam, metadata: types.PostV2ObjectsObjectRecordsQueryMetadataParam): Promise<FetchResponse<200, types.PostV2ObjectsObjectRecordsQueryResponse200>> {
    return this.core.fetch('/v2/objects/{object}/records/query', 'post', body, metadata);
  }

  /**
   * Creates a new person, company or other record. This endpoint will throw on conflicts of
   * unique attributes. If you would prefer to update records on conflicts, please use the
   * [Assert record endpoint](/reference/put_v2-objects-object-records) instead.
   *
   * Required scopes: `record_permission:read-write`, `object_configuration:read`.
   *
   * @summary Create a record
   * @throws FetchError<400, types.PostV2ObjectsObjectRecordsResponse400> Bad Request
   * @throws FetchError<404, types.PostV2ObjectsObjectRecordsResponse404> Not Found
   */
  postV2ObjectsObjectRecords(body: types.PostV2ObjectsObjectRecordsBodyParam, metadata: types.PostV2ObjectsObjectRecordsMetadataParam): Promise<FetchResponse<200, types.PostV2ObjectsObjectRecordsResponse200>> {
    return this.core.fetch('/v2/objects/{object}/records', 'post', body, metadata);
  }

  /**
   * Use this endpoint to create or update people, companies and other records. A matching
   * attribute is used to search for existing records. If a record is found with the same
   * value for the matching attribute, that record will be updated. If no record with the
   * same value for the matching attribute is found, a new record will be created instead. If
   * you would like to avoid matching, please use the [Create record
   * endpoint](/reference/post_v2-objects-object-records).
   *
   * If the matching attribute is a multiselect attribute, new values will be added and
   * existing values will not be deleted. For any other multiselect attribute, all values
   * will be either created or deleted as necessary to match the list of supplied values.
   *
   * Required scopes: `record_permission:read-write`, `object_configuration:read`.
   *
   * @summary Assert a record
   * @throws FetchError<400, types.PutV2ObjectsObjectRecordsResponse400> Bad Request
   * @throws FetchError<404, types.PutV2ObjectsObjectRecordsResponse404> Not Found
   */
  putV2ObjectsObjectRecords(body: types.PutV2ObjectsObjectRecordsBodyParam, metadata: types.PutV2ObjectsObjectRecordsMetadataParam): Promise<FetchResponse<200, types.PutV2ObjectsObjectRecordsResponse200>> {
    return this.core.fetch('/v2/objects/{object}/records', 'put', body, metadata);
  }

  /**
   * Gets a single person, company or other record by its `record_id`.
   *
   * Required scopes: `record_permission:read`, `object_configuration:read`.
   *
   * @summary Get a record
   * @throws FetchError<404, types.GetV2ObjectsObjectRecordsRecordIdResponse404> Not Found
   */
  getV2ObjectsObjectRecordsRecord_id(metadata: types.GetV2ObjectsObjectRecordsRecordIdMetadataParam): Promise<FetchResponse<200, types.GetV2ObjectsObjectRecordsRecordIdResponse200>> {
    return this.core.fetch('/v2/objects/{object}/records/{record_id}', 'get', metadata);
  }

  /**
   * Use this endpoint to update people, companies and other records by `record_id`. If the
   * update payload includes multiselect attributes, the values supplied will be created and
   * prepended to the list of values that already exist (if any). Use the [Assert record
   * endpoint](/reference/put_v2-objects-object-records) to overwrite or remove multiselect
   * attribute values.
   *
   * Required scopes: `record_permission:read-write`, `object_configuration:read`.
   *
   * @summary Update a record
   * @throws FetchError<400, types.PatchV2ObjectsObjectRecordsRecordIdResponse400> Bad Request
   * @throws FetchError<404, types.PatchV2ObjectsObjectRecordsRecordIdResponse404> Not Found
   */
  patchV2ObjectsObjectRecordsRecord_id(body: types.PatchV2ObjectsObjectRecordsRecordIdBodyParam, metadata: types.PatchV2ObjectsObjectRecordsRecordIdMetadataParam): Promise<FetchResponse<200, types.PatchV2ObjectsObjectRecordsRecordIdResponse200>> {
    return this.core.fetch('/v2/objects/{object}/records/{record_id}', 'patch', body, metadata);
  }

  /**
   * Deletes a single record (e.g. a company or person) by ID.
   *
   * Required scopes: `object_configuration:read`, `record_permission:read-write`.
   *
   * @summary Delete a record
   * @throws FetchError<404, types.DeleteV2ObjectsObjectRecordsRecordIdResponse404> Not Found
   */
  deleteV2ObjectsObjectRecordsRecord_id(metadata: types.DeleteV2ObjectsObjectRecordsRecordIdMetadataParam): Promise<FetchResponse<200, types.DeleteV2ObjectsObjectRecordsRecordIdResponse200>> {
    return this.core.fetch('/v2/objects/{object}/records/{record_id}', 'delete', metadata);
  }

  /**
   * Gets all values for a given attribute on a record. If the attribute is historic, this
   * endpoint has the ability to return all historic values using the `show_historic` query
   * param.
   *
   * Required scopes: `record_permission:read`, `object_configuration:read`.
   *
   * @summary List record attribute values
   * @throws FetchError<400, types.GetV2ObjectsObjectRecordsRecordIdAttributesAttributeValuesResponse400> Bad Request
   * @throws FetchError<404, types.GetV2ObjectsObjectRecordsRecordIdAttributesAttributeValuesResponse404> Not Found
   */
  getV2ObjectsObjectRecordsRecord_idAttributesAttributeValues(metadata: types.GetV2ObjectsObjectRecordsRecordIdAttributesAttributeValuesMetadataParam): Promise<FetchResponse<200, types.GetV2ObjectsObjectRecordsRecordIdAttributesAttributeValuesResponse200>> {
    return this.core.fetch('/v2/objects/{object}/records/{record_id}/attributes/{attribute}/values', 'get', metadata);
  }

  /**
   * List all entries, across all lists, for which this record is the parent.
   *
   * Required scopes: `record_permission:read`, `object_configuration:read`,
   * `list_entry:read`.
   *
   * @summary List record entries
   */
  getV2ObjectsObjectRecordsRecord_idEntries(metadata: types.GetV2ObjectsObjectRecordsRecordIdEntriesMetadataParam): Promise<FetchResponse<200, types.GetV2ObjectsObjectRecordsRecordIdEntriesResponse200>> {
    return this.core.fetch('/v2/objects/{object}/records/{record_id}/entries', 'get', metadata);
  }

  /**
   * List all lists that your access token has access to. lists are returned in the order
   * that they are sorted in the sidebar.
   *
   * Required scopes: `list_configuration:read`.
   *
   * @summary List all lists
   */
  getV2Lists(): Promise<FetchResponse<200, types.GetV2ListsResponse200>> {
    return this.core.fetch('/v2/lists', 'get');
  }

  /**
   * Creates a new list.
   *
   * Once you have your list, add attributes to it using the [Create
   * attribute](/reference/post_v2-target-identifier-attributes) API, and add records to it
   * using the [Add records to list](/reference/post_v2-lists-list-entries) API. 
   *
   * New lists must specify which records can be added with the `parent_object` parameter
   * which accepts either an object slug or an object ID. Permissions for the list are
   * controlled with the `workspace_access` and `workspace_member_access` parameters.
   *
   * Please note that new lists must have either `workspace_access` set to `"full-access"` or
   * one or more element of `workspace_member_access` with a `"full-access"` level. It is
   * also possible to receive a `403` billing error if your workspace is not on a plan that
   * supports either advanced workspace or workspace member-level access for lists.
   *
   * Required scopes: `list_configuration:read-write`.
   *
   * @summary Create a list
   * @throws FetchError<400, types.PostV2ListsResponse400> Bad Request
   * @throws FetchError<403, types.PostV2ListsResponse403> Forbidden
   * @throws FetchError<404, types.PostV2ListsResponse404> Not Found
   */
  postV2Lists(body: types.PostV2ListsBodyParam): Promise<FetchResponse<200, types.PostV2ListsResponse200>> {
    return this.core.fetch('/v2/lists', 'post', body);
  }

  /**
   * Gets a single list in your workspace that your access token has access to.
   *
   * Required scopes: `list_configuration:read`.
   *
   * @summary Get a list
   * @throws FetchError<404, types.GetV2ListsListResponse404> Not Found
   */
  getV2ListsList(metadata: types.GetV2ListsListMetadataParam): Promise<FetchResponse<200, types.GetV2ListsListResponse200>> {
    return this.core.fetch('/v2/lists/{list}', 'get', metadata);
  }

  /**
   * Updates an existing list. Permissions for the list are controlled with the
   * `workspace_access` and `workspace_member_access` parameters. Please note that lists must
   * have either `workspace_access` set to `"full-access"` or one or more element of
   * `workspace_member_access` with a `"full-access"` level. It is also possible to receive a
   * `403` billing error if your workspace is not on a plan that supports either advanced
   * workspace or workspace member level access for lists. Changing the parent object of a
   * list is not possible through the API as it can have unintended side-effects that should
   * be considered carefully. If you wish to carry out a parent object change you should do
   * so through the UI.
   *
   * Required scopes: `list_configuration:read-write`.
   *
   * @summary Update a list
   * @throws FetchError<400, types.PatchV2ListsListResponse400> Bad Request
   * @throws FetchError<404, types.PatchV2ListsListResponse404> Not Found
   */
  patchV2ListsList(body: types.PatchV2ListsListBodyParam, metadata: types.PatchV2ListsListMetadataParam): Promise<FetchResponse<200, types.PatchV2ListsListResponse200>> {
    return this.core.fetch('/v2/lists/{list}', 'patch', body, metadata);
  }

  /**
   * Lists entries in a given list, with the option to filter and sort results.
   *
   * Required scopes: `list_entry:read`, `list_configuration:read`.
   *
   * @summary List entries
   * @throws FetchError<404, types.PostV2ListsListEntriesQueryResponse404> Not Found
   */
  postV2ListsListEntriesQuery(body: types.PostV2ListsListEntriesQueryBodyParam, metadata: types.PostV2ListsListEntriesQueryMetadataParam): Promise<FetchResponse<200, types.PostV2ListsListEntriesQueryResponse200>> {
    return this.core.fetch('/v2/lists/{list}/entries/query', 'post', body, metadata);
  }

  /**
   * Adds a record to a list as a new list entry. This endpoint will throw on conflicts of
   * unique attributes. Multiple list entries are allowed for the same parent record
   *
   * Required scopes: `list_entry:read-write`, `list_configuration:read`.
   *
   * @summary Create an entry (add record to list)
   * @throws FetchError<400, types.PostV2ListsListEntriesResponse400> Bad Request
   * @throws FetchError<404, types.PostV2ListsListEntriesResponse404> Not Found
   */
  postV2ListsListEntries(body: types.PostV2ListsListEntriesBodyParam, metadata: types.PostV2ListsListEntriesMetadataParam): Promise<FetchResponse<200, types.PostV2ListsListEntriesResponse200>> {
    return this.core.fetch('/v2/lists/{list}/entries', 'post', body, metadata);
  }

  /**
   * Use this endpoint to create or update a list entry for a given parent record. If an
   * entry with the specified parent record is found, that entry will be updated. If no such
   * entry is found, a new entry will be created instead. If there are multiple entries with
   * the same parent record, this endpoint with return the "MULTIPLE_MATCH_RESULTS" error.
   * When writing to multi-select attributes, all values will be either created or deleted as
   * necessary to match the list of values supplied in the request body.
   *
   * Required scopes: `list_entry:read-write`, `list_configuration:read`.
   *
   * @summary Assert a list entry by parent
   * @throws FetchError<400, types.PutV2ListsListEntriesResponse400> Bad Request
   * @throws FetchError<404, types.PutV2ListsListEntriesResponse404> Not Found
   */
  putV2ListsListEntries(body: types.PutV2ListsListEntriesBodyParam, metadata: types.PutV2ListsListEntriesMetadataParam): Promise<FetchResponse<200, types.PutV2ListsListEntriesResponse200>> {
    return this.core.fetch('/v2/lists/{list}/entries', 'put', body, metadata);
  }

  /**
   * Gets a single list entry by its `entry_id`.
   *
   * Required scopes: `list_entry:read`, `list_configuration:read`.
   *
   * @summary Get a list entry
   * @throws FetchError<404, types.GetV2ListsListEntriesEntryIdResponse404> Not Found
   */
  getV2ListsListEntriesEntry_id(metadata: types.GetV2ListsListEntriesEntryIdMetadataParam): Promise<FetchResponse<200, types.GetV2ListsListEntriesEntryIdResponse200>> {
    return this.core.fetch('/v2/lists/{list}/entries/{entry_id}', 'get', metadata);
  }

  /**
   * Use this endpoint to update list entries by `entry_id`. If the update payload includes
   * multiselect attributes, the values supplied will be created and prepended to the list of
   * values that already exist (if any). Use the `PUT` endpoint to overwrite or remove
   * multiselect attribute values.
   *
   * Required scopes: `list_entry:read-write`, `list_configuration:read`.
   *
   * @summary Update a list entry (append multiselect values)
   * @throws FetchError<400, types.PatchV2ListsListEntriesEntryIdResponse400> Bad Request
   * @throws FetchError<404, types.PatchV2ListsListEntriesEntryIdResponse404> Not Found
   */
  patchV2ListsListEntriesEntry_id(body: types.PatchV2ListsListEntriesEntryIdBodyParam, metadata: types.PatchV2ListsListEntriesEntryIdMetadataParam): Promise<FetchResponse<200, types.PatchV2ListsListEntriesEntryIdResponse200>> {
    return this.core.fetch('/v2/lists/{list}/entries/{entry_id}', 'patch', body, metadata);
  }

  /**
   * Use this endpoint to update list entries by `entry_id`. If the update payload includes
   * multiselect attributes, the values supplied will overwrite/remove the list of values
   * that already exist (if any). Use the `PATCH` endpoint to add multiselect attribute
   * values without removing those value that already exist.
   *
   * Required scopes: `list_entry:read-write`, `list_configuration:read`.
   *
   * @summary Update a list entry (overwrite multiselect values)
   * @throws FetchError<400, types.PutV2ListsListEntriesEntryIdResponse400> Bad Request
   * @throws FetchError<404, types.PutV2ListsListEntriesEntryIdResponse404> Not Found
   */
  putV2ListsListEntriesEntry_id(body: types.PutV2ListsListEntriesEntryIdBodyParam, metadata: types.PutV2ListsListEntriesEntryIdMetadataParam): Promise<FetchResponse<200, types.PutV2ListsListEntriesEntryIdResponse200>> {
    return this.core.fetch('/v2/lists/{list}/entries/{entry_id}', 'put', body, metadata);
  }

  /**
   * Deletes a single list entry by its `entry_id`.
   *
   * Required scopes: `list_entry:read-write`, `list_configuration:read`.
   *
   * @summary Delete a list entry
   * @throws FetchError<404, types.DeleteV2ListsListEntriesEntryIdResponse404> Not Found
   */
  deleteV2ListsListEntriesEntry_id(metadata: types.DeleteV2ListsListEntriesEntryIdMetadataParam): Promise<FetchResponse<200, types.DeleteV2ListsListEntriesEntryIdResponse200>> {
    return this.core.fetch('/v2/lists/{list}/entries/{entry_id}', 'delete', metadata);
  }

  /**
   * Gets all values for a given attribute on a list entry. If the attribute is historic,
   * this endpoint has the ability to return all historic values using the `show_historic`
   * query param.
   *
   * Required scopes: `list_entry:read`, `list_configuration:read`.
   *
   * @summary List attribute values for a list entry
   * @throws FetchError<400, types.GetV2ListsListEntriesEntryIdAttributesAttributeValuesResponse400> Bad Request
   * @throws FetchError<404, types.GetV2ListsListEntriesEntryIdAttributesAttributeValuesResponse404> Not Found
   */
  getV2ListsListEntriesEntry_idAttributesAttributeValues(metadata: types.GetV2ListsListEntriesEntryIdAttributesAttributeValuesMetadataParam): Promise<FetchResponse<200, types.GetV2ListsListEntriesEntryIdAttributesAttributeValuesResponse200>> {
    return this.core.fetch('/v2/lists/{list}/entries/{entry_id}/attributes/{attribute}/values', 'get', metadata);
  }

  /**
   * Lists all workspace members in the workspace.
   *
   * Required scopes: `user_management:read`.
   *
   * @summary List workspace members
   */
  getV2Workspace_members(): Promise<FetchResponse<200, types.GetV2WorkspaceMembersResponse200>> {
    return this.core.fetch('/v2/workspace_members', 'get');
  }

  /**
   * Gets a single workspace member by ID.
   *
   * Required scopes: `user_management:read`.
   *
   * @summary Get a workspace member
   * @throws FetchError<404, types.GetV2WorkspaceMembersWorkspaceMemberIdResponse404> Not Found
   */
  getV2Workspace_membersWorkspace_member_id(metadata: types.GetV2WorkspaceMembersWorkspaceMemberIdMetadataParam): Promise<FetchResponse<200, types.GetV2WorkspaceMembersWorkspaceMemberIdResponse200>> {
    return this.core.fetch('/v2/workspace_members/{workspace_member_id}', 'get', metadata);
  }

  /**
   * List notes for all records or for a specific record.
   *
   * Required scopes: `note:read`, `object_configuration:read`, `record_permission:read`.
   *
   * @summary List notes
   * @throws FetchError<404, types.GetV2NotesResponse404> Not Found
   */
  getV2Notes(metadata?: types.GetV2NotesMetadataParam): Promise<FetchResponse<200, types.GetV2NotesResponse200>> {
    return this.core.fetch('/v2/notes', 'get', metadata);
  }

  /**
   * Creates a new note for a given record.
   *
   * At present, notes can only be created from plaintext without formatting.
   *
   * Required scopes: `note:read-write`, `object_configuration:read`,
   * `record_permission:read`.
   *
   * @summary Create a note
   * @throws FetchError<404, types.PostV2NotesResponse404> Not Found
   */
  postV2Notes(body: types.PostV2NotesBodyParam): Promise<FetchResponse<200, types.PostV2NotesResponse200>> {
    return this.core.fetch('/v2/notes', 'post', body);
  }

  /**
   * Get a single note by ID.
   *
   * Required scopes: `note:read`, `object_configuration:read`, `record_permission:read`.
   *
   * @summary Get a note
   * @throws FetchError<404, types.GetV2NotesNoteIdResponse404> Not Found
   */
  getV2NotesNote_id(metadata: types.GetV2NotesNoteIdMetadataParam): Promise<FetchResponse<200, types.GetV2NotesNoteIdResponse200>> {
    return this.core.fetch('/v2/notes/{note_id}', 'get', metadata);
  }

  /**
   * Delete a single note by ID.
   *
   * Required scopes: `note:read-write`.
   *
   * @summary Delete a note
   * @throws FetchError<404, types.DeleteV2NotesNoteIdResponse404> Not Found
   */
  deleteV2NotesNote_id(metadata: types.DeleteV2NotesNoteIdMetadataParam): Promise<FetchResponse<200, types.DeleteV2NotesNoteIdResponse200>> {
    return this.core.fetch('/v2/notes/{note_id}', 'delete', metadata);
  }

  /**
   * List all tasks. Results are sorted by creation date, from oldest to newest.
   *
   * Required scopes: `task:read`, `object_configuration:read`, `record_permission:read`,
   * `user_management:read`.
   *
   * @summary List tasks
   */
  getV2Tasks(metadata?: types.GetV2TasksMetadataParam): Promise<FetchResponse<200, types.GetV2TasksResponse200>> {
    return this.core.fetch('/v2/tasks', 'get', metadata);
  }

  /**
   * Creates a new task.
   *
   * At present, tasks can only be created from plaintext without record reference
   * formatting.
   *
   * Required scopes: `task:read-write`, `object_configuration:read`,
   * `record_permission:read`, `user_management:read`.
   *
   * @summary Create a task
   * @throws FetchError<400, types.PostV2TasksResponse400> Bad Request
   * @throws FetchError<404, types.PostV2TasksResponse404> Not Found
   */
  postV2Tasks(body: types.PostV2TasksBodyParam): Promise<FetchResponse<200, types.PostV2TasksResponse200>> {
    return this.core.fetch('/v2/tasks', 'post', body);
  }

  /**
   * Get a single task by ID.
   *
   * Required scopes: `task:read`, `object_configuration:read`, `record_permission:read`,
   * `user_management:read`.
   *
   * @summary Get a task
   * @throws FetchError<404, types.GetV2TasksTaskIdResponse404> Not Found
   */
  getV2TasksTask_id(metadata: types.GetV2TasksTaskIdMetadataParam): Promise<FetchResponse<200, types.GetV2TasksTaskIdResponse200>> {
    return this.core.fetch('/v2/tasks/{task_id}', 'get', metadata);
  }

  /**
   * Updates an existing task by `task_id`. At present, only the `deadline_at`,
   * `is_completed`, `linked_records`, and `assignees` fields can be updated.
   *
   * Required scopes: `task:read-write`, `object_configuration:read`,
   * `record_permission:read`, `user_management:read`.
   *
   * @summary Update a task
   * @throws FetchError<400, types.PatchV2TasksTaskIdResponse400> Bad Request
   * @throws FetchError<404, types.PatchV2TasksTaskIdResponse404> Not Found
   */
  patchV2TasksTask_id(body: types.PatchV2TasksTaskIdBodyParam, metadata: types.PatchV2TasksTaskIdMetadataParam): Promise<FetchResponse<200, types.PatchV2TasksTaskIdResponse200>> {
    return this.core.fetch('/v2/tasks/{task_id}', 'patch', body, metadata);
  }

  /**
   * Delete a task by ID.
   *
   * Required scopes: `task:read-write`.
   *
   * @summary Delete a task
   * @throws FetchError<404, types.DeleteV2TasksTaskIdResponse404> Not Found
   */
  deleteV2TasksTask_id(metadata: types.DeleteV2TasksTaskIdMetadataParam): Promise<FetchResponse<200, types.DeleteV2TasksTaskIdResponse200>> {
    return this.core.fetch('/v2/tasks/{task_id}', 'delete', metadata);
  }

  /**
   * List threads of comments on a record or list entry.
   *
   * To view threads on records, you will need the `object_configuration:read` and
   * `record_permission:read` scopes.
   *
   * To view threads on list entries, you will need the `list_configuration:read` and
   * `list_entry:read` scopes.
   *
   * Required scopes: `comment:read`.
   *
   * @summary List threads
   */
  getV2Threads(metadata?: types.GetV2ThreadsMetadataParam): Promise<FetchResponse<200, types.GetV2ThreadsResponse200>> {
    return this.core.fetch('/v2/threads', 'get', metadata);
  }

  /**
   * Get all comments in a thread.
   *
   * To view threads on records, you will need the `object_configuration:read` and
   * `record_permission:read` scopes.
   *
   * To view threads on list entries, you will need the `list_configuration:read` and
   * `list_entry:read` scopes.
   *
   * Required scopes: `comment:read`.
   *
   * @summary Get a thread
   * @throws FetchError<404, types.GetV2ThreadsThreadIdResponse404> Not Found
   */
  getV2ThreadsThread_id(metadata: types.GetV2ThreadsThreadIdMetadataParam): Promise<FetchResponse<200, types.GetV2ThreadsThreadIdResponse200>> {
    return this.core.fetch('/v2/threads/{thread_id}', 'get', metadata);
  }

  /**
   * Creates a new comment related to an existing thread, record or entry.
   *
   * To create comments on records, you will need the `object_configuration:read` and
   * `record_permission:read` scopes.
   *
   * To create comments on list entries, you will need the `list_configuration:read` and
   * `list_entry:read` scopes.
   *
   * Required scopes: `comment:read-write`.
   *
   * @summary Create a comment
   * @throws FetchError<400, types.PostV2CommentsResponse400> Bad Request
   */
  postV2Comments(body: types.PostV2CommentsBodyParam): Promise<FetchResponse<200, types.PostV2CommentsResponse200>> {
    return this.core.fetch('/v2/comments', 'post', body);
  }

  /**
   * Get a single comment by ID.
   *
   * To view comments on records, you will need the `object_configuration:read` and
   * `record_permission:read` scopes.
   *
   * To view comments on list entries, you will need the `list_configuration:read` and
   * `list_entry:read` scopes.
   *
   * Required scopes: `comment:read`.
   *
   * @summary Get a comment
   * @throws FetchError<404, types.GetV2CommentsCommentIdResponse404> Not Found
   */
  getV2CommentsComment_id(metadata: types.GetV2CommentsCommentIdMetadataParam): Promise<FetchResponse<200, types.GetV2CommentsCommentIdResponse200>> {
    return this.core.fetch('/v2/comments/{comment_id}', 'get', metadata);
  }

  /**
   * Deletes a comment by ID. If deleting a comment at the head of a thread, all messages in
   * the thread are also deleted.
   *
   * Required scopes: `comment:read-write`.
   *
   * @summary Delete a comment
   * @throws FetchError<404, types.DeleteV2CommentsCommentIdResponse404> Not Found
   */
  deleteV2CommentsComment_id(metadata: types.DeleteV2CommentsCommentIdMetadataParam): Promise<FetchResponse<200, types.DeleteV2CommentsCommentIdResponse200>> {
    return this.core.fetch('/v2/comments/{comment_id}', 'delete', metadata);
  }

  /**
   * Get all of the webhooks in your workspace.
   *
   * Required scopes: `webhook:read`.
   *
   * @summary List webhooks
   */
  getV2Webhooks(metadata?: types.GetV2WebhooksMetadataParam): Promise<FetchResponse<200, types.GetV2WebhooksResponse200>> {
    return this.core.fetch('/v2/webhooks', 'get', metadata);
  }

  /**
   * Create a webhook and associated subscriptions.
   *
   * Required scopes: `webhook:read-write`.
   *
   * @summary Create a webhook
   * @throws FetchError<400, types.PostV2WebhooksResponse400> Bad Request
   */
  postV2Webhooks(body: types.PostV2WebhooksBodyParam): Promise<FetchResponse<200, types.PostV2WebhooksResponse200>> {
    return this.core.fetch('/v2/webhooks', 'post', body);
  }

  /**
   * Get a single webhook.
   *
   * Required scopes: `webhook:read`.
   *
   * @summary Get a webhook
   * @throws FetchError<404, types.GetV2WebhooksWebhookIdResponse404> Not Found
   */
  getV2WebhooksWebhook_id(metadata: types.GetV2WebhooksWebhookIdMetadataParam): Promise<FetchResponse<200, types.GetV2WebhooksWebhookIdResponse200>> {
    return this.core.fetch('/v2/webhooks/{webhook_id}', 'get', metadata);
  }

  /**
   * Update a webhook and associated subscriptions.
   *
   * Required scopes: `webhook:read-write`.
   *
   * @summary Update a webhook
   * @throws FetchError<404, types.PatchV2WebhooksWebhookIdResponse404> Not Found
   */
  patchV2WebhooksWebhook_id(body: types.PatchV2WebhooksWebhookIdBodyParam, metadata: types.PatchV2WebhooksWebhookIdMetadataParam): Promise<FetchResponse<200, types.PatchV2WebhooksWebhookIdResponse200>> {
    return this.core.fetch('/v2/webhooks/{webhook_id}', 'patch', body, metadata);
  }

  /**
   * Delete a webhook by ID.
   *
   * Required scopes: `webhook:read-write`.
   *
   * @summary Delete a webhook
   * @throws FetchError<404, types.DeleteV2WebhooksWebhookIdResponse404> Not Found
   */
  deleteV2WebhooksWebhook_id(metadata: types.DeleteV2WebhooksWebhookIdMetadataParam): Promise<FetchResponse<200, types.DeleteV2WebhooksWebhookIdResponse200>> {
    return this.core.fetch('/v2/webhooks/{webhook_id}', 'delete', metadata);
  }

  /**
   * Identify the current access token, the workspace it is linked to, and any permissions it
   * has.
   *
   * @summary Identify
   */
  getV2Self(): Promise<FetchResponse<200, types.GetV2SelfResponse200>> {
    return this.core.fetch('/v2/self', 'get');
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { DeleteV2CommentsCommentIdMetadataParam, DeleteV2CommentsCommentIdResponse200, DeleteV2CommentsCommentIdResponse404, DeleteV2ListsListEntriesEntryIdMetadataParam, DeleteV2ListsListEntriesEntryIdResponse200, DeleteV2ListsListEntriesEntryIdResponse404, DeleteV2NotesNoteIdMetadataParam, DeleteV2NotesNoteIdResponse200, DeleteV2NotesNoteIdResponse404, DeleteV2ObjectsObjectRecordsRecordIdMetadataParam, DeleteV2ObjectsObjectRecordsRecordIdResponse200, DeleteV2ObjectsObjectRecordsRecordIdResponse404, DeleteV2TasksTaskIdMetadataParam, DeleteV2TasksTaskIdResponse200, DeleteV2TasksTaskIdResponse404, DeleteV2WebhooksWebhookIdMetadataParam, DeleteV2WebhooksWebhookIdResponse200, DeleteV2WebhooksWebhookIdResponse404, GetV2CommentsCommentIdMetadataParam, GetV2CommentsCommentIdResponse200, GetV2CommentsCommentIdResponse404, GetV2ListsListEntriesEntryIdAttributesAttributeValuesMetadataParam, GetV2ListsListEntriesEntryIdAttributesAttributeValuesResponse200, GetV2ListsListEntriesEntryIdAttributesAttributeValuesResponse400, GetV2ListsListEntriesEntryIdAttributesAttributeValuesResponse404, GetV2ListsListEntriesEntryIdMetadataParam, GetV2ListsListEntriesEntryIdResponse200, GetV2ListsListEntriesEntryIdResponse404, GetV2ListsListMetadataParam, GetV2ListsListResponse200, GetV2ListsListResponse404, GetV2ListsResponse200, GetV2NotesMetadataParam, GetV2NotesNoteIdMetadataParam, GetV2NotesNoteIdResponse200, GetV2NotesNoteIdResponse404, GetV2NotesResponse200, GetV2NotesResponse404, GetV2ObjectsObjectMetadataParam, GetV2ObjectsObjectRecordsRecordIdAttributesAttributeValuesMetadataParam, GetV2ObjectsObjectRecordsRecordIdAttributesAttributeValuesResponse200, GetV2ObjectsObjectRecordsRecordIdAttributesAttributeValuesResponse400, GetV2ObjectsObjectRecordsRecordIdAttributesAttributeValuesResponse404, GetV2ObjectsObjectRecordsRecordIdEntriesMetadataParam, GetV2ObjectsObjectRecordsRecordIdEntriesResponse200, GetV2ObjectsObjectRecordsRecordIdMetadataParam, GetV2ObjectsObjectRecordsRecordIdResponse200, GetV2ObjectsObjectRecordsRecordIdResponse404, GetV2ObjectsObjectResponse200, GetV2ObjectsObjectResponse404, GetV2ObjectsResponse200, GetV2SelfResponse200, GetV2TargetIdentifierAttributesAttributeMetadataParam, GetV2TargetIdentifierAttributesAttributeOptionsMetadataParam, GetV2TargetIdentifierAttributesAttributeOptionsResponse200, GetV2TargetIdentifierAttributesAttributeOptionsResponse404, GetV2TargetIdentifierAttributesAttributeResponse200, GetV2TargetIdentifierAttributesAttributeResponse404, GetV2TargetIdentifierAttributesAttributeStatusesMetadataParam, GetV2TargetIdentifierAttributesAttributeStatusesResponse200, GetV2TargetIdentifierAttributesAttributeStatusesResponse404, GetV2TargetIdentifierAttributesMetadataParam, GetV2TargetIdentifierAttributesResponse200, GetV2TasksMetadataParam, GetV2TasksResponse200, GetV2TasksTaskIdMetadataParam, GetV2TasksTaskIdResponse200, GetV2TasksTaskIdResponse404, GetV2ThreadsMetadataParam, GetV2ThreadsResponse200, GetV2ThreadsThreadIdMetadataParam, GetV2ThreadsThreadIdResponse200, GetV2ThreadsThreadIdResponse404, GetV2WebhooksMetadataParam, GetV2WebhooksResponse200, GetV2WebhooksWebhookIdMetadataParam, GetV2WebhooksWebhookIdResponse200, GetV2WebhooksWebhookIdResponse404, GetV2WorkspaceMembersResponse200, GetV2WorkspaceMembersWorkspaceMemberIdMetadataParam, GetV2WorkspaceMembersWorkspaceMemberIdResponse200, GetV2WorkspaceMembersWorkspaceMemberIdResponse404, PatchV2ListsListBodyParam, PatchV2ListsListEntriesEntryIdBodyParam, PatchV2ListsListEntriesEntryIdMetadataParam, PatchV2ListsListEntriesEntryIdResponse200, PatchV2ListsListEntriesEntryIdResponse400, PatchV2ListsListEntriesEntryIdResponse404, PatchV2ListsListMetadataParam, PatchV2ListsListResponse200, PatchV2ListsListResponse400, PatchV2ListsListResponse404, PatchV2ObjectsObjectBodyParam, PatchV2ObjectsObjectMetadataParam, PatchV2ObjectsObjectRecordsRecordIdBodyParam, PatchV2ObjectsObjectRecordsRecordIdMetadataParam, PatchV2ObjectsObjectRecordsRecordIdResponse200, PatchV2ObjectsObjectRecordsRecordIdResponse400, PatchV2ObjectsObjectRecordsRecordIdResponse404, PatchV2ObjectsObjectResponse200, PatchV2ObjectsObjectResponse400, PatchV2ObjectsObjectResponse404, PatchV2ObjectsObjectResponse409, PatchV2TargetIdentifierAttributesAttributeBodyParam, PatchV2TargetIdentifierAttributesAttributeMetadataParam, PatchV2TargetIdentifierAttributesAttributeOptionsOptionBodyParam, PatchV2TargetIdentifierAttributesAttributeOptionsOptionMetadataParam, PatchV2TargetIdentifierAttributesAttributeOptionsOptionResponse200, PatchV2TargetIdentifierAttributesAttributeOptionsOptionResponse400, PatchV2TargetIdentifierAttributesAttributeOptionsOptionResponse404, PatchV2TargetIdentifierAttributesAttributeOptionsOptionResponse409, PatchV2TargetIdentifierAttributesAttributeResponse200, PatchV2TargetIdentifierAttributesAttributeResponse400, PatchV2TargetIdentifierAttributesAttributeResponse404, PatchV2TargetIdentifierAttributesAttributeStatusesStatusBodyParam, PatchV2TargetIdentifierAttributesAttributeStatusesStatusMetadataParam, PatchV2TargetIdentifierAttributesAttributeStatusesStatusResponse200, PatchV2TargetIdentifierAttributesAttributeStatusesStatusResponse400, PatchV2TargetIdentifierAttributesAttributeStatusesStatusResponse404, PatchV2TargetIdentifierAttributesAttributeStatusesStatusResponse409, PatchV2TasksTaskIdBodyParam, PatchV2TasksTaskIdMetadataParam, PatchV2TasksTaskIdResponse200, PatchV2TasksTaskIdResponse400, PatchV2TasksTaskIdResponse404, PatchV2WebhooksWebhookIdBodyParam, PatchV2WebhooksWebhookIdMetadataParam, PatchV2WebhooksWebhookIdResponse200, PatchV2WebhooksWebhookIdResponse404, PostV2CommentsBodyParam, PostV2CommentsResponse200, PostV2CommentsResponse400, PostV2ListsBodyParam, PostV2ListsListEntriesBodyParam, PostV2ListsListEntriesMetadataParam, PostV2ListsListEntriesQueryBodyParam, PostV2ListsListEntriesQueryMetadataParam, PostV2ListsListEntriesQueryResponse200, PostV2ListsListEntriesQueryResponse404, PostV2ListsListEntriesResponse200, PostV2ListsListEntriesResponse400, PostV2ListsListEntriesResponse404, PostV2ListsResponse200, PostV2ListsResponse400, PostV2ListsResponse403, PostV2ListsResponse404, PostV2NotesBodyParam, PostV2NotesResponse200, PostV2NotesResponse404, PostV2ObjectsBodyParam, PostV2ObjectsObjectRecordsBodyParam, PostV2ObjectsObjectRecordsMetadataParam, PostV2ObjectsObjectRecordsQueryBodyParam, PostV2ObjectsObjectRecordsQueryMetadataParam, PostV2ObjectsObjectRecordsQueryResponse200, PostV2ObjectsObjectRecordsQueryResponse400, PostV2ObjectsObjectRecordsQueryResponse404, PostV2ObjectsObjectRecordsResponse200, PostV2ObjectsObjectRecordsResponse400, PostV2ObjectsObjectRecordsResponse404, PostV2ObjectsResponse200, PostV2ObjectsResponse409, PostV2TargetIdentifierAttributesAttributeOptionsBodyParam, PostV2TargetIdentifierAttributesAttributeOptionsMetadataParam, PostV2TargetIdentifierAttributesAttributeOptionsResponse200, PostV2TargetIdentifierAttributesAttributeOptionsResponse400, PostV2TargetIdentifierAttributesAttributeOptionsResponse404, PostV2TargetIdentifierAttributesAttributeOptionsResponse409, PostV2TargetIdentifierAttributesAttributeStatusesBodyParam, PostV2TargetIdentifierAttributesAttributeStatusesMetadataParam, PostV2TargetIdentifierAttributesAttributeStatusesResponse200, PostV2TargetIdentifierAttributesAttributeStatusesResponse400, PostV2TargetIdentifierAttributesAttributeStatusesResponse404, PostV2TargetIdentifierAttributesAttributeStatusesResponse409, PostV2TargetIdentifierAttributesBodyParam, PostV2TargetIdentifierAttributesMetadataParam, PostV2TargetIdentifierAttributesResponse200, PostV2TargetIdentifierAttributesResponse400, PostV2TargetIdentifierAttributesResponse404, PostV2TargetIdentifierAttributesResponse409, PostV2TasksBodyParam, PostV2TasksResponse200, PostV2TasksResponse400, PostV2TasksResponse404, PostV2WebhooksBodyParam, PostV2WebhooksResponse200, PostV2WebhooksResponse400, PutV2ListsListEntriesBodyParam, PutV2ListsListEntriesEntryIdBodyParam, PutV2ListsListEntriesEntryIdMetadataParam, PutV2ListsListEntriesEntryIdResponse200, PutV2ListsListEntriesEntryIdResponse400, PutV2ListsListEntriesEntryIdResponse404, PutV2ListsListEntriesMetadataParam, PutV2ListsListEntriesResponse200, PutV2ListsListEntriesResponse400, PutV2ListsListEntriesResponse404, PutV2ObjectsObjectRecordsBodyParam, PutV2ObjectsObjectRecordsMetadataParam, PutV2ObjectsObjectRecordsResponse200, PutV2ObjectsObjectRecordsResponse400, PutV2ObjectsObjectRecordsResponse404 } from './types';
