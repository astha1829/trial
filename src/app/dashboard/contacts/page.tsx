import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { DashboardLayout } from "@/features/dashboard/components/dashboard-layout";
import { ContactsClient } from "@/features/contacts/components/contacts-client";

export const metadata = {
  title: "Contacts | Nexus CRM",
  description: "Manage your contacts on Nexus CRM.",
};

export default function ContactsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <ContactsClient />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
