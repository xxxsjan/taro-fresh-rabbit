import type { CategoryTopItem } from '../../types/category';
import { http } from '../http';

/**
 * 一级分类列表-小程序-APP
 */
export const getCategoryList = () => {
  return http<CategoryTopItem[]>({
    method: 'GET',
    url: '/category/top'
  });
};
