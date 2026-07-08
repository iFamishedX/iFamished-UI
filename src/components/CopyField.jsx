import { GlassButton, Icon } from "ifamished-ui";
import { useState } from "react";

export default function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="copyfield">
      <div className="copyfield-left">
        <div className="copyfield-label">{label}</div>
        <div className="copyfield-value">{value}</div>
      </div>

      <GlassButton
        size="sm"
        variant="ghost"
        className="copyfield-btn"
        onClick={copy}
      >
        <Icon name={copied ? "check" : "copy"} size={14} />
      </GlassButton>
    </div>
  );
}
