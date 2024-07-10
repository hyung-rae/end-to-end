import { test } from '@playwright/test'
import * as categoryHelper from './helper/index'

test.describe('카테고리 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await categoryHelper.gotoCategoryPage(page)
  })
})
