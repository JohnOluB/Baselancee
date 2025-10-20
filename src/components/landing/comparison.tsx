import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const comparisonData = [
  { feature: 'Platform Fee', baselance: '2% ✨', upwork: '10-20%', fiverr: '20%' },
  { feature: 'Payment Speed', baselance: 'Instant ⚡', upwork: '2-5 days', fiverr: 'Up to 14 days' },
  { feature: 'Withdrawal Fee', baselance: '< $0.01', upwork: '$1-$3', fiverr: '$1-$5' },
  { feature: 'Reputation', baselance: 'You own it 🔐', upwork: 'Platform-locked', fiverr: 'Platform-locked' },
  { feature: 'Disputes', baselance: 'Transparent', upwork: 'Opaque', fiverr: 'Opaque' },
];

export default function Comparison() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl">Why Freelancers Choose BaseLance</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Stop overpaying and waiting for your money. See how we stack up.
          </p>
        </div>
        <div className="mt-12 overflow-hidden rounded-xl border shadow-lg">
          <Table className="bg-background">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[200px] text-base font-semibold">Feature</TableHead>
                <TableHead className="text-center text-base font-semibold">
                  <span className="text-primary">BaseLance</span>
                </TableHead>
                <TableHead className="text-center text-base font-semibold">Upwork</TableHead>
                <TableHead className="text-center text-base font-semibold">Fiverr</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonData.map((row) => (
                <TableRow key={row.feature} className="text-base">
                  <TableCell className="font-medium text-foreground">{row.feature}</TableCell>
                  <TableCell className="text-center font-semibold text-success-green bg-primary/5">{row.baselance}</TableCell>
                  <TableCell className="text-center text-muted-foreground">{row.upwork}</TableCell>
                  <TableCell className="text-center text-muted-foreground">{row.fiverr}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
