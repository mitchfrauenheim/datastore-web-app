import { Disclosure } from "@headlessui/react";
import {ChevronDownIcon } from "@heroicons/react/24/outline"

export default function DisclosureHead(props) {
    return (
        <div id="head-wrapper" className="flex flex-row justify-between px-8">
            <div id="title" className="font-semibold text-slate-800">
                {props.titleText}
            </div>
            <Disclosure.Button>
                <div className="flex flex-row items-center font-medium text-slate-500">
                    <div className="ui-open:hidden">Expand</div>
                    <div className="ui-not-open:hidden">Collapse</div>
                    <ChevronDownIcon className="w-5 h-5 ml-2 ui-open:rotate-180" />
                </div>
            </Disclosure.Button>
        </div>
    );
}