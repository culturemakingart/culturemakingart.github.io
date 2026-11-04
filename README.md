# 문화제작예술소 웹사이트 (정적 HTML/CSS)

GitHub Pages에 그대로 올릴 수 있는 정적 사이트입니다. 빌드 도구 없이 동작합니다.
디자인은 Claude, 구조는 확정된 `사이트 구조 초안` 문서를 따릅니다.

## 로컬에서 보기
폴더 링크(`about/`)를 쓰기 때문에 파일을 더블클릭하지 말고 간단한 서버로 열어주세요.

```
cd 이_폴더
python3 -m http.server 8000
# http://localhost:8000
```

## 페이지 구성
| 경로 | 파일 | 내용 |
| --- | --- | --- |
| / | index.html | 소개 화면만 (추가 섹션 없음) |
| /about/ | about/index.html | 소개·지향점, 활동 방식, 구성원, 연혁 |
| /projects/ | projects/index.html | 활동 기록 목록 (현재 자리표시 카드) |
| /projects/{slug}/ | projects/activity-template/index.html | 활동 상세 템플릿 (noindex, 복사해서 사용) |
| /collaboration/ | collaboration/index.html | 협업 방식, 대표 프로그램, 진행 흐름, 제안 시 알려줄 내용 |
| /collaboration/programs/ | collaboration/programs/index.html | 교육 프로그램 16개, 이름 검색·구분 필터 |
| /collaboration/programs/{slug}/ | collaboration/programs/*/index.html | 프로그램 상세 16개 |
| /contact/ | contact/index.html | 이메일, 제목 작성 안내, 주소 복사 |
| (없는 주소) | 404.html | GitHub Pages 404 |

모든 내부 링크는 상대 경로입니다. 단, `404.html`은 어느 주소에서든 열리므로 `/assets/...` 절대 경로를 씁니다.
커스텀 도메인 없이 `username.github.io/저장소이름/`으로 배포하면 404 페이지의 경로만 수정이 필요합니다.

## 파일 구조
```
assets/
  css/style.css        공통 스타일. 색·폰트는 맨 위 :root 토큰에서 관리
  js/main.js           모바일 메뉴, 이메일 주소 복사
  js/programs.js       프로그램 목록 검색·필터 (HTML에 있는 카드를 보이기/숨기기만 함)
  data/programs.json   프로그램 16개 원본 데이터 (slug, 시간·회차·인원, 구분, 기존 구글사이트 주소)
  img/logo.png         로고
  img/favicon.svg      파비콘 (다이아몬드 꽃)
  fonts/               DungGeunMo 파일을 넣을 곳 (README 참고)
docs/url-map.csv       기존 구글 사이트 주소 → 새 경로 대응표
tools/build.py         HTML을 다시 만드는 파이썬 스크립트 (선택)
```

`tools/build.py`는 programs.json과 같은 데이터로 모든 페이지를 생성합니다. 직접 HTML을 고쳐도 되고,
템플릿 엔진(예: Eleventy)으로 옮길 때 참고용으로 써도 됩니다. 스크립트를 다시 돌리면 손으로 고친 HTML은 덮어씌워집니다.

## 디자인 토큰
| 이름 | 값 | 용도 |
| --- | --- | --- |
| Sunset Petal | #E4568B | 버튼 그림자, 현재 메뉴 표시, 꽃 |
| Evening Sky | #A7C7E4 | 창 제목줄, 카드 배경 |
| Leaflit Green | #5D7B3D | 꽃 줄기, 색 띠 |
| Golden Pollen | #F6C94D | 강조 배경, 스티커, 정보표 그림자 |
| Rosebud Blush | #F29BB9 | 사진 창 그림자, 카드 배경 |
| ink | #24331A | 본문·테두리 (Leaflit Green을 어둡게) |
| petal-text | #B23A6B | 작은 분홍 글자 (대비 확보용) |
| leaf-deep | #3F5A2A | 녹색 안내 띠 |
| cream | #FFF8EC | 페이지 바탕 |

- 제목·메뉴·버튼·라벨: DungGeunMo (`.px`, `--font-pixel`)
- 본문: IBM Plex Sans KR (Google Fonts)
- 모양 규칙: 2px 진한 녹색 테두리, 번짐 없는 픽셀 그림자, 사진은 '창 프레임' 안에
- 반응형 기준: 900px 이하에서 메뉴 접힘·1단 배치, 600px 이하에서 모바일 간격

## 실제 콘텐츠로 바꿀 곳
- `[대괄호]` 문구는 모두 자리표시입니다. 사이트 전체에서 `[` 로 검색하면 찾을 수 있어요.
- 사진: `<div class="ph ...">[ ... ]</div>`를 `<img src="..." alt="사진 설명">`으로 교체. 크기·비율은 CSS가 맞춥니다.
- 프로그램 목록 필터 구분(자율교육과정 / 교과 연계 / 동아리 / 협의·개발 중)은 비고 칸 기준 임시 분류입니다. 상세 내용 확인 후 programs.json의 `group`과 함께 바꿔주세요.
- 기존 구조 문서의 "육섬의 열섬지도"는 기존 사이트 메뉴 표기("육지의 열섬지도")를 따랐습니다. 확인이 필요합니다.
- 주소·외부 채널은 현행 확인 전이라 게시하지 않았습니다 (contact/index.html 하단 주석).
- 협의 흐름 4단계는 구조 문서의 제안안이며, 실제 운영 방식 확인이 필요합니다.
- 활동 상세는 `projects/activity-template/`를 복사해 `projects/{slug}/`로 만들고, robots noindex 줄을 지워주세요.

## 배포 (GitHub Pages)
1. 이 폴더 내용을 저장소 루트에 올립니다.
2. Settings → Pages에서 배포 브랜치를 지정합니다.
3. 커스텀 도메인을 쓰면 루트에 `CNAME` 파일(도메인 한 줄)을 추가하고, 도메인 업체 DNS를 GitHub Pages로 연결합니다.
