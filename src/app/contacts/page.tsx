import { ContactsClient } from "@/features/contacts/components/contacts-client";
import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { DashboardLayout } from "@/features/dashboard/components/dashboard-layout";

export const metadata = {
  title: "Contacts | Nexus CRM",
  description: "Manage your customer database, segment audiences, and track engagements.",
};

export default function ContactsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="flex-1 space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <ContactsClient />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
