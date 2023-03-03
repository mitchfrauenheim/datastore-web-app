import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle";

export default function SettingsPage() {
    return (
        <div id="settings-wrapper" className="page-wrapper">
            <div id="settings-breadcrumbs" className="custom-breadcrumbs">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li>Settings</li>
                </ul>
            </div>
            <div id="settings-content" className="page-content">
                <PageTitle pageName="Settings" />
            </div>
        </div>
    );
}