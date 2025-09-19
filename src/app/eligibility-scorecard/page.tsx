"use client";
import { CreditCard, User, CheckCircle, XCircle, AlertTriangle, BarChart3 } from "lucide-react";

export default function EligibilityScoreCardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Eligibility Score Card</h1>
          <p className="text-muted-foreground">
            Assess farmer eligibility and creditworthiness for agricultural financing
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">Eligible</span>
          </div>
          <div className="text-2xl font-bold">1,847</div>
          <p className="text-xs text-muted-foreground">Farmers approved</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4 text-red-600" />
            <span className="text-sm font-medium">Ineligible</span>
          </div>
          <div className="text-2xl font-bold">432</div>
          <p className="text-xs text-muted-foreground">Applications rejected</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-medium">Under Review</span>
          </div>
          <div className="text-2xl font-bold">156</div>
          <p className="text-xs text-muted-foreground">Pending assessment</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">Avg Score</span>
          </div>
          <div className="text-2xl font-bold">742</div>
          <p className="text-xs text-muted-foreground">Out of 850</p>
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Recent Assessments</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { name: "John Mukasa", farmId: "FM001", score: 785, status: "Eligible", risk: "Low", date: "2024-01-15" },
              { name: "Mary Nakato", farmId: "FM002", score: 692, status: "Eligible", risk: "Medium", date: "2024-01-15" },
              { name: "Peter Ssali", farmId: "FM003", score: 456, status: "Ineligible", risk: "High", date: "2024-01-14" },
              { name: "Grace Nambi", farmId: "FM004", score: 723, status: "Under Review", risk: "Medium", date: "2024-01-14" },
              { name: "David Kato", farmId: "FM005", score: 812, status: "Eligible", risk: "Low", date: "2024-01-13" },
            ].map((assessment, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{assessment.name}</div>
                    <div className="text-sm text-muted-foreground">{assessment.farmId} • {assessment.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-lg font-bold">{assessment.score}</div>
                    <div className="text-xs text-muted-foreground">Score</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-sm font-medium ${
                      assessment.risk === 'Low' ? 'text-green-600' :
                      assessment.risk === 'Medium' ? 'text-amber-600' : 'text-red-600'
                    }`}>
                      {assessment.risk}
                    </div>
                    <div className="text-xs text-muted-foreground">Risk</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    assessment.status === 'Eligible' ? 'bg-green-100 text-green-700' :
                    assessment.status === 'Ineligible' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {assessment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Score Distribution</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Excellent (750-850)</span>
                <span>32%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '32%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Good (650-749)</span>
                <span>41%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '41%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Fair (550-649)</span>
                <span>19%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-amber-600 h-2 rounded-full" style={{width: '19%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Poor (Below 550)</span>
                <span>8%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full" style={{width: '8%'}}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Assessment Criteria</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="font-medium">Financial History</span>
              <span className="text-sm text-muted-foreground">35%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="font-medium">Farm Assets</span>
              <span className="text-sm text-muted-foreground">25%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="font-medium">Production History</span>
              <span className="text-sm text-muted-foreground">20%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="font-medium">Market Access</span>
              <span className="text-sm text-muted-foreground">20%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
