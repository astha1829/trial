import React, { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Group } from "../types";
import { Search, ChevronDown, ChevronUp, Copy, Layers, Pencil, Trash2, Eye } from "lucide-react";
import { showSuccessToast } from "@/lib/toast-helper";

interface GroupsTableProps {
  groups: Group[];
}

type SortField = "title" | "description";
type SortOrder = "asc" | "desc";

function ActionTooltip({ children, content }: { children: React.ReactNode; content: string }) {
  return (
    <div className="relative flex items-center group/tooltip">
      {children}
      <span 
        role="tooltip"
        className="absolute bottom-full right-0 mb-2 px-2.5 py-1 text-[11px] font-bold text-white bg-slate-950 dark:bg-slate-900 border border-border rounded-lg hidden group-hover/tooltip:block transition-all duration-200 whitespace-nowrap shadow-lg z-30 font-sans"
      >
        {content}
      </span>
    </div>
  );
}

export function GroupsTable({ groups }: GroupsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("title");
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

  const filteredAndSorted = groups
    .filter((g) => g.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      let aVal = a[sortField] || "";
      let bVal = b[sortField] || "";
      
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronDown className="h-3 w-3 text-slate-600 opacity-0 group-hover:opacity-100" />;
    return sortOrder === "asc" ? <ChevronUp className="h-3 w-3 text-blue-400" /> : <ChevronDown className="h-3 w-3 text-blue-400" />;
  };

  return (
    <div className="flex flex-col border rounded-2xl shadow-lg dark:shadow-2xl transition-colors duration-300 select-none groups-table-container dark:backdrop-blur-xl">
      {/* Table Toolbar */}
      <div className="px-5 py-2.5 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-t-2xl transition-colors groups-table-toolbar">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/85 transition-colors" />
          <input
            type="text"
            placeholder="Search groups by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ backgroundColor: "var(--groups-search-bg)", borderColor: "var(--groups-search-border)" }}
            className="w-full h-10 pl-9 pr-4 rounded-xl bg-background border text-[13px] font-medium text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/50 transition-all shadow-inner"
          />
        </div>
        
        {/* Count */}
        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
          <div className="px-2.5 py-1 rounded bg-secondary/80 dark:bg-secondary/50 text-[10px] font-black uppercase tracking-wider text-muted-foreground border border-border transition-colors">
            {filteredAndSorted.length} {filteredAndSorted.length === 1 ? "group" : "groups"}
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead className="sticky top-0 backdrop-blur-md z-10 border-b transition-colors groups-table-header">
            <tr>
              <th 
                className="px-5 py-3 text-[12px] md:text-[13px] font-black uppercase tracking-wider text-muted-foreground dark:text-muted-foreground/90 cursor-pointer group hover:bg-secondary/10 dark:hover:bg-secondary/65 transition-colors select-none w-[30%]"
                onClick={() => handleSort("title")}
              >
                <div className="flex items-center gap-2">Group Name <SortIcon field="title" /></div>
              </th>

              <th 
                className="px-5 py-3 text-[12px] md:text-[13px] font-black uppercase tracking-wider text-muted-foreground dark:text-muted-foreground/90 cursor-pointer group hover:bg-secondary/10 dark:hover:bg-secondary/65 transition-colors select-none w-[60%]"
                onClick={() => handleSort("description")}
              >
                <div className="flex items-center gap-2">Description <SortIcon field="description" /></div>
              </th>
              
              <th className="px-5 py-3 text-right text-[12px] md:text-[13px] font-black uppercase tracking-wider text-muted-foreground dark:text-muted-foreground/90 w-[10%] transition-colors">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 transition-colors">
            {filteredAndSorted.length > 0 ? (
              filteredAndSorted.map((group) => {
                return (
                  <tr 
                    key={group.id} 
                    className="min-h-[60px] h-[60px] group transition-all duration-150 border-b border-border/60 last:border-0 cursor-pointer border-l-[3px] border-l-transparent hover:border-l-primary dark:hover:border-l-blue-500 shadow-sm hover:shadow-[0_4px_12px_rgba(0,0,0,0.01)] dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] groups-table-row"
                  >
                    <td className="px-5 py-3 align-middle whitespace-nowrap">
                      <div className="text-[15px] font-semibold text-foreground flex items-center gap-2">
                        {group.title}
                      </div>
                    </td>

                    <td className="px-5 py-3 align-middle">
                      <div className="text-[14px] text-muted-foreground font-medium leading-[1.5] max-w-[600px] break-words line-clamp-1 pr-6">
                        {group.description || <span className="italic text-muted-foreground/70 font-medium">No description provided</span>}
                      </div>
                    </td>
                    
                    <td className="px-5 py-3 align-middle whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <ActionTooltip content="Actions menu">
                          <DropdownMenu.Root
                            open={activeMenuId === group.id}
                            onOpenChange={(open) => setActiveMenuId(open ? group.id : null)}
                          >
                            <DropdownMenu.Trigger asChild>
                              <button 
                                type="button"
                                aria-haspopup="menu"
                                aria-expanded={activeMenuId === group.id}
                                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-secondary/80 hover:bg-secondary text-xs font-bold text-muted-foreground hover:text-foreground transition-all cursor-pointer shadow-sm focus:outline-none focus:ring-1 focus:ring-primary/30"
                              >
                                Actions
                                <ChevronDown 
                                  className="h-3 w-3 transition-transform duration-200" 
                                  style={{ transform: activeMenuId === group.id ? 'rotate(180deg)' : 'none' }} 
                                />
                              </button>
                            </DropdownMenu.Trigger>

                            <DropdownMenu.Portal>
                              <DropdownMenu.Content
                                align="end"
                                sideOffset={4}
                                className="rounded-xl border border-border bg-card p-1.5 shadow-lg dark:shadow-2xl z-[9999] animate-fade-in text-left select-none w-48 min-w-[192px] focus:outline-none"
                              >
                                <DropdownMenu.Item
                                  disabled
                                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-muted-foreground/40 data-[disabled]:text-muted-foreground/30 data-[disabled]:pointer-events-none transition-colors text-left select-none focus:outline-none"
                                >
                                  <Eye className="h-3.5 w-3.5" />
                                  View Details
                                </DropdownMenu.Item>

                                <DropdownMenu.Item
                                  onSelect={() => {
                                    navigator.clipboard.writeText(group.id);
                                    showSuccessToast("Group ID copied to clipboard");
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-foreground hover:bg-secondary focus:bg-secondary focus:outline-none transition-colors text-left cursor-pointer select-none mt-1"
                                >
                                  <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                                  Copy Group ID
                                </DropdownMenu.Item>

                                <DropdownMenu.Item
                                  disabled
                                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-destructive/40 data-[disabled]:text-destructive/30 data-[disabled]:pointer-events-none transition-colors text-left select-none border-t border-border/30 mt-1 pt-1.5 focus:outline-none"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                  Delete Group
                                </DropdownMenu.Item>
                              </DropdownMenu.Content>
                            </DropdownMenu.Portal>
                          </DropdownMenu.Root>
                        </ActionTooltip>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-16 text-center">
                  <div className="flex justify-center mb-4"><Layers className="h-10 w-10 text-muted-foreground transition-colors" /></div>
                  <div className="text-sm font-bold text-muted-foreground transition-colors">No matching groups found</div>
                  <div className="text-xs text-muted-foreground mt-1 transition-colors">Try a different search term.</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
