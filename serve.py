# Dev server that tells the browser never to cache, so edits always show up
# on a normal refresh. Run: python3 serve.py   (then open http://localhost:8000)
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    print("Serving on http://localhost:8000")
    ThreadingHTTPServer(("", 8000), NoCacheHandler).serve_forever()
