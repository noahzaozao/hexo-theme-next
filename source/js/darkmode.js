/* global NexT, CONFIG */

document.addEventListener('DOMContentLoaded', () => {
  if (!CONFIG.darkmode) return;

  const darkModeToggle = document.querySelector('.darkmode-toggle');
  if (!darkModeToggle) return;

  // 获取当前主题设置
  const getTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    // 如果没有保存的设置，使用系统偏好
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // 应用主题
  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // 更新按钮图标
    const icon = darkModeToggle.querySelector('i');
    if (icon) {
      if (theme === 'dark') {
        icon.className = 'fa fa-sun fa-lg';
        darkModeToggle.setAttribute('aria-label', '切换到浅色模式');
      } else {
        icon.className = 'fa fa-moon fa-lg';
        darkModeToggle.setAttribute('aria-label', '切换到深色模式');
      }
    }
  };

  // 切换主题
  const toggleTheme = () => {
    const currentTheme = getTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  };

  // 初始化主题
  const initTheme = () => {
    const theme = getTheme();
    applyTheme(theme);
  };

  // 监听系统主题变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // 只有在用户没有手动设置时才跟随系统
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // 绑定点击事件
  darkModeToggle.addEventListener('click', toggleTheme);

  // 初始化
  initTheme();
});

