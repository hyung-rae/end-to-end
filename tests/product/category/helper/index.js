import { expect } from '@playwright/test'

const categoryName = `카테고리-${new Date().toLocaleTimeString()} `

/** 카테고리 페이지 이동 */
export const gotoCategoryPage = async page => {
  await page.goto('/admin/product/category')
  await expect(page.getByRole('heading', { name: '카테고리 관리' })).toBeVisible()
  await expect(page.getByRole('main')).toContainText('카테고리 추가하기')
}

/** 카테고리 drag and drop */
export const dragAndDropCategory = async page => {
  await page.pause()
}
