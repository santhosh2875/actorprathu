"""Local preview server. Run from this folder:  python -I serve.py   then open http://localhost:5177

Plain http.server can serve .js as text/plain on Windows, which breaks ES modules, so types are forced here.
"""
import functools
import http.server
from pathlib import Path

PORT = 5177
TYPES = {'.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
         '.webp': 'image/webp', '.svg': 'image/svg+xml', '.mp4': 'video/mp4'}


class Handler(http.server.SimpleHTTPRequestHandler):
    def guess_type(self, path):
        return TYPES.get(Path(str(path)).suffix.lower()) or super().guess_type(path)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()


if __name__ == '__main__':
    handler = functools.partial(Handler, directory=str(Path(__file__).resolve().parent))
    print(f'Serving on http://localhost:{PORT}')
    http.server.ThreadingHTTPServer(('127.0.0.1', PORT), handler).serve_forever()
