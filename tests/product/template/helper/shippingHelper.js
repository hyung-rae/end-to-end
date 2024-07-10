import { expect } from '@playwright/test'

const templateName = `템플릿-${new Date().toLocaleTimeString()}`

/** 배송 템플릿 목록 페이지 이동 */
export const gotoShippingTemplatePage = async page => {
  await page.goto('/admin/product/template')
  await expect(page.getByRole('tab', { name: '배송 템플릿' })).toBeVisible()
}

/** 배송 템플릿 등록 모달 */
export const clickAddShippingTemplateButton = async page => {
  await page.getByRole('button', { name: '템플릿 등록' }).click()

  await expect(page.getByRole('heading', { name: '기본 템플릿' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '템플릿 명 *' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '결제방식' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '묶음배송' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '배송방법(필수)' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '배송방법(선택)' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '기본 택배사' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '배송비 부과방식' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '배송비용' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '지역별 배송비' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '별도 설치비' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '출고지 *' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '반품지 *' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '배송안내' })).toBeVisible()
}

/** 배송 템플릿 등록 유효성 검사 */
export const checkValidationAddShippingTemplate = async page => {
  await page.getByRole('button', { name: '등록', exact: true }).click()
  await expect(page.getByText('필수값 입니다').first()).toBeVisible()
  await expect(page.getByText('필수값 입니다').nth(1)).toBeVisible()
}

/** 배송 템플릿 등록 */
export const addShippingTemplate = async page => {
  await page.getByPlaceholder('템플릿 명을 입력해주세요').click()
  await page.getByPlaceholder('템플릿 명을 입력해주세요').fill(templateName)

  await page.getByPlaceholder('배송안내 기본 메시지를 입력해주세요').click()
  await page.getByPlaceholder('배송안내 기본 메시지를 입력해주세요').fill('이것은 테스트 메시지입니다.')

  await page.getByRole('button', { name: '등록', exact: true }).click()

  page.once('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`)
    expect(dialog.message()).toBe('배송템플릿이 등록되었습니다.')
    await dialog.dismiss().catch(() => {})
  })

  await expect(page.getByText(templateName)).toBeVisible()
}

/** 배송 템플릿 수정 */
export const updateShippingTemplate = async page => {
  await page.locator('td:nth-child(3)').first().click()
  const prepaid = await page.locator('input[name="paymentType"][value="prepaid"]')
  const collect = await page.locator('input[name="paymentType"][value="prepaid"]')

  if (prepaid.isChecked()) {
    await collect.check()
  } else {
    await prepaid.check()
  }

  await page.getByPlaceholder('템플릿 명을 입력해주세요').fill(`${templateName}-수정`)
  await page.getByLabel('불가능(개별부과)').check()
  await page.getByLabel('직접/화물배송').check()
  await page.getByLabel('퀵서비스').check()
  await page.getByLabel('방문수령').check()
  await page.getByPlaceholder('택배사를 선택해주세요').click()
  await page.getByRole('option', { name: 'BGF포스트' }).click()
  await page.getByRole('button', { name: '수정' }).click()

  page.once('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`)
    expect(dialog.message()).toBe('배송템플릿이 수정되었습니다.')
    await dialog.dismiss().catch(() => {})
  })
}

/** 배송 템플릿 삭제 */
export const deleteShippingTemplate = async page => {
  page.once('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`)
    expect(dialog.message()).toBe('템플릿을 삭제하시겠습니까?')
    await dialog.accept()
  })

  await page.locator('//*[@id="__next"]/div/main/div[2]/div/div[2]/div[1]/table/tbody/tr[1]/td[10]').click()
  await page.getByRole('menuitem', { name: '삭제하기' }).click()

  await page.once('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`)
    expect(dialog.message()).toBe('템플릿이 삭제 되었습니다.')
    await dialog.accept()
  })
}
