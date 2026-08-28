# -*- coding: utf-8 -*-
"""
온라인 청첩장 - Flask 앱 엔트리포인트

로컬 실행:
    pip install -r requirements.txt
    python app.py
    -> http://localhost:5000

배포(Render):
    gunicorn app:app  (start command, README 참고)
"""

import logging
import os

from flask import Flask, render_template, send_from_directory

from config import WEDDING_INFO
from sync import download_db_from_s3

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# [확장용 - 현재 미사용] 앱 기동 시 S3 DB 동기화 시도 (자격증명 없으면 자동으로 건너뜀)
download_db_from_s3()


@app.route("/")
def index():
    return render_template("index.html", info=WEDDING_INFO)


@app.route("/healthz")
def healthz():
    """Render 등 배포 환경의 헬스체크용 엔드포인트"""
    return {"status": "ok"}, 200


# ── PWA 관련 파일은 scope가 사이트 전체(/)가 되도록 루트 경로로 서빙 ──
@app.route("/manifest.json")
def manifest():
    body = render_template("manifest.json", info=WEDDING_INFO)
    return app.response_class(body, mimetype="application/manifest+json")


@app.route("/og-cover.svg")
def og_cover():
    # 카카오톡 등 링크 공유 미리보기 이미지. config.py의 이름이 바뀌면 자동으로 반영됨
    body = render_template("og-cover.svg", info=WEDDING_INFO)
    return app.response_class(body, mimetype="image/svg+xml")


@app.route("/sw.js")
def service_worker():
    response = send_from_directory("static/js", "sw.js", mimetype="application/javascript")
    # /static/ 밖에서 서빙되더라도 사이트 전체를 제어할 수 있도록 허용
    response.headers["Service-Worker-Allowed"] = "/"
    return response


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_DEBUG", "1") == "1"
    app.run(host="0.0.0.0", port=port, debug=debug)
