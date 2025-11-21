import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageCircle, CreditCard, X } from "lucide-react";
import { toast } from "sonner";

const DEFAULTS = {
  phone: "+233538724430",
  whatsapp: "+233538724430",
  email: "info@adomakoedusupport.org",
  bank: {
    bankName: "Sample Bank",
    accountName: "Adomako EduSupport Foundation",
    accountNumber: "0538724430",
    branch: "Teberebie Branch",
  },
};

const ContactActions = ({
  phone = DEFAULTS.phone,
  whatsapp = DEFAULTS.whatsapp,
  email = DEFAULTS.email,
  bank = DEFAULTS.bank,
  open: openProp, // optional controlled
  mode: modeProp, // optional controlled
  onClose,
  hideTriggerButtons = false,
}) => {
  const isControlled = typeof openProp === "boolean";
  const [openState, setOpenState] = useState(false);
  const [modeState, setModeState] = useState(null); // 'donate' | 'partner' | 'volunteer'

  const openPanel = (m) => {
    if (isControlled) return; // parent controls open
    setModeState(m);
    setOpenState(true);
  };

  const closePanel = () => {
    if (isControlled) {
      onClose?.();
      return;
    }
    setOpenState(false);
    setModeState(null);
  };

  const copy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard`);
    } catch (err) {
      toast.error("Unable to copy");
    }
  };

  const whatsappLink = (num, pre = "") => {
    const clean = num.replace(/[^0-9+]/g, "");
    const msg = encodeURIComponent(pre);
    return `https://wa.me/${clean}${msg ? `?text=${msg}` : ""}`;
  };

  const open = isControlled ? openProp : openState;
  const mode = isControlled ? modeProp : modeState;

  return (
    <div className="container mx-auto px-4 my-12">
      {!hideTriggerButtons && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button onClick={() => (isControlled ? onClose?.() : openPanel("donate"))} className="w-full">Donate</Button>
          <Button onClick={() => (isControlled ? onClose?.() : openPanel("partner"))} variant="outline" className="w-full">Partner</Button>
          <Button onClick={() => (isControlled ? onClose?.() : openPanel("volunteer"))} variant="outline" className="w-full">Volunteer</Button>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-black/40" onClick={closePanel} />
          <div role="dialog" aria-modal="true" className="relative w-full max-w-lg bg-background rounded-xl shadow-lg p-6">
            <button aria-label="Close" onClick={closePanel} className="absolute right-4 top-4 text-muted-foreground">
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-2xl font-bold mb-2">Contact the Founder</h3>
            <p className="text-sm text-muted-foreground mb-4">Choose an option below to reach the founder directly.</p>

            <div className="grid grid-cols-1 gap-3">
              <a className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition" href={`tel:${phone}`}>
                <Phone className="h-5 w-5" />
                <span>Call: {phone}</span>
              </a>

              <a className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition" href={whatsappLink(whatsapp, `Hello, I'm interested in ${mode}`)} target="_blank" rel="noreferrer">
                <MessageCircle className="h-5 w-5" />
                <span>WhatsApp: {whatsapp}</span>
              </a>

              <a className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition" href={`mailto:${email}?subject=${encodeURIComponent(mode ? `${mode} enquiry` : "Enquiry")}`}>
                <Mail className="h-5 w-5" />
                <span>Email: {email}</span>
              </a>
            </div>

            {mode === "donate" && (
              <div className="mt-6 border-t pt-4">
                <h4 className="text-lg font-semibold mb-2">Bank Details</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div><strong>Bank:</strong> {bank.bankName}</div>
                  <div><strong>Account Name:</strong> {bank.accountName}</div>
                  <div className="flex items-center justify-between">
                    <div><strong>Account Number:</strong> {bank.accountNumber}</div>
                    <div>
                      <Button size="sm" onClick={() => copy(bank.accountNumber, "Account number")}>Copy</Button>
                    </div>
                  </div>
                  <div><strong>Branch:</strong> {bank.branch}</div>
                </div>
                <div className="mt-3 text-xs text-muted-foreground">Thank you for supporting our programs — your contribution makes a difference.</div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default ContactActions;
