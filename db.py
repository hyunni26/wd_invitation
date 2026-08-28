# -*- coding: utf-8 -*-
"""
[확장용 스캐폴딩 - 현재 미사용]

추후 조회 전용 데이터(예: 하객 명단, 축의금 입금 내역 등)를 SQLite로
서빙해야 할 때를 위한 최소 연결 헬퍼입니다. 지금은 어떤 라우트에서도
호출되지 않으며, 실제 DB 파일도 존재하지 않습니다.

사용하게 될 때의 흐름:
    1) sync.py 의 download_db_from_s3() 로 최신 SQLite 파일을 로컬에 받아온다
    2) 이 모듈의 get_connection() 으로 읽기 전용 커넥션을 연다
    3) 필요 시 ATTACH DATABASE 로 여러 SQLite 파일을 하나의 커넥션에 붙여 JOIN 한다
"""

import sqlite3
from pathlib import Path

# S3에서 받아온 SQLite 파일이 저장될 로컬 경로 (현재는 파일 없음 / 미사용)
DB_PATH = Path(__file__).parent / "data" / "app.db"


def get_connection(read_only: bool = True) -> sqlite3.Connection:
    """SQLite 커넥션을 반환합니다. (현재 미사용 - 호출 시 DB_PATH가 없으면 에러)"""
    if read_only:
        uri = f"file:{DB_PATH}?mode=ro"
        return sqlite3.connect(uri, uri=True)
    return sqlite3.connect(DB_PATH)


def attach_database(conn: sqlite3.Connection, alias: str, path: Path) -> None:
    """추가 SQLite 파일을 현재 커넥션에 ATTACH 합니다. (여러 DB를 JOIN 하고 싶을 때 사용)"""
    conn.execute(f"ATTACH DATABASE '{path}' AS {alias}")
