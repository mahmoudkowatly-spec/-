import React, { useEffect, useRef } from "react";
import { WifiOff } from "lucide-react";
import { toast } from "sonner";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  const prevOnline = useRef<boolean>(isOnline);

  useEffect(() => {
    if (prevOnline.current !== isOnline) {
      if (!isOnline) {
        toast.warning("وضع عدم الاتصال — يتم استخدام البيانات المخزنة محلياً");
      } else {
        toast.success("تمت استعادة الاتصال بالإنترنت");
      }
      prevOnline.current = isOnline;
    }
  }, [isOnline]);

  if (isOnline) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-lg border border-amber-700/30 bg-amber-600 px-3.5 py-2 text-xs font-semibold text-white shadow-lg print:hidden"
    >
      <WifiOff className="w-4 h-4 shrink-0" />
      <span>وضع عدم الاتصال — يتم استخدام البيانات المخزنة محلياً</span>
    </div>
  );
};
