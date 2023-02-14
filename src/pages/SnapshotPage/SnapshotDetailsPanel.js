import React from "react";
import AttributePairsTable from "../common/AttributePairsTable";
import PvNamesWithLinksParagraph from "../common/PvNamesWithLinksParagraph";
import PageTitle from "../../components/PageTitle"
import KeyValuePair from "../../components/KeyValuePair";
import { ChevronUpIcon } from '@heroicons/react/24/outline'
import { Disclosure } from "@headlessui/react";
import DisclosureHead from "../../components/DisclosureHead";

export default function SnapshotDetailsPanel({ snapshotDetails, errorMsg }) {

    function renderDetailsPanel() {
        return (
            <div className="">
                <PageTitle pageName="Snapshot View" />
                <Disclosure defaultOpen={true}>
                <div id="snapshot-details" className="flex flex-col py-4 bg-white rounded">
                    <DisclosureHead titleText="Details" />
                    <Disclosure.Panel>
                    <div className="my-4 border-b border-gray-300"></div>
                    <div id="snapshot-details-body" className="flex flex-row flex-wrap px-8">
                        <div className="flex flex-row flex-wrap space-x-6 mb-6">
                            <KeyValuePair index="ID" value={snapshotDetails.id} />
                            <KeyValuePair index="Size" value={snapshotDetails.size} />
                            <KeyValuePair index="Trigger Timestamp" value={snapshotDetails.snapshotTimestampDisplayString} />
                            <KeyValuePair index="First Sample Time" value={snapshotDetails.firstTimestampDisplayString} />
                            <KeyValuePair index="Last Sample Time" value={snapshotDetails.lastTimestampDisplayString} />
                        </div>
                        <div className="mb-6">
                            <KeyValuePair index="PV Names" value={<PvNamesWithLinksParagraph objectWithPvs={snapshotDetails} />} />
                        </div>
                        <KeyValuePair index="Attributes" value={<AttributePairsTable objectWithAttributes={snapshotDetails} />} />
                        {/* Attributes:
                        <p />
                        <AttributePairsTable objectWithAttributes={snapshotDetails} />
                        <p /> */}
                    </div>
                    </Disclosure.Panel>
                </div>
                </Disclosure>
            </div>
        );
    }

    function renderNoSnapshotPanel() {
        return (
            <div>
                <h1>loading snapshot details</h1>
            </div>
        );
    }
    function renderQueryErrorPanel() {
        return (
            <div>
                <h1>{errorMsg}</h1>
            </div>
        );
    }

    return (
        <div style={{ paddingBottom: "4px", borderBottom: "1px solid darkgray" }}>
            {(errorMsg !== null) ? renderQueryErrorPanel() :
                (snapshotDetails === null) ? renderNoSnapshotPanel() : renderDetailsPanel()}
        </div>
    );
}
