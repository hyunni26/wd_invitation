# -*- coding: utf-8 -*-
"""
청첩장에 들어가는 모든 텍스트/정보를 한 곳에서 관리합니다.
실제 정보가 정해지면 아래 값들만 수정하면 됩니다. (템플릿 코드는 건드릴 필요 없음)
"""

WEDDING_INFO = {
    # ── 기본 정보 ─────────────────────────────
    "groom_name_kr": "홍길동",
    "groom_name_en": "Hong Gil Dong",
    "bride_name_kr": "김영희",
    "bride_name_en": "Kim Younghee",

    # ── 예식 일시 ─────────────────────────────
    "wedding_date": "2027-05-08",       # YYYY-MM-DD
    "wedding_time": "13:00",            # 24시간제 HH:MM
    "wedding_date_display": "2027년 5월 8일 토요일 오후 1시",

    # ── 예식 장소 ─────────────────────────────
    "venue_name": "○○컨벤션 웨딩홀 3층 그랜드홀",
    "venue_address": "서울특별시 ○○구 ○○로 123",
    "venue_tel": "02-1234-5678",

    # ── 인사말 ────────────────────────────────
    "greeting_title": "저희 결혼합니다",
    "greeting_message": (
        "서로 다른 길을 걸어온 두 사람이\n"
        "이제 하나의 길을 함께 걸어가려 합니다.\n\n"
        "따뜻한 마음으로 축복해 주시면\n"
        "더없이 큰 힘이 되겠습니다."
    ),

    # ── 혼주 정보 ─────────────────────────────
    "groom_father": "홍○○",
    "groom_mother": "이○○",
    "bride_father": "김○○",
    "bride_mother": "박○○",

    # ── 오시는 길 ─────────────────────────────
    "map_lat": 37.5665,
    "map_lng": 126.9780,
    "transit_subway": "지하철 2호선 ○○역 3번 출구에서 도보 5분",
    "transit_bus": "간선버스 000, 지선버스 0000 · ○○정류장 하차",
    "transit_car": "내비게이션에 '○○컨벤션'으로 검색",
    "parking_info": "건물 지하 1~3층 주차 가능 (하객 3시간 무료)",

    # ── 마음 전하실 곳 (계좌번호) ────────────────
    "accounts": {
        "groom_side": [
            {"role": "신랑", "name": "홍길동", "bank": "○○은행", "number": "000-0000-0000-00"},
            {"role": "신랑 父", "name": "홍○○", "bank": "○○은행", "number": "000-0000-0000-00"},
        ],
        "bride_side": [
            {"role": "신부", "name": "김영희", "bank": "○○은행", "number": "000-0000-0000-00"},
            {"role": "신부 父", "name": "김○○", "bank": "○○은행", "number": "000-0000-0000-00"},
        ],
    },

    # ── 갤러리 (실제 사진 추가 시 static/img/gallery/ 에 넣고 파일명만 교체) ──
    "gallery_images": [
        "gallery/placeholder-1.svg",
        "gallery/placeholder-2.svg",
        "gallery/placeholder-3.svg",
        "gallery/placeholder-4.svg",
        "gallery/placeholder-5.svg",
        "gallery/placeholder-6.svg",
    ],
}
