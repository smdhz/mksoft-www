// 两种语言的全部文案。改字只改这里。
export const LANGS = ['zh', 'ja'];

export const copy = {
  zh: {
    htmlLang: 'zh-CN',
    label: '中文',
    path: '/',
    description: 'Monkeysoft。在路上，也在线上。',
    slogan: ['在路上，', '也', '在线上。'],
    sub: '看风景，也管服务器。',
    subSmall: '城市、山水、街巷与渡轮之间，系统一直在跑。',
    road: { title: '在路上', lede: '去往远方，也看看沿途。' },
    line: { title: '在线上', lede: '从访问入口，到系统运行。人在路上的时候，这些事不会停。' },
    services: [
      { name: '域名维护', tag: 'DNS', text: '域名配置、解析与日常维护，让访问入口始终可靠。' },
      { name: '异构系统', tag: 'INTEGRATION', text: '不同架构与运行环境之间的整合，让它们彼此协作。' },
      { name: '容器系统设计', tag: 'CONTAINERS', text: '围绕部署、隔离与运行组织，设计容器系统。' },
      { name: '持续构建', tag: 'CI / CD', text: '代码提交之后，构建、测试与发布自动完成。' },
    ],
    coda: ['下一程继续出发。', '服务器，照常在线。'],
    top: '回到顶部 ↑',
  },
  ja: {
    htmlLang: 'ja',
    label: '日本語',
    path: '/ja/',
    description: 'Monkeysoft。歩きながら、つながっている。',
    slogan: ['歩きながら、', '', 'つながっている。'],
    sub: '景色を眺めて、サーバーも見守る。',
    subSmall: '街も山も、路地も渡し船も。そのあいだも、システムは動き続ける。',
    road: { title: '旅の途中', lede: '遠くへ。道すがらの景色も。' },
    line: { title: 'オンライン', lede: '入口から、システムの稼働まで。旅に出ているあいだも、止まらない。' },
    services: [
      { name: 'ドメイン管理', tag: 'DNS', text: 'ドメインの設定、DNS、日々の保守。入口をいつも確かに。' },
      { name: '異種システム連携', tag: 'INTEGRATION', text: '異なるアーキテクチャや実行環境をつなぎ、協調させる。' },
      { name: 'コンテナ設計', tag: 'CONTAINERS', text: 'デプロイ、分離、運用を軸に、コンテナ基盤を設計する。' },
      { name: '継続的ビルド', tag: 'CI / CD', text: 'コミットのあとは、ビルド、テスト、リリースまで自動で。' },
    ],
    coda: ['次の旅へ。', 'サーバーは、いつも通りオンライン。'],
    top: 'トップへ ↑',
  },
};

const KEY = 'mksoft-lang';

// 规则：网址里写了 /ja/ 就是日文；根路径先看访客上次选的，再看浏览器语言。
export function detectLang() {
  if (location.pathname.startsWith('/ja')) return 'ja';
  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (saved === 'zh') return 'zh';
  if (saved === 'ja') return 'ja';
  const prefs = navigator.languages || [navigator.language || ''];
  const first = (prefs.find(l => /^(zh|ja)/i.test(l)) || '').toLowerCase();
  return first.startsWith('ja') ? 'ja' : 'zh';
}

export function rememberLang(lang) {
  try { localStorage.setItem(KEY, lang); } catch (e) {}
}
