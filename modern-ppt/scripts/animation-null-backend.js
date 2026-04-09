/**
 * 动画降级后端 - 不添加动画
 *
 * 当COM和XML后端都不可用时使用
 */

class NullAnimationBackend {
    constructor() {
        this.name = 'null';
        this.description = 'No animation (fallback)';
    }

    /**
     * 始终可用（作为降级方案）
     */
    isAvailable() {
        return true;
    }

    /**
     * 不做任何操作
     */
    applyAnimations(inputPath, outputPath, options = {}) {
        // 如果输入输出不同，复制文件
        if (inputPath !== outputPath) {
            const fs = require('fs');
            fs.copyFileSync(inputPath, outputPath);
        }
        return { success: true, reason: 'No animations applied (fallback mode)' };
    }
}

module.exports = NullAnimationBackend;