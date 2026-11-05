/* 교육 프로그램 목록: 이름 검색 + 구분 필터
   카드는 HTML에 미리 들어 있고, 여기서는 보이기/숨기기만 합니다. */
(function () {
  var list = document.getElementById('program-list');
  if (!list) return;
  var cards = Array.prototype.slice.call(list.querySelectorAll('[data-group]'));
  var input = document.getElementById('program-search');
  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip[data-filter]'));
  var count = document.getElementById('program-count');
  var empty = document.getElementById('program-empty');
  var current = '전체';

  function normalize(s) { return (s || '').replace(/\s+/g, '').toLowerCase(); }

  function update() {
    var q = normalize(input ? input.value : '');
    var shown = 0;
    cards.forEach(function (card) {
      var okGroup = current === '전체' || card.getAttribute('data-group') === current;
      var okText = !q || normalize(card.getAttribute('data-search')).indexOf(q) !== -1;
      var visible = okGroup && okText;
      card.hidden = !visible;
      if (visible) shown++;
    });
    if (count) count.textContent = shown + '개 프로그램';
    if (empty) empty.hidden = shown !== 0;
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      current = chip.getAttribute('data-filter');
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
      update();
    });
  });
  if (input) input.addEventListener('input', update);
  document.addEventListener('site:content', function () {
    cards = Array.prototype.slice.call(list.querySelectorAll('[data-group]'));
    update();
  });

  var reset = document.getElementById('program-reset');
  if (reset) reset.addEventListener('click', function () {
    if (input) input.value = '';
    current = '전체';
    chips.forEach(function (c) { c.setAttribute('aria-pressed', c.getAttribute('data-filter') === '전체' ? 'true' : 'false'); });
    update();
    if (input) input.focus();
  });
})();
