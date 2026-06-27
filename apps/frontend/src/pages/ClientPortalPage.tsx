import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { validateInvitationToken } from "../services/api";

export default function ClientPortalPage() {
  const { token } = useParams<{ token: string }>();
  const [status, setStatus] = useState<"loading"|"pending"|"completed"|"expired"|"invalid">("loading");

  useEffect(() => {
    if (!token) { setStatus("invalid"); return; }
    validateInvitationToken(token)
      .then(res => {
        if (res.success && res.data) {
          setStatus(res.data.status as any);
        } else {
          setStatus("invalid");
        }
      })
      .catch(() => setStatus("invalid"));
  }, [token]);

  if (status === "loading") return (
    <div style={{ textAlign: "center", padding: "80px", color: "#185FA5" }}>
      Validating your link...
    </div>
  );

  if (status === "expired") return (
    <div style={{ textAlign: "center", padding: "80px" }}>
      <h2 style={{ color: "#791F1F" }}>Link Expired</h2>
      <p style={{ color: "#6b7280" }}>This invitation link has expired. Please contact KlayyTech for a new link.</p>
    </div>
  );

  if (status === "invalid") return (
    <div style={{ textAlign: "center", padding: "80px" }}>
      <h2 style={{ color: "#791F1F" }}>Invalid Link</h2>
      <p style={{ color: "#6b7280" }}>This link is not valid. Please check the URL or contact KlayyTech.</p>
    </div>
  );

  if (status === "completed") return (
    <div style={{ textAlign: "center", padding: "80px" }}>
      <h2 style={{ color: "#27500A" }}>Assessment Complete</h2>
      <p style={{ color: "#6b7280" }}>Your assessment has already been submitted. KlayyTech will be in touch shortly.</p>
    </div>
  );

  if (status === "pending") return (
    <div style={{ textAlign: "center", padding: "80px" }}>
      <h2 style={{ color: "#185FA5" }}>Assessment Ready</h2>
      <p style={{ color: "#6b7280" }}>Your assessment link is valid. Assessment flow coming soon.</p>
    </div>
  );

  return null;
}