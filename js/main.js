/**
 * 大学生就业信息平台主JavaScript文件
 * 处理全站通用交互功能
 */

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 初始化功能
  initSearch();
  initDropdowns();
  initMobileMenu();
  initScrollEffects();
});

/**
 * 初始化搜索功能
 */
function initSearch() {
  const searchInputs = document.querySelectorAll('.search-box input');
  const searchButtons = document.querySelectorAll('.search-box button');
  
  // 为每个搜索输入框添加事件
  searchInputs.forEach((input, index) => {
    // 回车搜索
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performSearch(input.value);
      }
    });
    
    // 点击搜索按钮
    if (searchButtons[index]) {
      searchButtons[index].addEventListener('click', () => {
        performSearch(input.value);
      });
    }
  });
}

/**
 * 执行搜索功能
 * @param {string} keyword - 搜索关键词
 */
function performSearch(keyword) {
  if (!keyword || keyword.trim() === '') {
    // 关键词为空，不执行搜索
    return;
  }
  
  // 实际项目中，这里应该跳转到搜索结果页或发起API请求
  console.log('执行搜索:', keyword);
  
  // 示例：跳转到搜索结果页面
  const searchUrl = `/pages/search.html?keyword=${encodeURIComponent(keyword)}`;
  
  // 如果在iframe内部，通知父窗口加载搜索页
  if (window.parent && window.parent !== window) {
    const contentFrame = window.parent.document.getElementById('content-frame');
    if (contentFrame) {
      contentFrame.src = searchUrl;
    }
  } else {
    // 直接加载搜索页
    window.location.href = searchUrl;
  }
}

/**
 * 初始化下拉菜单
 */
function initDropdowns() {
  const dropdownToggleButtons = document.querySelectorAll('[data-dropdown-toggle]');
  
  dropdownToggleButtons.forEach(button => {
    const targetId = button.getAttribute('data-dropdown-toggle');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // 切换下拉菜单显示/隐藏
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        targetElement.classList.toggle('hidden');
      });
      
      // 点击其他区域关闭下拉菜单
      document.addEventListener('click', (e) => {
        if (!button.contains(e.target) && !targetElement.contains(e.target)) {
          targetElement.classList.add('hidden');
        }
      });
    }
  });
}

/**
 * 初始化移动端菜单
 */
function initMobileMenu() {
  const mobileMenuButton = document.getElementById('mobileMenuButton');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

/**
 * 初始化滚动效果
 */
function initScrollEffects() {
  // 页面滚动时的效果
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // 滚动到一定距离时固定导航栏
    const header = document.querySelector('.site-header');
    if (header) {
      if (scrollTop > 50) {
        header.classList.add('shadow-md');
      } else {
        header.classList.remove('shadow-md');
      }
    }
    
    // 滚动显示回到顶部按钮
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
      if (scrollTop > 300) {
        backToTopButton.classList.remove('hidden');
        backToTopButton.classList.add('flex');
      } else {
        backToTopButton.classList.add('hidden');
        backToTopButton.classList.remove('flex');
      }
    }
  });
  
  // 回到顶部按钮点击事件
  const backToTopButton = document.getElementById('backToTop');
  if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/**
 * 根据URL参数获取值
 * @param {string} name - 参数名
 * @returns {string|null} 参数值或null
 */
function getUrlParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

/**
 * 设置页面标题
 * @param {string} title - 新标题
 */
function setPageTitle(title) {
  document.title = `${title} - 大学生就业信息平台`;
}

/**
 * 显示消息通知
 * @param {string} message - 消息内容
 * @param {string} type - 消息类型：'success', 'error', 'warning', 'info'
 * @param {number} duration - 显示时长（毫秒）
 */
function showNotification(message, type = 'info', duration = 3000) {
  // 创建通知元素
  const notification = document.createElement('div');
  notification.className = `notification fixed z-50 top-20 right-5 p-4 rounded-md shadow-md transform transition-transform duration-300 translate-x-full`;
  
  // 设置不同类型的样式
  switch (type) {
    case 'success':
      notification.classList.add('bg-green-500', 'text-white');
      notification.innerHTML = `<i class="fas fa-check-circle mr-2"></i>${message}`;
      break;
    case 'error':
      notification.classList.add('bg-red-500', 'text-white');
      notification.innerHTML = `<i class="fas fa-exclamation-circle mr-2"></i>${message}`;
      break;
    case 'warning':
      notification.classList.add('bg-yellow-500', 'text-white');
      notification.innerHTML = `<i class="fas fa-exclamation-triangle mr-2"></i>${message}`;
      break;
    default: // info
      notification.classList.add('bg-blue-500', 'text-white');
      notification.innerHTML = `<i class="fas fa-info-circle mr-2"></i>${message}`;
  }
  
  // 添加到文档中
  document.body.appendChild(notification);
  
  // 显示通知
  setTimeout(() => {
    notification.classList.remove('translate-x-full');
  }, 10);
  
  // 设置定时关闭
  setTimeout(() => {
    notification.classList.add('translate-x-full');
    
    // 动画结束后移除元素
    notification.addEventListener('transitionend', () => {
      document.body.removeChild(notification);
    });
  }, duration);
}

/**
 * 全局函数导出，可在其他js文件中使用
 */
window.jobInfoUtils = {
  performSearch,
  getUrlParam,
  setPageTitle,
  showNotification
};