import React, { useState } from "react";
import { Download, Share, PlusSquare, Smartphone, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePWAInstall } from "@/hooks/usePWAInstall";

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <Button
        variant="default"
        onClick={async () => {
          const accepted = await install();
          if (accepted) {
            toast.success("تم تثبيت تطبيق منصة المقايسات على جهازك بنجاح");
          }
        }}
        className="whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
      >
        <Download className="w-4 h-4 shrink-0" />
        <span>تثبيت التطبيق</span>
      </Button>
    );
  }

  if (isIOS) {
    return (
      <>
        <Button
          variant="outline"
          onClick={() => setShowIOSGuide(true)}
          className="whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <Smartphone className="w-4 h-4 shrink-0" />
          <span>تثبيت التطبيق</span>
        </Button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <Card className="w-full max-w-sm bg-card border-2 shadow-2xl p-6 relative text-right">
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="absolute left-4 top-4 text-muted-foreground hover:text-foreground cursor-pointer"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold">
                    تثبيت على iPhone و iPad
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    يعمل كتطبيق مستقل وبدون إنترنت
                  </p>
                </div>
              </div>

              <ol className="space-y-3 text-sm text-foreground mb-5">
                <li className="flex items-start gap-2.5 p-2.5 rounded-lg border bg-muted/30">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold grid place-items-center shrink-0">
                    1
                  </span>
                  <span className="leading-relaxed">
                    اضغط على زر{" "}
                    <strong className="inline-flex items-center gap-1">
                      المشاركة <Share className="w-3.5 h-3.5 inline" />
                    </strong>{" "}
                    في شريط متصفح Safari.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 p-2.5 rounded-lg border bg-muted/30">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold grid place-items-center shrink-0">
                    2
                  </span>
                  <span className="leading-relaxed">
                    مرّر للأسفل واختر{" "}
                    <strong className="inline-flex items-center gap-1">
                      إضافة إلى الشاشة الرئيسية{" "}
                      <PlusSquare className="w-3.5 h-3.5 inline" />
                    </strong>
                    .
                  </span>
                </li>
              </ol>

              <Button
                type="button"
                className="w-full cursor-pointer"
                onClick={() => setShowIOSGuide(false)}
              >
                فهمت
              </Button>
            </Card>
          </div>
        )}
      </>
    );
  }

  return null;
};
