"""Integration checks against the running demonstration server; no real data used."""
import json
from datetime import datetime, timedelta, timezone
from urllib.request import Request, urlopen
from urllib.error import HTTPError
from urllib.parse import urlparse, parse_qs
import time

origin = "http://127.0.0.1:3000"
day = datetime.now(timezone(timedelta(hours=5, minutes=30))).date() + timedelta(days=2)
while day.weekday() == 6:
    day += timedelta(days=1)
payload = dict(name="Demo & Test + नमस्ते", phone="9876543210", email="demo@example.com", service="General Dentistry", date=day.isoformat(), time="10:00", message="Test only: aligners & whitening?\nCall after 5 + confirm. #request", consent=True, website="", startedAt=int(time.time() * 1000) - 5000)

def request(data, expected, label, request_origin=origin):
    body = data if isinstance(data, bytes) else json.dumps(data).encode()
    req = Request(origin + "/api/appointments", data=body, headers={"Content-Type": "application/json", "Origin": request_origin, "X-Forwarded-For": "integration-check"}, method="POST")
    try:
        with urlopen(req) as response:
            code, result = response.status, json.load(response)
    except HTTPError as response:
        code, result = response.code, json.load(response)
    assert code == expected, (label, code, result)
    print("PASS", label, code)
    return result

result = request(payload, 200, "WhatsApp draft prepared")
assert result.get("mode") == "whatsapp"
url = urlparse(result["whatsappUrl"])
assert url.scheme == "https" and url.netloc == "wa.me" and url.path == "/918490997254"
query = parse_qs(url.query)
assert list(query) == ["text"]
message = query["text"][0]
for field in ["name", "phone", "email", "service", "message"]:
    assert payload[field] in message, field
assert "10:00 AM IST" in message and str(day.year) in message and "Contact consent: Yes" in message
assert "not a confirmed booking" in message and "startedAt" not in message
print("PASS destination, all fields, Unicode, special characters, timezone and pending status")
request({**payload, "date": "2020-01-01"}, 422, "past date rejected")
request({**payload, "date": "2027-02-30"}, 422, "impossible date rejected")
request({**payload, "email": "invalid", "phone": "123"}, 422, "invalid contact details rejected")
request({**payload, "consent": False}, 422, "missing consent rejected")
request({**payload, "website": "bot.example"}, 422, "honeypot rejected")
request({**payload, "startedAt": int(time.time() * 1000)}, 400, "instant submission rejected")
request(payload, 403, "cross-origin request rejected", "https://unrelated.example")
request(b"{broken", 400, "malformed JSON rejected")
request(b"x" * 13000, 413, "oversized request rejected")
empty = request({**payload, "message": ""}, 200, "optional message fallback")
assert "Message: Not provided" in parse_qs(urlparse(empty["whatsappUrl"]).query)["text"][0]
request(payload, 429, "rate limit enforced")
print("All endpoint integration checks passed.")
