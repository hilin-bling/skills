/**
 * Geometry Drawing Utilities - 几何图形绘制工具
 *
 * 矩形、圆形、三角形
 * 装饰元素
 * 布局辅助
 */

// ==========================================
// 基础几何图形
// ==========================================

// 绘制矩形（带圆角和阴影）
function drawRect(doc, options) {
    const {
        x, y, width, height,
        fill = '#FFFFFF',
        stroke = null,
        strokeWidth = 1,
        radius = 0,
        shadow = false,
        shadowColor = 'rgba(0,0,0,0.1)',
        shadowOffset = { x: 2, y: 2 }
    } = options;

    doc.save();

    // 阴影（如果启用）
    if (shadow) {
        doc.fillColor(shadowColor);
        if (radius > 0) {
            doc.roundedRect(x + shadowOffset.x, y + shadowOffset.y, width, height, radius).fill();
        } else {
            doc.rect(x + shadowOffset.x, y + shadowOffset.y, width, height).fill();
        }
    }

    // 主体
    doc.fillColor(fill);
    if (stroke) {
        doc.strokeColor(stroke).lineWidth(strokeWidth);
    }

    if (radius > 0) {
        doc.roundedRect(x, y, width, height, radius);
    } else {
        doc.rect(x, y, width, height);
    }

    if (stroke) {
        doc.fillAndStroke();
    } else {
        doc.fill();
    }

    doc.restore();
}

// 绘制圆形
function drawCircle(doc, options) {
    const {
        x, y, radius,
        fill = '#FFFFFF',
        stroke = null,
        strokeWidth = 1,
        shadow = false,
        shadowColor = 'rgba(0,0,0,0.1)',
        shadowOffset = 2
    } = options;

    doc.save();

    // 阴影
    if (shadow) {
        doc.fillColor(shadowColor);
        doc.circle(x + shadowOffset, y + shadowOffset, radius).fill();
    }

    // 主体
    doc.fillColor(fill);
    if (stroke) {
        doc.strokeColor(stroke).lineWidth(strokeWidth);
    }

    doc.circle(x, y, radius);

    if (stroke) {
        doc.fillAndStroke();
    } else {
        doc.fill();
    }

    doc.restore();
}

// 绘制三角形
function drawTriangle(doc, options) {
    const {
        x, y, size,
        fill = '#FFFFFF',
        stroke = null,
        strokeWidth = 1,
        direction = 'up'  // up, down, left, right
    } = options;

    doc.save();

    let points;
    const half = size / 2;

    switch (direction) {
        case 'up':
            points = [
                [x, y - half],
                [x - half, y + half],
                [x + half, y + half]
            ];
            break;
        case 'down':
            points = [
                [x, y + half],
                [x - half, y - half],
                [x + half, y - half]
            ];
            break;
        case 'left':
            points = [
                [x - half, y],
                [x + half, y - half],
                [x + half, y + half]
            ];
            break;
        case 'right':
            points = [
                [x + half, y],
                [x - half, y - half],
                [x - half, y + half]
            ];
            break;
    }

    doc.fillColor(fill);
    if (stroke) {
        doc.strokeColor(stroke).lineWidth(strokeWidth);
    }

    doc.moveTo(points[0][0], points[0][1]);
    points.forEach(p => doc.lineTo(p[0], p[1]));
    doc.closePath();

    if (stroke) {
        doc.fillAndStroke();
    } else {
        doc.fill();
    }

    doc.restore();
}

// 绘制线条
function drawLine(doc, options) {
    const {
        x1, y1, x2, y2,
        stroke = '#000000',
        strokeWidth = 1,
        dash = null
    } = options;

    doc.save();
    doc.strokeColor(stroke).lineWidth(strokeWidth);

    if (dash) {
        doc.dash(dash.length, { space: dash.space || dash.length });
    }

    doc.moveTo(x1, y1).lineTo(x2, y2).stroke();

    if (dash) {
        doc.undash();
    }

    doc.restore();
}

// ==========================================
// 装饰元素
// ==========================================

// 绘制装饰点阵
function drawDotPattern(doc, options) {
    const {
        startX, startY,
        cols, rows,
        spacing = 20,
        dotRadius = 3,
        color = '#E5E7EB'
    } = options;

    doc.save();
    doc.fillColor(color);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const x = startX + i * spacing;
            const y = startY + j * spacing;
            doc.circle(x, y, dotRadius).fill();
        }
    }

    doc.restore();
}

// 绘制装饰线条组
function drawLinePattern(doc, options) {
    const {
        startX, startY,
        count = 5,
        length = 30,
        spacing = 8,
        angle = 0,
        color = '#E5E7EB',
        strokeWidth = 1
    } = options;

    doc.save();
    doc.strokeColor(color).lineWidth(strokeWidth);

    for (let i = 0; i < count; i++) {
        const x = startX + i * spacing;
        const y = startY;

        if (angle === 0) {
            doc.moveTo(x, y).lineTo(x, y + length).stroke();
        } else if (angle === 90) {
            doc.moveTo(x, y).lineTo(x + length, y).stroke();
        } else {
            const endX = x + length * Math.cos(angle * Math.PI / 180);
            const endY = y + length * Math.sin(angle * Math.PI / 180);
            doc.moveTo(x, y).lineTo(endX, endY).stroke();
        }
    }

    doc.restore();
}

// 绘制装饰框架
function drawDecorativeFrame(doc, options) {
    const {
        x, y, width, height,
        color = '#E5E7EB',
        strokeWidth = 1,
        corners = true,
        lines = true
    } = options;

    doc.save();
    doc.strokeColor(color).lineWidth(strokeWidth);

    // 角装饰
    if (corners) {
        const cornerSize = 15;

        // 左上角
        doc.moveTo(x, y + cornerSize).lineTo(x, y).lineTo(x + cornerSize, y).stroke();

        // 右上角
        doc.moveTo(x + width - cornerSize, y).lineTo(x + width, y).lineTo(x + width, y + cornerSize).stroke();

        // 左下角
        doc.moveTo(x, y + height - cornerSize).lineTo(x, y + height).lineTo(x + cornerSize, y + height).stroke();

        // 右下角
        doc.moveTo(x + width - cornerSize, y + height).lineTo(x + width, y + height).lineTo(x + width, y + height - cornerSize).stroke();
    }

    // 边框线
    if (lines) {
        doc.moveTo(x + 20, y).lineTo(x + width - 20, y).stroke();
        doc.moveTo(x + 20, y + height).lineTo(x + width - 20, y + height).stroke();
        doc.moveTo(x, y + 20).lineTo(x, y + height - 20).stroke();
        doc.moveTo(x + width, y + 20).lineTo(x + width, y + height - 20).stroke();
    }

    doc.restore();
}

// ==========================================
// 布局辅助
// ==========================================

// 计算居中位置
function centerInRect(elementWidth, elementHeight, rectX, rectY, rectWidth, rectHeight) {
    return {
        x: rectX + (rectWidth - elementWidth) / 2,
        y: rectY + (rectHeight - elementHeight) / 2
    };
}

// 计算网格布局位置
function gridLayout(options) {
    const {
        containerX, containerY,
        containerWidth, containerHeight,
        cols, rows,
        gap = 10,
        cellWidth = null,
        cellHeight = null
    } = options;

    const actualCellWidth = cellWidth || (containerWidth - (cols - 1) * gap) / cols;
    const actualCellHeight = cellHeight || (containerHeight - (rows - 1) * gap) / rows;

    const positions = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            positions.push({
                x: containerX + col * (actualCellWidth + gap),
                y: containerY + row * (actualCellHeight + gap),
                width: actualCellWidth,
                height: actualCellHeight
            });
        }
    }

    return positions;
}

// 计算卡片布局（自动排列）
function cardLayout(options) {
    const {
        startX, startY,
        cardWidth, cardHeight,
        count,
        containerWidth,
        gap = 10,
        cols = 2
    } = options;

    const positions = [];
    const actualCols = Math.min(cols, count);

    for (let i = 0; i < count; i++) {
        const col = i % actualCols;
        const row = Math.floor(i / actualCols);

        positions.push({
            x: startX + col * (cardWidth + gap),
            y: startY + row * (cardHeight + gap),
            width: cardWidth,
            height: cardHeight
        });
    }

    return positions;
}

// ==========================================
// 导出
// ==========================================
module.exports = {
    drawRect,
    drawCircle,
    drawTriangle,
    drawLine,
    drawDotPattern,
    drawLinePattern,
    drawDecorativeFrame,
    centerInRect,
    gridLayout,
    cardLayout
};