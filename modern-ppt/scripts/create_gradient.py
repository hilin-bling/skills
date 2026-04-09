#!/usr/bin/env python3
"""
Create gradient background images for PowerPoint presentations.

Usage:
    python create_gradient.py --output gradient.png --width 1920 --height 1080
    python create_gradient.py --preset tech-dark --output bg.png
    python create_gradient.py --colors "#0F172A" "#1E293B" --output custom.png

This script generates gradient PNG images suitable for use as slide backgrounds.
"""

import argparse
import os
import sys

try:
    from PIL import Image, ImageDraw
except ImportError:
    print("Installing Pillow...")
    import subprocess
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'Pillow', '-q'])
    from PIL import Image, ImageDraw


# Preset color palettes
PRESETS = {
    'tech-dark': {
        'colors': ['#0F172A', '#1E293B'],
        'direction': 'diagonal'
    },
    'tech-blue': {
        'colors': ['#0F172A', '#1E3A5F', '#3B82F6'],
        'direction': 'diagonal'
    },
    'minimal-light': {
        'colors': ['#FFFFFF', '#F8FAFC', '#E2E8F0'],
        'direction': 'vertical'
    },
    'premium-gold': {
        'colors': ['#0F0F1A', '#1A1A2E', '#16213E'],
        'direction': 'diagonal'
    },
    'corporate-blue': {
        'colors': ['#1E3A5F', '#2E5077', '#F7F9FC'],
        'direction': 'horizontal'
    },
    'startup-vibrant': {
        'colors': ['#6366F1', '#8B5CF6', '#A855F7'],
        'direction': 'diagonal'
    },
    'nature-fresh': {
        'colors': ['#059669', '#10B981', '#34D399'],
        'direction': 'diagonal'
    },
    'luxury-dark': {
        'colors': ['#09090B', '#18181B', '#27272A'],
        'direction': 'vertical'
    },
    'sunset': {
        'colors': ['#F59E0B', '#EF4444', '#7C3AED'],
        'direction': 'horizontal'
    },
    'ocean': {
        'colors': ['#0EA5E9', '#0284C7', '#0369A1'],
        'direction': 'diagonal'
    },
    'midnight': {
        'colors': ['#1E1B4B', '#312E81', '#4338CA'],
        'direction': 'diagonal'
    },
    'forest': {
        'colors': ['#052E16', '#14532D', '#166534'],
        'direction': 'diagonal'
    },
    'fire': {
        'colors': ['#7C2D12', '#C2410C', '#EA580C', '#F97316'],
        'direction': 'vertical'
    },
    'aurora': {
        'colors': ['#0F766E', '#0D9488', '#14B8A6', '#2DD4BF'],
        'direction': 'diagonal'
    },
    'neon': {
        'colors': ['#7C3AED', '#EC4899', '#F43F5E'],
        'direction': 'horizontal'
    },
}


def hex_to_rgb(hex_color: str) -> tuple:
    """Convert hex color to RGB tuple."""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))


def interpolate_color(color1: tuple, color2: tuple, factor: float) -> tuple:
    """Interpolate between two colors."""
    return tuple(int(c1 + (c2 - c1) * factor) for c1, c2 in zip(color1, color2))


def create_gradient(width: int, height: int, colors: list, direction: str = 'horizontal') -> Image.Image:
    """
    Create a gradient image.

    Args:
        width: Image width in pixels
        height: Image height in pixels
        colors: List of hex color strings
        direction: Gradient direction (horizontal, vertical, diagonal, radial)

    Returns:
        PIL Image object
    """
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
                # Diagonal from top-left to bottom-right
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


def create_gradient_svg(width: int, height: int, colors: list, direction: str = 'diagonal') -> str:
    """
    Create an SVG string for a gradient (useful for sharp/browser rendering).

    Args:
        width: Image width
        height: Image height
        colors: List of hex color strings
        direction: Gradient direction

    Returns:
        SVG string
    """
    # Determine gradient coordinates based on direction
    if direction == 'horizontal':
        x1, y1, x2, y2 = '0%', '0%', '100%', '0%'
    elif direction == 'vertical':
        x1, y1, x2, y2 = '0%', '0%', '0%', '100%'
    elif direction == 'diagonal':
        x1, y1, x2, y2 = '0%', '0%', '100%', '100%'
    else:
        x1, y1, x2, y2 = '0%', '0%', '100%', '100%'

    # Create stop elements
    stops = []
    for i, color in enumerate(colors):
        offset = (i / (len(colors) - 1)) * 100
        stops.append(f'<stop offset="{offset:.1f}%" style="stop-color:{color}"/>')

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}">
  <defs>
    <linearGradient id="gradient" x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}">
      {''.join(stops)}
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#gradient)"/>
</svg>'''

    return svg


def list_presets():
    """Print available presets."""
    print("Available gradient presets:")
    print("-" * 40)
    for name, config in PRESETS.items():
        colors_str = ' -> '.join(config['colors'])
        print(f"  {name}:")
        print(f"    Colors: {colors_str}")
        print(f"    Direction: {config['direction']}")
        print()


def main():
    parser = argparse.ArgumentParser(description='Create gradient background images')
    parser.add_argument('--output', '-o', default='gradient.png', help='Output file path')
    parser.add_argument('--width', '-W', type=int, default=1920, help='Image width (default: 1920)')
    parser.add_argument('--height', '-H', type=int, default=1080, help='Image height (default: 1080)')
    parser.add_argument('--preset', '-p', choices=list(PRESETS.keys()), help='Use a preset gradient')
    parser.add_argument('--colors', '-c', nargs='+', help='Custom colors (hex format, e.g., #0F172A)')
    parser.add_argument('--direction', '-d',
                        choices=['horizontal', 'vertical', 'diagonal', 'radial'],
                        default='diagonal',
                        help='Gradient direction')
    parser.add_argument('--svg', action='store_true', help='Output as SVG instead of PNG')
    parser.add_argument('--list-presets', action='store_true', help='List available presets')

    args = parser.parse_args()

    if args.list_presets:
        list_presets()
        return

    # Determine colors
    if args.preset:
        preset = PRESETS[args.preset]
        colors = preset['colors']
        direction = preset['direction']
    elif args.colors:
        colors = args.colors
        direction = args.direction
    else:
        # Default gradient
        colors = ['#0F172A', '#1E293B']
        direction = 'diagonal'

    # Create output
    if args.svg:
        svg_content = create_gradient_svg(args.width, args.height, colors, direction)
        output_path = args.output if args.output.endswith('.svg') else args.output.replace('.png', '.svg')
        with open(output_path, 'w') as f:
            f.write(svg_content)
        print(f"Created SVG: {output_path}")
    else:
        img = create_gradient(args.width, args.height, colors, direction)
        img.save(args.output, 'PNG', optimize=True)
        print(f"Created PNG: {args.output} ({args.width}x{args.height})")


if __name__ == '__main__':
    main()