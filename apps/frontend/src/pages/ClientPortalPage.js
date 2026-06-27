import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { validateInvitationToken } from "../services/api";
export default function ClientPortalPage() {
    const { token } = useParams();
    const [status, setStatus] = useState("loading");
    useEffect(() => {
        if (!token) {
            setStatus("invalid");
            return;
        }
        validateInvitationToken(token)
            .then(res => {
            if (res.success && res.data) {
                setStatus(res.data.status);
            }
            else {
                setStatus("invalid");
            }
        })
            .catch(() => setStatus("invalid"));
    }, [token]);
    if (status === "loading")
        return (_jsx("div", { style: { textAlign: "center", padding: "80px", color: "#185FA5" }, children: "Validating your link..." }));
    if (status === "expired")
        return (_jsxs("div", { style: { textAlign: "center", padding: "80px" }, children: [_jsx("h2", { style: { color: "#791F1F" }, children: "Link Expired" }), _jsx("p", { style: { color: "#6b7280" }, children: "This invitation link has expired. Please contact KlayyTech for a new link." })] }));
    if (status === "invalid")
        return (_jsxs("div", { style: { textAlign: "center", padding: "80px" }, children: [_jsx("h2", { style: { color: "#791F1F" }, children: "Invalid Link" }), _jsx("p", { style: { color: "#6b7280" }, children: "This link is not valid. Please check the URL or contact KlayyTech." })] }));
    if (status === "completed")
        return (_jsxs("div", { style: { textAlign: "center", padding: "80px" }, children: [_jsx("h2", { style: { color: "#27500A" }, children: "Assessment Complete" }), _jsx("p", { style: { color: "#6b7280" }, children: "Your assessment has already been submitted. KlayyTech will be in touch shortly." })] }));
    if (status === "pending")
        return (_jsxs("div", { style: { textAlign: "center", padding: "80px" }, children: [_jsx("h2", { style: { color: "#185FA5" }, children: "Assessment Ready" }), _jsx("p", { style: { color: "#6b7280" }, children: "Your assessment link is valid. Assessment flow coming soon." })] }));
    return null;
}
