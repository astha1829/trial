"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useContacts } from "../hooks/use-contacts";
import { useGroups } from "@/features/groups/hooks/use-groups";
import { ContactsSkeleton, ContactsErrorState } from "./contacts-skeleton";
import { ContactsEmptyState } from "./contacts-empty-state";
import { ContactsTable } from "./contacts-table";
import { CreateContactModal } from "./create-contact-modal";
import { RefreshCw, Plus, Users, Phone, Layers, Clock, ArrowUpRight } from "lucide-react";
import { showSuccessToast } from "@/lib/toast-helper";

export function ContactsClient() {
  const router = useRouter();
  const { data: contacts, isLoading, isError, refetch, isRefetching } = useContacts();
  const { data: groups, isLoading: isLoadingGroups } = useGroups();
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleRefresh = () => {
    refetch();
  };

  const handleExportData = () => {
    if (!contacts || contacts.length === 0) {
      showSuccessToast("No contacts to export");
      return;
    }

    const headers = ["ID", "First Name", "Last Name", "Mobile Number", "Email", "Country", "Language Code", "Created At"];
    const csvRows = [headers.join(",")];

    for (const contact of contacts) {
      const row = [
        contact.id,
        `"${contact.first_name || ""}"`,
        `"${contact.last_name || ""}"`,
        `"${contact.mobile_number || ""}"`,
        `"${contact.email || ""}"`,
        `"${contact.country || ""}"`,
        `"${contact.language_code || ""}"`,
        `"${contact.created_at || ""}"`
      ];
      csvRows.push(row.join(","));
    }

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    const date = new Date().toISOString().split("T")[0];
    link.setAttribute("download", `contacts-export-${date}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showSuccessToast("Contacts exported successfully");
  };

  const uniqueGroupsCount = contacts 
    ? new Set(contacts.flatMap(c => c.group_ids || [])).size 
    : 0;

  const contactsWithMobile = contacts
    ? contacts.filter(c => c.mobile_number && c.mobile_number.trim().length > 0).length
    : 0;

  const sortedContactsByDate = contacts 
    ? [...contacts].sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
    : [];

  const recentlyAddedContact = sortedContactsByDate.length > 0 ? sortedContactsByDate[0] : null;
  const recentlyAddedName = recentlyAddedContact 
    ? `${recentlyAddedContact.first_name} ${recentlyAddedContact.last_name || ""}`.trim()
    : "None";

  const isFullyLoading = isLoading || isRefetching || isLoadingGroups;

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full h-full pb-8 animate-fade-in select-none">
      {}
      <div className="flex-1 flex flex-col min-w-0 space-y-8">
        
        {}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-[44px] font-bold tracking-tight text-foreground flex items-center gap-3">
              Contacts
            </h1>
            <p className="text-muted-foreground/90 text-[17px] max-w-xl leading-relaxed">
              Manage your customer database, segment audiences, and track engagements.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleRefresh}
              disabled={isFullyLoading}
              className="flex items-center justify-center h-9 w-9 rounded-lg border border-border/50 bg-secondary/20 hover:bg-secondary/60 transition-colors text-muted-foreground disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isFullyLoading ? 'animate-spin' : ''}`} />
            </button>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 h-9 px-4 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-all text-sm font-medium shadow-sm hover:shadow-md cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              New Contact
            </button>
          </div>
        </div>

        {}
        {!isError && contacts && contacts.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col gap-2 p-4 rounded-xl contacts-summary-card">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Users className="h-4 w-4 text-indigo-400" />
                <span className="text-sm font-semibold uppercase tracking-wider">Total Contacts</span>
              </div>
              <div className="text-4xl font-bold tracking-tight text-foreground">
                {contacts.length}
              </div>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-xl contacts-summary-card">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Phone className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-semibold uppercase tracking-wider">Reachable</span>
              </div>
              <div className="text-4xl font-bold tracking-tight text-foreground">
                {contactsWithMobile}
              </div>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-xl contacts-summary-card">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Layers className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-semibold uppercase tracking-wider">Active Groups</span>
              </div>
              <div className="text-4xl font-bold tracking-tight text-foreground">
                {uniqueGroupsCount}
              </div>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-xl contacts-summary-card">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Clock className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-semibold uppercase tracking-wider">Latest Added</span>
              </div>
              <div className="text-[15px] font-medium text-foreground truncate mt-auto">
                {recentlyAddedName}
              </div>
            </div>
          </div>
        )}

        {}
        {isFullyLoading ? (
          <ContactsSkeleton />
        ) : isError ? (
          <ContactsErrorState onRetry={handleRefresh} />
        ) : !contacts || contacts.length === 0 ? (
          <ContactsEmptyState onCreateClick={() => setIsCreateModalOpen(true)} />
        ) : (
          <div className="flex-1 min-h-0 w-full">
            <ContactsTable contacts={contacts} groups={groups || []} />
          </div>
        )}
      </div>

      {}
      {!isError && contacts && contacts.length > 0 && (
        <div className="w-full lg:w-72 shrink-0 flex flex-col gap-6 pt-2">
          {}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Quick Actions</h3>
            <div className="flex flex-col gap-2">
              <button 
                onClick={handleExportData}
                className="flex items-center justify-between p-3 rounded-lg contacts-quick-btn group cursor-pointer"
              >
                <span className="text-[15px] font-medium text-foreground">Export Data</span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>
              <button 
                onClick={() => router.push('/groups')}
                className="flex items-center justify-between p-3 rounded-lg contacts-quick-btn group cursor-pointer"
              >
                <span className="text-[15px] font-medium text-foreground">Manage Groups</span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>
            </div>
          </div>

          {}
          <div className="flex flex-col gap-3 mt-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Recently Added</h3>
            <div className="flex flex-col gap-3">
              {sortedContactsByDate.slice(0, 4).map(contact => {
                const name = `${contact.first_name} ${contact.last_name || ""}`.trim();
                const initials = (contact.first_name?.charAt(0) || "") + (contact.last_name?.charAt(0) || "");
                return (
                  <div key={contact.id} className="flex items-center gap-3 group cursor-pointer">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500/80 to-violet-600/80 flex items-center justify-center text-[11px] font-bold text-white shadow-sm group-hover:shadow-[0_0_10px_rgba(99,102,241,0.4)] transition-all">
                      {initials}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[15px] font-semibold text-foreground truncate group-hover:text-indigo-400 transition-colors">{name}</span>
                      <span className="text-[13px] text-muted-foreground truncate">{contact.mobile_number}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {}
      <CreateContactModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
}
