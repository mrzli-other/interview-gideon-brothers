from datetime import timezone

def to_iso_utc(value):
  utc_date = value.astimezone(timezone.utc)
  return utc_date.strftime('%Y-%m-%dT%H:%M:%S.%fZ')