"use client";
import { Target, Settings, Play, Pause, BarChart3, TrendingUp, AlertCircle } from "lucide-react";

export default function ScoringEnginePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Scoring Engine</h1>
          <p className="text-muted-foreground">
            Configure and monitor credit scoring algorithms and models
          </p>
        </div>
        <button className="inline-flex items-center gap-2 h-9 rounded-lg bg-primary text-primary-foreground px-3 text-sm hover:bg-primary/90 transition-colors">
          <Settings className="h-4 w-4" />
          Configure Model
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">Active Models</span>
          </div>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-muted-foreground">Currently running</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">Accuracy</span>
          </div>
          <div className="text-2xl font-bold">94.2%</div>
          <p className="text-xs text-muted-foreground">Model performance</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-medium">Scores Today</span>
          </div>
          <div className="text-2xl font-bold">1,247</div>
          <p className="text-xs text-muted-foreground">Credit evaluations</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <span className="text-sm font-medium">Alerts</span>
          </div>
          <div className="text-2xl font-bold">2</div>
          <p className="text-xs text-muted-foreground">Require attention</p>
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Scoring Models</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { name: "Primary Credit Model", version: "v2.1", status: "Active", accuracy: 94.2, lastUpdated: "2 days ago" },
              { name: "Agricultural Risk Model", version: "v1.8", status: "Active", accuracy: 91.5, lastUpdated: "1 week ago" },
              { name: "Seasonal Adjustment Model", version: "v1.3", status: "Testing", accuracy: 88.7, lastUpdated: "3 days ago" },
            ].map((model, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{model.name}</div>
                    <div className="text-sm text-muted-foreground">{model.version} • Updated {model.lastUpdated}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">{model.accuracy}%</div>
                    <div className="text-xs text-muted-foreground">Accuracy</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      model.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {model.status}
                    </span>
                    <button className="h-8 w-8 inline-flex items-center justify-center rounded-lg border hover:bg-muted">
                      {model.status === 'Active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
