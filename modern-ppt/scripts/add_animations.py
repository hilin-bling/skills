#!/usr/bin/env python3
"""
Add animations to PowerPoint presentations.

Usage:
    python add_animations.py input.pptx output.pptx --animation fade --duration 500

This script unpacks a PPTX file, adds animation timing XML to slides,
and repacks the file.
"""

import argparse
import zipfile
import os
import shutil
import xml.etree.ElementTree as ET
from pathlib import Path

# XML namespaces
NS = {
    'p': 'http://schemas.openxmlformats.org/presentationml/2006/main',
    'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
    'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
}

# Register namespaces to avoid ns0 prefix
for prefix, uri in NS.items():
    ET.register_namespace(prefix, uri)
ET.register_namespace('', 'http://schemas.openxmlformats.org/presentationml/2006/main')


ANIMATION_PRESETS = {
    # Entrance animations
    'appear': {'id': 1, 'class': 'entr', 'subtype': 0},
    'fly-in': {'id': 2, 'class': 'entr', 'subtype': 0},
    'float-in': {'id': 6, 'class': 'entr', 'subtype': 0},
    'fade': {'id': 10, 'class': 'entr', 'subtype': 0},
    'zoom': {'id': 13, 'class': 'entr', 'subtype': 0},
    'bounce': {'id': 15, 'class': 'entr', 'subtype': 0},
    # Emphasis animations
    'pulse': {'id': 1, 'class': 'emph', 'subtype': 0},
    'spin': {'id': 4, 'class': 'emph', 'subtype': 0},
    'grow': {'id': 5, 'class': 'emph', 'subtype': 0},
    # Exit animations
    'fade-out': {'id': 10, 'class': 'exit', 'subtype': 0},
    'zoom-out': {'id': 13, 'class': 'exit', 'subtype': 0},
    'fly-out': {'id': 2, 'class': 'exit', 'subtype': 2},
}


def create_animation_timing(shape_id: int, animation_type: str, duration: int = 500, delay: int = 0) -> str:
    """
    Create animation timing XML for a shape.

    Args:
        shape_id: The shape ID (spid) to animate
        animation_type: Animation preset name (fade, zoom, etc.)
        duration: Animation duration in milliseconds
        delay: Delay before animation starts in milliseconds

    Returns:
        XML string for the timing element
    """
    preset = ANIMATION_PRESETS.get(animation_type, ANIMATION_PRESETS['fade'])
    preset_id = preset['id']
    preset_class = preset['class']
    subtype = preset['subtype']

    timing_xml = f'''<p:timing xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:tnLst>
    <p:par>
      <p:cTn id="1" dur="indefinite" restart="never" nodeType="tmRoot">
        <p:childTnLst>
          <p:seq concurrent="1" nextAc="seek">
            <p:cTn id="2" dur="indefinite" nodeType="mainSeq">
              <p:childTnLst>
                <p:par>
                  <p:cTn id="3" fill="hold">
                    <p:stCondLst>
                      <p:cond delay="{delay}"/>
                    </p:stCondLst>
                    <p:childTnLst>
                      <p:par>
                        <p:cTn id="4" fill="hold">
                          <p:stCondLst>
                            <p:cond delay="0"/>
                          </p:stCondLst>
                          <p:childTnLst>
                            <p:par>
                              <p:cTn id="5" presetID="{preset_id}" presetClass="{preset_class}" presetSubtype="{subtype}" fill="hold" nodeType="clickEffect">
                                <p:stCondLst>
                                  <p:cond delay="0"/>
                                </p:stCondLst>
                                <p:childTnLst>
                                  <p:set>
                                    <p:cBhvr>
                                      <p:cTn id="6" dur="1" fill="hold">
                                        <p:stCondLst>
                                          <p:cond delay="0"/>
                                        </p:stCondLst>
                                      </p:cTn>
                                      <p:tgtEl>
                                        <p:spTgt spid="{shape_id}"/>
                                      </p:tgtEl>
                                      <p:attrNameLst>
                                        <p:attrName>style.visibility</p:attrName>
                                      </p:attrNameLst>
                                    </p:cBhvr>
                                    <p:to>
                                      <p:strVal val="visible"/>
                                    </p:to>
                                  </p:set>
                                  <p:anim calcmode="lin" valueType="num">
                                    <p:cBhvr additive="base">
                                      <p:cTn id="7" dur="{duration}" fill="hold"/>
                                      <p:tgtEl>
                                        <p:spTgt spid="{shape_id}"/>
                                      </p:tgtEl>
                                      <p:attrNameLst>
                                        <p:attrName>ppt_x</p:attrName>
                                      </p:attrNameLst>
                                    </p:cBhvr>
                                    <p:tavLst>
                                      <p:tav tm="0">
                                        <p:val>
                                          <p:strVal val="#ppt_x"/>
                                        </p:val>
                                      </p:tav>
                                      <p:tav tm="100000">
                                        <p:val>
                                          <p:strVal val="#ppt_x"/>
                                        </p:val>
                                      </p:tav>
                                    </p:tavLst>
                                  </p:anim>
                                </p:childTnLst>
                              </p:cTn>
                            </p:par>
                          </p:childTnLst>
                        </p:cTn>
                      </p:par>
                    </p:childTnLst>
                  </p:cTn>
                </p:par>
              </p:childTnLst>
            </p:cTn>
          </p:seq>
        </p:childTnLst>
      </p:cTn>
    </p:par>
  </p:tnLst>
</p:timing>'''

    return timing_xml


def get_shape_ids_from_slide(slide_xml_path: str) -> list:
    """Extract all shape IDs from a slide XML file."""
    tree = ET.parse(slide_xml_path)
    root = tree.getroot()

    shape_ids = []
    for sp in root.iter('{http://schemas.openxmlformats.org/presentationml/2006/main}sp'):
        nvSpPr = sp.find('.//p:nvSpPr', NS)
        if nvSpPr is not None:
            cNvPr = nvSpPr.find('.//p:cNvPr', NS)
            if cNvPr is not None:
                shape_id = cNvPr.get('id')
                if shape_id:
                    shape_ids.append(int(shape_id))

    return shape_ids


def add_transition_to_slide(slide_xml_path: str, transition_type: str = 'fade', speed: str = 'fast'):
    """
    Add a slide transition to the slide XML.

    Args:
        slide_xml_path: Path to the slide XML file
        transition_type: Transition type (fade, push, wipe, zoom, etc.)
        speed: Transition speed (slow, med, fast)
    """
    tree = ET.parse(slide_xml_path)
    root = tree.getroot()

    # Remove existing transition
    for transition in root.findall('.//p:transition', NS):
        root.remove(transition)

    # Create new transition element
    transition = ET.Element('{http://schemas.openxmlformats.org/presentationml/2006/main}transition')
    transition.set('spd', speed)
    transition.set('advClick', 'true')

    # Add transition type element
    transition_elem = ET.SubElement(transition,
        '{http://schemas.openxmlformats.org/presentationml/2006/main}' + transition_type)

    # Insert transition before timing (if exists) or at end before cSld
    cSld = root.find('.//p:cSld', NS)
    if cSld is not None:
        cSld_index = list(root).index(cSld)
        root.insert(cSld_index + 1, transition)
    else:
        root.append(transition)

    tree.write(slide_xml_path, xml_declaration=True, encoding='UTF-8')


def add_animations_to_pptx(input_path: str, output_path: str,
                           animation_type: str = 'fade',
                           transition_type: str = None,
                           duration: int = 500):
    """
    Add animations to a PowerPoint file.

    Args:
        input_path: Path to input PPTX file
        output_path: Path to output PPTX file
        animation_type: Animation preset to apply
        transition_type: Optional transition to add
        duration: Animation duration in milliseconds
    """
    extract_dir = Path(input_path).stem + '_extracted'

    # Unpack PPTX
    os.makedirs(extract_dir, exist_ok=True)
    with zipfile.ZipFile(input_path, 'r') as zip_ref:
        zip_ref.extractall(extract_dir)

    # Process each slide
    slides_dir = Path(extract_dir) / 'ppt' / 'slides'
    if slides_dir.exists():
        for slide_file in sorted(slides_dir.glob('slide*.xml')):
            print(f"Processing {slide_file.name}...")

            # Add transition if specified
            if transition_type:
                add_transition_to_slide(str(slide_file), transition_type)

            # Get shape IDs and add animations
            shape_ids = get_shape_ids_from_slide(str(slide_file))
            if shape_ids:
                # Animate the first few shapes with staggered delay
                for i, shape_id in enumerate(shape_ids[:5]):  # Limit to first 5 shapes
                    delay = i * 200  # 200ms stagger
                    timing_xml = create_animation_timing(shape_id, animation_type, duration, delay)

                    # Parse and add timing to slide
                    tree = ET.parse(str(slide_file))
                    root = tree.getroot()

                    # Remove existing timing
                    for timing in root.findall('.//p:timing', NS):
                        root.remove(timing)

                    # Add new timing
                    timing_elem = ET.fromstring(timing_xml)
                    root.append(timing_elem)

                    tree.write(str(slide_file), xml_declaration=True, encoding='UTF-8')

    # Repack PPTX
    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root_dir, dirs, files in os.walk(extract_dir):
            for file in files:
                file_path = Path(root_dir) / file
                arcname = file_path.relative_to(extract_dir)
                zipf.write(str(file_path), str(arcname))

    # Cleanup
    shutil.rmtree(extract_dir)

    print(f"Created {output_path}")


def main():
    parser = argparse.ArgumentParser(description='Add animations to PowerPoint presentations')
    parser.add_argument('input', help='Input PPTX file')
    parser.add_argument('output', help='Output PPTX file')
    parser.add_argument('--animation', '-a', default='fade',
                       choices=list(ANIMATION_PRESETS.keys()),
                       help='Animation type to apply')
    parser.add_argument('--transition', '-t', default=None,
                       choices=['fade', 'push', 'wipe', 'zoom', 'split', 'cover',
                               'circle', 'dissolve', 'wheel'],
                       help='Slide transition to add')
    parser.add_argument('--duration', '-d', type=int, default=500,
                       help='Animation duration in milliseconds')

    args = parser.parse_args()

    add_animations_to_pptx(args.input, args.output, args.animation, args.transition, args.duration)


if __name__ == '__main__':
    main()