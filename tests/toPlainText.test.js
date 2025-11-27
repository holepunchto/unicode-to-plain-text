const { toPlainText } = require('../dist')
const test = require('brittle');

test('Username Safety - Unicode Text Conversion', (t) => {
    const ORIGINAL = 'Jazquelyn Viktor Ambrose Feldwinx';
    const ORIGINAL_LOWER = ORIGINAL.toLowerCase();
    const ORIGINAL_UPPER = ORIGINAL.toUpperCase();
    const EMPTY = '';

    // Mathematical styles - work perfectly
    t.is(toPlainText('𝐉𝐚𝐳𝐪𝐮𝐞𝐥𝐲𝐧 𝐕𝐢𝐤𝐭𝐨𝐫 𝐀𝐦𝐛𝐫𝐨𝐬𝐞 𝐅𝐞𝐥𝐝𝐰𝐢𝐧𝐱'), ORIGINAL, 'Mathematical Bold');
    t.is(toPlainText('𝕁𝕒𝕫𝕢𝕦𝕖𝕝𝕪𝕟 𝕍𝕚𝕜𝕥𝕠𝕣 𝔸𝕞𝕓𝕣𝕠𝕤𝕖 𝔽𝕖𝕝𝕕𝕨𝕚𝕟𝕩'), ORIGINAL, 'Double-struck');
    t.is(toPlainText('𝕵𝖆𝖟𝖖𝖚𝖊𝖑𝖞𝖓 𝖁𝖎𝖐𝖙𝖔𝖗 𝕬𝖒𝖇𝖗𝖔𝖘𝖊 𝕱𝖊𝖑𝖉𝖜𝖎𝖓𝖝'), ORIGINAL, 'Bold Fraktur');
    t.is(toPlainText('𝑱𝒂𝒛𝒒𝒖𝒆𝒍𝒚𝒏 𝑽𝒊𝒌𝒕𝒐𝒓 𝑨𝒎𝒃𝒓𝒐𝒔𝒆 𝑭𝒆𝒍𝒅𝒘𝒊𝒏𝒙'), ORIGINAL, 'Bold Italic');
    t.is(toPlainText('𝔍𝔞𝔷𝔮𝔲𝔢𝔩𝔶𝔫 𝔙𝔦𝔨𝔱𝔬𝔯 𝔄𝔪𝔟𝔯𝔬𝔰𝔢 𝔉𝔢𝔩𝔡𝔴𝔦𝔫𝔵'), ORIGINAL, 'Gothic / Fraktur');
    t.is(toPlainText('𝓙𝓪𝔃𝓺𝓾𝓮𝓵𝔂𝓷 𝓥𝓲𝓴𝓽𝓸𝓻 𝓐𝓶𝓑𝓻𝓸𝓼𝓮 𝓕𝓮𝓵𝓭𝔀𝓲𝓷𝔁'), ORIGINAL, 'Math Bold Script');
    t.is(toPlainText('𝗝𝗮𝘇𝗾𝘂𝗲𝗹𝘆𝗻 𝗩𝗶𝗸𝘁𝗼𝗿 𝗔𝗺𝗯𝗿𝗼𝘀𝗲 𝗙𝗲𝗹𝗱𝘄𝗶𝗻𝘅'), ORIGINAL, 'Sans-serif Bold');
    t.is(toPlainText('𝙅𝙖𝙯𝙦𝙪𝙚𝙡𝙮𝙣 𝙑𝙞𝙠𝙩𝙤𝙧 𝘼𝙢𝙗𝙧𝙤𝙨𝙚 𝙁𝙚𝙡𝙙𝙬𝙞𝙣𝙭'), ORIGINAL, 'Bold Italic Sans-serif');
    t.is(toPlainText('𝘑𝘢𝘻𝘲𝘶𝘦𝘭𝘺𝘯 𝘝𝘪𝘬𝘵𝘰𝘳 𝘈𝘮𝘣𝘳𝘰𝘴𝘦 𝘍𝘦𝘭𝘥𝘸𝘪𝘯𝘹'), ORIGINAL, 'Sans Italic');
    t.is(toPlainText('Ｊａｚｑｕｅｌｙｎ Ｖｉｋｔｏｒ Ａｍｂｒｏｓｅ Ｆｅｌｄｗｉｎｘ'), ORIGINAL, 'Wide Fonts');
    t.is(toPlainText('𝙹𝚊𝚣𝚚𝚞𝚎𝚕𝚢𝚗 𝚅𝚒𝚔𝚝𝚘𝚛 𝙰𝚖𝚋𝚛𝚘𝚜𝚎 𝙵𝚎𝚕𝚍𝚠𝚒𝚗𝚡'), ORIGINAL, 'Monospace / Fixed-width');
    t.is(toPlainText('𝖩𝖺𝗓𝗊𝗎𝖾𝗅𝗒𝗇 𝖵𝗂𝗄𝗍𝗈𝗋 𝖠𝗆𝖻𝗋𝗈𝗌𝖾 𝖥𝖾𝗅𝖽𝗐𝗂𝗇𝗑'), ORIGINAL, 'Sans-serif / No Strokes');
    t.is(toPlainText('Jäżqüëḷÿṅ Ṿïḳẗöṙ Äṁḅṙöṡë Ḟëḷḋẅïṅẍ'), ORIGINAL, 'Rock Dots');

    // Enclosed characters - convert to uppercase
    t.is(toPlainText('🄹🄰🅉🅀🅄🄴🄻🅈🄽 🅅🄸🄺🅃🄾🅁 🄰🄼🄱🅁🄾🅂🄴 🄵🄴🄻🄳🅆🄸🄽🅇'), ORIGINAL_UPPER, 'Squared');
    t.is(toPlainText('🅹🅰🆉🆀🆄🅴🅻🆈🅽 🆅🅸🅺🆃🅾🆁 🅰🅼🅱🆁🅾🆂🅴 🅵🅴🅻🅳🆆🅸🅽🆇'), ORIGINAL_UPPER, 'Dark Squares');
    t.is(toPlainText('Ⓙⓐⓩⓠⓤⓔⓛⓨⓝ Ⓥⓘⓚⓣⓞⓡ Ⓐⓜⓑⓡⓞⓢⓔ Ⓕⓔⓛⓓⓦⓘⓝⓧ'), ORIGINAL, 'Circled');
    t.is(toPlainText('🅙🅐🅩🅠🅤🅔🅛🅨🅝 🅥🅘🅚🅣🅞🅡 🅐🅜🅱🅡🅞🅢🅔 🅕🅔🅛🅓🅦🅘🅝🅧'), ORIGINAL_UPPER, 'Black Circles');
    t.is(toPlainText('⒥⒜⒵⒬⒰⒠⒧⒴⒩ ⒱⒤⒦⒯⒪⒭ ⒜⒨⒝⒭⒪⒮⒠ ⒡⒠⒧⒟⒲⒤⒩⒳'), ORIGINAL_UPPER, 'Parenthesized');
    t.is(toPlainText('ᒍᗩᘔᑫᑌEᒪYᑎ ᐯIKTOᖇ ᗩᗰᗷᖇOᔕE ᖴEᒪᗪᗯIᑎ᙭'), ORIGINAL_UPPER, 'Rounded');

    // Small caps - converts to lowercase
    t.is(toPlainText('ᴊᴀᴢqᴜᴇʟyɴ ᴠɪᴋᴛᴏʀ ᴀᴍʙʀᴏꜱᴇ ꜰᴇʟᴅᴡɪɴx'), ORIGINAL_LOWER, 'Small Caps');

    // Subscript/Superscript - partial conversion with case issues
    t.is(toPlainText('ⱼₐzqᵤₑₗyₙ ᵥᵢₖₜₒᵣ ₐₘbᵣₒₛₑ fₑₗdwᵢₙₓ'), ORIGINAL_LOWER, 'Subscript');
    t.is(toPlainText('ᴶᵃᶻqᵘᵉˡʸⁿ ⱽⁱᵏᵗᵒʳ ᴬᵐᵇʳᵒˢᵉ ᶠᵉˡᵈʷⁱⁿˣ'), ORIGINAL_LOWER, 'Superscript');

    // Upside down - auto-detection reverses full string (word order + chars)
    t.is(toPlainText('xuıʍplǝℲ ǝsoɹqɯ∀ ɹoʇʞıΛ uʎlǝnbzɐſ'), ORIGINAL, 'Upside Down');
    t.is(toPlainText('xᴎiwblɘꟻ ɘꙅoᴙdmA ᴙoTkiV ᴎYlɘUpzAJ'), ORIGINAL, 'Mirrored / Flipped');

    // Mostly unrecoverable - converts what's possible, removes decorations
    t.is(toPlainText('▄▌ ▅▀▅ ▀█▄ ⬤▖ ▐▄█ ▐⯊ █▄ ◣▌ █▚▌   ▀▄▀ █ ▐	◀ ▀█▀ ⬤ ◤  ▅▀▅ █▚▞▌ ▐𝟯 ◤ ⬤ ▄█▀ ▐⯊   █▀ ▐⯊ █▄ ◗ ▀▄▀▄▀ █ █▚▌ ⧗'), EMPTY, 'Blocks');
    t.is(toPlainText('█████████ ██████ ███████ ████████'), EMPTY, 'Censored');
    t.is(toPlainText('🇯🇦🇿🇶🇺🇪🇱🇾🇳 🇻🇮🇰🇹🇴🇷 🇦🇲🇧🇷🇴🇸🇪 🇫🇪🇱🇩🇼🇮🇳🇽'), ORIGINAL_UPPER, 'Country Code');
    t.is(toPlainText('🎷🅰💤🍳⛎𝓔👢🏋🥄    ✌🕴🎉🍄😀🌱    🅰Ⓜ🅱🌱😀💲𝓔    🔩𝓔👢🐬🔱🕴🥄❎'), EMPTY, 'Emoji Text');
    t.is(toPlainText('♪ꍏ☡☭☋€↳☿♫ ✓♗ϰ☂⊙☈ ꍏ♔♭☈⊙ⓢ€ Ϝ€↳◗ω♗♫⌘'), EMPTY, 'Umbrella');

    // Unicode ID - converts decimal code points to characters
    t.is(toPlainText('74,97,122,113,117,101,108,121,110,32,86,105,107,116,111,114,32,65,109,98,114,111,115,101,32,70,101,108,100,119,105,110,120'), ORIGINAL, 'Unicode ID');

    // Decorative frames - removes most decorations
    t.is(toPlainText('✴.·`¯`·.·★  🎀𝓙𝓪𝔃𝓺𝓾𝓮𝓵𝔂𝓷 𝓥𝓲𝓴𝓽𝓸𝓻 𝓐𝓶𝓑𝓻𝓸𝓼𝓮 𝓕𝓮𝓵𝓭𝔀𝓲𝓷𝔁🎀  ★·.·`¯´·.✴'), ORIGINAL, 'Princess');
    // Flipping emoticon - same as upside down (input has mixed chars)
    t.is(toPlainText('(ノಠ益ಠ)ノ彡 xuıʍplǝℲ ǝsoɹqɯ∀ ɹoʇʞıΛ uʎlǝnbzɐſ'), ORIGINAL, 'Flipping');
    t.is(toPlainText('»»ᅳJazquelyn Viktor Ambrose Feldwinxᅳ►'), ORIGINAL, 'Shot Through');
    t.is(toPlainText('(‿ꜟ‿) ⒥⒜⒵⒬⒰⒠⒧⒴⒩ ⒱⒤⒦⒯⒪⒭ ⒜⒨⒝⒭⒪⒮⒠ ⒡⒠⒧⒟⒲⒤⒩⒳ (｡)(｡)'), ORIGINAL_UPPER, 'Hooters');
    t.is(toPlainText('█▓▒▒░░░Jazquelyn Viktor Ambrose Feldwinx░░░▒▒▓█'), ORIGINAL, 'Fading');
    t.is(toPlainText('❚█══Jazquelyn Viktor Ambrose Feldwinx══█❚'), ORIGINAL, 'Weights');
    t.is(toPlainText('࿐🌊🐋࿐J࿐a࿐z࿐q࿐u࿐e࿐l࿐y࿐n࿐ ࿐V࿐i࿐k࿐t࿐o࿐r࿐ ࿐A࿐m࿐b࿐r࿐o࿐s࿐e࿐ ࿐F࿐e࿐l࿐d࿐w࿐i࿐n࿐x࿐🐬࿐࿐'), ORIGINAL, 'Ocean');
    t.is(toPlainText('(ﾟ◥益◤ﾟ) J̩̣̤̣͇̓̇̉̒a͒̀ẓ͍͓͈̍ͧͨq̮̺̪̪͌̂͒uͩ̓̀̓ě̅ͬl̙͍͇͔̙̇y͎͈̰̼ͨ͑̃ń̯̗͍̙̠̍̒ ̙̹͎͊Vͣ̏̋i̯͇kͬ͋t̼͕͚͛̑o͔͛ȓ̮͇̥ͮ̑ͫͪ ͙̰̫̣̆̓ͫA̯͖̖ͫ͛ͦͦ̽m̺̱̬͇ͮ̓̀ͭbͣr̂͋̃̄o͍̗s̄̂̆̾eͧ͑ ͇̤̔͌̀F͓̖̬̬̳̍̏͌̒ͮè͈̘̂̒ͤl̦̜͚̣ͨͮͯͧd̞̙̪͈̉̎ͦ̌̔ͅw͔̮͕͙̍́ͅi̟͉̦̳ͅn̗ͦx̞͈̖̹͓̔  (ʘ言ʘ╬)'), EMPTY, 'Devil');
});

// ============================================================================
// NON-ENGLISH ALPHABET PRESERVATION
// ============================================================================

test('Non-English - East Asian Languages', (t) => {
    // Chinese
    t.is(toPlainText('你好世界'), '你好世界', 'Chinese (Simplified)')
    t.is(toPlainText('你好 world'), '你好 world', 'Chinese mixed with English')
    t.is(toPlainText('測試'), '測試', 'Chinese (Traditional)')

    // Japanese
    t.is(toPlainText('こんにちは'), 'こんにちは', 'Japanese Hiragana')
    t.is(toPlainText('カタカナ'), 'カタカナ', 'Japanese Katakana')
    t.is(toPlainText('テスト'), 'テスト', 'Japanese Katakana test')
    t.is(toPlainText('漢字'), '漢字', 'Japanese Kanji')

    // Korean
    t.is(toPlainText('안녕하세요'), '안녕하세요', 'Korean Hangul')
    t.is(toPlainText('테스트'), '테스트', 'Korean test')
})

test('Non-English - East Asian with fancy text', (t) => {
    t.is(toPlainText('𝐭𝐞𝐬𝐭 テスト こんにちは'), 'test テスト こんにちは', 'fancy English with Japanese')
    t.is(toPlainText('🎀你好世界🎀'), '你好世界', 'Chinese with decorative elements')
})

test('Non-English - Cyrillic Scripts', (t) => {
    t.is(toPlainText('Привіт світ'), 'Привіт світ', 'Ukrainian')
    t.is(toPlainText('Привет мир'), 'Привет мир', 'Russian')
    t.is(toPlainText('Здравей свят'), 'Здравей свят', 'Bulgarian')
    t.is(toPlainText('Здраво свете'), 'Здраво свете', 'Serbian Cyrillic')
    t.is(toPlainText('Тест'), 'Тест', 'Cyrillic word test')
})

test('Non-English - Cyrillic with fancy English', (t) => {
    t.is(toPlainText('𝐭𝐞𝐬𝐭 Тест Привіт'), 'test Тест Привіт', 'fancy English with Cyrillic')
    t.is(toPlainText('Hello Привіт World Світ'), 'Hello Привіт World Світ', 'Mixed Cyrillic and Latin')
    t.is(toPlainText('🌟Привіт🌟 ░▒▓Світ▓▒░'), 'Привіт Світ', 'Cyrillic with emojis and decorations')
})

test('Non-English - Middle Eastern Scripts', (t) => {
    // Arabic
    t.is(toPlainText('مرحبا بالعالم'), 'مرحبا بالعالم', 'Arabic')
    t.is(toPlainText('اختبار'), 'اختبار', 'Arabic test')

    // Hebrew
    t.is(toPlainText('שלום עולם'), 'שלום עולם', 'Hebrew')
    t.is(toPlainText('בדיקה'), 'בדיקה', 'Hebrew test')

    // Persian
    t.is(toPlainText('سلام دنیا'), 'سلام دنیا', 'Persian/Farsi')
    t.is(toPlainText('فارسی'), 'فارسی', 'Persian word')
})

test('Non-English - Middle Eastern with fancy English', (t) => {
    t.is(toPlainText('𝐭𝐞𝐬𝐭 اختبار'), 'test اختبار', 'fancy English with Arabic')
    t.is(toPlainText('✨שלום✨ עולם'), 'שלום עולם', 'Hebrew with decorations')
})

test('Non-English - South Asian Scripts', (t) => {
    t.is(toPlainText('नमस्ते दुनिया'), 'नमस्ते दुनिया', 'Hindi (Devanagari)')
    t.is(toPlainText('परीक्षण'), 'परीक्षण', 'Hindi test')
    t.is(toPlainText('হ্যালো বিশ্ব'), 'হ্যালো বিশ্ব', 'Bengali')
    t.is(toPlainText('ஹலோ உலகம்'), 'ஹலோ உலகம்', 'Tamil')
    t.is(toPlainText('สวัสดีชาวโลก'), 'สวัสดีชาวโลก', 'Thai')
    t.is(toPlainText('ทดสอบ'), 'ทดสอบ', 'Thai test')
})

test('Non-English - South Asian with fancy English', (t) => {
    t.is(toPlainText('𝓽𝓮𝓼𝓽 परीक्षण'), 'test परीक्षण', 'fancy English with Hindi')
})

test('Non-English - Other Scripts', (t) => {
    t.is(toPlainText('Γεια σου κόσμε'), 'Γεια σου κόσμε', 'Modern Greek (not lookalikes)')
    t.is(toPlainText('Δοκιμή'), 'Δοκιμή', 'Greek test (real Greek, not fancy)')
    t.is(toPlainText('ሰላም ልዑል'), 'ሰላም ልዑል', 'Amharic (Ethiopian)')
    t.is(toPlainText('Сайн байна уу'), 'Сайн байна уу', 'Mongolian Cyrillic')
    t.is(toPlainText('ဟယ်လို ကမ္ဘာလောက'), 'ဟယ်လို ကမ္ဘာလောက', 'Burmese')
    t.is(toPlainText('សួស្តី​ពិភពលោក'), 'សួស្តី​ពិភពលោក', 'Khmer (Cambodian)')
})

test('Non-English - Mixed Language Content', (t) => {
    t.is(toPlainText('Hello 你好 こんにちは'), 'Hello 你好 こんにちは', 'English + Chinese + Japanese')
    t.is(toPlainText('Hello Привіт مرحبا'), 'Hello Привіт مرحبا', 'English + Russian + Arabic')
})

test('Non-English - Fancy English with multiple languages', (t) => {
    t.is(toPlainText('𝐭𝐞𝐬𝐭 测试 тест テスト'), 'test 测试 тест テスト', 'fancy English with multiple languages')
    t.is(toPlainText('🌟Hello🌟 ★你好★ ✨Привіт✨'), 'Hello 你好 Привіт', 'Multiple languages with decorations')
})

test('Non-English - Real-world multilingual', (t) => {
    t.is(toPlainText('𝓗𝓮𝓵𝓵𝓸! 你好世界 🌍 Привіт світ 🎉 مرحبا'), 'Hello! 你好世界 Привіт світ مرحبا', 'multilingual greeting')
})

test('Non-English - Programming terms', (t) => {
    t.is(toPlainText('𝚌𝚘𝚍𝚎 代码 код कोड'), 'code 代码 код कोड', 'multilingual programming terms')
})

test('Non-English - Converts fancy preserves native', (t) => {
    t.is(toPlainText('𝐇𝐞𝐥𝐥𝐨 你好'), 'Hello 你好', 'Fancy English but preserves Chinese')
    t.is(toPlainText('ⓣⓔⓢⓣ テスト'), 'test テスト', 'Circled English but preserves Japanese')
    t.is(toPlainText('𝐰𝐨𝐫𝐥𝐝 عالم'), 'world عالم', 'Mathematical bold but preserves Arabic')
})

test('Non-English - Upside down with Korean', (t) => {
    const result = toPlainText('ʇsǝʇ 트스테')
    t.is(result, '테스트 test', 'Preserves Korean, normalizes upside-down chars without reversal')
})

test('Non-English - Decorations with Thai', (t) => {
    t.is(toPlainText('🎀𝓽𝓮𝓼𝓽🎀 ทดสอบ'), 'test ทดสอบ')
})

test('Non-English - Complex real-world scenarios', (t) => {
    t.is(toPlainText('🌟𝐏𝐫𝐨𝐝𝐮𝐜𝐭 产品 Продукт🌟'), 'Product 产品 Продукт', 'Multilingual product description')
})

test('Non-English - International greeting', (t) => {
    t.is(toPlainText('𝓗𝓮𝓵𝓵𝓸 | 你好 | Привіт | مرحبا | שלום'), 'Hello | 你好 | Привіт | مرحبا | שלום', 'international greeting')
})

test('Non-English - Code documentation', (t) => {
    t.is(toPlainText('𝚌𝚘𝚗𝚜𝚝 test = "测试"; // Тест'), 'const test = "测试"; // Тест', 'code with multilingual comments')
})

test('Non-English - Social media bio', (t) => {
    t.is(toPlainText('💫𝓓𝓮𝓿𝓮𝓵𝓸𝓹𝓮𝓻 开发者 Розробник💫'), 'Developer 开发者 Розробник')
})

test('Non-English - Restaurant menu', (t) => {
    t.is(toPlainText('🍜 𝐑𝐚𝐦𝐞𝐧 ラーメン 拉面 $12'), 'Ramen ラーメン 拉面 S12', 'restaurant menu item')
})

test('Non-English - Single character preservation', (t) => {
    t.is(toPlainText('你'), '你', 'Chinese')
    t.is(toPlainText('Ω'), 'Ω', 'Greek')
    t.is(toPlainText('ह'), 'ह', 'Hindi')
})

test('Non-English - Numbers in different scripts', (t) => {
    t.is(toPlainText('123 １２３ ١٢٣'), '123 123 ١٢٣', 'regular and fullwidth numbers')
})

test('Non-English - Punctuation in different scripts', (t) => {
    t.is(toPlainText('Hello你好！世界。'), 'Hello你好！世界。', 'CJK punctuation preserved')
})

test('Non-English - Empty strings between languages', (t) => {
    t.is(toPlainText('English     中文     Русский'), 'English 中文 Русский')
})

test('Non-English - RTL text preservation', (t) => {
    t.is(toPlainText('Hello مرحبا שלום World'), 'Hello مرحبا שלום World', 'RTL scripts preserved')
})

test('Options - ASCII-only fast path keeps spaces if disabled', (t) => {
    t.is(toPlainText('Test     Test', { normalizeSpaces: false }), 'Test     Test', 'ASCII fast path preserves spacing when disabled')
})

test('Options - ASCII-only fast path collapses spaces if enabled', (t) => {
    t.is(toPlainText('Test     Test'), 'Test Test', 'ASCII fast path collapses spaces when enabled')
})

test('Options - disable normalizeSpaces with fancy text', (t) => {
    t.is(toPlainText('𝐇𝐞𝐥𝐥𝐨   𝐖𝐨𝐫𝐥𝐝 ', { normalizeSpaces: false }), 'Hello   World ', 'should map fancy chars but preserve extra spaces (squared letters)')
    t.is(toPlainText('  ⓗⓔⓛⓛⓞ  ⓦⓞⓡⓛⓓ', { normalizeSpaces: false }), '  hello  world', 'should map fancy chars but preserve extra spaces (round bubble letters)')
    t.is(toPlainText(' 𝔥𝔢𝔩𝔩𝔬   𝔴𝔬𝔯𝔩𝔡  ', { normalizeSpaces: false }), ' hello   world  ', 'should map fancy chars but preserve extra spaces (gotic letters)')
})

test('Options - enable normalizeSpaces with fancy text', (t) => {
    t.is(toPlainText('𝐇𝐞𝐥𝐥𝐨     𝐖𝐨𝐫𝐥𝐝'), 'Hello World', 'should map fancy chars and normalize spaces (squared letters)')
    t.is(toPlainText('ⓗⓔⓛⓛⓞ  ⓦⓞⓡⓛⓓ'), 'hello world', 'should map fancy chars but preserve extra spaces (round bubble letters)')
    t.is(toPlainText(' 𝔥𝔢𝔩𝔩𝔬   𝔴𝔬𝔯𝔩𝔡 '), 'hello world', 'should map fancy chars but preserve extra spaces (gotic letters)')
})

test('Options - skipEmoji preserves emojis', (t) => {
    t.is(toPlainText('Hello 🎉 World', { skipEmoji: true }), 'Hello 🎉 World', 'preserves celebration emoji')
    t.is(toPlainText('Test ⭐ 💫 🌟', { skipEmoji: true }), 'Test ⭐ 💫 🌟', 'preserves star emojis')
    t.is(toPlainText('🐋🐬 ocean', { skipEmoji: true }), '🐋🐬 ocean', 'preserves animal emojis')
    t.is(toPlainText('Music 🎵🎶🎸', { skipEmoji: true }), 'Music 🎵🎶🎸', 'preserves music emojis')
    t.is(toPlainText('Sparkles ✨ test', { skipEmoji: true }), 'Sparkles ✨ test', 'preserves sparkles emoji')
})

test('Options - skipEmoji still removes other decorations', (t) => {
    t.is(toPlainText('Hello ░▒▓ World', { skipEmoji: true }), 'Hello World', 'removes block chars')
    t.is(toPlainText('Test ═══ done', { skipEmoji: true }), 'Test done', 'removes box drawing')
    t.is(toPlainText('♔♕♖ chess', { skipEmoji: true }), 'chess', 'removes chess pieces')
    t.is(toPlainText('Arrow → test', { skipEmoji: true }), 'Arrow test', 'removes arrows')
})

test('Options - skipEmoji false (default) removes emojis', (t) => {
    t.is(toPlainText('Hello 🎉 World'), 'Hello World', 'removes emojis by default')
    t.is(toPlainText('Hello 🎉 World', { skipEmoji: false }), 'Hello World', 'removes emojis when explicitly false')
})

test('Options - skipEmoji with fancy text', (t) => {
    t.is(toPlainText('𝐇𝐞𝐥𝐥𝐨 🎉 𝐖𝐨𝐫𝐥𝐝', { skipEmoji: true }), 'Hello 🎉 World', 'converts fancy text but preserves emoji')
    t.is(toPlainText('🎀ⓗⓔⓛⓛⓞ🎀', { skipEmoji: true }), '🎀hello🎀', 'preserves emojis with circled letters')
})

test('Options - skipEmoji combined with normalizeSpaces', (t) => {
    t.is(toPlainText('Hello   🎉   World', { skipEmoji: true, normalizeSpaces: true }), 'Hello 🎉 World', 'both options work together')
    t.is(toPlainText('Hello   🎉   World', { skipEmoji: true, normalizeSpaces: false }), 'Hello   🎉   World', 'skipEmoji with spaces preserved')
})
