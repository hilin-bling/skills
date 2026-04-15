/**
 * PDF 模板内容库 - 18种风格专用内容 (v8.0)
 *
 * 每种风格都有独特的文档结构和内容
 * 专为 PDF 文档阅读设计，内容详实、结构完整
 * 每种风格 8-12 页，适合真实文档场景
 */

const TEMPLATE_CONTENT = {

    // ==========================================
    // 1. Aurora 极光 - 产品介绍手册
    // ==========================================
    aurora: {
        name: '极光 Aurora',
        scenario: '产品介绍手册',
        content: {
            cover: {
                title: 'AI奇遇',
                subtitle: '智能出行社交平台',
                tagline: '遇见好看又合拍的同路人'
            },
            pages: [
                {
                    type: 'toc',
                    title: '目录',
                    items: [
                        { num: '01', title: '产品定位', page: 3 },
                        { num: '02', title: '核心功能', page: 4 },
                        { num: '03', title: '技术架构', page: 5 },
                        { num: '04', title: '用户数据', page: 6 },
                        { num: '05', title: '应用场景', page: 7 },
                        { num: '06', title: '发展路线', page: 8 },
                        { num: '07', title: '团队介绍', page: 9 }
                    ]
                },
                {
                    type: 'infoCards',
                    title: '产品定位',
                    description: '智能出行社交平台',
                    cards: [
                        { icon: '🗺️', title: 'AI路书', desc: '语音生成个性化行程推荐' },
                        { icon: '👥', title: '智能匹配', desc: '基于兴趣推荐志趣相投旅伴' },
                        { icon: '💬', title: '即时聊天', desc: '安全有趣的互动交流' },
                        { icon: '🚗', title: '结伴自驾', desc: '每次出行不再孤单' }
                    ]
                },
                {
                    type: 'architecture',
                    title: '技术架构',
                    layers: [
                        { name: '应用层', components: ['iOS App', 'Android App', 'Web Portal'] },
                        { name: '服务层', components: ['AI Engine', 'Match Service', 'Chat Service'] },
                        { name: '数据层', components: ['User DB', 'Route DB', 'Message Queue'] }
                    ]
                },
                {
                    type: 'dataStats',
                    title: '用户数据',
                    stats: [
                        { value: '50万+', label: '注册用户', change: '+200%' },
                        { value: '98%', label: '用户满意度' },
                        { value: '1000+', label: '每日行程', change: '+150%' },
                        { value: '4.9', label: '应用评分' }
                    ]
                },
                {
                    type: 'useCases',
                    title: '应用场景',
                    cases: [
                        { industry: '旅游出行', scenarios: ['自驾游组队', '景点推荐', '旅伴匹配'] },
                        { industry: '商务差旅', scenarios: ['同行对接', '行程共享', '商务社交'] },
                        { industry: '日常通勤', scenarios: ['拼车匹配', '路线优化', '社区互动'] }
                    ]
                },
                {
                    type: 'timeline',
                    title: '发展路线',
                    events: [
                        { date: '2024-Q1', title: '产品上线', desc: '核心功能发布' },
                        { date: '2024-Q2', title: '用户增长', desc: '突破50万用户' },
                        { date: '2024-Q3', title: '功能扩展', desc: 'AI路书优化' },
                        { date: '2024-Q4', title: '全国推广', desc: '覆盖100城市' }
                    ]
                },
                {
                    type: 'orgChart',
                    title: '团队介绍',
                    root: { name: 'CEO', title: '创始人' },
                    children: [
                        { name: 'CTO', title: '技术负责人', children: [
                            { name: '研发组', title: '10人' }
                        ]},
                        { name: 'COO', title: '运营负责人', children: [
                            { name: '运营组', title: '8人' }
                        ]}
                    ]
                }
            ],
            end: {
                title: '开启智能出行',
                subtitle: '新体验',
                contact: 'contact@aiqiyu.com'
            }
        }
    },

    // ==========================================
    // 2. Cyberpunk 赛博朋克 - 游戏技术文档
    // ==========================================
    cyberpunk: {
        name: '赛博朋克 Cyberpunk',
        scenario: '游戏技术文档',
        content: {
            cover: {
                title: 'NeonRunner',
                subtitle: '游戏技术白皮书 v2.0',
                tagline: '进入霓虹世界'
            },
            pages: [
                {
                    type: 'toc',
                    title: '目录',
                    items: [
                        { num: '01', title: '游戏概述', page: 3 },
                        { num: '02', title: '核心玩法', page: 4 },
                        { num: '03', title: '技术架构', page: 5 },
                        { num: '04', title: '渲染引擎', page: 6 },
                        { num: '05', title: '网络架构', page: 7 },
                        { num: '06', title: '性能指标', page: 8 }
                    ]
                },
                {
                    type: 'body',
                    title: '游戏概述',
                    content: 'NeonRunner 是一款赛博朋克风格的开放世界动作游戏。玩家将在霓虹闪烁的未来都市中探索、战斗、成长。游戏采用自主研发的 NeonEngine 渲染引擎，实现实时光追效果。'
                },
                {
                    type: 'infoCards',
                    title: '核心玩法',
                    cards: [
                        { icon: '⚡', title: '高速跑酷', desc: '流畅的动作系统' },
                        { icon: '🔫', title: '战术射击', desc: '多样化的武器系统' },
                        { icon: '🤖', title: 'NPC互动', desc: 'AI驱动的角色行为' },
                        { icon: '🌐', title: '多人竞技', desc: '实时PVP对战' }
                    ]
                },
                {
                    type: 'architecture',
                    title: '技术架构',
                    layers: [
                        { name: '渲染层', components: ['NeonEngine', 'RayTracing', 'PostFX'] },
                        { name: '逻辑层', components: ['GameLogic', 'AI System', 'Physics'] },
                        { name: '网络层', components: ['Matchmaking', 'Sync Engine', 'AntiCheat'] }
                    ]
                },
                {
                    type: 'codeBlock',
                    title: '渲染核心代码',
                    language: 'C++',
                    code: `// NeonEngine Ray Tracing Core
vec3 traceRay(Ray ray, Scene scene) {
    HitInfo hit = scene.intersect(ray);
    if (hit.hit) {
        return computeShading(hit, scene);
    }
    return scene.skyColor;
}`
                },
                {
                    type: 'dataStats',
                    title: '性能指标',
                    stats: [
                        { value: '60 FPS', label: '帧率', change: '稳定' },
                        { value: '<50ms', label: '网络延迟' },
                        { value: '4K', label: '分辨率支持' },
                        { value: '99.9%', label: '服务可用性' }
                    ]
                }
            ],
            end: {
                title: 'Welcome to Neon World',
                subtitle: 'The Future is Now',
                contact: 'dev@neonrunner.game'
            }
        }
    },

    // ==========================================
    // 3. Glass 玻璃态 - 科技公司简介
    // ==========================================
    glass: {
        name: '玻璃态 Glassmorphism',
        scenario: '科技公司简介',
        content: {
            cover: {
                title: 'TechFlow',
                subtitle: '企业数字化转型专家',
                tagline: '透明 · 高效 · 创新'
            },
            pages: [
                {
                    type: 'toc',
                    title: '目录',
                    items: [
                        { num: '01', title: '公司简介', page: 3 },
                        { num: '02', title: '核心服务', page: 4 },
                        { num: '03', title: '技术方案', page: 5 },
                        { num: '04', title: '成功案例', page: 6 },
                        { num: '05', title: '团队实力', page: 7 },
                        { num: '06', title: '合作方式', page: 8 }
                    ]
                },
                {
                    type: 'body',
                    title: '公司简介',
                    content: 'TechFlow 成立于 2018 年，专注于为企业提供数字化转型解决方案。我们拥有超过 200 名技术专家，服务客户超过 500 家，累计完成数字化项目 1200+ 个。'
                },
                {
                    type: 'infoCards',
                    title: '核心服务',
                    cards: [
                        { icon: '☁️', title: '云平台建设', desc: '私有云、混合云部署' },
                        { icon: '📊', title: '数据中台', desc: '数据治理与分析' },
                        { icon: '🤖', title: 'AI应用', desc: '智能化业务升级' },
                        { icon: '🔗', title: '系统集成', desc: '企业应用整合' }
                    ]
                },
                {
                    type: 'architecture',
                    title: '技术方案架构',
                    layers: [
                        { name: '业务应用层', components: ['CRM', 'ERP', 'OA系统'] },
                        { name: '数据服务层', components: ['数据仓库', 'BI平台', 'AI服务'] },
                        { name: '基础设施层', components: ['云服务器', '容器平台', '安全体系'] }
                    ]
                },
                {
                    type: 'dataStats',
                    title: '业务数据',
                    stats: [
                        { value: '500+', label: '服务客户', change: '+45%' },
                        { value: '1200+', label: '完成项目' },
                        { value: '200+', label: '技术专家' },
                        { value: '98%', label: '客户满意度' }
                    ]
                },
                {
                    type: 'orgChart',
                    title: '团队实力',
                    root: { name: 'CEO', title: '总经理' },
                    children: [
                        { name: '技术VP', title: '技术副总裁', children: [
                            { name: '研发部', title: '80人' },
                            { name: '架构部', title: '20人' }
                        ]},
                        { name: '业务VP', title: '业务副总裁', children: [
                            { name: '销售部', title: '50人' },
                            { name: '交付部', title: '50人' }
                        ]}
                    ]
                }
            ],
            end: {
                title: '携手共创',
                subtitle: '数字化转型新篇章',
                contact: 'info@techflow.com'
            }
        }
    },

    // ==========================================
    // 4. Monochrome 单色大师 - 高端品牌手册
    // ==========================================
    monochrome: {
        name: '单色大师 Monochrome',
        scenario: '高端品牌手册',
        content: {
            cover: {
                title: 'NOIR',
                subtitle: '奢华生活方式品牌',
                tagline: '纯粹 · 极致 · 永恒'
            },
            pages: [
                {
                    type: 'toc',
                    title: '目录',
                    items: [
                        { num: '01', title: '品牌哲学', page: 3 },
                        { num: '02', title: '产品系列', page: 4 },
                        { num: '03', title: '工艺传承', page: 5 },
                        { num: '04', title: '门店网络', page: 6 },
                        { num: '05', title: '品牌数据', page: 7 },
                        { num: '06', title: '合作伙伴', page: 8 }
                    ]
                },
                {
                    type: 'quote',
                    text: '真正的奢华不是繁复，而是极简中蕴含的极致工艺与永恒美学。',
                    author: 'NOIR 创始人'
                },
                {
                    type: 'infoCards',
                    title: '产品系列',
                    cards: [
                        { icon: '■', title: '腕表系列', desc: '瑞士机芯，限量发售' },
                        { icon: '□', title: '珠宝系列', desc: '稀有宝石，手工镶嵌' },
                        { icon: '▪', title: '皮具系列', desc: '顶级皮革，匠心制作' },
                        { icon: '▫', title: '香氛系列', desc: '独家配方，限量调配' }
                    ]
                },
                {
                    type: 'timeline',
                    title: '工艺传承',
                    events: [
                        { date: '1950', title: '品牌创立', desc: '瑞士日内瓦' },
                        { date: '1980', title: '工艺革新', desc: '引入新技术' },
                        { date: '2000', title: '全球扩张', desc: '进入亚洲市场' },
                        { date: '2024', title: '数字转型', desc: '线上精品店' }
                    ]
                },
                {
                    type: 'dataStats',
                    title: '品牌数据',
                    stats: [
                        { value: '50+', label: '全球门店' },
                        { value: '100万+', label: '年销售额' },
                        { value: '500+', label: '工匠团队' },
                        { value: '70年', label: '品牌历史' }
                    ]
                }
            ],
            end: {
                title: 'NOIR',
                subtitle: '永恒之美',
                contact: 'www.noir.com'
            }
        }
    },

    // ==========================================
    // 5. Gradient 渐变流 - 品牌展示文档
    // ==========================================
    gradient: {
        name: '渐变流 Gradient Flow',
        scenario: '品牌展示文档',
        content: {
            cover: {
                title: 'Gradient Studio',
                subtitle: '创意设计工作室',
                tagline: '让色彩流动'
            },
            pages: [
                {
                    type: 'toc',
                    title: '目录',
                    items: [
                        { num: '01', title: '工作室简介', page: 3 },
                        { num: '02', title: '设计理念', page: 4 },
                        { num: '03', title: '服务范围', page: 5 },
                        { num: '04', title: '作品展示', page: 6 },
                        { num: '05', title: '合作流程', page: 7 },
                        { num: '06', title: '联系方式', page: 8 }
                    ]
                },
                {
                    type: 'body',
                    title: '工作室简介',
                    content: 'Gradient Studio 是一家专注于品牌视觉设计的创意工作室。我们相信色彩的力量，用渐变讲述品牌故事，用设计传递品牌价值。成立以来，已为超过 200 个品牌打造独特的视觉识别系统。'
                },
                {
                    type: 'infoCards',
                    title: '服务范围',
                    cards: [
                        { icon: '🎨', title: '品牌VI设计', desc: '完整的视觉识别系统' },
                        { icon: '📱', title: 'UI/UX设计', desc: '数字产品设计' },
                        { icon: '🖼️', title: '插画创作', desc: '原创插画作品' },
                        { icon: '🎬', title: '动态设计', desc: '动画与视频制作' }
                    ]
                },
                {
                    type: 'dataStats',
                    title: '工作室数据',
                    stats: [
                        { value: '200+', label: '服务品牌', change: '+30%' },
                        { value: '50+', label: '设计师' },
                        { value: '500+', label: '完成项目' },
                        { value: '15项', label: '设计奖项' }
                    ]
                },
                {
                    type: 'flowChart',
                    title: '合作流程',
                    steps: [
                        { id: 1, title: '需求沟通', desc: '了解品牌背景' },
                        { id: 2, title: '创意提案', desc: '设计方向确定' },
                        { id: 3, title: '设计执行', desc: '细节打磨完善' },
                        { id: 4, title: '交付验收', desc: '成果确认交付' }
                    ]
                }
            ],
            end: {
                title: '让设计流动',
                subtitle: '创造品牌色彩',
                contact: 'hello@gradient.studio'
            }
        }
    },

    // ==========================================
    // 6. Pastel 柔和梦境 - 生活方式手册
    // ==========================================
    pastel: {
        name: '柔和梦境 Pastel',
        scenario: '生活方式手册',
        content: {
            cover: {
                title: 'SoftLife',
                subtitle: '温柔生活方式指南',
                tagline: '生活需要一点温柔'
            },
            pages: [
                {
                    type: 'toc',
                    title: '目录',
                    items: [
                        { num: '01', title: '品牌理念', page: 3 },
                        { num: '02', title: '产品系列', page: 4 },
                        { num: '03', title: '生活方式', page: 5 },
                        { num: '04', title: '用户故事', page: 6 },
                        { num: '05', title: '社区活动', page: 7 },
                        { num: '06', title: '加入我们', page: 8 }
                    ]
                },
                {
                    type: 'body',
                    title: '品牌理念',
                    content: 'SoftLife 致力于传递温柔的生活态度。我们相信，在快节奏的现代生活中，每个人都值得拥有属于自己的柔软时刻。我们的产品设计简约温和，材质舒适自然，为您的日常带来一丝宁静与美好。'
                },
                {
                    type: 'infoCards',
                    title: '产品系列',
                    cards: [
                        { icon: '🌸', title: '家居系列', desc: '柔软舒适的家居用品' },
                        { icon: '🎀', title: '服饰系列', desc: '天然材质的日常服饰' },
                        { icon: '🧴', title: '护理系列', desc: '温和天然的护理产品' },
                        { icon: '📚', title: '文具系列', desc: '简约设计的手账文具' }
                    ]
                },
                {
                    type: 'timeline',
                    title: '品牌历程',
                    events: [
                        { date: '2020', title: '品牌诞生', desc: '第一家门店开业' },
                        { date: '2021', title: '产品扩展', desc: '新增护理系列' },
                        { date: '2022', title: '线上商城', desc: '官方网站上线' },
                        { date: '2024', title: '社区建立', desc: '生活社区成立' }
                    ]
                },
                {
                    type: 'dataStats',
                    title: '用户数据',
                    stats: [
                        { value: '10万+', label: '品牌粉丝', change: '+50%' },
                        { value: '30+', label: '门店数量' },
                        { value: '200+', label: '产品SKU' },
                        { value: '95%', label: '好评率' }
                    ]
                }
            ],
            end: {
                title: '温柔生活',
                subtitle: '从这里开始',
                contact: 'www.softlife.com'
            }
        }
    },

    // ==========================================
    // 7. Academic 学术蓝 - 论文答辩
    // ==========================================
    academic: {
        name: '学术蓝 Academic',
        scenario: '论文答辩文档',
        content: {
            cover: {
                title: '基于深度学习的图像识别研究',
                subtitle: '答辩人：张三 | 导师：李教授',
                tagline: '计算机科学与技术学院 | 2024年6月'
            },
            pages: [
                {
                    type: 'toc',
                    title: '目录',
                    items: [
                        { num: '01', title: '研究背景与意义', page: 3 },
                        { num: '02', title: '文献综述', page: 4 },
                        { num: '03', title: '研究方法', page: 5 },
                        { num: '04', title: '实验设计与结果', page: 6 },
                        { num: '05', title: '方法对比', page: 7 },
                        { num: '06', title: '结论与展望', page: 8 },
                        { num: '07', title: '参考文献', page: 9 }
                    ]
                },
                {
                    type: 'outline',
                    title: '汇报提纲',
                    items: [
                        { num: '01', title: '研究背景与意义' },
                        { num: '02', title: '文献综述' },
                        { num: '03', title: '研究方法' },
                        { num: '04', title: '实验设计与结果' },
                        { num: '05', title: '结论与展望' }
                    ]
                },
                {
                    type: 'infoCards',
                    title: '研究背景',
                    description: '研究意义与价值',
                    cards: [
                        { icon: '📚', title: '理论意义', desc: '填补深度学习图像识别研究空白' },
                        { icon: '💡', title: '应用价值', desc: '解决实际场景中的识别难题' },
                        { icon: '🔬', title: '创新点', desc: '提出新的网络架构设计' },
                        { icon: '📊', title: '预期成果', desc: '论文发表与专利申请' }
                    ]
                },
                {
                    type: 'literature',
                    title: '文献综述',
                    refs: [
                        { author: 'He et al. (2016)', content: 'ResNet残差网络，解决深层网络训练问题' },
                        { author: 'Vaswani et al. (2017)', content: 'Transformer架构，开创注意力机制新范式' },
                        { author: 'Dosovitskiy et al. (2020)', content: 'Vision Transformer，将Transformer应用于视觉任务' },
                        { author: 'Liu et al. (2021)', content: 'Swin Transformer，层次化视觉Transformer' }
                    ]
                },
                {
                    type: 'methodology',
                    title: '研究方法',
                    steps: [
                        { title: '数据准备', desc: '构建大规模图像数据集并进行预处理' },
                        { title: '模型设计', desc: '设计新型网络架构和训练策略' },
                        { title: '实验验证', desc: '在多个基准数据集上进行实验对比' },
                        { title: '结果分析', desc: '分析性能指标并验证有效性' }
                    ]
                },
                {
                    type: 'dataStats',
                    title: '实验结果',
                    stats: [
                        { value: '96.5%', label: '准确率', change: '+3.2%', highlight: true },
                        { value: '0.89', label: 'F1分数' },
                        { value: '12ms', label: '推理时间', change: '-40%' },
                        { value: '95.2%', label: '召回率' }
                    ]
                },
                {
                    type: 'comparison',
                    title: '方法对比',
                    columns: ['方法', '准确率', '参数量', '推理时间'],
                    rows: [
                        { method: 'ResNet-50', accuracy: '92.1%', params: '25.6M', time: '15ms' },
                        { method: 'ViT-Base', accuracy: '94.3%', params: '86M', time: '25ms' },
                        { method: 'Swin-T', accuracy: '95.1%', params: '28M', time: '18ms' },
                        { method: '本文方法', accuracy: '96.5%', params: '32M', time: '12ms' }
                    ]
                },
                {
                    type: 'conclusion',
                    title: '结论与展望',
                    conclusions: [
                        '提出了一种新的图像识别方法，结合CNN和Transformer优势',
                        '在多个数据集上取得了领先的识别准确率',
                        '模型参数量适中，推理速度快，适合实际部署'
                    ],
                    futureWork: [
                        '进一步优化模型结构，探索轻量化方案',
                        '扩展到更多视觉任务（检测、分割）',
                        '在移动端和边缘设备上进行部署验证'
                    ]
                }
            ],
            end: {
                title: '谢谢聆听',
                subtitle: '敬请各位老师批评指正',
                contact: 'zhangsan@university.edu.cn'
            }
        }
    },

    // ==========================================
    // 8. Corporate 商务精英 - 年度工作总结
    // ==========================================
    corporate: {
        name: '商务精英 Business Elite',
        scenario: '年度工作总结',
        content: {
            cover: {
                title: '2024年度工作总结',
                subtitle: '技术研发部 | 汇报人：王经理',
                tagline: '砥砺前行，共创未来'
            },
            pages: [
                {
                    type: 'toc',
                    title: '目录',
                    items: [
                        { num: '01', title: '年度概览', page: 3 },
                        { num: '02', title: '关键业绩', page: 4 },
                        { num: '03', title: '项目回顾', page: 5 },
                        { num: '04', title: '团队建设', page: 6 },
                        { num: '05', title: '问题与挑战', page: 7 },
                        { num: '06', title: '明年规划', page: 8 }
                    ]
                },
                {
                    type: 'executiveSummary',
                    title: '年度概览',
                    summary: '2024年技术研发部在公司战略指导下，圆满完成各项年度目标。团队规模稳定增长，项目交付率达到98%，技术创新成果显著。全年完成12个重大项目，获得3项技术创新奖，为公司业务发展提供了坚实的技术支撑。'
                },
                {
                    type: 'dataStats',
                    title: '关键业绩指标',
                    stats: [
                        { value: '¥2,580万', label: '项目产值', change: '+35%', highlight: true },
                        { value: '156个', label: '交付功能', change: '+28%' },
                        { value: '99.2%', label: '系统可用性' },
                        { value: '45%', label: '效率提升', change: '+15%' }
                    ]
                },
                {
                    type: 'table',
                    title: '重点项目回顾',
                    columns: ['项目名称', '状态', '成果'],
                    rows: [
                        { name: 'CRM系统升级', status: '已完成', result: '提前2周交付' },
                        { name: '数据中台建设', status: '已完成', result: '按期上线' },
                        { name: '移动APP重构', status: '已完成', result: '用户增长50%' },
                        { name: '安全合规改造', status: '已完成', result: '通过等保三级' }
                    ]
                },
                {
                    type: 'orgChart',
                    title: '团队建设',
                    root: { name: '研发部', title: '15人' },
                    children: [
                        { name: '前端组', title: '4人' },
                        { name: '后端组', title: '6人' },
                        { name: '测试组', title: '3人' },
                        { name: '运维组', title: '2人' }
                    ]
                },
                {
                    type: 'infoCards',
                    title: '问题与挑战',
                    cards: [
                        { icon: '⚠️', title: '需求变更频繁', desc: '建立变更管理流程' },
                        { icon: '🔧', title: '技术债务累积', desc: '制定重构计划' },
                        { icon: '👥', title: '人员流动', desc: '完善培养机制' }
                    ]
                },
                {
                    type: 'timeline',
                    title: '2025年规划',
                    events: [
                        { date: 'Q1', title: '架构优化', desc: '核心系统重构' },
                        { date: 'Q2', title: 'AI平台建设', desc: '智能化升级' },
                        { date: 'Q3', title: '技术输出', desc: '开源项目发布' },
                        { date: 'Q4', title: '创新孵化', desc: '新技术探索' }
                    ]
                }
            ],
            end: {
                title: '谢谢',
                subtitle: '新的一年，再创佳绩',
                contact: 'wangmanager@company.com'
            }
        }
    },

    // ==========================================
    // 9. Tech 科技未来 - 技术白皮书
    // ==========================================
    tech: {
        name: '科技未来 Tech Future',
        scenario: '技术白皮书',
        content: {
            cover: {
                title: 'NeuralAI',
                subtitle: '下一代智能助手技术白皮书',
                tagline: 'Redefine Intelligence'
            },
            pages: [
                {
                    type: 'toc',
                    title: '目录',
                    items: [
                        { num: '01', title: '产品概述', page: 3 },
                        { num: '02', title: '痛点分析', page: 4 },
                        { num: '03', title: '解决方案', page: 5 },
                        { num: '04', title: '技术架构', page: 6 },
                        { num: '05', title: 'API文档', page: 7 },
                        { num: '06', title: '性能指标', page: 8 },
                        { num: '07', title: '应用场景', page: 9 },
                        { num: '08', title: '定价方案', page: 10 }
                    ]
                },
                {
                    type: 'body',
                    title: '产品概述',
                    content: 'NeuralAI 是下一代智能助手平台，基于自主研发的大语言模型，为企业提供智能化解决方案。平台支持多模态交互、知识管理、自动化流程等核心能力，帮助企业提升效率、降低成本。'
                },
                {
                    type: 'infoCards',
                    title: '痛点分析',
                    cards: [
                        { icon: '⏰', title: '效率低下', desc: '重复性工作占60%时间' },
                        { icon: '🔄', title: '信息孤岛', desc: '多系统数据不互通' },
                        { icon: '📊', title: '决策困难', desc: '缺乏数据支撑' },
                        { icon: '💰', title: '成本高昂', desc: '人工成本持续上涨' }
                    ]
                },
                {
                    type: 'infoCards',
                    title: '解决方案',
                    cards: [
                        { icon: '🤖', title: 'AI Agent', desc: '自主完成任务执行' },
                        { icon: '🔗', title: '智能集成', desc: '一键连接所有系统' },
                        { icon: '📈', title: '数据洞察', desc: '实时分析辅助决策' },
                        { icon: '⚡', title: '效率提升', desc: '10倍工作效率增长' }
                    ]
                },
                {
                    type: 'architecture',
                    title: '技术架构',
                    layers: [
                        { name: '应用层', components: ['Web App', 'Mobile App', 'API Gateway'] },
                        { name: '服务层', components: ['AI Engine', 'Data Pipeline', 'Auth Service'] },
                        { name: '基础层', components: ['Kubernetes', 'GPU Cluster', 'Object Storage'] }
                    ]
                },
                {
                    type: 'apiOverview',
                    title: 'API概览',
                    endpoints: [
                        { method: 'POST', path: '/v1/chat', desc: '对话交互接口' },
                        { method: 'POST', path: '/v1/complete', desc: '文本补全接口' },
                        { method: 'GET', path: '/v1/models', desc: '模型列表查询' },
                        { method: 'POST', path: '/v1/embed', desc: '文本向量生成' }
                    ]
                },
                {
                    type: 'codeBlock',
                    title: '代码示例',
                    language: 'Python',
                    code: `import neuralai

# 创建客户端
client = neuralai.Client(api_key="your_key")

# 发送对话请求
response = client.chat(
    messages=[
        {"role": "user", "content": "帮我分析销售数据"}
    ]
)
print(response.content)`
                },
                {
                    type: 'dataStats',
                    title: '性能指标',
                    stats: [
                        { value: '<100ms', label: '响应延迟' },
                        { value: '99.99%', label: '服务可用性' },
                        { value: '10B+', label: '参数规模' },
                        { value: '50+', label: '支持语言' }
                    ]
                },
                {
                    type: 'useCases',
                    title: '应用场景',
                    cases: [
                        { industry: '金融', scenarios: ['智能客服', '风控分析', '报告生成'] },
                        { industry: '医疗', scenarios: ['病历分析', '辅助诊断', '药物研发'] },
                        { industry: '教育', scenarios: ['智能批改', '个性化学习', '内容生成'] }
                    ]
                },
                {
                    type: 'pricing',
                    title: '定价方案',
                    plans: [
                        { name: 'Starter', price: '¥99/月', features: ['5K请求/月', '基础模型', '邮件支持'] },
                        { name: 'Pro', price: '¥499/月', features: ['50K请求/月', '高级模型', '优先支持'] },
                        { name: 'Enterprise', price: '定制', features: ['无限请求', '私有部署', '专属服务'] }
                    ]
                }
            ],
            end: {
                title: 'Thank You',
                subtitle: 'The Future is Now',
                contact: 'hello@neuralai.com'
            }
        }
    },

    // ==========================================
    // 10. Minimal 极简主义 - 设计作品集
    // ==========================================
    minimal: {
        name: '极简主义 Minimalist',
        scenario: '设计作品集',
        content: {
            cover: {
                title: 'DESIGN',
                subtitle: 'Portfolio 2024',
                tagline: 'Less is More'
            },
            pages: [
                {
                    type: 'toc',
                    title: '目录',
                    items: [
                        { num: '01', title: '设计理念', page: 3 },
                        { num: '02', title: '精选作品', page: 4 },
                        { num: '03', title: '工作流程', page: 5 },
                        { num: '04', title: '服务范围', page: 6 },
                        { num: '05', title: '客户评价', page: 7 }
                    ]
                },
                {
                    type: 'body',
                    title: '设计理念',
                    content: '简约而不简单。我们相信好的设计应该去除不必要的装饰，保留最本质的表达。每一个像素都有存在的理由，每一处留白都是深思熟虑的结果。设计不仅是视觉，更是体验。'
                },
                {
                    type: 'table',
                    title: '精选作品',
                    columns: ['作品名称', '客户', '年份'],
                    rows: [
                        { name: '品牌VI设计', client: 'Tech Corp', year: '2024' },
                        { name: 'APP界面设计', client: 'StartUp Inc', year: '2024' },
                        { name: '网站设计', client: 'Creative Agency', year: '2023' },
                        { name: '包装设计', client: 'Eco Brand', year: '2023' }
                    ]
                },
                {
                    type: 'flowChart',
                    title: '工作流程',
                    steps: [
                        { id: 1, title: 'Research', desc: '深入研究用户需求' },
                        { id: 2, title: 'Concept', desc: '创意构思与草图' },
                        { id: 3, title: 'Design', desc: '细节设计与打磨' },
                        { id: 4, title: 'Deliver', desc: '交付与迭代优化' }
                    ]
                },
                {
                    type: 'infoCards',
                    title: '服务范围',
                    cards: [
                        { icon: '○', title: '品牌视觉设计', desc: 'VI系统设计' },
                        { icon: '□', title: 'UI/UX设计', desc: '数字产品设计' },
                        { icon: '△', title: '网站设计', desc: '响应式网页' },
                        { icon: '◇', title: '包装设计', desc: '产品包装' }
                    ]
                },
                {
                    type: 'quote',
                    text: 'Good design is as little design as possible.',
                    author: 'Dieter Rams'
                }
            ],
            end: {
                title: 'Hello',
                subtitle: 'Let\'s create something amazing together',
                contact: 'hello@designer.com'
            }
        }
    },

    // ==========================================
    // 11. Nature 自然绿意 - 环保项目报告
    // ==========================================
    nature: {
        name: '自然绿意 Natural Green',
        scenario: '环保项目报告',
        content: {
            cover: {
                title: '绿色地球计划',
                subtitle: '2024年度环保项目报告',
                tagline: '守护地球，从我做起'
            },
            pages: [
                {
                    type: 'toc',
                    title: '目录',
                    items: [
                        { num: '01', title: '项目使命', page: 3 },
                        { num: '02', title: '年度成果', page: 4 },
                        { num: '03', title: '重点项目', page: 5 },
                        { num: '04', title: '环境效益', page: 6 },
                        { num: '05', title: '合作伙伴', page: 7 },
                        { num: '06', title: '未来规划', page: 8 }
                    ]
                },
                {
                    type: 'body',
                    title: '项目使命',
                    content: '绿色地球计划致力于通过科技创新和公众参与，推动可持续发展，共建绿色家园。我们相信每个人都可以为环境保护贡献力量，通过系统化的项目和持续的努力，让地球更加美好。'
                },
                {
                    type: 'dataStats',
                    title: '2024年成果',
                    stats: [
                        { value: '50万棵', label: '树木种植', change: '+120%' },
                        { value: '1000吨', label: '碳减排量' },
                        { value: '200个', label: '合作社区' },
                        { value: '10万人', label: '参与志愿者' }
                    ]
                },
                {
                    type: 'table',
                    title: '重点项目',
                    columns: ['项目名称', '描述', '状态'],
                    rows: [
                        { name: '城市绿肺计划', desc: '新增城市绿地500公顷', status: '进行中' },
                        { name: '河流净化行动', desc: '治理河流50公里', status: '已完成' },
                        { name: '零废弃社区', desc: '建立100个示范社区', status: '进行中' },
                        { name: '新能源推广', desc: '安装太阳能设备1000套', status: '已完成' }
                    ]
                },
                {
                    type: 'comparison',
                    title: '环境效益对比',
                    left: {
                        title: '2023年',
                        items: ['AQI 120', '水质 III类', '绿化35%', '垃圾分类20%']
                    },
                    right: {
                        title: '2024年',
                        items: ['AQI 75', '水质 II类', '绿化42%', '垃圾分类85%'],
                        recommend: true
                    }
                },
                {
                    type: 'timeline',
                    title: '未来规划',
                    events: [
                        { date: '2025', title: '扩大范围', desc: '项目覆盖全国' },
                        { date: '2026', title: '生态监测', desc: '建立监测网络' },
                        { date: '2027', title: '模式推广', desc: '输出成功经验' }
                    ]
                }
            ],
            end: {
                title: '感谢支持',
                subtitle: '地球是我们共同的家园',
                contact: 'green@earth-project.org'
            }
        }
    },

    // ==========================================
    // 12. Vintage 复古怀旧 - 公司周年纪念
    // ==========================================
    vintage: {
        name: '复古怀旧 Retro',
        scenario: '公司周年纪念',
        content: {
            cover: {
                title: '二十年风雨路',
                subtitle: '公司成立20周年纪念',
                tagline: '忆往昔，展未来'
            },
            pages: [
                {
                    type: 'toc',
                    title: '目录',
                    items: [
                        { num: '01', title: '发展历程', page: 3 },
                        { num: '02', title: '里程碑', page: 4 },
                        { num: '03', title: '珍贵回忆', page: 5 },
                        { num: '04', title: '团队风采', page: 6 },
                        { num: '05', title: '辉煌成就', page: 7 },
                        { num: '06', title: '未来展望', page: 8 }
                    ]
                },
                {
                    type: 'timeline',
                    title: '发展历程',
                    events: [
                        { date: '2004', title: '公司成立', desc: '3人创业团队' },
                        { date: '2008', title: '首次盈利', desc: '员工50人' },
                        { date: '2012', title: '业务扩张', desc: '进军全国市场' },
                        { date: '2018', title: '转型升级', desc: '数字化转型' },
                        { date: '2024', title: '辉煌20年', desc: '员工1000人' }
                    ]
                },
                {
                    type: 'infoCards',
                    title: '里程碑事件',
                    cards: [
                        { icon: '🏆', title: '2004创立', desc: '从小作坊起步' },
                        { icon: '💰', title: '2010融资', desc: '获得A轮投资' },
                        { icon: '📈', title: '2015上市', desc: '深交所挂牌' },
                        { icon: '💪', title: '2020破局', desc: '逆境中成长' }
                    ]
                },
                {
                    type: 'dataStats',
                    title: '辉煌成就',
                    stats: [
                        { value: '1000+', label: '员工人数' },
                        { value: '¥10亿', label: '年营收' },
                        { value: '50+', label: '专利技术' },
                        { value: '100万+', label: '服务客户' }
                    ]
                },
                {
                    type: 'orgChart',
                    title: '感恩有你',
                    root: { name: '公司', title: '1000人' },
                    children: [
                        { name: '创业元老', title: '3人·20年' },
                        { name: '10年员工', title: '50人' },
                        { name: '5年员工', title: '200人' },
                        { name: '新锐力量', title: '700人' }
                    ]
                }
            ],
            end: {
                title: '感谢一路同行',
                subtitle: '下一个20年，我们继续携手前行',
                contact: 'anniversary@company.com'
            }
        }
    },

    // ==========================================
    // 13. Energetic 活力橙黄 - 课程介绍手册
    // ==========================================
    energetic: {
        name: '活力橙黄 Vibrant',
        scenario: '健身课程介绍',
        content: {
            cover: {
                title: 'FITNESS POWER',
                subtitle: '燃脂塑形训练营',
                tagline: '释放你的能量'
            },
            pages: [
                {
                    type: 'toc',
                    title: '目录',
                    items: [
                        { num: '01', title: '课程介绍', page: 3 },
                        { num: '02', title: '训练计划', page: 4 },
                        { num: '03', title: '经典动作', page: 5 },
                        { num: '04', title: '营养建议', page: 6 },
                        { num: '05', title: '预期效果', page: 7 },
                        { num: '06', title: '课程套餐', page: 8 }
                    ]
                },
                {
                    type: 'body',
                    title: '课程介绍',
                    content: 'FITNESS POWER 燃脂塑形训练营是一项为期12周的科学健身计划。结合力量训练、有氧运动和营养指导，帮助您实现理想体型。专业教练全程指导，科学训练方案，让健身更高效。'
                },
                {
                    type: 'infoCards',
                    title: '课程特色',
                    cards: [
                        { icon: '💪', title: '力量训练', desc: '增肌塑形' },
                        { icon: '🏃', title: '有氧燃脂', desc: '高效减脂' },
                        { icon: '🧘', title: '拉伸放松', desc: '恢复活力' },
                        { icon: '🍽️', title: '饮食指导', desc: '科学营养' }
                    ]
                },
                {
                    type: 'table',
                    title: '每周训练计划',
                    columns: ['时间', '训练内容', '时长'],
                    rows: [
                        { time: '周一', content: '胸+三头', duration: '60分钟' },
                        { time: '周二', content: '有氧HIIT', duration: '45分钟' },
                        { time: '周三', content: '背+二头', duration: '60分钟' },
                        { time: '周四', content: '休息日', duration: '-' },
                        { time: '周五', content: '腿+臀', duration: '60分钟' },
                        { time: '周六', content: '核心+拉伸', duration: '45分钟' }
                    ]
                },
                {
                    type: 'timeline',
                    title: '预期效果',
                    events: [
                        { date: '4周', title: '体能提升', desc: '精神变好' },
                        { date: '8周', title: '体型变化', desc: '肌肉线条' },
                        { date: '12周', title: '目标达成', desc: '习惯养成' }
                    ]
                },
                {
                    type: 'pricing',
                    title: '课程套餐',
                    plans: [
                        { name: '月卡', price: '¥299', features: ['无限入场', '团体课'] },
                        { name: '季卡', price: '¥799', features: ['无限入场', '团体课', '私教1节'] },
                        { name: '年卡', price: '¥1999', features: ['全功能', '私教12节', '营养方案'] }
                    ]
                }
            ],
            end: {
                title: 'Let\'s Go!',
                subtitle: '今天就开始你的蜕变之旅',
                contact: 'fitness@powergym.com'
            }
        }
    },

    // ==========================================
    // 14. Medical 医疗健康 - 医院工作报告
    // ==========================================
    medical: {
        name: '医疗健康 Healthcare',
        scenario: '医院工作汇报',
        content: {
            cover: {
                title: '2024年度工作汇报',
                subtitle: '市人民医院 | 内科科室',
                tagline: '以患者为中心，追求卓越医疗'
            },
            pages: [
                {
                    type: 'toc',
                    title: '目录',
                    items: [
                        { num: '01', title: '科室概况', page: 3 },
                        { num: '02', title: '业务数据', page: 4 },
                        { num: '03', title: '质量指标', page: 5 },
                        { num: '04', title: '科研教学', page: 6 },
                        { num: '05', title: '技术创新', page: 7 },
                        { num: '06', title: '明年计划', page: 8 }
                    ]
                },
                {
                    type: 'infoCards',
                    title: '科室概况',
                    cards: [
                        { icon: '🛏️', title: '床位', desc: '120张' },
                        { icon: '👨‍⚕️', title: '医护', desc: '68人' },
                        { icon: '🎓', title: '主任医师', desc: '8人' },
                        { icon: '🏥', title: '副主任护师', desc: '12人' }
                    ]
                },
                {
                    type: 'dataStats',
                    title: '业务数据',
                    stats: [
                        { value: '15,680', label: '年门诊量', change: '+12%' },
                        { value: '8,520', label: '年住院人次', change: '+8%' },
                        { value: '96.5%', label: '治愈好转率' },
                        { value: '98.2%', label: '患者满意度' }
                    ]
                },
                {
                    type: 'table',
                    title: '医疗质量指标',
                    columns: ['指标', '目标', '实际'],
                    rows: [
                        { indicator: '抗菌药物使用率', target: '≤40%', actual: '35%' },
                        { indicator: '平均住院日', target: '≤9天', actual: '8.2天' },
                        { indicator: '药占比', target: '≤35%', actual: '32%' },
                        { indicator: '病历合格率', target: '≥95%', actual: '97%' }
                    ]
                },
                {
                    type: 'infoCards',
                    title: '科研教学',
                    cards: [
                        { icon: '📄', title: '论文', desc: 'SCI论文12篇' },
                        { icon: '🔬', title: '课题', desc: '省级课题3项' },
                        { icon: '💡', title: '专利', desc: '发明专利2项' },
                        { icon: '📚', title: '教学', desc: '带教规培生20人' }
                    ]
                },
                {
                    type: 'timeline',
                    title: '明年计划',
                    events: [
                        { date: '门诊量', title: '增长10%', desc: '优化就诊流程' },
                        { date: '学科建设', title: '省级重点专科', desc: '提升学科影响力' },
                        { date: '人才培养', title: '引进博士2人', desc: '完善培养机制' }
                    ]
                }
            ],
            end: {
                title: '谢谢',
                subtitle: '为人民健康保驾护航',
                contact: 'neike@cityhospital.com'
            }
        }
    },

    // ==========================================
    // 15. Finance 金融财经 - 季度财务报告
    // ==========================================
    finance: {
        name: '金融财经 Finance',
        scenario: '季度财务报告',
        content: {
            cover: {
                title: '2024年第三季度财务报告',
                subtitle: '财务部 | 2024年10月',
                tagline: '稳健经营，持续增长'
            },
            pages: [
                {
                    type: 'toc',
                    title: '目录',
                    items: [
                        { num: '01', title: '执行摘要', page: 3 },
                        { num: '02', title: '核心指标', page: 4 },
                        { num: '03', title: '收入分析', page: 5 },
                        { num: '04', title: '成本分析', page: 6 },
                        { num: '05', title: '资产负债', page: 7 },
                        { num: '06', title: '年度预测', page: 8 },
                        { num: '07', title: '风险提示', page: 9 }
                    ]
                },
                {
                    type: 'executiveSummary',
                    title: '执行摘要',
                    summary: '本季度营业收入同比增长18%，净利润达到预期目标。资产负债率保持健康水平，现金流充裕，运营良好。主要业务持续增长，新业务拓展顺利。'
                },
                {
                    type: 'dataStats',
                    title: '核心财务指标',
                    stats: [
                        { value: '¥5.8亿', label: '营业收入', change: '+18%', highlight: true },
                        { value: '¥8,200万', label: '净利润', change: '+22%' },
                        { value: '45%', label: '毛利率', change: '+2%' },
                        { value: '¥1.2亿', label: '经营现金流' }
                    ]
                },
                {
                    type: 'table',
                    title: '收入结构分析',
                    columns: ['类别', '金额', '占比', '趋势'],
                    rows: [
                        { category: '主营业务', amount: '4.5亿', percent: '78%', trend: '+15%' },
                        { category: '其他业务', amount: '0.8亿', percent: '14%', trend: '+25%' },
                        { category: '投资收益', amount: '0.5亿', percent: '8%', trend: '+30%' }
                    ]
                },
                {
                    type: 'table',
                    title: '成本费用构成',
                    columns: ['项目', '金额', '占比'],
                    rows: [
                        { item: '营业成本', amount: '3.2亿', percent: '55%' },
                        { item: '销售费用', amount: '0.6亿', percent: '10%' },
                        { item: '管理费用', amount: '0.4亿', percent: '7%' },
                        { item: '研发费用', amount: '0.8亿', percent: '14%' },
                        { item: '财务费用', amount: '0.3亿', percent: '5%' }
                    ]
                },
                {
                    type: 'table',
                    title: '资产负债概况',
                    columns: ['项目', '金额'],
                    rows: [
                        { item: '总资产', amount: '12.5亿' },
                        { item: '流动资产', amount: '6.5亿' },
                        { item: '总负债', amount: '6.2亿' },
                        { item: '净资产', amount: '6.3亿' },
                        { item: '资产负债率', amount: '49.6%' }
                    ]
                },
                {
                    type: 'table',
                    title: '年度预测',
                    columns: ['项目', '预测值', '置信度'],
                    rows: [
                        { item: '全年营收', forecast: '22亿', confidence: '95%' },
                        { item: '全年净利润', forecast: '3亿', confidence: '90%' },
                        { item: 'ROE', forecast: '15%', confidence: '85%' }
                    ]
                },
                {
                    type: 'infoCards',
                    title: '风险提示',
                    cards: [
                        { icon: '⚠️', title: '市场波动', desc: '影响中等·多元化布局' },
                        { icon: '📋', title: '政策变化', desc: '影响低·合规经营' },
                        { icon: '💱', title: '汇率波动', desc: '影响低·套期保值' }
                    ]
                }
            ],
            end: {
                title: '谢谢',
                subtitle: '财务稳健，价值增长',
                contact: 'finance@company.com'
            }
        }
    },

    // ==========================================
    // 16. Chinese 中国风 - 传统文化推广
    // ==========================================
    chinese: {
        name: '中国风 Chinese Style',
        scenario: '传统文化推广',
        content: {
            cover: {
                title: '匠心传承',
                subtitle: '非物质文化遗产展示',
                tagline: '传承千年智慧，弘扬中华文化'
            },
            pages: [
                {
                    type: 'toc',
                    title: '目录',
                    items: [
                        { num: '01', title: '项目背景', page: 3 },
                        { num: '02', title: '非遗项目', page: 4 },
                        { num: '03', title: '匠心大师', page: 5 },
                        { num: '04', title: '传统工艺', page: 6 },
                        { num: '05', title: '创新传承', page: 7 },
                        { num: '06', title: '保护成果', page: 8 },
                        { num: '07', title: '未来愿景', page: 9 }
                    ]
                },
                {
                    type: 'body',
                    title: '项目背景',
                    content: '中国非物质文化遗产是中华民族智慧的结晶，承载着五千年的文明记忆。本项目致力于保护、传承和发展这些珍贵的文化遗产，让传统技艺在现代社会焕发新生。'
                },
                {
                    type: 'infoCards',
                    title: '项目价值',
                    cards: [
                        { icon: '📜', title: '历史价值', desc: '承载千年文明' },
                        { icon: '🎨', title: '艺术价值', desc: '独特的审美体系' },
                        { icon: '💡', title: '实用价值', desc: '融入现代生活' }
                    ]
                },
                {
                    type: 'table',
                    title: '非遗项目',
                    columns: ['名称', '地区', '级别'],
                    rows: [
                        { name: '苏绣', region: '江苏苏州', level: '国家级' },
                        { name: '景德镇瓷器', region: '江西景德镇', level: '国家级' },
                        { name: '宣纸制作', region: '安徽宣城', level: '国家级' },
                        { name: '昆曲', region: '江苏昆山', level: '世界级' }
                    ]
                },
                {
                    type: 'table',
                    title: '匠心大师',
                    columns: ['姓名', '技艺', '从业年限', '荣誉'],
                    rows: [
                        { name: '张大师', craft: '苏绣', years: '40年', honor: '国家级传承人' },
                        { name: '李大师', craft: '陶瓷', years: '35年', honor: '省级传承人' },
                        { name: '王大师', craft: '书法', years: '50年', honor: '国家级传承人' }
                    ]
                },
                {
                    type: 'flowChart',
                    title: '传统工艺流程',
                    steps: [
                        { id: 1, title: '选材', desc: '精选优质原料' },
                        { id: 2, title: '设计', desc: '匠心独运构思' },
                        { id: 3, title: '制作', desc: '精湛技艺呈现' },
                        { id: 4, title: '打磨', desc: '反复雕琢完善' }
                    ]
                },
                {
                    type: 'dataStats',
                    title: '保护成果',
                    stats: [
                        { value: '42项', label: '世界级非遗' },
                        { value: '1300+', label: '国家级非遗' },
                        { value: '3000+', label: '传承人' },
                        { value: '100+', label: '文化生态区' }
                    ]
                }
            ],
            end: {
                title: '感谢关注',
                subtitle: '传承非遗，弘扬国粹',
                contact: 'heritage@culture.cn'
            }
        }
    },

    // ==========================================
    // 17. Creative 创意艺术 - 创意提案文档
    // ==========================================
    creative: {
        name: '创意艺术 Creative',
        scenario: '创意提案文档',
        content: {
            cover: {
                title: '创意提案',
                subtitle: '品牌重塑设计方案',
                tagline: '突破常规，重新定义'
            },
            pages: [
                {
                    type: 'toc',
                    title: '目录',
                    items: [
                        { num: '01', title: '项目背景', page: 3 },
                        { num: '02', title: '品牌分析', page: 4 },
                        { num: '03', title: '设计方向', page: 5 },
                        { num: '04', title: '视觉方案', page: 6 },
                        { num: '05', title: '执行计划', page: 7 },
                        { num: '06', title: '预算估算', page: 8 }
                    ]
                },
                {
                    type: 'body',
                    title: '项目背景',
                    content: '本提案针对品牌重塑需求，旨在通过全新的视觉识别系统，提升品牌在市场中的辨识度和竞争力。经过深入的品牌分析和市场调研，我们提出了一套创新的设计方案。'
                },
                {
                    type: 'comparison',
                    title: '品牌现状分析',
                    left: {
                        title: '现有品牌',
                        items: ['视觉老化', '识别度低', '缺乏统一性', '传播受限']
                    },
                    right: {
                        title: '目标品牌',
                        items: ['现代时尚', '高度辨识', '系统统一', '易于传播'],
                        recommend: true
                    }
                },
                {
                    type: 'infoCards',
                    title: '设计方向',
                    cards: [
                        { icon: '🎨', title: '现代简约', desc: '简洁有力的视觉表达' },
                        { icon: '✨', title: '活力动感', desc: '充满能量与变化' },
                        { icon: '🌟', title: '专业可信', desc: '传递品牌实力' },
                        { icon: '🔮', title: '前瞻创新', desc: '引领行业趋势' }
                    ]
                },
                {
                    type: 'flowChart',
                    title: '执行计划',
                    steps: [
                        { id: 1, title: '调研分析', desc: '2周' },
                        { id: 2, title: '概念设计', desc: '3周' },
                        { id: 3, title: '方案优化', desc: '2周' },
                        { id: 4, title: '落地执行', desc: '4周' }
                    ]
                },
                {
                    type: 'pricing',
                    title: '预算估算',
                    plans: [
                        { name: '基础方案', price: '¥50万', features: ['VI系统', '基础应用'] },
                        { name: '标准方案', price: '¥80万', features: ['完整VI', '全场景应用', '设计规范'] },
                        { name: '完整方案', price: '¥120万', features: ['品牌策略', '完整VI', '落地执行', '培训指导'] }
                    ]
                }
            ],
            end: {
                title: '期待合作',
                subtitle: '共创品牌新篇章',
                contact: 'creative@design.com'
            }
        }
    },

    // ==========================================
    // 18. Business 企业标准 - 企业标准文档
    // ==========================================
    business: {
        name: '企业标准 Corporate',
        scenario: '企业标准文档',
        content: {
            cover: {
                title: '员工手册',
                subtitle: '企业文化与规章制度',
                tagline: '携手共进，成就卓越'
            },
            pages: [
                {
                    type: 'toc',
                    title: '目录',
                    items: [
                        { num: '01', title: '公司简介', page: 3 },
                        { num: '02', title: '企业文化', page: 4 },
                        { num: '03', title: '组织架构', page: 5 },
                        { num: '04', title: '员工权益', page: 6 },
                        { num: '05', title: '行为规范', page: 7 },
                        { num: '06', title: '发展通道', page: 8 }
                    ]
                },
                {
                    type: 'body',
                    title: '公司简介',
                    content: '本公司成立于2010年，是一家专注于技术创新的企业。经过十余年发展，已成为行业领先的技术服务提供商。公司秉承"创新驱动、客户至上"的理念，为员工提供良好的发展平台。'
                },
                {
                    type: 'infoCards',
                    title: '企业文化',
                    cards: [
                        { icon: '🎯', title: '使命', desc: '为客户创造价值' },
                        { icon: '🔭', title: '愿景', desc: '成为行业标杆' },
                        { icon: '💎', title: '价值观', desc: '诚信、创新、协作' },
                        { icon: '🏆', title: '精神', desc: '追求卓越、永不满足' }
                    ]
                },
                {
                    type: 'orgChart',
                    title: '组织架构',
                    root: { name: '总经理', title: 'CEO' },
                    children: [
                        { name: '技术部', title: '50人', children: [
                            { name: '研发组', title: '30人' },
                            { name: '测试组', title: '10人' },
                            { name: '运维组', title: '10人' }
                        ]},
                        { name: '市场部', title: '20人' },
                        { name: '行政部', title: '15人' }
                    ]
                },
                {
                    type: 'dataStats',
                    title: '员工权益',
                    stats: [
                        { value: '五险一金', label: '社会保险' },
                        { value: '带薪年假', label: '假期福利' },
                        { value: '培训发展', label: '成长机会' },
                        { value: '健康体检', label: '健康关怀' }
                    ]
                },
                {
                    type: 'timeline',
                    title: '职业发展通道',
                    events: [
                        { date: '入职', title: '新人培训', desc: '熟悉公司文化与流程' },
                        { date: '1-2年', title: '专业成长', desc: '深化专业技能' },
                        { date: '3-5年', title: '管理发展', desc: '承担管理职责' },
                        { date: '5年以上', title: '高管通道', desc: '战略决策层面' }
                    ]
                }
            ],
            end: {
                title: '欢迎加入',
                subtitle: '共同创造美好未来',
                contact: 'hr@company.com'
            }
        }
    }
};

module.exports = { TEMPLATE_CONTENT };