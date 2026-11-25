/* =========================================================
   수업 진행 애니메이션 (프로그램 상세 페이지)
   - 프로그램 상세 페이지(/collaboration/programs/{slug}/ 또는 detail/?id={slug})에서
     FLOWS에 등록된 slug면, 상단 소개 영역 바로 아래에 "수업은 이렇게 진행돼요" 섹션을 넣습니다.
   - 단계 이름·설명은 FLOWS 안의 steps만 고치면 됩니다.
   - 다른 프로그램을 추가하려면 FLOWS에 같은 모양으로 항목을 하나 더 만들면 됩니다.
   ========================================================= */
(function () {
  var FLOWS = {
    'apple-face-mood-lamp': {
      name: 'mood-lamp.exe',
      steps: [
        ['블라인드 컨투어 드로잉 배우기', '거울로 내 얼굴을 보면서, 종이는 보지 않고 선을 떼지 않은 채 자화상을 그려요. ‘보고 그린다’는 행위를 낯설게 바라보는 시간이에요.'],
        ['철사로 라인을 3D로 표현하기', '드로잉 선을 따라 공예용 철사를 구부려, 2D 자화상을 3D로 표현해요.'],
        ['레이저 컷팅으로 폐목재 따기', '컨투어 드로잉 선을 따라 레이저 커팅기로 폐목재를 따내요. 버려질 나무에 새 쓰임을 더해요.'],
        ['한지로 무드등 조립하기', '나무 얼굴 틀에 한지를 대고 조명과 받침대를 조립하면, 내 얼굴이 은은하게 빛나는 무드등 완성!']
      ],
      stage: `
        <!-- 01 블라인드 컨투어 드로잉 -->
        <svg class="cm-scene" data-scene="0" viewBox="0 0 480 300" preserveAspectRatio="xMidYMid meet">
          <rect class="cm-dots" width="480" height="300"/>
          <rect x="48" y="42" width="220" height="232" fill="var(--blush, #F29BB9)"/>
          <rect x="40" y="34" width="220" height="232" fill="#fff" stroke="var(--ink, #24331A)" stroke-width="2.5"/>
          <g transform="translate(52 52) scale(.9)">
            <path class="cm-face js-draw" fill="none" stroke="var(--ink, #24331A)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <g class="js-pencil">
              <g transform="rotate(-45)">
                <polygon points="0,0 12,-6 12,6" fill="#F3DDB7" stroke="var(--ink, #24331A)" stroke-width="2" stroke-linejoin="round"/>
                <polygon points="0,0 5,-2.5 5,2.5" fill="var(--ink, #24331A)"/>
                <rect x="12" y="-6" width="46" height="12" fill="var(--pollen, #F6C94D)" stroke="var(--ink, #24331A)" stroke-width="2"/>
                <rect x="58" y="-6" width="12" height="12" fill="var(--blush, #F29BB9)" stroke="var(--ink, #24331A)" stroke-width="2"/>
              </g>
            </g>
          </g>
          <!-- 거울 -->
          <rect x="318" y="58" width="124" height="160" fill="var(--sky, #A7C7E4)" stroke="var(--ink, #24331A)" stroke-width="2.5"/>
          <rect x="330" y="70" width="18" height="6" fill="#fff" opacity=".8"/>
          <g transform="translate(331 82) scale(.45)">
            <path class="cm-face" fill="none" stroke="var(--ink, #24331A)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <!-- 눈 → 거울 -->
          <g transform="translate(292 30)">
            <path d="M-18,0 Q0,-14 18,0 Q0,14 -18,0 Z" fill="#fff" stroke="var(--ink, #24331A)" stroke-width="2.5"/>
            <rect class="js-pupil" x="1" y="-4" width="8" height="8" fill="var(--ink, #24331A)"/>
            <rect class="js-lid" x="-19" y="-12" width="38" height="0" fill="var(--cream, #FFF8EC)"/>
          </g>
          <line class="js-sight" x1="312" y1="36" x2="352" y2="66" stroke="var(--petal, #E4568B)" stroke-width="2.5" stroke-dasharray="5 5"/>
          <rect x="318" y="236" width="124" height="28" fill="var(--pollen, #F6C94D)" stroke="var(--ink, #24331A)" stroke-width="2.5"/>
          <text x="380" y="255" text-anchor="middle" class="cm-svgtext">종이는 보지 않기</text>
        </svg>

        <!-- 02 철사로 3D 만들기 -->
        <div class="cm-scene cm-scene--wire" data-scene="1">
          <svg class="cm-scene__bg" viewBox="0 0 480 300" preserveAspectRatio="xMidYMid meet">
            <rect class="cm-dots" width="480" height="300"/>
            <g transform="translate(70 236)">
              <circle r="30" fill="#F3DDB7" stroke="var(--ink, #24331A)" stroke-width="2.5"/>
              <circle r="21" fill="none" stroke="#7D868F" stroke-width="5"/>
              <circle r="13" fill="none" stroke="#7D868F" stroke-width="5"/>
              <circle r="5" fill="var(--ink, #24331A)"/>
            </g>
            <path class="js-tail" d="M96,222 C130,200 150,170 168,150" fill="none" stroke="#7D868F" stroke-width="3.5" stroke-linecap="round"/>
          </svg>
          <div class="cm-wire__shadow js-shadow"></div>
          <div class="cm-wire js-wire">
            <svg viewBox="-10 -10 240 220">
              <path class="cm-face js-draw" fill="none" stroke="#6B747D" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
              <path class="cm-face js-draw" fill="none" stroke="#D3DADF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" transform="translate(-1 -1)"/>
            </svg>
          </div>
        </div>

        <!-- 03 레이저 컷팅 (폐목재) -->
        <svg class="cm-scene" data-scene="2" viewBox="0 0 480 300" preserveAspectRatio="xMidYMid meet">
          <defs>
            <pattern id="cmBed" width="12" height="12" patternUnits="userSpaceOnUse">
              <rect width="12" height="12" fill="#3B4249"/>
              <path d="M0,0 H12 M0,0 V12" stroke="#4F5861" stroke-width="1.5"/>
            </pattern>
          </defs>
          <rect class="cm-dots" width="480" height="300"/>
          <rect x="44" y="20" width="392" height="266" fill="url(#cmBed)" stroke="var(--ink, #24331A)" stroke-width="2.5"/>
          <!-- 폐목재 -->
          <rect x="110" y="44" width="260" height="222" fill="#CDB08A" stroke="var(--ink, #24331A)" stroke-width="2.5"/>
          <path d="M110,44 h70 l-10,30 h-60 Z" fill="#BFA07A"/>
          <path d="M300,266 l20,-40 h50 v40 Z" fill="#B99870"/>
          <g fill="none" stroke="#A88A63" stroke-width="2" stroke-linecap="round">
            <path d="M124,96 C190,88 240,104 356,92"/>
            <path d="M124,150 C200,142 260,158 356,146"/>
            <path d="M124,212 C190,220 280,204 356,216"/>
          </g>
          <rect x="122" y="54" width="5" height="5" fill="var(--ink, #24331A)"/>
          <rect x="354" y="252" width="5" height="5" fill="var(--ink, #24331A)"/>
          <g transform="translate(130 57)">
            <path class="cm-face js-cutshadow" fill="none" stroke="var(--ink, #24331A)" stroke-width="5" opacity="0" stroke-linecap="round" stroke-linejoin="round"/>
            <g class="js-lift">
              <path class="cm-face js-draw" fill="none" stroke="#4A2E18" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <g class="js-smoke" fill="#E9ECEF"></g>
            <g class="js-tool">
              <rect class="js-gantry" x="-90" y="-6" width="400" height="12" fill="#A3ACB4" stroke="var(--ink, #24331A)" stroke-width="2"/>
              <g class="js-head">
                <circle class="js-glowdot" r="13" fill="#FF4D4D" opacity=".35"/>
                <rect x="-11" y="-11" width="22" height="22" fill="var(--petal, #E4568B)" stroke="var(--ink, #24331A)" stroke-width="2.5"/>
                <circle r="3.5" fill="#FF2E2E" stroke="#FFF8EC" stroke-width="1.5"/>
              </g>
            </g>
          </g>
          <rect x="44" y="20" width="98" height="24" fill="var(--pollen, #F6C94D)" stroke="var(--ink, #24331A)" stroke-width="2.5"/>
          <text x="93" y="37" text-anchor="middle" class="cm-svgtext" style="font-size:12px">LASER CUT</text>
        </svg>

        <!-- 04 한지로 무드등 조립 -->
        <svg class="cm-scene" data-scene="3" viewBox="0 0 480 300" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="cmGlow">
              <stop offset="0" stop-color="#F6C94D" stop-opacity=".9"/>
              <stop offset=".45" stop-color="#F6C94D" stop-opacity=".3"/>
              <stop offset="1" stop-color="#F6C94D" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <rect class="js-sky" width="480" height="300" fill="#FFF8EC"/>
          <g class="js-stars" fill="var(--pollen, #F6C94D)" opacity="0">
            <rect x="52" y="44" width="6" height="6"/><rect x="104" y="96" width="4" height="4"/>
            <rect x="412" y="40" width="6" height="6"/><rect x="380" y="118" width="4" height="4"/>
            <rect x="70" y="170" width="4" height="4"/><rect x="430" y="196" width="4" height="4"/>
          </g>
          <circle class="js-glow" cx="240" cy="140" r="150" fill="url(#cmGlow)" opacity="0"/>
          <!-- 한지 -->
          <g class="js-hanji">
            <path class="js-bust js-paper" fill="#F4EEE2" stroke="var(--ink, #24331A)" stroke-width="2"/>
            <g fill="none" stroke="#DCCFB6" stroke-width="1.5" stroke-linecap="round">
              <path d="M200,80 q10,-6 20,2 t22,0"/><path d="M250,130 q10,6 24,-2"/>
              <path d="M196,200 q12,-8 22,0 t20,-2"/><path d="M228,104 q8,6 18,0"/>
            </g>
          </g>
          <!-- 꼬마전구 -->
          <g class="js-lights" fill="#FFE37A">
            <circle cx="196" cy="100" r="4"/><circle cx="284" cy="76" r="4"/><circle cx="292" cy="140" r="4"/>
            <circle cx="196" cy="150" r="4"/><circle cx="290" cy="210" r="4"/><circle cx="190" cy="214" r="4"/><circle cx="240" cy="204" r="4"/>
          </g>
          <!-- 나무 틀 (레이저로 딴 얼굴) -->
          <g class="js-frame">
            <path class="js-bust" fill="none" stroke="var(--ink, #24331A)" stroke-width="9" stroke-linejoin="round"/>
            <path class="js-bust" fill="none" stroke="#A39274" stroke-width="5" stroke-linejoin="round"/>
            <g transform="translate(174 48) scale(.6)">
              <path class="cm-face" fill="none" stroke="var(--ink, #24331A)" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
              <path class="cm-face" fill="none" stroke="#A39274" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
          </g>
          <!-- 받침대 -->
          <rect x="156" y="232" width="168" height="34" fill="#C98E6A" stroke="var(--ink, #24331A)" stroke-width="2.5"/>
          <path d="M166,246 C210,240 270,254 314,246" fill="none" stroke="#A86F4E" stroke-width="2"/>
          <path d="M324,254 C350,254 358,276 392,276" fill="none" stroke="var(--ink, #24331A)" stroke-width="2.5"/>
          <rect x="390" y="268" width="16" height="16" fill="var(--paper, #fff)" stroke="var(--ink, #24331A)" stroke-width="2.5"/>
          <g class="js-sticker" transform="translate(370 70)" opacity="0">
            <g class="js-sticker-in">
              <rect x="-40" y="-17" width="80" height="34" fill="var(--petal, #E4568B)" stroke="var(--ink, #24331A)" stroke-width="2.5"/>
              <text y="6" text-anchor="middle" class="cm-svgtext" fill="#FFF8EC">완성!</text>
            </g>
          </g>
        </svg>`,
      build: function (h) {
        var q = h.q, qa = h.qa, ease = h.ease, clamp = h.clamp, drawPaths = h.drawPaths, lerpColor = h.lerpColor;
        // 한 번에 이어 그린 얼굴 선 (모든 단계가 같은 선을 이어받아요)
        h.root.querySelectorAll('.cm-face').forEach(function (p) { p.setAttribute('d', 'M62,52 C70,18 138,8 160,36 C176,56 174,92 166,114 C158,142 138,166 110,168 C80,170 58,146 55,116 C52,92 52,70 62,52 C76,66 84,74 92,80 C82,70 74,84 86,88 C98,92 102,78 92,78 C100,82 108,86 110,96 C112,106 108,114 102,120 C108,124 116,122 120,118 C116,128 104,134 94,132 C104,144 126,142 136,130 C142,116 150,98 140,82 C130,76 124,88 134,92 C146,96 150,82 140,80'); });
        // 무드등 몸통(머리+어깨) 윤곽
        h.root.querySelectorAll('.js-bust').forEach(function (p) { p.setAttribute('d', 'M164,232 C164,204 184,192 214,186 C190,174 172,148 172,114 C172,72 202,44 240,44 C278,44 308,72 308,114 C308,148 290,174 266,186 C296,192 316,204 316,232 Z'); });
        return [
    { dur: 5200, render: function (t) {
        var path = q(0, '.js-draw');
        var p = ease((t - 300) / 3600);
        drawPaths([path], p);
        var L = path._len, pt = path.getPointAtLength(p * L);
        q(0, '.js-pencil').setAttribute('transform', 'translate(' + pt.x + ' ' + pt.y + ')');
        q(0, '.js-pencil').style.opacity = p >= 1 ? Math.max(0, 1 - (t - 3900) / 400) : 1;
        q(0, '.js-sight').style.strokeDashoffset = -t / 40;
        var blink = (t % 2600) > 2450 ? 12 : 0;
        q(0, '.js-lid').setAttribute('height', blink * 2);
        q(0, '.js-pupil').setAttribute('x', 2 + Math.sin(t / 500) * 1.5);
    } },
    { dur: 5200, render: function (t) {
        var p = ease(t / 1600);
        drawPaths(qa(1, '.js-draw'), p);
        drawPaths([q(1, '.js-tail')], 1 - ease((t - 1400) / 500));
        var a = t < 1700 ? 0 : Math.sin((t - 1700) / 3000 * Math.PI * 2) * 40;
        q(1, '.js-wire').style.transform = 'rotateX(8deg) rotateY(' + a + 'deg)';
        q(1, '.js-shadow').style.transform = 'scaleX(' + (0.55 + 0.45 * Math.abs(Math.cos(a * Math.PI / 180))) + ')';
    } },
    { dur: 5600, render: function (t) {
        var path = q(2, '.js-draw');
        var p = ease((t - 200) / 3700);
        drawPaths([path], p);
        var L = path._len, pt = path.getPointAtLength(p * L);
        var cutting = p > 0 && p < 1;
        q(2, '.js-gantry').setAttribute('y', pt.y - 6);
        q(2, '.js-head').setAttribute('transform', 'translate(' + pt.x + ' ' + pt.y + ')');
        q(2, '.js-glowdot').setAttribute('opacity', cutting ? 0.25 + 0.2 * Math.sin(t / 40) : 0);
        q(2, '.js-tool').style.opacity = p >= 1 ? Math.max(0, 1 - (t - 4000) / 300) : 1;
        // 연기
        var html = '';
        if (cutting) {
          for (var k = 1; k <= 6; k++) {
            var d = path.getPointAtLength(Math.max(0, p * L - k * 9));
            html += '<circle cx="' + (d.x + Math.sin(k + t / 300) * 3) + '" cy="' + (d.y - k * 4) + '" r="' + (2 + k * 0.8) + '" opacity="' + (0.5 - k / 14) + '"/>';
          }
        }
        q(2, '.js-smoke').innerHTML = html;
        var lift = ease((t - 4200) / 600);
        q(2, '.js-lift').setAttribute('transform', 'translate(' + (-5 * lift) + ' ' + (-7 * lift) + ')');
        q(2, '.js-cutshadow').setAttribute('opacity', 0.22 * lift);
    } },
    { dur: 6400, render: function (t) {
        // 1) 한지가 아래에서 올라와 자리 잡기
        var h = ease(t / 1100);
        var hj = q(3, '.js-hanji');
        hj.setAttribute('transform', 'translate(0 ' + (190 * (1 - h)) + ')');
        hj.setAttribute('opacity', h);
        // 2) 나무 얼굴 틀이 위에서 내려와 받침대에 끼워지기
        var f = clamp((t - 1100) / 900), fy;
        if (f < 0.75) fy = -260 * (1 - Math.pow(f / 0.75, 2));
        else fy = -10 * Math.sin((f - 0.75) / 0.25 * Math.PI);
        q(3, '.js-frame').setAttribute('transform', 'translate(0 ' + fy + ')');
        q(3, '.js-frame').setAttribute('opacity', t < 1100 ? 0 : 1);
        // 3) 저녁이 되고 불 켜기
        var dusk = ease((t - 2300) / 800);
        q(3, '.js-sky').setAttribute('fill', lerpColor('#FFF8EC', '#34465E', dusk));
        q(3, '.js-stars').setAttribute('opacity', dusk);
        var on;
        if (t < 3000) on = 0;
        else if (t < 3600) on = [1, 0, 1, 0.3, 1, 1][Math.floor((t - 3000) / 100)];
        else on = 0.92 + 0.08 * Math.sin(t / 380);
        q(3, '.js-glow').setAttribute('opacity', on);
        q(3, '.js-paper').setAttribute('fill', lerpColor('#F4EEE2', '#FFE7A3', on));
        q(3, '.js-lights').querySelectorAll('circle').forEach(function (c, k) {
          c.setAttribute('opacity', on * (0.6 + 0.4 * Math.sin(t / 220 + k * 1.7)));
        });
        var s = ease((t - 3900) / 300);
        q(3, '.js-sticker').setAttribute('opacity', s);
        q(3, '.js-sticker-in').setAttribute('transform', 'rotate(-8) scale(' + (0.6 + 0.4 * s + (s > 0 && s < 1 ? 0.15 * Math.sin(s * Math.PI) : 0)) + ')');
    } }
  ];
      }
    }
  };

  var CSS = `.cm-flow { padding-top: 0; padding-bottom: 88px; }
.cm-flow__head { display: grid; gap: 12px; margin-bottom: 32px; }
.cm-flow__eyebrow { margin: 0; font-family: var(--font-pixel, 'DungGeunMo', monospace); font-size: 15px; color: var(--petal-text, #B23A6B); }
.cm-flow__title { margin: 0; font-family: var(--font-pixel, 'DungGeunMo', monospace); font-weight: 400; font-size: clamp(24px, 3.2vw, 32px); line-height: 1.3; color: var(--ink, #24331A); }

.cm-flow__body { display: grid; grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr); gap: 40px; align-items: start; }

.cm-flow__window { border: 2px solid var(--ink, #24331A); background: var(--paper, #fff); box-shadow: 10px 10px 0 var(--blush, #F29BB9); }
.cm-flow__bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 8px 10px 8px 14px; background: var(--sky, #A7C7E4); border-bottom: 2px solid var(--ink, #24331A); }
.cm-flow__name { font-family: var(--font-pixel, 'DungGeunMo', monospace); font-size: 14px; color: var(--ink, #24331A); }
.cm-flow__toggle { font-family: var(--font-pixel, 'DungGeunMo', monospace); font-size: 13px; line-height: 1; padding: 6px 10px; color: var(--ink, #24331A); background: var(--cream, #FFF8EC); border: 2px solid var(--ink, #24331A); box-shadow: 2px 2px 0 var(--ink, #24331A); cursor: pointer; }
.cm-flow__toggle:hover { background: var(--pollen, #F6C94D); }
.cm-flow__toggle:active { transform: translate(2px, 2px); box-shadow: none; }
.cm-flow__toggle-play { display: none; }
.cm-flow__toggle[aria-pressed="true"] .cm-flow__toggle-play { display: inline; }
.cm-flow__toggle[aria-pressed="true"] .cm-flow__toggle-pause { display: none; }

.cm-flow__stage { position: relative; aspect-ratio: 16 / 10; background: var(--cream, #FFF8EC); overflow: hidden; }
.cm-scene { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; transition: opacity .35s ease; }
.cm-scene.is-on { opacity: 1; }
.cm-dots { fill: var(--cream, #FFF8EC); }
.cm-svgtext { font-family: var(--font-pixel, 'DungGeunMo', monospace); font-size: 14px; fill: var(--ink, #24331A); }

.cm-scene--wire { perspective: 700px; }
.cm-scene__bg { position: absolute; inset: 0; width: 100%; height: 100%; }
.cm-wire { position: absolute; left: 50%; top: 8%; width: 44%; aspect-ratio: 240 / 220; margin-left: -18%; transform-style: preserve-3d; }
.cm-wire svg { width: 100%; height: 100%; overflow: visible; filter: drop-shadow(3px 3px 0 rgba(36, 51, 26, .18)); }
.cm-wire__shadow { position: absolute; left: 54%; bottom: 7%; width: 30%; height: 6%; margin-left: -15%; background: rgba(36, 51, 26, .14); border-radius: 50%; }

.cm-flow__steps { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
.cm-step { position: relative; width: 100%; display: grid; grid-template-columns: auto 1fr; gap: 14px; align-items: start; text-align: left; padding: 16px 16px 20px; font: inherit; color: var(--ink, #24331A); background: var(--paper, #fff); border: 2px solid var(--ink, #24331A); cursor: pointer; overflow: hidden; transition: background .2s ease, transform .08s ease, box-shadow .08s ease; }
.cm-step:hover { background: var(--leaf-tint, #D6E4C3); }
.cm-step:focus-visible { outline: 3px solid var(--petal, #E4568B); outline-offset: 3px; }
.cm-step__num { font-family: var(--font-pixel, 'DungGeunMo', monospace); font-size: 15px; line-height: 1; padding: 6px 7px; background: var(--cream, #FFF8EC); border: 2px solid var(--ink, #24331A); }
.cm-step__text { display: grid; gap: 6px; }
.cm-step__title { font-family: var(--font-pixel, 'DungGeunMo', monospace); font-size: 16px; line-height: 1.45; }
.cm-step__desc { display: none; font-family: var(--font-body, sans-serif); font-size: 15px; line-height: 1.7; color: var(--ink-soft, #3D4C30); }
.cm-step__bar { position: absolute; left: 0; right: 0; bottom: 0; height: 5px; background: transparent; }
.cm-step__bar span { display: block; height: 100%; width: 0; background: var(--petal, #E4568B); }
.cm-step.is-on { background: var(--pollen, #F6C94D); box-shadow: 5px 5px 0 var(--ink, #24331A); transform: translate(-2px, -2px); }
.cm-step.is-on .cm-step__num { background: var(--ink, #24331A); color: var(--cream, #FFF8EC); }
.cm-step.is-on .cm-step__desc { display: block; color: var(--ink, #24331A); }
.cm-step.is-on .cm-step__bar { background: rgba(36, 51, 26, .15); }

@media (max-width: 900px) {
  .cm-flow__body { grid-template-columns: 1fr; gap: 28px; }
  .cm-flow__window { box-shadow: 7px 7px 0 var(--blush, #F29BB9); }
}
@media (max-width: 600px) {
  .cm-flow { padding-top: 0; padding-bottom: 64px; }
  .cm-step { padding: 14px 14px 18px; gap: 12px; }
  .cm-step__title { font-size: 15px; }
}`;

  function currentSlug() {
    var parts = location.pathname.split('/').filter(Boolean);
    var i = parts.indexOf('programs');
    if (i < 0 || !parts[i + 1]) return null;
    if (parts[i + 1] === 'detail') return new URLSearchParams(location.search).get('id');
    return decodeURIComponent(parts[i + 1]);
  }

  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function mount() {
    var flow = FLOWS[currentSlug()];
    if (!flow || document.querySelector('.cm-flow')) return;
    var head = document.querySelector('main .detail-head');
    var anchor = head && head.closest('section');
    if (!anchor) return;

    if (!document.getElementById('cm-flow-style')) {
      var st = document.createElement('style'); st.id = 'cm-flow-style'; st.textContent = CSS;
      document.head.appendChild(st);
    }
    var steps = flow.steps.map(function (s, i) {
      return '<li><button type="button" class="cm-step" data-step="' + i + '">' +
        '<span class="cm-step__num">' + String(i + 1).padStart(2, '0') + '</span>' +
        '<span class="cm-step__text"><span class="cm-step__title">' + esc(s[0]) + '</span>' +
        '<span class="cm-step__desc">' + esc(s[1]) + '</span></span>' +
        '<span class="cm-step__bar"><span></span></span></button></li>';
    }).join('');
    var root = document.createElement('section');
    root.className = 'cm-flow container';
    root.setAttribute('aria-labelledby', 'cm-flow-title');
    root.innerHTML =
      '<div class="cm-flow__head"><p class="cm-flow__eyebrow">HOW IT GOES</p>' +
      '<h2 class="cm-flow__title" id="cm-flow-title">수업은 이렇게 진행돼요</h2></div>' +
      '<div class="cm-flow__body"><div class="cm-flow__window">' +
      '<div class="cm-flow__bar"><span class="cm-flow__name">' + esc(flow.name) + '</span>' +
      '<button class="cm-flow__toggle" type="button" aria-pressed="false"><span class="cm-flow__toggle-pause">❚❚ 멈춤</span><span class="cm-flow__toggle-play">▶ 재생</span></button></div>' +
      '<div class="cm-flow__stage" aria-hidden="true">' + flow.stage + '</div></div>' +
      '<ol class="cm-flow__steps">' + steps + '</ol></div>';
    anchor.after(root);
    run(root, flow);
  }

  function run(root, flow) {
    var scenes = root.querySelectorAll('.cm-scene');
    var buttons = root.querySelectorAll('.cm-step');
    var bars = root.querySelectorAll('.cm-step__bar span');
    var toggle = root.querySelector('.cm-flow__toggle');
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
    function ease(x) { x = clamp(x); return (1 - Math.cos(Math.PI * x)) / 2; }
    function q(i, sel) { return scenes[i].querySelector(sel); }
    function qa(i, sel) { return scenes[i].querySelectorAll(sel); }
    function drawPaths(list, p) {
      list.forEach(function (el) {
        var L = el._len || (el._len = el.getTotalLength());
        el.style.strokeDasharray = L;
        el.style.strokeDashoffset = L * (1 - p);
      });
    }
    function lerpColor(a, b, t) {
      var pa = [1, 3, 5].map(function (k) { return parseInt(a.substr(k, 2), 16); });
      var pb = [1, 3, 5].map(function (k) { return parseInt(b.substr(k, 2), 16); });
      return 'rgb(' + pa.map(function (v, k) { return Math.round(v + (pb[k] - v) * t); }).join(',') + ')';
    }

    var steps = flow.build({ root: root, q: q, qa: qa, ease: ease, clamp: clamp, drawPaths: drawPaths, lerpColor: lerpColor });
    var cur = 0, t = 0, playing = !reduce, visible = true, last = null;

    function show(i) {
      cur = i; t = reduce || !playing ? steps[i].dur : 0;
      scenes.forEach(function (s, k) { s.classList.toggle('is-on', k === i); });
      buttons.forEach(function (b, k) {
        b.classList.toggle('is-on', k === i);
        if (k === i) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
      });
      bars.forEach(function (b) { b.style.width = '0'; });
      steps[i].render(t);
      bars[i].style.width = (t / steps[i].dur) * 100 + '%';
    }
    function frame(now) {
      if (!root.isConnected) return;
      if (last === null) last = now;
      var dt = Math.min(now - last, 60); last = now;
      if (playing && visible) {
        t += dt;
        if (t >= steps[cur].dur) show((cur + 1) % steps.length);
        else { steps[cur].render(t); bars[cur].style.width = (t / steps[cur].dur) * 100 + '%'; }
      }
      requestAnimationFrame(frame);
    }
    buttons.forEach(function (b, k) { b.addEventListener('click', function () { show(k); }); });
    toggle.addEventListener('click', function () {
      playing = !playing;
      toggle.setAttribute('aria-pressed', playing ? 'false' : 'true');
      if (playing && t >= steps[cur].dur) t = 0;
    });
    if (reduce) toggle.setAttribute('aria-pressed', 'true');
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }, { threshold: 0.2 }).observe(root);
    }
    show(0);
    requestAnimationFrame(frame);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
