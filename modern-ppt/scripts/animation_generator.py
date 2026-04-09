#!/usr/bin/env python3
"""
Animation Generator - Create PowerPoint animation XML.

This module provides tools for generating animation timing XML
that can be injected into PPTX slide files.

Usage:
    from animation_generator import AnimationBuilder

    builder = AnimationBuilder()
    builder.add_entrance_animation(shape_id=1, type='fade', delay=0)
    builder.apply_to_slide(slide_xml_path)
"""

import xml.etree.ElementTree as ET
from typing import Dict, List, Optional
from dataclasses import dataclass
from enum import Enum

# XML Namespaces
NS = {
    'p': 'http://schemas.openxmlformats.org/presentationml/2006/main',
    'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
    'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
}

# Register namespaces
for prefix, uri in NS.items():
    ET.register_namespace(prefix, uri)


class AnimationType(Enum):
    """Animation types with their preset IDs."""
    # Entrance
    APPEAR = ('entrance', 1)
    FLY_IN = ('entrance', 2)
    SPLIT_IN = ('entrance', 3)
    WIPE_IN = ('entrance', 4)
    SHAPE_IN = ('entrance', 5)
    FLOAT_IN = ('entrance', 6)
    WHEEL = ('entrance', 7)
    RANDOM_BARS = ('entrance', 8)
    DISSOLVE_IN = ('entrance', 27)
    FADE_IN = ('entrance', 10)
    ZOOM_IN = ('entrance', 13)
    SWIVEL_IN = ('entrance', 14)
    BOUNCE_IN = ('entrance', 15)
    GROW_TURN = ('entrance', 12)

    # Emphasis
    PULSE = ('emphasis', 1)
    COLOR_PULSE = ('emphasis', 2)
    TEETER = ('emphasis', 3)
    SPIN = ('emphasis', 4)
    GROW_SHRINK = ('emphasis', 5)

    # Exit
    FADE_OUT = ('exit', 10)
    FLY_OUT = ('exit', 2)
    ZOOM_OUT = ('exit', 13)


@dataclass
class Animation:
    """Animation configuration."""
    shape_id: int
    animation_type: str
    preset_id: int
    duration: int  # milliseconds
    delay: int  # milliseconds
    direction: Optional[str] = None
    trigger: str = 'onClick'  # onClick, afterPrevious, withPrevious


class AnimationBuilder:
    """Build animation timing XML for PowerPoint slides."""

    def __init__(self):
        self.animations: List[Animation] = []
        self.node_id_counter = 1

    def add_entrance_animation(
        self,
        shape_id: int,
        type: str = 'fade',
        duration: int = 500,
        delay: int = 0,
        direction: str = None,
        trigger: str = 'onClick'
    ) -> 'AnimationBuilder':
        """
        Add entrance animation for a shape.

        Args:
            shape_id: PowerPoint shape ID (spid)
            type: Animation type (fade, fly_in, zoom, etc.)
            duration: Animation duration in milliseconds
            delay: Delay before animation starts
            direction: Direction for directional animations (l, r, u, d)
            trigger: Trigger type (onClick, afterPrevious, withPrevious)
        """
        # Map type to preset ID
        type_map = {
            'fade': 10, 'fly_in': 2, 'zoom': 13, 'float_in': 6,
            'bounce': 15, 'grow_turn': 12, 'wipe': 4, 'split': 3,
            'appear': 1, 'wheel': 7
        }

        preset_id = type_map.get(type, 10)

        self.animations.append(Animation(
            shape_id=shape_id,
            animation_type='entrance',
            preset_id=preset_id,
            duration=duration,
            delay=delay,
            direction=direction,
            trigger=trigger
        ))
        return self

    def add_emphasis_animation(
        self,
        shape_id: int,
        type: str = 'pulse',
        duration: int = 1000,
        delay: int = 0,
        trigger: str = 'afterPrevious'
    ) -> 'AnimationBuilder':
        """Add emphasis animation for a shape."""
        type_map = {
            'pulse': 1, 'color_pulse': 2, 'teeter': 3,
            'spin': 4, 'grow_shrink': 5
        }

        preset_id = type_map.get(type, 1)

        self.animations.append(Animation(
            shape_id=shape_id,
            animation_type='emphasis',
            preset_id=preset_id,
            duration=duration,
            delay=delay,
            trigger=trigger
        ))
        return self

    def add_exit_animation(
        self,
        shape_id: int,
        type: str = 'fade',
        duration: int = 400,
        delay: int = 0,
        trigger: str = 'onClick'
    ) -> 'AnimationBuilder':
        """Add exit animation for a shape."""
        type_map = {
            'fade': 10, 'fly_out': 2, 'zoom_out': 13,
            'shrink': 5, 'disappear': 1
        }

        preset_id = type_map.get(type, 10)

        self.animations.append(Animation(
            shape_id=shape_id,
            animation_type='exit',
            preset_id=preset_id,
            duration=duration,
            delay=delay,
            trigger=trigger
        ))
        return self

    def add_staggered_entrance(
        self,
        shape_ids: List[int],
        type: str = 'fade',
        duration: int = 500,
        base_delay: int = 200,
        stagger: int = 150
    ) -> 'AnimationBuilder':
        """
        Add staggered entrance animations to multiple shapes.

        Args:
            shape_ids: List of shape IDs
            type: Animation type
            duration: Animation duration
            base_delay: Initial delay before first animation
            stagger: Delay between each subsequent animation
        """
        for i, shape_id in enumerate(shape_ids):
            delay = base_delay + (i * stagger)
            self.add_entrance_animation(shape_id, type, duration, delay, trigger='afterPrevious')
        return self

    def _generate_timing_xml(self) -> ET.Element:
        """Generate the timing XML element."""
        timing = ET.Element('{http://schemas.openxmlformats.org/presentationml/2006/main}timing')
        tnLst = ET.SubElement(timing, '{http://schemas.openxmlformats.org/presentationml/2006/main}tnLst')

        # Root par element
        par = ET.SubElement(tnLst, '{http://schemas.openxmlformats.org/presentationml/2006/main}par')
        cTn_root = ET.SubElement(par, '{http://schemas.openxmlformats.org/presentationml/2006/main}cTn')
        cTn_root.set('id', str(self._next_node_id()))
        cTn_root.set('dur', 'indefinite')
        cTn_root.set('restart', 'never')
        cTn_root.set('nodeType', 'tmRoot')

        childTnLst = ET.SubElement(cTn_root, '{http://schemas.openxmlformats.org/presentationml/2006/main}childTnLst')

        # Sequence for main animations
        seq = ET.SubElement(childTnLst, '{http://schemas.openxmlformats.org/presentationml/2006/main}seq')
        seq.set('concurrent', '1')
        seq.set('nextAc', 'seek')

        cTn_seq = ET.SubElement(seq, '{http://schemas.openxmlformats.org/presentationml/2006/main}cTn')
        cTn_seq.set('id', str(self._next_node_id()))
        cTn_seq.set('dur', 'indefinite')
        cTn_seq.set('nodeType', 'mainSeq')

        seqChildTnLst = ET.SubElement(cTn_seq, '{http://schemas.openxmlformats.org/presentationml/2006/main}childTnLst')

        # Add each animation
        prev_delay = 0
        for anim in self.animations:
            self._add_animation_to_sequence(seqChildTnLst, anim, prev_delay)
            prev_delay = anim.delay + anim.duration

        return timing

    def _add_animation_to_sequence(self, parent: ET.Element, anim: Animation, prev_delay: int):
        """Add a single animation to the sequence."""
        # Par wrapper
        par = ET.SubElement(parent, '{http://schemas.openxmlformats.org/presentationml/2006/main}par')
        cTn = ET.SubElement(par, '{http://schemas.openxmlformats.org/presentationml/2006/main}cTn')
        cTn.set('id', str(self._next_node_id()))
        cTn.set('fill', 'hold')

        stCondLst = ET.SubElement(cTn, '{http://schemas.openxmlformats.org/presentationml/2006/main}stCondLst')
        cond = ET.SubElement(stCondLst, '{http://schemas.openxmlformats.org/presentationml/2006/main}cond')
        cond.set('delay', str(anim.delay))

        childTnLst = ET.SubElement(cTn, '{http://schemas.openxmlformats.org/presentationml/2006/main}childTnLst')

        # Inner par
        par2 = ET.SubElement(childTnLst, '{http://schemas.openxmlformats.org/presentationml/2006/main}par')
        cTn2 = ET.SubElement(par2, '{http://schemas.openxmlformats.org/presentationml/2006/main}cTn')
        cTn2.set('id', str(self._next_node_id()))
        cTn2.set('fill', 'hold')

        stCondLst2 = ET.SubElement(cTn2, '{http://schemas.openxmlformats.org/presentationml/2006/main}stCondLst')
        cond2 = ET.SubElement(stCondLst2, '{http://schemas.openxmlformats.org/presentationml/2006/main}cond')
        cond2.set('delay', '0')

        childTnLst2 = ET.SubElement(cTn2, '{http://schemas.openxmlformats.org/presentationml/2006/main}childTnLst')

        # Animation par
        par3 = ET.SubElement(childTnLst2, '{http://schemas.openxmlformats.org/presentationml/2006/main}par')
        cTn3 = ET.SubElement(par3, '{http://schemas.openxmlformats.org/presentationml/2006/main}cTn')
        cTn3.set('id', str(self._next_node_id()))
        cTn3.set('presetID', str(anim.preset_id))
        cTn3.set('presetClass', anim.animation_type[:4])  # entr, emph, exit
        cTn3.set('presetSubtype', '0')
        cTn3.set('fill', 'hold')
        cTn3.set('nodeType', 'clickEffect')

        stCondLst3 = ET.SubElement(cTn3, '{http://schemas.openxmlformats.org/presentationml/2006/main}stCondLst')
        cond3 = ET.SubElement(stCondLst3, '{http://schemas.openxmlformats.org/presentationml/2006/main}cond')
        cond3.set('delay', '0')

        animChildTnLst = ET.SubElement(cTn3, '{http://schemas.openxmlformats.org/presentationml/2006/main}childTnLst')

        # Set visibility
        self._add_visibility_set(animChildTnLst, anim.shape_id)

        # Add animation
        self._add_anim_element(animChildTnLst, anim)

    def _add_visibility_set(self, parent: ET.Element, shape_id: int):
        """Add set element to make shape visible."""
        set_elem = ET.SubElement(parent, '{http://schemas.openxmlformats.org/presentationml/2006/main}set')
        cBhvr = ET.SubElement(set_elem, '{http://schemas.openxmlformats.org/presentationml/2006/main}cBhvr')

        cTn = ET.SubElement(cBhvr, '{http://schemas.openxmlformats.org/presentationml/2006/main}cTn')
        cTn.set('id', str(self._next_node_id()))
        cTn.set('dur', '1')
        cTn.set('fill', 'hold')

        stCondLst = ET.SubElement(cTn, '{http://schemas.openxmlformats.org/presentationml/2006/main}stCondLst')
        cond = ET.SubElement(stCondLst, '{http://schemas.openxmlformats.org/presentationml/2006/main}cond')
        cond.set('delay', '0')

        tgtEl = ET.SubElement(cBhvr, '{http://schemas.openxmlformats.org/presentationml/2006/main}tgtEl')
        spTgt = ET.SubElement(tgtEl, '{http://schemas.openxmlformats.org/presentationml/2006/main}spTgt')
        spTgt.set('spid', str(shape_id))

        attrNameLst = ET.SubElement(cBhvr, '{http://schemas.openxmlformats.org/presentationml/2006/main}attrNameLst')
        attrName = ET.SubElement(attrNameLst, '{http://schemas.openxmlformats.org/presentationml/2006/main}attrName')
        attrName.text = 'style.visibility'

        to = ET.SubElement(set_elem, '{http://schemas.openxmlformats.org/presentationml/2006/main}to')
        strVal = ET.SubElement(to, '{http://schemas.openxmlformats.org/presentationml/2006/main}strVal')
        strVal.set('val', 'visible')

    def _add_anim_element(self, parent: ET.Element, anim: Animation):
        """Add animation element."""
        anim_elem = ET.SubElement(parent, '{http://schemas.openxmlformats.org/presentationml/2006/main}anim')
        anim_elem.set('calcmode', 'lin')
        anim_elem.set('valueType', 'num')

        cBhvr = ET.SubElement(anim_elem, '{http://schemas.openxmlformats.org/presentationml/2006/main}cBhvr')
        cBhvr.set('additive', 'base')

        cTn = ET.SubElement(cBhvr, '{http://schemas.openxmlformats.org/presentationml/2006/main}cTn')
        cTn.set('id', str(self._next_node_id()))
        cTn.set('dur', str(anim.duration))
        cTn.set('fill', 'hold')

        tgtEl = ET.SubElement(cBhvr, '{http://schemas.openxmlformats.org/presentationml/2006/main}tgtEl')
        spTgt = ET.SubElement(tgtEl, '{http://schemas.openxmlformats.org/presentationml/2006/main}spTgt')
        spTgt.set('spid', str(anim.shape_id))

        attrNameLst = ET.SubElement(cBhvr, '{http://schemas.openxmlformats.org/presentationml/2006/main}attrNameLst')
        attrName = ET.SubElement(attrNameLst, '{http://schemas.openxmlformats.org/presentationml/2006/main}attrName')
        attrName.text = 'ppt_x'

        tavLst = ET.SubElement(anim_elem, '{http://schemas.openxmlformats.org/presentationml/2006/main}tavLst')

        # Start value
        tav1 = ET.SubElement(tavLst, '{http://schemas.openxmlformats.org/presentationml/2006/main}tav')
        tav1.set('tm', '0')
        val1 = ET.SubElement(tav1, '{http://schemas.openxmlformats.org/presentationml/2006/main}val')
        strVal1 = ET.SubElement(val1, '{http://schemas.openxmlformats.org/presentationml/2006/main}strVal')
        strVal1.set('val', '#ppt_x')

        # End value
        tav2 = ET.SubElement(tavLst, '{http://schemas.openxmlformats.org/presentationml/2006/main}tav')
        tav2.set('tm', '100000')
        val2 = ET.SubElement(tav2, '{http://schemas.openxmlformats.org/presentationml/2006/main}val')
        strVal2 = ET.SubElement(val2, '{http://schemas.openxmlformats.org/presentationml/2006/main}strVal')
        strVal2.set('val', '#ppt_x')

    def _next_node_id(self) -> int:
        """Get next node ID."""
        self.node_id_counter += 1
        return self.node_id_counter

    def get_timing_xml(self) -> str:
        """Get timing XML as string."""
        timing = self._generate_timing_xml()
        return ET.tostring(timing, encoding='unicode')

    def apply_to_slide(self, slide_xml_path: str) -> None:
        """Apply animations to a slide XML file."""
        tree = ET.parse(slide_xml_path)
        root = tree.getroot()

        # Remove existing timing
        for timing in root.findall('.//p:timing', NS):
            root.remove(timing)

        # Add new timing
        timing_xml = self._generate_timing_xml()
        root.append(timing_xml)

        # Write back
        tree.write(slide_xml_path, xml_declaration=True, encoding='UTF-8')


# Convenience functions
def create_staggered_animations(shape_ids: List[int], style: str = 'fade', stagger: int = 150) -> AnimationBuilder:
    """Create staggered entrance animations for multiple shapes."""
    builder = AnimationBuilder()
    builder.add_staggered_entrance(shape_ids, type=style, stagger=stagger)
    return builder


def create_presentation_animations(slide_elements: Dict[str, List[int]], style: str = 'minimal') -> Dict[str, AnimationBuilder]:
    """
    Create animation builders for all slides in a presentation.

    Args:
        slide_elements: Dict mapping slide names to lists of shape IDs
        style: Presentation style (affects animation type)

    Returns:
        Dict mapping slide names to AnimationBuilder instances
    """
    # Style-specific animation types
    style_animations = {
        'academic': 'fade',
        'technical': 'fly_in',
        'report': 'fade',
        'minimal': 'fade',
        'creative': 'zoom'
    }

    anim_type = style_animations.get(style, 'fade')
    stagger_delays = {
        'academic': 200,
        'technical': 150,
        'report': 180,
        'minimal': 250,
        'creative': 120
    }
    stagger = stagger_delays.get(style, 150)

    result = {}
    for slide_name, shape_ids in slide_elements.items():
        builder = AnimationBuilder()
        builder.add_staggered_entrance(shape_ids, type=anim_type, stagger=stagger)
        result[slide_name] = builder

    return result


if __name__ == '__main__':
    # Example usage
    builder = AnimationBuilder()
    builder.add_staggered_entrance([1, 2, 3, 4], type='fade', stagger=150)

    print("Generated Animation XML:")
    print(builder.get_timing_xml()[:500] + "...")