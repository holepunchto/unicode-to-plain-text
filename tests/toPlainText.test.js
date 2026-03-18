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
    // Cyrillic diacritics are stripped by default (й → и)
    t.is(toPlainText('Привіт світ'), 'Привіт світ', 'Ukrainian')
    t.is(toPlainText('Привет мир'), 'Привет мир', 'Russian')
    t.is(toPlainText('Здравей свят'), 'Здравеи свят', 'Bulgarian (й → и)')
    t.is(toPlainText('Здраво свете'), 'Здраво свете', 'Serbian Cyrillic')
    t.is(toPlainText('Тест'), 'Тест', 'Cyrillic word test')
    // Use preserve to keep diacritics
    t.is(toPlainText('Здравей свят', { preserve: ['cyrillic'] }), 'Здравей свят', 'Bulgarian preserved')
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
    // Greek and Cyrillic diacritics are stripped by default
    t.is(toPlainText('Γεια σου κόσμε'), 'Γεια σου κοσμε', 'Modern Greek (tonos stripped)')
    t.is(toPlainText('Δοκιμή'), 'Δοκιμη', 'Greek test (tonos stripped)')
    t.is(toPlainText('ሰላም ልዑል'), 'ሰላም ልዑል', 'Amharic (Ethiopian)')
    t.is(toPlainText('Сайн байна уу'), 'Саин баина уу', 'Mongolian Cyrillic (й → и)')
    t.is(toPlainText('ဟယ်လို ကမ္ဘာလောက'), 'ဟယ်လို ကမ္ဘာလောက', 'Burmese')
    t.is(toPlainText('សួស្តី​ពិភពលោក'), 'សួស្តីពិភពលោក', 'Khmer (Cambodian) - zero-width space stripped')
    // Use preserve to keep diacritics
    t.is(toPlainText('Γεια σου κόσμε', { preserve: ['greek'] }), 'Γεια σου κόσμε', 'Greek preserved')
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
    // Cyrillic й → и by default
    t.is(toPlainText('English     中文     Русский'), 'English 中文 Русскии')
})

test('Non-English - RTL text preservation', (t) => {
    t.is(toPlainText('Hello مرحبا שלום World'), 'Hello مرحبا שלום World', 'RTL scripts preserved')
})

test('Keep case', (t) => {
    t.is(toPlainText("texT", { skipEmoji: true }), "texT", 'upper case letter at the end of word')
    t.is(toPlainText("texT ⚡️", { skipEmoji: true }), "texT ⚡️", 'upper case letter at the end of word with emoji')
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

test('Options - skipEmoji preserves all common emojis', (t) => {
    t.is(toPlainText('Done ✅ test', { skipEmoji: true }), 'Done ✅ test', 'preserves green checkmark')
    t.is(toPlainText('Error ❌ test', { skipEmoji: true }), 'Error ❌ test', 'preserves red cross')
    t.is(toPlainText('Weather ☀️ test', { skipEmoji: true }), 'Weather ☀️ test', 'preserves sun emoji')
    t.is(toPlainText('Love ❤️ test', { skipEmoji: true }), 'Love ❤️ test', 'preserves heart emoji')
    t.is(toPlainText('Hands ✌️ test', { skipEmoji: true }), 'Hands ✌️ test', 'preserves victory hand')
    t.is(toPlainText('Warning ⚠️ test', { skipEmoji: true }), 'Warning ⚠️ test', 'preserves warning emoji')
    t.is(toPlainText('Stop ⛔ test', { skipEmoji: true }), 'Stop ⛔ test', 'preserves stop sign')
    t.is(toPlainText('Info ℹ️ test', { skipEmoji: true }), 'Info ℹ️ test', 'preserves info emoji')
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

test('Options - skipEmoji preserves all emoji categories', (t) => {
    // Smileys & Emotion (U+1F600 range)
    t.is(toPlainText('😀😂🥰😎🤔', { skipEmoji: true }), '😀😂🥰😎🤔', 'preserves smileys')

    // People & Body (U+1F400+ range)
    t.is(toPlainText('👍👎👋🤝✋', { skipEmoji: true }), '👍👎👋🤝✋', 'preserves hand gestures')

    // Animals & Nature (U+1F400 range)
    t.is(toPlainText('🐶🐱🐼🦁🌸', { skipEmoji: true }), '🐶🐱🐼🦁🌸', 'preserves animals and nature')

    // Food & Drink (U+1F300 range)
    t.is(toPlainText('🍎🍕🍔🍺🍷', { skipEmoji: true }), '🍎🍕🍔🍺🍷', 'preserves food and drink')

    // Travel & Places (U+1F680 range)
    t.is(toPlainText('🚗🚀✈️🏠🌍', { skipEmoji: true }), '🚗🚀✈️🏠🌍', 'preserves travel and places')

    // Activities (U+1F3A0 range)
    t.is(toPlainText('⚽🏀🎮🎬🎤', { skipEmoji: true }), '⚽🏀🎮🎬🎤', 'preserves activities')

    // Objects (U+1F4A0 range)
    t.is(toPlainText('💡📱💻⌚📷', { skipEmoji: true }), '💡📱💻⌚📷', 'preserves objects')

    // Symbols - Misc Symbols U+2600 range
    t.is(toPlainText('☀️☁️⚡☔⭐', { skipEmoji: true }), '☀️☁️⚡☔⭐', 'preserves weather symbols')

    // Symbols - Hearts & Shapes U+2700 range
    t.is(toPlainText('❤️💛💚💙💜', { skipEmoji: true }), '❤️💛💚💙💜', 'preserves hearts')

    // Symbols - Status indicators
    t.is(toPlainText('✅❌⚠️🔴🟢', { skipEmoji: true }), '✅❌⚠️🔴🟢', 'preserves status indicators')

    // Symbols - Arrows and misc from Dingbats U+2700 range
    t.is(toPlainText('✨✔️✖️❗❓', { skipEmoji: true }), '✨✔️✖️❗❓', 'preserves dingbat emojis')

    // Flags (U+1F1E0 range)
    t.is(toPlainText('🏳️🏴🚩', { skipEmoji: true }), '🏳️🏴🚩', 'preserves flags')
})

// ============================================================================
// ASCII-ONLY MODE
// ============================================================================

test('Options - asciiOnly strips non-ASCII after normalization', (t) => {
    t.is(toPlainText('Café', { asciiOnly: true }), 'Cafe', 'strips diacritics via normalization then keeps ASCII')
    t.is(toPlainText('naïve', { asciiOnly: true }), 'naive', 'handles combining diacritics')
    t.is(toPlainText('résumé', { asciiOnly: true }), 'resume', 'handles accented vowels')
})

test('Options - asciiOnly removes non-ASCII scripts', (t) => {
    // Non-ASCII at edges - spaces trimmed
    t.is(toPlainText('Hello 你好', { asciiOnly: true }), 'Hello', 'removes Chinese and trims')
    t.is(toPlainText('World Привет', { asciiOnly: true }), 'World', 'removes Cyrillic and trims')
    t.is(toPlainText('你好 World', { asciiOnly: true }), 'World', 'removes Chinese from start and trims')
    t.is(toPlainText('Привет World', { asciiOnly: true }), 'World', 'removes Cyrillic from start and trims')

    // Non-ASCII surrounded by spaces - spaces collapsed
    t.is(toPlainText(' 你好  Hello  世界 ', { asciiOnly: true }), 'Hello', 'surrounded by non-ASCII, collapses and trims')
    t.is(toPlainText('Hello  你好  World', { asciiOnly: true }), 'Hello World', 'non-ASCII in middle, spaces collapsed')
    t.is(toPlainText('A 你 B 好 C', { asciiOnly: true }), 'A B C', 'multiple non-ASCII between ASCII')

    // Multiple spaces around non-ASCII
    t.is(toPlainText('Test   你好   End', { asciiOnly: true }), 'Test End', 'multiple spaces around non-ASCII collapsed')
})

test('Options - asciiOnly respects trim option', (t) => {
    // Basic edge cases
    t.is(toPlainText('Hello 你好', { asciiOnly: true, trim: 'none' }), 'Hello ', 'preserves trailing space')
    t.is(toPlainText('你好 World', { asciiOnly: true, trim: 'none' }), ' World', 'preserves leading space')
    t.is(toPlainText('你好 World', { asciiOnly: true, trim: 'start' }), 'World', 'trims start only')
    t.is(toPlainText('Hello 你好', { asciiOnly: true, trim: 'end' }), 'Hello', 'trims end only')

    // trim:start - trims leading, keeps trailing
    t.is(toPlainText(' 你好  Hello  世界 ', { asciiOnly: true, trim: 'start' }), 'Hello ', 'trim:start removes leading, keeps trailing')
    t.is(toPlainText('你好 A 世界 B 你好', { asciiOnly: true, trim: 'start' }), 'A B ', 'trim:start with multiple non-ASCII')

    // trim:end - keeps leading, trims trailing
    t.is(toPlainText(' 你好  Hello  世界 ', { asciiOnly: true, trim: 'end' }), ' Hello', 'trim:end keeps leading, removes trailing')
    t.is(toPlainText('你好 A 世界 B 你好', { asciiOnly: true, trim: 'end' }), ' A B', 'trim:end with multiple non-ASCII')

    // trim:none - keeps both
    t.is(toPlainText(' 你好  Hello  世界 ', { asciiOnly: true, trim: 'none' }), ' Hello ', 'trim:none keeps edges, still collapses')
    t.is(toPlainText('A  你好  B', { asciiOnly: true, trim: 'none' }), 'A B', 'trim:none, collapsed')

    // To preserve all spaces: need normalizeSpaces:false AND trim:none
    t.is(toPlainText(' 你好  Hello  世界 ', { asciiOnly: true, normalizeSpaces: false, trim: 'none' }), '   Hello   ', 'no collapse, no trim')
    t.is(toPlainText('A  你好  B', { asciiOnly: true, normalizeSpaces: false, trim: 'none' }), 'A    B', 'no collapse preserves gaps')
})

test('Options - asciiOnly trim:start/end without normalizeSpaces', (t) => {
    // Input: ' 你好  Hello  世界 ' → after strip: '    Hello   '
    // trim:start without collapse
    t.is(toPlainText(' 你好  Hello  世界 ', { asciiOnly: true, normalizeSpaces: false, trim: 'start' }), 'Hello   ', 'trim:start no collapse')

    // Input: '你好  A  世界' → after strip: '  A  '
    t.is(toPlainText('你好  A  世界', { asciiOnly: true, normalizeSpaces: false, trim: 'start' }), 'A  ', 'trim:start keeps trailing')

    // trim:end without collapse
    t.is(toPlainText(' 你好  Hello  世界 ', { asciiOnly: true, normalizeSpaces: false, trim: 'end' }), '   Hello', 'trim:end no collapse')
    t.is(toPlainText('你好  A  世界', { asciiOnly: true, normalizeSpaces: false, trim: 'end' }), '  A', 'trim:end keeps leading')
})

test('Options - asciiOnly without normalizeSpaces', (t) => {
    // Without normalizeSpaces, spaces are not collapsed but still trimmed
    t.is(toPlainText('Hello  你好  World', { asciiOnly: true, normalizeSpaces: false }), 'Hello    World', 'no collapse, gaps remain')
    t.is(toPlainText(' 你好  Hello  世界 ', { asciiOnly: true, normalizeSpaces: false }), 'Hello', 'no collapse, but trims')
    t.is(toPlainText(' 你好  Hello  世界 ', { asciiOnly: true, normalizeSpaces: false, trim: 'none' }), '   Hello   ', 'no collapse, no trim')
})

test('Options - asciiOnly with fancy text', (t) => {
    t.is(toPlainText('𝐇𝐞𝐥𝐥𝐨', { asciiOnly: true }), 'Hello', 'converts math bold')
    t.is(toPlainText('𝕳𝖊𝖑𝖑𝖔', { asciiOnly: true }), 'Hello', 'converts fraktur')
    t.is(toPlainText('Ｈｅｌｌｏ', { asciiOnly: true }), 'Hello', 'converts fullwidth')
})

test('Options - asciiOnly with emojis', (t) => {
    t.is(toPlainText('Hello 🎉 World', { asciiOnly: true }), 'Hello World', 'removes emojis')
    t.is(toPlainText('Test ✨', { asciiOnly: true }), 'Test', 'removes sparkles')
})

test('Options - asciiOnly combined with other options', (t) => {
    t.is(toPlainText('  Hello  World  ', { asciiOnly: true, normalizeSpaces: true }), 'Hello World', 'collapses and trims')
    t.is(toPlainText('  Hello  World  ', { asciiOnly: true, normalizeSpaces: false }), 'Hello  World', 'no collapse but still trims')
    t.is(toPlainText('  Hello  World  ', { asciiOnly: true, normalizeSpaces: false, trim: 'none' }), '  Hello  World  ', 'no collapse, no trim')
})

test('Options - asciiOnly default is false', (t) => {
    t.is(toPlainText('Café'), 'Cafe', 'diacritics normalized by default')
    t.is(toPlainText('Hello 你好'), 'Hello 你好', 'non-Latin preserved by default')
})

// ============================================================================
// FLAG EMOJI BUG - skipEmoji should preserve country flags
// ============================================================================

test('Options - skipEmoji preserves country flag emojis (regional indicators)', (t) => {
    t.is(toPlainText('USA 🇺🇸', { skipEmoji: true }), 'USA 🇺🇸', 'preserves US flag')
    t.is(toPlainText('🇬🇧 Britain', { skipEmoji: true }), '🇬🇧 Britain', 'preserves UK flag')
    t.is(toPlainText('🇯🇵 Japan 🇰🇷 Korea', { skipEmoji: true }), '🇯🇵 Japan 🇰🇷 Korea', 'preserves multiple flags')
    t.is(toPlainText('🇫🇷🇩🇪🇮🇹', { skipEmoji: true }), '🇫🇷🇩🇪🇮🇹', 'preserves adjacent flags')
    t.is(toPlainText('Travel: 🇪🇸 → 🇵🇹', { skipEmoji: true }), 'Travel: 🇪🇸 🇵🇹', 'preserves flags with arrow (arrow removed)')
})

test('Options - skipEmoji preserves flags mixed with other emojis', (t) => {
    t.is(toPlainText('Hello 👋 from 🇺🇸', { skipEmoji: true }), 'Hello 👋 from 🇺🇸', 'wave + flag')
    t.is(toPlainText('🎉 Party in 🇧🇷! 🎊', { skipEmoji: true }), '🎉 Party in 🇧🇷! 🎊', 'celebration + flag')
    t.is(toPlainText('🇨🇦 ❤️ maple', { skipEmoji: true }), '🇨🇦 ❤️ maple', 'flag + heart')
})

test('Options - skipEmoji false still converts flags to letters', (t) => {
    t.is(toPlainText('🇺🇸'), 'US', 'US flag becomes US')
    t.is(toPlainText('🇬🇧'), 'GB', 'GB flag becomes GB')
    t.is(toPlainText('🇯🇵'), 'JP', 'JP flag becomes JP')
})

test('Options - skipEmoji with flags and fancy text', (t) => {
    t.is(toPlainText('𝐇𝐞𝐥𝐥𝐨 🇺🇸', { skipEmoji: true }), 'Hello 🇺🇸', 'converts fancy text, preserves flag')
    t.is(toPlainText('🇫🇷 ⓟⓐⓡⓘⓢ', { skipEmoji: true }), '🇫🇷 paris', 'preserves flag, converts circled')
})

test('Options - skipEmoji with flags and preserve option', (t) => {
    t.is(toPlainText('🇺🇦 Київ', { skipEmoji: true, preserve: 'all' }), '🇺🇦 Київ', 'flag + Cyrillic preserved')
    t.is(toPlainText('🇨🇳 北京', { skipEmoji: true, preserve: 'all' }), '🇨🇳 北京', 'flag + Chinese preserved')
    t.is(toPlainText('🇯🇵 東京 Tokyo', { skipEmoji: true, preserve: 'all' }), '🇯🇵 東京 Tokyo', 'flag + Japanese + Latin')
})

// ============================================================================
// SKIP CURRENCY MAP
// ============================================================================

test('Options - skipCurrencyMap false (default) converts currency symbols', (t) => {
    t.is(toPlainText('€100'), 'E100', 'euro sign converted')
    t.is(toPlainText('£50'), 'L50', 'pound sign converted')
    t.is(toPlainText('¥200'), 'Y200', 'yen sign converted')
    t.is(toPlainText('$10'), 'S10', 'dollar sign converted')
    t.is(toPlainText('฿price'), 'Bprice', 'baht sign converted')
    t.is(toPlainText('price ₹500', { skipCurrencyMap: false }), 'price R500', 'rupee sign converted when explicitly false')
})

test('Options - skipCurrencyMap true preserves currency symbols', (t) => {
    t.is(toPlainText('€100', { skipCurrencyMap: true }), '€100', 'euro sign preserved')
    t.is(toPlainText('£50', { skipCurrencyMap: true }), '£50', 'pound sign preserved')
    t.is(toPlainText('¥200', { skipCurrencyMap: true }), '¥200', 'yen sign preserved')
    t.is(toPlainText('$10', { skipCurrencyMap: true }), '$10', 'dollar sign preserved')
    t.is(toPlainText('price ₹500', { skipCurrencyMap: true }), 'price ₹500', 'rupee sign preserved')
})

test('Options - skipCurrencyMap with fancy text', (t) => {
    t.is(toPlainText('𝐩𝐫𝐢𝐜𝐞 €100', { skipCurrencyMap: true }), 'price €100', 'converts fancy text but preserves currency')
    t.is(toPlainText('𝐩𝐫𝐢𝐜𝐞 €100'), 'price E100', 'converts both fancy text and currency by default')
})

test('Options - skipCurrencyMap combined with skipEmoji', (t) => {
    t.is(toPlainText('💰 €100 profit', { skipCurrencyMap: true, skipEmoji: true }), '💰 €100 profit', 'both preserved')
    t.is(toPlainText('💰 €100 profit', { skipCurrencyMap: true }), '€100 profit', 'emoji removed, currency preserved')
})

// ============================================================================
// SKIP EMOTICON PUNCTUATION
// ============================================================================

test('Options - skipEmoticonPunctuation false (default) removes punctuation', (t) => {
    t.is(toPlainText('(hello)'), 'hello', 'parentheses removed')
    t.is(toPlainText('hello,world'), 'helloworld', 'comma removed')
    t.is(toPlainText('hello.world'), 'helloworld', 'period removed')
    t.is(toPlainText('(hello)', { skipEmoticonPunctuation: false }), 'hello', 'parentheses removed when explicitly false')
})

test('Options - skipEmoticonPunctuation true preserves punctuation', (t) => {
    t.is(toPlainText('(hello)', { skipEmoticonPunctuation: true }), '(hello)', 'parentheses preserved')
    t.is(toPlainText('hello,world', { skipEmoticonPunctuation: true }), 'hello,world', 'comma preserved')
    t.is(toPlainText('hello.world', { skipEmoticonPunctuation: true }), 'hello.world', 'period preserved')
    t.is(toPlainText('(a,b)', { skipEmoticonPunctuation: true }), '(a,b)', 'mixed punctuation preserved')
})

test('Options - skipEmoticonPunctuation with fancy text', (t) => {
    t.is(toPlainText('(𝐡𝐞𝐥𝐥𝐨)', { skipEmoticonPunctuation: true }), '(hello)', 'converts fancy text, preserves parentheses')
    t.is(toPlainText('(𝐡𝐞𝐥𝐥𝐨)'), 'hello', 'removes parentheses and converts fancy text by default')
})

test('Options - skipEmoticonPunctuation combined with skipEmoji', (t) => {
    t.is(toPlainText('(hello 🎉)', { skipEmoticonPunctuation: true, skipEmoji: true }), '(hello 🎉)', 'both preserved')
    t.is(toPlainText('(hello🎉)', { skipEmoticonPunctuation: true }), '(hello)', 'emoji removed, punctuation preserved')
})

