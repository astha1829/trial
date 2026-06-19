import React, { useState } from "react";
import { Template } from "../types";
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  Send, 
  Copy,
  BarChart3,
  CalendarDays
} from "lucide-react";
import { toast } from "sonner";

interface TemplatesTableProps {
  templates: Template[];
  onSelect: (template: Template) => void;
  selectedId?: string;
}

type SortField = "template_name" | "category" | "status" | "language" | "messages_sent" | "last_used" | "success_rate";
type SortOrder = "asc" | "desc";

export function TemplatesTable({ templates, onSelect, selectedId }: TemplatesTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("template_name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc"); // Default to desc for performance metrics
    }
  };

  const copyTemplateId = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    toast.success("Template ID copied to clipboard");
  };

  const filteredAndSorted = templates
    .filter((t) => t.template_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                   t.category.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      let aVal: any = a[sortField as keyof Template] ?? 0;
      let bVal: any = b[sortField as keyof Template] ?? 0;
      
      if (typeof aVal === "string") aVal = aVal.toLowerCase();
      if (typeof bVal === "string") bVal = bVal.toLowerCase();

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronDown className="h-3 w-3 text-slate-600 opacity-0 group-hover:opacity-100" />;
    return sortOrder === "asc" ? <ChevronUp className="h-3 w-3 text-blue-400" /> : <ChevronDown className="h-3 w-3 text-blue-400" />;
  };

  return (
    <div className="flex flex-col bg-card/60 backdrop-blur-xl border border-border rounded-2xl shadow-2xl transition-colors duration-300">
      {/* Table Toolbar */}
      <div className="p-5 border-b border-border flex items-center justify-between bg-secondary/40 rounded-t-2xl transition-colors">
        <div className="flex items-center gap-4">
          <div className="relative w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-background border border-border text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50 transition-colors shadow-inner"
            />
          </div>
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground font-bold transition-colors">
            Showing <span className="text-foreground">{filteredAndSorted.length}</span> templates
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1100px]">
          <thead className="sticky top-0 bg-secondary/95 backdrop-blur-md z-10 shadow-sm border-b border-border transition-colors">
            <tr>
              <th 
                className="px-6 py-5 text-[13px] md:text-[14px] font-black text-muted-foreground tracking-widest cursor-pointer group hover:bg-secondary/50 transition-colors select-none w-[20%]"
                onClick={() => handleSort("template_name")}
              >
                <div className="flex items-center gap-2">Template <SortIcon field="template_name" /></div>
              </th>
              <th 
                className="px-6 py-5 text-[13px] md:text-[14px] font-black text-muted-foreground tracking-widest cursor-pointer group hover:bg-secondary/50 transition-colors select-none"
                onClick={() => handleSort("category")}
              >
                <div className="flex items-center gap-2">Category <SortIcon field="category" /></div>
              </th>
              <th 
                className="px-6 py-5 text-[13px] md:text-[14px] font-black text-muted-foreground tracking-widest cursor-pointer group hover:bg-secondary/50 transition-colors select-none"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center gap-2">Status <SortIcon field="status" /></div>
              </th>
              <th 
                className="px-6 py-5 text-[13px] md:text-[14px] font-black text-muted-foreground tracking-widest cursor-pointer group hover:bg-secondary/50 transition-colors select-none"
                onClick={() => handleSort("messages_sent")}
              >
                <div className="flex items-center justify-end gap-2 text-right w-full">Sent <SortIcon field="messages_sent" /></div>
              </th>
              <th 
                className="px-6 py-5 text-[13px] md:text-[14px] font-black text-muted-foreground tracking-widest cursor-pointer group hover:bg-secondary/50 transition-colors select-none"
                onClick={() => handleSort("success_rate")}
              >
                <div className="flex items-center justify-end gap-2 text-right w-full">Success Rate <SortIcon field="success_rate" /></div>
              </th>
              <th 
                className="px-6 py-5 text-[13px] md:text-[14px] font-black text-muted-foreground tracking-widest cursor-pointer group hover:bg-secondary/50 transition-colors select-none"
                onClick={() => handleSort("last_used")}
              >
                <div className="flex items-center gap-2">Last Used <SortIcon field="last_used" /></div>
              </th>
              <th className="px-6 py-5 text-right text-[13px] md:text-[14px] font-black text-muted-foreground tracking-widest transition-colors">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border transition-colors">
            {filteredAndSorted.length > 0 ? (
              filteredAndSorted.map((template) => {
                const isSelected = selectedId === template.template_id;
                const isApproved = template.status.toLowerCase() === "approved";
                const isPending = template.status.toLowerCase() === "pending";
                const isRejected = template.status.toLowerCase() === "rejected";
                
                const sent = template.messages_sent ?? 0;
                const successRate = template.success_rate ?? 0;
                const lastUsed = template.last_used ? new Date(template.last_used).toLocaleDateString() : "Never";

                return (
                  <tr 
                    key={template.template_id} 
                    onClick={() => onSelect(template)}
                    className={`group cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? "bg-blue-500/10 border-l-[3px] border-l-blue-500 shadow-[inset_0_0_20px_rgba(59,130,246,0.05)]" 
                        : "hover:bg-secondary/30 border-l-[3px] border-l-transparent"
                    }`}
                  >
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-[15px] md:text-[16px] font-semibold text-foreground group-hover:text-blue-400 transition-colors flex items-center gap-2">
                        {template.template_name}
                      </div>
                      <div className="text-[12px] md:text-[13px] text-muted-foreground font-mono mt-1 opacity-70 group-hover:opacity-100 transition-opacity">
                        {template.language.toUpperCase()} • ID: {template.template_id.substring(0, 8)}...
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="px-3 py-1.5 rounded-md bg-secondary text-[12px] md:text-[13px] text-foreground font-medium border border-border transition-colors">
                        {template.category}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[12px] font-bold tracking-wider w-fit transition-colors ${
                        isApproved ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : 
                        isPending ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : 
                        isRejected ? "bg-rose-500/10 text-rose-400 border-rose-500/20" : "bg-secondary text-muted-foreground border-border"
                      }`}>
                        <span className={`h-2 w-2 rounded-full ${
                          isApproved ? "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" : 
                          isPending ? "bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]" : 
                          isRejected ? "bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.8)]" : "bg-slate-400"
                        }`} />
                        <span className="uppercase">{template.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-right">
                      <div className="text-[14px] md:text-[15px] font-mono text-foreground flex items-center justify-end gap-2 transition-colors">
                        {sent > 0 ? sent.toLocaleString() : "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-right">
                      <div className={`text-[14px] md:text-[15px] font-semibold transition-colors ${successRate >= 90 ? 'text-emerald-400' : successRate > 0 ? 'text-amber-400' : 'text-muted-foreground'}`}>
                        {successRate > 0 ? `${successRate.toFixed(1)}%` : "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-[13px] font-medium text-muted-foreground transition-colors">
                        <CalendarDays className="h-4 w-4" />
                        {lastUsed}
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => { e.stopPropagation(); onSelect(template); }}
                          title="Preview Template"
                          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); onSelect(template); }}
                          title="Send Test"
                          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors"
                        >
                          <Send className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={(e) => copyTemplateId(e, template.template_id)}
                          title="Copy ID"
                          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-16 text-center">
                  <div className="flex justify-center mb-4"><BarChart3 className="h-10 w-10 text-muted-foreground transition-colors" /></div>
                  <div className="text-sm font-bold text-muted-foreground transition-colors">No performance data found</div>
                  <div className="text-xs text-muted-foreground mt-1 transition-colors">Try adjusting your search filters</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
