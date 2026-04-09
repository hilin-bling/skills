#!/usr/bin/env python3
"""
Style Detector - Analyze content and determine appropriate presentation style.

Usage:
    python style_detector.py "content text here"
    python style_detector.py --file document.md
"""

import re
import argparse
import json
from typing import Dict, List, Tuple

# Style indicator keywords
STYLE_KEYWORDS = {
    'academic': [
        # Chinese
        '研究', '方法', '文献', '论文', '学术', '理论', '实验', '分析', '结论',
        '参考文献', '摘要', '关键词', '引言', '综述', '假设', '验证',
        # English
        'research', 'methodology', 'abstract', 'literature', 'citation', 'hypothesis',
        'empirical', 'theoretical', 'findings', 'conclusion', 'study', 'analysis'
    ],
    'technical': [
        # Chinese
        '代码', '架构', 'API', '系统', '实现', '函数', '接口', '算法', '性能',
        '技术', '开发', '部署', '配置', '框架', '模块', '组件', '数据库',
        # English
        'code', 'API', 'architecture', 'function', 'implementation', 'system',
        'algorithm', 'performance', 'framework', 'module', 'database', 'deployment',
        'infrastructure', 'backend', 'frontend', 'git', 'docker', 'kubernetes'
    ],
    'report': [
        # Chinese
        '季度', '报告', 'KPI', '指标', '增长', '分析', '预算', '目标', '完成',
        '数据', '统计', '趋势', '对比', '营收', '利润', '市场', '用户',
        # English
        'quarterly', 'report', 'KPI', 'metric', 'growth', 'analysis', 'budget',
        'revenue', 'profit', 'market', 'performance', 'dashboard', 'analytics',
        'stakeholder', 'executive', 'summary', 'benchmark'
    ],
    'creative': [
        # Chinese
        '品牌', '产品', '营销', '故事', '创意', '设计', '视觉', '体验', '用户',
        '市场', '推广', '宣传', '活动', '发布', '介绍', '展示', '亮点',
        # English
        'brand', 'product', 'launch', 'marketing', 'story', 'creative', 'design',
        'experience', 'campaign', 'audience', 'engagement', 'visual', 'impact',
        'innovation', 'feature', 'showcase', 'reveal'
    ],
    'minimal': [
        # Simple, focused content
        '简介', '介绍', '概述', '要点', '关键', '核心', '重点',
        'introduction', 'overview', 'key', 'main', 'focus', 'summary', 'highlights'
    ]
}

# Style-specific color palettes
COLOR_PALETTES = {
    'academic': {
        'primary': '1A365D',
        'secondary': '2D3748',
        'accent': '3182CE',
        'background': 'FFFFFF',
        'text': '1A202C',
        'gradient': ['1A365D', '2D3748']
    },
    'technical': {
        'primary': '0F172A',
        'secondary': '1E293B',
        'accent': '22D3EE',
        'accent2': 'A855F7',
        'background': '0F172A',
        'text': 'E2E8F0',
        'gradient': ['0F172A', '1E293B', '0F172A']
    },
    'report': {
        'primary': '1E3A5F',
        'secondary': '2E5077',
        'accent': 'F59E0B',
        'background': 'F7F9FC',
        'text': '1E293B',
        'gradient': ['1E3A5F', '2E5077']
    },
    'minimal': {
        'primary': '18181B',
        'secondary': '71717A',
        'accent': '2563EB',
        'background': 'FFFFFF',
        'text': '09090B',
        'gradient': ['18181B', '3F3F46']
    },
    'creative': {
        'primary': '7C3AED',
        'secondary': 'EC4899',
        'accent': 'F59E0B',
        'background': 'FAFAFA',
        'text': '1F2937',
        'gradient': ['7C3AED', 'EC4899']
    }
}

# Style-specific animation configurations
ANIMATION_CONFIGS = {
    'academic': {
        'entrance': {'type': 'fade', 'duration': 500},
        'emphasis': {'type': 'pulse', 'duration': 800},
        'transition': {'type': 'fade'},
        'stagger_delay': 200
    },
    'technical': {
        'entrance': {'type': 'fly_in', 'duration': 400, 'direction': 'left'},
        'emphasis': {'type': 'grow', 'duration': 600},
        'transition': {'type': 'push', 'direction': 'l'},
        'stagger_delay': 150
    },
    'report': {
        'entrance': {'type': 'fade', 'duration': 400},
        'emphasis': {'type': 'pulse', 'duration': 600},
        'transition': {'type': 'wipe', 'direction': 'r'},
        'stagger_delay': 180
    },
    'minimal': {
        'entrance': {'type': 'fade', 'duration': 600},
        'emphasis': None,
        'transition': {'type': 'fade'},
        'stagger_delay': 250
    },
    'creative': {
        'entrance': {'type': 'zoom', 'duration': 500},
        'emphasis': {'type': 'bounce', 'duration': 800},
        'transition': {'type': 'zoom', 'direction': 'in'},
        'stagger_delay': 120
    }
}


def count_keywords(content: str, keywords: List[str]) -> int:
    """Count occurrences of keywords in content."""
    content_lower = content.lower()
    count = 0
    for keyword in keywords:
        # Case-insensitive search
        pattern = re.compile(re.escape(keyword.lower()))
        matches = pattern.findall(content_lower)
        count += len(matches)
    return count


def detect_style(content: str) -> Tuple[str, Dict[str, int]]:
    """
    Detect the most appropriate presentation style for the content.

    Returns:
        Tuple of (style_name, scores_dict)
    """
    scores = {}

    for style, keywords in STYLE_KEYWORDS.items():
        scores[style] = count_keywords(content, keywords)

    # Get style with highest score
    max_style = max(scores, key=scores.get)

    # If no clear winner, default to minimal
    if scores[max_style] < 2:
        return 'minimal', scores

    return max_style, scores


def get_palette(style: str) -> Dict[str, str]:
    """Get color palette for a style."""
    return COLOR_PALETTES.get(style, COLOR_PALETTES['minimal'])


def get_animations(style: str) -> Dict:
    """Get animation configuration for a style."""
    return ANIMATION_CONFIGS.get(style, ANIMATION_CONFIGS['minimal'])


def analyze_structure(content: str) -> Dict:
    """
    Analyze content structure to suggest slide breakdown.

    Returns:
        Dict with slide count estimate and section suggestions
    """
    lines = content.strip().split('\n')

    # Count headers (markdown style)
    headers = [l for l in lines if l.startswith('#')]

    # Estimate slide count
    # Typically 1 slide per major section + title + closing
    major_headers = [h for h in headers if h.startswith('# ') or h.startswith('## ')]
    estimated_slides = len(major_headers) + 2  # +2 for title and closing

    # Detect content types
    has_numbers = bool(re.search(r'\d+[\.\,]\d+|\d+%', content))
    has_lists = bool(re.search(r'^[\*\-\+]\s', content, re.MULTILINE))
    has_code = bool(re.search(r'```|`[^`]+`', content))

    return {
        'estimated_slides': min(max(estimated_slides, 5), 20),
        'sections': len(major_headers),
        'has_data': has_numbers,
        'has_lists': has_lists,
        'has_code': has_code
    }


def main():
    parser = argparse.ArgumentParser(description='Detect presentation style from content')
    parser.add_argument('content', nargs='?', help='Content text to analyze')
    parser.add_argument('--file', '-f', help='Read content from file')
    parser.add_argument('--json', '-j', action='store_true', help='Output as JSON')

    args = parser.parse_args()

    # Get content
    if args.file:
        with open(args.file, 'r', encoding='utf-8') as f:
            content = f.read()
    elif args.content:
        content = args.content
    else:
        parser.error('Either content or --file must be provided')

    # Analyze
    style, scores = detect_style(content)
    palette = get_palette(style)
    animations = get_animations(style)
    structure = analyze_structure(content)

    result = {
        'style': style,
        'scores': scores,
        'palette': palette,
        'animations': animations,
        'structure': structure
    }

    if args.json:
        print(json.dumps(result, indent=2, ensure_ascii=False))
    else:
        print(f"Detected Style: {style}")
        print(f"\nScores:")
        for s, score in sorted(scores.items(), key=lambda x: -x[1]):
            print(f"  {s}: {score}")
        print(f"\nRecommended Palette:")
        for key, value in palette.items():
            print(f"  {key}: #{value}")
        print(f"\nStructure Analysis:")
        print(f"  Estimated slides: {structure['estimated_slides']}")
        print(f"  Sections: {structure['sections']}")
        print(f"  Contains data: {structure['has_data']}")
        print(f"  Contains lists: {structure['has_lists']}")
        print(f"  Contains code: {structure['has_code']}")


if __name__ == '__main__':
    main()