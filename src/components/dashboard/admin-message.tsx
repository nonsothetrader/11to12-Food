
'use client';

import type { AdminMessageData } from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Megaphone } from 'lucide-react';

interface AdminMessageProps {
    messageData: AdminMessageData;
}

export function AdminMessage({ messageData }: AdminMessageProps) {
  if (!messageData || !messageData.message) return null;

  return (
    <Alert className="bg-primary/10 border-primary/20">
      <Megaphone className="h-4 w-4 text-primary" />
      <AlertTitle className="text-primary font-bold">{messageData.title}</AlertTitle>
      <AlertDescription className="text-primary/90">
        {messageData.message}
      </AlertDescription>
    </Alert>
  );
}
