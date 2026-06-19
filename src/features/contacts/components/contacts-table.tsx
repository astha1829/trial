import React, { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Contact } from "../types";
import { Group } from "@/features/groups/types";
import { Search, ChevronDown, ChevronUp, Copy, Users, Eye, Trash2, MoreHorizontal } from "lucide-react";
import { showSuccessToast } from "@/lib/toast-helper";

interface ContactsTableProps {
  contacts: Contact[];
  groups: Group[];
}

type SortField = "name" | "mobile_number" | "groups" | "status";
type SortOrder = "asc" | "desc";

function getInitials(firstName: string, lastName: string | null) {
  const f = firstName ? firstName.charAt(0).toUpperCase() : "";
  const l = lastName ? lastName.charAt(0).toUpperCase() : "";
  return `${f}${l}`;
}

export function ContactsTable({ contacts, groups }: ContactsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getContactName = (contact: Contact) => {
    return `${contact.first_name} ${contact.last_name || ""}`.trim();
  };

  const filteredAndSorted = contacts
    .filter((c) => getContactName(c).toLowerCase().includes(searchTerm.toLowerCase()) || 
                   c.mobile_number.includes(searchTerm) ||
                   (c.email && c.email.toLowerCase().includes(searchTerm.toLowerCase())))
    .sort((a, b) => {
      let aVal: string | number = "";
      let bVal: string | number = "";
      
      if (sortField === "name") {
        aVal = getContactName(a).toLowerCase();
        bVal = getContactName(b).toLowerCase();
      } else if (sortField === "mobile_number") {
        aVal = (a.mobile_number || "").toString().toLowerCase();
        bVal = (b.mobile_number || "").toString().toLowerCase();
      } else if (sortField === "groups") {
        aVal = a.group_ids?.length || 0;
        bVal = b.group_ids?.length || 0;
      } else if (sortField === "status") {
        aVal = "active";
        bVal = "active";
      }

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity" />;
    return sortOrder === "asc" ? <ChevronUp className="h-3.5 w-3.5 text-foreground" /> : <ChevronDown className="h-3.5 w-3.5 text-foreground" />;
  };

  return (
    <div 
      className="flex flex-col border rounded-xl shadow-sm transition-colors duration-300 w-full h-full"
      style={{ backgroundColor: "var(--contacts-table-bg)", borderColor: "var(--contacts-card-border)" }}
    >
      {/* Table Toolbar */}
      <div 
        className="px-5 py-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-t-xl z-20"
        style={{ backgroundColor: "var(--contacts-table-bg)", borderColor: "var(--contacts-card-border)" }}
      >
        {/* Search */}
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-indigo-400 transition-colors" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 pl-9 pr-14 rounded-lg border text-[15px] font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all shadow-sm contacts-search-input"
            style={{ backgroundColor: "var(--contacts-search-bg)", borderColor: "var(--contacts-search-border)" }}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
            <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-border/50 bg-secondary px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>
        
        {/* Count */}
        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
          <div className="px-2.5 py-1 rounded-md bg-secondary/40 border border-border/30 text-[11px] font-semibold tracking-wider uppercase text-muted-foreground transition-colors">
            {filteredAndSorted.length} {filteredAndSorted.length === 1 ? "Result" : "Results"}
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="w-full overflow-x-auto overflow-y-auto max-h-[600px] relative rounded-b-xl">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead 
            className="sticky top-0 backdrop-blur-md z-10 border-b transition-colors"
            style={{ backgroundColor: "var(--contacts-table-header-bg)", borderColor: "var(--contacts-card-border)" }}
          >
            <tr>
              <th 
                className="px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-muted-foreground cursor-pointer group hover:bg-secondary transition-colors select-none w-[35%]"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center gap-2">Contact <SortIcon field="name" /></div>
              </th>

              <th 
                className="px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-muted-foreground cursor-pointer group hover:bg-secondary transition-colors select-none w-[20%]"
                onClick={() => handleSort("mobile_number")}
              >
                <div className="flex items-center gap-2">Mobile Number <SortIcon field="mobile_number" /></div>
              </th>

              <th 
                className="px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-muted-foreground cursor-pointer group hover:bg-secondary transition-colors select-none w-[25%]"
                onClick={() => handleSort("groups")}
              >
                <div className="flex items-center gap-2">Groups <SortIcon field="groups" /></div>
              </th>

              <th 
                className="px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-muted-foreground cursor-pointer group hover:bg-secondary transition-colors select-none w-[10%]"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center gap-2">Status <SortIcon field="status" /></div>
              </th>
              
              <th className="px-5 py-3.5 text-right text-sm font-bold uppercase tracking-wider text-muted-foreground w-[10%] transition-colors"></th>
            </tr>
          </thead>
          <tbody 
            className="divide-y divide-border/40 transition-colors"
            style={{ backgroundColor: "var(--contacts-table-bg)" }}
          >
            {filteredAndSorted.length > 0 ? (
              filteredAndSorted.map((contact) => {
                const initials = getInitials(contact.first_name, contact.last_name);
                
                return (
                  <tr 
                    key={contact.id} 
                    className="h-16 group transition-all duration-200 cursor-pointer contacts-table-row"
                  >
                    <td className="px-5 py-3 align-middle whitespace-nowrap">
                      <div className="flex items-center gap-3.5">
                        {/* Avatar */}
                        <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-[1px] group-hover:shadow-[0_0_12px_rgba(99,102,241,0.4)] transition-shadow">
                          <div className="h-full w-full rounded-full bg-background flex items-center justify-center">
                            <span className="text-[11px] font-bold bg-clip-text text-transparent bg-gradient-to-br from-indigo-400 to-purple-400">
                              {initials}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-base font-semibold text-foreground truncate group-hover:text-indigo-400 transition-colors">{getContactName(contact)}</span>
                          {contact.email && (
                            <span className="text-[13px] text-muted-foreground truncate max-w-[200px] mt-0.5">
                              {contact.email}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-3 align-middle whitespace-nowrap">
                      <div className="text-[15px] font-medium text-foreground">
                        {contact.mobile_number}
                      </div>
                    </td>

                    <td className="px-5 py-3 align-middle">
                      <div className="flex flex-wrap gap-2 line-clamp-1 max-w-[250px]">
                        {contact.group_ids && contact.group_ids.length > 0 ? (
                          contact.group_ids.slice(0, 2).map((gid, idx) => {
                            const grp = groups.find(g => g.id === gid);
                            return (
                              <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded bg-secondary/80 border border-border/50 text-[11px] font-medium text-muted-foreground whitespace-nowrap group-hover:border-border transition-colors">
                                {grp ? grp.title : "Unknown"}
                              </span>
                            );
                          })
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-muted/40 border border-border/30 text-[11px] font-medium text-muted-foreground/70">
                            No Group
                          </span>
                        )}
                        {contact.group_ids && contact.group_ids.length > 2 && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-secondary/80 border border-border/50 text-[11px] font-medium text-foreground">
                            +{contact.group_ids.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    
                    <td className="px-5 py-3 align-middle whitespace-nowrap">
                       <span className="inline-flex items-center gap-1.5">
                         <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                         <span className="text-[13px] font-medium text-foreground">Active</span>
                       </span>
                    </td>

                    <td className="px-5 py-3 align-middle whitespace-nowrap text-right">
                      <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <DropdownMenu.Root
                          open={activeMenuId === contact.id}
                          onOpenChange={(open) => setActiveMenuId(open ? contact.id : null)}
                        >
                          <DropdownMenu.Trigger asChild>
                            <button 
                              type="button"
                              aria-haspopup="menu"
                              aria-expanded={activeMenuId === contact.id}
                              className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer focus:outline-none"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                          </DropdownMenu.Trigger>

                          <DropdownMenu.Portal>
                            <DropdownMenu.Content
                              align="end"
                              sideOffset={4}
                              className="rounded-xl border border-border/80 backdrop-blur-xl p-1 shadow-xl z-[9999] animate-fade-in text-left select-none w-44 focus:outline-none"
                              style={{ backgroundColor: "var(--contacts-dropdown-bg)" }}
                            >
                              <DropdownMenu.Item
                                disabled
                                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium text-muted-foreground data-[disabled]:opacity-40 transition-colors cursor-default select-none focus:outline-none"
                              >
                                <Eye className="h-4 w-4" />
                                View Details
                              </DropdownMenu.Item>

                              <DropdownMenu.Item
                                onSelect={() => {
                                  navigator.clipboard.writeText(contact.mobile_number);
                                  showSuccessToast("Mobile number copied");
                                }}
                                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium text-foreground hover:bg-secondary focus:bg-secondary focus:outline-none transition-colors cursor-pointer select-none"
                              >
                                <Copy className="h-4 w-4 text-muted-foreground" />
                                Copy Mobile
                              </DropdownMenu.Item>

                              <div className="h-px w-full bg-border/50 my-1"></div>

                              <DropdownMenu.Item
                                disabled
                                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium text-destructive data-[disabled]:opacity-40 transition-colors cursor-default select-none focus:outline-none"
                              >
                                <Trash2 className="h-4 w-4" />
                                Delete
                              </DropdownMenu.Item>
                            </DropdownMenu.Content>
                          </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center">
                  <div className="flex justify-center mb-4"><Users className="h-10 w-10 text-muted-foreground/30 transition-colors" /></div>
                  <div className="text-sm font-semibold text-foreground transition-colors">No matching contacts</div>
                  <div className="text-sm text-muted-foreground mt-1 transition-colors">We couldn't find any contacts matching your search.</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
