# -*- coding: utf-8 -*-
"""
[확장용 스캐폴딩 - 현재 미사용]

AWS S3에 올라와 있는 SQLite DB 파일을 주기적으로 내려받아
db.py의 DB_PATH 위치에 갱신해두는 역할을 맡을 모듈입니다.

지금은 실제 자격증명(AWS 키)도, 버킷 이름도 정해지지 않았기 때문에
동작하지 않는 stub 상태로 둡니다. 나중에 실제로 쓰게 되면:

    1) requirements.txt 의 boto3 주석을 해제
    2) .env 에 AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY / S3_BUCKET / S3_KEY 추가
    3) 아래 download_db_from_s3() 구현을 채우고, 배포 시작 시(app.py) 한 번 호출
       + 필요하다면 APScheduler 등으로 주기 실행
"""

import os
import logging
from pathlib import Path

from db import DB_PATH

logger = logging.getLogger(__name__)


def download_db_from_s3() -> bool:
    """
    S3에서 SQLite DB 파일을 받아와 DB_PATH에 저장합니다.
    현재는 미구현 stub이며, 환경변수가 없으면 그냥 조용히 건너뜁니다.

    반환값: 실제로 다운로드했으면 True, 건너뛰었으면 False
    """
    bucket = os.getenv("S3_BUCKET")
    key = os.getenv("S3_KEY")

    if not bucket or not key:
        logger.info("[sync] S3_BUCKET/S3_KEY 미설정 - DB 동기화를 건너뜁니다 (미사용 상태).")
        return False

    # 실제 구현 예시 (boto3 설치 및 주석 해제 후 사용):
    #
    # import boto3
    # DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    # s3 = boto3.client("s3")
    # s3.download_file(bucket, key, str(DB_PATH))
    # logger.info(f"[sync] S3에서 DB 다운로드 완료: s3://{bucket}/{key} -> {DB_PATH}")
    # return True

    logger.warning("[sync] boto3 연동이 아직 구현되지 않았습니다.")
    return False
