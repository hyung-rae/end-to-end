import { test as setup, expect } from '@playwright/test'

const authFile = 'playwright/.auth/user.json'

setup('authenticate', async ({ page }) => {
  await page.goto(`/login`)

  await page.locator('//*[@id="main"]/div[2]/div/form/div[1]/div[1]/div/input').fill('rea1109@squares.ai')
  await page.locator('//*[@id="main"]/div[2]/div/form/div[1]/div[2]/div/input').fill('Rkskek123!')

  await page.getByRole('button', { name: '로그인' }).click()

  await page.waitForURL(`/`)

  await page.goto(`/admin`)
  await page.waitForURL(`/admin/dashboard`)

  await expect(page.locator('div').filter({ hasText: /^내 사이트 바로가기$/ })).toBeVisible()
  await expect(page.locator('div').filter({ hasText: /^에디터 바로가기$/ })).toBeVisible()
  await expect(page.getByText('빠른 시작하기')).toBeVisible()
  await expect(page.getByText('주문/콘텐츠 현황')).toBeVisible()
  await expect(page.getByText('통계')).toBeVisible()
  await expect(page.getByText('큐샵 소식')).toBeVisible()

  await page.context().storageState({ path: authFile })
})
