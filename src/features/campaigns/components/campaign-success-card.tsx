import React from "react";
import { 
  Rocket, CheckCircle2, Eye, Copy, Download,
  Target, FileText, Users, Calendar, Clock
} from "lucide-react";

export function CampaignSuccessCard() {
  return (
    <div className="flex flex-col md:flex-row w-full bg-white border border-[#E5E7EB] rounded-[20px] p-[32px] min-h-[340px] gap-[32px] font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>
      
      {}
      <div className="flex-1 lg:w-[60%] flex flex-col">
        
        {}
        <div className="flex items-start gap-6">
          {}
          <div className="w-[96px] h-[96px] rounded-[24px] shadow-sm flex items-center justify-center shrink-0" 
               style={{ background: 'linear-gradient(135deg, #A78BFA, #6D4AFF)' }}>
            <Rocket className="w-12 h-12 text-white" />
          </div>

          <div className="flex flex-col gap-2 pt-1">
            {}
            <div className="flex">
              <span className="bg-[#DCFCE7] text-[#16A34A] rounded-full h-[28px] px-[12px] flex items-center text-[12px] font-bold uppercase tracking-wide gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                COMPLETED
              </span>
            </div>

            {}
            <h1 className="text-[42px] font-[800] text-[#0F172A] leading-[1.1] mt-1">
              Hello World
            </h1>

            {}
            <p className="text-[16px] font-[400] text-[#64748B]">
              Bulkify ticket for office team announcement.
            </p>
          </div>
        </div>

        {}
        <div className="flex items-center justify-between mt-8">
          <div className="flex items-center gap-2">
            <Target className="w-[18px] h-[18px] text-[#64748B]" />
            <span className="text-[14px] font-[500] text-[#475569]">Office</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-[18px] h-[18px] text-[#64748B]" />
            <span className="text-[14px] font-[500] text-[#475569]">bulkify_ticket</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-[18px] h-[18px] text-[#64748B]" />
            <span className="text-[14px] font-[500] text-[#475569]">3 Recipients</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-[18px] h-[18px] text-[#64748B]" />
            <span className="text-[14px] font-[500] text-[#475569]">Jun 15, 2026</span>
          </div>
        </div>

        {}
        <div className="border-t border-[#E5E7EB] my-[24px]"></div>

        {}
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-1">
            <span className="text-[13px] text-[#64748B] flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> Created
            </span>
            <span className="text-[14px] font-[500] text-[#0F172A] mt-1">
              Jun 15, 2026, 10:07:12 PM
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[13px] text-[#64748B] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> Completed
            </span>
            <span className="text-[14px] font-[500] text-[#16A34A] mt-1">
              Jun 15, 2026, 10:07:15 PM
            </span>
          </div>
        </div>

        {}
        <div className="flex items-center gap-4 mt-8">
          <button className="h-[44px] px-5 rounded-[12px] border border-[#E5E7EB] bg-white text-[#0F172A] font-[600] text-[14px] hover:bg-gray-50 flex items-center gap-2 transition-colors">
            <Eye className="w-4 h-4" /> View Template
          </button>
          <button className="h-[44px] px-5 rounded-[12px] border border-[#E5E7EB] bg-white text-[#0F172A] font-[600] text-[14px] hover:bg-gray-50 flex items-center gap-2 transition-colors">
            <Copy className="w-4 h-4" /> Duplicate
          </button>
          <button className="h-[44px] px-5 rounded-[12px] bg-[#F3F0FF] text-[#6D4AFF] font-[600] text-[14px] hover:bg-[#EBE5FF] flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
        
      </div>

      {}
      <div className="lg:w-[40%] flex flex-col h-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-[20px] p-[32px] relative overflow-hidden">
        
        <div className="flex flex-col items-center text-center">
          {}
          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 bg-[#10B981] opacity-20 blur-[20px] rounded-full scale-150"></div>
            <div className="w-[96px] h-[96px] rounded-full flex items-center justify-center relative z-10 shadow-lg"
                 style={{ background: 'linear-gradient(135deg, #34D399, #059669)' }}>
              <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={3} />
            </div>
          </div>

          {}
          <h2 className="text-[28px] font-[700] text-[#065F46] leading-tight">
            Campaign Completed!
          </h2>

          {}
          <p className="text-[15px] font-[400] text-[#64748B] mt-2 mb-6">
            Your message has been successfully delivered.
          </p>
        </div>

        {}
        <div className="border-t border-[#E5E7EB] w-full my-6"></div>

        {}
        <div className="grid grid-cols-2 gap-[24px] mb-8">
          <div className="flex flex-col gap-1">
            <span className="text-[13px] text-[#64748B]">Success Rate</span>
            <span className="text-[36px] font-[800] text-[#10B981] leading-none mt-1">100%</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[13px] text-[#64748B]">Messages Sent</span>
            <span className="text-[36px] font-[800] text-[#0F172A] leading-none mt-1">3</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[13px] text-[#64748B]">Failed</span>
            <span className="text-[36px] font-[800] text-[#EF4444] leading-none mt-1">0</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[13px] text-[#64748B]">Completion Time</span>
            <span className="text-[36px] font-[800] text-[#0F172A] leading-none mt-1">10:07 PM</span>
          </div>
        </div>

        {}
        <div className="w-full h-[5px] rounded-full bg-[#10B981] mt-auto"></div>

      </div>

    </div>
  );
}
