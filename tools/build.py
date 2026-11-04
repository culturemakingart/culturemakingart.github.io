import json, os
from urllib.parse import quote
from html import escape

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EMAIL = 'culturemakingart@gmail.com'
LEGACY = 'https://sites.google.com/view/culturemakingart/'

def flower(center='#F6C94D', stem='#5D7B3D', w=None, cls=''):
    size = f' width="{w}" height="{round(w*66/48)}"' if w else ''
    c = f' class="{cls}"' if cls else ''
    return (f'<svg{c}{size} viewBox="0 0 48 66" aria-hidden="true" focusable="false">'
      '<g fill="#E4568B"><polygon points="16,4 24,12 16,20 8,12"/><polygon points="32,4 40,12 32,20 24,12"/><polygon points="16,20 24,28 16,36 8,28"/><polygon points="32,20 40,28 32,36 24,28"/></g>'
      f'<polygon points="24,13 31,20 24,27 17,20" fill="{center}"/>'
      f'<g fill="{stem}"><polygon points="24,36 27,39 24,42 21,39"/><polygon points="24,43 27,46 24,49 21,46"/><polygon points="24,50 27,53 24,56 21,53"/><polygon points="24,57 27,60 24,63 21,60"/><polygon points="12,49 19,56 12,63 5,56"/><polygon points="36,49 43,56 36,63 29,56"/></g></svg>')

# ---------------- 데이터 ----------------
PROGRAMS = [
  dict(slug='x-box', title='X-box', sub='', note='자율교육과정', group='자율교육과정', link='자율교육과정', time='1시간', rounds='약 6회', people='약 20명', legacy='x-box'),
  dict(slug='my-sound-story', title='나만의 소리 이야기', sub='수동 오르골 만들기', note='음악 연계', group='교과 연계', link='음악', time='1시간', rounds='약 6회', people='약 20명', legacy='나만의-소리-이야기수동-오르골-만들기'),
  dict(slug='shining-story', title='빛나는 이야기', sub='폐목재로 무드등 만들기', note='자율교육과정', group='자율교육과정', link='자율교육과정', time='1시간', rounds='약 6회', people='약 20명', legacy='빛나는-이야기폐목재로-무드등-만들기'),
  dict(slug='layer-by-layer-story', title='한 층 한 층 쌓아보는 이야기', sub='코일링 기법으로 이야기 쌓기', note='자율교육과정', group='자율교육과정', link='자율교육과정', time='1시간', rounds='약 6회', people='약 10명', legacy='한-층-한-층-쌓아보는-이야기코일링-기법으로-이야기-쌓기'),
  dict(slug='terrain-story', title='지형 이야기 쌓기', sub='', note='지역 수치지도에 맞춰 변경', group='협의·개발 중', link='[확인 필요]', time='2시간', rounds='약 1회', people='약 20명', legacy='지형-이야기-쌓기'),
  dict(slug='resource', title='RE:SOURCE_다시 쓰는 자원: 예술이 되다', sub='', note='세부 협의', group='협의·개발 중', link='[확인 필요]', time='협의', rounds='협의', people='협의', legacy='resource_다시-쓰는-자원-예술이-되다'),
  dict(slug='heat-island-map', title='육지의 열섬지도', sub='', note='세부 내용 확인 중', group='협의·개발 중', link='[확인 필요]', time='2시간', rounds='약 3회', people='약 20명', dev=True, legacy='육지의-열섬지도'),
  dict(slug='local-book-nook', title='지역의 북누크', sub='', note='세부 내용 확인 중', group='협의·개발 중', link='[확인 필요]', time='2시간', rounds='약 4회', people='약 20명', dev=True, legacy='지역의-북누크'),
  dict(slug='one-eye-drawing', title='외눈 드로잉', sub='', note='인권 단원 연계', group='교과 연계', link='인권 단원', time='1시간', rounds='약 4회', people='약 30명', legacy='외눈-드로잉'),
  dict(slug='cola-print-human-rights', title='콜라판화로 드러나는 인권', sub='', note='인권 단원 연계', group='교과 연계', link='인권 단원', time='1시간', rounds='약 3회', people='약 30명', legacy='콜라판화로-드러나는-인권'),
  dict(slug='words-heard-by-hand', title='손으로 듣는 말', sub='', note='국어 연계', group='교과 연계', link='국어', time='1시간', rounds='약 3회', people='약 30명', legacy='손으로-듣는-말'),
  dict(slug='vessel-for-words', title='말을 담는 그릇', sub='', note='국어 연계', group='교과 연계', link='국어', time='1시간', rounds='약 5회', people='약 30명', legacy='말을-담는-그릇'),
  dict(slug='nickname-side-project', title='별칭의 딴짓', sub='', note='동아리', group='동아리', link='동아리', time='1시간', rounds='약 14회', people='약 30명', legacy='별칭의-딴짓'),
  dict(slug='unfamiliar-space', title='공간 낯설게 바라보기', sub='', note='생활과윤리 연계', group='교과 연계', link='생활과윤리', time='1시간', rounds='약 4회', people='약 30명', legacy='공간-낯설게-바라보기'),
  dict(slug='apple-face-mood-lamp', title='사과같은 내 얼굴 무드등', sub='', note='사회문화 연계', group='교과 연계', link='사회문화', time='1시간', rounds='약 14회', people='약 20명', legacy='사과같은내얼굴무드등'),
  dict(slug='blueprint-obscura', title='청사진 옵스큐라', sub='', note='사회문제탐구 연계', group='교과 연계', link='사회문제탐구', time='1시간', rounds='약 8회', people='5~30명', legacy='청사진-옵스큐라'),
]
for p in PROGRAMS:
    p.setdefault('dev', False)
    p['source_url'] = LEGACY + quote('문화예술교육-프로그램/' + p.pop('legacy'))
FILTERS = ['전체', '자율교육과정', '교과 연계', '동아리', '협의·개발 중']
FEATURED = ['my-sound-story', 'shining-story', 'cola-print-human-rights', 'blueprint-obscura']
BYSLUG = {p['slug']: p for p in PROGRAMS}
PH_BG = ['bg-sky', 'bg-blush', 'bg-pollen', 'bg-leaf']

# ---------------- 공통 틀 ----------------
NAV = [('HOME', ''), ('ABOUT', 'about/'), ('PROJECTS', 'projects/'), ('COLLABORATION', 'collaboration/'), ('CONTACT', 'contact/')]

def page(path, active, title, desc, body, scripts=(), noindex=False):
    depth = path.count('/')  # 'about/index.html' -> 1
    p = '../' * depth
    home = p or './'
    if path == '404.html':  # 어느 경로에서든 열리므로 절대 경로 사용
        p, home = '/', '/'
    links = []
    for label, href in NAV:
        url = (p + href) if href else home
        cur = ' aria-current="page"' if label == active else ''
        cls = ' class="nav-cta"' if label == 'CONTACT' else ''
        links.append(f'<a href="{url}"{cls}{cur}>{label}</a>')
    full_title = '문화제작예술소' if active == 'HOME' and title is None else f'{title} | 문화제작예술소'
    robots = '\n<meta name="robots" content="noindex">' if noindex else ''
    js = ''.join(f'\n<script src="{p}assets/js/{s}" defer></script>' for s in ('main.js',) + tuple(scripts))
    html = f'''<!doctype html>
<html lang="ko" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{escape(full_title)}</title>
<meta name="description" content="{escape(desc)}">{robots}
<meta property="og:title" content="{escape(full_title)}">
<meta property="og:description" content="{escape(desc)}">
<meta property="og:type" content="website">
<link rel="icon" href="{p}assets/img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;600&amp;display=swap">
<link rel="stylesheet" href="{p}assets/css/style.css">{js}
</head>
<body>
<a class="skip-link" href="#main">본문 바로가기</a>
<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="{home}"><img src="{p}assets/img/logo.png" alt="문화제작예술소 Culture making Art" width="2002" height="453"></a>
    <button class="nav-toggle" type="button" aria-controls="site-nav" aria-expanded="false" aria-label="메뉴 열기">
      <svg class="icon-open" width="20" height="16" viewBox="0 0 20 16" aria-hidden="true"><rect width="20" height="3" fill="#24331A"/><rect y="6.5" width="20" height="3" fill="#24331A"/><rect y="13" width="20" height="3" fill="#24331A"/></svg>
      <svg class="icon-close" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 2l14 14M16 2L2 16" stroke="#24331A" stroke-width="3"/></svg>
    </button>
    <nav id="site-nav" class="site-nav" aria-label="주 메뉴">
      {chr(10).join('      ' + l for l in links).strip()}
    </nav>
  </div>
</header>
<main id="main">
{body.strip()}
</main>
<footer class="site-footer">
  <div class="container footer-inner">
    <img src="{p}assets/img/logo.png" alt="문화제작예술소" width="2002" height="453">
    <div class="footer-meta">
      <a href="mailto:{EMAIL}">{EMAIL}</a>
      <span>© 문화제작예술소</span>
    </div>
  </div>
</footer>
</body>
</html>
'''
    out = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    open(out, 'w', encoding='utf-8').write(html)

def window(name, inner):
    return f'''<div class="window">
  <div class="window__bar"><span class="window__name">{name}</span><span class="window__dots" aria-hidden="true"><span></span><span></span><span></span></span></div>
  {inner}
</div>'''

def mailto(subject):
    return f'mailto:{EMAIL}?subject={quote(subject)}'

def program_card(p, i, href, h='h3'):
    sub = f'<p class="p-card__sub">{escape(p["sub"])}</p>' if p['sub'] else ''
    badge = '<span class="badge">기획 개발 중</span>' if p['dev'] else ''
    search = escape(p['title'] + ' ' + p['sub'])
    return f'''<a class="p-card" href="{href}" data-group="{p["group"]}" data-search="{search}">
  <div class="p-card__img"><div class="ph {PH_BG[i % 4]}">[ 수업 사진 ]</div></div>
  <div class="p-card__body">
    <div class="p-card__tags"><span class="tag">{escape(p["note"])}</span>{badge}</div>
    <{h} class="p-card__title">{escape(p["title"])}</{h}>
    {sub}
    <dl class="p-card__meta">
      <div><dt>시간</dt><dd>{p["time"]}</dd></div>
      <div><dt>회차</dt><dd>{p["rounds"]}</dd></div>
      <div><dt>인원</dt><dd>{p["people"]}</dd></div>
    </dl>
  </div>
</a>'''

INTRO = '문화제작예술소는 지역 주민이 환경의 변화를 감각적으로 읽어내고, 삶의 주체로서 지역을 향유하며, 일상을 낯설게 바라보는 예술적 시선을 회복할 수 있도록 다양한 프로그램을 기획하고 실행합니다.'

# ---------------- HOME ----------------
page('index.html', 'HOME', None, '문화제작예술소, 예술로 일상을 만나다. 지역과 기후위기를 주제로 프로그램을 기획하고 실행하는 시각예술단체입니다.', f'''
<section class="container hero">
  <div class="hero__text">
    <p class="eyebrow">[ 시각예술단체 ]</p>
    <h1 class="hero__title">예술로<br><span class="mark">일상</span>을<br>만나다</h1>
    <p class="hero__lead">{INTRO}</p>
    <div class="btn-row">
      <a class="btn btn--primary" href="collaboration/programs/">프로그램 보기 →</a>
      <a class="btn" href="about/">단체 소개</a>
    </div>
  </div>
  <div class="hero__visual">
    {window('home-artwork.jpg', '<img class="hero__photo" src="assets/img/home-artwork.jpg" alt="해 질 무렵 야외 광장에 놓인 천과 식물로 꾸민 이동식 설치 작품" width="1600" height="900" fetchpriority="high">')}
    <div class="sticker">{flower('#FFF8EC', '#24331A')}</div>
  </div>
</section>
''')

# ---------------- ABOUT ----------------
members = [('김가은', '주요 강사'), ('이서희', '주요 강사'), ('이시현', '회계·행정')]
member_html = '\n'.join(f'''<li class="member">
  <div class="ph">[ 사진 ]</div>
  <strong>{n}</strong>
  <span class="role">{r}</span>
  <p class="placeholder-text">[소개 — 학력·현재 소속은 게시 전 확인]</p>
</li>''' for n, r in members)
hist_rows = ''.join(f'''
    <li class="{cls}"><span class="history__year">[연도]</span><span class="history__name">[활동명]</span><span class="history__org">[기관]</span><span class="history__kind">{kind}</span></li>''' for cls, kind in [('is-org', '단체 활동'), ('is-org', '단체 활동'), ('is-prev', '구성원 이전 활동'), ('is-prev', '구성원 이전 활동')])
page('about/index.html', 'ABOUT', '단체 소개', '문화제작예술소가 무엇을 지향하고 어떻게 활동하는지, 함께하는 사람들과 연혁을 소개합니다.', f'''
<div class="container page-head">
  <p class="eyebrow">[ ABOUT ]</p>
  <h1 class="title-page">문화제작예술소는<br>이런 곳이에요</h1>
  <p class="lead">{INTRO}</p>
</div>

<section class="section section--paper" aria-labelledby="h-aim">
  <div class="container">
    <div class="section__head">
      <div><h2 id="h-aim" class="title-section">우리가 지향하는 것</h2></div>
      <p>2025년 문화제작예술소라는 이름으로 모여, 기후위기와 지역을 주제로 활동하고 있어요.</p>
    </div>
    <ul class="grid-3">
      <li class="block-card bg-sky"><h3>감각으로 읽기</h3><p>우리 동네 환경의 변화를 눈과 손으로 감각적으로 읽어냅니다.</p></li>
      <li class="block-card bg-blush"><h3>지역을 누리기</h3><p>삶의 주체로서 내가 사는 지역을 함께 향유합니다.</p></li>
      <li class="block-card bg-pollen"><h3>낯설게 바라보기</h3><p>익숙한 일상을 낯설게 바라보는 예술적 시선을 되찾습니다.</p></li>
    </ul>
  </div>
</section>

<section class="section" aria-labelledby="h-how">
  <div class="container split">
    <div class="stack">
      <h2 id="h-how" class="title-section">활동을 만드는 방식</h2>
    </div>
    <div class="prose">
      <p class="placeholder-text">[기획 방식 — 주제를 정하고 프로그램을 설계하는 과정]</p>
      <p class="placeholder-text">[실행 방식 — 기관·참여자와 함께 수업과 활동을 운영하는 방식]</p>
    </div>
  </div>
</section>

<section class="section section--paper" aria-labelledby="h-members">
  <div class="container">
    <div class="section__head"><div><h2 id="h-members" class="title-section">함께하는 사람들</h2></div></div>
    <ul class="grid-3">
{member_html}
    </ul>
  </div>
</section>

<section class="section" aria-labelledby="h-history">
  <div class="container">
    <div class="section__head">
      <div><h2 id="h-history" class="title-section">연혁</h2></div>
      <p>단체 이름으로 함께한 2025년 이후의 활동과, 그 전 구성원 각자의 활동을 나눠 적었어요.</p>
    </div>
    <div class="legend"><span class="is-org">단체 활동</span><span class="is-prev">구성원 이전 활동</span></div>
    <ol class="history">{hist_rows}
    </ol>
  </div>
</section>

<section class="section section--tight-top">
  <div class="container">
    <div class="band">
      <div><strong>어떤 활동을 해왔는지 볼까요?</strong><p>실제로 진행한 활동 기록과, 함께 만들 수 있는 협업 방식을 안내해요.</p></div>
      <div class="btn-row"><a class="btn btn--yellow" href="../projects/">활동 기록 보기</a><a class="btn" href="../collaboration/">협업 안내</a></div>
    </div>
  </div>
</section>
''')

# ---------------- PROJECTS ----------------
def activity_card(i):
    return f'''<li><a class="p-card" href="activity-template/">
  <div class="p-card__img"><div class="ph {PH_BG[i % 4]}">[ 대표 사진 ]</div></div>
  <div class="p-card__body">
    <span class="p-card__year">[연도]</span>
    <h2 class="p-card__title">[활동명]</h2>
    <p class="p-card__sub">[한두 문장 요약]</p>
    <div class="p-card__tags" style="margin-top:auto;padding-top:12px"><span class="tag">[활동 유형]</span></div>
  </div>
</a></li>'''
page('projects/index.html', 'PROJECTS', '활동 기록', '문화제작예술소가 실제로 진행한 활동과 수업의 기록입니다.', f'''
<div class="container page-head">
  <p class="eyebrow">[ PROJECTS ]</p>
  <h1 class="title-page">활동 기록</h1>
  <p class="lead">문화제작예술소가 지역과 기관에서 실제로 진행한 활동을 모았어요. 지금 제안할 수 있는 수업은 <a href="../collaboration/programs/">교육 프로그램</a>에서 볼 수 있어요.</p>
</div>
<section class="section section--tight-top" aria-label="활동 목록">
  <div class="container">
    <!-- 연도·활동 유형 필터는 실제 기록이 모인 뒤 분포를 보고 추가합니다. -->
    <ul class="card-grid">
{chr(10).join(activity_card(i) for i in range(6))}
    </ul>
  </div>
</section>
''')

# 활동 상세 템플릿
page('projects/activity-template/index.html', 'PROJECTS', '[활동명]', '[활동 요약]', f'''
<nav class="container crumbs" aria-label="현재 위치"><a href="../">활동 기록</a><span aria-hidden="true">/</span><span aria-current="page">[활동명]</span></nav>
<section class="container split" style="padding-top:40px;padding-bottom:88px">
  <div class="detail-head">
    <div class="tags"><span class="tag tag--fill">[활동 유형]</span><span class="tag">[연도]</span></div>
    <h1 class="title-page">[활동명]</h1>
    <p class="lead placeholder-text">[활동 한두 문장 요약]</p>
    <dl class="facts">
      <div><dt>연도</dt><dd>[연도]</dd></div>
      <div><dt>기간</dt><dd class="text">[기간]</dd></div>
      <div><dt>장소</dt><dd class="text">[장소]</dd></div>
      <div><dt>참여 대상</dt><dd class="text">[참여 대상]</dd></div>
      <div><dt>문화제작예술소의 역할</dt><dd class="text">[기획·운영 등]</dd></div>
      <div><dt>협력·주최 기관</dt><dd class="text">[기관명]</dd></div>
    </dl>
  </div>
  {window('activity.jpg', '<div class="ph ph--portrait">[ 대표 사진 ]</div>')}
</section>

<section class="section section--paper" aria-labelledby="h-story">
  <div class="container">
    <div class="section__head"><div><h2 id="h-story" class="title-section">활동 이야기</h2></div></div>
    <ol class="sequence">
      <li><h3>배경</h3><p class="placeholder-text">[왜 이 활동을 하게 되었는지]</p></li>
      <li><h3>과정</h3><p class="placeholder-text">[어떻게 진행했는지]</p></li>
      <li><h3>결과·기록</h3><p class="placeholder-text">[무엇이 남았는지]</p></li>
    </ol>
  </div>
</section>

<section class="section" aria-labelledby="h-photos">
  <div class="container">
    <div class="section__head"><div><h2 id="h-photos" class="title-section">현장 사진</h2></div></div>
    <div class="gallery">
      <figure><div class="ph bg-sky">[ 사진 1 ]</div><figcaption>[사진 설명]</figcaption></figure>
      <figure><div class="ph bg-pollen">[ 사진 2 ]</div><figcaption>[사진 설명]</figcaption></figure>
      <figure><div class="ph bg-blush">[ 사진 3 ]</div><figcaption>[사진 설명]</figcaption></figure>
    </div>
  </div>
</section>

<section class="section section--tight-top">
  <div class="container">
    <div class="band">
      <div><strong>비슷한 활동을 함께하고 싶다면</strong><p>관련 프로그램: <a href="../../collaboration/programs/">[관련 교육 프로그램]</a></p></div>
      <a class="btn btn--yellow" href="{mailto('[협업 문의] [활동명] 관련')}">이 활동 관련 문의하기</a>
    </div>
  </div>
</section>
''', noindex=True)

# ---------------- COLLABORATION ----------------
feat = '\n'.join(program_card(BYSLUG[s], i, f'programs/{s}/') for i, s in enumerate(FEATURED))
page('collaboration/index.html', 'COLLABORATION', '협업 안내', '문화예술교육 기획·운영, 기존 프로그램 조정, 생태·환경 주제 재기획까지 문화제작예술소와 함께할 수 있는 방식을 안내합니다.', f'''
<section class="section--dark on-dark" style="border-top:0">
  <div class="container page-head" style="padding-bottom:88px">
    <p class="eyebrow">[ COLLABORATION ]</p>
    <h1 class="title-page">필요한 모양으로<br>함께 다시 짭니다</h1>
    <p class="lead">모든 프로그램은 대상과 일정에 맞춰 협의 후 조정할 수 있어요. 생태·환경 주제를 엮은 재기획도 함께 고민해요.</p>
  </div>
</section>

<section class="section" aria-labelledby="h-ways">
  <div class="container">
    <div class="section__head"><div><h2 id="h-ways" class="title-section">함께할 수 있는 방식</h2></div></div>
    <ul class="grid-3">
      <li class="block-card bg-sky"><h3>문화예술교육 기획·운영</h3><p>기관의 목적과 참여자에 맞춰 새 프로그램을 기획하고 운영해요.</p></li>
      <li class="block-card bg-blush"><h3>기존 프로그램 조정</h3><p>교육 프로그램의 대상, 회차, 인원을 상황에 맞게 바꿔 진행해요.</p></li>
      <li class="block-card bg-pollen"><h3>생태·환경 주제 재기획</h3><p>기존 수업에 생태·환경 주제를 엮어 새롭게 구성해요.</p></li>
    </ul>
  </div>
</section>

<section class="section section--paper" aria-labelledby="h-programs">
  <div class="container">
    <div class="section__head">
      <div><h2 id="h-programs" class="title-section">교육 프로그램</h2></div>
      <a class="text-link" href="programs/">교육 프로그램 {len(PROGRAMS)}개 모두 보기 →</a>
    </div>
    <div class="grid-4">
{feat}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="h-flow">
  <div class="container">
    <div class="section__head"><div><h2 id="h-flow" class="title-section">이렇게 진행돼요</h2></div></div>
    <ol class="steps">
      <li><span class="step-no">1</span><h3>문의</h3><p>하고 싶은 활동과 상황을 메일로 알려주세요.</p></li>
      <li><span class="step-no">2</span><h3>내용 협의</h3><p>대상, 일정, 주제를 함께 맞춰봐요.</p></li>
      <li><span class="step-no">3</span><h3>계획 확정</h3><p>회차별 내용과 준비물을 정리해요.</p></li>
      <li><span class="step-no">4</span><h3>진행</h3><p>현장에서 수업과 활동을 운영해요.</p></li>
    </ol>
  </div>
</section>

<section class="section--dark on-dark" aria-labelledby="h-ask">
  <div class="container split split--center section">
    <div class="stack">
      <h2 id="h-ask" class="title-section">제안할 때<br>알려주시면 좋아요</h2>
      <p class="lead">정해지지 않은 부분은 비워두셔도 괜찮아요. 협의하면서 함께 채워가요.</p>
      <div class="btn-row"><a class="btn btn--yellow" href="../contact/">협업 제안하기 →</a></div>
    </div>
    <div class="note-card">
      <strong>함께 적어주세요</strong>
      <ul class="checklist">
        <li>기관과 담당자</li>
        <li>제안 취지</li>
        <li>참여 대상</li>
        <li>희망 일정과 장소</li>
        <li><span>예산 범위 <small>(미정이어도 괜찮아요)</small></span></li>
      </ul>
    </div>
  </div>
</section>
''')

# ---------------- 교육 프로그램 목록 ----------------
cards = '\n'.join(program_card(p, i, f'{p["slug"]}/', h='h2') for i, p in enumerate(PROGRAMS))
chips = '\n'.join(f'<button class="chip" type="button" data-filter="{f}" aria-pressed="{"true" if f == "전체" else "false"}">{f}</button>' for f in FILTERS)
page('collaboration/programs/index.html', 'COLLABORATION', '교육 프로그램', '문화제작예술소가 제안할 수 있는 교육 프로그램입니다. 모든 프로그램은 협의 후 조정할 수 있어요.', f'''
<nav class="container crumbs" aria-label="현재 위치"><a href="../">협업 안내</a><span aria-hidden="true">/</span><span aria-current="page">교육 프로그램</span></nav>
<div class="container page-head">
  <p class="eyebrow">[ PROGRAMS ]</p>
  <h1 class="title-page">교육 프로그램</h1>
  <p class="lead">지금 제안할 수 있는 수업이에요. 시간·회차·인원은 기준이며, 모두 협의 후 조정할 수 있어요.</p>
</div>
<section class="section section--tight-top" aria-label="프로그램 목록">
  <div class="container">
    <div class="toolbar">
      <div class="toolbar__row">
        <div class="field">
          <label for="program-search">프로그램 이름으로 찾기</label>
          <input id="program-search" type="search" placeholder="예: 무드등, 판화" autocomplete="off">
        </div>
        <p id="program-count" class="result-count" aria-live="polite">{len(PROGRAMS)}개 프로그램</p>
      </div>
      <div class="filters" role="group" aria-label="연계 구분">
{chips}
      </div>
    </div>
    <div id="program-empty" class="empty" hidden>
      <strong>찾는 프로그램이 없어요</strong>
      <p>다른 이름으로 찾아보거나, 원하는 주제로 협업을 제안해 주세요.</p>
      <div class="btn-row"><button id="program-reset" class="btn" type="button">검색 초기화</button><a class="btn btn--primary" href="../../contact/">협업 제안하기</a></div>
    </div>
    <div id="program-list" class="card-grid card-grid--compact">
{cards}
    </div>
  </div>
</section>
''', scripts=('programs.js',))

# ---------------- 프로그램 상세 ----------------
for idx, p in enumerate(PROGRAMS):
    same = [q for q in PROGRAMS if q['group'] == p['group'] and q['slug'] != p['slug']]
    others = [q for q in PROGRAMS if q['slug'] != p['slug'] and q not in same]
    related = (same + others)[:3]
    rel = '\n'.join(program_card(q, PROGRAMS.index(q), f'../{q["slug"]}/') for q in related)
    sub = f'<p class="detail-sub">{escape(p["sub"])}</p>' if p['sub'] else ''
    badge = '<span class="badge">기획 개발 중</span>' if p['dev'] else ''
    link_cls = 'text'
    body = f'''
<nav class="container crumbs" aria-label="현재 위치"><a href="../../">협업 안내</a><span aria-hidden="true">/</span><a href="../">교육 프로그램</a><span aria-hidden="true">/</span><span aria-current="page">{escape(p["title"])}</span></nav>
<section class="container split" style="padding-top:40px;padding-bottom:88px">
  <div class="detail-head">
    <div class="tags"><span class="tag tag--fill">{escape(p["note"])}</span><span class="tag">교육 프로그램</span>{badge}</div>
    <h1 class="title-page">{escape(p["title"])}</h1>
    {sub}
    <p class="lead placeholder-text">[프로그램 한 줄 소개 — 기존 상세 페이지에서 옮겨 올 내용]</p>
    <dl class="facts">
      <div><dt>수업 시간</dt><dd>{p["time"]}</dd></div>
      <div><dt>회차</dt><dd>{p["rounds"]}</dd></div>
      <div><dt>인원</dt><dd>{p["people"]}</dd></div>
      <div><dt>대상</dt><dd class="text">[확인 필요]</dd></div>
      <div class="full"><dt>연계 교과·과정</dt><dd class="{link_cls}">{escape(p["link"])}</dd></div>
    </dl>
    <div style="display:grid;gap:10px;padding-top:8px">
      <a class="btn btn--primary" style="justify-self:start" href="{mailto('[프로그램 문의] ' + p['title'])}">이 프로그램 문의하기 →</a>
      <p class="cta-note">메일 앱이 열리고, 제목에 프로그램 이름이 들어가요.</p>
    </div>
  </div>
  {window(p['slug'] + '.jpg', '<div class="ph ph--portrait">[ 대표 사진 ]</div>')}
</section>

<section class="section section--paper" aria-labelledby="h-about-class">
  <div class="container split">
    <div class="stack"><p class="eyebrow">[ ABOUT CLASS ]</p><h2 id="h-about-class" class="title-section">수업 소개</h2></div>
    <div class="prose">
      <p class="placeholder-text">[수업 소개 본문 1 — 수업의 배경과 목표]</p>
      <p class="placeholder-text">[수업 소개 본문 2 — 참여자가 경험하고 만들게 되는 것]</p>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="h-photos">
  <div class="container">
    <div class="section__head"><div><p class="eyebrow">[ PHOTOS ]</p><h2 id="h-photos" class="title-section">수업 현장</h2></div></div>
    <div class="gallery">
      <figure><div class="ph bg-sky">[ 사진 1 ]</div><figcaption>[사진 설명]</figcaption></figure>
      <figure><div class="ph bg-pollen">[ 사진 2 ]</div><figcaption>[사진 설명]</figcaption></figure>
      <figure><div class="ph bg-blush">[ 사진 3 ]</div><figcaption>[사진 설명]</figcaption></figure>
    </div>
  </div>
</section>

<section class="section section--tight-top">
  <div class="container">
    <div class="band">
      <div><strong>우리 상황에 맞게 바꿀 수 있어요</strong><p>대상, 회차, 인원은 협의 후 조정할 수 있어요. 생태·환경 주제를 엮은 재기획도 가능해요.</p></div>
      <a class="btn btn--yellow" href="../../">협업 방식 보기 →</a>
    </div>
  </div>
</section>

<section class="section section--paper" aria-labelledby="h-related" style="border-bottom:0">
  <div class="container">
    <div class="section__head"><div><h2 id="h-related" class="title-sub">함께 보면 좋은 프로그램</h2></div><a class="text-link" href="../">전체 프로그램 →</a></div>
    <div class="grid-3 card-grid--compact">
{rel}
    </div>
  </div>
</section>
'''
    page(f'collaboration/programs/{p["slug"]}/index.html', 'COLLABORATION', p['title'], f'{p["title"]} — 문화제작예술소 교육 프로그램. 수업 시간 {p["time"]}, 회차 {p["rounds"]}, 인원 {p["people"]}.', body)

# ---------------- CONTACT ----------------
page('contact/index.html', 'CONTACT', '문의', '문화제작예술소에 협업과 일반 문의를 보내는 방법을 안내합니다.', f'''
<div class="container page-head">
  <p class="eyebrow">[ CONTACT ]</p>
  <h1 class="title-page">문의하기</h1>
  <p class="lead">협업 제안과 일반 문의 모두 아래 이메일로 받아요.</p>
</div>
<section class="section section--tight-top">
  <div class="container split">
    <div class="window mail-card">
      <div class="window__bar"><span class="window__name">new_message.txt</span><span class="window__dots" aria-hidden="true"><span></span><span></span><span></span></span></div>
      <div class="mail-card__body">
        <p class="mail-card__address">{EMAIL.replace("@","@<wbr>")}</p>
        <div class="btn-row">
          <a class="btn btn--primary" href="mailto:{EMAIL}">이메일 보내기 →</a>
          <button class="btn" type="button" data-copy="{EMAIL}">주소 복사</button>
        </div>
        <p class="copy-status" role="status"></p>
        <p class="cta-note">이메일 보내기를 누르면 메일 앱이 열려요. 메일을 보낸 뒤에 문의가 전달됩니다.</p>
      </div>
    </div>
    <div class="stack">
      <h2 class="title-sub">제목에 문의 종류를 적어주세요</h2>
      <ul class="subject-list">
        <li><code>[협업 문의]</code><span>새 활동이나 프로그램 운영을 제안할 때</span></li>
        <li><code>[프로그램 문의]</code><span>교육 프로그램 하나를 두고 물어볼 때</span></li>
        <li><code>[일반 문의]</code><span>그 밖의 궁금한 점</span></li>
      </ul>
      <p class="lead">협업 제안에 어떤 내용을 적으면 좋은지는 <a href="../collaboration/">협업 안내</a>에 정리해 두었어요.</p>
    </div>
  </div>
</section>
<!--
  공식 외부 채널(인스타그램 등)과 주소는 현행 정보를 확인한 뒤 이 자리에 추가합니다.
  기존 홈페이지 표기 주소: 경기도 남양주시 다산순환로20, 다산현대프리미엄캠퍼스몰 A-717호
-->
''')

# ---------------- 404 ----------------
page('404.html', None, '페이지를 찾을 수 없어요', '요청한 페이지가 없어요.', f'''
<section class="container not-found">
  <div class="sticker" style="position:static;transform:rotate(-6deg)">{flower('#FFF8EC', '#24331A')}</div>
  <h1 class="title-page">페이지를 찾을 수 없어요</h1>
  <p class="lead">주소가 바뀌었거나 없어진 페이지예요. 홈에서 다시 찾아보세요.</p>
  <a class="btn btn--primary" href="/">홈으로 가기</a>
</section>
''')

# ---------------- 데이터·부가 파일 ----------------
json.dump({'filters': FILTERS, 'featured': FEATURED, 'programs': PROGRAMS}, open(f'{ROOT}/assets/data/programs.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
open(f'{ROOT}/assets/img/favicon.svg', 'w').write(flower().replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" '))
rows = ['old_url,new_path', f'{LEGACY}{quote("홈")},/', f'{LEGACY}{quote("단체-소개")},/about/', f'{LEGACY}{quote("문화예술교육-프로그램")},/collaboration/programs/', f'{LEGACY}{quote("문의")},/contact/']
rows += [f'{p["source_url"]},/collaboration/programs/{p["slug"]}/' for p in PROGRAMS]
os.makedirs(f'{ROOT}/docs', exist_ok=True)
open(f'{ROOT}/docs/url-map.csv', 'w', encoding='utf-8').write('\n'.join(rows) + '\n')
print('built', len(PROGRAMS), 'program pages')
