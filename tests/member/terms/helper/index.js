import { expect } from '@playwright/test'

/** 가입약관 페이지 이동 */
export const gotoTermsPage = async page => {
  await page.goto('/admin/setting/member/terms')
  await expect(page.getByRole('heading', '가입약관').first()).toBeVisible()

  await expect(page.getByRole('tab', { name: '이용약관' })).toBeVisible()
  await expect(page.getByRole('tab', { name: '개인정보처리방침' })).toBeVisible()
  await expect(page.getByRole('tab', { name: '개인정보 수집 및 이용 동의(회원가입시)' })).toBeVisible()
  await expect(page.getByRole('tab', { name: '개인정보 수집 및 이용 동의(비회원 구매시)' })).toBeVisible()
  await expect(page.getByRole('tab', { name: '마케팅활용동의 및 광고수신동의' })).toBeVisible()
}

export const setTermText = async (page, selector, title) => {
  // 탭 클릭
  await page.locator(selector).click()

  // 선택한 탭의 내용이 올바르게 화면에 떴는지 확인
  const selectedTabTitle = await page.locator('//*[@id="__next"]/div/main/div[2]/div/span/span').textContent()
  expect(selectedTabTitle === title).toBeTruthy()

  // 내용 채워넣기
  const textareaValue = `[${new Date().toLocaleString()}] ${title} 테스트`
  await page.locator('textarea').fill(textareaValue)

  return textareaValue
}

/** 이용약관 */
export const updateTerm1 = async page => {
  const textareaValue = await setTermText(
    page,
    '//*[@id="__next"]/div/main/div[1]/div[2]/div[1]/div/div/button[1]',
    '이용약관',
  )
  // 저장
  await clickTermSaveButton(page)
  // 저장된 내용 동일한지 확인
  await checkValue(page, textareaValue)
}

/** 개인정보처리방침 */
export const updateTerm2 = async page => {
  const textareaValue = await setTermText(
    page,
    '//*[@id="__next"]/div/main/div[1]/div[2]/div[1]/div/div/button[2]',
    '개인정보처리방침',
  )
  await clickTermSaveButton(page)
  await checkValue(page, textareaValue)
}

/** 개인정보 수집 및 이용 동의(회원가입시) */
export const updateTerm3 = async page => {
  const textareaValue = await setTermText(
    page,
    '//*[@id="__next"]/div/main/div[1]/div[2]/div[1]/div/div/button[3]',
    '개인정보 수집 및 이용 동의(회원가입시)',
  )
  await clickTermSaveButton(page)
  await checkValue(page, textareaValue)
}

/** 개인정보 수집 및 이용 동의(비회원 구매시) */
export const updateTerm4 = async page => {
  const textareaValue = await setTermText(
    page,
    '//*[@id="__next"]/div/main/div[1]/div[2]/div[1]/div/div/button[4]',
    '개인정보 수집 및 이용 동의(비회원 구매시)',
  )
  await clickTermSaveButton(page)
  await checkValue(page, textareaValue)
}

/** 마케팅활용동의 및 광고수신동의 */
export const updateTerm5 = async page => {
  const textareaValue = await setTermText(
    page,
    '//*[@id="__next"]/div/main/div[1]/div[2]/div[1]/div/div/button[5]',
    '마케팅활용동의 및 광고수신동의',
  )
  await clickTermSaveButton(page)
  await checkValue(page, textareaValue)
}

/** 저장 버튼 클릭 */
export const clickTermSaveButton = async page => {
  await page.locator('//*[@id="__next"]/div/main/div[1]/div[2]/div[2]/button[2]').click()
  const dialog = await page.waitForEvent('dialog')
  await dialog.accept()
}

/** 입력한 텍스트와 화면에 보이는 텍스트가 동일한지 확인 (제대로 저장되었는지) */
export const checkValue = async (page, textareaValue) => {
  const curTextareaValue = await page.locator('textarea').inputValue()
  expect(textareaValue === curTextareaValue).toBeTruthy()
}
