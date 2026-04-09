/**
 * PPT 模板内容库 - 每种风格独特的结构和内容
 */

const TEMPLATE_CONTENT = {

    // ==========================================
    // 深空紫 - 产品发布会
    // ==========================================
    deepSpace: {
        name: '深空紫',
        scenario: '产品发布会',
        content: {
            cover: {
                title: 'AI奇遇',
                subtitle: 'V2.0 产品发布会',
                tagline: '遇见好看又合拍的同路人'
            },
            slides: [
                {
                    type: 'infoCards',
                    title: '产品定位',
                    description: '智能出行社交平台',
                    cards: [
                        { icon: '🗺️', title: 'AI路书', desc: '语音生成个性化行程' },
                        { icon: '👥', title: '智能匹配', desc: '推荐志趣相投旅伴' },
                        { icon: '💬', title: '即时聊天', desc: '安全有趣的互动' },
                        { icon: '🚗', title: '结伴自驾', desc: '每次出行不孤单' }
                    ]
                },
                {
                    type: 'highlight',
                    title: '核心亮点',
                    items: [
                        { icon: '⚡', title: 'AI驱动', desc: '智能算法精准匹配' },
                        { icon: '🔒', title: '安全可靠', desc: '多重身份验证' },
                        { icon: '🌟', title: '用户体验', desc: '简洁优雅的界面' },
                        { icon: '📱', title: '全平台', desc: 'iOS/Android/Web' }
                    ]
                },
                {
                    type: 'dataStats',
                    title: '市场数据',
                    stats: [
                        { value: '50万+', label: '注册用户', change: '+200%' },
                        { value: '98%', label: '用户满意度' },
                        { value: '1000+', label: '每日行程', change: '+150%' },
                        { value: '4.9', label: '应用评分' }
                    ]
                },
                {
                    type: 'roadmap',
                    title: '产品路线图',
                    sections: [
                        { name: 'Q1 2024', items: ['核心功能上线', '用户增长'] },
                        { name: 'Q2 2024', items: ['AI功能优化', '商业化探索'] },
                        { name: 'Q3-Q4', items: ['全国扩张', '生态建设'] }
                    ]
                }
            ],
            end: {
                title: '感谢关注',
                tagline: '一起开启智能出行新时代',
                contact: 'contact@aiqiyu.com'
            }
        }
    },

    // ==========================================
    // 学术蓝 - 论文答辩
    // ==========================================
    academic: {
        name: '学术蓝',
        scenario: '论文答辩',
        content: {
            cover: {
                title: '基于深度学习的图像识别研究',
                subtitle: '答辩人：张三 | 导师：李教授',
                tagline: '计算机科学与技术学院 | 2024年6月'
            },
            slides: [
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
                        { icon: '📚', title: '理论意义', desc: '填补研究空白' },
                        { icon: '💡', title: '应用价值', desc: '解决实际问题' },
                        { icon: '🔬', title: '创新点', desc: '方法创新' },
                        { icon: '📊', title: '预期成果', desc: '论文/专利' }
                    ]
                },
                {
                    type: 'literature',
                    title: '文献综述',
                    papers: [
                        { author: 'He et al. (2016)', content: 'ResNet残差网络' },
                        { author: 'Vaswani et al. (2017)', content: 'Transformer架构' },
                        { author: 'Dosovitskiy et al. (2020)', content: 'Vision Transformer' },
                        { author: 'Liu et al. (2021)', content: 'Swin Transformer' }
                    ]
                },
                {
                    type: 'methodology',
                    title: '研究方法',
                    steps: [
                        { title: '数据准备', desc: '数据集构建与预处理' },
                        { title: '模型设计', desc: '网络架构设计' },
                        { title: '训练策略', desc: '优化方法与超参' },
                        { title: '评估方法', desc: '对比实验设计' }
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
                    rows: [
                        { method: 'ResNet-50', accuracy: '92.1%', params: '25.6M' },
                        { method: 'ViT-Base', accuracy: '94.3%', params: '86M' },
                        { method: 'Swin-T', accuracy: '95.1%', params: '28M' },
                        { method: 'Ours', accuracy: '96.5%', params: '32M' }
                    ]
                },
                {
                    type: 'conclusion',
                    title: '结论与展望',
                    contributions: [
                        '提出了一种新的图像识别方法',
                        '在多个数据集上取得了SOTA结果',
                        '模型参数量相对较小，推理速度快'
                    ],
                    future: [
                        '进一步优化模型结构',
                        '扩展到更多应用场景',
                        '探索轻量化部署方案'
                    ]
                }
            ],
            end: {
                title: '谢谢聆听',
                tagline: '敬请各位老师批评指正',
                contact: 'zhangsan@university.edu.cn'
            }
        }
    },

    // ==========================================
    // 可爱童趣 - 幼儿园课程
    // ==========================================
    playful: {
        name: '可爱童趣',
        scenario: '幼儿园课程',
        content: {
            cover: {
                title: '快乐学习乐园',
                subtitle: '小班春季学期课程',
                tagline: '让每个孩子快乐成长 ⭐'
            },
            slides: [
                {
                    type: 'infoCards',
                    title: '课程特色',
                    description: '五大领域全面发展',
                    cards: [
                        { icon: '🎨', title: '创意美术', desc: '激发想象力' },
                        { icon: '🎵', title: '音乐舞蹈', desc: '培养节奏感' },
                        { icon: '📖', title: '绘本阅读', desc: '爱上阅读' },
                        { icon: '🧩', title: '益智游戏', desc: '快乐成长' }
                    ]
                },
                {
                    type: 'schedule',
                    title: '一日活动安排 🌈',
                    schedule: [
                        { time: '8:00-8:30', activity: '晨间接待', icon: '👋' },
                        { time: '8:30-9:00', activity: '早餐时间', icon: '🥛' },
                        { time: '9:00-9:30', activity: '早操活动', icon: '🏃' },
                        { time: '9:30-10:30', activity: '主题课程', icon: '📚' },
                        { time: '10:30-11:00', activity: '户外游戏', icon: '🌳' },
                        { time: '11:00-11:30', activity: '午餐准备', icon: '🍽️' }
                    ]
                },
                {
                    type: 'weeklyTheme',
                    title: '本周主题：春天来了 🌸',
                    activities: [
                        { day: '周一', theme: '春天的花', activity: '手指画创作' },
                        { day: '周二', theme: '春天的小动物', activity: '歌曲学唱' },
                        { day: '周三', theme: '春天的天气', activity: '户外观察' },
                        { day: '周四', theme: '春天的食物', activity: '品尝青团' },
                        { day: '周五', theme: '春天的故事', activity: '绘本分享' }
                    ]
                },
                {
                    type: 'goals',
                    title: '发展目标',
                    areas: [
                        { name: '健康', goals: ['喜欢参加体育活动', '养成良好的卫生习惯'] },
                        { name: '语言', goals: ['愿意表达自己的想法', '喜欢听故事'] },
                        { name: '社会', goals: ['能和同伴友好相处', '遵守基本规则'] },
                        { name: '科学', goals: ['对周围事物感兴趣', '乐于探索'] }
                    ]
                },
                {
                    type: 'homeCooperation',
                    title: '家园共育',
                    tips: [
                        { icon: '📚', title: '亲子阅读', desc: '每天15分钟绘本阅读' },
                        { icon: '🎨', title: '亲子手工', desc: '周末一起做手工' },
                        { icon: '🌳', title: '户外活动', desc: '多带孩子亲近自然' },
                        { icon: '💬', title: '沟通交流', desc: '关注班级群消息' }
                    ]
                },
                {
                    type: 'menu',
                    title: '本周食谱',
                    days: [
                        { day: '周一', lunch: '米饭、红烧肉、青菜', snack: '苹果' },
                        { day: '周二', lunch: '面条、番茄炒蛋', snack: '酸奶' },
                        { day: '周三', lunch: '米饭、清蒸鱼、豆腐', snack: '香蕉' },
                        { day: '周四', lunch: '饺子、紫菜汤', snack: '牛奶' },
                        { day: '周五', lunch: '米饭、鸡肉、西兰花', snack: '橙子' }
                    ]
                }
            ],
            end: {
                title: '谢谢观看',
                tagline: '期待与宝贝们一起快乐成长 🌈',
                contact: '幼儿园小班教室'
            }
        }
    },

    // ==========================================
    // 商务精英 - 年终总结
    // ==========================================
    corporate: {
        name: '商务精英',
        scenario: '年终总结',
        content: {
            cover: {
                title: '2024年度工作总结',
                subtitle: '技术研发部 | 汇报人：王经理',
                tagline: '砥砺前行，共创未来'
            },
            slides: [
                {
                    type: 'annualOverview',
                    title: '年度概览',
                    highlights: [
                        { value: '12', label: '重大项目' },
                        { value: '98%', label: '按时交付率' },
                        { value: '3', label: '技术创新奖' },
                        { value: '15人', label: '团队规模' }
                    ]
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
                    type: 'projectList',
                    title: '重点项目回顾',
                    projects: [
                        { name: 'CRM系统升级', status: 'done', result: '提前2周交付' },
                        { name: '数据中台建设', status: 'done', result: '按期上线' },
                        { name: '移动APP重构', status: 'done', result: '用户增长50%' },
                        { name: '安全合规改造', status: 'done', result: '通过等保三级' }
                    ]
                },
                {
                    type: 'teamBuilding',
                    title: '团队建设',
                    achievements: [
                        { icon: '👥', title: '人才引进', desc: '引进高级工程师3人' },
                        { icon: '📚', title: '培训提升', desc: '人均培训40+小时' },
                        { icon: '🏆', title: '荣誉表彰', desc: '获评优秀团队' },
                        { icon: '💪', title: '团队凝聚', desc: '团建活动4次' }
                    ]
                },
                {
                    type: 'challenges',
                    title: '问题与挑战',
                    issues: [
                        { problem: '需求变更频繁', solution: '建立变更管理流程' },
                        { problem: '技术债务累积', solution: '制定重构计划' },
                        { problem: '人员流动', solution: '完善培养机制' }
                    ]
                },
                {
                    type: 'roadmap',
                    title: '2025年规划',
                    sections: [
                        { name: 'Q1', items: ['架构优化', '团队扩充'] },
                        { name: 'Q2', items: ['AI平台建设', '流程标准化'] },
                        { name: 'Q3-Q4', items: ['技术输出', '创新孵化'] }
                    ]
                },
                {
                    type: 'goals',
                    title: '年度目标',
                    areas: [
                        { name: '项目产值', goals: ['增长30%', 'KPI考核'] },
                        { name: '团队规模', goals: ['扩大至20人', 'HR统计'] },
                        { name: '技术创新', goals: ['成果5项', '专利/论文'] },
                        { name: '客户满意度', goals: ['95%以上', '调研反馈'] }
                    ]
                }
            ],
            end: {
                title: '谢谢',
                tagline: '新的一年，再创佳绩',
                contact: 'wangmanager@company.com'
            }
        }
    },

    // ==========================================
    // 科技未来 - 产品发布
    // ==========================================
    tech: {
        name: '科技未来',
        scenario: 'AI产品发布',
        content: {
            cover: {
                title: 'NeuralAI',
                subtitle: '下一代智能助手',
                tagline: 'Redefine Intelligence'
            },
            slides: [
                {
                    type: 'problem',
                    title: '痛点分析',
                    problems: [
                        { icon: '⏰', title: '效率低下', desc: '重复性工作占60%时间' },
                        { icon: '🔄', title: '信息孤岛', desc: '多系统数据不互通' },
                        { icon: '📊', title: '决策困难', desc: '缺乏数据支撑' },
                        { icon: '💰', title: '成本高昂', desc: '人工成本持续上涨' }
                    ]
                },
                {
                    type: 'solution',
                    title: '解决方案',
                    features: [
                        { icon: '🤖', title: 'AI Agent', desc: '自主完成任务' },
                        { icon: '🔗', title: '智能集成', desc: '一键连接所有系统' },
                        { icon: '📈', title: '数据洞察', desc: '实时分析决策' },
                        { icon: '⚡', title: '效率提升', desc: '10倍工作效率' }
                    ]
                },
                {
                    type: 'architecture',
                    title: '技术架构',
                    layers: [
                        { name: '应用层', components: ['Web App', 'Mobile App', 'API'] },
                        { name: '服务层', components: ['AI Engine', 'Data Pipeline', 'Auth'] },
                        { name: '基础层', components: ['Kubernetes', 'GPU Cluster', 'Storage'] }
                    ]
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
                },
                {
                    type: 'roadmap',
                    title: '产品路线图',
                    sections: [
                        { name: 'Phase 1', items: ['核心功能', 'API开放'] },
                        { name: 'Phase 2', items: ['多模态能力', '行业定制'] },
                        { name: 'Phase 3', items: ['全球部署', '生态建设'] }
                    ]
                }
            ],
            end: {
                title: 'Thank You',
                tagline: 'The Future is Now',
                contact: 'hello@neuralai.com'
            }
        }
    },

    // ==========================================
    // 极简主义 - 设计展示
    // ==========================================
    minimal: {
        name: '极简主义',
        scenario: '设计作品集',
        content: {
            cover: {
                title: 'DESIGN',
                subtitle: 'Portfolio 2024',
                tagline: 'Less is More'
            },
            slides: [
                {
                    type: 'philosophy',
                    title: '设计理念',
                    principles: [
                        '简约而不简单',
                        '功能决定形式',
                        '细节成就品质',
                        '用户至上'
                    ]
                },
                {
                    type: 'portfolio',
                    title: '精选作品',
                    works: [
                        { name: '品牌VI设计', client: 'Tech Corp', year: '2024' },
                        { name: 'APP界面设计', client: 'StartUp Inc', year: '2024' },
                        { name: '网站设计', client: 'Creative Agency', year: '2023' },
                        { name: '包装设计', client: 'Eco Brand', year: '2023' }
                    ]
                },
                {
                    type: 'process',
                    title: '工作流程',
                    steps: [
                        { num: '01', title: 'Research', desc: '深入研究用户需求' },
                        { num: '02', title: 'Concept', desc: '创意构思与草图' },
                        { num: '03', title: 'Design', desc: '细节设计与打磨' },
                        { num: '04', title: 'Deliver', desc: '交付与迭代优化' }
                    ]
                },
                {
                    type: 'services',
                    title: '服务范围',
                    items: [
                        '品牌视觉设计',
                        'UI/UX设计',
                        '网站设计',
                        '包装设计',
                        '插画设计'
                    ]
                },
                {
                    type: 'quote',
                    title: '设计哲学',
                    quoteText: 'Good design is as little design as possible.',
                    author: 'Dieter Rams'
                }
            ],
            end: {
                title: 'Hello',
                tagline: 'Let\'s create something amazing together',
                contact: 'hello@designer.com'
            }
        }
    },

    // ==========================================
    // 自然绿意 - 环保项目
    // ==========================================
    nature: {
        name: '自然绿意',
        scenario: '环保项目报告',
        content: {
            cover: {
                title: '绿色地球计划',
                subtitle: '2024年度环保项目报告',
                tagline: '守护地球，从我做起'
            },
            slides: [
                {
                    type: 'mission',
                    title: '我们的使命',
                    mission: '通过科技创新和公众参与，推动可持续发展，共建绿色家园',
                    values: [
                        { icon: '🌱', title: '可持续', desc: '长效机制' },
                        { icon: '🤝', title: '共创', desc: '全民参与' },
                        { icon: '💡', title: '创新', desc: '科技驱动' }
                    ]
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
                    type: 'projects',
                    title: '重点项目',
                    items: [
                        { name: '城市绿肺计划', desc: '新增城市绿地500公顷', status: '进行中' },
                        { name: '河流净化行动', desc: '治理河流50公里', status: '已完成' },
                        { name: '零废弃社区', desc: '建立100个示范社区', status: '进行中' },
                        { name: '新能源推广', desc: '安装太阳能设备1000套', status: '已完成' }
                    ]
                },
                {
                    type: 'impact',
                    title: '环境效益',
                    impacts: [
                        { area: '空气质量', before: 'AQI 120', after: 'AQI 75' },
                        { area: '水质改善', before: 'III类', after: 'II类' },
                        { area: '绿化覆盖', before: '35%', after: '42%' },
                        { area: '垃圾分类', before: '20%', after: '85%' }
                    ]
                },
                {
                    type: 'partners',
                    title: '合作伙伴',
                    categories: [
                        { type: '政府机构', partners: ['环保局', '林业厅', '水利局'] },
                        { type: '企业伙伴', partners: ['绿色科技', '清洁能源', '生态农业'] },
                        { type: '公益组织', partners: ['自然保护协会', '绿色和平', '环保志愿者联盟'] }
                    ]
                },
                {
                    type: 'roadmap',
                    title: '未来规划',
                    sections: [
                        { name: '2025', items: ['扩大项目范围', '深化社区参与'] },
                        { name: '2026', items: ['建立生态监测网络', '推广成功模式'] },
                        { name: '2027+', items: ['打造绿色城市典范', '输出环保标准'] }
                    ]
                }
            ],
            end: {
                title: '感谢支持',
                tagline: '地球是我们共同的家园',
                contact: 'green@earth-project.org'
            }
        }
    },

    // ==========================================
    // 复古怀旧 - 周年纪念
    // ==========================================
    vintage: {
        name: '复古怀旧',
        scenario: '公司周年纪念',
        content: {
            cover: {
                title: '二十年风雨路',
                subtitle: '公司成立20周年纪念',
                tagline: '忆往昔，展未来'
            },
            slides: [
                {
                    type: 'timeline',
                    title: '发展历程',
                    items: [
                        { year: '2004', event: '公司成立', desc: '3人创业团队' },
                        { year: '2008', event: '首次盈利', desc: '员工50人' },
                        { year: '2012', event: '业务扩张', desc: '进军全国市场' },
                        { year: '2018', event: '转型升级', desc: '数字化转型' },
                        { year: '2024', event: '辉煌20年', desc: '员工1000人' }
                    ]
                },
                {
                    type: 'milestones',
                    title: '里程碑事件',
                    events: [
                        { year: '2004', title: '创立之初', desc: '从小作坊起步' },
                        { year: '2010', title: '首次融资', desc: '获得A轮投资' },
                        { year: '2015', title: '上市敲钟', desc: '深交所挂牌' },
                        { year: '2020', title: '破局重生', desc: '逆境中成长' }
                    ]
                },
                {
                    type: 'memories',
                    title: '珍贵回忆',
                    memories: [
                        { title: '第一份订单', desc: '客户信任是最大的动力' },
                        { title: '第一次团建', desc: '20人黄山之旅' },
                        { title: '乔迁新址', desc: '搬入自建办公楼' },
                        { title: '千人庆典', desc: '员工突破1000人' }
                    ]
                },
                {
                    type: 'people',
                    title: '感恩有你',
                    groups: [
                        { title: '创业元老', count: '3人', desc: '风雨同舟20年' },
                        { title: '10年员工', count: '50人', desc: '坚守初心' },
                        { title: '5年员工', count: '200人', desc: '中流砥柱' },
                        { title: '新锐力量', count: '700人', desc: '未来之星' }
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
                    type: 'future',
                    title: '展望未来',
                    vision: '再创下一个辉煌20年',
                    goals: [
                        '成为行业领军企业',
                        '打造百年品牌',
                        '回馈社会，创造价值'
                    ]
                }
            ],
            end: {
                title: '感谢一路同行',
                tagline: '下一个20年，我们继续携手前行',
                contact: 'anniversary@company.com'
            }
        }
    },

    // ==========================================
    // 活力橙黄 - 运动健身
    // ==========================================
    energetic: {
        name: '活力橙黄',
        scenario: '健身课程',
        content: {
            cover: {
                title: 'FITNESS POWER',
                subtitle: '燃脂塑形训练营',
                tagline: '释放你的能量 🔥'
            },
            slides: [
                {
                    type: 'program',
                    title: '课程介绍',
                    description: '12周科学健身计划',
                    features: [
                        { icon: '💪', title: '力量训练', desc: '增肌塑形' },
                        { icon: '🏃', title: '有氧燃脂', desc: '高效减脂' },
                        { icon: '🧘', title: '拉伸放松', desc: '恢复活力' },
                        { icon: '🍽️', title: '饮食指导', desc: '科学营养' }
                    ]
                },
                {
                    type: 'schedule',
                    title: '每周训练计划',
                    schedule: [
                        { time: '周一', activity: '胸+三头 60分钟', icon: '💪' },
                        { time: '周二', activity: '有氧HIIT 45分钟', icon: '🏃' },
                        { time: '周三', activity: '背+二头 60分钟', icon: '💪' },
                        { time: '周四', activity: '休息日', icon: '😴' },
                        { time: '周五', activity: '腿+臀 60分钟', icon: '🦵' },
                        { time: '周六', activity: '核心+拉伸 45分钟', icon: '🧘' }
                    ]
                },
                {
                    type: 'exercises',
                    title: '经典动作',
                    exercises: [
                        { name: '深蹲', target: '腿部/臀部', reps: '4×12' },
                        { name: '卧推', target: '胸部/手臂', reps: '4×10' },
                        { name: '硬拉', target: '背部/腿部', reps: '4×8' },
                        { name: '划船', target: '背部', reps: '4×12' }
                    ]
                },
                {
                    type: 'nutrition',
                    title: '营养建议',
                    tips: [
                        { icon: '🥚', title: '蛋白质', desc: '每公斤体重1.6-2g' },
                        { icon: '🍚', title: '碳水化合物', desc: '训练前后适量补充' },
                        { icon: '🥑', title: '健康脂肪', desc: '占总热量20-30%' },
                        { icon: '💧', title: '水分补充', desc: '每天2-3升水' }
                    ]
                },
                {
                    type: 'progress',
                    title: '预期效果',
                    milestones: [
                        { week: '4周', result: '体能提升，精神变好' },
                        { week: '8周', result: '体型变化，肌肉线条' },
                        { week: '12周', result: '目标达成，习惯养成' }
                    ]
                },
                {
                    type: 'pricing',
                    title: '课程套餐',
                    plans: [
                        { name: '月卡', price: '¥299', features: ['无限次入场', '团体课'] },
                        { name: '季卡', price: '¥799', features: ['无限次入场', '团体课', '私教1节'] },
                        { name: '年卡', price: '¥1999', features: ['全功能', '私教12节', '营养方案'] }
                    ]
                }
            ],
            end: {
                title: 'Let\'s Go!',
                tagline: '今天就开始你的蜕变之旅',
                contact: 'fitness@powergym.com'
            }
        }
    },

    // ==========================================
    // 医疗健康 - 医院汇报
    // ==========================================
    medical: {
        name: '医疗健康',
        scenario: '医院工作汇报',
        content: {
            cover: {
                title: '2024年度工作汇报',
                subtitle: '市人民医院 | 内科科室',
                tagline: '以患者为中心，追求卓越医疗'
            },
            slides: [
                {
                    type: 'overview',
                    title: '科室概况',
                    info: [
                        { label: '床位数', value: '120张' },
                        { label: '医护人员', value: '68人' },
                        { label: '主任医师', value: '8人' },
                        { label: '副主任护师', value: '12人' }
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
                    type: 'quality',
                    title: '医疗质量指标',
                    indicators: [
                        { name: '抗菌药物使用率', target: '≤40%', actual: '35%' },
                        { name: '平均住院日', target: '≤9天', actual: '8.2天' },
                        { name: '药占比', target: '≤35%', actual: '32%' },
                        { name: '病历合格率', target: '≥95%', actual: '97%' }
                    ]
                },
                {
                    type: 'academic',
                    title: '科研教学',
                    achievements: [
                        { type: '论文', count: 'SCI论文12篇' },
                        { type: '课题', count: '省级课题3项' },
                        { type: '专利', count: '发明专利2项' },
                        { type: '教学', count: '带教规培生20人' }
                    ]
                },
                {
                    type: 'innovation',
                    title: '技术创新',
                    items: [
                        { name: '新技术项目', desc: '开展微创介入治疗' },
                        { name: 'MDT诊疗', desc: '多学科会诊常态化' },
                        { name: '智慧医疗', desc: '电子病历升级' },
                        { name: '远程会诊', desc: '与三甲医院合作' }
                    ]
                },
                {
                    type: 'goals',
                    title: '明年计划',
                    areas: [
                        { name: '门诊量', goals: ['增长10%', '优化就诊流程'] },
                        { name: '学科建设', goals: ['创建省级重点专科', '提升学科建设'] },
                        { name: '人才培养', goals: ['引进博士2人', '完善培养机制'] },
                        { name: '服务质量', goals: ['患者满意度99%', '改善服务'] }
                    ]
                }
            ],
            end: {
                title: '谢谢',
                tagline: '为人民健康保驾护航',
                contact: 'neike@cityhospital.com'
            }
        }
    },

    // ==========================================
    // 金融财经 - 财务报告
    // ==========================================
    finance: {
        name: '金融财经',
        scenario: '季度财务报告',
        content: {
            cover: {
                title: '2024年第三季度财务报告',
                subtitle: '财务部 | 2024年10月',
                tagline: '稳健经营，持续增长'
            },
            slides: [
                {
                    type: 'executive',
                    title: '执行摘要',
                    highlights: [
                        '营业收入同比增长18%',
                        '净利润达到预期目标',
                        '资产负债率保持健康水平',
                        '现金流充裕，运营良好'
                    ]
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
                    type: 'revenue',
                    title: '收入分析',
                    breakdown: [
                        { category: '主营业务', amount: '4.5亿', percent: '78%', trend: '+15%' },
                        { category: '其他业务', amount: '0.8亿', percent: '14%', trend: '+25%' },
                        { category: '投资收益', amount: '0.5亿', percent: '8%', trend: '+30%' }
                    ]
                },
                {
                    type: 'expense',
                    title: '成本费用分析',
                    items: [
                        { name: '营业成本', amount: '3.2亿', percent: '72%' },
                        { name: '销售费用', amount: '0.6亿', percent: '13%' },
                        { name: '管理费用', amount: '0.4亿', percent: '9%' },
                        { name: '财务费用', amount: '0.3亿', percent: '6%' }
                    ]
                },
                {
                    type: 'balance',
                    title: '资产负债概况',
                    items: [
                        { name: '总资产', amount: '12.5亿' },
                        { name: '总负债', amount: '6.2亿' },
                        { name: '净资产', amount: '6.3亿' },
                        { name: '资产负债率', amount: '49.6%' }
                    ]
                },
                {
                    type: 'forecast',
                    title: '年度预测',
                    predictions: [
                        { item: '全年营收', forecast: '22亿', confidence: '95%' },
                        { item: '全年净利润', forecast: '3亿', confidence: '90%' },
                        { item: 'ROE', forecast: '15%', confidence: '85%' }
                    ]
                },
                {
                    type: 'risks',
                    title: '风险提示',
                    risks: [
                        { risk: '市场波动', impact: '中等', measure: '多元化布局' },
                        { risk: '政策变化', impact: '低', measure: '合规经营' },
                        { risk: '汇率波动', impact: '低', measure: '套期保值' }
                    ]
                }
            ],
            end: {
                title: '谢谢',
                tagline: '财务稳健，价值增长',
                contact: 'finance@company.com'
            }
        }
    },

    // ==========================================
    // 中国风 - 传统文化
    // ==========================================
    chinese: {
        name: '中国风',
        scenario: '传统文化推广',
        content: {
            cover: {
                title: '匠心传承',
                subtitle: '非物质文化遗产展示',
                tagline: '传承千年智慧，弘扬中华文化 🏮'
            },
            slides: [
                {
                    type: 'intro',
                    title: '项目背景',
                    content: '中国非物质文化遗产是中华民族智慧的结晶，承载着五千年的文明记忆。本项目致力于保护、传承和发展这些珍贵的文化遗产。',
                    values: [
                        { icon: '📜', title: '历史价值', desc: '承载千年文明' },
                        { icon: '🎨', title: '艺术价值', desc: '独特的审美' },
                        { icon: '💡', title: '实用价值', desc: '融入现代生活' }
                    ]
                },
                {
                    type: 'heritage',
                    title: '非遗项目',
                    items: [
                        { name: '苏绣', region: '江苏苏州', level: '国家级' },
                        { name: '景德镇瓷器', region: '江西景德镇', level: '国家级' },
                        { name: '宣纸制作', region: '安徽宣城', level: '国家级' },
                        { name: '昆曲', region: '江苏昆山', level: '世界级' }
                    ]
                },
                {
                    type: 'craftsman',
                    title: '匠心大师',
                    masters: [
                        { name: '张大师', craft: '苏绣', years: '40年', honor: '国家级传承人' },
                        { name: '李大师', craft: '陶瓷', years: '35年', honor: '省级传承人' },
                        { name: '王大师', craft: '书法', years: '50年', honor: '国家级传承人' }
                    ]
                },
                {
                    type: 'process',
                    title: '传统工艺',
                    steps: [
                        { step: '选材', desc: '精选优质原料' },
                        { step: '设计', desc: '匠心独运构思' },
                        { step: '制作', desc: '精湛技艺呈现' },
                        { step: '打磨', desc: '反复雕琢完善' }
                    ]
                },
                {
                    type: 'modern',
                    title: '创新传承',
                    innovations: [
                        { icon: '📱', title: '数字化保护', desc: '3D扫描存档' },
                        { icon: '🎓', title: '教育培训', desc: '非遗进校园' },
                        { icon: '🛒', title: '文创产品', desc: '融入现代生活' },
                        { icon: '🌐', title: '国际传播', desc: '走向世界舞台' }
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
                },
                {
                    type: 'vision',
                    title: '未来愿景',
                    goals: [
                        '让非遗融入现代生活',
                        '培养年轻一代传承人',
                        '推动文化产业发展',
                        '讲好中国故事'
                    ]
                }
            ],
            end: {
                title: '感谢关注',
                tagline: '传承非遗，弘扬国粹',
                contact: 'heritage@culture.cn'
            }
        }
    }
};

module.exports = { TEMPLATE_CONTENT };