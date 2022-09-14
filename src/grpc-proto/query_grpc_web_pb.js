/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var common_pb = require('./common_pb.js')
const proto = require('./query_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.QueryServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.QueryServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Query,
 *   !proto.PaginatedResponse>}
 */
const methodDescriptor_QueryService_listSnapshotData = new grpc.web.MethodDescriptor(
  '/QueryService/listSnapshotData',
  grpc.web.MethodType.UNARY,
  proto.Query,
  proto.PaginatedResponse,
  /**
   * @param {!proto.Query} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.PaginatedResponse.deserializeBinary
);


/**
 * @param {!proto.Query} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.PaginatedResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.PaginatedResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.QueryServiceClient.prototype.listSnapshotData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/QueryService/listSnapshotData',
      request,
      metadata || {},
      methodDescriptor_QueryService_listSnapshotData,
      callback);
};


/**
 * @param {!proto.Query} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.PaginatedResponse>}
 *     Promise that resolves to the response
 */
proto.QueryServicePromiseClient.prototype.listSnapshotData =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/QueryService/listSnapshotData',
      request,
      metadata || {},
      methodDescriptor_QueryService_listSnapshotData);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.SnapshotQuery,
 *   !proto.SnapshotResponse>}
 */
const methodDescriptor_QueryService_listSnapshots = new grpc.web.MethodDescriptor(
  '/QueryService/listSnapshots',
  grpc.web.MethodType.UNARY,
  proto.SnapshotQuery,
  proto.SnapshotResponse,
  /**
   * @param {!proto.SnapshotQuery} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.SnapshotResponse.deserializeBinary
);


/**
 * @param {!proto.SnapshotQuery} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.SnapshotResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.SnapshotResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.QueryServiceClient.prototype.listSnapshots =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/QueryService/listSnapshots',
      request,
      metadata || {},
      methodDescriptor_QueryService_listSnapshots,
      callback);
};


/**
 * @param {!proto.SnapshotQuery} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.SnapshotResponse>}
 *     Promise that resolves to the response
 */
proto.QueryServicePromiseClient.prototype.listSnapshots =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/QueryService/listSnapshots',
      request,
      metadata || {},
      methodDescriptor_QueryService_listSnapshots);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Query,
 *   !proto.PVResponse>}
 */
const methodDescriptor_QueryService_listPVs = new grpc.web.MethodDescriptor(
  '/QueryService/listPVs',
  grpc.web.MethodType.UNARY,
  proto.Query,
  proto.PVResponse,
  /**
   * @param {!proto.Query} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.PVResponse.deserializeBinary
);


/**
 * @param {!proto.Query} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.PVResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.PVResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.QueryServiceClient.prototype.listPVs =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/QueryService/listPVs',
      request,
      metadata || {},
      methodDescriptor_QueryService_listPVs,
      callback);
};


/**
 * @param {!proto.Query} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.PVResponse>}
 *     Promise that resolves to the response
 */
proto.QueryServicePromiseClient.prototype.listPVs =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/QueryService/listPVs',
      request,
      metadata || {},
      methodDescriptor_QueryService_listPVs);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Query,
 *   !proto.AnnotationsResponse>}
 */
const methodDescriptor_QueryService_listAnnotations = new grpc.web.MethodDescriptor(
  '/QueryService/listAnnotations',
  grpc.web.MethodType.UNARY,
  proto.Query,
  proto.AnnotationsResponse,
  /**
   * @param {!proto.Query} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.AnnotationsResponse.deserializeBinary
);


/**
 * @param {!proto.Query} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.AnnotationsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.AnnotationsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.QueryServiceClient.prototype.listAnnotations =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/QueryService/listAnnotations',
      request,
      metadata || {},
      methodDescriptor_QueryService_listAnnotations,
      callback);
};


/**
 * @param {!proto.Query} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.AnnotationsResponse>}
 *     Promise that resolves to the response
 */
proto.QueryServicePromiseClient.prototype.listAnnotations =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/QueryService/listAnnotations',
      request,
      metadata || {},
      methodDescriptor_QueryService_listAnnotations);
};


module.exports = proto;

