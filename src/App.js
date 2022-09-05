import logo from './logo.svg';
import './App.css';

const {Query, PVResponse} = require('./grpc-proto/query_pb.js');
const {QueryServiceClient} = require('./grpc-proto/query_grpc_web_pb.js');

console.log("connecting to datastore server");
const client = new QueryServiceClient("http://localhost:8080");
let queryString = "mpexPv09.*";
let request = new Query(queryString);
client.listPVs(request, {}, (err, response) => {
  if (err) {
    console.error("error encountered: " + err);
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
