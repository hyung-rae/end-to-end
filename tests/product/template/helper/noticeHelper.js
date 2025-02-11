import { expect } from '@playwright/test'

const templateName = `템플릿-${new Date().toLocaleTimeString()}`

/** 상정공 템플릿 목록 페이지 이동 */
export const gotoNoticeTemplatePage = async page => {
  await page.goto('/admin/product/template')
  await page.getByRole('tab', { name: '상품정보제공고시 템플릿' }).click()
  await expect(page.getByText('상품정보제공고시 템플릿 목록')).toBeVisible()
}

/** 상정공 템플릿 등록 모달 */
export const clickAddNoticeTemplateButton = async page => {
  await page.getByRole('button', { name: '템플릿 등록' }).click()
  await expect(page.getByRole('heading', { name: '기본 템플릿' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '상품군 *' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '템플릿 명 *' })).toBeVisible()
  await expect(page.getByRole('button', { name: '상품상세페이지 참조 일괄 입력' })).toBeVisible()

  /** ComboBox test */
  await page.getByPlaceholder('상품군을 선택 해주세요').click()
  await page.getByRole('option', { name: '가구 (침대/소파/싱크대/DIY제품 등)' }).click()
  await expect(page.getByPlaceholder('상품군을 선택 해주세요')).toHaveAttribute(
    'value',
    '가구 (침대/소파/싱크대/DIY제품 등)',
  )
  await page.getByPlaceholder('상품군을 선택 해주세요').click()
  await page.getByPlaceholder('상품군을 선택 해주세요').fill('가방')
  await expect(page.getByRole('option', { name: '가방' })).toBeVisible()

  await page.getByRole('option', { name: '가방' }).click()
}

/** 상정공 템플릿 등록 유효성 검사 */
export const checkValidationAddNoticeTemplate = async page => {
  await page.getByRole('button', { name: '등록', exact: true }).click()
  await expect(page.locator('section')).toContainText('템플릿 명을 입력해주세요.')
  await expect(page.locator('section')).toContainText('필수로 입력해주세요.')
}

/** 상정공 템플릿 등록 */
export const addNoticeTemplate = async page => {
  await page.getByPlaceholder('템플릿 명을 입력해주세요').click()
  await page.getByPlaceholder('템플릿 명을 입력해주세요').fill(templateName)
  await page.getByPlaceholder('상품군을 선택 해주세요').click()
  await page.getByRole('option', { name: '침구류/커튼' }).click()
  await page.getByRole('button', { name: '상품상세페이지 참조 일괄 입력' }).click()

  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`)
    expect(dialog.message()).toBe('상품정보제공고시가 등록되었습니다.')
    dialog.dismiss().catch(() => {})
  })
  await page.getByRole('button', { name: '등록', exact: true }).click()
}

/** 상정공 템플릿 수정 */
export const updateNoticeTemplate = async page => {
  await page.locator('td:nth-child(2)').first().click()
  await page.getByPlaceholder('템플릿 명을 입력해주세요').click()
  await page.getByPlaceholder('템플릿 명을 입력해주세요').fill(`${templateName}-수정`)
  await page.getByPlaceholder('상품군을 선택 해주세요').click()
  await page.getByRole('option', { name: '휴대형 통신기기(휴대폰/태블릿 등)' }).click()
  await page.getByRole('button', { name: '상품상세페이지 참조 일괄 입력' }).click()

  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`)
    expect(dialog.message()).toBe('상품정보제공고시가 수정되었습니다.')
    dialog.dismiss().catch(() => {})
  })
  await page.getByRole('button', { name: '수정' }).click()
}

/** 상정공 템플릿 삭제 */
export const deleteNoticeTemplate = async page => {
  await page.getByRole('cell').nth(4).click()
  await page.getByRole('menuitem', { name: '삭제하기' }).click()

  await page.once('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`)
    expect(dialog.message()).toBe('템플릿이 삭제 되었습니다.')
    await dialog.accept()
  })
}
