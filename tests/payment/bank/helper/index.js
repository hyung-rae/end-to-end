import { expect } from '@playwright/test'

export const gotoBankPage = async page => {
  await page.goto('/admin/setting/payment/bankTransfer')
  await expect(page.getByRole('heading', '무통장입금').first()).toBeVisible()

  await expect(page.getByRole('heading', { name: '무통장입금 사용' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '현금영수증 신청' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '미입금 자동 취소' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '입금받을 계좌' })).toBeVisible()
}

/** 무통장입금 사용 */
export const setUseBank = async page => {
  await page.locator('//*[@id="__next"]/div/main/div[2]/div/div/div/div[1]/div/div/label[2]').click()
  const isChecked = await page
    .locator('//*[@id="__next"]/div/main/div[2]/div/div/div/div[1]/div/div/label[2]/span[1]/input')
    .isChecked()
  expect(isChecked).toBeTruthy()
}

/** 현금영수증 신청 */
export const setCashReceipts = async page => {
  await page.locator('//*[@id="__next"]/div/main/div[2]/div/div/div/div[2]/div/div/label[2]').click()
  // TODO: 제대로 클릭되었는지 확인
}

/** 미입금 자동 취소 */
export const setUnpaidCancellationPeriod = async page => {
  await page.locator('//*[@id="__next"]/div/main/div[2]/div/div/div/div[3]/div/div/div/div/div').click()
  await page.locator('//*[@id=":r2:"]/li[1]').click()
}

/** 입금받을 계좌 */
export const setAccount = async page => {
  await page.locator('//*[@id="__next"]/div/main/div[2]/div/div/div/div[4]/div/div[2]/div/div[1]/div/div').click()
  await page.locator('//*[@id=":r3:"]/li[10]').click()

  await page
    .locator('//*[@id="__next"]/div/main/div[2]/div/div/div/div[4]/div/div[2]/div/div[2]/div/input')
    .fill('123123123')
  await page
    .locator('//*[@id="__next"]/div/main/div[2]/div/div/div/div[4]/div/div[2]/div/div[3]/div/input')
    .fill('김승원')

  // 계좌 추가
  // await page.getByRole('button', { name: '입금받을 계좌 추가하기' }).click()
  // console.log(
  //   (await page.locator('//*[@id="__next"]/div/main/div[2]/div/div/div/div[4]/div/div[2]/div').all()).length,
  // )
}
