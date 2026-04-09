# Skills Repository | 高质量 Skill 收录仓库

A curated collection of high-quality skills for AI agents. This repository serves as a growing library of professionally crafted skills, each meeting strict quality standards for documentation, examples, and usability.

一个精心策划的 AI 智能体技能收录仓库。本仓库是一个不断增长的优质技能库，每个收录的技能都符合严格的质量标准，包括完善的文档、示例和可用性。

---

## Vision | 愿景

This repository collects **high-quality skills** that extend AI agent capabilities across multiple domains. Each skill is:

本仓库收录**高质量技能**，扩展 AI 智能体在多个领域的能力。每个技能都经过精心设计和测试：

- ✅ **Well-documented** - Complete usage guide and examples
- ✅ **Production-ready** - Tested and validated output
- ✅ **Standardized** - Consistent naming and API design
- ✅ **Extensible** - Designed for future enhancements

---

## Table of Contents | 目录

- [Current Skills](#current-skills--当前技能)
- [Skill Categories](#skill-categories--技能分类)
- [Quality Standards](#quality-standards--质量标准)
- [Adding New Skills](#adding-new-skills--添加新技能)
- [File Structure](#file-structure--文件结构)

---

## Current Skills | 当前技能

### Batch 1: Modern Document Generation (v1.0.0)

| Skill | Category | Description | Output |
|-------|----------|-------------|--------|
| **[modern-pdf](./modern-pdf/)** | 文档生成 | Generate stunning PDF documents with 18 modern styles | PDF |
| **[modern-ppt](./modern-ppt/)** | 文档生成 | Create PowerPoint presentations with content-aware animations | PPTX |
| **[modern-word](./modern-word/)** | 文档生成 | Build professional Word documents with typography hierarchy | DOCX |
| **[modern-excel](./modern-excel/)** | 文档生成 | Design Excel spreadsheets with conditional formatting | XLSX |

**Features**:
- 18 professional styles (Aurora, Cyberpunk, Glassmorphism, etc.)
- Unified design system across all tools
- 7-level typography hierarchy
- Modern asymmetric layouts

---

## Skill Categories | 技能分类

### By Domain | 按功能领域

| Category | Description | Example Skills |
|----------|-------------|----------------|
| **文档生成** | Professional document creation | modern-pdf, modern-ppt, modern-word, modern-excel |
| **开发工具** | Developer productivity tools | _Coming soon_ |
| **创意写作** | Creative writing & storytelling | _Coming soon_ |
| **数据分析** | Data analysis & visualization | _Coming soon_ |
| **营销运营** | Marketing & operations | _Coming soon_ |
| **学习研究** | Learning & research assistance | _Coming soon_ |

### By Scenario | 按使用场景

| Scenario | Skills |
|----------|--------|
| **工作报告** | modern-ppt, modern-excel, modern-word |
| **学术答辩** | modern-pdf, modern-ppt |
| **创意展示** | modern-pdf, modern-ppt |
| **数据分析** | modern-excel |

### By Type | 按技能类型

| Type | Description | Example |
|------|-------------|---------|
| **工具型** | Execute specific tasks | modern-pdf (generate PDF) |
| **策略型** | Provide strategic guidance | _Coming soon_ |
| **创作型** | Creative content generation | modern-ppt, modern-word |
| **分析型** | Data analysis & insights | modern-excel |

---

## Quality Standards | 质量标准

Every skill in this repository must meet the following standards:

### Documentation | 文档要求

- ✅ **SKILL.md** - Complete skill documentation with usage examples
- ✅ **README section** - Listed in main README with description
- ✅ **API reference** - Clear function/method signatures
- ✅ **Style guide** - Consistent naming and code style

### Examples | 示例要求

- ✅ **Code examples** - Multiple usage examples in SKILL.md
- ✅ **Output samples** - Generated output files or screenshots
- ✅ **Edge cases** - Examples covering common edge cases

### Naming Convention | 命名规范

```
Skill naming follows kebab-case pattern:
- modern-pdf      ✅
- modern_ppt      ❌ (snake_case)
- ModernPPT       ❌ (PascalCase)
- modernPPT       ❌ (camelCase)

Directory structure:
skills/
├── skill-name/
│   ├── SKILL.md       # Required
│   ├── README.md      # Optional (for complex skills)
│   ├── INSTALL.md     # Optional (if special setup needed)
│   ├── scripts/       # Implementation files
│   ├── assets/        # Resources (fonts, templates, etc.)
│   └── output/        # Generated examples (optional)
```

### API Design | API 设计规范

```javascript
// Consistent pattern across all skills
const { SkillName } = require('./scripts/skill-name-main');
const generator = new SkillName('style-name');
generator.method('content');
generator.save('output.ext');
```

---

## Adding New Skills | 添加新技能

### Submission Process | 提交流程

1. **Create skill directory**
   ```bash
   mkdir -p skills/your-skill-name
   ```

2. **Add required files**
   - `SKILL.md` - Main documentation (required)
   - `scripts/` - Implementation code
   - `output/` - Example outputs (recommended)

3. **Update README.md**
   - Add skill to "Current Skills" table
   - Categorize appropriately

4. **Test thoroughly**
   - Verify all examples work
   - Include output samples

5. **Commit with conventional message**
   ```bash
   git add skills/your-skill-name
   git commit -m "feat: add your-skill-name v1.0.0"
   ```

### PR Checklist | 提交检查清单

Before submitting a new skill, ensure:

- [ ] SKILL.md follows the standard format
- [ ] Code examples are tested and working
- [ ] Output samples are included
- [ ] Naming follows kebab-case convention
- [ ] API design is consistent with existing skills
- [ ] Added to README.md "Current Skills" table
- [ ] Categorized in appropriate sections

---

## File Structure | 文件结构

```
skills/
├── README.md                    # This file - main documentation
├── .gitignore                   # Git ignore rules
│
├── modern-pdf/                  # Skill: PDF generation
│   ├── SKILL.md                 # Skill documentation
│   ├── INSTALL.md               # Installation guide
│   ├── scripts/                 # Implementation
│   │   ├── style-library.js     # Style definitions
│   │   ├── modern-pdf-ultimate.js
│   │   └── ...
│   └── output/                  # Generated examples
│       └── test/
│           └── *.pdf
│
├── modern-ppt/                  # Skill: PPT generation
│   ├── SKILL.md
│   ├── scripts/
│   └── output/
│
├── modern-word/                 # Skill: Word generation
│   ├── SKILL.md
│   ├── scripts/
│   └── output/
│
├── modern-excel/                # Skill: Excel generation
│   ├── SKILL.md
│   ├── scripts/
│   └── output/
│
└── [future-skill-1]/            # Future skills...
└── [future-skill-2]/
└── ...
```

---

## Version History | 版本历史

| Version | Date | Skills Added | Notes |
|---------|------|--------------|-------|
| 1.0.0 | 2026-04-09 | modern-pdf, modern-ppt, modern-word, modern-excel | Initial release - Modern document generation suite |

---

## License | 许可证

MIT License

---

## Credits | 来源

This skills repository is part of the **Claude Studio** project.

本技能仓库是 **Claude Studio** 项目的一部分。

- **Source**: [Claude Studio](https://github.com/hailinbling/claude-studio)
- **Author**: Hailin
- **Created**: 2026-04-09

---

## Contact | 联系

For questions or contributions, please open an issue on GitHub.

如有问题或贡献，请在 GitHub 上提交 issue。

---

<div align="center">

**Built with ❤️ for the AI agent community**

**为 AI 智能体社区构建**

</div>
