    // ====== Tiện ích: bỏ dấu tiếng Việt / ký tự tổ hợp ======
    function stripDiacritics(str) {
      return str
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }

    // ====== Bảng thay thế nâng cao (theo độ dài giảm dần) ======
    const SPECIAL_MAP = new Map([
      // 3-ký tự đặc biệt
      ['kyo', 'キョ'], ['kyu', 'キュ'], ['kya', 'キャ'],
      ['gya', 'ギャ'], ['gyu', 'ギュ'], ['gyo', 'ギョ'],
      ['sha', 'シャ'], ['shu', 'シュ'], ['sho', 'ショ'],
      ['sya', 'シャ'], ['syu', 'シュ'], ['syo', 'ショ'],
      ['cha', 'チャ'], ['chu', 'チュ'], ['cho', 'チョ'],
      ['tya', 'チャ'], ['tyu', 'チュ'], ['tyo', 'チョ'],
      ['nya', 'ニャ'], ['nyu', 'ニュ'], ['nyo', 'ニョ'],
      ['hya', 'ヒャ'], ['hyu', 'ヒュ'], ['hyo', 'ヒョ'],
      ['mya', 'ミャ'], ['myu', 'ミュ'], ['myo', 'ミョ'],
      ['rya', 'リャ'], ['ryu', 'リュ'], ['ryo', 'リョ'],
      ['bya', 'ビャ'], ['byu', 'ビュ'], ['byo', 'ビョ'],
      ['pya', 'ピャ'], ['pyu', 'ピュ'], ['pyo', 'ピョ'],
      ['fa', 'ファ'], ['fi', 'フィ'], ['fe', 'フェ'], ['fo', 'フォ'],
      ['va', 'ヴァ'], ['vi', 'ヴィ'], ['ve', 'ヴェ'], ['vo', 'ヴォ'], ['vu', 'ヴ'],
      ['tsa', 'ツァ'], ['tsi', 'ツィ'], ['tse', 'ツェ'], ['tso', 'ツォ'],
      ['tcha', 'ッチャ'], ['tchu', 'ッチュ'], ['tcho', 'ッチョ'],
      ['dya', 'ヂャ'], ['dyu', 'ヂュ'], ['dyo', 'ヂョ'],
      ['je', 'ジェ'], ['che', 'チェ'], ['she', 'シェ'],
      ['ti', 'ティ'], ['di', 'ディ'], ['tu', 'トゥ'], ['du', 'ドゥ'],
      ['wi', 'ウィ'], ['we', 'ウェ'], ['wo', 'ウォ'],
    ]);
	// ====== Bảng tên riêng cố định (ưu tiên cao nhất) ======
	const NAME_MAP = new Map([
		['nguyen', 'グエン'],
		['do', 'ドー'],
		['le',  'レー'],
		['luu',  'リュ'],
		['mac',  'マッカ'],
		['pham',  'ファム'],
		['phan',  'ファン'],
		['ta',  'ター'],
		['thai',  'タイ'],
		['tran',  'チャン'],
		['vo',  'ボー'],
		['vu',  'ブー'],
		['anh',  'アイン'],
		['tuan',  'トゥアン'],
		['anh tuan',  'アイン・トゥアン'],
		['tuan anh',  'トゥアン・アイン'],
		['bac',  'バック'],
		['bach',  'バック'],
		['cuc',  'クック'],
		['dat',  'ダット'],
		['diep',  'ヅイエップ'],
		['dinh',  'ディン'],
		['doanh',  'ズアイン'],
		['duc',  'ドゥック'],
		['dung',  'ズン'],
		['duy',  'ズイ'],
		['gam',  'ガンム'],
		['giang',  'ザン'],
		['ha',  'ハー'],
		['hanh',  'ギー'],
		['hong nhung',  'ホン・ニュン'],
		['huyen',  'フエン'],
		['khoa',  'コア'],
		['lam',  'ラム'],
		['lien',  'レイン'],
		['loc',  'ロック'],
		['luc',  'ルック'],
		['ly',  'リー'],
		['chi',  'チ'],
		['mai chi',  'マイ・チ'],
		['nam',  'ナム'],
		['nghi',  'ギー'],
		['ngo',  'ズイ'],
		['ngoc',  'ゴック'],
		['ngoc tram',  'ゴック・チャム'],
		['tram',  'チャム'],
		['nhat',  'ニャット'],
		['nhi',  'ニー'],
		['nhu',  'ヌー'],
		['phong',  'フォン'],
		['phu',  'フー'],
		['quyen',  'クエン'],
		['tam',  'タム'],
		['tham',  'ターム'],
		['thanh',  'タン'],
		['thu',  'グエン'],
		['thuy',  'トウイ'],
		['trinh',  'チン'],
		['trung',  'チュン'],
		['truong',  'チュオン'],
		['tu',  'トゥー'],
		['tuyen',  'トウェン'],
		['tuyet',  'トウエット'],
		['uyen',  'ウエン'],
		['viet',  'ベト'],
		['vu',  'ヴ'],
		['vy',  'ビー'],
		['xuan',  'スアン'],
		['y',  'イー'],
		['thi',  'ティ'],
		['phat',  'ファット'],
		['khuyen',  'クエン'],
		
	]);

	
	

    // ====== Bảng âm cơ bản (phụ âm + nguyên âm) ======
    const BASE = {
      '': { a:'ア', i:'イ', u:'ウ', e:'エ', o:'オ' },
      k: { a:'カ', i:'キ', u:'ク', e:'ケ', o:'コ' },
      g: { a:'ガ', i:'ギ', u:'グ', e:'ゲ', o:'ゴ' },
      s: { a:'サ', i:'シ', u:'ス', e:'セ', o:'ソ' },
      z: { a:'ザ', i:'ジ', u:'ズ', e:'ゼ', o:'ゾ' },
      j: { a:'ジャ', i:'ジ', u:'ジュ', e:'ジェ', o:'ジョ' },
      t: { a:'タ', i:'チ', u:'ツ', e:'テ', o:'ト' },
      d: { a:'ダ', i:'ヂ', u:'ヅ', e:'デ', o:'ド' },
      n: { a:'ナ', i:'ニ', u:'ヌ', e:'ネ', o:'ノ' },
      h: { a:'ハ', i:'ヒ', u:'フ', e:'ヘ', o:'ホ' },
      f: { a:'ファ', i:'フィ', u:'フ', e:'フェ', o:'フォ' },
      b: { a:'バ', i:'ビ', u:'ブ', e:'ベ', o:'ボ' },
      p: { a:'パ', i:'ピ', u:'プ', e:'ペ', o:'ポ' },
      m: { a:'マ', i:'ミ', u:'ム', e:'メ', o:'モ' },
      y: { a:'ヤ', i:'イ', u:'ユ', e:'イェ', o:'ヨ' },
      r: { a:'ラ', i:'リ', u:'ル', e:'レ', o:'ロ' },
      w: { a:'ワ', i:'ウィ', u:'ウ', e:'ウェ', o:'ヲ' },
      x: { a:'ザ', i:'ズィ', u:'ズ', e:'ゼ', o:'ゾ' }, // x ~ z as approximation
      q: { a:'クァ', i:'クィ', u:'ク', e:'クェ', o:'クォ' },
      v: { a:'ヴァ', i:'ヴィ', u:'ヴ', e:'ヴェ', o:'ヴォ' },
      l: { a:'ラ', i:'リ', u:'ル', e:'レ', o:'ロ' }, // approximate L as R
      c: { a:'カ', i:'シ', u:'ク', e:'セ', o:'コ' }, // ci/ce as shi/se (approx.)
    };
	
	
	
    // ====== Tiền xử lý phụ âm kép & tách từ ======
    function preprocess(raw) {
      let s = stripDiacritics(raw).toLowerCase();
      s = s.replace(/[^a-z\-\s]/g, ''); // chỉ giữ chữ, khoảng trắng, gạch nối
      // phụ âm kép (trừ nn) -> っ + đơn
      s = s.replace(/(bb|cc|dd|ff|gg|hh|jj|kk|ll|mm|pp|qq|rr|ss|tt|vv|ww|xx|zz)/g, (m) => 'っ' + m[0]);
      // chuẩn hóa nhiều khoảng trắng
      s = s.replace(/\s+/g, ' ').trim();
      return s;
    }

    // ====== Chuyển 1 từ latin → katakana ======
    function latinWordToKatakana(word) {
      // nếu từ đã là ký hiệu nhỏ tsu từ preprocess, ta sẽ xử lý trong vòng lặp
      let i = 0;
      let out = '';

      function peek(n=0){ return word[i+n]; }
      function eat(n){ i += n; }

      while (i < word.length) {
        // tách bởi gạch nối thành "・"
        if (peek() === '-') { out += '・'; eat(1); continue; }

        // xử lý っ từ bước preprocess
        if (peek() === 'っ') { out += 'ッ'; eat(1); continue; }

        // dấu cách giữa các từ → trung điểm
        if (peek() === ' ') { out += '・'; eat(1); continue; }

        // đặc biệt: 'ng' ở cuối âm tiết thường ~ ング / ン + g/k…
        // (đã bao phủ bởi bảng cơ bản + n -> ン quy tắc ở dưới)

        // 1) Tra cụm đặc biệt dài nhất (3-4 ký tự)
        let matched = false;
        // thử 3 ký tự
        if (i + 2 < word.length) {
          const tri = word.slice(i, i+3);
          if (SPECIAL_MAP.has(tri)) {
            out += SPECIAL_MAP.get(tri);
            eat(3); matched = true; continue;
          }
        }
        // thử 4 ký tự (tcha, tchu, tcho…)
        if (!matched && i + 3 < word.length) {
          const quad = word.slice(i, i+4);
          if (SPECIAL_MAP.has(quad)) {
            out += SPECIAL_MAP.get(quad);
            eat(4); matched = true; continue;
          }
        }

        // 2) Quy tắc chữ đơn lẻ: 'n' đứng trước phụ âm hoặc cuối từ → ン
        if (peek() === 'n') {
          const nxt = peek(1);
          if (!nxt || !'aeiouy'.includes(nxt)) {
            out += 'ン';
            eat(1);
            continue;
          }
        }

        // 3) Cặp phụ âm + nguyên âm (ví dụ: ka, ri…)
        const c = 'bcdfghjklmnpqrstvwxyz'.includes(peek()) ? peek() : '';
        const v = 'aeiou'.includes(peek(c ? 1 : 0)) ? peek(c ? 1 : 0) : '';
        if (v) {
          const base = BASE[c] || BASE[''];
          out += base[v] || '';
          eat(c ? 2 : 1);
          continue;
        }

        // 4) Trường hợp còn lại: chữ đơn nguyên âm y/… hoặc không khớp → cố gắng map
        const ch = peek();
        if ('aeiou'.includes(ch)) {
          out += BASE[''][ch];
          eat(1);
          continue;
        }
        if (ch === 'y') { out += 'イ'; eat(1); continue; }

        // 5) Không khớp: bỏ qua để tránh kẹt vòng lặp
        eat(1);
      }

      // Kéo dài âm cơ bản: AA→Aー, II→イー, OO/OU→オー, UU→ウー, EE→エー
      out = out
        .replace(/アア/g, 'アー')
        .replace(/イイ/g, 'イー')
        .replace(/ウウ/g, 'ウー')
        .replace(/エエ/g, 'エー')
        .replace(/オオ/g, 'オー')
        .replace(/オウ/g, 'オー');

      return out;
    }
	function latinToKatakana(full) {
	  if (!full.trim()) return '';

	  const key = stripDiacritics(full).toLowerCase().trim();

	  // ✅ Ưu tiên tên mẫu cố định
	  if (NAME_MAP.has(key)) {
		return NAME_MAP.get(key);
	  }

	  const pre = preprocess(full);
	  if (!pre) return '';

	  const parts = pre.split(/\s+/).map(latinWordToKatakana);
	  return parts.filter(Boolean).join('・')
		.replace(/・{2,}/g, '・')
		.trim();
	}




    //function latinToKatakana(full) {
      //if (!full.trim()) return '';
     // const pre = preprocess(full);
     // if (!pre) return '';
      // chia theo khoảng trắng để xử lý từng "từ", nối bằng trung điểm
     // const parts = pre.split(/\s+/).map(latinWordToKatakana);
      // loại bỏ chuỗi rỗng và ghép
    //  return parts.filter(Boolean).join('・')
        // đẹp hơn: gộp nhiều trung điểm liên tiếp
     //   .replace(/・{2,}/g, '・')
        // dọn khoảng trắng (không có, nhưng để chắc chắn)
     //   .trim();
    //}

    // ====== UI ======
    const $name = document.getElementById('name');
    const $out = document.getElementById('out');
    const $btn = document.getElementById('btnTranslate');
    const $btnClear = document.getElementById('btnClear');
    const $btnCopy = document.getElementById('btnCopy');
    const $auto = document.getElementById('auto');
    const $status = document.getElementById('status');

    function translateNow(){
      const text = $name.value;
      const kata = latinToKatakana(text);
      $out.textContent = kata || '—';
    }

    $btn.addEventListener('click', translateNow);
    $btnClear.addEventListener('click', () => { $name.value=''; translateNow(); $name.focus(); });
    $auto.addEventListener('change', () => {
      if ($auto.checked) $name.addEventListener('input', translateNow);
      else $name.removeEventListener('input', translateNow);
    });

    $btnCopy.addEventListener('click', async () => {
      const text = $out.textContent.trim();
      if (!text || text === '—') return;
      try { await navigator.clipboard.writeText(text); $status.textContent = 'Đã sao chép!'; }
      catch { $status.textContent = 'Không thể sao chép.'; }
      setTimeout(()=> $status.textContent = '', 1500);
    });

    // Ví dụ nhanh
    document.querySelectorAll('.ex').forEach(card => {
      card.addEventListener('click', () => {
        $name.value = card.dataset.name || '';
        translateNow();
      });
    });

    // Khởi tạo
    translateNow();
	async function translateWithChatGPT() {
  const apiKey = document.getElementById("apiKey").value.trim();
  const model = document.getElementById("modelSelect").value;
  const text = document.getElementById("name").value.trim();

  if (!apiKey || !text) {
    alert("⚠️ Hãy nhập API Key và tên cần dịch!");
    return;
  }

  document.getElementById("out").textContent = "⏳ Đang gọi ChatGPT...";

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: "Bạn là công cụ dịch và phiên âm tên sang Katakana của tiếng Nhật." },
          { role: "user", content: `Hãy phiên âm tên "${text}" sang Katakana.` }
        ]
      })
    });

    const data = await res.json();
    const result = data.choices?.[0]?.message?.content?.trim();
    document.getElementById("out").textContent = result || "(Không nhận được kết quả)";
  } catch (err) {
    console.error(err);
    document.getElementById("out").textContent = "⚠️ Lỗi khi gọi API.";
  }
}


document.getElementById("btnChatGPT").addEventListener("click", translateWithChatGPT);
