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
function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={loginRequest}
    >
      {children}
    </MsalAuthenticationTemplate>
  );
}

// ================================================================
// App
// ================================================================
export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── Public route — client portal (invitation token) ── */}
        <Route path="/a/:token" element={<ClientPortalPage />} />

        {/* ── Protected routes — admin / sales team ── */}
        <Route
          path="/"
          element={
            <ProtectedLayout>
              <Navigate to="/dashboard" replace />
            </ProtectedLayout>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedLayout>
              <DashboardPage />
            </ProtectedLayout>
          }
        />

        <Route
          path="/invitations"
          element={
            <ProtectedLayout>
              <InvitationsPage />
            </ProtectedLayout>
          }
        />

        <Route
          path="/assessment"
          element={
            <ProtectedLayout>
              <AssessmentWizard />
            </ProtectedLayout>
          }
        />

        <Route
          path="/report/:id"
          element={
            <ProtectedLayout>
              <ReportViewPage />
            </ProtectedLayout>
          }
        />

        {/* ── Fallback ── */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />

      </Routes>
    </BrowserRouter>
  );
}