import PageLink from './PageLink'
import PageLinkSmall from './PageLinkSmall'
import { HomeIcon, CameraIcon, DocumentChartBarIcon, PencilIcon } from '@heroicons/react/24/outline'


export default function () {
    return (
        <>
            <div id="left-wrapper-small" className="sm:hidden flex flex-col w-20 bg-slate-800 border-r border-gray-200">
                <div id="left-header-small" className="flex items-center justify-center h-20">
                    <div id="hamburger-icon" className="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </div>
                </div>
                <div id="left-body-small" className="flex flex-col">
                    <div id="nav-links-small" className="flex flex-col items-center">
                        <PageLinkSmall data={{
                            route: "/",
                            icon: <HomeIcon className="h-6 w-6" />
                        }} />
                        <PageLinkSmall data={{
                            route: "/snapshotList",
                            icon: <CameraIcon className="h-6 w-6" />
                        }} />
                        <PageLinkSmall data={{
                            route: "pvList",
                            icon: <DocumentChartBarIcon className="h-6 w-6" />
                        }} />
                        <PageLinkSmall data={{
                            route: "/annotationList",
                            icon: <PencilIcon className="h-6 w-6" />
                        }} />
                    </div>
                </div>
            </div>
            <div id="left-wrapper" className="hidden sm:flex flex-col w-80 min-w-max bg-slate-800 border-r border-gray-200">
                <div id="left-header" className="flex items-center h-20">
                    <div id="osprey" className="ml-6 font-glegoo text-2xl text-slate-300 font-bold">
                        <a href="https://ospreydcs.com/" >Osprey DCS </a>
                    </div>
                </div>
                <div id="left-body" className="flex flex-col">
                    <div id="nav-links" className="mx-4">
                        <PageLink data={{
                            name: "Data Explorer Home",
                            route: "/",
                            icon: <HomeIcon className="h-6 w-6" />
                        }} />
                        <PageLink data={{
                            name: "Explore Snapshots",
                            route: "/snapshotList",
                            icon: <CameraIcon className="w-6 h-6" />
                        }} />
                        <PageLink data={{
                            name: "Explore PVs",
                            route: "/pvList",
                            icon: <DocumentChartBarIcon className="w-6 h-6" />
                        }} />
                        <PageLink data={{
                            name: "Explore Annotations",
                            route: "/annotationList",
                            icon: <PencilIcon className="w-6 h-6" />
                        }} />
                    </div>
                </div>
            </div>
        </>
    );
}