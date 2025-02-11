import { test } from '@playwright/test'
import { gotoBankPage, setAccount, setCashReceipts, setUseBank } from './helper'

test.describe('무통장 입금', async () => {
  test('무통장 입금 - 사용함/현금영수증/미입금자동취소/계좌 수정 성공 케이스', async ({ page }) => {
    await gotoBankPage(page)
    await setUseBank(page)
    await setCashReceipts(page)
    await setAccount(page)

    // 저장
    await page.locator('//*[@id="__next"]/div/main/div[1]/div/div[2]/button').click()
  })
})
