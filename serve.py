# Dev server that tells the browser never to cache, so edits always show up
# on a normal refresh. Run: python3 serve.py   (then open http://localhost:8000,
# or the network address it prints from a phone on the same Wi-Fi)
#
# It also serves src/cloudConfig.js made from your .env file (see .env.example
# and scripts/cloud_config.py), so your Supabase keys never need to be committed.
import socket
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

from scripts.cloud_config import cloud_config_js


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_GET(self):
        if self.path.split("?")[0] != "/src/cloudConfig.js":
            return super().do_GET()
        body = cloud_config_js().encode()
        self.send_response(200)
        self.send_header("Content-Type", "text/javascript")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def lan_ip():
    """This machine's address on the local network, or None if offline."""
    # Connecting a UDP socket sends nothing; it just picks the outgoing interface.
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
        try:
            s.connect(("10.255.255.255", 1))
            return s.getsockname()[0]
        except OSError:
            return None


if __name__ == "__main__":
    print("Serving on http://localhost:8000")
    if ip := lan_ip():
        print(f"On your phone (same Wi-Fi): http://{ip}:8000")
    ThreadingHTTPServer(("", 8000), NoCacheHandler).serve_forever()
