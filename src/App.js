import logo from './logo.svg';
import './App.css';

const {QueryServiceClient} = require('./grpc-proto/query_grpc_web_pb.js');
const {Query, AnnotationResponse} = require('./grpc-proto/query_pb.js');

console.log("connecting to datastore server");
const client = new QueryServiceClient("http://localhost:8080");

// annotation query
let annotationQuery = ".*";
let annotationRequest = new Query(annotationQuery);
client.listAnnotations(annotationRequest, {}, (err, response) => {
  if (err) {
    console.error("error encountered in annotation query: " + err);
    return;
  }
  console.log(response.getAnnotationsList());
});

// PV query
let pvQuery = ".*Pv01";
let pvRequest = new Query(pvQuery);
client.listPVs(pvRequest, {}, (err, response) => {
  if (err) {
    console.error("error encountered in PV query: " + err);
    return;
  }
  console.log(response.getPvsList());
});

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to the EPICS Data Platform.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
