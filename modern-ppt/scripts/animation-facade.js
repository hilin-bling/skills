/**
 * AnimationFacade - 动画门面
 *
 * 统一的动画应用接口，自动检测运行环境选择最佳后端
 *
 * 后端优先级：
 * 1. COMBackend - Windows + PowerPoint安装（最佳效果）
 * 2. XMLBackend - 跨平台（基础动画）
 * 3. NullBackend - 降级方案（无动画）
 */

const COMBackend = require('./animation-com-backend');
const XMLBackend = require('./animation-xml-backend');
const NullBackend = require('./animation-null-backend');

class AnimationFacade {
    constructor(options = {}) {
        // 初始化后端
        this.backends = {
            com: new COMBackend(),
            xml: new XMLBackend(),
            null: new NullBackend()
        };

        // 后端优先级顺序
        this.backendPriority = ['com', 'xml', 'null'];

        // 用户指定的后端
        this.preferredBackend = options.backend || null;

        // 缓存可用后端
        this._availableBackend = null;
    }

    /**
     * 选择最佳可用后端
     */
    selectBackend() {
        // 如果已缓存，直接返回
        if (this._availableBackend) {
            return this._availableBackend;
        }

        // 如果用户指定了后端
        if (this.preferredBackend && this.backends[this.preferredBackend]) {
            const backend = this.backends[this.preferredBackend];
            if (backend.isAvailable()) {
                this._availableBackend = backend;
                return backend;
            }
        }

        // 按优先级选择
        for (const name of this.backendPriority) {
            const backend = this.backends[name];
            if (backend.isAvailable()) {
                this._availableBackend = backend;
                return backend;
            }
        }

        // 降级到null后端（始终可用）
        this._availableBackend = this.backends.null;
        return this._availableBackend;
    }

    /**
     * 检查是否有高质量动画支持
     */
    hasPremiumAnimations() {
        return this.backends.com.isAvailable();
    }

    /**
     * 获取所有可用后端
     */
    getAvailableBackends() {
        return Object.entries(this.backends)
            .filter(([, backend]) => backend.isAvailable())
            .map(([name, backend]) => ({
                name,
                description: backend.description
            }));
    }

    /**
     * 应用动画到PPT
     *
     * @param {string} inputPath - 输入PPTX路径
     * @param {string} outputPath - 输出路径
     * @param {Object} options - 配置选项
     * @param {Object} options.template - 动画模板
     * @param {Array} options.slideTypes - 每个幻灯片的类型
     */
    applyAnimations(inputPath, outputPath, options = {}) {
        const backend = this.selectBackend();

        console.log(`[Animation] 使用后端: ${backend.name} (${backend.description})`);

        const result = backend.applyAnimations(inputPath, outputPath, options);

        if (result.success) {
            console.log(`[Animation] 动画应用成功`);
        } else {
            console.warn(`[Animation] 动画应用失败: ${result.reason}`);

            // 如果主要后端失败，尝试降级
            if (backend.name !== 'null') {
                console.log(`[Animation] 尝试降级到基础后端...`);
                const fallback = this.backends.null;
                return fallback.applyAnimations(inputPath, outputPath, options);
            }
        }

        return result;
    }

    /**
     * 强制使用指定后端
     */
    useBackend(name) {
        if (this.backends[name]) {
            this.preferredBackend = name;
            this._availableBackend = null; // 清除缓存
        }
        return this;
    }

    /**
     * 禁用动画
     */
    disableAnimations() {
        this.preferredBackend = 'null';
        this._availableBackend = this.backends.null;
        return this;
    }
}

// 导出单例和类
let defaultInstance = null;

function getAnimationFacade(options = {}) {
    if (!defaultInstance) {
        defaultInstance = new AnimationFacade(options);
    }
    return defaultInstance;
}

module.exports = AnimationFacade;
module.exports.getAnimationFacade = getAnimationFacade;
module.exports.COMBackend = COMBackend;
module.exports.XMLBackend = XMLBackend;
module.exports.NullBackend = NullBackend;