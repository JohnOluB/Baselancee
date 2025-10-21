
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, Lock, TrendingUp, XCircle } from "lucide-react";

const comparisonData = [
  {
    feature: "Platform Fee",
    baseLance: "2% ✨",
    upwork: "10-20%",
    fiverr: "20%",
  },
  {
    feature: "Payment Speed",
    baseLance: "Instant ⚡",
    upwork: "2-5 days",
    fiverr: "Up to 14 days",
  },
  {
    feature: "Withdrawal Fee",
    baseLance: "< $0.01",
    upwork: "$1-$3",
    fiverr: "$1-$5",
  },
  {
    feature: "Reputation",
    baseLance: "You own it 🔐",
    upwork: "Platform-locked",
    fiverr: "Platform-locked",
  },
  {
    feature: "Disputes",
    baseLance: "Transparent",
    upwork: "Opaque",
    fiverr: "Opaque",
  },
];


export default function Comparison() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl">Why Freelancers Choose BaseLance</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Stop overpaying and waiting for your money. See how we stack up.
          </p>
        </div>
        <Card className="mt-12 shadow-lg">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/4 font-semibold text-foreground text-base">Feature</TableHead>
                    <TableHead className="w-1/4 font-semibold text-foreground text-base text-center">
                      <span className="flex items-center justify-center gap-2">
                        BaseLance
                        <Badge variant="secondary" className="bg-primary/10 text-primary">Beta</Badge>
                      </span>
                    </TableHead>
                    <TableHead className="w-1/4 font-semibold text-muted-foreground text-base text-center">Upwork</TableHead>
                    <TableHead className="w-1/4 font-semibold text-muted-foreground text-base text-center">Fiverr</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonData.map((row) => (
                    <TableRow key={row.feature}>
                      <TableCell className="font-medium">{row.feature}</TableCell>
                      <TableCell className="text-center font-semibold text-primary">{row.baseLance}</TableCell>
                      <TableCell className="text-center text-muted-foreground">{row.upwork}</TableCell>
                      <TableCell className="text-center text-muted-foreground">{row.fiverr}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
