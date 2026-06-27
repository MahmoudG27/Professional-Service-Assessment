import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAssessment } from "../services/api";
import ReportPage from "../components/assessment/ReportPage";
import type { ProfessionalServicesReport } from "../reports/professionalServicesReport";

export default function ReportViewPage() {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<ProfessionalServicesReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getAssessment(id)
      .then(res => {
        if (res.success && res.data?.report) {
          setReport(res.data.report);
        } else {
          setError("Report not found.");
        }
      })
      .catch(() => setError("Failed to load report."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div style={{ textAlign: "center", padding: "80px", color: "#185FA5" }}>
      Loading report...
    </div>
  );

  if (error || !report) return (
    <div style={{ textAlign: "center", padding: "80px", color: "#E24B4A" }}>
      {error ?? "Report not found."}
    </div>
  );

  return (
    <ReportPage
      report={report}
      onGeneratePDF={async () => {
        const { generatePDF, getPdfUrl } = await import("../services/api");
        await generatePDF(id!);
        const res = await getPdfUrl(id!);
        if (res.data?.sasUrl) window.open(res.data.sasUrl, "_blank");
      }}
      onSendEmail={async () => {
        const email = prompt("Enter client email:");
        if (!email) return;
        const { sendReport } = await import("../services/api");
        await sendReport(id!, email);
        alert("Report sent successfully.");
      }}
    />
  );
}