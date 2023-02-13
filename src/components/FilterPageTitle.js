import { ChevronUpIcon } from '@heroicons/react/24/outline'
import { Disclosure } from '@headlessui/react'

export default function FilterPageTitle(props) {
    return (
        <div id="main-header" className="flex items-center h-16">
            <div id="main-header-content" className="flex flex-row justify-between w-full">
                <h1 id="snapshot-title" className="text-xl text-slate-800 font-bold">
                    {props.pageName}
                </h1>
                <Disclosure.Button>
                    <div id="snapshot-expand-filters" className="flex items-center font-medium text-slate-500">
                        <div className="ui-open:hidden">Expand Filters</div>
                        <div className="ui-not-open:hidden">Collapse Filters</div>
                        <ChevronUpIcon className="w-5 h-5 ml-2 ui-open:rotate-180" />
                    </div>
                </Disclosure.Button>
            </div>
        </div>
    )
}