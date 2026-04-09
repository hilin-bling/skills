#!/usr/bin/env python3
"""
Gradient Creator - Generate gradient background images for presentations.

Usage:
    python gradient_creator.py --style creative --output gradient.png
    python gradient_creator.py --list
    python gradient_creator.py --random --output random-bg.png
"""

import argparse
import os
import sys
from pathlib import Path

try:
    from PIL import Image, ImageDraw
except ImportError:
    print("Installing Pillow...")
    import subprocess
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'Pillow', '-q'])
    from PIL import Image, ImageDraw

# Pre-defined gradient palettes
GRADIENTS = {
    # By style
    'academic-navy': {
        'colors': ['#1A365D', '#2D3748', '#1A365D'],
        'direction': 'diagonal'
    },
    'technical-dark': {
        'colors': ['#0F172A', '#1E293B', '#0F172A'],
        'direction': 'diagonal'
    },
    'technical-cyber': {
        'colors': ['#0F172A', '#22D3EE', '#0F172A'],
        'direction': 'horizontal'
    },
    'report-corporate': {
        'colors': ['#1E3A5F', '#2E5077'],
        'direction': 'diagonal'
    },
    'minimal-gray': {
        'colors': ['#FFFFFF', '#F8FAFC', '#E2E8F0'],
        'direction': 'vertical'
    },
    'minimal-dark': {
        'colors': ['#18181B', '#27272A', '#3F3F46'],
        'direction': 'diagonal'
    },
    'creative-aurora': {
        'colors': ['#7C3AED', '#EC4899', '#F59E0B'],
        'direction': 'diagonal'
    },
    'creative-sunset': {
        'colors': ['#F59E0B', '#EF4444', '#7C3AED'],
        'direction': 'horizontal'
    },
    'creative-ocean': {
        'colors': ['#0EA5E9', '#0284C7', '#0369A1'],
        'direction': 'diagonal'
    },
    'creative-forest': {
        'colors': ['#059669', '#10B981', '#34D399'],
        'direction': 'diagonal'
    },
    # Fashion gradients
    'glassmorphism': {
        'colors': ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)'],
        'direction': 'diagonal',
        'transparent': True
    },
    'neon-purple': {
        'colors': ['#7C3AED', '#A855F7', '#C084FC'],
        'direction': 'diagonal'
    },
    'neon-cyan': {
        'colors': ['#06B6D4', '#22D3EE', '#67E8F9'],
        'direction': 'diagonal'
    },
    'mesh-1': {
        'colors': ['#7C3AED', '#EC4899', '#F59E0B', '#22D3EE'],
        'direction': 'radial'
    },
    'mesh-2': {
        'colors': ['#0F172A', '#1E293B', '#22D3EE', '#A855F7'],
        'direction': 'radial'
    }
}


def hex_to_rgb(hex_color: str) -> tuple:
    """Convert hex color to RGB tuple."""
    hex_color = hex_color.lstrip('#')
    if hex_color.startswith('rgba'):
        # Handle rgba format
        import re
        match = re.match(r'rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)', hex_color)
        if match:
            return tuple(int(match.group(i)) for i in range(1, 4))
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))


def interpolate_color(color1: tuple, color2: tuple, factor: float) -> tuple:
    """Interpolate between two colors."""
    return tuple(int(c1 + (c2 - c1) * factor) for c1, c2 in zip(color1, color2))


def create_gradient(
    width: int,
    height: int,
    colors: list,
    direction: str = 'horizontal'
) -> Image.Image:
    """Create a gradient image."""
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)

    rgb_colors = [hex_to_rgb(c) for c in colors]

    if direction == 'horizontal':
        for x in range(width):
            factor = x / width
            segment = factor * (len(rgb_colors) - 1)
            idx = int(segment)
            local_factor = segment - idx
            if idx >= len(rgb_colors) - 1:
                color = rgb_colors[-1]
            else:
                color = interpolate_color(rgb_colors[idx], rgb_colors[idx + 1], local_factor)
            draw.line([(x, 0), (x, height)], fill=color)

    elif direction == 'vertical':
        for y in range(height):
            factor = y / height
            segment = factor * (len(rgb_colors) - 1)
            idx = int(segment)
            local_factor = segment - idx
            if idx >= len(rgb_colors) - 1:
                color = rgb_colors[-1]
            else:
                color = interpolate_color(rgb_colors[idx], rgb_colors[idx + 1], local_factor)
            draw.line([(0, y), (width, y)], fill=color)

    elif direction == 'diagonal':
        for x in range(width):
            for y in range(height):
                factor = (x + y) / (width + height)
                segment = factor * (len(rgb_colors) - 1)
                idx = int(segment)
                local_factor = segment - idx
                if idx >= len(rgb_colors) - 1:
                    color = rgb_colors[-1]
                else:
                    color = interpolate_color(rgb_colors[idx], rgb_colors[idx + 1], local_factor)
                img.putpixel((x, y), color)

    elif direction == 'radial':
        center_x, center_y = width // 2, height // 2
        max_dist = ((width ** 2 + height ** 2) ** 0.5) / 2
        for x in range(width):
            for y in range(height):
                dist = ((x - center_x) ** 2 + (y - center_y) ** 2) ** 0.5
                factor = min(1.0, dist / max_dist)
                segment = factor * (len(rgb_colors) - 1)
                idx = int(segment)
                local_factor = segment - idx
                if idx >= len(rgb_colors) - 1:
                    color = rgb_colors[-1]
                else:
                    color = interpolate_color(rgb_colors[idx], rgb_colors[idx + 1], local_factor)
                img.putpixel((x, y), color)

    return img


def create_svg_gradient(
    width: int,
    height: int,
    colors: list,
    direction: str = 'diagonal'
) -> str:
    """Create SVG string for a gradient."""
    direction_coords = {
        'horizontal': ('0%', '0%', '100%', '0%'),
        'vertical': ('0%', '0%', '0%', '100%'),
        'diagonal': ('0%', '0%', '100%', '100%'),
        'radial': None
    }

    x1, y1, x2, y2 = direction_coords.get(direction, ('0%', '0%', '100%', '100%'))

    stops = []
    for i, color in enumerate(colors):
        offset = (i / (len(colors) - 1)) * 100
        stops.append(f'<stop offset="{offset:.1f}%" style="stop-color:{color}"/>')

    if direction == 'radial':
        gradient_def = f'''<radialGradient id="g" cx="50%" cy="50%" r="70%">
      {''.join(stops)}
    </radialGradient>'''
    else:
        gradient_def = f'''<linearGradient id="g" x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}">
      {''.join(stops)}
    </linearGradient>'''

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}">
  <defs>
    {gradient_def}
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
</svg>'''

    return svg


def list_gradients():
    """Print available gradients."""
    print("Available gradient presets:")
    print("-" * 50)
    for name, config in GRADIENTS.items():
        colors_str = ' → '.join(config['colors'])
        print(f"  {name}:")
        print(f"    Colors: {colors_str}")
        print(f"    Direction: {config['direction']}")
        print()


def main():
    parser = argparse.ArgumentParser(description='Create gradient backgrounds')
    parser.add_argument('--output', '-o', default='gradient.png', help='Output file path')
    parser.add_argument('--width', '-W', type=int, default=1920, help='Width (default: 1920)')
    parser.add_argument('--height', '-H', type=int, default=1080, help='Height (default: 1080)')
    parser.add_argument('--style', '-s', choices=list(GRADIENTS.keys()), help='Gradient style')
    parser.add_argument('--colors', '-c', nargs='+', help='Custom colors (hex format)')
    parser.add_argument('--direction', '-d',
                        choices=['horizontal', 'vertical', 'diagonal', 'radial'],
                        default='diagonal', help='Gradient direction')
    parser.add_argument('--svg', action='store_true', help='Output as SVG')
    parser.add_argument('--list', '-l', action='store_true', help='List available gradients')
    parser.add_argument('--random', '-r', action='store_true', help='Random gradient')

    args = parser.parse_args()

    if args.list:
        list_gradients()
        return

    # Determine colors
    if args.style:
        config = GRADIENTS[args.style]
        colors = config['colors']
        direction = config['direction']
    elif args.random:
        import random
        style = random.choice(list(GRADIENTS.keys()))
        config = GRADIENTS[style]
        colors = config['colors']
        direction = config['direction']
        print(f"Random style: {style}")
    elif args.colors:
        colors = args.colors
        direction = args.direction
    else:
        colors = ['#7C3AED', '#EC4899', '#F59E0B']
        direction = 'diagonal'

    # Create output
    if args.svg:
        svg = create_svg_gradient(args.width, args.height, colors, direction)
        output = args.output if args.output.endswith('.svg') else args.output.replace('.png', '.svg')
        with open(output, 'w') as f:
            f.write(svg)
        print(f"Created SVG: {output}")
    else:
        img = create_gradient(args.width, args.height, colors, direction)
        img.save(args.output, 'PNG', optimize=True)
        print(f"Created PNG: {args.output} ({args.width}x{args.height})")


if __name__ == '__main__':
    main()