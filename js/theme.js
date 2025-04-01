/**
 * 主题切换功能
 * 提供四种主题配色方案的切换功能
 */

// 主题选项
const THEMES = {
  blue: 'theme-blue',   // 默认蓝色主题
  red: 'theme-red',     // 红色主题
  orange: 'theme-orange', // 橙色主题
  teal: 'theme-teal'    // 青色主题
};

// 在本地存储中保存主题偏好的键名
const THEME_STORAGE_KEY = 'preferred-theme';

// DOM 加载完成后初始化主题
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupThemeSwitcher();
});

/**
 * 初始化主题
 * 从本地存储中读取用户偏好，如果没有则使用默认主题
 */
function initTheme() {
  // 从本地存储中获取用户之前选择的主题
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  
  // 如果有保存的主题，应用该主题，否则使用默认主题（蓝色）
  if (savedTheme && Object.values(THEMES).includes(savedTheme)) {
    applyTheme(savedTheme);
  } else {
    // 默认使用蓝色主题
    applyTheme(THEMES.blue);
  }
  
  // 更新主题选择器的活动状态
  updateActiveThemeButton(savedTheme || THEMES.blue);
}

/**
 * 设置主题切换器的交互逻辑
 */
function setupThemeSwitcher() {
  // 获取所有主题选项按钮
  const themeOptions = document.querySelectorAll('.theme-option');
  
  // 为每个主题选项添加点击事件
  themeOptions.forEach(option => {
    option.addEventListener('click', () => {
      const theme = option.getAttribute('data-theme');
      if (theme && THEMES[theme]) {
        applyTheme(THEMES[theme]);
        updateActiveThemeButton(THEMES[theme]);
        saveThemePreference(THEMES[theme]);
      }
    });
  });
}

/**
 * 应用主题到文档
 * @param {string} theme - 要应用的主题名称
 */
function applyTheme(theme) {
  // 移除所有现有主题类
  document.body.classList.remove(...Object.values(THEMES));
  
  // 如果不是默认主题，添加相应的主题类
  if (theme !== THEMES.blue) {
    document.body.classList.add(theme);
  }
}

/**
 * 更新主题选择器按钮的活动状态
 * @param {string} activeTheme - 当前活动的主题
 */
function updateActiveThemeButton(activeTheme) {
  // 移除所有主题选项的活动状态
  document.querySelectorAll('.theme-option').forEach(option => {
    option.classList.remove('active');
  });
  
  // 根据活动主题找到对应的按钮并添加活动状态
  const activeThemeKey = Object.keys(THEMES).find(key => THEMES[key] === activeTheme);
  if (activeThemeKey) {
    const activeButton = document.querySelector(`.theme-option[data-theme="${activeThemeKey}"]`);
    if (activeButton) {
      activeButton.classList.add('active');
    }
  }
}

/**
 * 在本地存储中保存用户的主题偏好
 * @param {string} theme - 要保存的主题名称
 */
function saveThemePreference(theme) {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

/**
 * 暴露给外部使用的主题API
 */
window.themeManager = {
  // 切换到指定主题
  switchTheme: (theme) => {
    if (THEMES[theme]) {
      applyTheme(THEMES[theme]);
      updateActiveThemeButton(THEMES[theme]);
      saveThemePreference(THEMES[theme]);
    }
  },
  
  // 获取当前主题
  getCurrentTheme: () => {
    const currentTheme = Object.values(THEMES).find(theme => 
      document.body.classList.contains(theme)
    ) || THEMES.blue;
    
    return Object.keys(THEMES).find(key => THEMES[key] === currentTheme);
  }
}; 