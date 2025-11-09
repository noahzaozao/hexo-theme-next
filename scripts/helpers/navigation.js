/* global hexo */

'use strict';

hexo.extend.helper.register('next_menu', function(path) {
  path = ('/' + path).replace(/index\.html$/, '').replace(/\.html$/, '');
  // Ensure path ends with /
  if (!path.endsWith('/')) {
    path = path + '/';
  }
  const { menu_map } = this.theme;
  
  // Try to find the exact path first
  let node = menu_map.get(path);
  
  // If not found, try to find parent paths
  if (!node) {
    let parentPath = path;
    while (parentPath !== '/' && !node) {
      // Remove the last segment
      parentPath = parentPath.replace(/\/[^\/]+\/$/, '/');
      node = menu_map.get(parentPath);
    }
  }
  
  if (!node) return;
  
  const menus = [];
  if (node.children.length) {
    menus.unshift(node.children);
  }
  while (node.parent) {
    menus.unshift(node.parent.children);
    node = node.parent;
  }
  return menus;
});
