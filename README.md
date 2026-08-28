# 온라인 청첩장 (뼈대 버전)

Flask + Jinja2 + 바닐라 JS + PWA로 만든 모바일 청첩장입니다.
지금은 모든 내용이 **플레이스홀더**로 채워져 있는 "틀" 상태입니다.

## 폴더 구조

```
wedding-invitation/
├── app.py              # Flask 엔트리포인트 (라우팅)
├── config.py           # ⭐ 청첩장에 들어가는 모든 텍스트/정보 (실제 정보는 여기만 수정)
├── db.py                # [확장용/미사용] SQLite 연결 헬퍼
├── sync.py              # [확장용/미사용] S3 → SQLite 동기화 stub
├── requirements.txt
├── Procfile              # Render 시작 명령
├── render.yaml           # Render Blueprint 설정
├── templates/
│   ├── index.html        # 청첩장 본문 (Jinja2)
│   └── manifest.json     # PWA manifest (Jinja2로 렌더링)
└── static/
    ├── css/style.css     # 로맨틱 파스텔 톤 스타일
    ├── js/main.js        # 카운트다운/캘린더/복사버튼/갤러리 인터랙션
    ├── js/sw.js           # PWA 서비스워커
    ├── icons/             # PWA 아이콘 (지금은 SVG 플레이스홀더)
    └── img/gallery/       # 갤러리 사진 (지금은 SVG 플레이스홀더 6장)
```

## 1. 로컬에서 실행해보기

```bash
python3 -m venv .venv
source .venv/bin/activate        # Windows는 .venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

브라우저에서 http://localhost:5000 접속.

## 2. 실제 내용 채우기

**`config.py` 한 파일만 수정하면 됩니다.** 신랑신부 이름, 예식 일시, 장소, 인사말,
혼주 성함, 오시는 길 안내, 계좌번호 등이 전부 이 파일의 `WEDDING_INFO` 딕셔너리에
들어있습니다. 템플릿(html/css/js) 코드는 건드릴 필요 없습니다.

사진은 `static/img/gallery/` 폴더에 실제 파일(jpg/png)을 넣고,
`config.py`의 `gallery_images` 리스트에 파일명만 바꿔주면 됩니다.

지도는 현재 Google 지도 임베드(별도 API 키 불필요)를 사용 중이며,
`config.py`의 `map_lat`, `map_lng` 값만 예식장 실제 좌표로 바꾸면 됩니다.

## 3. GitHub 저장소 만들기

```bash
cd wedding-invitation
git init
git add .
git commit -m "Initial commit: 청첩장 뼈대"
```

GitHub에서 새 저장소를 만든 뒤 (Add README 체크 해제), 아래 명령으로 push:

```bash
git branch -M main
git remote add origin https://github.com/<GitHub아이디>/<저장소이름>.git
git push -u origin main
```

## 4. Render 배포

1. https://render.com 가입/로그인 (GitHub 계정으로 로그인 가능)
2. **New +** → **Web Service** 선택
3. 방금 만든 GitHub 저장소 연결 (처음이면 Render가 저장소 접근 권한을 요청함)
4. 아래처럼 설정 (render.yaml이 있으면 대부분 자동으로 채워집니다):
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Instance Type**: Free
5. **Create Web Service** 클릭 → 몇 분 뒤 `https://프로젝트이름.onrender.com` 형태의 URL 생성

이후 `main` 브랜치에 push할 때마다 Render가 자동으로 재배포합니다.

> **무료 플랜 주의사항**: Render 무료 Web Service는 15분간 요청이 없으면 슬립 상태로
> 전환되고, 다음 접속 시 깨어나는 데 30초~1분 정도 걸릴 수 있습니다. 청첩장처럼
> 하객이 링크를 눌러 바로 들어오는 용도라면 첫 접속이 느릴 수 있다는 점 참고하세요.

## 5. S3 → SQLite 확장 구조 (현재 미사용)

`db.py`, `sync.py`에 추후 조회 전용 데이터(예: 하객 명단 등)를 SQLite로
서빙하기 위한 최소 뼈대만 마련해두었습니다. 실제 데이터 용도가 정해지면:

1. `requirements.txt`의 `boto3` 주석 해제
2. Render 대시보드 → Environment 탭에서 `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`,
   `S3_BUCKET`, `S3_KEY` 환경변수 추가 (코드에 절대 하드코딩하지 않음)
3. `sync.py`의 `download_db_from_s3()` 구현 채우기

지금은 이 값들이 없으면 자동으로 건너뛰도록 되어 있어 앱 실행에는 영향 없습니다.

## 6. 아직 정해지지 않은 것들

- [ ] 신랑·신부 실명, 예식 일시/장소 (`config.py`)
- [ ] 실제 웨딩 사진 (`static/img/gallery/`)
- [ ] 실제 계좌번호 (`config.py`의 `accounts`)
- [ ] PWA 아이콘을 실제 로고/사진 기반 PNG로 교체 (`static/icons/`)
- [ ] 커스텀 도메인 연결 여부 (Render는 무료로도 커스텀 도메인 연결 가능)
