import { Patient, SafetyAlert } from '@/types/patient';
import { AlertTriangle, AlertCircle, Info, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SafetyPanelProps {
  patient: Patient;
  alerts: SafetyAlert[];
}

export function SafetyPanel({ patient, alerts }: SafetyPanelProps) {
  const getSeverityConfig = (severity: SafetyAlert['severity']) => {
    switch (severity) {
      case 'critical':
        return {
          icon: <AlertTriangle className="w-4 h-4" />,
          bgColor: 'bg-critical/10',
          borderColor: 'border-critical/30',
          iconColor: 'text-critical',
          badgeClass: 'bg-critical text-critical-foreground',
        };
      case 'warning':
        return {
          icon: <AlertCircle className="w-4 h-4" />,
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/30',
          iconColor: 'text-warning',
          badgeClass: 'bg-warning text-warning-foreground',
        };
      case 'info':
        return {
          icon: <Info className="w-4 h-4" />,
          bgColor: 'bg-info/10',
          borderColor: 'border-info/30',
          iconColor: 'text-info',
          badgeClass: 'bg-info text-info-foreground',
        };
    }
  };

  const criticalAlerts = alerts.filter(a => a.severity === 'critical');
  const otherAlerts = alerts.filter(a => a.severity !== 'critical');

  return (
    <div className="panel p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-foreground" />
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
            Safety Alerts
          </h3>
        </div>
        <Badge
          variant="outline"
          className={cn(
            criticalAlerts.length > 0 ? 'border-critical text-critical' : 'border-success text-success'
          )}
        >
          {criticalAlerts.length > 0 ? `${criticalAlerts.length} Critical` : 'Reviewed'}
        </Badge>
      </div>

      {/* Allergies Section */}
      <div className="mb-4">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
          Known Allergies
        </h4>
        <div className="flex flex-wrap gap-2">
          {patient.allergies.map((allergy) => (
            <Badge
              key={allergy.id}
              className={cn(
                'font-normal',
                allergy.severity === 'severe' && 'bg-critical text-critical-foreground',
                allergy.severity === 'moderate' && 'bg-warning text-warning-foreground',
                allergy.severity === 'mild' && 'bg-info text-info-foreground'
              )}
            >
              {allergy.substance} ({allergy.reaction})
            </Badge>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-2">
        {alerts.map((alert) => {
          const config = getSeverityConfig(alert.severity);
          return (
            <div
              key={alert.id}
              className={cn(
                'rounded-lg border p-3',
                config.bgColor,
                config.borderColor
              )}
            >
              <div className="flex items-start gap-2">
                <span className={cn('mt-0.5', config.iconColor)}>{config.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.action}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* QTc Status */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">QTc Interval</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">
              {patient.qtcInterval} ms
            </span>
            <Badge
              variant="outline"
              className={cn(
                patient.qtcInterval > 470 && 'border-critical text-critical',
                patient.qtcInterval > 450 && patient.qtcInterval <= 470 && 'border-warning text-warning',
                patient.qtcInterval <= 450 && 'border-success text-success'
              )}
            >
              {patient.qtcInterval > 470 ? 'Prolonged' : patient.qtcInterval > 450 ? 'Borderline' : 'Normal'}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
