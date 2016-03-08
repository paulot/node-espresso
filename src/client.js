import path from 'path';
import {makeRequest, Methods} from './net-utils';

export class EspressoClient {
  constructor(host, port) {
    this.host = host;
    this.port = port;
    this.headers = { Accept: 'avro/json' };
  }

  getByPath(path) {
    return makeRequest(this.host, path, this.port, Methods.get, this.headers, null);
  }

  getRecord(db, table, resourceId) {
    if (!db || !table || !resourceId)
      throw new Error('Must provide a database, table and resource id!');

    return this.getByPath(path.join('/', db, table, resourceId));
  }

  getDocumentSchema(db, schema, resourceId) {
    if (!db || !schema) throw new Error('Must provide a database and a document schema name');

    let resource = resourceId ? path.join(db, schema, resourceId) : path.join(db, schema);
    return this.getByPath(path.join('/schemata/document/', resourceId));
  }

  getTableSchema(db, schema, resourceId) {
    if (!db || !schema) throw new Error('Must provide a database and a table schema name');

    let resource = resourceId ? path.join(db, schema, resourceId) : path.join(db, schema);
    return this.getByPath(path.join('/schemata/table/', resource));
  }

  putByPath(path, data) {
    let headers = Object.assign({}, this.headers);
    headers['Content-Type'] = 'avro/json';

    if (typeof data !== 'string') data = JSON.stringify(data);

    return makeRequest(this.host, path, this.port, Methods.put, headers, data);
  }

  putRecord(db, table, resourceId, data) {
    if (!db || !table || !resourceId)
      throw new Error('Must provide a database, table and resource id!');

    return this.putByPath(path.join('/', db, table, resourceId), data);
  }

  postByPath(path, data) {
    let headers = Object.assign({}, this.headers);
    headers['Content-Type'] = 'avro/json';

    if (typeof data !== 'string') data = JSON.stringify(data);

    return makeRequest(this.host, path, this.port, Methods.post, headers, data);
  }
}
