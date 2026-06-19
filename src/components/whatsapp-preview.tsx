import React from "react";
import { Image as ImageIcon, Check } from "lucide-react";

interface WhatsAppPreviewProps {
  content: string | Record<string, any>;
  params?: Record<string, string>;
}

export function WhatsAppPreview({ content, params = {} }: WhatsAppPreviewProps) {
  const rawContentStr = typeof content === 'string' ? content : JSON.stringify(content || "");
  let parsedContent: any = null;
  try {
    parsedContent = JSON.parse(rawContentStr);
  } catch (e) {
    
  }

  const hasImage = rawContentStr.includes("image=true") || rawContentStr.includes("IMAGE") || parsedContent?.header_type === "IMAGE";
  
  let headerText = parsedContent?.header_text || parsedContent?.header || null;
  let bodyText = parsedContent?.text || parsedContent?.body || (!parsedContent ? rawContentStr : JSON.stringify(parsedContent, null, 2));
  let footerText = parsedContent?.footer_text || parsedContent?.footer || null;

  
  const substitute = (text: string | null) => {
    if (!text) return text;
    let newText = text;
    Object.entries(params).forEach(([key, value]) => {
      if (!value) return;
      
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
      newText = newText.replace(regex, value);
    });
    return newText;
  };

  headerText = substitute(headerText);
  bodyText = substitute(bodyText);
  footerText = substitute(footerText);

  return (
    <div className="rounded-[2rem] bg-[#0b141a] p-4 md:p-6 shadow-inner relative overflow-hidden border border-white/5 flex flex-col min-h-[400px]">
      {}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
      
      {}
      <div className="bg-[#005c4b] rounded-2xl rounded-tr-sm p-3 max-w-[95%] relative z-10 shadow-md ml-auto self-end min-w-[200px]">
        {(hasImage || params?.header_image) && (
          <div className="w-full h-36 bg-black/20 rounded-xl mb-3 flex items-center justify-center border border-white/5 relative overflow-hidden">
            {params?.header_image ? (
              <img src={params.header_image} alt="Header Preview" className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="h-10 w-10 text-white/30" />
            )}
          </div>
        )}
        
        {headerText && (
          <div className="text-[15px] font-bold text-white mb-2 leading-tight">
            {headerText}
          </div>
        )}

        <div className="text-[14px] text-[#e9edef] whitespace-pre-wrap leading-relaxed px-1">
          {bodyText}
        </div>

        {footerText && (
          <div className="text-[12px] text-white/50 mt-2 font-medium">
            {footerText}
          </div>
        )}
        
        <div className="flex justify-end mt-2 items-center gap-1 opacity-80">
          <span className="text-[10px] text-white/60 font-medium">12:00 PM</span>
          <Check className="h-3.5 w-3.5 text-[#53bdeb] -ml-0.5" />
          <Check className="h-3.5 w-3.5 text-[#53bdeb] -ml-2.5" />
        </div>
      </div>
    </div>
  );
}
