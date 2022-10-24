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


var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')

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
 *   !proto.IdQuery,
 *   !proto.Snapshot>}
 */
const methodDescriptor_QueryService_getSnapshotById = new grpc.web.MethodDescriptor(
  '/QueryService/getSnapshotById',
  grpc.web.MethodType.UNARY,
  proto.IdQuery,
  proto.Snapshot,
  /**
   * @param {!proto.IdQuery} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.Snapshot.deserializeBinary
);


/**
 * @param {!proto.IdQuery} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.Snapshot)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Snapshot>|undefined}
 *     The XHR Node Readable Stream
 */
proto.QueryServiceClient.prototype.getSnapshotById =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/QueryService/getSnapshotById',
      request,
      metadata || {},
      methodDescriptor_QueryService_getSnapshotById,
      callback);
};


/**
 * @param {!proto.IdQuery} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Snapshot>}
 *     Promise that resolves to the response
 */
proto.QueryServicePromiseClient.prototype.getSnapshotById =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/QueryService/getSnapshotById',
      request,
      metadata || {},
      methodDescriptor_QueryService_getSnapshotById);
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
 *   !proto.google.protobuf.Empty,
 *   !proto.AttributeNames>}
 */
const methodDescriptor_QueryService_listPVAttributes = new grpc.web.MethodDescriptor(
  '/QueryService/listPVAttributes',
  grpc.web.MethodType.UNARY,
  google_protobuf_empty_pb.Empty,
  common_pb.AttributeNames,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_pb.AttributeNames.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.AttributeNames)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.AttributeNames>|undefined}
 *     The XHR Node Readable Stream
 */
proto.QueryServiceClient.prototype.listPVAttributes =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/QueryService/listPVAttributes',
      request,
      metadata || {},
      methodDescriptor_QueryService_listPVAttributes,
      callback);
};


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.AttributeNames>}
 *     Promise that resolves to the response
 */
proto.QueryServicePromiseClient.prototype.listPVAttributes =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/QueryService/listPVAttributes',
      request,
      metadata || {},
      methodDescriptor_QueryService_listPVAttributes);
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
 *   !proto.google.protobuf.Empty,
 *   !proto.AttributeNames>}
 */
const methodDescriptor_QueryService_listSnapshotAttributes = new grpc.web.MethodDescriptor(
  '/QueryService/listSnapshotAttributes',
  grpc.web.MethodType.UNARY,
  google_protobuf_empty_pb.Empty,
  common_pb.AttributeNames,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_pb.AttributeNames.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.AttributeNames)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.AttributeNames>|undefined}
 *     The XHR Node Readable Stream
 */
proto.QueryServiceClient.prototype.listSnapshotAttributes =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/QueryService/listSnapshotAttributes',
      request,
      metadata || {},
      methodDescriptor_QueryService_listSnapshotAttributes,
      callback);
};


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.AttributeNames>}
 *     Promise that resolves to the response
 */
proto.QueryServicePromiseClient.prototype.listSnapshotAttributes =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/QueryService/listSnapshotAttributes',
      request,
      metadata || {},
      methodDescriptor_QueryService_listSnapshotAttributes);
};


module.exports = proto;

