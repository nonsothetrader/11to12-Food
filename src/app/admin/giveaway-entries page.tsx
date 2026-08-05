'use client';

import { useMemo } from 'react';
import { useCollection } from '@/firebase/firestore/use-collection';
import { useFirebase, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Gift } from 'lucide-react';

type GiveawayEntry = {
    id: string;
    email: string;
    timestamp: {
        seconds: number;
        nanoseconds: number;
    };
};

export default function GiveawayEntriesPage() {
    const { firestore } = useFirebase();
    
    const entriesQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'giveaway_entries'), orderBy('timestamp', 'desc'));
    }, [firestore]);

    const { data: entries, isLoading } = useCollection<GiveawayEntry>(entriesQuery);

    const formatTimestamp = (timestamp: any) => {
        if (!timestamp) return 'N/A';
        return new Date(timestamp.seconds * 1000).toLocaleString();
    }

  return (
    <div className="flex-1 p-4 md:p-8 space-y-6">
        <div className="flex items-center gap-4">
            <Gift className="h-8 w-8 text-primary" />
            <div>
                <h1 className="text-3xl font-bold">Giveaway Entries</h1>
                <p className="text-muted-foreground">
                See everyone who signed up for a free lunch on the landing page.
                </p>
            </div>
        </div>
      
      <Card>
        <CardHeader>
            <CardTitle>Subscriber Leads</CardTitle>
            <CardDescription>Potential customers gathered from the free lunch dispatch timer.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email Address</TableHead>
                <TableHead>Submission Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                    <TableCell colSpan={2} className="h-24 text-center">
                        Loading entries...
                    </TableCell>
                </TableRow>
              ) : entries && entries.length > 0 ? (
                entries.map(entry => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">{entry.email}</TableCell>
                    <TableCell>{formatTimestamp(entry.timestamp)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="h-24 text-center">
                    No entries yet. Share the link to start gathering leads!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}