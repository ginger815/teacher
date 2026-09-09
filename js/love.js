// ============================================================================
// 彩蛋页脚本：粒子玫瑰 + 环绕祝福语
// 触发：主页输入姓名「董晓晶」并点击按钮后进入
// ============================================================================

// ============ 祝福语（女性/中性风格，共 50 句） ============
var BLESSINGS = [
    '董老师平步青云', '董老师美丽动人', '董老师聪明伶俐', '董老师温柔善良',
    '董老师身体健康', '董老师桃李满园', '董老师教师节快乐', '董老师天天开心',
    '董老师心想事成', '董老师万事如意', '董老师青春永驻', '董老师事业有成',
    '董老师阖家幸福', '董老师工作顺利', '董老师笑容常在', '董老师幸福美满',
    '董老师前程似锦', '董老师平安喜乐', '董老师才貌双全', '董老师桃李芬芳',
    '董老师顺遂无忧', '董老师光彩照人', '董老师优雅从容', '董老师岁月静好',
    '董老师越来越美', '董老师智慧常在', '祝董老师教师节快乐', '祝董老师身体健康',
    '祝董老师幸福每一天', '祝董老师桃李满天下', '董老师美丽动人', '董老师聪明伶俐',
    '董老师温柔善良', '董老师平步青云', '董老师天天开心', '董老师心想事成',
    '董老师青春永驻', '董老师万事如意', '董老师桃李满园', '董老师事业有成',
    '董老师前程似锦', '董老师平安喜乐', '董老师光彩照人', '董老师优雅从容',
    '董老师越来越美', '董老师笑容常在', '董老师幸福美满', '董老师岁月静好',
    '董老师智慧常在', '董老师教师节快乐'
];

// ============ 祝福语漂移动画 ============
// 祝福语只出现在屏幕四周的黑色区域，避开中央的玫瑰花束
function inner() {
    var words = [];
    for (var i = 0; i < BLESSINGS.length; i++) {
        var el = document.getElementById('w' + (i + 1));
        if (el) words.push(el);
    }
    if (words.length === 0) return;

    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 在四周黑色区域随机取一个位置（百分比），避开中央花束与底部文案
    function edgePos() {
        var zone = rand(1, 4);
        var top, left;
        if (zone === 1) {           // 左侧黑边
            top = rand(10, 78);
            left = rand(1, 11);
        } else if (zone === 2) {    // 右侧黑边
            top = rand(10, 78);
            left = rand(74, 90);
        } else if (zone === 3) {    // 顶部黑边
            top = rand(3, 14);
            left = rand(15, 70);
        } else {                    // 底部黑边（避开底部玫瑰文案）
            top = rand(68, 86);
            left = rand(15, 70);
        }
        return {
            top: top * window.innerHeight / 100,
            left: left * window.innerWidth / 100
        };
    }

    function relayout() {
        for (var k = 0; k < words.length; k++) {
            var p = edgePos();
            var el = words[k];
            el.style.top = p.top + 'px';
            el.style.left = p.left + 'px';
            // 浅色暖色系文字，在黑底上清晰可见
            el.style.color = 'rgb(' + rand(215, 255) + ',' + rand(160, 225) + ',' + rand(185, 240) + ')';
            // 小屏幕上防止文字超出右边界
            if (el.offsetWidth > 0 && p.left + el.offsetWidth > window.innerWidth - 8) {
                el.style.left = (window.innerWidth - el.offsetWidth - 8) + 'px';
            }
        }
    }

    relayout();
    setInterval(relayout, 2000);
    window.addEventListener('resize', relayout);
}

// ============ 按钮逻辑 ============
var use_name = document.getElementById('use');
var btn = document.getElementById('btn');
btn.onclick = function () {
    switch (use_name.value) {
        case '董晓晶':
            zxb();
            break;
        default:
            alert('输错了哦，必须输入您的姓名才可以进入哦！ 例如：姜山');
    }
    inner();
};

// ============ 彩蛋页：玫瑰 + 祝福语 ============
function zxb() {
    var html = '';
    for (var i = 0; i < BLESSINGS.length; i++) {
        html += '<div class="w" id="w' + (i + 1) + '">' + BLESSINGS[i] + '</div>';
    }
    document.body.innerHTML = html;

    // 注意：innerHTML 里塞的 <script> 不会执行，必须用 createElement 动态加载玫瑰脚本
    var s = document.createElement('script');
    s.src = '../js/rose.js';
    document.body.appendChild(s);
}
