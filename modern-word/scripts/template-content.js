/**
 * 模板内容定义
 *
 * 每种风格都有独特的模板内容
 * 包含封面标题、章节标题、示例数据等
 */

const TEMPLATE_CONTENT = {
    // ==========================================
    // Aurora 极光
    // ==========================================
    aurora: {
        cover: {
            title: '创意设计方案',
            subtitle: 'Aurora 极光风格',
            author: '设计团队',
            institution: 'Creative Studio',
            date: '2024'
        },
        sections: [
            {
                title: '项目概述',
                content: [
                    { type: 'paragraph', text: '本项目采用极光风格设计，呈现梦幻般的视觉效果...' },
                    { type: 'infoCards', cards: [
                        { title: '设计理念', desc: '北欧极光灵感，梦幻渐变色彩' },
                        { title: '目标用户', desc: '创意设计师、品牌展示' },
                        { title: '预期效果', desc: '吸引眼球，传递创意价值' }
                    ]}
                ]
            },
            {
                title: '设计方案',
                content: [
                    { type: 'dataStats', stats: [
                        { value: '98%', label: '满意度' },
                        { value: '4.8', label: '评分' },
                        { value: '500+', label: '用户' }
                    ]}
                ]
            },
            {
                title: '结论',
                content: [
                    { type: 'quote', text: '设计是解决问题的艺术', author: 'Paul Rand' },
                    { type: 'conclusion', conclusions: ['完成创意设计方案', '验证风格效果'] }
                ]
            }
        ]
    },

    // ==========================================
    // Cyberpunk 赛博朋克
    // ==========================================
    cyberpunk: {
        cover: {
            title: '未来科技展望',
            subtitle: 'Cyberpunk 赛博朋克',
            author: '科技研究院',
            institution: 'Future Tech Lab',
            date: '2024'
        },
        sections: [
            {
                title: '技术趋势',
                content: [
                    { type: 'paragraph', text: '赛博朋克风格展现未来科技的无限可能...' },
                    { type: 'infoCards', cards: [
                        { title: '人工智能', desc: 'AI驱动的智能系统' },
                        { title: '虚拟现实', desc: '沉浸式体验技术' },
                        { title: '区块链', desc: '分布式信任机制' }
                    ]}
                ]
            },
            {
                title: '数据分析',
                content: [
                    { type: 'dataStats', stats: [
                        { value: '200B', label: '市场规模', highlight: true },
                        { value: '35%', label: '增长率' },
                        { value: '50+', label: '技术专利' }
                    ]}
                ]
            }
        ]
    },

    // ==========================================
    // Glassmorphism 玻璃态
    // ==========================================
    glassmorphism: {
        cover: {
            title: '产品设计文档',
            subtitle: 'Glassmorphism 玻璃态',
            author: '产品团队',
            institution: 'Modern App Co.',
            date: '2024'
        },
        sections: [
            {
                title: '产品介绍',
                content: [
                    { type: 'paragraph', text: '采用现代玻璃拟态设计，呈现通透质感...' },
                    { type: 'infoCards', cards: [
                        { title: '核心功能', desc: '智能管理、数据分析' },
                        { title: '用户价值', desc: '提升效率、优化体验' },
                        { title: '竞争优势', desc: '现代设计、技术创新' }
                    ]}
                ]
            }
        ]
    },

    // ==========================================
    // Monochrome 单色大师
    // ==========================================
    monochrome: {
        cover: {
            title: '艺术作品集',
            subtitle: 'Monochrome 单色大师',
            author: '艺术家',
            institution: 'Art Gallery',
            date: '2024'
        },
        sections: [
            {
                title: '创作理念',
                content: [
                    { type: 'paragraph', text: '纯粹单色设计，极简高雅，展现艺术的本质...' },
                    { type: 'quote', text: '艺术不是你所看到的，而是你让别人看到的', author: ' Edgar Degas' }
                ]
            }
        ]
    },

    // ==========================================
    // Gradient 渐变流
    // ==========================================
    gradient: {
        cover: {
            title: '品牌战略报告',
            subtitle: 'Gradient Flow 渐变流',
            author: '品牌团队',
            institution: 'Brand Strategy Co.',
            date: '2024'
        },
        sections: [
            {
                title: '品牌定位',
                content: [
                    { type: 'infoCards', cards: [
                        { title: '品牌愿景', desc: '成为行业领先品牌' },
                        { title: '核心价值', desc: '创新、品质、服务' },
                        { title: '目标市场', desc: '高端消费群体' }
                    ]}
                ]
            },
            {
                title: '市场分析',
                content: [
                    { type: 'dataStats', stats: [
                        { value: '85%', label: '品牌认知度' },
                        { value: '70%', label: '市场占有率' }
                    ]}
                ]
            }
        ]
    },

    // ==========================================
    // Pastel 柔和梦境
    // ==========================================
    pastel: {
        cover: {
            title: '婚礼策划方案',
            subtitle: 'Pastel 柔和梦境',
            author: '策划团队',
            institution: 'Wedding Planner',
            date: '2024'
        },
        sections: [
            {
                title: '婚礼主题',
                content: [
                    { type: 'paragraph', text: '柔和马卡龙色调，温馨浪漫，为您打造梦幻婚礼...' },
                    { type: 'infoCards', cards: [
                        { title: '婚礼风格', desc: '浪漫田园、温馨典雅' },
                        { title: '色彩搭配', desc: '粉蓝、粉紫、淡黄' },
                        { title: '婚礼流程', desc: '仪式、宴会、派对' }
                    ]}
                ]
            }
        ]
    },

    // ==========================================
    // Academic 学术蓝
    // ==========================================
    academic: {
        cover: {
            title: '学术论文',
            subtitle: 'Academic 学术蓝',
            author: '研究生',
            institution: 'XX大学',
            date: '2024年6月'
        },
        sections: [
            {
                title: '研究背景',
                content: [
                    { type: 'paragraph', text: '本研究旨在探讨...' },
                    { type: 'infoCards', cards: [
                        { title: '理论意义', desc: '填补研究空白' },
                        { title: '应用价值', desc: '解决实际问题' },
                        { title: '创新点', desc: '方法创新' }
                    ]}
                ]
            },
            {
                title: '研究方法',
                content: [
                    { type: 'methodology', steps: [
                        { title: '数据准备', desc: '数据集构建与预处理' },
                        { title: '模型设计', desc: '网络架构设计' },
                        { title: '训练策略', desc: '优化方法与超参' }
                    ]}
                ]
            },
            {
                title: '实验结果',
                content: [
                    { type: 'dataStats', stats: [
                        { value: '96.5%', label: '准确率', highlight: true },
                        { value: '0.89', label: 'F1分数' }
                    ]},
                    { type: 'table', headers: ['方法', '准确率', '参数量'], data: [
                        { method: 'ResNet-50', accuracy: '92.1%', params: '25.6M' },
                        { method: 'Ours', accuracy: '96.5%', params: '32M' }
                    ]}
                ]
            },
            {
                title: '结论与展望',
                content: [
                    { type: 'conclusion',
                      conclusions: ['提出新的研究方法', '取得显著效果提升'],
                      futureWorks: ['优化算法效率', '扩展应用领域'] }
                ]
            }
        ]
    },

    // ==========================================
    // Corporate 商务精英
    // ==========================================
    corporate: {
        cover: {
            title: '年终工作总结',
            subtitle: 'Corporate 商务精英',
            author: '张三',
            institution: 'XX公司',
            date: '2024年度'
        },
        sections: [
            {
                title: '年度概览',
                content: [
                    { type: 'dataStats', stats: [
                        { value: '120%', label: '目标达成率', highlight: true },
                        { value: '50+', label: '项目数量' },
                        { value: '98%', label: '客户满意度' }
                    ]}
                ]
            },
            {
                title: '关键业绩',
                content: [
                    { type: 'infoCards', cards: [
                        { title: '销售业绩', desc: '年度销售额增长25%' },
                        { title: '团队建设', desc: '新增核心成员5人' },
                        { title: '技术创新', desc: '专利申请3项' }
                    ]}
                ]
            },
            {
                title: '明年规划',
                content: [
                    { type: 'timeline', events: [
                        { time: 'Q1', title: '产品迭代', desc: '完成2.0版本开发' },
                        { time: 'Q2', title: '市场拓展', desc: '开拓新市场区域' },
                        { time: 'Q3', title: '团队壮大', desc: '招聘核心技术人才' },
                        { time: 'Q4', title: '业绩冲刺', desc: '完成年度目标' }
                    ]}
                ]
            }
        ]
    },

    // ==========================================
    // Tech 科技未来
    // ==========================================
    tech: {
        cover: {
            title: 'AI 产品发布',
            subtitle: 'Tech Future 科技未来',
            author: '产品团队',
            institution: 'AI Company',
            date: '2024'
        },
        sections: [
            {
                title: '痛点分析',
                content: [
                    { type: 'infoCards', cards: [
                        { title: '效率问题', desc: '传统方法耗时耗力' },
                        { title: '成本问题', desc: '人工成本持续上升' },
                        { title: '质量问题', desc: '人工操作易出错' }
                    ]}
                ]
            },
            {
                title: '解决方案',
                content: [
                    { type: 'paragraph', text: '我们的AI产品通过智能算法...' },
                    { type: 'dataStats', stats: [
                        { value: '10x', label: '效率提升', highlight: true },
                        { value: '60%', label: '成本降低' }
                    ]}
                ]
            }
        ]
    },

    // ==========================================
    // Minimal 极简主义
    // ==========================================
    minimal: {
        cover: {
            title: '设计作品集',
            subtitle: 'Minimalist 极简主义',
            author: '设计师',
            institution: 'Design Studio',
            date: '2024'
        },
        sections: [
            {
                title: '设计理念',
                content: [
                    { type: 'quote', text: '少即是多', author: 'Ludwig Mies van der Rohe' },
                    { type: 'paragraph', text: '极简主义追求纯粹、简洁的设计...' }
                ]
            }
        ]
    },

    // ==========================================
    // Nature 自然绿意
    // ==========================================
    nature: {
        cover: {
            title: '环保项目报告',
            subtitle: 'Natural Green 自然绿意',
            author: '环保团队',
            institution: 'Green Foundation',
            date: '2024'
        },
        sections: [
            {
                title: '项目使命',
                content: [
                    { type: 'paragraph', text: '致力于环境保护和可持续发展...' },
                    { type: 'infoCards', cards: [
                        { title: '减少碳排放', desc: '目标减排30%' },
                        { title: '保护生态', desc: '恢复10个生态区' },
                        { title: '公众教育', desc: '覆盖100万受众' }
                    ]}
                ]
            },
            {
                title: '年度成果',
                content: [
                    { type: 'dataStats', stats: [
                        { value: '5000吨', label: '碳排放减少' },
                        { value: '50个', label: '生态项目' }
                    ]}
                ]
            }
        ]
    },

    // ==========================================
    // Vintage 复古怀旧
    // ==========================================
    vintage: {
        cover: {
            title: '周年纪念册',
            subtitle: 'Retro 复古怀旧',
            author: '历史档案组',
            institution: 'Company History',
            date: '2024'
        },
        sections: [
            {
                title: '发展历程',
                content: [
                    { type: 'timeline', events: [
                        { time: '2000', title: '公司创立', desc: '在首都成立第一家门店' },
                        { time: '2010', title: '全国扩张', desc: '覆盖30个主要城市' },
                        { time: '2020', title: '数字化转型', desc: '建立线上平台' },
                        { time: '2024', title: '国际化', desc: '进军海外市场' }
                    ]}
                ]
            }
        ]
    },

    // ==========================================
    // Energetic 活力橙黄
    // ==========================================
    energetic: {
        cover: {
            title: '健身课程手册',
            subtitle: 'Vibrant 活力橙黄',
            author: '健身教练',
            institution: 'Fitness Center',
            date: '2024'
        },
        sections: [
            {
                title: '课程介绍',
                content: [
                    { type: 'infoCards', cards: [
                        { title: '有氧训练', desc: '提升心肺功能' },
                        { title: '力量训练', desc: '增强肌肉力量' },
                        { title: '柔韧训练', desc: '改善身体柔韧性' }
                    ]}
                ]
            },
            {
                title: '训练效果',
                content: [
                    { type: 'dataStats', stats: [
                        { value: '90%', label: '学员满意度' },
                        { value: '85%', label: '目标达成率' }
                    ]}
                ]
            }
        ]
    },

    // ==========================================
    // Medical 医疗健康
    // ==========================================
    medical: {
        cover: {
            title: '医院年度报告',
            subtitle: 'Healthcare 医疗健康',
            author: '医务处',
            institution: 'XX医院',
            date: '2024年度'
        },
        sections: [
            {
                title: '科室概况',
                content: [
                    { type: 'infoCards', cards: [
                        { title: '门诊量', desc: '年门诊量50万人次' },
                        { title: '住院量', desc: '年住院量10万人次' },
                        { title: '手术量', desc: '年手术量2万台' }
                    ]}
                ]
            },
            {
                title: '质量指标',
                content: [
                    { type: 'dataStats', stats: [
                        { value: '99.5%', label: '诊断准确率' },
                        { value: '98%', label: '治愈率' }
                    ]}
                ]
            }
        ]
    },

    // ==========================================
    // Finance 金融财经
    // ==========================================
    finance: {
        cover: {
            title: '财务年度报告',
            subtitle: 'Finance 金融财经',
            author: '财务部',
            institution: 'XX公司',
            date: '2024年度'
        },
        sections: [
            {
                title: '执行摘要',
                content: [
                    { type: 'paragraph', text: '本年度财务状况良好，各项指标均达标...' },
                    { type: 'dataStats', stats: [
                        { value: '¥1.2亿', label: '营业收入', highlight: true },
                        { value: '¥3000万', label: '净利润' }
                    ]}
                ]
            },
            {
                title: '收入分析',
                content: [
                    { type: 'table', headers: ['业务类型', '收入金额', '占比'], data: [
                        { type: '主营业务', amount: '¥8000万', ratio: '67%' },
                        { type: '其他业务', amount: '¥4000万', ratio: '33%' }
                    ]}
                ]
            }
        ]
    },

    // ==========================================
    // Chinese 中国风
    // ==========================================
    chinese: {
        cover: {
            title: '非遗传承报告',
            subtitle: 'Chinese Style 中国风',
            author: '文化研究团队',
            institution: '文化研究院',
            date: '2024'
        },
        sections: [
            {
                title: '项目背景',
                content: [
                    { type: 'paragraph', text: '传承中华优秀传统文化，弘扬非遗技艺...' },
                    { type: 'infoCards', cards: [
                        { title: '传统技艺', desc: '陶瓷、刺绣、剪纸' },
                        { title: '传承人', desc: '大师级传承人50名' },
                        { title: '创新融合', desc: '传统与现代结合' }
                    ]}
                ]
            }
        ]
    },

    // ==========================================
    // Creative 创意艺术
    // ==========================================
    creative: {
        cover: {
            title: '创意策划方案',
            subtitle: 'Creative 创意艺术',
            author: '创意团队',
            institution: 'Creative Agency',
            date: '2024'
        },
        sections: [
            {
                title: '创意理念',
                content: [
                    { type: 'quote', text: '创意是打破常规的艺术', author: 'Albert Einstein' },
                    { type: 'infoCards', cards: [
                        { title: '创意方向', desc: '突破传统思维模式' },
                        { title: '表现形式', desc: '多媒体、交互式体验' },
                        { title: '预期效果', desc: '引发关注和讨论' }
                    ]}
                ]
            }
        ]
    },

    // ==========================================
    // Corporate Standard 企业标准
    // ==========================================
    corporateStandard: {
        cover: {
            title: '企业管理规范',
            subtitle: 'Corporate 企业标准',
            author: '法务部',
            institution: 'XX公司',
            date: '2024'
        },
        sections: [
            {
                title: '文件概述',
                content: [
                    { type: 'paragraph', text: '本规范文件旨在建立企业标准化管理体系...' },
                    { type: 'infoCards', cards: [
                        { title: '管理流程', desc: '标准化审批流程' },
                        { title: '权责划分', desc: '明确各部门职责' },
                        { title: '合规要求', desc: '符合法律法规' }
                    ]}
                ]
            }
        ]
    }
};

// ==========================================
// 根据风格获取模板内容
// ==========================================
function getTemplateContent(styleName) {
    return TEMPLATE_CONTENT[styleName] || TEMPLATE_CONTENT.academic;
}

// ==========================================
// 获取所有风格名称
// ==========================================
function getAllStyleNames() {
    return Object.keys(TEMPLATE_CONTENT);
}

module.exports = {
    TEMPLATE_CONTENT,
    getTemplateContent,
    getAllStyleNames
};