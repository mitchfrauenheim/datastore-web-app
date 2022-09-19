import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";

export default function SnapshotPage({ client, onOpen }) {

    let [searchParams, setSearchParams] = useSearchParams();

    let snapshotId = searchParams.get("id");

    // useEffect(() => {
    //     getSnapshot();
    // }, []);
    //
    // function getSnapshots() {
    // }
    //
    function renderSnapshotPage() {
        return <h1>Snapshot Details id: {snapshotId}</h1>;
    }

    function renderNoSnapshotPage() {
        return <h1>No Snapshot id Specified</h1>;
    }

    return (
        <div>
            {snapshotId ? renderSnapshotPage() : renderNoSnapshotPage()}
        </div>
    );
}