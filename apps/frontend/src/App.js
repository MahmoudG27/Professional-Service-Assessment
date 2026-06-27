import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { loginRequest } from "./auth/msalConfig";
import DashboardPage from "./pages/DashboardPage";
import InvitationsPage from "./pages/InvitationsPage";
import AssessmentWizard from "./components/assessment/AssessmentWizard";
import ReportViewPage from "./pages/ReportViewPage";
import ClientPortalPage from "./pages/ClientPortalPage";
// ================================================================
// Protected Layout — wraps admin routes with Entra ID auth
// ================================================================
function ProtectedLayout({ children }) {
    return (_jsx(MsalAuthenticationTemplate, { interactionType: InteractionType.Redirect, authenticationRequest: loginRequest, children: children }));
}
// ================================================================
// App
// ================================================================
export default function App() {
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/a/:token", element: _jsx(ClientPortalPage, {}) }), _jsx(Route, { path: "/", element: _jsx(ProtectedLayout, { children: _jsx(Navigate, { to: "/dashboard", replace: true }) }) }), _jsx(Route, { path: "/dashboard", element: _jsx(ProtectedLayout, { children: _jsx(DashboardPage, {}) }) }), _jsx(Route, { path: "/invitations", element: _jsx(ProtectedLayout, { children: _jsx(InvitationsPage, {}) }) }), _jsx(Route, { path: "/assessment", element: _jsx(ProtectedLayout, { children: _jsx(AssessmentWizard, {}) }) }), _jsx(Route, { path: "/report/:id", element: _jsx(ProtectedLayout, { children: _jsx(ReportViewPage, {}) }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/dashboard", replace: true }) })] }) }));
}
