import { Patient } from '@/types/patient';
import { Heart, Wind, Thermometer, Droplets, Activity, Gauge } from 'lucide-react';

interface VitalsPanelProps {
  patient: Patient;
}

interface VitalCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
}

function VitalCard({ icon, label, value, unit, status }: VitalCardProps) {
  const statusColors = {
    normal: 'border-success/30 bg-success/5',
    warning: 'border-warning/30 bg-warning/5',
    critical: 'border-critical/30 bg-critical/5 animate-pulse-subtle',
  };

  const iconColors = {
    normal: 'text-success',
    warning: 'text-warning',
    critical: 'text-critical',
  };

  return (
    <div className={`vital-card border-2 ${statusColors[status]}`}>
      <div className="flex items-center justify-between mb-2">
        <span className={`${iconColors[status]}`}>{icon}</span>
        <span className="text-xs text-muted-foreground uppercase tracking-wide">
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
    </div>
  );
}

export function VitalsPanel({ patient }: VitalsPanelProps) {
  const { vitals } = patient;

  const getHRStatus = (hr: number) => {
    if (hr > 120 || hr < 50) return 'critical';
    if (hr > 100 || hr < 60) return 'warning';
    return 'normal';
  };

  const getBPStatus = (sys: number) => {
    if (sys < 90) return 'critical';
    if (sys < 100 || sys > 140) return 'warning';
    return 'normal';
  };

  const getRRStatus = (rr: number) => {
    if (rr > 25 || rr < 8) return 'critical';
    if (rr > 20 || rr < 12) return 'warning';
    return 'normal';
  };

  const getSpO2Status = (spo2: number) => {
    if (spo2 < 90) return 'critical';
    if (spo2 < 94) return 'warning';
    return 'normal';
  };

  const getTempStatus = (temp: number) => {
    if (temp > 39 || temp < 35) return 'critical';
    if (temp > 38 || temp < 36) return 'warning';
    return 'normal';
  };

  const getLactateStatus = (lac: number) => {
    if (lac > 4) return 'critical';
    if (lac > 2) return 'warning';
    return 'normal';
  };

  return (
    <div className="panel p-4">
      <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
        Vital Signs
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <VitalCard
          icon={<Heart className="w-4 h-4" />}
          label="Heart Rate"
          value={vitals.heartRate}
          unit="bpm"
          status={getHRStatus(vitals.heartRate)}
        />
        <VitalCard
          icon={<Activity className="w-4 h-4" />}
          label="Blood Pressure"
          value={`${vitals.systolicBP}/${vitals.diastolicBP}`}
          unit="mmHg"
          status={getBPStatus(vitals.systolicBP)}
        />
        <VitalCard
          icon={<Wind className="w-4 h-4" />}
          label="Resp. Rate"
          value={vitals.respiratoryRate}
          unit="/min"
          status={getRRStatus(vitals.respiratoryRate)}
        />
        <VitalCard
          icon={<Gauge className="w-4 h-4" />}
          label="SpO₂"
          value={vitals.spO2}
          unit="%"
          status={getSpO2Status(vitals.spO2)}
        />
        <VitalCard
          icon={<Thermometer className="w-4 h-4" />}
          label="Temperature"
          value={vitals.temperature}
          unit="°C"
          status={getTempStatus(vitals.temperature)}
        />
        <VitalCard
          icon={<Droplets className="w-4 h-4" />}
          label="Lactate"
          value={vitals.lactate}
          unit="mmol/L"
          status={getLactateStatus(vitals.lactate)}
        />
      </div>
    </div>
  );
}
