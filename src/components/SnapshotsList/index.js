import "./SnapshotsList.css";

export default function SnapshotsList({ snapshots = [], onOpen }) {

    return (
        <div className="snapshotslist">
            {snapshots?.map((snapshot, i) => {
                return <SnapshotCard snapshot={snapshot} key={i} onOpen={onOpen}/>;
            })}
        </div>
    );
}

function SnapshotCard({ snapshot, onOpen }) {

    function handleOpen() {
        console.log("open snapshot");
        onOpen(snapshot)
    }

    return (
        <div className="snapshotcard">
            <div>
                <div className="snapshotcard-column">
                    <h3>{snapshot?.id || "No id"}</h3>
                </div>
                <div className="snapshotcard-column">
                    <h3>{snapshot?.timestamp || ""}</h3>
                </div>
                <div className="snapshotcard-column">
                    <h3>{snapshot?.description || ""}</h3>
                </div>
                <div>
                    <button onClick={handleOpen}>Open</button>
                </div>
            </div>
        </div>
    );
}