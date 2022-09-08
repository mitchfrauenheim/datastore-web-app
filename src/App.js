import './App.css';

import QueryPage from "./pages/QueryPage";

const {QueryServiceClient} = require('./grpc-proto/query_grpc_web_pb.js');

console.log("connecting to datastore server");
const client = new QueryServiceClient("http://localhost:8080", null, null);

// // annotation query
// let annotationQuery = ".*";
// let annotationRequest = new Query(annotationQuery);
// client.listAnnotations(annotationRequest, {}, (err, response) => {
//   if (err) {
//     console.error("error encountered in annotation query: " + err);
//     return;
//   }
//   console.log("annotation result: ");
//   console.log(response.getAnnotationsList());
// });

export default function App() {

  function renderQueryPage() {
      return <QueryPage client={client} />;
  }

  return (
    <div className="container">
      <main className="main">
        {renderQueryPage()}
      </main>
    </div>
  );
}
