const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? "http://localhost:7071/api";
const FUNCTION_KEY = import.meta.env.VITE_FUNCTION_KEY;
const headers = {
    "Content-Type": "application/json",
    ...(FUNCTION_KEY ? { "x-functions-key": FUNCTION_KEY } : {}),
    "x-user-id": import.meta.env.VITE_USER_ID ?? "anonymous",
};
// Submit assessment + generate report
export async function submitAndGenerateReport(companyProfile, scenarioId, scenarioAnswers) {
    // Step 1 — Submit
    const submitRes = await fetch(`${BASE_URL}/assessment`, {
        method: "POST",
        headers,
        body: JSON.stringify({ companyProfile, scenarioId, scenarioAnswers }),
    });
    const submitData = await submitRes.json();
    if (!submitData.success)
        throw new Error(submitData.error);
    const { id } = submitData.data;
    // Step 2 — Generate report
    const reportRes = await fetch(`${BASE_URL}/assessment/${id}/generate`, {
        method: "POST",
        headers,
    });
    const reportData = await reportRes.json();
    if (!reportData.success)
        throw new Error(reportData.error);
    return reportData.data;
}
// Get all assessments (dashboard)
export async function getAssessments() {
    const res = await fetch(`${BASE_URL}/assessments`, { headers });
    return res.json();
}
// Get single assessment
export async function getAssessment(id) {
    const res = await fetch(`${BASE_URL}/assessment/${id}`, { headers });
    return res.json();
}
// Generate PDF
export async function generatePDF(id) {
    const res = await fetch(`${BASE_URL}/assessment/${id}/pdf`, {
        method: "POST",
        headers,
    });
    return res.json();
}
// Get PDF URL
export async function getPdfUrl(id) {
    const res = await fetch(`${BASE_URL}/assessment/${id}/pdf-url`, { headers });
    return res.json();
}
// Send report to client
export async function sendReport(id, email) {
    const res = await fetch(`${BASE_URL}/assessment/${id}/send`, {
        method: "POST",
        headers,
        body: JSON.stringify({ email }),
    });
    return res.json();
}
// ===== Invitation APIs =====
export async function validateInvitationToken(token) {
    const res = await fetch(`${BASE_URL}/invitations/${token}/validate`, { headers });
    return res.json();
}
export async function createInvitation(data) {
    const res = await fetch(`${BASE_URL}/invitations/create`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
    });
    return res.json();
}
export async function getInvitations() {
    const res = await fetch(`${BASE_URL}/invitations`, { headers });
    return res.json();
}
