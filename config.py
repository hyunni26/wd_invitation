# -*- coding: utf-8 -*-
"""
청첩장에 들어가는 모든 텍스트/정보를 한 곳에서 관리합니다.
실제 정보가 정해지면 아래 값들만 수정하면 됩니다. (템플릿 코드는 건드릴 필요 없음)
"""

WEDDING_INFO = {

    # ── 상단 대문 사진 (이름/날짜/장소 뒤 배경) ─────
    # 실제 사진 준비되면 static/img/ 에 넣고 파일명만 바꿔주세요 (jpg/png/webp 다 가능).
    # None으로 두면 사진 없이 원래의 파스텔 그라데이션 배경으로 표시됩니다.
    "hero_photo": "main_photo.svg",

    # ── 기본 정보 ─────────────────────────────
    "groom_name_kr": "백대열",
    "groom_name_en": "Baek Daeyeol",
    "bride_name_kr": "정수현",
    "bride_name_en": "Chung Suhyun",

    # ── 예식 일시 ─────────────────────────────
    "wedding_date": "2027-03-06",       # YYYY-MM-DD
    "wedding_time": "14:00",            # 24시간제 HH:MM
    "wedding_date_display": "2027년 3월 6일 토요일 오후 2시",

    # ── 예식 장소 ─────────────────────────────
    "venue_name": "MJ컨벤션 웨딩홀 3층 다이너스티홀",
    "venue_address": "경기 부천시 소사구 경인로 386",
    "venue_tel": "032-347-5500",

    # ── 인사말 ────────────────────────────────
    "greeting_title": "저희 결혼합니다",
    "greeting_message": (
        "서로 다른 길을 걸어온 두 사람이\n"
        "이제 하나의 길을 함께 걸어가려 합니다.\n\n"
        "따뜻한 마음으로 축복해 주시면\n"
        "더없이 큰 힘이 되겠습니다."
    ),

    # ── 혼주 정보 ─────────────────────────────
    "groom_father": "백계철",
    "groom_mother": "이수경",
    "bride_father": "정상택",
    "bride_mother": "신동숙",

    # ── 오시는 길 ─────────────────────────────
    "map_lat": 37.5011,
    "map_lng": 126.7675,
    "transit_subway": "지하철 1호선/서해선 소사역 1번 출구에서 도보 5분",
    "transit_bus": "간선버스 60-1, 99, 20번, 지선버스 19, 53, 83, 88번 · 소사어울마당삼거리·MJ컨벤션 정류소 하차",
    "transit_car": "내비게이션에 'MJ컨벤션'으로 검색",
    "parking_info": "500대 규모 전용 주차타워 주차가능 (하객 2시간 무료)",

    # ── 마음 전하실 곳 (계좌번호) ────────────────
    "accounts": {
        "groom_side": [
            {"role": "신랑", "name": "백대열", "bank": "하나은행", "number": "000-0000-0000-00"},
            {"role": "신랑 父", "name": "백계철", "bank": "우체국", "number": "000-0000-0000-00"},
        ],
        "bride_side": [
            {"role": "신부", "name": "정수현", "bank": "우리은행", "number": "000-0000-0000-00"},
            {"role": "신부 母", "name": "신동숙", "bank": "국민은행", "number": "000-0000-0000-00"},
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
